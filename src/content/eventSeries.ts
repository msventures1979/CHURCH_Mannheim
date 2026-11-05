// Event-Reihen: Beschreibung, Ablauf, Infos. Termine stehen in events.ts.
import type { StaticImageData } from "next/image";
import wineyogaHero from "@/assets/wineyoga-hero.jpg";
import wineyogaCard from "@/assets/wineyoga-card.jpg";
import dipolHero from "@/assets/dipol-popup-hero.jpg";
import dipolCard from "@/assets/dipol-popup-card.jpg";

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
