import type { StaticImageData } from "next/image";
import sophieFitz from "@/assets/sophie-fitz.jpg";

export interface Partner {
  id: string;
  name: string;
  role: string;
  website?: string;
  image?: StaticImageData;
  type?: "Person" | "Organization";
}

export const partners: Partner[] = [
  {
    id: "sophie-fitz",
    name: "Sophie Fitz",
    role: "Zertifizierte Yogalehrerin & Gründerin WineYoga",
    website: "https://wineyoga.de",
    image: sophieFitz,
    type: "Person",
  },
  {
    id: "yoga-dilan",
    name: "Dilan Ückan",
    role: "Yoga, Pilates & Sound Bath · Yoga Dilan",
    website: "https://yoga-dilan.de",
    type: "Person",
  },
  {
    id: "dipol",
    name: "DIPOL",
    role: "Mode-Kurator · Pop-up Copenhagen Catch Up",
    website: "https://www.dipol-fashion.de",
    type: "Organization",
  },
  {
    id: "mom-circle",
    name: "MOM CIRCLE Mannheim",
    role: "Plattform für Mamas: Bewegung, kreative Workshops und gemeinsame Erlebnisse",
    website: "https://www.instagram.com/momcirclemannheim",
    type: "Organization",
  },
];

export const getPartner = (id: string) => partners.find((p) => p.id === id);
