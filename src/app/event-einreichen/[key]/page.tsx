import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventSubmissionForm from "@/components/EventSubmissionForm";
import { eventSubmission as c } from "@/content/eventSubmission";
import { site } from "@/content/site";
import { isValidEventKey } from "@/lib/event-access";

// Versteckt: nur mit geheimem Link erreichbar, nicht indexierbar, nicht in der Sitemap.
export const metadata: Metadata = {
  title: c.meta.title,
  robots: { index: false, follow: false },
};

export default async function EventSubmissionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!isValidEventKey(key)) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border px-6 py-6 md:px-12">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-foreground">{site.name}</Link>
      </header>
      <main className="flex-1 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-widest text-primary">{c.eyebrow}</p>
          <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{c.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{c.intro}</p>
          <div className="mt-14">
            <EventSubmissionForm accessKey={key} />
          </div>
        </div>
      </main>
    </div>
  );
}
