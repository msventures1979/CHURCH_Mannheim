"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
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
import { homeActionPhotos } from "@/content/photos";
import Lightbox from "./Lightbox";
import FadeIn from "./FadeIn";

const images: { src: StaticImageData; alt: string; portrait?: boolean }[] = [
  // CHURCH. in Action (Fotos: Sebastian Weindel)
  ...homeActionPhotos,
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
                aria-label={`Bild vergrößern: ${img.alt}`}
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
          <p className="px-6 text-xs text-muted-foreground md:px-12 lg:px-24">
            Event-Fotos: <a href="https://www.sebastian-weindel.de/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-foreground">Sebastian Weindel</a> ·{" "}
            <a href="/eventlocation-mieten#einblicke" className="underline underline-offset-2 hover:text-foreground">So sieht ein Event bei uns aus</a>
          </p>
        </FadeIn>
      </section>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
