import Image from "next/image";
import hallImg from "@/assets/church-hall-entrance.jpg";
import { hall } from "@/content/home";
import ButtonLink from "./ButtonLink";
import FadeIn from "./FadeIn";
import FeatureList from "./FeatureList";

export default function Hall() {
  return (
    <section id="event" className="section-padding border-t border-border">
      <FadeIn className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative order-2 aspect-[16/10] overflow-hidden lg:order-1">
          <Image src={hallImg} alt={hall.imageAlt} fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="order-1 lg:order-2">
          <p className="mb-6 text-sm uppercase tracking-widest text-primary">{hall.eyebrow}</p>
          <h2 className="text-balance font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {hall.headline}
          </h2>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {hall.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <FeatureList items={hall.features} className="mt-10 grid-cols-2" />
          <div className="mt-10">
            <ButtonLink href="#kontakt">{hall.cta}</ButtonLink>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
