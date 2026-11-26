// Same cases as dulce-app src/lib/__tests__/chart-gaps.test.ts (and the Swift
// and Kotlin copies): the extension draws gaps exactly like the app.
import { describe, expect, it } from 'vitest';
import {
  CHART_GAP_MS,
  CHART_JOIN_MAX_MS,
  CHART_LAG_MAX_MS,
  CHART_SEAM_MAX_MS,
  isChartGap,
  isChartGapAt,
  splitAtChartGaps,
} from '../src/lib/chartGaps';

const MIN = 60_000;

function gaps(steps: number[]): number[] {
  const pts = [{ t: 0 }];
  for (const s of steps) pts.push({ t: pts[pts.length - 1]!.t + s * MIN });
  const out: number[] = [];
  for (let i = 1; i < pts.length; i += 1) if (isChartGapAt(pts, i)) out.push(i - 1);
  return out;
}

describe('the one chart gap rule', () => {
  it('is 15 minutes, with a minute for rounded timestamps', () => {
    expect(CHART_GAP_MS).toBe(15 * MIN);
    expect(CHART_JOIN_MAX_MS).toBe(16 * MIN);
    expect(CHART_SEAM_MAX_MS).toBe(24 * MIN);
    expect(CHART_LAG_MAX_MS).toBe(31 * MIN);
  });

  it('joins the 15-min graph', () => {
    expect(gaps([15, 15, 15])).toEqual([]);
    expect(gaps([15, 16, 15])).toEqual([]);
  });

  it('breaks where a 15-min point is missing', () => {
    expect(gaps([15, 30, 15])).toEqual([1]);
  });

  it('breaks dense readings over 15 min', () => {
    expect(gaps([1, 1, 20, 1, 1])).toEqual([2]);
    expect(gaps([5, 5, 20, 5, 5])).toEqual([2]);
  });

  it('joins where the 15-min graph meets live readings', () => {
    expect(gaps([15, 15, 23, 1, 1])).toEqual([]);
    expect(gaps([1, 1, 22, 15, 15])).toEqual([]);
  });

  it('joins live readings to a graph that was published late', () => {
    expect(gaps([15, 15, 28, 1, 1])).toEqual([]);
    expect(gaps([15, 15, 28])).toEqual([]);
    expect(gaps([15, 15, 32, 1])).toEqual([2]);
  });

  it('does not join the other way round, or after dense readings', () => {
    expect(gaps([1, 1, 28, 15, 15])).toEqual([2]);
    expect(gaps([5, 5, 28])).toEqual([2]);
  });

  it('two lone readings: only the plain 15-min rule', () => {
    expect(gaps([20])).toEqual([0]);
    expect(gaps([16])).toEqual([]);
    expect(isChartGap(20 * MIN, null, null)).toBe(true);
  });

  it('owner report 2026-11-23: graph to 17:02, live readings from 17:20', () => {
    // 15-min graph, then the relay's minute readings 18 min later.
    expect(gaps([15, 15, 15, 18, 1, 1, 1])).toEqual([]);
  });

  it('splits into the runs a chart draws', () => {
    const pts = [0, 15, 30, 75, 90].map((m) => ({ t: m * MIN }));
    expect(splitAtChartGaps(pts).map((r) => r.length)).toEqual([3, 2]);
    expect(splitAtChartGaps([])).toEqual([]);
  });
});
