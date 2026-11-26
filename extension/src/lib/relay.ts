/**
 * The relay's link routes, the same ones the Garmin watch uses
 * (dulce-relay `src/routes/garmin.ts`):
 *
 *   POST /garmin/pair/start { kind }                 → { code, token, qr, ... }
 *   POST /garmin/latest     { token, code?, pid?, hours? } → status + reading
 *
 * The phone claims the code (signed, Pro only) and removes links; the
 * extension never signs anything. The token is the only secret, and it lives
 * in chrome.storage.local on this computer.
 */

export type Unit = 'mgdl' | 'mmoll';
export type Trend = 'up' | 'up_slow' | 'flat' | 'down_slow' | 'down';
export type Status = 'pending' | 'active' | 'pro_required' | 'signed_out';

export interface PairStart {
  code: string;
  token: string;
  expiresInSec: number;
  /** dulce://g/<code>: the phone camera opens Dulce on it. */
  url: string;
  /** QR modules as rows of "1" (dark) / "0" (light), no quiet zone. */
  qr: string[];
}

export interface Latest {
  status: Status;
  unit?: Unit;
  zoneLow?: number;
  zoneHigh?: number;
  lowLine?: number;
  highLine?: number;
  targetLow?: number;
  targetHigh?: number;
  pid?: string;
  /** Set when the shown person is someone the phone follows. */
  name?: string | null;
  people?: Array<{ pid: string; name: string | null }>;
  latest?: {
    valueMgdl: number;
    trend: Trend;
    timestamp: number;
    ageSec: number;
    deltaMgdl?: number;
    intervalSec?: number;
  } | null;
  /** 5-minute slots, oldest → newest; the last slot holds the latest reading; 0 = none. */
  graph?: { stepSec: number; values: number[] };
  nextSec?: number;
}

export type LatestResult =
  | { kind: 'ok'; body: Latest }
  | { kind: 'unlinked' }
  | { kind: 'error'; reason: 'network' | 'rate_limited' | 'server' };

export type PairResult = { kind: 'ok'; body: PairStart } | { kind: 'error'; reason: 'network' | 'rate_limited' | 'server' };

const TIMEOUT_MS = 15_000;

async function post(base: string, path: string, body: unknown): Promise<Response> {
  return fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

function errorOf(status: number): 'rate_limited' | 'server' {
  return status === 429 ? 'rate_limited' : 'server';
}

export async function pairStart(base: string): Promise<PairResult> {
  let res: Response;
  try {
    // 'browser' lets the phone label the link; a relay that doesn't know it
    // yet stores it as a watch app, which works the same.
    res = await post(base, '/garmin/pair/start', { kind: 'browser' });
  } catch {
    return { kind: 'error', reason: 'network' };
  }
  if (!res.ok) return { kind: 'error', reason: errorOf(res.status) };
  const j = (await res.json().catch(() => null)) as (PairStart & { ok?: boolean }) | null;
  if (!j?.ok || typeof j.code !== 'string' || typeof j.token !== 'string') return { kind: 'error', reason: 'server' };
  return { kind: 'ok', body: { code: j.code, token: j.token, expiresInSec: j.expiresInSec ?? 900, url: j.url, qr: Array.isArray(j.qr) ? j.qr : [] } };
}

export async function fetchLatest(
  base: string,
  req: { token: string; code?: string; pid?: string; hours?: number },
): Promise<LatestResult> {
  let res: Response;
  try {
    res = await post(base, '/garmin/latest', req);
  } catch {
    return { kind: 'error', reason: 'network' };
  }
  if (res.status === 401) return { kind: 'unlinked' };
  if (!res.ok) return { kind: 'error', reason: errorOf(res.status) };
  const j = (await res.json().catch(() => null)) as (Latest & { ok?: boolean }) | null;
  if (!j?.ok || typeof j.status !== 'string') return { kind: 'error', reason: 'server' };
  return { kind: 'ok', body: j };
}
