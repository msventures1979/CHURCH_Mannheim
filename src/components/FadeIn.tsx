"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Weiches Einblenden beim Scrollen. Robust: Inhalt erscheint, sobald ein Teil sichtbar ist
// oder bereits überscrollt wurde – und spätestens nach 2 Sekunden, falls der Browser nicht meldet.
export default function FadeIn({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("visible");

    if (!("IntersectionObserver" in window)) return show();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);

    const fallback = window.setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) show();
    }, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </div>
  );
}
