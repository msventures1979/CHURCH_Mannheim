// Leiser Schneefall als reine CSS-Animation (bei „Bewegung reduzieren“ ausgeblendet).
const flakes = Array.from({ length: 48 }, (_, i) => {
  // deterministisch, damit Server und Browser dasselbe rendern
  const r = (n: number) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2);
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    size: 2 + Math.round(r(2) * 4),
    duration: 9 + r(3) * 12,
    delay: -r(4) * 20,
    drift: Math.round((r(5) - 0.5) * 80),
    opacity: 0.35 + r(6) * 0.5,
  };
});

export default function Snow() {
  return (
    <div aria-hidden className="xmas-snow pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          style={
            {
              left: f.left,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
