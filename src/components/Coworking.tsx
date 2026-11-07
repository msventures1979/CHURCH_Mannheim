import { coworking } from "@/content/home";
import ButtonLink from "./ButtonLink";
import FadeIn from "./FadeIn";
import FeatureList from "./FeatureList";

export default function Coworking() {
  return (
    <section id="coworking" className="section-padding border-t border-border">
      <FadeIn className="mx-auto max-w-5xl">
        <p className="mb-6 text-sm uppercase tracking-widest text-primary">{coworking.eyebrow}</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {coworking.headline}
        </h2>
        <div className="mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground md:mt-16 md:text-lg">
          {coworking.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <FeatureList items={coworking.features} className="mt-12 grid-cols-2 md:grid-cols-3" />
        <div className="mt-12">
          <ButtonLink href="/coworking-mannheim">{coworking.pageCta}</ButtonLink>
        </div>
      </FadeIn>
    </section>
  );
}
