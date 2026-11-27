import { describe, expect, it } from 'vitest';
import type { Stored } from '../src/lib/display';
import { applyLatest, applyPair, latestRequest, shouldAsk } from '../src/lib/sync';

const MIN = 60_000;
const NOW = 1_800_000_000_000;

describe('latestRequest', () => {
  it('nothing to ask without a token', () => {
    expect(latestRequest({}, NOW, false)).toBeNull();
  });
  it('sends the code only while it is valid, the graph only when asked', () => {
    const s: Stored = { token: 'tok', pending: { code: 'ABCDEF', qr: [], url: '', expiresAt: NOW + MIN }, hours: 6 };
    expect(latestRequest(s, NOW, true)).toEqual({ token: 'tok', code: 'ABCDEF', hours: 6 });
    expect(latestRequest(s, NOW + 2 * MIN, false)).toEqual({ token: 'tok' });
  });
  it('sends the picked person', () => {
    expect(latestRequest({ token: 'tok', pid: 'p1' }, NOW, false)).toEqual({ token: 'tok', pid: 'p1' });
  });
});

describe('applyLatest', () => {
  it('unlinked (removed on the phone): forget everything', () => {
    expect(applyLatest({ token: 'tok' }, { kind: 'unlinked' }, NOW)).toEqual({ clear: true });
  });

  it('errors keep the last reading and note the failure', () => {
    expect(applyLatest({ token: 'tok' }, { kind: 'error', reason: 'network' }, NOW)).toEqual({
      patch: { lastError: { at: NOW, reason: 'network' } },
    });
  });

  it('pending keeps the code', () => {
    const c = applyLatest({ token: 'tok' }, { kind: 'ok', body: { status: 'pending' } }, NOW);
    expect(c).toEqual({ patch: { lastError: null, nextAt: undefined } });
  });

  it('active: stores the answer, drops the code, keeps the graph apart', () => {
    const c = applyLatest(
      { token: 'tok', hours: 3 },
      {
        kind: 'ok',
        body: {
          status: 'active',
          latest: { valueMgdl: 120, trend: 'flat', timestamp: 0, ageSec: 120 },
          graph: { stepSec: 300, values: [0, 110, 120] },
        },
      },
      NOW,
    );
    expect(c.clear).toBeFalsy();
    if (c.clear) return;
    expect(c.patch.pending).toBeUndefined();
    expect('pending' in c.patch).toBe(true);
    expect(c.patch.last?.body).not.toHaveProperty('graph');
    expect(c.patch.graph).toEqual({ values: [0, 110, 120], stepSec: 300, endAt: NOW - 2 * MIN, hours: 3 });
    expect(c.patch.nextAt).toBeUndefined();
  });

  it('without a graph in the answer, the stored chart is kept', () => {
    const c = applyLatest(
      { token: 'tok' },
      { kind: 'ok', body: { status: 'active', latest: { valueMgdl: 120, trend: 'flat', timestamp: 0, ageSec: 0 } } },
      NOW,
    );
    if (c.clear) throw new Error('unexpected');
    expect('graph' in c.patch).toBe(false);
  });

  it('signed out / no Pro: ask again in at most 5 min', () => {
    const c = applyLatest({ token: 'tok' }, { kind: 'ok', body: { status: 'signed_out', nextSec: 1800 } }, NOW);
    if (c.clear) throw new Error('unexpected');
    expect(c.patch.nextAt).toBe(NOW + 5 * MIN);
    expect(shouldAsk({ token: 'tok', nextAt: NOW + 5 * MIN }, NOW + MIN)).toBe(false);
    expect(shouldAsk({ token: 'tok', nextAt: NOW + 5 * MIN }, NOW + 5 * MIN)).toBe(true);
  });

  it('a picked person who is gone falls back to the default', () => {
    const c = applyLatest(
      { token: 'tok', pid: 'gone' },
      { kind: 'ok', body: { status: 'active', pid: 'me', people: [{ pid: 'me', name: null }], latest: null } },
      NOW,
    );
    if (c.clear) throw new Error('unexpected');
    expect('pid' in c.patch && c.patch.pid === undefined).toBe(true);
  });
});

describe('applyPair', () => {
  it('stores the token and the code with its expiry; drops old data', () => {
    const c = applyPair({ kind: 'ok', body: { code: 'ABCDEF', token: 'tok', expiresInSec: 900, url: 'dulce://g/ABCDEF', qr: ['10'] } }, NOW);
    expect(c).toEqual({
      patch: {
        token: 'tok',
        pending: { code: 'ABCDEF', qr: ['10'], url: 'dulce://g/ABCDEF', expiresAt: NOW + 15 * MIN },
        last: undefined,
        graph: undefined,
        lastError: null,
        nextAt: undefined,
      },
    });
  });
  it('a failed request changes nothing', () => {
    expect(applyPair({ kind: 'error', reason: 'network' }, NOW)).toBeNull();
  });
});
