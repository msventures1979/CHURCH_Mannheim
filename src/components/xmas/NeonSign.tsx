import "@fontsource/yellowtail/400.css";

// Neon-Leuchtschrift auf einer Acrylplatte – „Good Vibes“ in Pink, Sterne und Zeile in warmem Gold.
// Einzelne Buchstaben flackern leicht; bei „Bewegung reduzieren“ leuchtet alles ruhig.

function NeonStar({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={`neon-gold-stroke ${className}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 3 L23.5 16.5 L37 20 L23.5 23.5 L20 37 L16.5 23.5 L3 20 L16.5 16.5 Z" strokeWidth="2.2" />
    </svg>
  );
}

export default function NeonSign() {
  const word = "Good Vibes";
  // diese Buchstaben flackern (Index im Wort)
  const flicker: Record<number, string> = { 1: "neon-flicker-a", 7: "neon-flicker-b" };

  return (
    <div className="neon-sign relative mx-auto w-full max-w-[640px] px-4" role="img" aria-label="Neon-Schriftzug: Good Vibes – Christmas Market">
      {/* Aufhängung */}
      <div aria-hidden className="absolute -top-12 left-[22%] h-12 w-px bg-gradient-to-b from-transparent to-[#f6efe0]/30 md:-top-16 md:h-16" />
      <div aria-hidden className="absolute -top-12 right-[22%] h-12 w-px bg-gradient-to-b from-transparent to-[#f6efe0]/30 md:-top-16 md:h-16" />

      {/* Acrylplatte */}
      <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] px-6 pb-7 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-[2px] md:px-12 md:pb-9 md:pt-6">
        {/* Schrauben */}
        {["left-3 top-3", "right-3 top-3", "bottom-3 left-3", "bottom-3 right-3"].map((p) => (
          <span key={p} aria-hidden className={`absolute ${p} h-2 w-2 rounded-full bg-gradient-to-br from-white/50 to-white/10`} />
        ))}

        <div aria-hidden className="flex items-center justify-center gap-3 md:gap-5">
          <NeonStar className="neon-flicker-c h-7 w-7 shrink-0 md:h-10 md:w-10" />
          <span className="neon-pink font-neon whitespace-nowrap text-[3.4rem] leading-[1.15] md:text-[6rem]">
            {word.split("").map((ch, i) => (
              <span key={i} className={flicker[i] ?? undefined}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
          <NeonStar className="h-7 w-7 shrink-0 md:h-10 md:w-10" />
        </div>
        <p aria-hidden className="neon-gold mt-1 text-center text-sm font-medium whitespace-nowrap uppercase tracking-[0.3em] md:text-lg md:tracking-[0.55em]">
          Christmas Market
        </p>
      </div>

      {/* Lichtschein an der Wand */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[10%] -bottom-10 -z-10 h-24 rounded-full bg-[#ff4fa3]/25 blur-3xl" />
    </div>
  );
}
