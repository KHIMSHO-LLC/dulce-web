/**
 * What to show, worked out from what is stored. Pure functions only, so the
 * badge, the tooltip and the popup all say the same thing and the rules are
 * unit-tested (test/display.test.ts).
 */

import type { Latest, Trend, Unit } from './relay';

/** Fixed zones, like the phone, Apple Watch, Wear OS and Garmin. The relay
 *  sends them (zoneLow / zoneHigh); these are the fallback. */
export const ZONE_LOW = 70;
export const ZONE_HIGH = 180;

export type Zone = 'low' | 'range' | 'high';

export const COLORS = {
  low: '#e8262b',
  range: '#66c45b',
  high: '#f5a524',
  old: '#8a8580',
} as const;

/** Badge text colour that stays readable on each badge colour. */
export const BADGE_TEXT = {
  low: '#ffffff',
  range: '#10210d',
  high: '#2a1a00',
  old: '#ffffff',
} as const;

export const TREND_ARROWS: Record<Trend, string> = {
  up: '↑',
  up_slow: '↗',
  flat: '→',
  down_slow: '↘',
  down: '↓',
};

export interface Stored {
  /** Secret link token. Only on this computer (chrome.storage.local). */
  token?: string;
  /** The code shown while waiting for the phone to claim it. */
  pending?: { code: string; expiresAt: number; qr: string[]; url: string };
  /** The last good answer from the relay, with the local time it arrived
   *  (without `graph`: that is kept apart, below). */
  last?: { fetchedAt: number; body: Latest };
  /** The last chart, fetched only while the popup is open. `endAt` = local
   *  time of its newest slot. Kept across the background's cheaper fetches. */
  graph?: { values: number[]; stepSec: number; endAt: number; hours: number };
  /** The last failed fetch (newer than `last` = we're showing old data). */
  lastError?: { at: number; reason: string } | null;
  /** The person picked in the popup (followers can see several). */
  pid?: string;
  /** Chart length picked in the popup. */
  hours?: 3 | 6 | 12;
  /** Don't ask the relay before this (only for non-active states). */
  nextAt?: number;
}

export type View =
  | { kind: 'unlinked' }
  | { kind: 'pending'; code: string; qr: string[]; expiresAt: number; expired: boolean }
  | { kind: 'pro_required' }
  | { kind: 'signed_out' }
  | { kind: 'waiting'; offline: boolean }
  | {
      kind: 'reading';
      valueMgdl: number;
      unit: Unit;
      trend: Trend;
      deltaMgdl: number | null;
      /** Local time of the reading (fetch time − age, so the computer's clock doesn't matter). */
      readingAt: number;
      ageMs: number;
      old: boolean;
      zone: Zone;
      offline: boolean;
    };

/** Grey after 2 × the sensor's interval + 4 min, like the app's Home card and
 *  widgets (CgmCadence); 15 min when the relay doesn't say the interval. */
export function oldAfterMs(intervalSec: number | undefined): number {
  if (!intervalSec || intervalSec <= 0) return 15 * 60_000;
  return 2 * intervalSec * 1000 + 4 * 60_000;
}

export function zoneOf(mgdl: number, low = ZONE_LOW, high = ZONE_HIGH): Zone {
  if (mgdl < low) return 'low';
  if (mgdl > high) return 'high';
  return 'range';
}

function decimalSeparator(locale: string): string {
  try {
    return new Intl.NumberFormat(locale).formatToParts(1.5).find((p) => p.type === 'decimal')?.value ?? '.';
  } catch {
    return '.';
  }
}

/** "123" in mg/dL; "5.6" / "5,6" in mmol/L (÷ 18, one decimal, like the app). */
export function formatValue(mgdl: number, unit: Unit, locale: string): string {
  if (unit === 'mmoll') {
    const fixed = (mgdl / 18).toFixed(1);
    const sep = decimalSeparator(locale);
    return sep === '.' ? fixed : fixed.replace('.', sep);
  }
  return String(Math.round(mgdl));
}

/** "+11" / "−3" / "±0"; "+0.6" / "−0.2" in mmol/L (like the app's formatDelta). */
export function formatDelta(deltaMgdl: number, unit: Unit, locale: string): string {
  const v = unit === 'mmoll' ? deltaMgdl / 18 : deltaMgdl;
  if (Math.abs(v) < (unit === 'mmoll' ? 0.05 : 0.5)) return '±0';
  const sign = v > 0 ? '+' : '−';
  return sign + formatValue(Math.abs(deltaMgdl), unit, locale);
}

export function unitLabel(unit: Unit): string {
  return unit === 'mmoll' ? 'mmol/L' : 'mg/dL';
}

export function viewOf(s: Stored, now: number): View {
  if (!s.token) return { kind: 'unlinked' };
  const body = s.last?.body;
  if (s.pending && body?.status !== 'active') {
    return { kind: 'pending', code: s.pending.code, qr: s.pending.qr, expiresAt: s.pending.expiresAt, expired: now >= s.pending.expiresAt };
  }
  if (!body || !s.last) return { kind: 'waiting', offline: !!s.lastError };
  const offline = !!s.lastError && s.lastError.at > s.last.fetchedAt;
  if (body.status === 'pro_required') return { kind: 'pro_required' };
  if (body.status === 'signed_out') return { kind: 'signed_out' };
  const l = body.latest;
  if (body.status !== 'active' || !l) return { kind: 'waiting', offline };
  const readingAt = s.last.fetchedAt - l.ageSec * 1000;
  const ageMs = Math.max(0, now - readingAt);
  return {
    kind: 'reading',
    valueMgdl: l.valueMgdl,
    unit: body.unit ?? 'mgdl',
    trend: l.trend,
    deltaMgdl: typeof l.deltaMgdl === 'number' ? l.deltaMgdl : null,
    readingAt,
    ageMs,
    old: ageMs > oldAfterMs(l.intervalSec),
    zone: zoneOf(l.valueMgdl, body.zoneLow, body.zoneHigh),
    offline,
  };
}

export interface Badge {
  text: string;
  color: string;
  textColor: string;
}

/** Toolbar badge: the value only (the badge fits about 4 characters). */
export function badgeOf(v: View, locale: string): Badge {
  if (v.kind !== 'reading') return { text: '', color: COLORS.old, textColor: BADGE_TEXT.old };
  const key = v.old ? 'old' : v.zone;
  return { text: formatValue(v.valueMgdl, v.unit, locale), color: COLORS[key], textColor: BADGE_TEXT[key] };
}

/** Whole minutes since the reading, for "3 min ago". */
export function ageMinutes(ageMs: number): number {
  return Math.max(0, Math.floor(ageMs / 60_000));
}
