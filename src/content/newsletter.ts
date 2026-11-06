// Texte rund um den Newsletter – ohne Code-Kenntnisse änderbar.

export const newsletter = {
  headline: "Neue Abende zuerst erfahren.",
  text: "Einmal im Monat das Programm der CHURCH. – plus Ankündigungen, wenn etwas Besonderes ansteht.",
  placeholder: "Deine E-Mail-Adresse",
  button: "Anmelden",
  // Dieser Wortlaut wird bei jeder Anmeldung als Einwilligungsnachweis gespeichert.
  consent:
    "Mit der Anmeldung willigst du ein, den Newsletter der CHURCH. (Programm, Events, Neuigkeiten) per E-Mail zu erhalten. Abmeldung jederzeit über den Link in jeder Mail. Details in der Datenschutzerklärung.",
  success:
    "Fast geschafft! Wir haben dir eine Mail geschickt – bitte bestätige deine Anmeldung über den Link darin.",
  error: "Das hat leider nicht geklappt. Bitte versuch es später noch einmal.",
  invalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
  tooMany: "Zu viele Versuche. Bitte versuch es in ein paar Minuten noch einmal.",
  eventHint: "Keinen Abend mehr verpassen?",
  eventHintLink: "Zum Newsletter",
  contactCheckbox: "Ja, ich möchte auch den Newsletter der CHURCH. erhalten (Bestätigung per E-Mail).",

  // Bestätigungsseite
  confirmTitle: "Anmeldung bestätigen",
  confirmText: "Ein Klick noch, dann bist du dabei.",
  confirmButton: "Jetzt bestätigen",
  confirmedTitle: "Du bist dabei!",
  confirmedText: "Danke für deine Anmeldung. Ab jetzt erfährst du als Erste:r, was in der CHURCH. passiert.",
  invalidLinkTitle: "Link ungültig oder abgelaufen",
  invalidLinkText:
    "Dieser Bestätigungslink funktioniert leider nicht mehr. Melde dich einfach noch einmal an – unten auf jeder Seite.",

  // Double-Opt-In-Mail
  mail: {
    subject: "Bitte bestätige deine Anmeldung – CHURCH. Newsletter",
    greeting: "Hallo,",
    paragraphs: [
      "fast geschafft: Bitte bestätige mit einem Klick, dass du den Newsletter der CHURCH. erhalten möchtest. Dann erfährst du als Erste:r von neuen Abenden, Pop-ups und Events in der Kapelle.",
    ],
    button: "Anmeldung bestätigen",
    validity:
      "Der Link ist 7 Tage gültig. Du hast dich nicht angemeldet? Dann ignoriere diese Mail einfach – ohne Bestätigung schicken wir dir nichts.",
    team: "Dein CHURCH. Team",
  },
};
