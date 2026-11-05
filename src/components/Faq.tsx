import { faq } from "@/content/home";
import { JsonLd } from "@/lib/seo";
import FadeIn from "./FadeIn";

export default function Faq() {
  return (
    <section id="faq" className="section-padding border-t border-border">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }}
      />
      <FadeIn className="mx-auto max-w-4xl">
        <p className="mb-6 text-sm uppercase tracking-widest text-primary">{faq.eyebrow}</p>
        <h2 className="mb-12 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {faq.headline}
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {faq.items.map((it) => (
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
  );
}
