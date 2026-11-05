import type { MetadataRoute } from "next";
import { upcomingEvents } from "@/content/events";
import { absoluteUrl } from "@/content/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1, lastModified },
    { url: absoluteUrl("/events"), changeFrequency: "daily", priority: 0.9, lastModified },
    ...upcomingEvents().map((e) => ({
      url: absoluteUrl(`/events/${e.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified,
    })),
    { url: absoluteUrl("/impressum"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
