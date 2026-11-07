"use client";

import { useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import { a1cFromEag, fmt, gmiFromMean, gmiMmolMolFromMean, parseNum, toMgdl, toMmol } from "@/lib/tools";

const L: Record<AppLocale, { mean: string; unit: string; gmi: string; ifcc: string; other: string; estA1c: string }> = {
  es: { mean: "Glucosa media del sensor", unit: "Unidad", gmi: "GMI", ifcc: "GMI en mmol/mol", other: "La misma media en la otra unidad", estA1c: "HbA1c estimada (fórmula ADAG), para comparar" },
  en: { mean: "Your sensor's average glucose", unit: "Unit", gmi: "GMI", ifcc: "GMI in mmol/mol", other: "The same average in the other unit", estA1c: "Estimated A1C (ADAG formula), to compare" },
  de: { mean: "Mittelwert deines Sensors", unit: "Einheit", gmi: "GMI", ifcc: "GMI in mmol/mol", other: "Derselbe Mittelwert in der anderen Einheit", estA1c: "Geschätzter HbA1c (ADAG-Formel), zum Vergleich" },
  fr: { mean: "Glycémie moyenne de ton capteur", unit: "Unité", gmi: "GMI", ifcc: "GMI en mmol/mol", other: "La même moyenne dans l'autre unité", estA1c: "HbA1c estimée (formule ADAG), pour comparer" },
  it: { mean: "Glicemia media del sensore", unit: "Unità", gmi: "GMI", ifcc: "GMI in mmol/mol", other: "La stessa media nell'altra unità", estA1c: "HbA1c stimata (formula ADAG), per confronto" },
  fi: { mean: "Sensorisi keskiglukoosi", unit: "Yksikkö", gmi: "GMI", ifcc: "GMI yksikössä mmol/mol", other: "Sama keskiarvo toisessa yksikössä", estA1c: "Arvioitu HbA1c (ADAG-kaava) vertailuun" },
  nl: { mean: "Gemiddelde glucose van je sensor", unit: "Eenheid", gmi: "GMI", ifcc: "GMI in mmol/mol", other: "Hetzelfde gemiddelde in de andere eenheid", estA1c: "Geschatte HbA1c (ADAG-formule), ter vergelijking" },
  nb: { mean: "Sensorens gjennomsnittlige glukose", unit: "Enhet", gmi: "GMI", ifcc: "GMI i mmol/mol", other: "Samme gjennomsnitt i den andre enheten", estA1c: "Anslått HbA1c (ADAG-formelen), til sammenligning" },
  sv: { mean: "Sensorns genomsnittliga glukos", unit: "Enhet", gmi: "GMI", ifcc: "GMI i mmol/mol", other: "Samma genomsnitt i den andra enheten", estA1c: "Uppskattat HbA1c (ADAG-formeln), som jämförelse" },
  ru: { mean: "Средняя глюкоза по сенсору", unit: "Единица", gmi: "GMI", ifcc: "GMI в ммоль/моль", other: "То же среднее в другой единице", estA1c: "Расчётный HbA1c (формула ADAG) для сравнения" },
};

const MMOL_LOCALES: readonly AppLocale[] = ["fi", "nl", "nb", "sv", "ru"];

function Result({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="rounded-[18px] border border-white/8 bg-ground-2 px-4 py-3">
      <p className="text-caption text-mute">{label}</p>
      <p className={`mt-1 font-light tabular-nums text-ink ${big ? "text-[2rem]" : "text-[1.5rem]"}`}>{value}</p>
    </div>
  );
}

export function GmiCalculator({ locale }: { locale: AppLocale }) {
  const l = L[locale];
  const mmolDefault = MMOL_LOCALES.includes(locale);
  const [unit, setUnit] = useState<"mgdl" | "mmol">(mmolDefault ? "mmol" : "mgdl");
  const [mean, setMean] = useState(mmolDefault ? fmt(8.5, 1, locale) : "154");

  const n = parseNum(mean);
  const mgdl = unit === "mgdl" ? n : toMgdl(n);
  const valid = mgdl > 30 && mgdl < 600;

  const field =
    "mt-2 h-14 w-full rounded-[16px] border border-white/12 bg-ground-2 px-4 text-[1.6rem] font-light text-ink outline-none transition-colors focus:border-ember";

  return (
    <div className="rounded-[28px] border border-white/8 bg-glass p-6 md:p-8">
      <div className="grid max-w-md grid-cols-[1fr_auto] gap-4">
        <label className="block text-label text-soft">
          {l.mean}
          <input inputMode="decimal" value={mean} onChange={(e) => setMean(e.target.value)} className={field} />
        </label>
        <label className="block text-label text-soft">
          {l.unit}
          <select
            value={unit}
            onChange={(e) => {
              const next = e.target.value as "mgdl" | "mmol";
              // Keep the same glucose when switching unit.
              if (Number.isFinite(n) && next !== unit) setMean(next === "mmol" ? fmt(toMmol(n), 1, locale) : fmt(toMgdl(n), 0, locale));
              setUnit(next);
            }}
            className="mt-2 block h-14 w-full rounded-[16px] border border-white/12 bg-ground-2 px-3 text-body text-ink"
          >
            <option value="mgdl">mg/dL</option>
            <option value="mmol">mmol/L</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-live="polite">
        <Result big label={l.gmi} value={valid ? `${fmt(gmiFromMean(mgdl), 1, locale)} %` : "–"} />
        <Result big label={l.ifcc} value={valid ? `${fmt(gmiMmolMolFromMean(toMmol(mgdl)), 0, locale)} mmol/mol` : "–"} />
        <Result
          label={l.other}
          value={valid ? (unit === "mgdl" ? `${fmt(toMmol(mgdl), 1, locale)} mmol/L` : `${fmt(mgdl, 0, locale)} mg/dL`) : "–"}
        />
        <Result label={l.estA1c} value={valid ? `${fmt(a1cFromEag(mgdl), 1, locale)} %` : "–"} />
      </div>
    </div>
  );
}
