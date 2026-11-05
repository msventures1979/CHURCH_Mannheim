"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import imgExterior from "@/assets/church-exterior.jpg";
import imgExteriorSide from "@/assets/church-exterior-side.jpg";
import imgGlass from "@/assets/church-stained-glass.jpg";
import imgGlassCloseup from "@/assets/church-glass-closeup.jpg";
import imgGlassDetail from "@/assets/church-glass-detail.jpg";
import imgHall from "@/assets/church-hall-entrance.jpg";
import imgKitchen from "@/assets/church-kitchen.jpg";
import imgLightBench from "@/assets/church-light-bench.jpg";
import imgWindowView from "@/assets/church-window-view.jpg";
import { gallery } from "@/content/home";
import FadeIn from "./FadeIn";

const images: { src: StaticImageData; alt: string; portrait?: boolean }[] = [
  { src: imgExterior, alt: "Außenansicht der Kapelle CHURCH. in Mannheim – Backsteinfassade" },
  { src: imgGlassCloseup, alt: "Buntglasfenster – Detail" },
  { src: imgGlass, alt: "Kirchenraum mit Buntglasfenster", portrait: true },
  { src: imgHall, alt: "Eventlocation CHURCH. Mannheim – Kirchenraum mit Eingang" },
  { src: imgKitchen, alt: "Designküche der Eventlocation im Erdgeschoss" },
  { src: imgLightBench, alt: "Lichtspiel auf Kirchenbank" },
  { src: imgGlassDetail, alt: "Buntglas – Nahaufnahme", portrait: true },
  { src: imgExteriorSide, alt: "Kapelle im Turley-Quartier Mannheim – Seitenansicht", portrait: true },
  { src: imgWindowView, alt: "Blick durch Kirchenfenster", portrait: true },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <>
      <section id="galerie" className="border-t border-border py-24 md:py-32 lg:py-40">
        <FadeIn>
          <div className="mb-12 px-6 md:px-12 lg:px-24">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {gallery.headline}
            </h2>
          </div>
          <div className="scrollbar-hide flex gap-4 overflow-x-auto px-6 pb-6 md:px-12 lg:px-24">
            {images.map((img, i) => (
              <button
                key={img.alt}
                onClick={() => setOpen(i)}
                aria-label={`${img.alt} vergrößern`}
                className={`group shrink-0 overflow-hidden ${img.portrait ? "w-64 md:w-80" : "w-80 md:w-[28rem]"}`}
              >
                <div className={`relative overflow-hidden ${img.portrait ? "aspect-[3/4]" : "aspect-[16/10]"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    placeholder="blur"
                    sizes={img.portrait ? "320px" : "448px"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/95 p-4 md:p-6"
          onClick={() => setOpen(null)}
        >
          <button aria-label="Galerie schließen" className="absolute right-4 top-4 p-2 text-2xl font-light text-foreground md:right-6 md:top-6" onClick={() => setOpen(null)}>
            ✕
          </button>
          <div className="flex max-h-[85vh] w-full max-w-5xl items-center gap-2 md:gap-4">
            <button
              aria-label="Vorheriges Bild"
              className="shrink-0 p-2 text-3xl text-foreground transition-colors hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              ‹
            </button>
            <div className="relative h-[80vh] flex-1" onClick={(e) => e.stopPropagation()}>
              <Image src={images[open].src} alt={images[open].alt} fill sizes="90vw" className="object-contain" />
            </div>
            <button
              aria-label="Nächstes Bild"
              className="shrink-0 p-2 text-3xl text-foreground transition-colors hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
