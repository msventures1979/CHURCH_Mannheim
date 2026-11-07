import Image from "next/image";
import Link from "next/link";
import econoLogo from "@/assets/econo-logo.jpg";
import { site } from "@/content/site";
import { ConsentLink } from "./Consent";
import { newsletter } from "@/content/newsletter";
import { InstagramIcon, LinkedinIcon } from "./Icons";
import NewsletterSignup from "./NewsletterSignup";

const linkCls = "text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground";

export default function Footer({ hideNewsletter = false }: { hideNewsletter?: boolean }) {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10">
        {!hideNewsletter && (
        <section id="newsletter" className="w-full max-w-xl scroll-mt-28 border-b border-border pb-12 pt-4 text-center" aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading" className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {newsletter.headline}
          </h2>
          <p className="mx-auto mb-6 mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{newsletter.text}</p>
          <div className="text-left">
            <NewsletterSignup source="footer" />
          </div>
        </section>
        )}

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
            <Link href="/eventlocation-mieten" className={linkCls}>Location mieten</Link>
            <Link href="/coworking-mannheim" className={linkCls}>Coworking</Link>
            <Link href="/events" className={linkCls}>Events</Link>
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
