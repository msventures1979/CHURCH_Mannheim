import { confirmationMail as t } from "@/content/mails";
import { absoluteUrl, site } from "@/content/site";
import { escapeHtml } from "./escape";

// Nur ein sauberer Vorname kommt in die Mail – keine Links oder fremden Inhalte,
// damit das Formular nicht missbraucht werden kann, um Texte an Dritte zu schicken.
// Aus demselben Grund wird die Nachricht selbst nicht wiederholt.
export function safeFirstName(name: string) {
  const first = name.trim().split(/\s+/)[0] ?? "";
  return /^[\p{L}][\p{L}'-]{0,29}$/u.test(first) ? first : "";
}

const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? "");

export function buildConfirmationMail(input: { name: string; interest: string }) {
  const vorname = safeFirstName(input.name);
  const vars = { vorname, interesse: input.interest, telefon: site.phone };
  const greeting = vorname ? fill(t.greeting, vars) : t.greetingWithoutName;
  const paragraphs = t.paragraphs.map((p) => fill(p, vars));
  const eventsUrl = absoluteUrl("/events");
  const logoUrl = absoluteUrl("/images/og-image.jpg");
  const address = `${site.address.street} · ${site.address.zip} ${site.address.city}`;

  const p = (text: string) =>
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1a1a1a">${escapeHtml(text)}</p>`;

  const html = `<!doctype html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(t.subject)}</title></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff">
  <tr><td style="padding:0"><img src="${logoUrl}" width="560" alt="CHURCH. – Kapelle im Turley-Quartier Mannheim" style="display:block;width:100%;height:auto;border:0"></td></tr>
  <tr><td style="padding:32px 32px 8px">
    ${p(greeting)}
    ${paragraphs.map(p).join("\n    ")}
    ${p(t.eventsHint)}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 28px"><tr><td style="border:1px solid #0f0e0d">
      <a href="${eventsUrl}" style="display:inline-block;padding:12px 24px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#0f0e0d;text-decoration:none">${escapeHtml(t.eventsButton)}</a>
    </td></tr></table>
    <p style="margin:0 0 4px;font-size:16px;line-height:1.6;color:#1a1a1a">${escapeHtml(t.closing)}</p>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#1a1a1a;font-weight:700">${escapeHtml(t.team)}</p>
  </td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #e6e1d8;font-size:13px;line-height:1.6;color:#6b6560">
    ${escapeHtml(site.name)} · ${escapeHtml(address)}<br>
    <a href="${site.url}" style="color:#6b6560">church-mannheim.com</a> · <a href="${site.instagram}" style="color:#6b6560">Instagram</a>
  </td></tr>
</table>
<p style="max-width:560px;margin:16px auto 0;font-size:11px;line-height:1.5;color:#9a948d">${escapeHtml(t.footer)}</p>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    greeting,
    "",
    ...paragraphs.flatMap((x) => [x, ""]),
    t.eventsHint,
    `${t.eventsButton}: ${eventsUrl}`,
    "",
    t.closing,
    t.team,
    "",
    "—",
    `${site.name} · ${address}`,
    "church-mannheim.com",
    "",
    t.footer,
  ].join("\n");

  return { subject: t.subject, html, text };
}
