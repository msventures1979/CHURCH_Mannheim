# Übergabe – Website CHURCH. (www.church-mannheim.com)

Stand: 05.11.2026 · Umzug von Lovable nach Anleitung „Lovable-Umzug“ abgeschlossen bis Etappe 3.

## Wo liegt was

| Was | Wo |
|---|---|
| Code | GitHub `msventures1979/CHURCH_Mannheim` (öffentlich, bewusst so gelassen), Zweig `main` = live |
| Altes Lovable-Repo | GitHub `msventures1979/church-mannheim` (nur noch Referenz) |
| Hosting | Vercel, Team **marktform** (Hobby, privates Projekt), Projekt `church-mannheim`, Region fra1 |
| Datenbank | Supabase, Organisation **FOI** (Free), Projekt `church-mannheim`, Region Frankfurt, ID `vnvbusovsitsokqwpouk` |
| Mails | Resend, Team msventures, Domain `church-mannheim.com` (verifiziert, Region Ireland), Key „church-mannheim (Vercel)“ nur Senden |
| DNS | IONOS, Sicherung und aktueller Stand in `docs/dns-backup-2026-11-05.md` |
| Postfach | info@church-mannheim.com = Weiterleitung bei IONOS (angelegt 05.11.2026) |

## Technik

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4. Keine Drittanbieter ohne Einwilligung:
Schriften lokal, Google Analytics (G-J0RPGFDRDN) nur nach Zustimmung im Cookie-Hinweis, Google Maps erst nach Klick.

Inhalte ändern ohne Code-Kenntnisse: `src/content/` (siehe README). Vergangene Events verschwinden automatisch.

## Events pflegen

Termine in `src/content/events.ts`, Reihen (Texte, Bilder) in `src/content/eventSeries.ts`. Neue Termine per Chat an Claude oder direkt auf GitHub bearbeiten; Vercel deployt automatisch. Ein Admin-Bereich (`/admin`, Daten in Supabase) ist bewusst zurückgestellt (05.11.2026).

## SEO (05.11.2026)

Titel/Beschreibung auf „Eventlocation Mannheim“ und „Coworking Mannheim“, FAQ-Bereich (nicht im Menü), Schema.org (Organization, WebSite, EventVenue, Event, FAQPage, Breadcrumbs), Lighthouse SEO 100. Offen: Google Unternehmensprofil, Search Console (Sitemap einreichen), Bing Webmaster Tools, Backlinks von Partnern, ggf. Landingpage „Eventlocation mieten“ (braucht Kapazität, Bestuhlung, Preise, Catering).

## Kontaktformular

Server Action → Tabelle `inquiries` (Supabase, RLS an, nur service_role) + Benachrichtigung an `NOTIFY_TO` über Resend.
Antworten auf die Mail gehen direkt an den Absender. Spamschutz: Honeypot, 3 s Mindestzeit, max. 3 Anfragen / 10 Min.
Getestet am 05.11.2026: Eintrag gespeichert, Mail zugestellt. Testeinträge gelöscht.

## Umgebungsvariablen (Vercel, Production + Preview)

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Secret, `sb_secret_…`),
`RESEND_API_KEY` (Secret), `MAIL_FROM`, `NOTIFY_TO`. `NEXT_PUBLIC_NOINDEX` ist entfernt (live).

## Zurückdrehen

Solange Lovable läuft: bei IONOS A-Records `@` und `www` wieder auf `185.158.133.1`.

## Offen (Etappe 4, in einigen Tagen)

- [ ] Formspree-Einträge exportieren und in `inquiries` importieren (`source = 'formspree-import'`)
- [ ] TXT `_lovable` bei IONOS löschen
- [ ] Lovable-Projekt abschalten, Abo kündigen
- [ ] Sitemap `https://www.church-mannheim.com/sitemap.xml` in der Google Search Console einreichen
- [ ] Impressum: USt-IdNr. ergänzen, falls vorhanden; Anbieteradressen in der Datenschutzerklärung mit den AV-Verträgen abgleichen

## Hinweise

- Supabase Free pausiert nach 7 Tagen ohne Zugriff. Jede Formular-Anfrage zählt als Zugriff; bei langer Ruhe ggf. kurz im Dashboard öffnen.
- Vercel Hobby ist laut Vercel nur für private Nutzung vorgesehen (bewusste Entscheidung: privates Projekt).
- Schlüssel und Passwörter trägt Matthias selbst ein.
