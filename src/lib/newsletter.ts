import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { Resend } from "resend";
import { newsletter } from "@/content/newsletter";
import { absoluteUrl } from "@/content/site";
import { getResend } from "./mail";
import { buildDoiMail } from "./newsletter-mail";
import { getSupabase } from "./supabase";

const TOKEN_DAYS = 7;
const RESEND_COOLDOWN_MIN = 2; // gleiche Adresse: frühestens nach 2 Minuten erneut Link senden
const IP_LIMIT = 5; // pro Anschluss höchstens 5 Anmeldungen in 10 Minuten
const IP_WINDOW_MIN = 10;

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

export type SubscribeResult = "ok" | "rate_limited" | "error";

/** Startet die Anmeldung: speichert „pending“ und schickt den Bestätigungslink. Verrät nie, ob die Adresse schon existiert. */
export async function startNewsletterSubscription(input: {
  email: string;
  source: string;
  ipHash: string;
  userAgent: string;
}): Promise<SubscribeResult> {
  const supabase = getSupabase();
  const resend = getResend();
  const from = process.env.MAIL_FROM;
  if (!supabase || !resend || !from) {
    console.warn("[newsletter] nicht konfiguriert");
    return "error";
  }
  const email = input.email.trim().toLowerCase();
  const now = Date.now();

  // Aufräumen: unbestätigte Anmeldungen älter als 30 Tage löschen (laut Datenschutzerklärung)
  await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("status", "pending")
    .lt("requested_at", new Date(now - 30 * 86_400_000).toISOString());

  const since = new Date(now - IP_WINDOW_MIN * 60_000).toISOString();
  const { count } = await supabase
    .from("newsletter_subscribers")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", input.ipHash)
    .gte("requested_at", since);
  if ((count ?? 0) >= IP_LIMIT) return "rate_limited";

  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, status, requested_at, request_count")
    .eq("email", email)
    .maybeSingle();

  if (existing?.status === "confirmed") return "ok";
  if (existing && now - new Date(existing.requested_at).getTime() < RESEND_COOLDOWN_MIN * 60_000) return "ok";

  const token = randomBytes(32).toString("base64url");
  const row = {
    email,
    status: "pending",
    source: input.source,
    consent_text: newsletter.consent,
    token_hash: sha(token),
    requested_at: new Date(now).toISOString(),
    ip_hash: input.ipHash,
    user_agent: input.userAgent,
  };
  const { error: dbError } = existing
    ? await supabase
        .from("newsletter_subscribers")
        .update({ ...row, request_count: (existing.request_count ?? 1) + 1 })
        .eq("id", existing.id)
    : await supabase.from("newsletter_subscribers").insert(row);
  if (dbError) {
    console.error("[newsletter] speichern fehlgeschlagen", dbError.message);
    return "error";
  }

  const mail = buildDoiMail(absoluteUrl(`/newsletter/bestaetigen?token=${token}`));
  const { error: mailError } = await resend.emails.send({
    from,
    to: email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  });
  if (mailError) {
    console.error("[newsletter] Bestätigungsmail fehlgeschlagen", mailError.message);
    return "error";
  }
  return "ok";
}

/** Bestätigt per Token. Trägt die Adresse danach in das Resend-Segment ein. */
export async function confirmNewsletterSubscription(token: string, confirmIpHash: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase || !/^[\w-]{20,100}$/.test(token)) return false;

  const minRequested = new Date(Date.now() - TOKEN_DAYS * 86_400_000).toISOString();
  const { data: sub } = await supabase
    .from("newsletter_subscribers")
    .select("id, email")
    .eq("token_hash", sha(token))
    .eq("status", "pending")
    .gte("requested_at", minRequested)
    .maybeSingle();
  if (!sub) return false;

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString(), token_hash: null, confirm_ip_hash: confirmIpHash })
    .eq("id", sub.id);
  if (error) {
    console.error("[newsletter] bestätigen fehlgeschlagen", error.message);
    return false;
  }

  if (await syncToResend(sub.email)) {
    await supabase.from("newsletter_subscribers").update({ resend_synced_at: new Date().toISOString() }).eq("id", sub.id);
  }
  return true;
}

// Kontakt in Resend anlegen und dem Segment „CHURCH. Newsletter“ zuordnen.
// Braucht einen API-Key mit vollem Zugriff (RESEND_CONTACTS_API_KEY); der Sende-Key reicht dafür nicht.
async function syncToResend(email: string) {
  const key = process.env.RESEND_CONTACTS_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  if (!key || !segmentId) {
    console.warn("[newsletter] Resend-Segment nicht konfiguriert – Kontakt nur in Supabase");
    return false;
  }
  const resend = new Resend(key);
  const created = await resend.contacts.create({ email, unsubscribed: false, segments: [{ id: segmentId }] });
  if (!created.error) return true;

  // Kontakt existiert schon (z. B. aus einem anderen Verteiler): nur dem Segment hinzufügen
  const added = await resend.contacts.segments.add({ email, segmentId });
  if (added.error) {
    console.error("[newsletter] Resend-Sync fehlgeschlagen", created.error.message, added.error.message);
    return false;
  }
  return true;
}
