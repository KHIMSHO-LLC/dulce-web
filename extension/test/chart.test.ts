import { describe, expect, it } from 'vitest';
import { COLORS } from '../src/lib/display';
import { chartSvg, hourTicks, pointsOf, qrSvg, smoothPath, yRange } from '../src/lib/chart';

const MIN = 60_000;
const END = 1_800_000_000_000;

describe('pointsOf', () => {
  it('maps slots to times ending at the latest reading, drops empty slots', () => {
    expect(pointsOf([100, 0, 120], 300, END, 3)).toEqual([
      { t: END - 10 * MIN, v: 100 },
      { t: END, v: 120 },
    ]);
  });
  it('keeps only the asked hours', () => {
    const values = new Array(144).fill(100);
    expect(pointsOf(values, 300, END, 3)).toHaveLength(36);
  });
});

describe('yRange', () => {
  it('at least 50–220, wider for readings outside', () => {
    expect(yRange([{ t: 0, v: 120 }])).toEqual({ lo: 50, hi: 220 });
    expect(yRange([{ t: 0, v: 380 }, { t: 1, v: 35 }])).toEqual({ lo: 30, hi: 400 });
  });
});

describe('smoothPath', () => {
  it('one point is a move, two a straight line, more are curves through every point', () => {
    expect(smoothPath([{ x: 0, y: 0 }])).toBe('M0 0');
    expect(smoothPath([{ x: 0, y: 0 }, { x: 10, y: 5 }])).toBe('M0 0L10 5');
    const d = smoothPath([{ x: 0, y: 10 }, { x: 10, y: 0 }, { x: 20, y: 10 }]);
    expect(d.match(/C/g)).toHaveLength(2);
    expect(d).toContain(' 10 0C'); // passes exactly through the peak
  });
  it('never overshoots: at a peak the curve is flat', () => {
    const d = smoothPath([{ x: 0, y: 10 }, { x: 10, y: 0 }, { x: 20, y: 10 }]);
    // Control points next to the peak sit at the peak's height.
    expect(d).toContain('6.7 0 10 0C13.3 0 ');
  });
});

describe('hourTicks', () => {
  it('every hour on a 3 h chart, every 3 h on a 12 h chart, on whole hours', () => {
    const start = Date.UTC(2026, 10, 27, 9, 20);
    expect(hourTicks(start, start + 3 * 3600_000, 3, 'UTC').map((t) => new Date(t).getUTCHours())).toEqual([10, 11, 12]);
    expect(hourTicks(start, start + 12 * 3600_000, 12, 'UTC').map((t) => new Date(t).getUTCHours())).toEqual([12, 15, 18, 21]);
  });
});

describe('chartSvg', () => {
  const base = { stepSec: 300, endAt: END, hours: 3, unit: 'mgdl' as const, locale: 'en', width: 292, height: 148, timeZone: 'UTC' };

  it('one smooth line (and its fill) for a run without gaps, no dots but the latest', () => {
    const svg = chartSvg({ ...base, values: [100, 110, 120, 130] });
    expect(svg.match(/class="line"/g)).toHaveLength(1);
    expect(svg.match(/class="area"/g)).toHaveLength(1);
    expect(svg.match(/class="now"/g)).toHaveLength(1);
    expect(svg).toMatch(/class="line" d="M[^"]*C/);
  });

  it('a 20-minute hole breaks the line (gap rule)', () => {
    // 100, 110, then 3 empty slots (20 min between readings), then 130, 140.
    const svg = chartSvg({ ...base, values: [100, 110, 0, 0, 0, 130, 140] });
    expect(svg.match(/class="line"/g)).toHaveLength(2);
  });

  it('colours by zone: high above the high line, low below the low line', () => {
    const svg = chartSvg({ ...base, values: [60, 120, 250] });
    expect(svg).toContain(COLORS.high);
    expect(svg).toContain(COLORS.range);
    expect(svg).toContain(COLORS.low);
  });

  it('labels the limit lines in the user unit', () => {
    const svg = chartSvg({ ...base, unit: 'mmoll', values: [100], lowLine: 72, highLine: 180 });
    expect(svg).toContain('>4.0<');
    expect(svg).toContain('>10.0<');
  });

  it('labels whole hours on the time axis', () => {
    const svg = chartSvg({ ...base, values: new Array(36).fill(120) });
    expect(svg.match(/class="tick"/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it('12-hour clocks show "3 PM", 24-hour clocks "15:00"', () => {
    const values = new Array(36).fill(120);
    const endAt = Date.UTC(2026, 10, 27, 16, 30);
    expect(chartSvg({ ...base, endAt, values, locale: 'en-US' })).toContain('>3 PM<');
    expect(chartSvg({ ...base, endAt, values, locale: 'de' })).toContain('>15:00<');
  });
});

describe('qrSvg', () => {
  it('draws a module per dark cell, with a quiet zone', () => {
    const svg = qrSvg(['10', '01'], 100);
    expect(svg).toContain('viewBox="0 0 6 6"');
    expect(svg.match(/h1v1h-1z/g)).toHaveLength(2);
  });
  it('ignores anything but 1 and 0', () => {
    expect(qrSvg(['1<script>'], 10)).not.toContain('<script');
  });
});
