import Link from "next/link";
import { upcomingEvents } from "@/content/events";
import { program } from "@/content/home";
import EventCard from "./EventCard";
import FadeIn from "./FadeIn";

export default function Program() {
  const events = upcomingEvents().slice(0, 3);
  if (events.length === 0) return null;

  return (
    <section id="programm" className="section-padding border-t border-border">
      <FadeIn className="mx-auto max-w-7xl">
        <p className="mb-6 text-sm uppercase tracking-widest text-primary">{program.eyebrow}</p>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-balance font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {program.headline}
          </h2>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">{program.text}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {events.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/events" className="inline-block text-sm uppercase tracking-widest text-primary transition-colors hover:text-foreground">
            {program.link}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
