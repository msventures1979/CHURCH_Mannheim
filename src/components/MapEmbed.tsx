"use client";

import { useState } from "react";
import { site } from "@/content/site";

// Google Maps lädt erst nach Klick – vorher fließen keine Daten an Google.
export default function MapEmbed() {
  const [load, setLoad] = useState(false);

  if (load) {
    return (
      <iframe
        title="CHURCH. Standort"
        src={site.mapsEmbed}
        className="h-full w-full border-0"
        style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 border border-border bg-card p-6 text-center">
      <p className="font-display text-lg text-foreground">
        {site.address.street}
        <br />
        {site.address.zip} {site.address.city}
      </p>
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
        Beim Laden der Karte werden Daten an Google übertragen. Mehr dazu in der{" "}
        <a href="/datenschutz#karte" className="underline hover:text-foreground">
          Datenschutzerklärung
        </a>
        .
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setLoad(true)}
          className="border border-foreground px-5 py-2.5 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Karte laden
        </button>
        <a
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          In Google Maps öffnen ↗
        </a>
      </div>
    </div>
  );
}
