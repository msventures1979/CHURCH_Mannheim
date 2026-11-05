import type { Metadata, Viewport } from "next";
import Consent from "@/components/Consent";
import WhatsAppButton from "@/components/WhatsAppButton";
import { absoluteUrl, site } from "@/content/site";
import { JsonLd } from "@/lib/seo";
import "./globals.css";

const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s" },
  applicationName: site.name,
  authors: [{ name: site.company.name }],
  formatDetection: { telephone: true, email: true, address: true },
  description: site.description,
  alternates: { canonical: "/" },
  robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  verification: { google: site.googleSiteVerification },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    url: "/",
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 675 }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [site.ogImage] },
};

export const viewport: Viewport = { themeColor: "#0A0A0A" };

// Strukturierte Daten für Google: Organisation, Website und Veranstaltungsort
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: site.name,
      url: site.url,
      logo: absoluteUrl(site.logo),
      email: site.email,
      telephone: site.phoneHref.replace("tel:", ""),
      sameAs: [site.instagram, site.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: site.url,
      name: site.name,
      inLanguage: "de-DE",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
    {
      "@type": ["EventVenue", "LocalBusiness"],
      "@id": absoluteUrl("/#venue"),
      name: site.name,
      description:
        "Denkmalgeschützte Kapelle von 1893 im Turley-Quartier Mannheim – Eventlocation mit 150 m² Kirchenraum und kuratierter Coworking-Space.",
      url: site.url,
      image: [absoluteUrl(site.ogImage)],
      logo: absoluteUrl(site.logo),
      telephone: site.phoneHref.replace("tel:", ""),
      email: site.email,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.zip,
        addressLocality: site.address.city,
        addressRegion: "Baden-Württemberg",
        addressCountry: "DE",
      },
      geo: { "@type": "GeoCoordinates", ...site.geo },
      hasMap: site.mapsLink,
      openingHours: "Mo-Fr 09:00-18:00",
      amenityFeature: [
        "Designküche",
        "Bar und Lounge-Zone",
        "Highspeed-WLAN",
        "16 Stellplätze",
        "Originale Buntglasfenster",
      ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
      parentOrganization: { "@id": absoluteUrl("/#organization") },
      sameAs: [site.instagram, site.linkedin],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={graph} />
        {children}
        <WhatsAppButton />
        <Consent gaId={site.gaId} />
      </body>
    </html>
  );
}
