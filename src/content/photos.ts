// Fotos „CHURCH. in Action“ – Pop-up „Copenhagen Catch Up“ von DIPOL (Okt./Nov. 2026).
// Fotos: Sebastian Weindel – Nennung ist Teil der Freigabe, bitte immer mit angeben.
import type { StaticImageData } from "next/image";
import saal from "@/assets/events/eventlocation-mannheim-saal-popup-store.jpg";
import lounge from "@/assets/events/eventlocation-mannheim-lounge-showroom.jpg";
import bar from "@/assets/events/eventlocation-mannheim-bar-theke.jpg";
import buntglas from "@/assets/events/eventlocation-mannheim-buntglasfenster.jpg";
import kronleuchter from "@/assets/events/eventlocation-mannheim-kronleuchter-mode.jpg";
import blick from "@/assets/events/eventlocation-mannheim-blick-in-den-saal.jpg";
import sitzgruppe from "@/assets/events/eventlocation-mannheim-sitzgruppe-bogenlampe.jpg";
import produkte from "@/assets/events/eventlocation-mannheim-produktpraesentation.jpg";
import brillen from "@/assets/events/eventlocation-mannheim-brillen-detail.jpg";
import altar from "@/assets/events/eventlocation-mannheim-altarbereich-buntglas.jpg";
import kleider from "@/assets/events/eventlocation-mannheim-kleiderstaender.jpg";
import theke from "@/assets/events/eventlocation-mannheim-theke-showroom.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const photoCredit = {
  name: "Sebastian Weindel",
  url: "https://www.sebastian-weindel.de/",
  event: "Pop-up „Copenhagen Catch Up“ von DIPOL",
};

// Reihenfolge = Reihenfolge in der Galerie. Das erste Bild wird groß gezeigt.
export const actionPhotos: Photo[] = [
  { src: saal, alt: "Pop-up-Store im Saal der Eventlocation CHURCH. Mannheim mit Kleiderständern, Lounge und Buntglasfenster unter Kronleuchtern" },
  { src: lounge, alt: "Lounge-Ecke mit Designsesseln zwischen Kleiderständern – der Kirchenraum als Showroom" },
  { src: bar, alt: "Bar und Theke mit Siebträgermaschine und Weinkühlschränken bei einem Pop-up-Event in der CHURCH." },
  { src: buntglas, alt: "Historisches Buntglasfenster der Kapelle im Turley-Quartier Mannheim während eines Events" },
  { src: kronleuchter, alt: "Mode-Pop-up in der Kapelle: Kleiderständer unter Kronleuchtern und Stahlträgern" },
  { src: blick, alt: "Blick durch die Tür in den Eventraum der CHURCH. Mannheim mit Pop-up-Store" },
  { src: sitzgruppe, alt: "Sitzgruppe mit Bogenlampe und Kleiderständern im historischen Kirchenraum" },
  { src: produkte, alt: "Parfums auf weißen Podesten – Produktpräsentation in der Eventlocation" },
  { src: brillen, alt: "Brillenkollektion als Detail einer Pop-up-Präsentation in der CHURCH. Mannheim" },
  { src: altar, alt: "Podest vor großem Buntglasfenster im ehemaligen Altarbereich der Kapelle" },
  { src: kleider, alt: "Kleiderständer mit Herbstmode im Saal mit Kronleuchtern – Pop-up-Fläche in Mannheim" },
  { src: theke, alt: "Theke und Verkaufsfläche bei einem Pop-up-Event in der CHURCH." },
];

// Auswahl für die Startseite
export const homeActionPhotos = [0, 1, 2, 4, 3, 5].map((i) => actionPhotos[i]);
