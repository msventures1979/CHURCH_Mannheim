"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { eventSubmission as c } from "@/content/eventSubmission";
import { isValidEventKey } from "@/lib/event-access";
import { escapeHtml, getResend } from "@/lib/mail";
import { getRequestMeta } from "@/lib/request-meta";
import { getSupabase } from "@/lib/supabase";

export type EventSubmissionState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

const BUCKET = "event-submissions";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const req = (max: number, msg: string) => z.string().trim().min(1, msg).max(max, `Bitte höchstens ${max} Zeichen.`);
const opt = (max: number) => z.string().trim().max(max, `Bitte höchstens ${max} Zeichen.`).default("");

const schema = z.object({
  title: req(80, "Bitte gib den Namen des Events an."),
  subtitle: req(120, "Bitte gib einen Untertitel an."),
  category: z.enum(c.categories as unknown as [string, ...string[]], { message: "Bitte wähle eine Kategorie." }),
  shortDescription: req(200, "Bitte gib eine Kurzbeschreibung an."),
  longDescription: req(1500, "Bitte beschreibe dein Event."),
  dates: z
    .array(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), start: z.string().regex(/^\d{2}:\d{2}$/), end: z.string().regex(/^(\d{2}:\d{2})?$/) }))
    .min(1, "Bitte gib mindestens einen Termin mit Datum und Beginn an.")
    .max(c.maxDates),
  timeline: z.array(z.object({ time: z.string().max(20), title: z.string().max(120) })).max(c.maxTimeline),
  price: req(80, "Bitte gib einen Preis an (oder „kostenlos“)."),
  ticketLink: req(300, "Bitte gib an, wo man Tickets bekommt."),
  included: opt(300),
  bring: opt(300),
  maxGuests: opt(10),
  organizerName: req(100, "Bitte gib den Namen des Veranstalters an."),
  organizerWebsite: opt(200),
  organizerInstagram: opt(100),
  organizerAbout: opt(400),
  contactName: req(100, "Bitte gib eine Ansprechperson an."),
  contactEmail: z.string().trim().max(255).email("Bitte gib eine gültige E-Mail-Adresse ein."),
  contactPhone: req(30, "Bitte gib eine Telefonnummer an."),
  notes: opt(1000),
  consent: z.literal("on", { message: "Bitte bestätige die Veröffentlichung." }),
  rights: z.literal("on", { message: "Bitte bestätige die Bildrechte." }),
});

function rows<T>(fd: FormData, prefix: string, keys: (keyof T & string)[], max: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < max; i++) {
    const row = Object.fromEntries(keys.map((k) => [k, String(fd.get(`${prefix}[${i}].${k}`) ?? "").trim()])) as T;
    if (Object.values(row as object).some((v) => v)) out.push(row);
  }
  return out;
}

