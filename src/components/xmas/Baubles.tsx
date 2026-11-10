// Weihnachtskugeln, die an Bändern von oben ins Bild hängen und leicht pendeln.
// Glanz und Tiefe entstehen über radiale Verläufe und ein Spitzlicht.

const palettes = {
  red: ["#ff6b5e", "#c4281f", "#5c0c08"],
  gold: ["#fff1c4", "#d9a93c", "#6b4a10"],
  green: ["#6fd39a", "#1f7a4a", "#0a2e1b"],
  champagne: ["#ffffff", "#e9dcc2", "#8a7650"],
  burgundy: ["#d86a86", "#7c1430", "#2c040f"],
} as const;
type Tone = keyof typeof palettes;

// Position in % der Breite, Bandlänge in px, Kugeldurchmesser in px
const baubles: { x: number; len: number; size: number; tone: Tone; hideMobile?: boolean }[] = [
  { x: 4, len: 40, size: 34, tone: "gold" },
  { x: 11, len: 95, size: 48, tone: "red" },
  { x: 19, len: 55, size: 30, tone: "champagne", hideMobile: true },
  { x: 27, len: 125, size: 40, tone: "green" },
  { x: 35, len: 70, size: 26, tone: "burgundy", hideMobile: true },
  { x: 64, len: 80, size: 28, tone: "gold", hideMobile: true },
  { x: 72, len: 130, size: 44, tone: "burgundy" },
  { x: 80, len: 50, size: 30, tone: "green", hideMobile: true },
  { x: 88, len: 105, size: 52, tone: "red" },
  { x: 96, len: 45, size: 32, tone: "champagne" },
];

function Bauble({ size, tone, id }: { size: number; tone: Tone; id: string }) {
  const [hi, mid, dark] = palettes[tone];
  const capW = size * 0.3;
  return (
    <svg width={size} height={size + size * 0.22} viewBox={`0 0 ${size} ${size + size * 0.22}`} className="block overflow-visible">
      <defs>
        <radialGradient id={`b-${id}`} cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor={hi} />
          <stop offset="45%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
        <linearGradient id={`c-${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#7a6232" />
          <stop offset="50%" stopColor="#f3dc96" />
          <stop offset="100%" stopColor="#6b5428" />
        </linearGradient>
      </defs>
      {/* Öse und Kappe */}
      <circle cx={size / 2} cy={size * 0.04} r={size * 0.045} fill="none" stroke="#c9ad6a" strokeWidth={1.2} />
      <rect x={(size - capW) / 2} y={size * 0.08} width={capW} height={size * 0.14} rx={1.5} fill={`url(#c-${id})`} />
      {/* Kugel */}
      <circle cx={size / 2} cy={size * 0.22 + size / 2} r={size / 2} fill={`url(#b-${id})`} />
      {/* feiner Reflex unten (Raumlicht) */}
      <ellipse cx={size * 0.58} cy={size * 0.22 + size * 0.86} rx={size * 0.2} ry={size * 0.05} fill="#fff" opacity={0.12} />
      {/* Spitzlicht */}
      <ellipse cx={size * 0.34} cy={size * 0.22 + size * 0.28} rx={size * 0.11} ry={size * 0.07} fill="#fff" opacity={0.85} transform={`rotate(-35 ${size * 0.34} ${size * 0.22 + size * 0.28})`} />
      <circle cx={size * 0.27} cy={size * 0.22 + size * 0.42} r={size * 0.025} fill="#fff" opacity={0.6} />
    </svg>
  );
}

export default function Baubles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-56 overflow-visible">
      {baubles.map((b, i) => (
        <div
          key={i}
          className={`xmas-bauble absolute top-0 ${b.hideMobile ? "hidden md:block" : ""}`}
          style={{ left: `${b.x}%`, marginLeft: -b.size / 2, animationDelay: `${-(i * 0.73) % 4}s`, animationDuration: `${4 + (i % 3)}s` }}
        >
          {/* Band */}
          <div
            className="mx-auto h-[var(--lm)] w-px bg-gradient-to-b from-[#d9c38a]/20 via-[#d9c38a]/70 to-[#d9c38a] md:h-[var(--l)]"
            style={{ "--l": `${b.len}px`, "--lm": `${Math.round(b.len * 0.45)}px` } as React.CSSProperties}
          />
          <div className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]" style={{ marginTop: -2 }}>
            <div className="origin-top scale-75 md:scale-100">
              <Bauble size={b.size} tone={b.tone} id={String(i)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
