import { absoluteUrl, site } from "@/content/site";
import { xmas } from "@/content/weihnachtsmarkt";
import { safeFirstName } from "./confirmation-mail";
import { escapeHtml } from "./escape";

// Bestätigung für Weihnachtsmarkt-Aussteller:innen im Stil der Seite (Tannengrün & Gold).
// Wie bei der normalen Bestätigung wird nur ein geprüfter Vorname übernommen, keine Formularinhalte.
export function buildXmasConfirmationMail(input: { name: string }) {
  const t = xmas.confirmation;
  const vorname = safeFirstName(input.name);
  const greeting = vorname ? t.greeting.replace("{vorname}", vorname) : t.greetingWithoutName;
  const pageUrl = absoluteUrl("/weihnachtsmarkt");
  const headerUrl = absoluteUrl("/weihnachtsmarkt/opengraph-image.jpg");
  const address = `${site.address.street} · ${site.address.zip} ${site.address.city}`;
  const p = (s: string) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#f6efe0">${escapeHtml(s)}</p>`;

  const html = `<!doctype html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(t.subject)}</title></head>
<body style="margin:0;padding:0;background:#0d1d14;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d1d14;padding:32px 16px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#14291d;border:1px solid #3a4a33">
  <tr><td style="padding:0"><a href="${pageUrl}"><img src="${headerUrl}" width="560" alt="A Christmas Market at CHURCH." style="display:block;width:100%;height:auto;border:0"></a></td></tr>
  <tr><td style="padding:32px 32px 8px">
    ${p(greeting)}
    ${t.paragraphs.map(p).join("\n    ")}
    <p style="margin:24px 0 4px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:22px;color:#d9c38a">${escapeHtml(t.closing)}</p>
    <p style="margin:0 0 28px;font-size:15px;color:#f6efe0">${escapeHtml(t.team)}</p>
  </td></tr>
  <tr><td style="padding:20px 32px 28px;border-top:1px solid #2b3d2f">
    <p style="margin:0 0 6px;font-size:13px;color:#d9c38a;letter-spacing:2px">CHURCH.</p>
    <p style="margin:0 0 14px;font-size:13px;line-height:1.5;color:#a9b5a6">${escapeHtml(address)}</p>
    <p style="margin:0;font-size:11px;line-height:1.5;color:#7f8c7c">${escapeHtml(t.footer)}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [greeting, "", ...t.paragraphs.flatMap((s) => [s, ""]), t.closing, t.team, "", pageUrl, "", t.footer].join("\n");
  return { subject: t.subject, html, text, replyTo: t.replyTo };
}
