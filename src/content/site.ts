// Stammdaten der CHURCH. – hier ändern, wirkt überall (Kontakt, Impressum, Footer, SEO).

export const site = {
  name: "CHURCH.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.church-mannheim.com",
  title: "CHURCH. | Eventlocation & Coworking in Mannheim",
  description:
    "Eventlocation in einer Kapelle von 1893 im Turley-Quartier Mannheim: 150 m² Kirchenraum für Events, Workshops & Pop-ups – plus kuratierter Coworking-Space.",
  ogImage: "/images/og-image.jpg",
  logo: "/icon-512.png",

  email: "info@church-mannheim.com",
  phone: "+49 621 180 657 466",
  phoneHref: "tel:+49621180657466",
  whatsapp:
    "https://wa.me/4915146726137?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20CHURCH.",

  address: {
    street: "Turleystraße 36",
    zip: "68167",
    city: "Mannheim",
  },
  geo: { latitude: 49.4873, longitude: 8.465 },
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Turleystra%C3%9Fe+36%2C+68167+Mannheim",
  mapsEmbed:
    "https://www.google.com/maps?q=Turley-Stra%C3%9Fe%2036%2C%2068167%20Mannheim&z=16&hl=de&output=embed",

  instagram: "https://www.instagram.com/church.mannheim/",
  linkedin: "https://www.linkedin.com/company/church-mannheim/",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-J0RPGFDRDN",
  googleSiteVerification: "s5lBvrR-vOqwN6AxaKysggh8K8L4xaBi6YWF0tqOBRc",

  company: {
    name: "Matthias Storch Ventures GmbH",
    representative: "Matthias Storch, Geschäftsführer",
    register: "Handelsregister B des Amtsgerichts Mannheim",
    registerNumber: "HRB 707144",
    vatId: "DE266133935",
    responsible: "Matthias Storch",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
