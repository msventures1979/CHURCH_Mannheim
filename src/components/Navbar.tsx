"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Coworking", href: "/coworking-mannheim" },
  { label: "Events", href: "/events" },
  { label: "Location mieten", href: "/eventlocation-mieten" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !isHome || open;
  const linkCls =
    "text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-border bg-background/95 backdrop-blur-sm" : ""
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-24" aria-label="Hauptnavigation">
        <Link
          href="/"
          onClick={() => isHome && window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl"
        >
          CHURCH.
        </Link>

        <div className="hidden gap-8 md:flex lg:gap-10">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className={linkCls}>
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="p-2 -mr-2 text-foreground md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="flex flex-col gap-6 border-t border-border bg-background px-6 py-8 md:hidden">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className={linkCls}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
