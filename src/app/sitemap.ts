import type { MetadataRoute } from "next";
import { upcomingEvents } from "@/content/events";
import { actionPhotos } from "@/content/photos";
import { absoluteUrl } from "@/content/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/eventlocation-mieten"),
      changeFrequency: "monthly",
      priority: 0.95,
      images: actionPhotos.map((p) => absoluteUrl(p.src.src)),
    },
    { url: absoluteUrl("/coworking-mannheim"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/events"), changeFrequency: "daily", priority: 0.9 },
    ...upcomingEvents().map((e) => ({
      url: absoluteUrl(`/events/${e.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/impressum"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
