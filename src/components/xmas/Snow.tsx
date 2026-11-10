// Schneefall in drei Tiefenebenen: ferne Flocken klein, langsam und blass,
// nahe Flocken groß, weich gezeichnet und schneller. Jede Flocke fällt und pendelt
// dabei seitlich (zwei getrennte CSS-Animationen). Bei „Bewegung reduzieren“ ausgeblendet.

type Flake = {
  left: string;
  size: number;
  fall: number;
  sway: number;
  swayX: number;
  delay: number;
  opacity: number;
  blur: number;
  crystal: boolean;
};

// deterministischer Zufall, damit Server und Browser dasselbe rendern
const rand = (i: number, n: number) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1;
const r = (i: number, n: number) => Math.abs(rand(i, n));

const layers = [
  { count: 55, size: [1.5, 3.5], fall: [22, 32], opacity: [0.35, 0.6], blur: 0, sway: [10, 25] },
  { count: 32, size: [3.5, 6], fall: [14, 20], opacity: [0.6, 0.85], blur: 0.3, sway: [20, 45] },
  { count: 12, size: [8, 14], fall: [9, 13], opacity: [0.55, 0.8], blur: 1.6, sway: [35, 70] },
];

const flakes: Flake[] = layers.flatMap((l, li) =>
  Array.from({ length: l.count }, (_, k) => {
    const i = li * 100 + k;
    // auf zwei Stellen gerundet, damit Server und Browser identische Werte erzeugen
    const lerp = ([a, b]: number[], t: number) => Math.round((a + (b - a) * t) * 100) / 100;
    return {
      left: `${(r(i, 1) * 100).toFixed(2)}%`,
      size: lerp(l.size, r(i, 2)),
      fall: lerp(l.fall, r(i, 3)),
      sway: Math.round((3 + r(i, 4) * 4) * 100) / 100,
      swayX: lerp(l.sway, r(i, 5)) * (r(i, 6) > 0.5 ? 1 : -1),
      delay: -Math.round(r(i, 7) * lerp(l.fall, 1) * 100) / 100,
      opacity: lerp(l.opacity, r(i, 8)),
      blur: l.blur,
      crystal: li === 1 && r(i, 9) > 0.7,
    };
  }),
);

function Crystal({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size * 2.2} height={size * 2.2} className="block" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round">
      {[0, 60, 120].map((a) => (
        <g key={a} transform={`rotate(${a} 12 12)`}>
          <path d="M12 2v20M12 5l-2.5-2.5M12 5l2.5-2.5M12 19l-2.5 2.5M12 19l2.5 2.5" />
        </g>
      ))}
    </svg>
  );
}

export default function Snow() {
  return (
    <div aria-hidden className="xmas-snow pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="xmas-flake"
          style={{ left: f.left, opacity: f.opacity, animationDuration: `${f.fall}s`, animationDelay: `${f.delay}s` }}
        >
          <span
            className="xmas-sway"
            style={
              {
                animationDuration: `${f.sway}s`,
                animationDelay: `${-Math.round(f.sway * r(i, 10) * 100) / 100}s`,
                "--sway": `${f.swayX}px`,
                filter: f.blur ? `blur(${f.blur}px)` : undefined,
              } as React.CSSProperties
            }
          >
            {f.crystal ? (
              <Crystal size={f.size} />
            ) : (
              <span className="xmas-dot" style={{ width: f.size, height: f.size }} />
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
