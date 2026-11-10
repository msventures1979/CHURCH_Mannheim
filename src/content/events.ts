// Termine. Neuer Termin = neuer Eintrag in `events`. Vergangene Termine verschwinden automatisch.
import { getSeries, type EventSeries } from "./eventSeries";

export type EventStatus = "available" | "few_left" | "sold_out";

export interface EventDate {
  slug: string;
  seriesId: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD, nur bei Zeiträumen (z. B. Pop-up)
  time: string;
  endTime?: string; // "HH:MM", wenn das Ende nicht nach 2,5 Std. ist
  duration: string;
  price: string;
  status: EventStatus;
  ticketLink: string;
}

const WINEYOGA_UTM = "?utm_source=church-mannheim&utm_medium=referral";

export const events: EventDate[] = [
  {
    slug: "wineyoga-juni-2026",
    seriesId: "wineyoga",
    date: "2026-06-20",
    time: "17:00 Uhr",
    duration: "ca. 2,5 Std.",
    price: "54 € pro Person",
    status: "available",
    ticketLink: `https://wineyoga.de/produkt/wineyoga-20-06-2026-1700/${WINEYOGA_UTM}`,
  },
  {
    slug: "wineyoga-november-2026",
    seriesId: "wineyoga",
    date: "2026-11-07",
    time: "17:00 Uhr",
    duration: "ca. 2,5 Std.",
    price: "54 € pro Person",
    status: "available",
    ticketLink: `https://wineyoga.de/produkt/wineyoga-07-11-2026-1700/${WINEYOGA_UTM}`,
  },
  {
    slug: "wineyoga-dezember-2026",
    seriesId: "wineyoga",
    date: "2026-12-05",
    time: "17:00 Uhr",
    duration: "ca. 2,5 Std.",
    price: "54 € pro Person",
    status: "available",
    ticketLink: `https://wineyoga.de/produkt/wineyoga-05-12-2026-1700/${WINEYOGA_UTM}`,
  },
  {
    slug: "feminine-flow-november-2026",
    seriesId: "feminine-flow",
    date: "2026-11-29",
    time: "13:00 Uhr",
    endTime: "15:30",
    duration: "ca. 2,5 Std.",
    price: "44 € pro Person",
    status: "available",
    ticketLink: "https://www.eventbrite.com/e/feminine-flow-deep-yoga-stretch-belly-dance-workshop-mannheim-tickets-2003789309766",
  },
  {
    slug: "pilates-menemen-dezember-2026",
    seriesId: "pilates-menemen",
    date: "2026-12-13",
    time: "10:00 Uhr",
    endTime: "13:30",
    duration: "ca. 3,5 Std.",
    price: "55 € pro Person",
    status: "available",
    ticketLink: "https://www.eventbrite.com/e/pilates-menemen-turkischer-brunch-female-community-table-mannheim-tickets-2004614331428",
  },
  {
    slug: "copenhagen-catch-up-2026",
    seriesId: "copenhagen-catch-up",
    date: "2026-10-23",
    endDate: "2026-11-14",
    time: "Täglich geöffnet",
    duration: "23.10. – 14.11.2026",
    price: "Eintritt frei",
    status: "available",
    ticketLink: "https://www.dipol-fashion.de/pop-up",
  },
];

// ---- Hilfsfunktionen (Zeitzone Mannheim) ----

const todayBerlin = () =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(new Date()); // YYYY-MM-DD

export const isPast = (e: EventDate) => (e.endDate ?? e.date) < todayBerlin();

export const upcomingEvents = () =>
  events.filter((e) => !isPast(e)).sort((a, b) => a.date.localeCompare(b.date));

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

export const getEventSeries = (e: EventDate): EventSeries | undefined => getSeries(e.seriesId);

export const otherDatesInSeries = (e: EventDate) =>
  upcomingEvents().filter((x) => x.seriesId === e.seriesId && x.slug !== e.slug);

export const isTicketEvent = (e: EventDate) => !e.endDate;

// UTC-Versatz von Mannheim an einem Tag, z. B. "+01:00" (Winter) oder "+02:00" (Sommer)
export function berlinOffset(iso: string) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "shortOffset" })
    .formatToParts(new Date(`${iso}T12:00:00Z`))
    .find((p) => p.type === "timeZoneName")?.value; // "GMT+1"
  const h = Number(name?.replace("GMT", "") || 1);
  return `${h >= 0 ? "+" : "-"}${String(Math.abs(h)).padStart(2, "0")}:00`;
}

// Beginn und Ende als ISO-Zeit mit Zeitzone. Abende: Dauer 2,5 Std.; Zeiträume (Pop-up): 10–18 Uhr.
export function eventSchedule(e: EventDate) {
  const [hh = e.endDate ? "10" : "17", mm = "00"] = e.time.match(/\d+/g) ?? [];
  const pad = (n: string | number) => String(n).padStart(2, "0");
  const start = `${e.date}T${pad(hh)}:${pad(mm)}:00${berlinOffset(e.date)}`;
  const endMinutes = Number(hh) * 60 + Number(mm) + 150;
  const end = e.endDate
    ? `${e.endDate}T18:00:00${berlinOffset(e.endDate)}`
    : e.endTime
      ? `${e.date}T${e.endTime}:00${berlinOffset(e.date)}`
      : `${e.date}T${pad(Math.floor(endMinutes / 60))}:${pad(endMinutes % 60)}:00${berlinOffset(e.date)}`;
  return { start, end };
}

const WEEKDAYS = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m: m - 1, d, wd };
};

export const formatDateLong = (iso: string) => {
  const { y, m, d, wd } = parse(iso);
  return `${WEEKDAYS[wd]} ${d}. ${MONTHS[m]} ${y}`;
};

export const formatDateShort = (iso: string) => {
  const { y, m, d, wd } = parse(iso);
  return `${WEEKDAYS[wd]} ${d}. ${MONTHS[m].slice(0, 3)}. ${y}`;
};

export const formatDateRange = (e: EventDate, long = false) => {
  if (!e.endDate) return long ? formatDateLong(e.date) : formatDateShort(e.date);
  const a = parse(e.date);
  const b = parse(e.endDate);
  const month = (m: number) => (long ? MONTHS[m] : `${MONTHS[m].slice(0, 3)}.`);
  const y = a.y !== b.y ? ` ${a.y}` : "";
  return `${a.d}. ${month(a.m)}${y} – ${b.d}. ${month(b.m)} ${b.y}`;
};
