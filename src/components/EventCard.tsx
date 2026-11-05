import Image from "next/image";
import Link from "next/link";
import { formatDateRange, getEventSeries, isTicketEvent, type EventDate } from "@/content/events";

interface Props {
  event: EventDate;
  showPrice?: boolean;
  showDescription?: boolean;
}

export default function EventCard({ event, showPrice = false, showDescription = false }: Props) {
  const series = getEventSeries(event);
  if (!series) return null;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={series.cardImage}
          alt={series.title}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="space-y-4 p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary">{series.categories.join(" · ")}</p>
        <div className="space-y-1">
          <p className="text-sm text-foreground">{formatDateRange(event)}</p>
          <h3 className="font-display text-xl font-bold leading-tight text-foreground md:text-2xl">{series.title}</h3>
          <p className="text-sm text-primary">{series.subtitle}</p>
        </div>
        {showDescription && <p className="text-sm leading-relaxed text-muted-foreground">{series.shortDescription}</p>}
        <div className="space-y-1 border-t border-border pt-2 text-xs text-muted-foreground">
          <p>
            {event.time} · {event.duration}
          </p>
          {showPrice && <p className="text-foreground">{event.price}</p>}
          {event.status === "few_left" && <p className="text-primary">Nur noch wenige Plätze</p>}
          {event.status === "sold_out" && <p className="text-primary">Ausgebucht</p>}
        </div>
        {showPrice && (
          <div className="pt-2">
            <span className="inline-block border border-foreground px-6 py-2 text-xs uppercase tracking-widest text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
              {isTicketEvent(event) ? "Details & Tickets" : "Mehr Infos"}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
