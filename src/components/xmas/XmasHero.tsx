import "@fontsource/anton/400.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "@fontsource/yellowtail/400.css";
import Image from "next/image";
import Link from "next/link";
import hallImg from "@/assets/church-hall-entrance.jpg";
import { site } from "@/content/site";
import { xmas } from "@/content/weihnachtsmarkt";

// Plakat-Hero: randlose Riesen-Typo, Neon „Good Vibes“ schräg darüber, Mono-Leiste mit Terminen.
const word = "Good Vibes";
const flicker: Record<number, string> = { 1: "xh-fa", 7: "xh-fb" };

export default function XmasHero() {
  return (
    <header className="xh">
      <Image
        src={hallImg}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="xh-img"
      />
      <div className="xh-tint" />
      <div className="xh-grain" />
      <div className="xh-wrap">
        <div className="xh-bar">
          <Link
            href="/"
            className="font-display text-[28px] font-bold tracking-tight text-[#f6efe0] hover:text-[#e9c46a] md:text-[40px]"
          >
            {site.name}
          </Link>
          <span className="xh-tag">
            {xmas.hero.eyebrow}
            <br />
            Turley-Quartier Mannheim
          </span>
        </div>
        <div className="xh-stage">
          <div className="relative">
            <h1 className="xh-big">
              <span className="xh-l1">Christmas</span>
              <span className="xh-l2">Market</span>
              <span className="xh-l3">at CHURCH.</span>
            </h1>
            <div className="xh-neon" aria-hidden>
              {word.split("").map((ch, i) => (
                <span key={i} className={flicker[i]}>
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="xh-foot">
          <p className="xh-claim">
            Local Brands · Good Food
            <br />
            Good Drinks · Max. 15 Stände
          </p>
          <ul className="xh-dates" aria-label="Termine im Dezember 2026">
            {xmas.dates.options.map((d) => {
              const [day, date] = d.split(" ");
              return (
                <li key={d}>
                  <span>{day.replace(".", "")}</span>
                  {date}
                </li>
              );
            })}
          </ul>
          <a href="#anmeldung" className="xh-cta">
            {xmas.hero.cta} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
