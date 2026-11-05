import Image from "next/image";
import Link from "next/link";
import econoLogo from "@/assets/econo-logo.jpg";
import { site } from "@/content/site";
import { ConsentLink } from "./Consent";
import { InstagramIcon, LinkedinIcon } from "./Icons";

const linkCls = "text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Bekannt aus</span>
          <a
            href="/econo_all.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-border bg-white shadow-sm transition-transform hover:scale-105"
          >
            <Image src={econoLogo} alt="econo – Die starken Seiten der Wirtschaft" width={56} className="h-auto w-14 object-contain" />
          </a>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-xl font-bold tracking-tight text-foreground">CHURCH.</span>
            <div className="flex items-center gap-4">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="CHURCH. auf Instagram" className="text-primary transition-colors duration-300 hover:text-foreground">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="CHURCH. auf LinkedIn" className="text-primary transition-colors duration-300 hover:text-foreground">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/impressum" className={linkCls}>Impressum</Link>
            <Link href="/datenschutz" className={linkCls}>Datenschutz</Link>
            <ConsentLink className={linkCls} />
          </div>

          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CHURCH. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
