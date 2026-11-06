import "server-only";
import { Resend } from "resend";

let resend: Resend | null = null;

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  resend ??= new Resend(key);
  return resend;
}

export { escapeHtml } from "./escape";
