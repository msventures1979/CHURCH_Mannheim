import type { NextConfig } from "next";

const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

// Google Analytics lädt erst nach Einwilligung, muss aber in der CSP erlaubt sein.
// Google Maps wird erst nach Klick geladen (frame-src).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Bild-Uploads im Formular „Event einreichen“ (im Browser vorab verkleinert)
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Standplan der versteckten Weihnachtsmarkt-Seite nicht indexieren
      { source: "/weihnachtsmarkt-standplan.pdf", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      // Vorschau-URLs nie indexieren
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      ...(noindex ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
    ];
  },
  async redirects() {
    return [
      // Bisherige Pfade bleiben gleich; vergangene Events leitet die Seite selbst auf /events
      { source: "/index.html", destination: "/", permanent: true },
      // Alte, bei Google indexierte Seite aus der Lovable-Zeit
      { source: "/freie-trauung", destination: "/eventlocation-mieten", permanent: true },
    ];
  },
};

export default nextConfig;
