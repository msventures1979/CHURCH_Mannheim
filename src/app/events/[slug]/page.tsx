import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  events,
  eventSchedule,
  formatDateRange,
  getEvent,
  getEventSeries,
  isPast,
  isTicketEvent,
  otherDatesInSeries,
  type EventDate,
} from "@/content/events";
import { getPartner } from "@/content/partners";
import { absoluteUrl, site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { newsletter } from "@/content/newsletter";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

function load(slug: string) {
  const event = getEvent(slug);
  const series = event ? getEventSeries(event) : undefined;
  if (!event || !series) return null;
  return { event, series, partner: getPartner(series.partnerId) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = load((await params).slug);
  if (!data) return {};
  const { event, series, partner } = data;
  const dateLabel = formatDateRange(event, true);
  const isTicket = isTicketEvent(event);
  const title = isTicket
    ? `${series.title} — ${dateLabel}, Mannheim`
    : `${series.title} — Pop-up in der CHURCH. Mannheim`;
  const description = isTicket
    ? `${series.title.replace(" in der CHURCH.", "")} mit ${partner?.name ?? "unseren Partnern"} in der CHURCH. Mannheim: ${series.shortDescription}`
    : series.shortDescription;
  const path = `/events/${event.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [{ url: series.heroImage.src }] },
    twitter: { title, description, images: [series.heroImage.src] },
  };
}

function eventJsonLd(event: EventDate, data: NonNullable<ReturnType<typeof load>>) {
  const { series, partner } = data;
  const { start, end } = eventSchedule(event);
  const availability =
    event.status === "sold_out"
      ? "https://schema.org/SoldOut"
      : event.status === "few_left"
        ? "https://schema.org/LimitedAvailability"
        : "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${series.title} – ${formatDateRange(event, true)}`,
    description: series.shortDescription,
    startDate: start,
    endDate: end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absoluteUrl(`/events/${event.slug}`),
    location: {
      "@type": "Place",
      "@id": absoluteUrl("/#venue"),
      name: site.name,
      geo: { "@type": "GeoCoordinates", ...site.geo },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        postalCode: site.address.zip,
        addressCountry: "DE",
      },
    },
    image: absoluteUrl(series.heroImage.src),
    organizer: partner
      ? { "@type": partner.type ?? "Person", name: partner.name, url: partner.website }
      : { "@type": "Organization", name: site.name },
    ...(partner && (partner.type ?? "Person") === "Person" ? { performer: { "@type": "Person", name: partner.name } } : {}),
    offers: {
      "@type": "Offer",
      price: (event.price.match(/\d+/) ?? ["0"])[0],
      priceCurrency: "EUR",
      availability,
      url: absoluteUrl(`/events/${event.slug}`),
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const data = load((await params).slug);
  // Unbekannte oder gelöschte Events (z. B. alte Termine) landen auf der Übersicht statt auf 404
  if (!data) permanentRedirect("/events");
  const { event, series, partner } = data;
  if (isPast(event)) permanentRedirect("/events");

  const others = otherDatesInSeries(event);
  const isTicket = isTicketEvent(event);
  const isPeriod = !!event.endDate;
  const ctaLabel = isTicket ? "Ticket sichern" : "Mehr Infos";
  const dateLabel = formatDateRange(event, true);
  const isSoldOut = event.status === "sold_out";
  const isFewLeft = event.status === "few_left";
  const h1 = isPeriod ? series.title : `${series.title} — ${dateLabel}, Mannheim`;

  const facts = isPeriod
    ? [
        { label: "Zeitraum", value: dateLabel },
        { label: "Öffnungszeiten", value: event.time },
        { label: "Eintritt", value: event.price },
        { label: "Ort", value: "CHURCH., Mannheim" },
      ]
    : [
        { label: "Datum", value: dateLabel },
        { label: "Uhrzeit", value: event.time },
        { label: "Dauer", value: event.duration },
        { label: "Preis", value: event.price.replace(" pro Person", " p. P.") },
        { label: "Ort", value: "CHURCH., Mannheim" },
      ];

  return (
    <div className="flex min-h-screen flex-col pb-20 md:pb-0">
      <JsonLd data={eventJsonLd(event, data)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: "Events", path: "/events" },
          { name: series.title, path: `/events/${event.slug}` },
        ])}
      />
      <Navbar />

      <header className="relative h-[60vh] min-h-[420px] overflow-hidden md:h-[55vh]">
        <Image src={series.heroImage} alt={series.title} fill priority placeholder="blur" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-10 md:px-12 md:pb-14 lg:px-24">
          <div className="mx-auto w-full max-w-7xl">
            <Link href="/events" className="text-xs uppercase tracking-widest text-primary transition-colors hover:text-foreground">
              ← Alle Events
            </Link>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-primary">{series.categories.join(" · ")}</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">{h1}</h1>
            <p className="mt-3 text-base text-primary md:text-lg">{series.subtitle}</p>
          </div>
        </div>
      </header>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-5 md:gap-4 md:px-12 md:py-10 lg:px-24">
          {facts.map((d) => (
            <div key={d.label}>
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-primary">{d.label}</p>
              <p className="text-sm text-foreground md:text-base">{d.value}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="flex-1 px-6 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-14 lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {series.longDescription.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>

            <div>
              <h2 className="mb-8 text-xs font-normal uppercase tracking-[0.2em] text-primary">
                {isPeriod ? "Das erwartet dich" : "Der Abend"}
              </h2>
              <ol className="relative space-y-8 border-l border-border pl-8">
                {series.timeline.map((step) => (
                  <li key={step.title} className="relative">
                    <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                    <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground md:text-base">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="mb-8 text-xs font-normal uppercase tracking-[0.2em] text-primary">Gut zu wissen</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {series.infos.map((info) => (
                  <div key={info.label} className="border-t border-border pt-4">
                    <p className="mb-1 text-xs uppercase tracking-widest text-foreground">{info.label}</p>
                    <p className="text-sm text-muted-foreground">{info.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div className="border border-border bg-card p-8">
              <p className="text-foreground">{dateLabel}</p>
              <p className="mt-1 text-sm text-primary">{event.time}</p>
              <div className="my-6 border-t border-border" />
              <p className="font-display text-2xl font-bold text-foreground md:text-3xl">{isPeriod ? "Eintritt frei" : event.price}</p>
              <p className="mt-2 text-xs text-primary">
                {isSoldOut ? "Ausgebucht" : isFewLeft ? "Nur noch wenige Plätze" : isTicket ? "Begrenzte Plätze" : "Ohne Anmeldung"}
              </p>

              {isSoldOut ? (
                <>
                  <button disabled className="mt-6 block w-full cursor-not-allowed border border-border px-6 py-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
                    Ausgebucht
                  </button>
                  <p className="mt-4 text-xs text-muted-foreground">Auf die Warteliste? Schreib uns.</p>
                </>
              ) : (
                <a
                  href={event.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full border border-foreground px-6 py-3 text-center text-xs uppercase tracking-widest text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
                >
                  {ctaLabel}
                </a>
              )}

              <a
                href={`/events/${event.slug}/kalender.ics`}
                download={`church-${event.slug}.ics`}
                className="mt-3 block w-full border border-border px-6 py-3 text-center text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:border-foreground hover:text-foreground"
              >
                In Kalender eintragen
              </a>

              <p className="mt-5 text-xs text-muted-foreground">
                {newsletter.eventHint}{" "}
                <a href="#newsletter" className="text-primary hover:text-foreground">{newsletter.eventHintLink} →</a>
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Fragen?{" "}
                <a href={`mailto:${site.email}`} className="text-primary hover:text-foreground">{site.email}</a>
              </p>
            </div>

            {partner && (
              <div className="border border-border bg-card p-8">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                    {partner.image ? (
                      <Image src={partner.image} alt={partner.name} fill sizes="64px" className="object-cover" />
                    ) : (
                      <span className="font-display text-lg font-bold text-primary">
                        {partner.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">{partner.name}</p>
                    <p className="text-sm leading-snug text-primary">{partner.role}</p>
                    {partner.website && (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs uppercase tracking-widest text-primary hover:text-foreground">
                        {partner.website.replace(/^https?:\/\//, "")} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        {others.length > 0 && (
          <div className="mx-auto mt-20 max-w-7xl border-t border-border pt-16 md:mt-24">
            <p className="mb-10 text-xs uppercase tracking-[0.2em] text-primary">Weitere Termine dieser Reihe</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <Link key={o.slug} href={`/events/${o.slug}`} className="group block border border-border bg-card p-6 transition-colors hover:border-primary/40">
                  <p className="font-display text-lg font-bold text-foreground">{formatDateRange(o, true)}</p>
                  <p className="mt-1 text-sm text-primary">{o.time}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{o.price}</p>
                  <p className="mt-5 text-xs uppercase tracking-widest text-primary transition-colors group-hover:text-foreground">Details →</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <section className="section-padding border-t border-border bg-card">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Selbst ein Event in der CHURCH. planen?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Den Kirchenraum mit Designküche kannst du für Firmenevents, Dinner, Workshops und Pop-ups mieten.
          </p>
          <div className="mt-10">
            <Link href="/eventlocation-mieten" className="inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background">
              Location mieten
            </Link>
          </div>
        </div>
      </section>

      {!isSoldOut && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 md:hidden">
          <div className="text-xs">
            <p className="font-bold text-foreground">{isTicket ? event.price.split(" ").slice(0, 2).join(" ") : event.price}</p>
            <p className="text-primary">{dateLabel.replace(/ \d{4}$/, "")}</p>
          </div>
          <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="border border-foreground px-5 py-2.5 text-[11px] uppercase tracking-widest text-foreground">
            {ctaLabel}
          </a>
        </div>
      )}

      <Footer />
    </div>
  );
}
