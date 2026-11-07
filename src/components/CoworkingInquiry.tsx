"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { coworkingPage } from "@/content/coworking";
import { newsletter } from "@/content/newsletter";

const fieldCls =
  "w-full border-b border-border bg-transparent py-3 text-foreground transition-colors focus:border-primary focus:outline-none";
const labelCls = "mb-2 block text-sm tracking-wide text-muted-foreground";
const { form } = coworkingPage;

// Anfrageformular für die Seite „Coworking Mannheim“ – nutzt dieselbe Server-Logik wie das Kontaktformular.
export default function CoworkingInquiry() {
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

  if (state.status === "success") {
    return (
      <div className="border border-border bg-card p-8 md:p-10" role="status">
        <p className="font-display text-2xl font-bold text-foreground">{form.successTitle}</p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{form.successText}</p>
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
      <input type="hidden" name="interest" value="Coworking-Platz" />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cw-website">Website</label>
        <input id="cw-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="cw-name" className={labelCls}>Name *</label>
        <input id="cw-name" name="name" required maxLength={100} autoComplete="name" className={fieldCls}
          aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "cw-err-name" : undefined} />
        {state.errors?.name && <p id="cw-err-name" className="mt-1 text-sm text-destructive">{state.errors.name}</p>}
      </div>
      <div>
        <label htmlFor="cw-email" className={labelCls}>E-Mail *</label>
        <input id="cw-email" name="email" type="email" required maxLength={255} autoComplete="email" className={fieldCls}
          aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "cw-err-email" : undefined} />
        {state.errors?.email && <p id="cw-err-email" className="mt-1 text-sm text-destructive">{state.errors.email}</p>}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cw-phone" className={labelCls}>Telefon (für Rückfragen)</label>
        <input id="cw-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className={fieldCls} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cw-message" className={labelCls}>{form.messageLabel}</label>
        <textarea id="cw-message" name="message" rows={4} maxLength={1800} placeholder={form.messagePlaceholder}
          className={`${fieldCls} resize-none placeholder:text-muted-foreground/60`} />
      </div>

      <label htmlFor="cw-newsletter" className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground md:col-span-2">
        <input id="cw-newsletter" name="newsletter" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9b79c]" />
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
          {pending ? "Wird gesendet …" : form.submit}
        </button>
        <div aria-live="polite" className="mt-3">
          {state.status === "error" && state.message && <p className="text-sm text-destructive">{state.message}</p>}
        </div>
      </div>
    </form>
  );
}
