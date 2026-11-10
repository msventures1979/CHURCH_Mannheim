// Versteckte Seite „Weihnachtsmarkt“ (nicht verlinkt, nicht in der Sitemap) – ohne Code-Kenntnisse änderbar.

export const xmas = {
  meta: {
    title: "A Christmas Market at CHURCH. – Aussteller gesucht",
    description: "Weihnachtsmarkt mit lokalen Brands, Food, Drinks & Good Vibes in der CHURCH. Mannheim – jetzt als Aussteller:in Interesse melden.",
  },
  hero: {
    eyebrow: "Aussteller gesucht",
    title: "A Christmas Market at CHURCH.",
    subtitle: "Local Brands, Good Food, Good Drinks & Good Vibes",
    dates: "Dezember 2026 · Turley-Quartier Mannheim",
    cta: "Interesse melden",
  },
  intro: [
    "Im Dezember verwandelt sich die CHURCH. im Turley-Quartier in einen ganz besonderen Weihnachtsmarkt. Wir möchten einen Ort schaffen, der mehr ist als ein klassischer Weihnachtsmarkt: ein kreatives Come-together in außergewöhnlicher Atmosphäre, das Menschen, Ideen und lokale Brands zusammenbringt.",
    "Auf maximal 15 ausgewählten Ständen präsentieren sich spannende Labels, kleine Manufakturen, kreative Köpfe und besondere Brands – mit Fokus auf die lokale Szene aus Mannheim und der Region. Dazu gibt es leckere Drinks, gutes Essen, ausgewählte Musik und jede Menge Raum zum Entdecken, Genießen und Zusammenkommen.",
  ],
  facts: [
    { value: "max. 15", label: "ausgewählte Stände" },
    { value: "1893", label: "Kapelle als Kulisse" },
    { value: "Local", label: "Mannheim & Region" },
  ],
  categories: {
    headline: "Wen wir suchen.",
    text: "Alles ist willkommen, was mit Leidenschaft, Qualität und einer eigenen Idee überzeugt.",
    items: [
      { title: "Fashion & Accessoires", text: "Labels, Schmuck, Taschen – gern mit Geschichte." },
      { title: "Design & Interior", text: "Wohnaccessoires, Papeterie, Keramik, Leuchten." },
      { title: "Kunst & Handmade", text: "Prints, Illustration, Kerzen, kleine Manufakturen." },
      { title: "DIY-Aktionen", text: "Workshops und Mitmach-Stationen für Groß und Klein." },
      { title: "Food", text: "Besondere Food-Konzepte statt Standard-Bratwurst." },
      { title: "Drinks", text: "Glühwein neu gedacht, Craft, Kaffee, Alkoholfreies." },
    ],
  },
  plan: {
    text: "15 Stände à 2 × 2 m im Kirchenraum",
    link: "Standplan ansehen (PDF)",
    href: "/weihnachtsmarkt-standplan.pdf",
  },
  dates: {
    headline: "Mögliche Termine.",
    text: "Einzeln oder als Wochenende – sag uns, wann du dabei sein könntest. Den finalen Termin legen wir nach den Rückmeldungen fest.",
    options: ["Sa. 12.12.", "So. 13.12.", "Sa. 19.12.", "So. 20.12."],
  },
  // Zusätzliche Empfänger:innen für Anmeldungen (neben info@)
  notifyAlso: ["kiss.mi@web.de"],
  contactPerson: { name: "Mirka Kissel-Storch", phone: "+49 178 4881428", phoneHref: "tel:+491784881428", email: "kiss.mi@web.de" },
  // Bestätigungsmail an Aussteller:innen. {vorname} wird automatisch ersetzt.
  confirmation: {
    subject: "Danke für dein Interesse – A Christmas Market at CHURCH.",
    greeting: "Hallo {vorname},",
    greetingWithoutName: "Hallo,",
    paragraphs: [
      "wie schön, dass du beim Weihnachtsmarkt in der CHURCH. dabei sein möchtest! Dein Interesse ist bei uns angekommen.",
      "Wir sammeln gerade alle Rückmeldungen und stellen eine bunte Mischung aus maximal 15 Ständen zusammen – Fashion, Design, Handmade, Food und Drinks. Sobald der Termin feststeht, melden wir uns bei dir mit allen Details zu Stand, Kosten und Ablauf.",
      "Bei Fragen erreichst du Mirka direkt unter +49 178 4881428 oder per Antwort auf diese Mail.",
    ],
    closing: "Let's make this Christmas special!",
    team: "Mirka & das CHURCH. Team",
    replyTo: "kiss.mi@web.de",
    footer:
      "Du erhältst diese E-Mail, weil über church-mannheim.com Interesse am Weihnachtsmarkt mit deiner Adresse gemeldet wurde. Warst das nicht du? Dann kannst du diese Nachricht einfach ignorieren.",
  },
  form: {
    eyebrow: "Interesse melden",
    headline: "Let's make this Christmas special!",
    text: "Ein paar Eckdaten genügen. Wir melden uns mit allen Details zu Standgröße, Kosten und Ablauf.",
    categoryOptions: ["Fashion & Accessoires", "Design & Interior", "Kunst & Handmade", "DIY-Aktion", "Food", "Drinks", "Sonstiges"],
    submit: "Interesse senden",
    successTitle: "Danke – wir freuen uns!",
    successText: "Dein Interesse ist bei uns angekommen – eine Bestätigung liegt schon in deinem Postfach. Wir melden uns mit allen Details.",
  },
};
