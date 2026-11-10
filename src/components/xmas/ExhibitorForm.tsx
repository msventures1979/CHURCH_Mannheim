"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { xmas } from "@/content/weihnachtsmarkt";

const { form, dates } = xmas;
const fieldCls =
  "w-full border-b border-[#d9c38a]/40 bg-transparent py-3 text-[#f6efe0] placeholder:text-[#f6efe0]/40 transition-colors focus:border-[#d9c38a] focus:outline-none";
const labelCls = "mb-2 block text-sm tracking-wide text-[#f6efe0]/70";
const chipCls =
  "flex cursor-pointer items-center gap-2 rounded-full border border-[#d9c38a]/40 px-4 py-2 text-sm text-[#f6efe0]/85 transition-colors has-[:checked]:border-[#d9c38a] has-[:checked]:bg-[#d9c38a] has-[:checked]:text-[#14291d]";

// Aussteller-Anfrage: die Zusatzfelder werden zu einer Nachricht gebündelt und über das normale Kontakt-Backend gespeichert.
export default function ExhibitorForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setStartedAt(Date.now()), []);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-[#d9c38a]/50 bg-[#0d2016]/70 p-8 text-center md:p-12" role="status">
        <p className="font-xmas text-4xl italic text-[#d9c38a]">{form.successTitle}</p>
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
          `Bedarf am Stand: ${fd.getAll("needs").join(", ") || "–"}`,
        ];
        const about = String(fd.get("about") || "").trim();
        fd.set("message", `${lines.join("\n")}${about ? `\n\nAngebot:\n${about}` : ""}`);
        startTransition(() => action(fd));
      }}
      className="grid grid-cols-1 gap-7 rounded-2xl border border-[#d9c38a]/30 bg-[#0d2016]/70 p-6 backdrop-blur-sm md:grid-cols-2 md:p-10"
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
        <select id="xm-category" name="category" defaultValue="" className={`${fieldCls} [&>option]:bg-[#14291d]`}>
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

      <fieldset className="md:col-span-2">
        <legend className={labelCls}>Was brauchst du am Stand?</legend>
        <div className="mt-1 flex flex-wrap gap-3">
          {form.needsOptions.map((n) => (
            <label key={n} className={chipCls}>
              <input type="checkbox" name="needs" value={n} className="sr-only" />
              {n}
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
        <a href="/datenschutz" className="underline hover:text-[#d9c38a]">Datenschutzerklärung</a>.
      </p>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[#b3261e] px-10 py-4 text-sm uppercase tracking-[0.2em] text-[#f6efe0] shadow-[0_0_30px_rgba(179,38,30,0.45)] transition hover:bg-[#c9352c] disabled:opacity-50"
        >
          {pending ? "Wird gesendet …" : form.submit}
        </button>
        <div aria-live="polite" className="mt-3">
          {state.status === "error" && state.message && <p className="text-sm text-[#f2a3a3]">{state.message}</p>}
        </div>
      </div>
    </form>
  );
}
