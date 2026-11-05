import type { Metadata, Viewport } from "next";
import Consent from "@/components/Consent";
import WhatsAppButton from "@/components/WhatsAppButton";
import { absoluteUrl, site } from "@/content/site";
import "./globals.css";

const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s" },
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

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: ["https://schema.org/CoworkingSpace", "https://schema.org/EventVenue"],
  name: site.name,
  description: "Denkmalgeschützte Kapelle von 1893 – Coworking-Space und Eventfläche im Turley-Quartier Mannheim.",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.zip,
    addressCountry: "DE",
  },
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  url: site.url,
  image: absoluteUrl(site.ogImage),
  priceRange: "€€",
  openingHours: "Mo-Fr 09:00-18:00",
  geo: { "@type": "GeoCoordinates", ...site.geo },
  hasMap: site.mapsLink,
  sameAs: [site.instagram, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        {children}
        <WhatsAppButton />
        <Consent gaId={site.gaId} />
      </body>
    </html>
  );
}
