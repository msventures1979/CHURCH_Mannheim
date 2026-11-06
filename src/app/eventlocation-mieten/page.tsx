import type { Metadata } from "next";
import Image from "next/image";
import glassImg from "@/assets/church-stained-glass.jpg";
import hallImg from "@/assets/church-hall-entrance.jpg";
import kitchenImg from "@/assets/church-kitchen.jpg";
import benchImg from "@/assets/church-light-bench.jpg";
import exteriorImg from "@/assets/church-exterior.jpg";
import EventInquiry from "@/components/EventInquiry";
import FadeIn from "@/components/FadeIn";
import FeatureList from "@/components/FeatureList";
import FloorPlan from "@/components/FloorPlan";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { rental } from "@/content/rental";
import { absoluteUrl, site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const path = "/eventlocation-mieten";

export const metadata: Metadata = {
  title: rental.meta.title,
  description: rental.meta.description,
  alternates: { canonical: path },
  openGraph: { title: rental.meta.title, description: rental.meta.description, url: path, images: [{ url: hallImg.src }] },
  twitter: { title: rental.meta.title, description: rental.meta.description, images: [hallImg.src] },
};

const eyebrowCls = "mb-6 text-sm uppercase tracking-widest text-primary";
const h2Cls = "text-balance font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl";

export default function RentalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Eventlocation mieten – CHURCH. Mannheim",
          serviceType: "Vermietung Eventlocation",
          description: rental.meta.description,
          url: absoluteUrl(path),
          areaServed: { "@type": "City", name: "Mannheim" },
          provider: { "@id": absoluteUrl("/#venue") },
          offers: {
            "@type": "Offer",
            url: absoluteUrl(path),
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: 1000,
              priceCurrency: "EUR",
              unitText: "pro Abend",
              valueAddedTaxIncluded: false,
            },
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: rental.faq.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Start", path: "/" }, { name: "Eventlocation mieten", path }])} />
      <Navbar />

      {/* Hero */}
      <header className="relative min-h-[88svh] overflow-hidden">
        <Image src={hallImg} alt={rental.hero.imageAlt} fill priority placeholder="blur" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
        <div className="relative flex min-h-[88svh] flex-col justify-end px-6 pb-14 pt-36 md:px-12 md:pb-20 lg:px-24">
          <div className="mx-auto w-full max-w-7xl">
            <p className={eyebrowCls}>{rental.hero.eyebrow}</p>
            <h1 className="max-w-4xl text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {rental.hero.title}
              <span className="sr-only"> – Eventlocation in Mannheim mieten</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{rental.hero.text}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#anfrage"
                className="border border-foreground bg-foreground px-8 py-3 text-sm uppercase tracking-widest text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground"
              >
                {rental.hero.cta}
              </a>
              <a href="#preise" className="inline-block py-3 text-sm uppercase tracking-widest text-primary transition-colors hover:text-foreground">
                Preise ansehen →
              </a>
            </div>
            <dl className="mt-14 grid max-w-4xl grid-cols-2 gap-y-6 border-t border-border pt-8 md:grid-cols-4">
              {rental.facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-bold text-foreground md:text-3xl">{f.value}</span>
                    <span className="mt-1 block text-xs uppercase tracking-widest text-muted-foreground">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Anlässe */}
        <section className="section-padding border-t border-border">
          <FadeIn className="mx-auto max-w-7xl">
            <p className={eyebrowCls}>{rental.occasions.eyebrow}</p>
            <h2 className={`${h2Cls} mb-14`}>{rental.occasions.headline}</h2>
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {rental.occasions.items.map((o) => (
                <div key={o.title} className="bg-background p-8">
                  <h3 className="font-display text-xl font-bold text-foreground">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{o.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Raum & Kapazität */}
        <section className="section-padding border-t border-border">
          <FadeIn className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className={eyebrowCls}>{rental.space.eyebrow}</p>
              <h2 className={h2Cls}>{rental.space.headline}</h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">{rental.space.text}</p>
              <table className="mt-10 w-full text-left">
                <caption className="sr-only">Kapazität nach Bestuhlung</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
                    <th scope="col" className="py-3 font-normal">Aufbau</th>
                    <th scope="col" className="py-3 text-right font-normal">Gäste</th>
                  </tr>
                </thead>
                <tbody>
                  {rental.space.capacities.map((c) => (
                    <tr key={c.setup} className="border-b border-border">
                      <th scope="row" className="py-4 font-display text-lg font-medium text-foreground">{c.setup}</th>
                      <td className="py-4 text-right text-lg text-primary">{c.guests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{rental.space.capacityNote}</p>
            </div>
            <div className="lg:pt-6">
              <FloorPlan />
            </div>
          </FadeIn>
        </section>

        {/* Bilder */}
        <section className="border-t border-border" aria-label="Eindrücke">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { src: glassImg, alt: "Buntglasfenster im Kirchenraum" },
              { src: kitchenImg, alt: "Designküche im Saal" },
              { src: benchImg, alt: "Lichtspiel auf der Kirchenbank" },
              { src: exteriorImg, alt: "Außenansicht der Kapelle" },
            ].map((img) => (
              <div key={img.alt} className="relative aspect-square overflow-hidden">
                <Image src={img.src} alt={`${img.alt} – Eventlocation CHURCH. Mannheim`} fill placeholder="blur" sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Ausstattung */}
        <section className="section-padding border-t border-border">
          <FadeIn className="mx-auto max-w-7xl">
            <p className={eyebrowCls}>{rental.features.eyebrow}</p>
            <h2 className={`${h2Cls} mb-12`}>{rental.features.headline}</h2>
            <FeatureList items={rental.features.items} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
          </FadeIn>
        </section>

        {/* Preise */}
        <section id="preise" className="section-padding scroll-mt-20 border-t border-border bg-card">
          <FadeIn className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className={eyebrowCls}>{rental.pricing.eyebrow}</p>
              <h2 className={h2Cls}>{rental.pricing.headline}</h2>
              <p className="mt-10 font-display text-5xl font-bold text-foreground md:text-6xl">{rental.pricing.price}</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-primary">{rental.pricing.unit}</p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">{rental.pricing.text}</p>
            </div>
            <div className="space-y-10">
              <div>
                <h3 className="mb-5 text-xs font-normal uppercase tracking-[0.2em] text-primary">Enthalten</h3>
                <FeatureList items={rental.pricing.included} />
              </div>
              <div>
                <h3 className="mb-5 text-xs font-normal uppercase tracking-[0.2em] text-primary">Nach Absprache</h3>
                <FeatureList items={rental.pricing.onRequest} />
              </div>
              <div className="border-t border-border pt-8">
                <h3 className="font-display text-xl font-bold text-foreground">{rental.pricing.cateringTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{rental.pricing.cateringText}</p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FAQ */}
        <section className="section-padding border-t border-border">
          <FadeIn className="mx-auto max-w-4xl">
            <p className={eyebrowCls}>FAQ</p>
            <h2 className={`${h2Cls} mb-12`}>Häufige Fragen.</h2>
            <div className="divide-y divide-border border-y border-border">
              {rental.faq.map((it) => (
                <details key={it.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-medium text-foreground md:text-xl [&::-webkit-details-marker]:hidden">
                    <h3>{it.q}</h3>
                    <span aria-hidden className="mt-1 text-primary transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{it.a}</p>
                </details>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Anfrage */}
        <section id="anfrage" className="section-padding scroll-mt-20 border-t border-border">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-24">
            <div>
              <p className={eyebrowCls}>{rental.form.eyebrow}</p>
              <h2 className={h2Cls}>{rental.form.headline}</h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">{rental.form.text}</p>
              <div className="mt-10 space-y-4 text-sm text-muted-foreground">
                <p>
                  <span className="mb-1 block text-xs uppercase tracking-widest">Lieber direkt?</span>
                  <a href={site.phoneHref} className="inline-block py-2 text-foreground hover:text-primary">{site.phone}</a>
                  <br />
                  <a href={`mailto:${site.email}`} className="inline-block py-2 text-foreground hover:text-primary">{site.email}</a>
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <EventInquiry />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
