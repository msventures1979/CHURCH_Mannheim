import Image from "next/image";
import glassImg from "@/assets/church-stained-glass.jpg";
import { about } from "@/content/home";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section className="section-padding">
      <FadeIn className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="text-balance font-display text-2xl font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl">
            {about.headline}
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">{about.text}</p>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image src={glassImg} alt={about.imageAlt} fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
      </FadeIn>
    </section>
  );
}
