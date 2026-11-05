import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { formatDateRange, getEventSeries, upcomingEvents } from "@/content/events";
import { absoluteUrl } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

const title = "Events in der CHURCH. — Yoga, Dinners & Kultur in Mannheim";
const description =
  "Entdecke Events in der CHURCH. Mannheim: WineYoga, Pop-up Dinners, Kulturabende und mehr im historischen Kirchenraum im Turley-Quartier.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/events" },
  openGraph: { title, description, url: "/events" },
  twitter: { title, description },
};

export default function EventsPage() {
  const upcoming = upcomingEvents();

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={breadcrumbJsonLd([{ name: "Start", path: "/" }, { name: "Events", path: "/events" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Events in der CHURCH. Mannheim",
          itemListElement: upcoming.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/events/${e.slug}`),
            name: `${getEventSeries(e)?.title ?? ""} – ${formatDateRange(e, true)}`,
          })),
        }}
      />
      <Navbar />
      <header className="border-b border-border px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-widest text-primary">Programm</p>
          <h1 className="text-balance font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Events in der CHURCH. — Yoga, Dinners &amp; Kultur in Mannheim
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Yoga, Dinners, Kultur und mehr — im Kirchenraum der CHURCH.
          </p>
        </div>
      </header>

      <main className="flex-1">
        <section className="section-padding" aria-labelledby="upcoming-events-heading">
          <div className="mx-auto max-w-7xl">
            <h2 id="upcoming-events-heading" className="sr-only">Kommende Events</h2>
            {upcoming.length === 0 ? (
              <p className="text-muted-foreground">Aktuell sind keine Events angekündigt. Schau bald wieder vorbei.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {upcoming.map((e) => (
                  <EventCard key={e.slug} event={e} showPrice showDescription />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section-padding border-t border-border" aria-labelledby="popup-stores-heading">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 text-sm uppercase tracking-widest text-primary">Pop-up Stores</p>
            <h2 id="popup-stores-heading" className="text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Pop-up Store in der CHURCH.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Der historische Kirchenraum ist eine außergewöhnliche Bühne für temporäre Stores, Marken-Pop-ups und
              Verkaufsausstellungen. Hohe Decken, Buntglasfenster und eine Atmosphäre, die man nicht bauen kann – mitten
              im Turley-Quartier in Mannheim. Von Mode über Design bis Kunst: Wir geben eurer Marke für einige Tage oder
              Wochen den passenden Rahmen.
            </p>
            <div className="mt-10">
              <ButtonLink href="/#kontakt">Pop-up anfragen</ButtonLink>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-border bg-card">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Deine Idee. Unser Kirchenraum.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Du hast ein Eventkonzept und suchst einen besonderen Ort? Werde Partner:in der CHURCH.
            </p>
            <div className="mt-10">
              <ButtonLink href="/#kontakt">Partner werden</ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
