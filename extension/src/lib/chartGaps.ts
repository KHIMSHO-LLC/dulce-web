/**
 * The one chart gap rule, copied from dulce-app `src/lib/chart-gaps.ts`
 * (same numbers, same decision, same test cases in test/chartGaps.test.ts).
 * More than 15 minutes without a reading is a gap, and a gap is never joined
 * by a line. See the app file for why the seam and lag allowances exist.
 */

export const CHART_GAP_MS = 15 * 60_000;
export const CHART_GAP_SLACK_MS = 60_000;
export const CHART_SEAM_MS = 8 * 60_000;
export const CHART_LAG_MS = 15 * 60_000;
export const CHART_SPARSE_STEP_MS = 12 * 60_000;

export const CHART_JOIN_MAX_MS = CHART_GAP_MS + CHART_GAP_SLACK_MS;
export const CHART_SEAM_MAX_MS = CHART_GAP_MS + CHART_SEAM_MS + CHART_GAP_SLACK_MS;
export const CHART_LAG_MAX_MS = CHART_GAP_MS + CHART_LAG_MS + CHART_GAP_SLACK_MS;

function isGraphStep(stepMs: number | null | undefined): boolean {
  return stepMs != null && stepMs >= CHART_SPARSE_STEP_MS && stepMs <= CHART_SEAM_MAX_MS;
}

export function isChartGap(
  stepMs: number,
  prevStepMs: number | null | undefined,
  nextStepMs: number | null | undefined,
): boolean {
  if (stepMs <= CHART_JOIN_MAX_MS) return false;
  const graphBefore = isGraphStep(prevStepMs);
  const graphAfter = isGraphStep(nextStepMs);
  if (stepMs <= CHART_SEAM_MAX_MS) return !(graphBefore || graphAfter);
  if (stepMs <= CHART_LAG_MAX_MS) return !(graphBefore && !graphAfter);
  return true;
}

export function isChartGapAt<T extends { t: number }>(points: readonly T[], i: number): boolean {
  if (i <= 0 || i >= points.length) return false;
  const step = points[i]!.t - points[i - 1]!.t;
  const prev = i >= 2 ? points[i - 1]!.t - points[i - 2]!.t : null;
  const next = i + 1 < points.length ? points[i + 1]!.t - points[i]!.t : null;
  return isChartGap(step, prev, next);
}

export function splitAtChartGaps<T extends { t: number }>(points: readonly T[]): T[][] {
  const runs: T[][] = [];
  let run: T[] = [];
  for (let i = 0; i < points.length; i += 1) {
    if (run.length && isChartGapAt(points, i)) {
      runs.push(run);
      run = [];
    }
    run.push(points[i]!);
  }
  if (run.length) runs.push(run);
  return runs;
}
