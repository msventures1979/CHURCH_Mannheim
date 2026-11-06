// Texte der automatischen Bestätigungsmail an Anfragende – ohne Code-Kenntnisse änderbar.
// {vorname} und {interesse} werden automatisch ersetzt.

export const confirmationMail = {
  // Erst einschalten, wenn der Text freigegeben ist
  enabled: true,
  subject: "Danke für deine Anfrage – CHURCH. Mannheim",
  greeting: "Hallo {vorname},",
  greetingWithoutName: "Hallo,",
  paragraphs: [
    "danke für deine Nachricht! Deine Anfrage zum Thema „{interesse}“ ist bei uns angekommen. Wir melden uns in der Regel innerhalb von zwei Werktagen bei dir.",
    "Falls es eilt, erreichst du uns telefonisch unter {telefon} oder einfach per Antwort auf diese Mail.",
  ],
  eventsHint: "Bis dahin: Schau gern bei unseren nächsten Abenden vorbei.",
  eventsButton: "Aktuelle Events ansehen",
  closing: "Bis bald in der Kapelle",
  team: "Dein CHURCH. Team",
  footer:
    "Du erhältst diese E-Mail, weil über das Kontaktformular auf church-mannheim.com eine Anfrage mit deiner Adresse gesendet wurde. Warst das nicht du? Dann kannst du diese Nachricht einfach ignorieren.",
};