export async function submitEvent(_prev: EventSubmissionState, fd: FormData): Promise<EventSubmissionState> {
  if (!isValidEventKey(fd.get("key"))) return { status: "error", message: "Dieser Link ist nicht gültig." };
  // Honeypot
  if (fd.get("website")) return { status: "success" };

  const get = (k: string) => String(fd.get(k) ?? "");
  const parsed = schema.safeParse({
    title: get("title"),
    subtitle: get("subtitle"),
    category: get("category"),
    shortDescription: get("shortDescription"),
    longDescription: get("longDescription"),
    dates: rows<{ date: string; start: string; end: string }>(fd, "dates", ["date", "start", "end"], c.maxDates),
    timeline: rows<{ time: string; title: string }>(fd, "timeline", ["time", "title"], c.maxTimeline),
    price: get("price"),
    ticketLink: get("ticketLink"),
    included: get("included"),
    bring: get("bring"),
    maxGuests: get("maxGuests"),
    organizerName: get("organizerName"),
    organizerWebsite: get("organizerWebsite"),
    organizerInstagram: get("organizerInstagram"),
    organizerAbout: get("organizerAbout"),
    contactName: get("contactName"),
    contactEmail: get("contactEmail"),
    contactPhone: get("contactPhone"),
    notes: get("notes"),
    consent: fd.get("consent") ?? undefined,
    rights: fd.get("rights") ?? undefined,
  });

  const images = fd.getAll("images").filter((f): f is File => f instanceof File && f.size > 0).slice(0, c.maxImages);
  const errors: Record<string, string> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      errors[key] ??= key === "dates" ? "Bitte gib mindestens einen Termin mit Datum und Beginn an." : issue.message;
    }
  }
  if (!images.length) errors.images = "Bitte lade mindestens ein Bild hoch.";
  if (images.some((f) => !IMAGE_TYPES.includes(f.type) || f.size > MAX_IMAGE_BYTES))
    errors.images = "Bitte nur JPG, PNG oder WebP bis 5 MB.";
  if (!parsed.success || Object.keys(errors).length) {
    return { status: "error", message: "Bitte prüfe die markierten Felder.", errors };
  }
  const d = parsed.data;

  const supabase = getSupabase();
  if (!supabase) return { status: "error", message: "Das Speichern ist gerade nicht möglich. Bitte versuch es später noch einmal." };

  const { ipHash, userAgent } = await getRequestMeta();
  // Spamschutz: höchstens 5 Einreichungen je Anschluss und Stunde
  const since = new Date(Date.now() - 60 * 60_000).toISOString();
  const { count } = await supabase.from("event_submissions").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
  if ((count ?? 0) >= 5) return { status: "error", message: "Du hast gerade schon mehrere Events eingereicht. Bitte versuch es später noch einmal." };

  const id = randomUUID();
  const paths: string[] = [];
  for (const [i, file] of images.entries()) {
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = `${id}/${i === 0 ? "header" : `bild-${i}`}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      console.error("[event-submission] upload failed", error.message);
      return { status: "error", message: "Die Bilder konnten nicht hochgeladen werden. Bitte versuch es noch einmal." };
    }
    paths.push(path);
  }

  const { error: insertError } = await supabase.from("event_submissions").insert({
    id,
    title: d.title,
    subtitle: d.subtitle,
    category: d.category,
    short_description: d.shortDescription,
    long_description: d.longDescription,
    dates: d.dates,
    timeline: d.timeline,
    price: d.price,
    ticket_link: d.ticketLink,
    included: d.included || null,
    bring: d.bring || null,
    max_guests: d.maxGuests || null,
    organizer_name: d.organizerName,
    organizer_website: d.organizerWebsite || null,
    organizer_instagram: d.organizerInstagram || null,
    organizer_about: d.organizerAbout || null,
    contact_name: d.contactName,
    contact_email: d.contactEmail.toLowerCase(),
    contact_phone: d.contactPhone,
    notes: d.notes || null,
    image_paths: paths,
    ip_hash: ipHash,
    user_agent: userAgent,
  });
  if (insertError) {
    console.error("[event-submission] insert failed", insertError.message);
    await supabase.storage.from(BUCKET).remove(paths);
    return { status: "error", message: "Das Speichern hat nicht geklappt. Bitte versuch es noch einmal." };
  }

  // Benachrichtigung an CHURCH. mit allen Angaben und Bild-Links (7 Tage gültig)
  const resend = getResend();
  const to = process.env.NOTIFY_TO;
  const from = process.env.MAIL_FROM;
  if (resend && to && from) {
    const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrls(paths, 7 * 24 * 3600);
    const fmtDate = (s: string) => s.split("-").reverse().join(".");
    const lines: [string, string][] = [
      ["Event", d.title],
      ["Untertitel", d.subtitle],
      ["Kategorie", d.category],
      ["Termine", d.dates.map((t) => `${fmtDate(t.date)}, ${t.start}${t.end ? `–${t.end}` : ""} Uhr`).join("\n")],
      ["Kurzbeschreibung", d.shortDescription],
      ["Beschreibung", d.longDescription],
      ["Ablauf", d.timeline.map((t) => `${t.time} ${t.title}`.trim()).join("\n") || "–"],
      ["Preis", d.price],
      ["Tickets", d.ticketLink],
      ["Inklusive", d.included || "–"],
      ["Mitbringen", d.bring || "–"],
      ["Max. Teilnehmer", d.maxGuests || "–"],
      ["Veranstalter", d.organizerName],
      ["Website", d.organizerWebsite || "–"],
      ["Instagram", d.organizerInstagram || "–"],
      ["Über", d.organizerAbout || "–"],
      ["Ansprechperson", `${d.contactName} · ${d.contactEmail} · ${d.contactPhone}`],
      ["Anmerkungen", d.notes || "–"],
    ];
    const imgs = (signed ?? []).map((s, i) => `<a href="${escapeHtml(s.signedUrl ?? "")}">${i === 0 ? "Header-Bild" : `Bild ${i}`}</a>`).join(" · ");
    const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
<h2 style="margin:0 0 16px">Neues Event eingereicht: ${escapeHtml(d.title)}</h2>
<table cellpadding="6" style="border-collapse:collapse">${lines
      .map(([k, v]) => `<tr><td style="color:#666;padding-right:16px;vertical-align:top;white-space:nowrap">${k}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
<p style="margin-top:20px"><strong>Bilder</strong> (Links 7 Tage gültig, dauerhaft in Supabase › Storage › ${BUCKET}/${id}):<br>${imgs}</p>
<p style="margin-top:24px;color:#999;font-size:12px">Gespeichert in Supabase › event_submissions (ID ${id}). Antworten geht direkt an ${escapeHtml(d.contactEmail)}.</p>
</body></html>`;
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: d.contactEmail,
      subject: `Event eingereicht: ${d.title} – ${fmtDate(d.dates[0].date)}`,
      html,
      text: lines.map(([k, v]) => `${k}: ${v}`).join("\n"),
    });
    if (error) console.error("[event-submission] mail failed", error.message);

    const first = escapeHtml(d.contactName.split(" ")[0]);
    const { error: cErr } = await resend.emails.send({
      from,
      to: d.contactEmail,
      replyTo: to.split(",")[0].trim(),
      subject: `Danke – dein Event „${d.title}“ ist bei uns angekommen`,
      html: `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
<p>Hallo ${first},</p>
<p>danke für deine Angaben zu <strong>${escapeHtml(d.title)}</strong>. Wir bauen daraus deine Eventseite auf church-mannheim.com und melden uns, sobald sie online ist.</p>
<p>Falls sich noch etwas ändert, antworte einfach auf diese Mail.</p>
<p>Viele Grüße<br>Dein CHURCH. Team</p>
</body></html>`,
      text: `Hallo ${d.contactName.split(" ")[0]},\n\ndanke für deine Angaben zu „${d.title}“. Wir bauen daraus deine Eventseite auf church-mannheim.com und melden uns, sobald sie online ist.\n\nFalls sich noch etwas ändert, antworte einfach auf diese Mail.\n\nViele Grüße\nDein CHURCH. Team`,
    });
    if (cErr) console.error("[event-submission] confirmation failed", cErr.message);
  }

  return { status: "success" };
}
