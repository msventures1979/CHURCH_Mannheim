"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { rental } from "@/content/rental";
import { newsletter } from "@/content/newsletter";

const fieldCls =
  "w-full border-b border-border bg-transparent py-3 text-foreground transition-colors focus:border-primary focus:outline-none";
const labelCls = "mb-2 block text-sm tracking-wide text-muted-foreground";

// Anfrageformular für die Seite „Eventlocation mieten“ – nutzt dieselbe Server-Logik wie das Kontaktformular.
export default function EventInquiry() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const [startedAt, setStartedAt] = useState(0);
  const [today, setToday] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setStartedAt(Date.now());
    setToday(new Date().toISOString().slice(0, 10));
  }, []);
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setStartedAt(Date.now());
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="border border-border bg-card p-8 md:p-10" role="status">
        <p className="font-display text-2xl font-bold text-foreground">{rental.form.successTitle}</p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{rental.form.successText}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      noValidate
    >
      <input type="hidden" name="t" value={startedAt} />
      <input type="hidden" name="interest" value="Eventfläche mieten" />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ev-website">Website</label>
        <input id="ev-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="ev-type" className={labelCls}>Art der Veranstaltung</label>
        <select id="ev-type" name="eventType" className={`${fieldCls} appearance-none bg-background`} defaultValue="">
          <option value="" disabled>Bitte wählen</option>
          {rental.form.eventTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="ev-guests" className={labelCls}>Anzahl Gäste (ca.)</label>
        <input id="ev-guests" name="guests" type="number" inputMode="numeric" min={1} max={999} className={fieldCls} />
      </div>
      <div>
        <label htmlFor="ev-date" className={labelCls}>Wunschtermin</label>
        <input id="ev-date" name="eventDate" type="date" min={today || undefined} className={`${fieldCls} [color-scheme:dark]`} />
      </div>
      <div>
        <label htmlFor="ev-time" className={labelCls}>Zeitraum</label>
        <select id="ev-time" name="timeOfDay" className={`${fieldCls} appearance-none bg-background`} defaultValue="">
          <option value="" disabled>Bitte wählen</option>
          {rental.form.timeSlots.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ev-name" className={labelCls}>Name *</label>
        <input id="ev-name" name="name" required maxLength={100} autoComplete="name" className={fieldCls}
          aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "ev-err-name" : undefined} />
        {state.errors?.name && <p id="ev-err-name" className="mt-1 text-sm text-destructive">{state.errors.name}</p>}
      </div>
      <div>
        <label htmlFor="ev-email" className={labelCls}>E-Mail *</label>
        <input id="ev-email" name="email" type="email" required maxLength={255} autoComplete="email" className={fieldCls}
          aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "ev-err-email" : undefined} />
        {state.errors?.email && <p id="ev-err-email" className="mt-1 text-sm text-destructive">{state.errors.email}</p>}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="ev-phone" className={labelCls}>Telefon (für Rückfragen)</label>
        <input id="ev-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className={fieldCls} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="ev-message" className={labelCls}>Was habt ihr vor?</label>
        <textarea id="ev-message" name="message" rows={4} maxLength={1800} placeholder={rental.form.messagePlaceholder}
          className={`${fieldCls} resize-none placeholder:text-muted-foreground/60`} />
      </div>

      <label htmlFor="ev-newsletter" className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground md:col-span-2">
        <input id="ev-newsletter" name="newsletter" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9b79c]" />
        <span>{newsletter.contactCheckbox}</span>
      </label>

      <p className="text-xs leading-relaxed text-muted-foreground md:col-span-2">
        Wir verwenden deine Angaben nur, um deine Anfrage zu beantworten. Details in der{" "}
        <a href="/datenschutz" className="underline hover:text-foreground">Datenschutzerklärung</a>.
      </p>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="border border-foreground bg-foreground px-8 py-3 text-sm uppercase tracking-widest text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Wird gesendet …" : rental.form.submit}
        </button>
        <div aria-live="polite" className="mt-3">
          {state.status === "error" && state.message && <p className="text-sm text-destructive">{state.message}</p>}
        </div>
      </div>
    </form>
  );
}
