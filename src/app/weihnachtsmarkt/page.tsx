import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/700.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import hallImg from "@/assets/church-hall-entrance.jpg";
import glassImg from "@/assets/church-stained-glass.jpg";
import planImg from "@/assets/weihnachtsmarkt-standplan.jpg";
import Footer from "@/components/Footer";
import ExhibitorForm from "@/components/xmas/ExhibitorForm";
import Snow from "@/components/xmas/Snow";
import { site } from "@/content/site";
import { xmas } from "@/content/weihnachtsmarkt";

// Versteckt: nicht verlinkt, nicht in der Sitemap, nicht indexierbar.
export const metadata: Metadata = {
  title: xmas.meta.title,
  description: xmas.meta.description,
  robots: { index: false, follow: false },
  openGraph: { title: xmas.meta.title, description: xmas.meta.description, images: [{ url: hallImg.src }] },
};

const bulbColors = ["#e8b84a", "#c9352c", "#f6efe0", "#3f8f5c", "#e8b84a", "#c9352c"];

function Lights() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 overflow-hidden">
      <svg className="absolute inset-x-0 top-0 h-10 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
        <path d="M0 2 Q 6.25 8 12.5 2 T 25 2 T 37.5 2 T 50 2 T 62.5 2 T 75 2 T 87.5 2 T 100 2" fill="none" stroke="#0b1a12" strokeWidth="0.4" />
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-between px-[1%]">
        {Array.from({ length: 24 }, (_, i) => {
          const phase = (i % 4) / 4;
          const y = 12 + Math.abs(Math.sin((i / 24) * Math.PI * 8)) * 20;
          return (
            <span
              key={i}
              className="xmas-bulb block h-3.5 w-2.5 rounded-b-full rounded-t-sm"
              style={{ marginTop: y, background: bulbColors[i % bulbColors.length], color: bulbColors[i % bulbColors.length], animationDelay: `${phase * 2.4}s` }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0l2.4 8.6L24 12l-9.6 3.4L12 24l-2.4-8.6L0 12l9.6-3.4z" />
    </svg>
  );
}

export default function ChristmasMarketPage() {
  return (
    <div className="xmas relative flex min-h-screen flex-col bg-[#14291d] text-[#f6efe0]">
      <Snow />

      {/* Hero */}
      <header className="relative min-h-[92svh] overflow-hidden">
        <Image src={hallImg} alt="Kirchenraum der CHURCH. Mannheim" fill priority placeholder="blur" sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,41,29,0.35)_0%,rgba(20,41,29,0.92)_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#14291d]/60 via-transparent to-[#14291d]" />
        <Lights />
        <div className="relative z-10 flex min-h-[92svh] flex-col items-center justify-center px-6 py-28 text-center">
          <Link href="/" className="mb-12 font-display text-4xl font-bold tracking-tight text-[#f6efe0] hover:text-[#d9c38a] md:text-5xl">{site.name}</Link>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#d9c38a]">
            <Star className="h-3 w-3" /> {xmas.hero.eyebrow} <Star className="h-3 w-3" />
          </p>
          <h1 className="font-xmas mt-6 max-w-4xl text-balance text-5xl leading-[1.05] text-[#f6efe0] md:text-7xl lg:text-8xl">
            <span className="italic">A Christmas Market</span>
            <br />
            <span className="font-bold text-[#d9c38a]">at CHURCH.</span>
          </h1>
          <p className="mt-6 text-lg text-[#f6efe0]/85 md:text-xl">{xmas.hero.subtitle}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#f6efe0]/60">{xmas.hero.dates}</p>
          <a
            href="#anmeldung"
            className="mt-12 rounded-full bg-[#b3261e] px-10 py-4 text-sm uppercase tracking-[0.2em] text-[#f6efe0] shadow-[0_0_40px_rgba(179,38,30,0.5)] transition hover:bg-[#c9352c]"
          >
            {xmas.hero.cta}
          </a>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* Intro */}
        <section className="px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Star className="mx-auto h-6 w-6 text-[#d9c38a]" />
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-[#f6efe0]/85 md:text-xl">
              {xmas.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-4 border-y border-[#d9c38a]/25 py-8">
              {xmas.facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="font-xmas block whitespace-nowrap text-2xl font-bold text-[#d9c38a] sm:text-3xl md:text-4xl">{f.value}</span>
                    <span className="mt-1 block text-[11px] uppercase tracking-widest text-[#f6efe0]/60">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Kategorien */}
        <section className="bg-[#0f2117] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-xmas text-center text-4xl italic text-[#f6efe0] md:text-6xl">{xmas.categories.headline}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[#f6efe0]/70">{xmas.categories.text}</p>
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {xmas.categories.items.map((c, i) => (
                <div key={c.title} className="rounded-2xl border border-[#d9c38a]/25 bg-[#14291d] p-7 transition hover:border-[#d9c38a]/60">
                  <span className="font-xmas text-sm italic text-[#c9352c]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-xmas mt-2 text-2xl font-bold text-[#d9c38a]">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#f6efe0]/75">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Termine */}
        <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">
          <Image src={glassImg} alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#14291d]/70" />
          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="font-xmas text-4xl italic md:text-6xl">{xmas.dates.headline}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#f6efe0]/75">{xmas.dates.text}</p>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {xmas.dates.options.map((d) => (
                <div key={d} className="rounded-2xl border border-[#d9c38a]/40 bg-[#14291d]/80 px-4 py-6">
                  <span className="font-xmas whitespace-nowrap text-xl font-bold text-[#d9c38a] sm:text-2xl md:text-3xl">{d}</span>
                </div>
              ))}
            </div>
            <a
              href={xmas.plan.href}
              target="_blank"
              rel="noopener"
              className="group mx-auto mt-10 flex max-w-md items-center gap-5 rounded-2xl border border-[#d9c38a]/30 bg-[#14291d]/80 p-4 text-left transition hover:border-[#d9c38a]/70"
            >
              <span className="relative block h-20 w-14 shrink-0 overflow-hidden rounded-md bg-[#f6efe0]">
                <Image src={planImg} alt="Standplan Erdgeschoss" fill sizes="56px" className="object-cover object-top" />
              </span>
              <span>
                <span className="block text-sm text-[#f6efe0]/75">{xmas.plan.text}</span>
                <span className="mt-1 block text-sm uppercase tracking-[0.2em] text-[#d9c38a] group-hover:underline">{xmas.plan.link} ↗</span>
              </span>
            </a>
          </div>
        </section>

        {/* Anmeldung */}
        <section id="anmeldung" className="scroll-mt-10 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs uppercase tracking-[0.35em] text-[#d9c38a]">{xmas.form.eyebrow}</p>
            <h2 className="font-xmas mt-4 text-balance text-center text-4xl italic md:text-6xl">{xmas.form.headline}</h2>
            <p className="mx-auto mb-12 mt-4 max-w-xl text-center text-[#f6efe0]/75">{xmas.form.text}</p>
            <ExhibitorForm />
            <div className="mt-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d9c38a]">Deine Ansprechpartnerin</p>
              <p className="font-xmas mt-3 text-2xl text-[#f6efe0]">{xmas.contactPerson.name}</p>
              <p className="mt-2 text-sm text-[#f6efe0]/75">
                <a href={xmas.contactPerson.phoneHref} className="text-[#d9c38a] hover:underline">{xmas.contactPerson.phone}</a>
                <span className="mx-2 text-[#f6efe0]/40">·</span>
                <a href={`mailto:${xmas.contactPerson.email}`} className="text-[#d9c38a] hover:underline">{xmas.contactPerson.email}</a>
              </p>
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
