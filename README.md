# CHURCH. – Website

Coworking & Eventfläche in einer denkmalgeschützten Kapelle von 1893 im Turley-Quartier Mannheim.
Live: https://www.church-mannheim.com

**Technik:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Vercel (fra1) · Supabase · Resend

## Inhalte ändern (ohne Code-Kenntnisse)

| Was | Datei |
| --- | --- |
| Kontaktdaten, Adresse, Firma (Impressum) | `src/content/site.ts` |
| Texte der Startseite | `src/content/home.ts` |
| Event-Termine | `src/content/events.ts` |
| Event-Reihen (Beschreibung, Ablauf, Bilder) | `src/content/eventSeries.ts` |
| Partner | `src/content/partners.ts` |
| Bilder | `src/assets/` |

Vergangene Termine verschwinden automatisch (stündliche Aktualisierung).

## Entwickeln

```bash
npm install
cp .env.example .env.local   # Werte eintragen
npm run dev
npm run typecheck && npm run lint && npm run build
```

## Kontaktformular

Server Action (`src/app/actions/contact.ts`) → Tabelle `inquiries` in Supabase + Benachrichtigung über Resend an `NOTIFY_TO`.
Spamschutz ohne Captcha: Honeypot, Mindestzeit 3 s, max. 3 Anfragen je Adresse in 10 Minuten.
Schema: `supabase/migrations/`.

## Datenschutz

Keine Drittanbieter ohne Einwilligung: Schriften lokal, Google Analytics nur nach Zustimmung im Cookie-Hinweis,
Google Maps erst nach Klick. Vorschau-URLs (`*.vercel.app`) und `NEXT_PUBLIC_NOINDEX=1` setzen `noindex`.
