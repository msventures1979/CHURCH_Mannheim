"use server";

import { z } from "zod";
import { newsletter } from "@/content/newsletter";
import { confirmNewsletterSubscription, startNewsletterSubscription } from "@/lib/newsletter";
import { getRequestMeta } from "@/lib/request-meta";

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string };

const MIN_FILL_MS = 2000;

export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  // Spamschutz: Honeypot + Mindestzeit. Bots bekommen eine Erfolgsmeldung.
  const startedAt = Number(formData.get("t"));
  if (formData.get("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success", message: newsletter.success };
  }
  const email = z.string().trim().max(255).email().safeParse(formData.get("email") ?? "");
  if (!email.success) return { status: "error", message: newsletter.invalid };

  const source = String(formData.get("source") ?? "website").slice(0, 40);
  const { ipHash, userAgent } = await getRequestMeta();
  const result = await startNewsletterSubscription({ email: email.data, source, ipHash, userAgent });

  if (result === "rate_limited") return { status: "error", message: newsletter.tooMany };
  if (result === "error") return { status: "error", message: newsletter.error };
  return { status: "success", message: newsletter.success };
}

export type ConfirmState = { status: "idle" | "confirmed" | "invalid" };

export async function confirmNewsletter(_prev: ConfirmState, formData: FormData): Promise<ConfirmState> {
  const token = String(formData.get("token") ?? "");
  const { ipHash } = await getRequestMeta();
  return (await confirmNewsletterSubscription(token, ipHash)) ? { status: "confirmed" } : { status: "invalid" };
}
