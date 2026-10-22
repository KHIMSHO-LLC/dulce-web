/**
 * Live LibreLinkUp status, measured by the Dulce relay (dulce-relay
 * src/lib/lluStatus.ts → GET /llu-status). Read server-side and cached for a
 * minute; any failure renders as "unknown" rather than a guess.
 */
import { RELAY_URL } from "@/lib/relay";

export type LluState = "operational" | "degraded" | "down" | "unknown";

export type LluStatus = {
  state: LluState;
  failureRate: number | null;
  avgLatencyMs: number | null;
  calls: number;
  checkedAt: number | null;
  timeline: Array<{ start: number; state: LluState; failureRate: number | null; calls: number }>;
  affectedRegions: string[];
  lastIncidentAt: number | null;
};

/** null when the relay can't be reached or answers with something unexpected. */
export async function fetchLluStatus(): Promise<LluStatus | null> {
  try {
    const res = await fetch(`${RELAY_URL}/llu-status`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as Partial<LluStatus> & { ok?: boolean };
    if (!body.ok || !body.state || !Array.isArray(body.timeline)) return null;
    return body as LluStatus;
  } catch {
    return null;
  }
}

/** "14:05" in UTC (no runtime locale data, so server and client agree). */
export function utcTime(epochMs: number): string {
  const d = new Date(epochMs);
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}
