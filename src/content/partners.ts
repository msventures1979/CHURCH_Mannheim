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
    id: "dipol",
    name: "DIPOL",
    role: "Mode-Kurator · Pop-up Copenhagen Catch Up",
    website: "https://www.dipol-fashion.de",
    type: "Organization",
  },
];

export const getPartner = (id: string) => partners.find((p) => p.id === id);
