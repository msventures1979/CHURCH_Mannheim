import { newsletter } from "@/content/newsletter";
import { absoluteUrl, site } from "@/content/site";
import { escapeHtml } from "./escape";

// Double-Opt-In-Mail. Enthält bewusst keine Eingaben des Absenders.
export function buildDoiMail(confirmUrl: string) {
  const t = newsletter.mail;
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
  <tr><td style="padding:0"><img src="${absoluteUrl("/images/og-image.jpg")}" width="560" alt="CHURCH. – Kapelle im Turley-Quartier Mannheim" style="display:block;width:100%;height:auto;border:0"></td></tr>
  <tr><td style="padding:32px 32px 8px">
    ${p(t.greeting)}
    ${t.paragraphs.map(p).join("\n    ")}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px"><tr><td style="background:#0f0e0d">
      <a href="${escapeHtml(confirmUrl)}" style="display:inline-block;padding:14px 28px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#faf9f7;text-decoration:none">${escapeHtml(t.button)}</a>
    </td></tr></table>
    <p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#6b6560">${escapeHtml(t.validity)}</p>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#1a1a1a;font-weight:700">${escapeHtml(t.team)}</p>
  </td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #e6e1d8;font-size:13px;line-height:1.6;color:#6b6560">
    ${escapeHtml(site.company.name)} · ${escapeHtml(address)}<br>
    <a href="${absoluteUrl("/impressum")}" style="color:#6b6560">Impressum</a> · <a href="${absoluteUrl("/datenschutz")}" style="color:#6b6560">Datenschutz</a>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    t.greeting,
    "",
    ...t.paragraphs.flatMap((x) => [x, ""]),
    `${t.button}: ${confirmUrl}`,
    "",
    t.validity,
    "",
    t.team,
    "",
    "—",
    `${site.company.name} · ${address}`,
    `Impressum: ${absoluteUrl("/impressum")}`,
  ].join("\n");

  return { subject: t.subject, html, text };
}
