import { events, eventSchedule, getEvent, getEventSeries } from "@/content/events";
import { absoluteUrl, site } from "@/content/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

// Text für iCalendar escapen (RFC 5545)
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

// Zeilen auf max. 75 Byte falten (RFC 5545)
function fold(line: string) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let cur = "";
  let len = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    if (len + n > (out.length ? 74 : 75)) {
      out.push(cur);
      cur = "";
      len = 0;
    }
    cur += ch;
    len += n;
  }
  out.push(cur);
  return out.join("\r\n ");
}

const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const dateOnly = (iso: string) => iso.replace(/-/g, "");
const nextDay = (iso: string) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
};

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  const series = event ? getEventSeries(event) : undefined;
  if (!event || !series) return new Response("Nicht gefunden", { status: 404 });

  const url = absoluteUrl(`/events/${event.slug}`);
  const { start, end } = eventSchedule(event);
  const location = `${site.name}, ${site.address.street}, ${site.address.zip} ${site.address.city}`;
  const description = [series.shortDescription, "", `${event.time} · ${event.price}`, `Infos & Tickets: ${event.ticketLink}`, url].join("\n");

  const when = event.endDate
    ? [`DTSTART;VALUE=DATE:${dateOnly(event.date)}`, `DTEND;VALUE=DATE:${nextDay(event.endDate)}`]
    : [`DTSTART:${utc(start)}`, `DTEND:${utc(end)}`];

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CHURCH. Mannheim//Events//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.slug}@church-mannheim.com`,
    `DTSTAMP:${utc(new Date().toISOString())}`,
    ...when,
    `SUMMARY:${esc(series.title)}`,
    `DESCRIPTION:${esc(description)}`,
    `LOCATION:${esc(location)}`,
    `GEO:${site.geo.latitude};${site.geo.longitude}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="church-${event.slug}.ics"`,
    },
  });
}
