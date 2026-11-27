/**
 * What a relay answer changes in storage. Pure (test/sync.test.ts); the
 * background worker does the I/O.
 */

import type { Stored } from './display';
import type { LatestResult, PairResult } from './relay';

/** Longest wait between asks while signed out / without Pro (relay says 30 min). */
const MAX_IDLE_WAIT_MS = 5 * 60_000;

export type Change = { clear: true } | { clear?: false; patch: Partial<Stored> };

/** The request for /garmin/latest, or null when there is nothing to ask. */
export function latestRequest(s: Stored, now: number, withGraph: boolean) {
  if (!s.token) return null;
  const code = s.pending && now < s.pending.expiresAt ? s.pending.code : undefined;
  return {
    token: s.token,
    ...(code ? { code } : {}),
    ...(s.pid ? { pid: s.pid } : {}),
    ...(withGraph ? { hours: s.hours ?? 3 } : {}),
  };
}

/** Should the minute alarm ask the relay now? Active links: every minute (so a
 *  removal shows within a minute); signed out / no Pro: as the relay asks. */
export function shouldAsk(s: Stored, now: number): boolean {
  if (!s.token) return false;
  return s.nextAt == null || now >= s.nextAt;
}

export function applyLatest(s: Stored, r: LatestResult, now: number): Change {
  if (r.kind === 'unlinked') {
    // Removed on the phone, or the code ran out before anyone claimed it.
    return { clear: true };
  }
  if (r.kind === 'error') return { patch: { lastError: { at: now, reason: r.reason } } };

  const { graph, ...body } = r.body;
  if (body.status === 'pending') return { patch: { lastError: null, nextAt: undefined } };

  const patch: Partial<Stored> = {
    last: { fetchedAt: now, body },
    lastError: null,
    pending: undefined,
    nextAt: body.status === 'active' ? undefined : now + Math.min((body.nextSec ?? 300) * 1000, MAX_IDLE_WAIT_MS),
  };
  if (graph && body.latest) {
    const endAt = now - body.latest.ageSec * 1000;
    patch.graph = { values: graph.values, stepSec: graph.stepSec, endAt, hours: s.hours ?? 3 };
  } else if (!body.latest) {
    patch.graph = undefined;
  }
  // A picked person who is no longer there (unfollowed): back to the default.
  if (s.pid && body.pid && s.pid !== body.pid && !body.people?.some((p) => p.pid === s.pid)) patch.pid = undefined;
  return { patch };
}

export function applyPair(r: PairResult, now: number): Change | null {
  if (r.kind !== 'ok') return null;
  const { code, token, expiresInSec, qr, url } = r.body;
  return {
    patch: {
      token,
      pending: { code, qr, url, expiresAt: now + expiresInSec * 1000 },
      last: undefined,
      graph: undefined,
      lastError: null,
      nextAt: undefined,
    },
  };
}
