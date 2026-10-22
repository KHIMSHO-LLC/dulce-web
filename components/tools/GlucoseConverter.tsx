"use client";

import { useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import { fmt, parseNum, toMgdl, toMmol } from "@/lib/tools";

const L: Record<AppLocale, { mgdl: string; mmol: string; hint: string }> = {
  es: { mgdl: "Glucosa en mg/dL", mmol: "Glucosa en mmol/L", hint: "Escribe en cualquiera de las dos casillas." },
  en: { mgdl: "Glucose in mg/dL", mmol: "Glucose in mmol/L", hint: "Type in either box." },
  de: { mgdl: "Glukose in mg/dL", mmol: "Glukose in mmol/L", hint: "Gib den Wert in eines der beiden Felder ein." },
  fr: { mgdl: "Glycémie en mg/dL", mmol: "Glycémie en mmol/L", hint: "Saisis la valeur dans l'une des deux cases." },
  it: { mgdl: "Glicemia in mg/dL", mmol: "Glicemia in mmol/L", hint: "Scrivi in una delle due caselle." },
};

/** Two linked fields: editing one updates the other. */
export function GlucoseConverter({ locale }: { locale: AppLocale }) {
  const [mgdl, setMgdl] = useState("100");
  const [mmol, setMmol] = useState(fmt(toMmol(100), 1, locale));
  const l = L[locale];

  const field =
    "mt-2 h-14 w-full rounded-[16px] border border-white/12 bg-ground-2 px-4 text-[1.6rem] font-light text-ink outline-none transition-colors focus:border-ember";

  return (
    <div className="rounded-[28px] border border-white/8 bg-glass p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-label text-soft">
          {l.mgdl}
          <input
            inputMode="decimal"
            value={mgdl}
            onChange={(e) => {
              setMgdl(e.target.value);
              const n = parseNum(e.target.value);
              setMmol(Number.isFinite(n) ? fmt(toMmol(n), 1, locale) : "");
            }}
            className={field}
          />
        </label>
        <label className="block text-label text-soft">
          {l.mmol}
          <input
            inputMode="decimal"
            value={mmol}
            onChange={(e) => {
              setMmol(e.target.value);
              const n = parseNum(e.target.value);
              setMgdl(Number.isFinite(n) ? fmt(toMgdl(n), 0, locale) : "");
            }}
            className={field}
          />
        </label>
      </div>
      <p className="mt-4 text-caption text-mute">{l.hint}</p>
    </div>
  );
}
