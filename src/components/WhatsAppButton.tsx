"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppButton() {
  const pathname = usePathname();
  // Auf Event-Seiten liegt mobil eine Ticket-Leiste unten – Button darüber setzen
  const aboveTicketBar = /^\/events\/.+/.test(pathname);

  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat öffnen"
      title="WhatsApp Chat öffnen"
      className={`fixed right-6 ${aboveTicketBar ? "bottom-24 md:bottom-6" : "bottom-6"} z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:brightness-110`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
