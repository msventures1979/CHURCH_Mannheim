"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { contact } from "@/content/home";
import { newsletter } from "@/content/newsletter";
import { site } from "@/content/site";
import FadeIn from "./FadeIn";
import MapEmbed from "./MapEmbed";

const fieldCls =
  "w-full border-b border-border bg-transparent py-3 text-foreground transition-colors focus:border-primary focus:outline-none";
const labelCls = "mb-2 block text-sm tracking-wide text-muted-foreground";

export default function Contact() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setStartedAt(Date.now()), []);
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setStartedAt(Date.now());
    }
  }, [state]);

  return (
    <section id="kontakt" className="section-padding border-t border-border">
      <FadeIn className="mx-auto max-w-7xl">
        <h2 className="mb-16 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {contact.headline}
        </h2>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <form
            ref={formRef}
            action={action}
            // Eigener Submit, damit Eingaben bei einem Fehler nicht gelöscht werden
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(() => action(fd));
            }}
            className="space-y-6"
            noValidate
          >
            <input type="hidden" name="t" value={startedAt} />
            {/* Honeypot: für Menschen unsichtbar */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="contact-name" className={labelCls}>Name *</label>
              <input id="contact-name" name="name" required maxLength={100} autoComplete="name" className={fieldCls}
                aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "err-name" : undefined} />
              {state.errors?.name && <p id="err-name" className="mt-1 text-sm text-destructive">{state.errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className={labelCls}>E-Mail *</label>
              <input id="contact-email" name="email" type="email" required maxLength={255} autoComplete="email" className={fieldCls}
                aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "err-email" : undefined} />
              {state.errors?.email && <p id="err-email" className="mt-1 text-sm text-destructive">{state.errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact-phone" className={labelCls}>Telefon</label>
              <input id="contact-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className={fieldCls} />
            </div>
            <div>
              <label htmlFor="contact-interest" className={labelCls}>Interesse an</label>
              <select id="contact-interest" name="interest" className={`${fieldCls} appearance-none bg-background`}>
                {contact.interests.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className={labelCls}>Nachricht</label>
              <textarea id="contact-message" name="message" rows={4} maxLength={2000} className={`${fieldCls} resize-none`} />
            </div>

            <label htmlFor="contact-newsletter" className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <input id="contact-newsletter" name="newsletter" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9b79c]" />
              <span>{newsletter.contactCheckbox}</span>
            </label>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Wir verwenden deine Angaben nur, um deine Anfrage zu beantworten. Details in der{" "}
              <a href="/datenschutz" className="underline hover:text-foreground">Datenschutzerklärung</a>.
            </p>

            <button
              type="submit"
              disabled={pending}
              className="border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pending ? "Wird gesendet …" : "Anfrage senden"}
            </button>

            <div aria-live="polite">
              {state.status === "success" && <p className="text-sm text-primary">{state.message}</p>}
              {state.status === "error" && state.message && <p className="text-sm text-destructive">{state.message}</p>}
            </div>
          </form>

          <div className="space-y-10">
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="mb-1 block text-xs uppercase tracking-widest">E-Mail</span>
                <a href={`mailto:${site.email}`} className="text-foreground transition-colors hover:text-primary">{site.email}</a>
              </p>
              <p>
                <span className="mb-1 block text-xs uppercase tracking-widest">Telefon</span>
                <a href={site.phoneHref} className="text-foreground transition-colors hover:text-primary">{site.phone}</a>
              </p>
              <p>
                <span className="mb-1 block text-xs uppercase tracking-widest">Adresse</span>
                <span className="text-foreground">{site.address.street}, {site.address.zip} {site.address.city}</span>
              </p>
            </div>
            <div className="aspect-[4/3] w-full">
              <MapEmbed />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
