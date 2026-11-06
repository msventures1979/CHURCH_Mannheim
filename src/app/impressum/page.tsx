import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum — CHURCH. Mannheim",
  description: `Impressum der CHURCH. Mannheim — ${site.company.name}, ${site.address.street}, ${site.address.zip} ${site.address.city}.`,
  alternates: { canonical: "/impressum" },
};

const Address = () => (
  <>
    {site.address.street}
    <br />
    {site.address.zip} {site.address.city}
  </>
);

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {site.company.name}
          <br />
          <Address />
        </p>
      </section>
      <section>
        <h2>Vertreten durch</h2>
        <p>{site.company.representative}</p>
      </section>
      <section>
        <h2>Registereintrag</h2>
        <p>
          {site.company.register}
          <br />
          {site.company.registerNumber}
        </p>
      </section>
      <section>
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          <br />
          {site.company.vatId}
        </p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          Telefon: {site.phone}
          <br />
          Web: www.church-mannheim.com
        </p>
      </section>
      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          {site.company.responsible}
          <br />
          <Address />
        </p>
      </section>
    </LegalPage>
  );
}
