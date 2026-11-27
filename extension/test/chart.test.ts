import { describe, expect, it } from 'vitest';
import { chartSvg, pointsOf, qrSvg, yRange } from '../src/lib/chart';

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
  it('at least 40–300, wider for readings outside', () => {
    expect(yRange([{ t: 0, v: 120 }])).toEqual({ lo: 40, hi: 300 });
    expect(yRange([{ t: 0, v: 380 }, { t: 1, v: 35 }])).toEqual({ lo: 30, hi: 400 });
  });
});

describe('chartSvg', () => {
  const base = { stepSec: 300, endAt: END, hours: 3, unit: 'mgdl' as const, locale: 'en', width: 292, height: 120 };

  it('one line for a run without gaps', () => {
    const svg = chartSvg({ ...base, values: [100, 110, 120, 130] });
    expect(svg.match(/<path /g)).toHaveLength(1);
    expect(svg.match(/<circle /g)).toHaveLength(4);
  });

  it('a 20-minute hole breaks the line (gap rule)', () => {
    // 100, 110, then 3 empty slots (20 min between readings), then 130, 140.
    const svg = chartSvg({ ...base, values: [100, 110, 0, 0, 0, 130, 140] });
    expect(svg.match(/<path /g)).toHaveLength(2);
  });

  it('labels the limit lines in the user unit', () => {
    const svg = chartSvg({ ...base, unit: 'mmoll', values: [100], lowLine: 72, highLine: 180 });
    expect(svg).toContain('>4.0<');
    expect(svg).toContain('>10.0<');
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
