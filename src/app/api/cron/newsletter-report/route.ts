import { Resend } from "resend";
import { newsletterReport } from "@/content/mails";
import { site } from "@/content/site";
import { escapeHtml } from "@/lib/escape";
import { getResend } from "@/lib/mail";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Läuft montags per Vercel Cron (vercel.json). Höchstens ein Bericht pro Kalenderwoche,
// damit ein manueller Aufruf der Adresse keine Mail-Flut auslöst.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const supabase = getSupabase();
  const resend = getResend();
  const from = process.env.MAIL_FROM;
  if (!supabase || !resend || !from) return Response.json({ ok: false, reason: "not configured" }, { status: 500 });

  const now = Date.now();
  const { data: last } = await supabase
    .from("newsletter_reports")
    .select("sent_at")
    .gte("sent_at", new Date(startOfWeekBerlin(now)).toISOString())
    .limit(1);
  if (last && last.length > 0) return Response.json({ ok: true, skipped: "already sent this week" });

  const weekAgo = new Date(now - 7 * 86_400_000).toISOString();
  const [{ data: fresh }, { count: confirmedTotal }, { count: pending }] = await Promise.all([
    supabase
      .from("newsletter_subscribers")
      .select("email, source, confirmed_at")
      .eq("status", "confirmed")
      .gte("confirmed_at", weekAgo)
      .order("confirmed_at", { ascending: true }),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }).eq("status", "pending"),
  ]);
  const newOnes = fresh ?? [];

  // Abmeldungen kennt nur Resend: aktuelle Zahlen aus dem Segment holen
  const seg = await segmentStats();

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" }).format(new Date(iso));
  const sourceLabel = (s: string) => ({ footer: "Website", kontaktformular: "Kontaktformular" })[s] ?? s;

  const lines = newOnes.map((n) => `${n.email} · ${sourceLabel(n.source)} · ${fmt(n.confirmed_at!)}`);
  const stats: [string, string][] = [
    ["Neu bestätigt (7 Tage)", String(newOnes.length)],
    ["Abonnenten aktiv", seg ? String(seg.subscribed) : String(confirmedTotal ?? 0)],
    ...(seg ? ([["Abgemeldet (gesamt)", String(seg.unsubscribed)]] as [string, string][]) : []),
    ["Offene Bestätigungen", String(pending ?? 0)],
  ];

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
<h2 style="margin:0 0 16px">Newsletter-Wochenbericht</h2>
<table cellpadding="6" style="border-collapse:collapse;margin-bottom:20px">${stats
    .map(([k, v]) => `<tr><td style="color:#666;padding-right:24px">${k}</td><td style="font-weight:bold">${v}</td></tr>`)
    .join("")}</table>
<p style="margin:0 0 6px;color:#666">Neue Abonnenten</p>
${
  lines.length
    ? `<ul style="margin:0;padding-left:18px">${lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}</ul>`
    : `<p style="margin:0">Diese Woche keine neuen Anmeldungen.</p>`
}
<p style="margin-top:24px;color:#999;font-size:12px">Versand an Abonnenten: Resend → Broadcasts → Segment „CHURCH. Newsletter“. ${escapeHtml(site.url)}</p>
</body></html>`;
  const text = [
    "Newsletter-Wochenbericht",
    "",
    ...stats.map(([k, v]) => `${k}: ${v}`),
    "",
    "Neue Abonnenten:",
    ...(lines.length ? lines.map((l) => `- ${l}`) : ["Diese Woche keine neuen Anmeldungen."]),
  ].join("\n");

  const { error } = await resend.emails.send({ from, to: newsletterReport.to, subject: newsletterReport.subject, html, text });
  if (error) {
    console.error("[newsletter-report] Versand fehlgeschlagen", error.message);
    return Response.json({ ok: false }, { status: 500 });
  }
  await supabase.from("newsletter_reports").insert({ new_count: newOnes.length, total: seg?.subscribed ?? confirmedTotal ?? 0 });
  return Response.json({ ok: true, new: newOnes.length });
}

async function segmentStats() {
  const key = process.env.RESEND_CONTACTS_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  if (!key || !segmentId) return null;
  const r = new Resend(key);
  let subscribed = 0;
  let unsubscribed = 0;
  let after: string | undefined;
  for (let page = 0; page < 50; page++) {
    const { data, error } = await r.contacts.list(after ? { segmentId, limit: 100, after } : { segmentId, limit: 100 });
    if (error || !data) return null;
    for (const c of data.data) {
      if (c.unsubscribed) unsubscribed++;
      else subscribed++;
    }
    if (!data.has_more || data.data.length === 0) break;
    after = data.data[data.data.length - 1].id;
  }
  return { subscribed, unsubscribed };
}

// Montag 00:00 Uhr (Mannheimer Zeit) der laufenden Woche als Zeitstempel
function startOfWeekBerlin(now: number) {
  const b = new Date(new Date(now).toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
  const daysSinceMonday = (b.getDay() + 6) % 7;
  const msIntoDay = ((b.getHours() * 60 + b.getMinutes()) * 60 + b.getSeconds()) * 1000;
  return now - daysSinceMonday * 86_400_000 - msIntoDay;
}
