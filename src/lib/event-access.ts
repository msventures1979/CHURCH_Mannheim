import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

// Zugang zum Einreichungsformular nur mit geheimem Link. Im Code steht nur der Hash,
// der eigentliche Schlüssel steckt im Link, den Matthias nach der Buchung verschickt.
const KEY_HASH = "789506923950f66d268c693ebc636dd691990f6e5299175ff9dfa28691f6a85b";

export function isValidEventKey(key: unknown): boolean {
  if (typeof key !== "string" || key.length < 8 || key.length > 64) return false;
  const a = Buffer.from(createHash("sha256").update(key).digest("hex"));
  const b = Buffer.from(KEY_HASH);
  return a.length === b.length && timingSafeEqual(a, b);
}
