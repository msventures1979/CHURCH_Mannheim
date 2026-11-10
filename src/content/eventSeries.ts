// Event-Reihen: Beschreibung, Ablauf, Infos. Termine stehen in events.ts.
import type { StaticImageData } from "next/image";
import wineyogaHero from "@/assets/wineyoga-hero.jpg";
import wineyogaCard from "@/assets/wineyoga-card.jpg";
import dipolHero from "@/assets/dipol-popup-hero.jpg";
import dipolCard from "@/assets/dipol-popup-card.jpg";
import feminineFlowHero from "@/assets/feminine-flow-hero.jpg";
import feminineFlowCard from "@/assets/feminine-flow-card.jpg";
import pilatesMenemenHero from "@/assets/pilates-menemen-hero.jpg";
import pilatesMenemenCard from "@/assets/pilates-menemen-card.jpg";

export interface TimelineStep {
  title: string;
  description: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface EventSeries {
  seriesId: string;
  title: string;
  subtitle: string;
  categories: string[];
  shortDescription: string;
  longDescription: string[];
  timeline: TimelineStep[];
  infos: InfoItem[];
  partnerId: string;
  heroImage: StaticImageData;
  cardImage: StaticImageData;
}

export const eventSeries: EventSeries[] = [
  {
    seriesId: "wineyoga",
    title: "WineYoga in der CHURCH.",
    subtitle: "mit Sophie Fitz",
    categories: ["Yoga", "Wein"],
    shortDescription:
      "Yoga, Weinverkostung und frisches Brot mit Dips im historischen Kirchenraum — ein Abend für Körper und Geist.",
    longDescription: [
      "Verbinde zwei der schönsten Dinge des Lebens: bewusste Bewegung und den Genuss ausgewählter Weine. Im historischen Kirchenraum der CHURCH. — zwischen originalen Buntglasfenstern und warmem Kerzenlicht — entsteht ein ganz besonderes Erlebnis für Körper und Geist.",
      "Yogalehrerin Sophie Fitz führt dich durch eine 45-minütige Vinyasa-Yoga-Einheit — dynamisch, fließend und für alle Level geeignet. Danach: Weinverkostung, frisches Brot mit feinen, hausgemachten Dips und gute Gespräche in einzigartiger Atmosphäre.",
    ],
    timeline: [
      { title: "Ankommen", description: "Begrüßung mit einem Glas FitzZero" },
      { title: "Yoga", description: "Ca. 45 Min. Vinyasa-Yoga für alle Level im Kirchenraum" },
      { title: "Weinprobe", description: "Verkostung von einem Sekt und 3 ausgewählten Weinen" },
      { title: "Genießen", description: "Frisches Brot mit feinen, hausgemachten Dips – und Raum für gute Gespräche" },
    ],
    infos: [
      { label: "Level", value: "Für alle, keine Yoga-Vorkenntnisse nötig" },
      { label: "Yogamatte", value: "Eigene mitbringen oder Leihmatte vor Ort (begrenzt)" },
      { label: "Alkoholfrei", value: "Alternative auf Anfrage möglich" },
      { label: "Parken", value: "16 kostenlose Stellplätze an der CHURCH." },
    ],
    partnerId: "sophie-fitz",
    heroImage: wineyogaHero,
    cardImage: wineyogaCard,
  },
  {
    seriesId: "feminine-flow",
    title: "Feminine Flow",
    subtitle: "mit Dilan & Aylin",
    categories: ["Yoga", "Tanz", "Women"],
    shortDescription:
      "Deep Yoga Stretch, Belly Dance Workshop, Healthy Shots und Sisterhood – ein Nachmittag für Frauen im historischen Kirchenraum.",
    longDescription: [
      "Ein Tag, um dich weich, sinnlich und lebendig zu fühlen: Bei Feminine Flow kommen wir im Kirchenraum der CHURCH. zusammen, um uns zu dehnen, zu tanzen, zu lachen und der eigenen Weiblichkeit Raum zu geben.",
      "Mit Deep Yoga Stretch mit Dilan starten wir auf der Matte und bringen Bewegung in die Hüften. Danach führt dich Aylin im Belly Dance Workshop zu ersten Bewegungen und neuen Rhythmen – ganz ohne Leistungsdruck. Dazu gibt es frische Healthy Shots, Zeit für echte Connection und eine Goodie Bag zum Mitnehmen.",
    ],
    timeline: [
      { title: "Deep Yoga Stretch", description: "Wohltuendes Dehnen auf der Matte mit Dilan" },
      { title: "Belly Dance Workshop", description: "Erste Bewegungen und Rhythmen mit Aylin – ganz ohne Vorkenntnisse" },
      { title: "Healthy Shots", description: "Frisch zubereitete Shots für dein Wohlbefinden" },
      { title: "Sisterhood", description: "Zeit für Gespräche und Connection – und eine Goodie Bag zum Mitnehmen" },
    ],
    infos: [
      { label: "Für wen", value: "Für Frauen, keine Vorkenntnisse nötig" },
      { label: "Inklusive", value: "Healthy Shots und Goodie Bag" },
      { label: "Tickets", value: "Über Eventbrite" },
      { label: "Parken", value: "16 kostenlose Stellplätze an der CHURCH." },
    ],
    partnerId: "yoga-dilan",
    heroImage: feminineFlowHero,
    cardImage: feminineFlowCard,
  },
  {
    seriesId: "pilates-menemen",
    title: "Pilates & Menemen",
    subtitle: "mit Dilan · Female Community Table",
    categories: ["Pilates", "Brunch", "Women"],
    shortDescription:
      "Matten-Pilates für alle Level, danach türkischer Brunch an der langen Tafel – mit Female Talk zum Thema Aktien und Goodie Bag.",
    longDescription: [
      "Erst auf die Matte, dann an die lange Tafel: Bei Pilates & Menemen starten wir im Kirchenraum der CHURCH. mit einer gemeinsamen Matten-Pilates-Session – egal, ob du zum ersten Mal dabei bist oder regelmäßig trainierst.",
      "Danach gibt es türkischen Brunch mit frisch zubereitetem Menemen, Simit und Çay. Beim Female Talk erklärt Abigal Orban (@finanzen_ao), wie du mit dem Investieren in Aktien anfangen kannst; weitere Speakerinnen folgen. Und es bleibt genug Zeit zum Quatschen.",
    ],
    timeline: [
      { title: "Pilates", description: "Matten-Pilates für alle Level mit Dilan" },
      { title: "Türkischer Brunch", description: "Menemen, Simit, Çay und mehr an einer langen Tafel" },
      { title: "Female Talk", description: "Einstieg ins Investieren in Aktien mit Abigal Orban und weitere Speakerinnen" },
      { title: "Goodie Bag", description: "Zum Mitnehmen für jede Teilnehmerin" },
    ],
    infos: [
      { label: "Für wen", value: "Für Frauen, Pilates für alle Level" },
      { label: "Inklusive", value: "Brunch, Female Talk und Goodie Bag" },
      { label: "Tickets", value: "Über Eventbrite" },
      { label: "Parken", value: "16 kostenlose Stellplätze an der CHURCH." },
    ],
    partnerId: "yoga-dilan",
    heroImage: pilatesMenemenHero,
    cardImage: pilatesMenemenCard,
  },
  {
    seriesId: "copenhagen-catch-up",
    title: "Copenhagen Catch Up",
    subtitle: "curated by DIPOL",
    categories: ["Pop-up", "Mode", "Kunst"],
    shortDescription:
      "Drei Wochen Kopenhagen in der CHURCH.: Herbstmode, ausgewählte Labels, Düfte und Kunst – kuratiert von DIPOL.",
    longDescription: [
      "Wir von DIPOL reisen seit Jahren nach Kopenhagen, um Menschen zu treffen, zu entdecken und Mode auszuwählen. Mit Copenhagen Catch Up möchten wir etwas von diesem Gefühl für drei Wochen nach Mannheim bringen.",
      "Entdecke in unserem Pop-up in der CHURCH Herbstmode, ausgewählte Labels, Düfte und Kunst. Und natürlich ist Ralph da.",
    ],
    timeline: [
      { title: "Mode", description: "Ausgewählte Herbstmode und kuratierte Labels aus Kopenhagen" },
      { title: "Parfum", description: "Besondere Düfte zum Entdecken" },
      { title: "Kunst", description: "Ausgewählte Kunst im historischen Kirchenraum" },
      { title: "Ralph", description: "Und natürlich ist Ralph vor Ort" },
    ],
    infos: [
      { label: "Zeitraum", value: "23. Oktober – 14. November 2026" },
      { label: "Öffnungszeiten", value: "Täglich geöffnet" },
      { label: "Eintritt", value: "frei" },
      { label: "Kategorie", value: "Mode · Parfum · Kunst" },
    ],
    partnerId: "dipol",
    heroImage: dipolHero,
    cardImage: dipolCard,
  },
];

export const getSeries = (id: string) => eventSeries.find((s) => s.seriesId === id);
