"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect } from "react";

type Img = { src: StaticImageData; alt: string };

// Großansicht für Galerien: Pfeiltasten, Escape, Wischen auf dem Handy.
export default function Lightbox({ images, index, onChange, credit }: {
  images: Img[];
  index: number | null;
  onChange: (i: number | null) => void;
  credit?: React.ReactNode;
}) {
  const step = useCallback(
    (d: number) => index !== null && onChange((index + d + images.length) % images.length),
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, step, onChange]);

  if (index === null) return null;
  let touchX = 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bildergalerie"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background p-4 md:p-6"
      onClick={() => onChange(null)}
      onTouchStart={(e) => (touchX = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <button aria-label="Galerie schließen" className="absolute right-4 top-4 p-2 text-2xl font-light text-foreground md:right-6 md:top-6" onClick={() => onChange(null)}>
        ✕
      </button>
      <div className="flex max-h-[85vh] w-full max-w-6xl items-center gap-2 md:gap-4">
        <button aria-label="Vorheriges Bild" className="hidden shrink-0 p-2 text-3xl text-foreground transition-colors hover:text-primary sm:block"
          onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
        <div className="relative h-[75vh] flex-1" onClick={(e) => e.stopPropagation()}>
          <Image src={images[index].src} alt={images[index].alt} fill sizes="90vw" className="object-contain" />
        </div>
        <button aria-label="Nächstes Bild" className="hidden shrink-0 p-2 text-3xl text-foreground transition-colors hover:text-primary sm:block"
          onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
      </div>
      <p className="mt-4 max-w-3xl text-center text-xs text-muted-foreground" onClick={(e) => e.stopPropagation()}>
        <span className="tabular-nums">{index + 1} / {images.length}</span>
        {credit && <span> · {credit}</span>}
      </p>
    </div>
  );
}
