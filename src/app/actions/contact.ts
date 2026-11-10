"use server";

import { z } from "zod";
import { contact } from "@/content/home";
import { xmas } from "@/content/weihnachtsmarkt";
import { confirmationMail } from "@/content/mails";
import { buildConfirmationMail } from "@/lib/confirmation-mail";
import { buildXmasConfirmationMail } from "@/lib/xmas-confirmation-mail";
import { escapeHtml, getResend } from "@/lib/mail";
import { startNewsletterSubscription } from "@/lib/newsletter";
import { getRequestMeta } from "@/lib/request-meta";
import { getSupabase } from "@/lib/supabase";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email", string>>;
};

const schema = z.object({
  name: z.string().trim().min(1, "Bitte gib deinen Namen ein.").max(100),
  email: z.string().trim().max(255).email("Bitte gib eine gültige E-Mail-Adresse ein."),
  phone: z.string().trim().max(30).optional().default(""),
  // Zusätzlich erlaubte Themen von Unterseiten, die nicht im Startseiten-Formular stehen
  interest: z.enum([...contact.interests, "Weihnachtsmarkt-Aussteller"] as unknown as [string, ...string[]]).catch("Sonstiges"),
  message: z.string().trim().max(2000).optional().default(""),
  newsletter: z.literal("on").optional(),
  // Zusatzfelder der Seite „Eventlocation mieten“
  eventDate: z.string().trim().max(40).optional().default(""),
  guests: z.string().trim().max(10).optional().default(""),
  eventType: z.string().trim().max(60).optional().default(""),
  timeOfDay: z.string().trim().max(40).optional().default(""),
});

const MIN_FILL_MS = 3000;
const RATE_LIMIT = 3;
const RATE_WINDOW_MIN = 10;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Spamschutz 1: Honeypot – echte Menschen sehen das Feld nicht.
  // Spamschutz 2: Mindestzeit zum Ausfüllen.
  // Bots bekommen eine Erfolgsmeldung, damit sie nicht weiterprobieren.
  const startedAt = Number(formData.get("t"));
  if (formData.get("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success", message: contact.success };
  }

  const parsed = schema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    interest: formData.get("interest") ?? "",
    message: formData.get("message") ?? "",
    newsletter: formData.get("newsletter") ?? undefined,
    eventDate: formData.get("eventDate") ?? "",
    guests: formData.get("guests") ?? "",
    eventType: formData.get("eventType") ?? "",
    timeOfDay: formData.get("timeOfDay") ?? "",
  });
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if ((key === "name" || key === "email") && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }
  const data = parsed.data;
  // Eventdetails vor die Nachricht setzen, damit sie in Mail und Datenbank stehen
  const details = [
    data.eventType && `Art: ${data.eventType}`,
    data.eventDate && `Wunschtermin: ${data.eventDate}`,
    data.timeOfDay && `Zeitraum: ${data.timeOfDay}`,
    data.guests && `Personen: ${data.guests}`,
  ].filter(Boolean);
  if (details.length) data.message = `${details.join("\n")}${data.message ? `\n\n${data.message}` : ""}`.slice(0, 2000);

  const { ipHash, userAgent } = await getRequestMeta();

  const supabase = getSupabase();
  let stored = false;

  if (supabase) {
    // Spamschutz 3: höchstens 3 Anfragen je E-Mail-Adresse bzw. Anschluss in 10 Minuten
    const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
    const recent = (column: "email" | "ip_hash", value: string) =>
      supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .gte("created_at", since)
        .eq(column, value);
    const [byEmail, byIp] = await Promise.all([recent("email", data.email.toLowerCase()), recent("ip_hash", ipHash)]);
    if (Math.max(byEmail.count ?? 0, byIp.count ?? 0) >= RATE_LIMIT) {
      return { status: "error", message: "Du hast uns gerade schon mehrfach geschrieben. Bitte versuch es in ein paar Minuten noch einmal." };
    }

    const { error } = await supabase.from("inquiries").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      interest: data.interest,
      message: data.message || null,
      ip_hash: ipHash,
      user_agent: userAgent,
    });
    if (error) console.error("[contact] insert failed", error.message);
    else stored = true;
  } else {
    console.warn("[contact] Supabase nicht konfiguriert");
  }

  let mailed = false;
  const resend = getResend();
  const to = process.env.NOTIFY_TO;
  const from = process.env.MAIL_FROM;
  if (resend && to && from) {
    const rows: [string, string][] = [
      ["Name", data.name],
      ["E-Mail", data.email],
      ["Telefon", data.phone || "–"],
      ["Interesse", data.interest],
    ];
    const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
<h2 style="margin:0 0 16px">Neue Anfrage über church-mannheim.com</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#666;padding-right:16px">${k}</td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
<p style="margin:20px 0 4px;color:#666">Nachricht</p>
<div style="white-space:pre-wrap;border-left:3px solid #c9b79c;padding-left:12px">${escapeHtml(data.message || "–")}</div>
<p style="margin-top:24px;color:#999;font-size:12px">Direkt antworten geht an ${escapeHtml(data.email)}.</p>
</body></html>`;

    const { error } = await resend.emails.send({
      from,
      // Weihnachtsmarkt-Anmeldungen gehen zusätzlich an die Organisatorin
      to: [
        ...to.split(",").map((s) => s.trim()),
        ...(data.interest === "Weihnachtsmarkt-Aussteller" ? xmas.notifyAlso : []),
      ],
      replyTo: data.email,
      subject: `Neue Anfrage: ${data.interest} – ${data.name}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nNachricht:\n${data.message || "–"}`,
    });
    if (error) console.error("[contact] mail failed", error.message);
    else mailed = true;

    // Bestätigung an den Absender (nur wenn eingeschaltet und die Anfrage gespeichert oder gemeldet wurde)
    if (confirmationMail.enabled && (stored || mailed)) {
      const isXmas = data.interest === "Weihnachtsmarkt-Aussteller";
      const c = isXmas
        ? buildXmasConfirmationMail({ name: data.name })
        : { ...buildConfirmationMail({ name: data.name, interest: data.interest }), replyTo: to.split(",")[0].trim() };
      const { error: cErr } = await resend.emails.send({
        from,
        to: data.email,
        replyTo: c.replyTo,
        subject: c.subject,
        html: c.html,
        text: c.text,
      });
      if (cErr) console.error("[contact] confirmation failed", cErr.message);
    }
  } else {
    console.warn("[contact] Resend nicht konfiguriert");
  }

  if (!stored && !mailed) return { status: "error", message: contact.error };

  // Newsletter nur bei ausdrücklich angehakter Checkbox – Double-Opt-In per eigener Mail
  if (data.newsletter === "on") {
    await startNewsletterSubscription({ email: data.email, source: "kontaktformular", ipHash, userAgent });
  }
  return { status: "success", message: contact.success };
}
