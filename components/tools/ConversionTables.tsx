import type { AppLocale } from "@/i18n/routing";
import { A1C_CHART_HEAD, a1cChartRows, glucoseChartRows } from "@/lib/tools";

/**
 * Full conversion charts for the calculator pages. Rows come from lib/tools.ts
 * (same formulas and rounding as the calculators, never typed by hand). Several
 * narrow tables side by side so a phone never scrolls sideways; real <table>s
 * so search engines and AI answers can read them.
 */

const TH = "border-b border-white/15 py-2 pr-3 text-left font-medium text-ink";
const TD = "border-b border-white/8 py-1.5 pr-3 tabular-nums text-soft";

function chunk<T>(list: T[], parts: number): T[][] {
  const size = Math.ceil(list.length / parts);
  return Array.from({ length: parts }, (_, i) => list.slice(i * size, (i + 1) * size)).filter((c) => c.length);
}

export function GlucoseTable({ locale, from }: { locale: AppLocale; from: "mgdl" | "mmol" }) {
  const [a, b] = from === "mgdl" ? ["mg/dL", "mmol/L"] : ["mmol/L", "mg/dL"];
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-6 text-label sm:grid-cols-4">
      {chunk(glucoseChartRows(from, locale), 4).map((part, i) => (
        <table key={i} className="!mt-0 w-full border-collapse">
          <thead>
            <tr>
              <th className={TH}>{a}</th>
              <th className={TH}>{b}</th>
            </tr>
          </thead>
          <tbody>
            {part.map(([x, y]) => (
              <tr key={x}>
                <td className={TD}>{x}</td>
                <td className={`${TD} !text-ink`}>{y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

export function A1cTable({ locale }: { locale: AppLocale }) {
  const head = A1C_CHART_HEAD[locale];
  return (
    <div className="mt-6 grid gap-x-8 text-label md:grid-cols-2">
      {chunk(a1cChartRows(locale), 2).map((part, i) => (
        <table key={i} className="!mt-0 w-full border-collapse">
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} className={TH}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {part.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, j) => (
                  <td key={j} className={j === 0 ? `${TD} !text-ink` : TD}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
