"use client";

import { useActionState, useEffect, useState } from "react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { newsletter } from "@/content/newsletter";

export default function NewsletterSignup({ source = "footer" }: { source?: string }) {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(subscribeNewsletter, { status: "idle" });
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => setStartedAt(Date.now()), []);

  if (state.status === "success") {
    return (
      <p className="text-sm leading-relaxed text-primary" role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="w-full" noValidate>
      <input type="hidden" name="t" value={startedAt} />
      <input type="hidden" name="source" value={source} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`nl-website-${source}`}>Website</label>
        <input id={`nl-website-${source}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`nl-email-${source}`} className="sr-only">
          E-Mail-Adresse
        </label>
        <input
          id={`nl-email-${source}`}
          name="email"
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          placeholder={newsletter.placeholder}
          className="min-w-0 flex-1 border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "…" : newsletter.button}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {newsletter.consent.replace(" Details in der Datenschutzerklärung.", "")}{" "}
        <a href="/datenschutz#newsletter" className="underline hover:text-foreground">
          Details in der Datenschutzerklärung
        </a>
        .
      </p>
      {state.status === "error" && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
