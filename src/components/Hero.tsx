import Image from "next/image";
import heroImg from "@/assets/church-exterior.jpg";
import { hero } from "@/content/home";

export default function Hero() {
  return (
    <section className="relative h-svh min-h-[520px] w-full overflow-hidden">
      <Image src={heroImg} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-background/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-7xl font-bold leading-none tracking-tighter text-foreground sm:text-8xl md:text-9xl lg:text-[11rem]">
          {hero.title}
          <span className="sr-only"> — Coworking &amp; Eventfläche in Mannheim</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg tracking-wide text-muted-foreground md:text-xl">{hero.claim}</p>
      </div>
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="h-12 w-px animate-pulse bg-muted-foreground/40" />
      </div>
    </section>
  );
}
