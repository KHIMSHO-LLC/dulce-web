import { createHash } from "node:crypto";
import { env } from "@/lib/env";

/**
 * SHA-256 hash of an IP address with a per-day rotating salt.
 * Used for rate limiting without storing raw IPs (GDPR-friendlier).
 */
export function hashIp(ip: string): string {
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256")
    .update(`${ip}:${day}:${env.ratelimit.salt()}`)
    .digest("hex");
}
