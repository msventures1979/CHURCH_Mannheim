import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

// Verkürzter, nicht rückrechenbarer Prüfwert der IP-Adresse (Spamschutz) und Browserkennung
export async function getRequestMeta() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const ipHash = createHash("sha256")
    .update(`${ip}:${process.env.SUPABASE_SERVICE_ROLE_KEY ?? "church"}`)
    .digest("hex")
    .slice(0, 32);
  const userAgent = (h.get("user-agent") ?? "").slice(0, 300);
  return { ipHash, userAgent };
}
