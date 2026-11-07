"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Google Analytics lädt nur nach ausdrücklicher Einwilligung.
const KEY = "church-consent-v1";
const OPEN_EVENT = "church:open-consent";
type Choice = "granted" | "denied";

const read = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

export const openConsent = () => window.dispatchEvent(new Event(OPEN_EVENT));

export default function Consent({ gaId }: { gaId?: string }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  // true auf dem Server: der Hinweis steht sofort im HTML. Wer schon gewählt hat, sieht ihn dank data-consent nie.
  const [show, setShow] = useState(true);

  useEffect(() => {
    const c = read();
    setChoice(c);
    setShow(c === null);
    const reopen = () => {
      document.documentElement.removeAttribute("data-consent");
      setShow(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    document.documentElement.setAttribute("data-consent", c);
    const wasGranted = choice === "granted";
    setChoice(c);
    setShow(false);
    // Widerruf: GA-Cookies entfernen und neu laden, damit das Skript nicht weiterläuft
    if (c === "denied" && wasGranted) {
      document.cookie.split(";").forEach((ck) => {
        const name = ck.split("=")[0].trim();
        if (name.startsWith("_ga")) {
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
          document.cookie = `${name}=; Max-Age=0; path=/`;
        }
      });
      location.reload();
    }
  };

  return (
    <>
      {gaId && choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}

      {show && (
        <div
          role="dialog"
          data-consent-banner
          aria-label="Cookie-Einstellungen"
          className="fixed inset-x-0 bottom-0 z-[9999] border-t border-border bg-card/98 backdrop-blur-sm md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:border"
        >
          <div className="space-y-4 p-5 md:p-6">
            <p className="font-display text-base font-bold text-foreground">Darf’s ein Cookie sein?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mit deiner Einwilligung nutzen wir Google Analytics, um zu verstehen, wie unsere Seite genutzt wird. Ohne
              Einwilligung laden wir nichts davon. Du kannst deine Wahl jederzeit im Footer ändern.{" "}
              <a href="/datenschutz#analytics" className="underline hover:text-foreground">Mehr erfahren</a>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => decide("denied")}
                className="flex-1 border border-foreground px-4 py-2.5 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Ablehnen
              </button>
              <button
                onClick={() => decide("granted")}
                className="flex-1 border border-foreground px-4 py-2.5 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentLink({ className }: { className?: string }) {
  return (
    <button onClick={openConsent} className={className}>
      Cookie-Einstellungen
    </button>
  );
}
