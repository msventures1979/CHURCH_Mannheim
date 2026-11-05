import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalPage({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border px-6 py-5 md:px-12 lg:px-24">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
          CHURCH.
        </Link>
      </nav>
      <main className="max-w-3xl px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground md:text-base [&_a]:text-foreground [&_a]:underline [&_a:hover]:text-primary [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-foreground">
          {children}
        </div>
      </main>
      <footer className="border-t border-border px-6 py-8 md:px-12 lg:px-24">
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-muted-foreground">
          <span className="font-display font-bold text-foreground">CHURCH.</span>
          <div className="flex gap-6">
            <Link href="/" className="transition-colors hover:text-foreground">Startseite</Link>
            <Link href="/impressum" className="transition-colors hover:text-foreground">Impressum</Link>
            <Link href="/datenschutz" className="transition-colors hover:text-foreground">Datenschutz</Link>
          </div>
          <span>© {new Date().getFullYear()} CHURCH.</span>
        </div>
      </footer>
    </div>
  );
}
