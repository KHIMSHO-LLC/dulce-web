"use client";

import { useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import { a1cFromEag, eagFromA1c, fmt, gmiFromMean, ifccFromNgsp, parseNum, toMgdl, toMmol } from "@/lib/tools";

const L: Record<
  AppLocale,
  {
    fromA1c: string;
    fromMean: string;
    a1c: string;
    mean: string;
    unit: string;
    eag: string;
    estA1c: string;
    gmi: string;
    ifcc: string;
  }
> = {
  es: {
    fromA1c: "Tengo mi HbA1c",
    fromMean: "Tengo la glucosa media del sensor",
    a1c: "HbA1c (%)",
    mean: "Glucosa media",
    unit: "Unidad",
    eag: "Glucosa media estimada (eAG)",
    estA1c: "HbA1c estimada (fórmula ADAG)",
    gmi: "GMI (indicador de gestión de glucosa)",
    ifcc: "En mmol/mol (IFCC)",
  },
  en: {
    fromA1c: "I have my A1C",
    fromMean: "I have my sensor's average glucose",
    a1c: "A1C (%)",
    mean: "Average glucose",
    unit: "Unit",
    eag: "Estimated average glucose (eAG)",
    estA1c: "Estimated A1C (ADAG formula)",
    gmi: "GMI (glucose management indicator)",
    ifcc: "In mmol/mol (IFCC)",
  },
  de: {
    fromA1c: "Ich kenne meinen HbA1c",
    fromMean: "Ich kenne den Mittelwert meines Sensors",
    a1c: "HbA1c (%)",
    mean: "Durchschnittlicher Blutzucker",
    unit: "Einheit",
    eag: "Geschätzter Durchschnittsblutzucker (eAG)",
    estA1c: "Geschätzter HbA1c (ADAG-Formel)",
    gmi: "GMI (Glukose-Management-Indikator)",
    ifcc: "In mmol/mol (IFCC)",
  },
  fr: {
    fromA1c: "Je connais mon HbA1c",
    fromMean: "Je connais la glycémie moyenne de mon capteur",
    a1c: "HbA1c (%)",
    mean: "Glycémie moyenne",
    unit: "Unité",
    eag: "Glycémie moyenne estimée (eAG)",
    estA1c: "HbA1c estimée (formule ADAG)",
    gmi: "GMI (indicateur de gestion du glucose)",
    ifcc: "En mmol/mol (IFCC)",
  },
  it: {
    fromA1c: "Conosco la mia HbA1c",
    fromMean: "Conosco la glicemia media del mio sensore",
    a1c: "HbA1c (%)",
    mean: "Glicemia media",
    unit: "Unità",
    eag: "Glicemia media stimata (eAG)",
    estA1c: "HbA1c stimata (formula ADAG)",
    gmi: "GMI (indicatore di gestione del glucosio)",
    ifcc: "In mmol/mol (IFCC)",
  },
};

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-white/8 bg-ground-2 px-4 py-3">
      <p className="text-caption text-mute">{label}</p>
      <p className="mt-1 text-[1.5rem] font-light text-ink">{value}</p>
    </div>
  );
}

export function A1cCalculator({ locale }: { locale: AppLocale }) {
  const l = L[locale];
  const [mode, setMode] = useState<"a1c" | "mean">("a1c");
  const [a1c, setA1c] = useState(locale === "en" ? "7.0" : "7,0");
  const [mean, setMean] = useState("154");
  const [unit, setUnit] = useState<"mgdl" | "mmol">("mgdl");

  const a1cN = parseNum(a1c);
  const meanN = parseNum(mean);
  const meanMgdl = unit === "mgdl" ? meanN : toMgdl(meanN);
  const valid = mode === "a1c" ? a1cN > 3 && a1cN < 20 : meanMgdl > 30 && meanMgdl < 600;

  const field =
    "mt-2 h-14 w-full rounded-[16px] border border-white/12 bg-ground-2 px-4 text-[1.6rem] font-light text-ink outline-none transition-colors focus:border-ember";
  const tab = (active: boolean) =>
    `h-10 rounded-full px-4 text-label font-medium transition-colors ${active ? "bg-ember text-ember-ink" : "text-soft hover:text-ink"}`;
  const glucose = (mgdl: number) =>
    `${fmt(mgdl, 0, locale)} mg/dL · ${fmt(toMmol(mgdl), 1, locale)} mmol/L`;

  return (
    <div className="rounded-[28px] border border-white/8 bg-glass p-6 md:p-8">
      <div role="tablist" className="inline-flex flex-wrap gap-1 rounded-full border border-white/10 p-1">
        <button role="tab" aria-selected={mode === "a1c"} className={tab(mode === "a1c")} onClick={() => setMode("a1c")}>
          {l.fromA1c}
        </button>
        <button role="tab" aria-selected={mode === "mean"} className={tab(mode === "mean")} onClick={() => setMode("mean")}>
          {l.fromMean}
        </button>
      </div>

      {mode === "a1c" ? (
        <label className="mt-6 block max-w-xs text-label text-soft">
          {l.a1c}
          <input inputMode="decimal" value={a1c} onChange={(e) => setA1c(e.target.value)} className={field} />
        </label>
      ) : (
        <div className="mt-6 grid max-w-md gap-4 sm:grid-cols-[1fr_auto]">
          <label className="block text-label text-soft">
            {l.mean}
            <input inputMode="decimal" value={mean} onChange={(e) => setMean(e.target.value)} className={field} />
          </label>
          <label className="block text-label text-soft">
            {l.unit}
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "mgdl" | "mmol")}
              className="mt-2 h-14 rounded-[16px] border border-white/12 bg-ground-2 px-3 text-body text-ink"
            >
              <option value="mgdl">mg/dL</option>
              <option value="mmol">mmol/L</option>
            </select>
          </label>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-live="polite">
        {mode === "a1c" ? (
          <>
            <Result label={l.eag} value={valid ? glucose(eagFromA1c(a1cN)) : "–"} />
            <Result label={l.ifcc} value={valid ? `${fmt(ifccFromNgsp(a1cN), 0, locale)} mmol/mol` : "–"} />
          </>
        ) : (
          <>
            <Result label={l.gmi} value={valid ? `${fmt(gmiFromMean(meanMgdl), 1, locale)} %` : "–"} />
            <Result label={l.estA1c} value={valid ? `${fmt(a1cFromEag(meanMgdl), 1, locale)} %` : "–"} />
          </>
        )}
      </div>
    </div>
  );
}
