import type { Metadata } from "next";
import Image from "next/image";
import exteriorSideImg from "@/assets/church-exterior-side.jpg";
import glassCloseupImg from "@/assets/church-glass-closeup.jpg";
import glassDetailImg from "@/assets/church-glass-detail.jpg";
import windowImg from "@/assets/church-window-view.jpg";
import CoworkingInquiry from "@/components/CoworkingInquiry";
import FadeIn from "@/components/FadeIn";
import FeatureList from "@/components/FeatureList";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { coworkingPage as c } from "@/content/coworking";
import { absoluteUrl, site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const path = "/coworking-mannheim";

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: path },
  openGraph: { title: c.meta.title, description: c.meta.description, url: path, images: [{ url: windowImg.src }] },
  twitter: { title: c.meta.title, description: c.meta.description, images: [windowImg.src] },
};

const eyebrowCls = "mb-6 text-sm uppercase tracking-widest text-primary";
const h2Cls = "text-balance font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl";

export default function CoworkingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Coworking in der CHURCH. Mannheim",
          serviceType: "Coworking-Space",
          description: c.meta.description,
          url: absoluteUrl(path),
          areaServed: { "@type": "City", name: "Mannheim" },
          provider: { "@id": absoluteUrl("/#venue") },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: c.faq.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Start", path: "/" }, { name: "Coworking Mannheim", path }])} />
      <Navbar />

      {/* Hero */}
      <header className="px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <p className={eyebrowCls}>{c.hero.eyebrow}</p>
            <h1 className="text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {c.hero.title}
              <span className="sr-only"> – Coworking-Space in Mannheim</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{c.hero.text}</p>
            <div className="mt-10">
              <a
                href="#anfrage"
                className="inline-block border border-foreground bg-foreground px-8 py-3 text-sm uppercase tracking-widest text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground"
              >
                {c.hero.cta}
              </a>
            </div>
            <dl className="mt-14 grid grid-cols-2 gap-y-6 border-t border-border pt-8 md:grid-cols-4">
              {c.facts.map((f) => (
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
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-2">
            <Image src={windowImg} alt={c.hero.imageAlt} fill priority placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Raum */}
        <section className="section-padding border-t border-border">
          <FadeIn className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className={eyebrowCls}>{c.space.eyebrow}</p>
              <h2 className={h2Cls}>{c.space.headline}</h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {c.space.paragraphs.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:pt-16">
              <FeatureList items={c.space.features} className="grid-cols-1 sm:grid-cols-2" />
            </div>
          </FadeIn>
        </section>

        {/* Bilder */}
        <section className="border-t border-border" aria-label="Eindrücke">
          <div className="grid grid-cols-3">
            {[
              { src: glassDetailImg, alt: "Buntglasfenster der Kapelle" },
              { src: exteriorSideImg, alt: "Seitenansicht der Kapelle im Turley-Quartier" },
              { src: glassCloseupImg, alt: "Detail des historischen Buntglases" },
            ].map((img) => (
              <div key={img.alt} className="relative aspect-square overflow-hidden">
                <Image src={img.src} alt={`${img.alt} – Coworking CHURCH. Mannheim`} fill placeholder="blur" sizes="33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Gemeinschaft */}
        <section className="section-padding border-t border-border">
          <FadeIn className="mx-auto max-w-7xl">
            <p className={eyebrowCls}>{c.community.eyebrow}</p>
            <h2 className={h2Cls}>{c.community.headline}</h2>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{c.community.text}</p>
            <div className="mt-14 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
              {c.community.points.map((p) => (
                <div key={p.title} className="bg-background p-8">
                  <h3 className="font-display text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{p.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Lage */}
        <section className="section-padding border-t border-border bg-card">
          <FadeIn className="mx-auto max-w-4xl">
            <p className={eyebrowCls}>{c.location.eyebrow}</p>
            <h2 className={h2Cls}>{c.location.headline}</h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">{c.location.text}</p>
          </FadeIn>
        </section>

        {/* FAQ */}
        <section className="section-padding border-t border-border">
          <FadeIn className="mx-auto max-w-4xl">
            <p className={eyebrowCls}>FAQ</p>
            <h2 className={`${h2Cls} mb-12`}>Häufige Fragen.</h2>
            <div className="divide-y divide-border border-y border-border">
              {c.faq.map((it) => (
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
              <p className={eyebrowCls}>{c.form.eyebrow}</p>
              <h2 className={h2Cls}>{c.form.headline}</h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">{c.form.text}</p>
              <p className="mt-10 text-sm text-muted-foreground">
                <span className="mb-1 block text-xs uppercase tracking-widest">Lieber direkt?</span>
                <a href={site.phoneHref} className="inline-block py-2 text-foreground hover:text-primary">{site.phone}</a>
                <br />
                <a href={`mailto:${site.email}`} className="inline-block py-2 text-foreground hover:text-primary">{site.email}</a>
              </p>
            </div>
            <div className="lg:col-span-2">
              <CoworkingInquiry />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
