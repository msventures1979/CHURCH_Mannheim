"use client";

import Link from "next/link";
import { useActionState } from "react";
import { confirmNewsletter, type ConfirmState } from "@/app/actions/newsletter";
import { buttonCls } from "@/components/ButtonLink";
import { newsletter } from "@/content/newsletter";

// Bestätigung per Klick (nicht schon beim Öffnen des Links), damit Link-Scanner von Mailprogrammen nichts auslösen.
export default function ConfirmForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<ConfirmState, FormData>(confirmNewsletter, { status: "idle" });

  if (state.status === "confirmed") {
    return (
      <>
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{newsletter.confirmedTitle}</h1>
        <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">{newsletter.confirmedText}</p>
        <Link href="/events" className={buttonCls}>Aktuelle Events</Link>
      </>
    );
  }
  if (state.status === "invalid") {
    return (
      <>
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{newsletter.invalidLinkTitle}</h1>
        <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">{newsletter.invalidLinkText}</p>
        <Link href="/#newsletter" className={buttonCls}>Zur Anmeldung</Link>
      </>
    );
  }
  return (
    <>
      <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{newsletter.confirmTitle}</h1>
      <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">{newsletter.confirmText}</p>
      <form action={action}>
        <input type="hidden" name="token" value={token} />
        <button type="submit" disabled={pending} className={`${buttonCls} disabled:opacity-40`}>
          {pending ? "Wird bestätigt …" : newsletter.confirmButton}
        </button>
      </form>
    </>
  );
}
