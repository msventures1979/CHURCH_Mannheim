import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { ConsentLink } from "@/components/Consent";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — CHURCH. Mannheim",
  description:
    "Datenschutzerklärung der CHURCH. Mannheim: Hosting, Kontaktformular, Google Analytics, Google Maps und Ihre Rechte nach DSGVO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title={<>Datenschutz&shy;erklärung</>}>
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          {site.company.name}
          <br />
          {site.address.street}, {site.address.zip} {site.address.city}
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          Telefon: {site.phone}
        </p>
      </section>

      <section>
        <h2>2. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Die Auslieferung
          erfolgt über ein weltweites Netz von Servern; die Anwendung selbst läuft in einem Rechenzentrum in Frankfurt am
          Main. Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit,
          aufgerufene Seite, Referrer, Browser und Betriebssystem), um die Website auszuliefern und vor Angriffen zu
          schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und
          zuverlässigen Betrieb). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Vercel ist unter dem
          EU-US Data Privacy Framework zertifiziert; ergänzend gelten die Standardvertragsklauseln der EU-Kommission.
        </p>
        <p className="mt-3">
          Zur statistischen Auswertung nutzen wir außerdem Vercel Web Analytics. Dabei werden keine Cookies gesetzt und
          keine Daten im Browser gespeichert. Erfasst werden aufgerufene Seiten, Referrer, Land, Browser, Betriebssystem
          und Gerätetyp. Besucher werden nur über einen Hash aus Anfrage-Merkmalen unterschieden, der nach 24 Stunden
          verfällt und keine Rückschlüsse auf Ihre Person erlaubt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an einer datensparsamen Reichweitenmessung).
        </p>
      </section>

      <section>
        <h2>3. Kontaktformular und Kontakt per E-Mail</h2>
        <p>
          Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben (Name, E-Mail-Adresse, optional
          Telefonnummer, Interesse und Nachricht), um Ihre Anfrage zu beantworten. Zum Schutz vor Missbrauch speichern wir
          zusätzlich einen verkürzten, nicht rückrechenbaren Prüfwert Ihrer IP-Adresse und die Browserkennung.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) bzw. Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an der Beantwortung allgemeiner Anfragen und an der Abwehr von Spam).
        </p>
        <p className="mt-3">
          Die Anfragen werden in einer Datenbank bei Supabase Inc. (970 Toa Payoh North #07-04, Singapur 318992)
          gespeichert; die Datenbank liegt in einem Rechenzentrum in Frankfurt am Main. Die Benachrichtigung an uns
          versenden wir über Resend (Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Mit
          beiden Anbietern bestehen Verträge zur Auftragsverarbeitung; für Übermittlungen in Drittländer gelten die
          Standardvertragsklauseln der EU-Kommission.
        </p>
        <p className="mt-3">
          Wir löschen Ihre Angaben, sobald Ihre Anfrage abschließend bearbeitet ist und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section id="newsletter">
        <h2>4. Newsletter</h2>
        <p>
          Wenn Sie sich für unseren Newsletter anmelden, verarbeiten wir Ihre E-Mail-Adresse, um Ihnen Informationen zu
          Programm, Events und Neuigkeiten der CHURCH. zu senden. Die Anmeldung erfolgt im Double-Opt-In-Verfahren: Erst
          nach Klick auf den Link in unserer Bestätigungsmail werden Sie in den Verteiler aufgenommen. Zum Nachweis der
          Einwilligung speichern wir den Zeitpunkt von Anmeldung und Bestätigung, den Wortlaut der Einwilligung, einen
          verkürzten, nicht rückrechenbaren Prüfwert Ihrer IP-Adresse und die Browserkennung.
        </p>
        <p className="mt-3">
          Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können sie jederzeit über den
          Abmeldelink in jeder Mail oder per Nachricht an <a href={`mailto:${site.email}`}>{site.email}</a> widerrufen.
          Die Anmeldedaten speichern wir bei Supabase (Rechenzentrum Frankfurt am Main), den Versand übernimmt Resend
          (siehe Abschnitt 3). Nach einer Abmeldung erhalten Sie keine Newsletter mehr. Den Nachweis der früheren
          Einwilligung bewahren wir bis zu drei Jahre auf, um die Rechtmäßigkeit des Versands belegen zu können (Art. 6
          Abs. 1 lit. f DSGVO); auf Wunsch löschen wir Ihre Daten vollständig. Unbestätigte Anmeldungen löschen wir nach
          spätestens 30 Tagen.
        </p>
      </section>

      <section id="analytics">
        <h2>5. Google Analytics (nur mit Einwilligung)</h2>
        <p>
          Wenn Sie im Cookie-Hinweis einwilligen, nutzen wir Google Analytics 4 der Google Ireland Limited, Gordon House,
          Barrow Street, Dublin 4, Irland. Google Analytics setzt Cookies und wertet aus, wie Besucher die Website nutzen
          (z. B. aufgerufene Seiten, Verweildauer, ungefährer Standort, Gerät). IP-Adressen werden von Google Analytics 4
          nicht gespeichert. Die Daten können an Google LLC in den USA übermittelt werden; Google ist unter dem EU-US Data
          Privacy Framework zertifiziert.
        </p>
        <p className="mt-3">
          Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ohne Einwilligung
          wird Google Analytics nicht geladen. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft
          widerrufen: <ConsentLink className="text-foreground underline hover:text-primary" />. Weitere Informationen
          finden Sie in der{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </section>

      <section id="karte">
        <h2>6. Google Maps (erst nach Klick)</h2>
        <p>
          Im Kontaktbereich können Sie eine Karte von Google Maps (Google Ireland Limited) laden. Die Karte wird erst
          eingebunden, wenn Sie auf „Karte laden“ klicken. Erst dann wird eine Verbindung zu Servern von Google hergestellt
          und dabei unter anderem Ihre IP-Adresse übermittelt. Rechtsgrundlage ist Ihre Einwilligung durch den Klick
          (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).
        </p>
      </section>

      <section>
        <h2>7. Schriften, Links und WhatsApp</h2>
        <p>
          Alle Schriften werden von unserem eigenen Server geladen; es besteht keine Verbindung zu Google Fonts. Links zu
          Instagram, LinkedIn, WhatsApp, Ticket-Shops unserer Partner und anderen Websites sind einfache Verlinkungen: Daten
          werden erst übertragen, wenn Sie den Link anklicken. Für die verlinkten Angebote gelten die
          Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
      </section>

      <section>
        <h2>8. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p className="mt-3">
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <section>
        <h2>9. Beschwerderecht</h2>
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist der
          Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.
        </p>
      </section>

      <section>
        <h2>10. Stand</h2>
        <p>November 2026</p>
      </section>
    </LegalPage>
  );
}
