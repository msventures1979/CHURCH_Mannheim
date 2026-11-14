"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/content/photos";
import Lightbox from "./Lightbox";
import PhotoCredit from "./PhotoCredit";

// Raster mit großem Aufmacherbild, Klick öffnet die Großansicht.
export default function ActionGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <figure>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-2">
        {photos.map((p, i) => (
          <button
            key={p.alt}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Bild vergrößern: ${p.alt}`}
            className={`group relative overflow-hidden bg-card ${i === 0 ? "col-span-2 row-span-2 aspect-[3/2]" : "aspect-[3/2]"}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              placeholder="blur"
              sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <figcaption className="mt-4 px-6 text-xs text-muted-foreground md:px-0">
        <PhotoCredit />
      </figcaption>
      <Lightbox images={photos} index={open} onChange={setOpen} credit={<PhotoCredit withEvent={false} />} />
    </figure>
  );
}
