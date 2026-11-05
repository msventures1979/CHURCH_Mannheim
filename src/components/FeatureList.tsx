export default function FeatureList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`grid gap-4 ${className}`}>
      {items.map((label) => (
        <li key={label} className="flex items-center gap-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
          <span className="text-sm tracking-wide text-muted-foreground">{label}</span>
        </li>
      ))}
    </ul>
  );
}
