import "server-only";
import { headers } from "next/headers";

/**
 * Best-effort client IP extraction. Vercel sets x-forwarded-for; fall back to
 * x-real-ip and finally a sentinel that still produces a usable rate-limit key.
 */
export async function getRequestIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]!.trim();
  }
  const real = h.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
