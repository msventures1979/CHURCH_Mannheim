import type { Metadata } from "next";
import Image from "next/image";
import glassImg from "@/assets/church-stained-glass.jpg";
import planImg from "@/assets/weihnachtsmarkt-standplan.jpg";
import Footer from "@/components/Footer";
import ExhibitorForm from "@/components/xmas/ExhibitorForm";
import Snow from "@/components/xmas/Snow";
import XmasHero from "@/components/xmas/XmasHero";
import { xmas } from "@/content/weihnachtsmarkt";

// Versteckt: nicht verlinkt, nicht in der Sitemap, nicht indexierbar.
export const metadata: Metadata = {
  title: xmas.meta.title,
  description: xmas.meta.description,
  robots: { index: false, follow: false },
  openGraph: { title: xmas.meta.title, description: xmas.meta.description, url: "/weihnachtsmarkt" },
  twitter: { card: "summary_large_image", title: xmas.meta.title, description: xmas.meta.description },
};

const line = "border-[#f6efe0]/15";
const wrap = "mx-auto max-w-7xl px-4 md:px-10";
const h2 = "font-anton text-balance text-5xl uppercase leading-[0.9] text-[#f6efe0] md:text-8xl";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono-x mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#e9c46a] md:text-xs">
      <span aria-hidden className="h-px w-8 bg-[#e9c46a]" />
      {children}
    </p>
  );
}

export default function ChristmasMarketPage() {
  return (
    <div className="xmas relative flex min-h-screen flex-col bg-[#06100b] text-[#f6efe0]">
      <Snow />
      <XmasHero />

      <main className="relative z-10 flex-1">
        {/* Konzept */}
        <section className={`border-t ${line} py-20 md:py-32`}>
          <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-6">
              <Label>Das Konzept</Label>
              <h2 className="font-anton text-5xl uppercase leading-[0.9] text-[#f6efe0] md:text-7xl">
                Mehr als ein
                <br />
                <span className="text-transparent [-webkit-text-stroke:2px_#f6efe0]">Weihnachtsmarkt.</span>
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-[#f6efe0]/80 lg:col-span-6 lg:col-start-7 md:text-xl lg:pt-10">
              {xmas.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
          </div>
          <dl className={`${wrap} mt-16 md:mt-24`}>
            <div className={`grid grid-cols-3 border ${line}`}>
              {xmas.facts.map((f, i) => (
                <div key={f.label} className={`px-3 py-6 md:px-8 md:py-10 ${i ? `border-l ${line}` : ""}`}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="font-anton block whitespace-nowrap text-3xl uppercase text-[#e9c46a] sm:text-5xl md:text-7xl">{f.value}</span>
                    <span className="font-mono-x mt-2 block text-[10px] uppercase tracking-[0.2em] text-[#f6efe0]/60 md:text-xs">{f.label}</span>
                  </dd>
                </div>
              ))}
            </div>
          </dl>
        </section>

        {/* Wen wir suchen */}
        <section className={`border-t ${line} py-20 md:py-32`}>
          <div className={wrap}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Label>Aussteller:innen</Label>
                <h2 className={h2}>{xmas.categories.headline}</h2>
              </div>
              <p className="max-w-md text-[#f6efe0]/70 md:text-right">{xmas.categories.text}</p>
            </div>
            <div className={`mt-14 grid grid-cols-1 gap-px border ${line} bg-[#f6efe0]/15 sm:grid-cols-2 lg:grid-cols-3`}>
              {xmas.categories.items.map((c) => (
                <div key={c.title} className="group bg-[#06100b] p-7 transition-colors hover:bg-[#0d1d14] md:p-9">
                  <span aria-hidden className="font-mono-x text-lg text-[#ff2e93] transition group-hover:[text-shadow:0_0_12px_#ff2e93]">+</span>
                  <h3 className="font-anton mt-3 text-3xl uppercase leading-none text-[#f6efe0]">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#f6efe0]/70">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Termine */}
        <section className={`relative overflow-hidden border-t ${line} py-20 md:py-32`}>
          <Image src={glassImg} alt="" fill sizes="100vw" className="object-cover opacity-20 [filter:grayscale(1)_contrast(1.4)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06100b] via-[#06100b]/70 to-[#06100b]" />
          <div className={`relative ${wrap}`}>
            <Label>Dezember 2026</Label>
            <h2 className={h2}>{xmas.dates.headline}</h2>
            <p className="mt-6 max-w-2xl text-[#f6efe0]/75">{xmas.dates.text}</p>
            <ul className={`mt-12 grid grid-cols-2 border ${line} md:grid-cols-4`}>
              {xmas.dates.options.map((d, i) => {
                const [day, date] = d.split(" ");
                return (
                  <li
                    key={d}
                    className={`bg-[#06100b]/70 px-4 py-6 text-center md:py-10 ${i % 2 ? `border-l ${line}` : ""} ${i > 1 ? `border-t ${line} md:border-t-0` : ""} ${i === 2 ? `md:border-l` : ""}`}
                  >
                    <span className="font-mono-x block text-xs uppercase tracking-[0.25em] text-[#e9c46a]">{day.replace(".", "")}</span>
                    <span className="font-anton mt-1 block text-4xl md:text-6xl">{date}</span>
                  </li>
                );
              })}
            </ul>
            <a
              href={xmas.plan.href}
              target="_blank"
              rel="noopener"
              className={`group mt-8 flex max-w-xl items-center gap-5 border ${line} bg-[#06100b]/80 p-4 transition hover:border-[#e9c46a]`}
            >
              <span className="relative block h-20 w-14 shrink-0 overflow-hidden bg-[#f6efe0]">
                <Image src={planImg} alt="Standplan Erdgeschoss" fill sizes="56px" className="object-cover object-top" />
              </span>
              <span>
                <span className="block text-sm text-[#f6efe0]/75">{xmas.plan.text}</span>
                <span className="font-mono-x mt-1 block text-xs uppercase tracking-[0.2em] text-[#e9c46a] group-hover:underline">{xmas.plan.link} ↗</span>
              </span>
            </a>
          </div>
        </section>

        {/* Anmeldung */}
        <section id="anmeldung" className={`scroll-mt-6 border-t ${line} py-20 md:py-32`}>
          <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <Label>{xmas.form.eyebrow}</Label>
              <h2 className="xh-neon-text font-neon-x text-6xl leading-[1.05] md:text-7xl">{xmas.form.headline}</h2>
              <p className="mt-8 max-w-md text-[#f6efe0]/75">{xmas.form.text}</p>
              <div className={`mt-12 border-t ${line} pt-6`}>
                <p className="font-mono-x text-[11px] uppercase tracking-[0.25em] text-[#e9c46a]">Deine Ansprechpartnerin</p>
                <p className="font-anton mt-3 text-3xl uppercase">{xmas.contactPerson.name}</p>
                <p className="font-mono-x mt-3 space-y-1 text-sm">
                  <a href={xmas.contactPerson.phoneHref} className="block text-[#f6efe0]/85 hover:text-[#e9c46a]">{xmas.contactPerson.phone}</a>
                  <a href={`mailto:${xmas.contactPerson.email}`} className="block text-[#f6efe0]/85 hover:text-[#e9c46a]">{xmas.contactPerson.email}</a>
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ExhibitorForm />
            </div>
          </div>
        </section>
      </main>
      <div className="relative z-10">
        <Footer hideNewsletter />
      </div>
    </div>
  );
}
