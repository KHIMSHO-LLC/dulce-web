import { describe, expect, it } from 'vitest';
import { COLORS, badgeOf, formatDelta, formatValue, oldAfterMs, viewOf, zoneOf } from '../src/lib/display';
import type { Stored } from '../src/lib/display';
import type { Latest } from '../src/lib/relay';

const MIN = 60_000;
const NOW = 1_800_000_000_000;

function active(latest: Partial<NonNullable<Latest['latest']>> = {}, extra: Partial<Latest> = {}): Latest {
  return {
    status: 'active',
    unit: 'mgdl',
    zoneLow: 70,
    zoneHigh: 180,
    latest: { valueMgdl: 123, trend: 'flat', timestamp: 0, ageSec: 60, intervalSec: 60, ...latest },
    ...extra,
  };
}

describe('values', () => {
  it('mg/dL is a whole number', () => {
    expect(formatValue(123.4, 'mgdl', 'en')).toBe('123');
  });
  it('mmol/L divides by 18 with one decimal and the locale separator', () => {
    expect(formatValue(101, 'mmoll', 'en')).toBe('5.6');
    expect(formatValue(101, 'mmoll', 'de')).toBe('5,6');
    expect(formatValue(184, 'mmoll', 'en')).toBe('10.2');
  });
  it('deltas', () => {
    expect(formatDelta(11, 'mgdl', 'en')).toBe('+11');
    expect(formatDelta(-3, 'mgdl', 'en')).toBe('−3');
    expect(formatDelta(0.2, 'mgdl', 'en')).toBe('±0');
    expect(formatDelta(11, 'mmoll', 'en')).toBe('+0.6');
    expect(formatDelta(-4, 'mmoll', 'fr')).toBe('−0,2');
    expect(formatDelta(0.5, 'mmoll', 'en')).toBe('±0');
  });
});

describe('zones', () => {
  it('fixed 70 / 180: below 70 low, above 180 high', () => {
    expect(zoneOf(69)).toBe('low');
    expect(zoneOf(70)).toBe('range');
    expect(zoneOf(180)).toBe('range');
    expect(zoneOf(181)).toBe('high');
  });
});

describe('old readings', () => {
  it('2 × interval + 4 min, like the app; 15 min without an interval', () => {
    expect(oldAfterMs(60)).toBe(6 * MIN);
    expect(oldAfterMs(300)).toBe(14 * MIN);
    expect(oldAfterMs(undefined)).toBe(15 * MIN);
  });
});

describe('viewOf', () => {
  it('no token: unlinked', () => {
    expect(viewOf({}, NOW).kind).toBe('unlinked');
  });

  it('a shown code, then expired', () => {
    const s: Stored = { token: 't', pending: { code: 'ABCDEF', qr: [], url: '', expiresAt: NOW + MIN } };
    expect(viewOf(s, NOW)).toMatchObject({ kind: 'pending', expired: false });
    expect(viewOf(s, NOW + 2 * MIN)).toMatchObject({ kind: 'pending', expired: true });
  });

  it('a reading: age from the fetch time, not the computer clock vs the sensor', () => {
    const s: Stored = { token: 't', last: { fetchedAt: NOW - 2 * MIN, body: active({ ageSec: 60 }) } };
    const v = viewOf(s, NOW);
    expect(v).toMatchObject({ kind: 'reading', valueMgdl: 123, zone: 'range', old: false, offline: false });
    if (v.kind === 'reading') expect(v.ageMs).toBe(3 * MIN);
  });

  it('goes old (grey) past the threshold', () => {
    const s: Stored = { token: 't', last: { fetchedAt: NOW - 6 * MIN, body: active({ ageSec: 60 }) } };
    expect(viewOf(s, NOW)).toMatchObject({ kind: 'reading', old: true });
  });

  it('offline when the last fetch failed after the last good one', () => {
    const s: Stored = {
      token: 't',
      last: { fetchedAt: NOW - 2 * MIN, body: active() },
      lastError: { at: NOW - MIN, reason: 'network' },
    };
    expect(viewOf(s, NOW)).toMatchObject({ kind: 'reading', offline: true });
  });

  it('Pro ended, signed out, no reading yet', () => {
    const base = { token: 't' };
    expect(viewOf({ ...base, last: { fetchedAt: NOW, body: { status: 'pro_required' } } }, NOW).kind).toBe('pro_required');
    expect(viewOf({ ...base, last: { fetchedAt: NOW, body: { status: 'signed_out' } } }, NOW).kind).toBe('signed_out');
    expect(viewOf({ ...base, last: { fetchedAt: NOW, body: { status: 'active', latest: null } } }, NOW).kind).toBe('waiting');
  });

  it('once linked, an old pending code no longer shows', () => {
    const s: Stored = {
      token: 't',
      pending: { code: 'ABCDEF', qr: [], url: '', expiresAt: NOW + MIN },
      last: { fetchedAt: NOW, body: active() },
    };
    expect(viewOf(s, NOW).kind).toBe('reading');
  });
});

describe('badge', () => {
  const reading = (valueMgdl: number, unit: 'mgdl' | 'mmoll' = 'mgdl', fetchedAgoMin = 0) =>
    viewOf({ token: 't', last: { fetchedAt: NOW - fetchedAgoMin * MIN, body: active({ valueMgdl, ageSec: 0 }, { unit }) } }, NOW);

  it('value and zone colour', () => {
    expect(badgeOf(reading(123), 'en')).toMatchObject({ text: '123', color: COLORS.range });
    expect(badgeOf(reading(60), 'en')).toMatchObject({ text: '60', color: COLORS.low });
    expect(badgeOf(reading(250), 'en')).toMatchObject({ text: '250', color: COLORS.high });
  });
  it('mmol/L fits (4 characters at most)', () => {
    expect(badgeOf(reading(184, 'mmoll'), 'en').text).toBe('10.2');
    expect(badgeOf(reading(400, 'mmoll'), 'en').text.length).toBeLessThanOrEqual(4);
  });
  it('grey when old', () => {
    expect(badgeOf(reading(123, 'mgdl', 30), 'en').color).toBe(COLORS.old);
  });
  it('empty without a reading', () => {
    expect(badgeOf({ kind: 'unlinked' }, 'en').text).toBe('');
  });
});
