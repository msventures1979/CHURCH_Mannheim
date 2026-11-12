"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { submitEvent, type EventSubmissionState } from "@/app/actions/event-submission";
import { eventSubmission as c } from "@/content/eventSubmission";

const fieldCls =
  "w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none";
const labelCls = "mb-2 block text-sm tracking-wide text-muted-foreground";
const errCls = "mt-1 text-sm text-destructive";
const smallBtn =
  "text-xs uppercase tracking-widest text-primary underline-offset-4 hover:underline disabled:opacity-40 disabled:no-underline";

// Bilder im Browser verkleinern (max. 2000 px, JPEG), damit der Upload schnell und unter dem Limit bleibt.
async function shrink(file: File, maxSide = 2000, quality = 0.85): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-10">
      <legend className="mb-8 flex items-baseline gap-4 font-display text-2xl font-bold tracking-tight text-foreground">
        <span className="text-sm font-normal text-primary">{n} / 4</span>
        {title}
      </legend>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Counter({ value, max }: { value: string; max: number }) {
  return <span className={`float-right text-xs ${value.length > max ? "text-destructive" : "text-muted-foreground/60"}`}>{value.length}/{max}</span>;
}

export default function EventSubmissionForm({ accessKey }: { accessKey: string }) {
  const [state, action, pending] = useActionState<EventSubmissionState, FormData>(submitEvent, { status: "idle" });
  const [dates, setDates] = useState([{ date: "", start: "", end: "" }]);
  const [timeline, setTimeline] = useState([{ time: "", title: "" }]);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [shortText, setShortText] = useState("");
  const [longText, setLongText] = useState("");
  const [busy, setBusy] = useState(false);
  const e = state.errors ?? {};

  useEffect(() => () => images.forEach((i) => URL.revokeObjectURL(i.url)), [images]);
  useEffect(() => {
    if (state.status === "error") document.getElementById("es-status")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="border border-border bg-card p-8 md:p-12" role="status">
        <p className="font-display text-3xl font-bold text-foreground">{c.successTitle}</p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.successText}</p>
      </div>
    );
  }

  const addImages = async (files: FileList | null) => {
    if (!files) return;
    setBusy(true);
    const room = c.maxImages - images.length;
    const next = await Promise.all([...files].slice(0, room).map((f) => shrink(f)));
    setImages((prev) => [...prev, ...next.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
    setBusy(false);
  };

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        const fd = new FormData(ev.currentTarget);
        fd.delete("imagePicker");
        let files = images.map((i) => i.file);
        // Gesamtgröße unter ~3,8 MB halten, sonst stärker komprimieren
        if (files.reduce((s, f) => s + f.size, 0) > 3_800_000) files = await Promise.all(files.map((f) => shrink(f, 1600, 0.72)));
        files.forEach((f) => fd.append("images", f));
        startTransition(() => action(fd));
      }}
      className="space-y-14"
      noValidate
    >
      <input type="hidden" name="key" value={accessKey} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="es-website">Website</label>
        <input id="es-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Section n={1} title="Das Event">
        <div>
          <label htmlFor="es-title" className={labelCls}>Name des Events *</label>
          <input id="es-title" name="title" maxLength={80} placeholder="z. B. Feminine Flow" className={fieldCls} aria-invalid={!!e.title} />
          {e.title && <p className={errCls}>{e.title}</p>}
        </div>
        <div>
          <label htmlFor="es-subtitle" className={labelCls}>Untertitel / mit wem? *</label>
          <input id="es-subtitle" name="subtitle" maxLength={120} placeholder="z. B. Yoga & Brunch mit Dilan" className={fieldCls} aria-invalid={!!e.subtitle} />
          {e.subtitle && <p className={errCls}>{e.subtitle}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="es-category" className={labelCls}>Kategorie *</label>
          <select id="es-category" name="category" defaultValue="" className={fieldCls} aria-invalid={!!e.category}>
            <option value="" disabled>Bitte wählen</option>
            {c.categories.map((k) => <option key={k}>{k}</option>)}
          </select>
          {e.category && <p className={errCls}>{e.category}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="es-short" className={labelCls}>Kurzbeschreibung * <Counter value={shortText} max={200} /></label>
          <textarea id="es-short" name="shortDescription" rows={2} maxLength={200} value={shortText} onChange={(x) => setShortText(x.target.value)}
            placeholder="1–2 Sätze für die Event-Kachel auf der Website" className={`${fieldCls} resize-none`} aria-invalid={!!e.shortDescription} />
          {e.shortDescription && <p className={errCls}>{e.shortDescription}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="es-long" className={labelCls}>Ausführliche Beschreibung * <Counter value={longText} max={1500} /></label>
          <textarea id="es-long" name="longDescription" rows={7} maxLength={1500} value={longText} onChange={(x) => setLongText(x.target.value)}
            placeholder="Was erwartet die Gäste? Für wen ist das Event? Was macht es besonders?" className={`${fieldCls} resize-y`} aria-invalid={!!e.longDescription} />
          {e.longDescription && <p className={errCls}>{e.longDescription}</p>}
        </div>
      </Section>

      <Section n={2} title="Termin & Ablauf">
        <div className="md:col-span-2">
          <p className={labelCls}>Termin(e) *</p>
          <div className="space-y-4">
            {dates.map((d, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto] items-end gap-3 sm:gap-5">
                <div>
                  <label htmlFor={`es-d${i}`} className="sr-only">Datum</label>
                  <input id={`es-d${i}`} type="date" name={`dates[${i}].date`} className={fieldCls} />
                </div>
                <div>
                  <label htmlFor={`es-s${i}`} className="block text-xs text-muted-foreground">Beginn</label>
                  <input id={`es-s${i}`} type="time" name={`dates[${i}].start`} className={`${fieldCls} w-24`} />
                </div>
                <div>
                  <label htmlFor={`es-e${i}`} className="block text-xs text-muted-foreground">Ende</label>
                  <input id={`es-e${i}`} type="time" name={`dates[${i}].end`} className={`${fieldCls} w-24`} />
                </div>
              </div>
            ))}
          </div>
          {e.dates && <p className={errCls}>{e.dates}</p>}
          <button type="button" className={`${smallBtn} mt-4`} disabled={dates.length >= c.maxDates}
            onClick={() => setDates([...dates, { date: "", start: "", end: "" }])}>+ weiterer Termin</button>
        </div>
        <div className="md:col-span-2">
          <p className={labelCls}>Ablauf (optional)</p>
          <div className="space-y-3">
            {timeline.map((_, i) => (
              <div key={i} className="grid grid-cols-[6rem_1fr] gap-4">
                <input aria-label="Uhrzeit" name={`timeline[${i}].time`} maxLength={20} placeholder="17:00" className={fieldCls} />
                <input aria-label="Programmpunkt" name={`timeline[${i}].title`} maxLength={120} placeholder="Ankommen & Welcome-Drink" className={fieldCls} />
              </div>
            ))}
          </div>
          <button type="button" className={`${smallBtn} mt-4`} disabled={timeline.length >= c.maxTimeline}
            onClick={() => setTimeline([...timeline, { time: "", title: "" }])}>+ weiterer Programmpunkt</button>
        </div>
      </Section>

      <Section n={3} title="Tickets & Infos">
        <div>
          <label htmlFor="es-price" className={labelCls}>Preis pro Person *</label>
          <input id="es-price" name="price" maxLength={80} placeholder="z. B. 45 € oder kostenlos" className={fieldCls} aria-invalid={!!e.price} />
          {e.price && <p className={errCls}>{e.price}</p>}
        </div>
        <div>
          <label htmlFor="es-ticket" className={labelCls}>Ticket-Link *</label>
          <input id="es-ticket" name="ticketLink" maxLength={300} placeholder="https://… oder „Anmeldung per Mail an …“" className={fieldCls} aria-invalid={!!e.ticketLink} />
          {e.ticketLink && <p className={errCls}>{e.ticketLink}</p>}
        </div>
        <div>
          <label htmlFor="es-incl" className={labelCls}>Was ist inklusive?</label>
          <input id="es-incl" name="included" maxLength={300} placeholder="z. B. Brunch, Getränk, Material" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="es-bring" className={labelCls}>Was sollen Gäste mitbringen?</label>
          <input id="es-bring" name="bring" maxLength={300} placeholder="z. B. Yogamatte, bequeme Kleidung" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="es-max" className={labelCls}>Max. Teilnehmer</label>
          <input id="es-max" name="maxGuests" inputMode="numeric" maxLength={10} placeholder="z. B. 40" className={fieldCls} />
        </div>
      </Section>

      <Section n={4} title="Veranstalter:in & Bilder">
        <div>
          <label htmlFor="es-org" className={labelCls}>Name Veranstalter:in / Brand *</label>
          <input id="es-org" name="organizerName" maxLength={100} className={fieldCls} aria-invalid={!!e.organizerName} />
          {e.organizerName && <p className={errCls}>{e.organizerName}</p>}
        </div>
        <div>
          <label htmlFor="es-web" className={labelCls}>Website</label>
          <input id="es-web" name="organizerWebsite" maxLength={200} placeholder="https://…" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="es-ig" className={labelCls}>Instagram</label>
          <input id="es-ig" name="organizerInstagram" maxLength={100} placeholder="@deinprofil" className={fieldCls} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="es-about" className={labelCls}>Ein, zwei Sätze über dich / euch</label>
          <textarea id="es-about" name="organizerAbout" rows={2} maxLength={400} className={`${fieldCls} resize-none`} />
        </div>

        <div className="md:col-span-2">
          <p className={labelCls}>Bilder * <span className="text-muted-foreground/70">(1 bis {c.maxImages}, das erste wird das große Titelbild – am besten im Querformat)</span></p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((img, i) => (
              <div key={img.url} className="group relative aspect-[4/3] overflow-hidden bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                {i === 0 && <span className="absolute left-2 top-2 bg-foreground px-2 py-0.5 text-[10px] uppercase tracking-widest text-background">Titelbild</span>}
                <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="absolute right-2 top-2 bg-background/90 px-2 text-sm text-foreground" aria-label="Bild entfernen">×</button>
              </div>
            ))}
            {images.length < c.maxImages && (
              <label htmlFor="es-images" className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-border text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground has-[:focus-visible]:border-primary">
                <span className="text-2xl leading-none">+</span>
                {busy ? "wird geladen …" : "Bild hinzufügen"}
                <input id="es-images" name="imagePicker" type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only"
                  onChange={(x) => { addImages(x.target.files); x.target.value = ""; }} />
              </label>
            )}
          </div>
          {e.images && <p className={errCls}>{e.images}</p>}
        </div>
      </Section>

      <fieldset className="border-t border-border pt-10">
        <legend className="mb-2 font-display text-2xl font-bold tracking-tight text-foreground">Für Rückfragen</legend>
        <p className="mb-8 text-sm text-muted-foreground">Wird nicht veröffentlicht.</p>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          <div>
            <label htmlFor="es-cn" className={labelCls}>Name *</label>
            <input id="es-cn" name="contactName" maxLength={100} autoComplete="name" className={fieldCls} aria-invalid={!!e.contactName} />
            {e.contactName && <p className={errCls}>{e.contactName}</p>}
          </div>
          <div>
            <label htmlFor="es-ce" className={labelCls}>E-Mail *</label>
            <input id="es-ce" name="contactEmail" type="email" maxLength={255} autoComplete="email" className={fieldCls} aria-invalid={!!e.contactEmail} />
            {e.contactEmail && <p className={errCls}>{e.contactEmail}</p>}
          </div>
          <div>
            <label htmlFor="es-cp" className={labelCls}>Telefon *</label>
            <input id="es-cp" name="contactPhone" type="tel" maxLength={30} autoComplete="tel" className={fieldCls} aria-invalid={!!e.contactPhone} />
            {e.contactPhone && <p className={errCls}>{e.contactPhone}</p>}
          </div>
          <div className="md:col-span-3">
            <label htmlFor="es-notes" className={labelCls}>Sonst noch etwas?</label>
            <textarea id="es-notes" name="notes" rows={2} maxLength={1000} className={`${fieldCls} resize-none`} />
          </div>
        </div>
      </fieldset>

      <div className="space-y-4 border-t border-border pt-10">
        {(["consent", "rights"] as const).map((k) => (
          <div key={k}>
            <label htmlFor={`es-${k}`} className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <input id={`es-${k}`} name={k} type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9b79c]" />
              <span>{c[k]} *</span>
            </label>
            {e[k] && <p className={`${errCls} ml-7`}>{e[k]}</p>}
          </div>
        ))}
        <p className="text-xs text-muted-foreground/70">
          Mehr zum Datenschutz in unserer <a href="/datenschutz" className="underline hover:text-foreground">Datenschutzerklärung</a>.
        </p>
      </div>

      <div>
        <button type="submit" disabled={pending || busy}
          className="border border-foreground bg-foreground px-10 py-4 text-sm uppercase tracking-widest text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground disabled:opacity-50">
          {pending ? "Wird gesendet …" : c.submit}
        </button>
        <div id="es-status" aria-live="polite" className="mt-4">
          {state.status === "error" && state.message && <p className="text-sm text-destructive">{state.message}</p>}
        </div>
      </div>
    </form>
  );
}
