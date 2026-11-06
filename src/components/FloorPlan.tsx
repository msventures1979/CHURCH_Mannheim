// Vereinfachter Grundriss Erdgeschoss (nach Bestandsplan M 1:100, Stand 11/2025). Maße in Metern.
// Innenmaß Saal ca. 9,97 × 15,29 m. Darstellung schematisch, nicht maßstabsgetreu für Planungszwecke.

const W = 11.01;
const H = 19.73;
const wall = 0.52;
const inX = wall;
const inW = W - 2 * wall; // ≈ 9,97
const hallH = 15.285;
const foyerTop = wall + hallH + 0.15;

function Label({ x, y, children, small = false }: { x: number; y: number; children: string; small?: boolean }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="currentColor"
      style={{ fontSize: small ? 0.42 : 0.55, letterSpacing: "0.04em" }}
      className={small ? "fill-muted-foreground" : "fill-foreground"}
    >
      {children}
    </text>
  );
}

export default function FloorPlan() {
  const zone = "fill-primary/15 stroke-primary/50";
  return (
    <figure className="w-full">
      <svg
        viewBox={`-0.6 -0.6 ${W + 1.2} ${H + 1.6}`}
        role="img"
        aria-labelledby="floorplan-title floorplan-desc"
        className="mx-auto h-auto w-full max-w-md text-foreground"
      >
        <title id="floorplan-title">Grundriss Erdgeschoss der CHURCH.</title>
        <desc id="floorplan-desc">
          Saal mit rund 150 Quadratmetern: freie Fläche mit vier Stützen, offene Küche vorne rechts am Eingang, davor Foyer
          mit Treppe zum Obergeschoss und WCs.
        </desc>

        {/* Außenwände */}
        <rect x={0} y={0} width={W} height={H - 0.52} className="fill-card stroke-primary" strokeWidth={0.12} />
        <rect x={inX} y={wall} width={inW} height={hallH} className="fill-background stroke-primary/40" strokeWidth={0.04} />

        {/* Freie Fläche */}
        <Label x={W / 2} y={wall + 6.6}>Saal</Label>
        <Label x={W / 2} y={wall + 7.3} small>
          frei bestuhlbar
        </Label>

        {/* Stützen */}
        {[
          [3.1, 5.1],
          [7.9, 5.1],
          [3.1, 10.1],
          [7.9, 10.1],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={0.16} className="fill-card stroke-primary" strokeWidth={0.05} />
        ))}

        {/* Offene Küche */}
        <rect x={inX + 4.28 + 1.51} y={wall + 11.16} width={4.18} height={hallH - 11.16} className={zone} strokeWidth={0.04} />
        <Label x={inX + 4.28 + 1.51 + 2.09} y={wall + 13.2}>offene Küche</Label>

        {/* Foyer */}
        <rect x={inX} y={foyerTop} width={inW} height={H - 0.52 - wall - foyerTop} className="fill-background stroke-primary/40" strokeWidth={0.04} />
        <Label x={W / 2} y={foyerTop + 1.2} small>
          Foyer · Treppe OG · WC
        </Label>

        {/* Eingang */}
        <rect x={W / 2 - 0.86} y={H - 0.62} width={1.73} height={0.24} className="fill-primary" />
        <Label x={W / 2} y={H + 0.45} small>
          Eingang
        </Label>

        {/* Maße */}
        <Label x={W / 2} y={-0.3} small>
          ca. 10 m
        </Label>
        <text
          x={-0.32}
          y={wall + hallH / 2}
          textAnchor="middle"
          transform={`rotate(-90 -0.32 ${wall + hallH / 2})`}
          className="fill-muted-foreground"
          style={{ fontSize: 0.42 }}
        >
          ca. 15 m
        </text>
      </svg>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        Erdgeschoss, schematisch · Saal ca. 150 m² inkl. offener Küche · vier Stützen im Raum
      </figcaption>
    </figure>
  );
}
