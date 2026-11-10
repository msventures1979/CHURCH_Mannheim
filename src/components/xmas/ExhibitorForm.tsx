"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { xmas } from "@/content/weihnachtsmarkt";

const { form, dates } = xmas;
const fieldCls =
  "w-full border-b border-[#f6efe0]/25 bg-transparent py-3 text-[#f6efe0] placeholder:text-[#f6efe0]/35 transition-colors focus:border-[#ff2e93] focus:outline-none";
const labelCls = "font-mono-x mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#e9c46a]";
const chipCls =
  "font-mono-x flex cursor-pointer items-center gap-2 border border-[#f6efe0]/25 px-4 py-2 text-sm uppercase tracking-wider text-[#f6efe0]/85 transition-colors hover:border-[#f6efe0]/60 has-[:checked]:border-[#ff2e93] has-[:checked]:bg-[#ff2e93] has-[:checked]:text-[#06100b] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#e9c46a]";

// Aussteller-Anfrage: die Zusatzfelder werden zu einer Nachricht gebündelt und über das normale Kontakt-Backend gespeichert.
export default function ExhibitorForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setStartedAt(Date.now()), []);

  if (state.status === "success") {
    return (
      <div className="border border-[#ff2e93]/60 bg-[#06100b] p-8 md:p-12" role="status">
        <p className="font-anton text-4xl uppercase text-[#f6efe0] md:text-5xl">{form.successTitle}</p>
        <p className="mt-4 text-base leading-relaxed text-[#f6efe0]/80">{form.successText}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const lines = [
          `Brand / Firma: ${fd.get("brand") || "–"}`,
          `Kategorie: ${fd.get("category") || "–"}`,
          `Website / Instagram: ${fd.get("web") || "–"}`,
          `Mögliche Termine: ${fd.getAll("dates").join(", ") || "–"}`,
        ];
        const about = String(fd.get("about") || "").trim();
        fd.set("message", `${lines.join("\n")}${about ? `\n\nAngebot:\n${about}` : ""}`);
        startTransition(() => action(fd));
      }}
      className="relative grid grid-cols-1 gap-7 border border-[#f6efe0]/15 bg-[#06100b]/80 p-6 backdrop-blur-sm md:grid-cols-2 md:p-10"
      noValidate
    >
      <input type="hidden" name="t" value={startedAt} />
      <input type="hidden" name="interest" value="Weihnachtsmarkt-Aussteller" />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="xm-website">Website</label>
        <input id="xm-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="xm-brand" className={labelCls}>Brand / Firma *</label>
        <input id="xm-brand" name="brand" required maxLength={100} className={fieldCls} />
      </div>
      <div>
        <label htmlFor="xm-category" className={labelCls}>Kategorie</label>
        <select id="xm-category" name="category" defaultValue="" className={`${fieldCls} [&>option]:bg-[#06100b]`}>
          <option value="" disabled>Bitte wählen</option>
          {form.categoryOptions.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="xm-name" className={labelCls}>Ansprechpartner:in *</label>
        <input id="xm-name" name="name" required maxLength={100} autoComplete="name" className={fieldCls}
          aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "xm-err-name" : undefined} />
        {state.errors?.name && <p id="xm-err-name" className="mt-1 text-sm text-[#f2a3a3]">{state.errors.name}</p>}
      </div>
      <div>
        <label htmlFor="xm-email" className={labelCls}>E-Mail *</label>
        <input id="xm-email" name="email" type="email" required maxLength={255} autoComplete="email" className={fieldCls}
          aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "xm-err-email" : undefined} />
        {state.errors?.email && <p id="xm-err-email" className="mt-1 text-sm text-[#f2a3a3]">{state.errors.email}</p>}
      </div>
      <div>
        <label htmlFor="xm-phone" className={labelCls}>Telefon</label>
        <input id="xm-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className={fieldCls} />
      </div>
      <div>
        <label htmlFor="xm-web" className={labelCls}>Website oder Instagram</label>
        <input id="xm-web" name="web" maxLength={150} placeholder="@deinlabel" className={fieldCls} />
      </div>

      <fieldset className="md:col-span-2">
        <legend className={labelCls}>An welchen Tagen könntest du dabei sein?</legend>
        <div className="mt-1 flex flex-wrap gap-3">
          {dates.options.map((d) => (
            <label key={d} className={chipCls}>
              <input type="checkbox" name="dates" value={d} className="sr-only" />
              {d}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="md:col-span-2">
        <label htmlFor="xm-about" className={labelCls}>Was bringst du mit?</label>
        <textarea id="xm-about" name="about" rows={4} maxLength={1400}
          placeholder="Deine Produkte, dein Food-Konzept oder deine DIY-Idee – gern auch Preisrange und Standgröße"
          className={`${fieldCls} resize-none`} />
      </div>

      <p className="text-xs leading-relaxed text-[#f6efe0]/60 md:col-span-2">
        Wir verwenden deine Angaben nur für die Organisation des Weihnachtsmarkts. Details in der{" "}
        <a href="/datenschutz" className="underline hover:text-[#e9c46a]">Datenschutzerklärung</a>.
      </p>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="xh-cta w-full disabled:opacity-50 md:w-auto md:min-w-[320px]"
        >
          {pending ? "Wird gesendet …" : form.submit} <span aria-hidden>→</span>
        </button>
        <div aria-live="polite" className="mt-3">
          {state.status === "error" && state.message && <p className="text-sm text-[#f2a3a3]">{state.message}</p>}
        </div>
      </div>
    </form>
  );
}
