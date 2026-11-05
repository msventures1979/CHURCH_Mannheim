import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden — CHURCH. Mannheim",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-xl font-bold text-foreground">CHURCH.</p>
        <h1 className="mb-4 mt-8 font-display text-5xl font-bold">404</h1>
        <p className="mb-8 text-lg text-muted-foreground">Diese Seite wurde nicht gefunden.</p>
        <Link href="/" className="text-sm uppercase tracking-widest text-primary hover:text-foreground">
          Zur Startseite →
        </Link>
      </div>
    </div>
  );
}
