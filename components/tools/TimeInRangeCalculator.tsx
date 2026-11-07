"use client";

import { useMemo, useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import {
  TIR_BANDS,
  TIR_TARGETS,
  fmt,
  gmiFromMean,
  minutesPerDay,
  parseReadings,
  timeInRange,
  tirLimits,
  toMgdl,
  toMmol,
  type TirBand,
} from "@/lib/tools";

type Labels = {
  readings: string;
  hint: string;
  unit: string;
  example: string;
  clear: string;
  count: (n: number) => string;
  bands: Record<TirBand, string>;
  perDay: string;
  target: string;
  below70: string;
  above180: string;
  met: string;
  notMet: string;
  average: string;
  gmi: string;
  cv: string;
  cvHelp: string;
  empty: string;
  note: string;
};

const L: Record<AppLocale, Labels> = {
  es: {
    readings: "Tus lecturas de glucosa",
    hint: "Una por línea, o separadas por espacios o punto y coma. Lecturas a intervalos regulares, como las del sensor.",
    unit: "Unidad",
    example: "Probar con un ejemplo",
    clear: "Borrar",
    count: (n) => `${n} lecturas`,
    bands: { veryLow: "Muy baja", low: "Baja", inRange: "En rango", high: "Alta", veryHigh: "Muy alta" },
    perDay: "al día",
    target: "Objetivo",
    below70: "en total por debajo de {x}",
    above180: "en total por encima de {x}",
    met: "Cumple el objetivo",
    notMet: "Fuera del objetivo",
    average: "Glucosa media",
    gmi: "GMI (A1c estimada)",
    cv: "Variabilidad (CV)",
    cvHelp: "36 % o menos se considera estable",
    empty: "Pega tus lecturas para ver el resultado.",
    note: "Objetivos generales del consenso internacional para la mayoría de adultos con diabetes tipo 1 o 2. Tu equipo médico fija los tuyos.",
  },
  en: {
    readings: "Your glucose readings",
    hint: "One per line, or separated by spaces or semicolons. Evenly spaced readings, like a sensor's.",
    unit: "Unit",
    example: "Try an example",
    clear: "Clear",
    count: (n) => `${n} readings`,
    bands: { veryLow: "Very low", low: "Low", inRange: "In range", high: "High", veryHigh: "Very high" },
    perDay: "a day",
    target: "Target",
    below70: "below {x} in total",
    above180: "above {x} in total",
    met: "Meets the target",
    notMet: "Outside the target",
    average: "Average glucose",
    gmi: "GMI (estimated A1c)",
    cv: "Variability (CV)",
    cvHelp: "36% or lower is considered stable",
    empty: "Paste your readings to see the result.",
    note: "General international consensus targets for most adults with type 1 or type 2 diabetes. Your care team sets yours.",
  },
  de: {
    readings: "Deine Glukosewerte",
    hint: "Ein Wert pro Zeile oder getrennt durch Leerzeichen oder Semikolon. Werte in gleichen Abständen, wie vom Sensor.",
    unit: "Einheit",
    example: "Mit Beispiel ausprobieren",
    clear: "Leeren",
    count: (n) => `${n} Werte`,
    bands: { veryLow: "Sehr niedrig", low: "Niedrig", inRange: "Im Zielbereich", high: "Hoch", veryHigh: "Sehr hoch" },
    perDay: "pro Tag",
    target: "Ziel",
    below70: "insgesamt unter {x}",
    above180: "insgesamt über {x}",
    met: "Ziel erreicht",
    notMet: "Außerhalb des Ziels",
    average: "Mittelwert",
    gmi: "GMI (geschätzter HbA1c)",
    cv: "Variabilität (VK)",
    cvHelp: "36 % oder weniger gilt als stabil",
    empty: "Füge deine Werte ein, um das Ergebnis zu sehen.",
    note: "Allgemeine Ziele des internationalen Konsenses für die meisten Erwachsenen mit Typ-1- oder Typ-2-Diabetes. Deine eigenen legt dein Behandlungsteam fest.",
  },
  fr: {
    readings: "Tes glycémies",
    hint: "Une par ligne, ou séparées par des espaces ou des points-virgules. Des mesures à intervalles réguliers, comme celles du capteur.",
    unit: "Unité",
    example: "Essayer avec un exemple",
    clear: "Effacer",
    count: (n) => `${n} mesures`,
    bands: { veryLow: "Très basse", low: "Basse", inRange: "Dans la cible", high: "Haute", veryHigh: "Très haute" },
    perDay: "par jour",
    target: "Objectif",
    below70: "au total sous {x}",
    above180: "au total au-dessus de {x}",
    met: "Objectif atteint",
    notMet: "Hors de l'objectif",
    average: "Glycémie moyenne",
    gmi: "GMI (HbA1c estimée)",
    cv: "Variabilité (CV)",
    cvHelp: "36 % ou moins est considéré comme stable",
    empty: "Colle tes mesures pour voir le résultat.",
    note: "Objectifs généraux du consensus international pour la plupart des adultes avec un diabète de type 1 ou 2. C'est ton équipe soignante qui fixe les tiens.",
  },
  it: {
    readings: "Le tue letture di glicemia",
    hint: "Una per riga, o separate da spazi o punti e virgola. Letture a intervalli regolari, come quelle del sensore.",
    unit: "Unità",
    example: "Prova con un esempio",
    clear: "Cancella",
    count: (n) => `${n} letture`,
    bands: { veryLow: "Molto bassa", low: "Bassa", inRange: "Nel range", high: "Alta", veryHigh: "Molto alta" },
    perDay: "al giorno",
    target: "Obiettivo",
    below70: "in totale sotto {x}",
    above180: "in totale sopra {x}",
    met: "Obiettivo raggiunto",
    notMet: "Fuori obiettivo",
    average: "Glicemia media",
    gmi: "GMI (HbA1c stimata)",
    cv: "Variabilità (CV)",
    cvHelp: "36% o meno è considerato stabile",
    empty: "Incolla le tue letture per vedere il risultato.",
    note: "Obiettivi generali del consenso internazionale per la maggior parte degli adulti con diabete di tipo 1 o 2. I tuoi li stabilisce il tuo team diabetologico.",
  },
  fi: {
    readings: "Glukoosilukemasi",
    hint: "Yksi riviä kohden tai välilyönnein tai puolipistein eroteltuina. Tasavälein otetut lukemat, kuten sensorin.",
    unit: "Yksikkö",
    example: "Kokeile esimerkillä",
    clear: "Tyhjennä",
    count: (n) => `${n} lukemaa`,
    bands: { veryLow: "Hyvin matala", low: "Matala", inRange: "Tavoitealueella", high: "Korkea", veryHigh: "Hyvin korkea" },
    perDay: "päivässä",
    target: "Tavoite",
    below70: "yhteensä alle {x}",
    above180: "yhteensä yli {x}",
    met: "Tavoite täyttyy",
    notMet: "Tavoitteen ulkopuolella",
    average: "Keskiglukoosi",
    gmi: "GMI (arvioitu HbA1c)",
    cv: "Vaihtelu (CV)",
    cvHelp: "36 % tai alle katsotaan vakaaksi",
    empty: "Liitä lukemasi nähdäksesi tuloksen.",
    note: "Kansainvälisen konsensuksen yleiset tavoitteet useimmille aikuisille, joilla on tyypin 1 tai 2 diabetes. Omat tavoitteesi asettaa hoitotiimisi.",
  },
  nl: {
    readings: "Je glucosewaarden",
    hint: "Eén per regel, of gescheiden door spaties of puntkomma's. Waarden met gelijke tussenpozen, zoals die van een sensor.",
    unit: "Eenheid",
    example: "Probeer een voorbeeld",
    clear: "Wissen",
    count: (n) => `${n} waarden`,
    bands: { veryLow: "Zeer laag", low: "Laag", inRange: "Binnen bereik", high: "Hoog", veryHigh: "Zeer hoog" },
    perDay: "per dag",
    target: "Doel",
    below70: "in totaal onder {x}",
    above180: "in totaal boven {x}",
    met: "Doel gehaald",
    notMet: "Buiten het doel",
    average: "Gemiddelde glucose",
    gmi: "GMI (geschat HbA1c)",
    cv: "Variabiliteit (CV)",
    cvHelp: "36% of lager geldt als stabiel",
    empty: "Plak je waarden om het resultaat te zien.",
    note: "Algemene doelen van de internationale consensus voor de meeste volwassenen met diabetes type 1 of 2. Je behandelteam stelt de jouwe vast.",
  },
  nb: {
    readings: "Glukosemålingene dine",
    hint: "Én per linje, eller skilt med mellomrom eller semikolon. Målinger med jevne mellomrom, som fra en sensor.",
    unit: "Enhet",
    example: "Prøv med et eksempel",
    clear: "Tøm",
    count: (n) => `${n} målinger`,
    bands: { veryLow: "Svært lav", low: "Lav", inRange: "I målområdet", high: "Høy", veryHigh: "Svært høy" },
    perDay: "per dag",
    target: "Mål",
    below70: "totalt under {x}",
    above180: "totalt over {x}",
    met: "Når målet",
    notMet: "Utenfor målet",
    average: "Gjennomsnittlig glukose",
    gmi: "GMI (anslått HbA1c)",
    cv: "Variasjon (CV)",
    cvHelp: "36 % eller lavere regnes som stabilt",
    empty: "Lim inn målingene dine for å se resultatet.",
    note: "Generelle mål fra den internasjonale konsensusen for de fleste voksne med type 1- eller type 2-diabetes. Behandlingsteamet ditt setter dine.",
  },
  sv: {
    readings: "Dina glukosvärden",
    hint: "Ett per rad, eller åtskilda med mellanslag eller semikolon. Värden med jämna mellanrum, som från en sensor.",
    unit: "Enhet",
    example: "Testa med ett exempel",
    clear: "Rensa",
    count: (n) => `${n} värden`,
    bands: { veryLow: "Mycket lågt", low: "Lågt", inRange: "Inom målområdet", high: "Högt", veryHigh: "Mycket högt" },
    perDay: "per dag",
    target: "Mål",
    below70: "totalt under {x}",
    above180: "totalt över {x}",
    met: "Når målet",
    notMet: "Utanför målet",
    average: "Genomsnittlig glukos",
    gmi: "GMI (uppskattat HbA1c)",
    cv: "Variation (CV)",
    cvHelp: "36 % eller lägre anses stabilt",
    empty: "Klistra in dina värden för att se resultatet.",
    note: "Allmänna mål från den internationella konsensusen för de flesta vuxna med typ 1- eller typ 2-diabetes. Ditt diabetesteam sätter dina.",
  },
  ru: {
    readings: "Ваши показания глюкозы",
    hint: "По одному в строке или через пробел или точку с запятой. Показания через равные промежутки, как у сенсора.",
    unit: "Единица",
    example: "Попробовать на примере",
    clear: "Очистить",
    count: (n) => `Показаний: ${n}`,
    bands: { veryLow: "Очень низкий", low: "Низкий", inRange: "В диапазоне", high: "Высокий", veryHigh: "Очень высокий" },
    perDay: "в сутки",
    target: "Цель",
    below70: "всего ниже {x}",
    above180: "всего выше {x}",
    met: "Цель достигнута",
    notMet: "Вне цели",
    average: "Средняя глюкоза",
    gmi: "GMI (оценка HbA1c)",
    cv: "Вариабельность (CV)",
    cvHelp: "36% и ниже считается стабильным",
    empty: "Вставьте показания, чтобы увидеть результат.",
    note: "Общие цели международного консенсуса для большинства взрослых с диабетом 1 или 2 типа. Ваши цели устанавливает лечащая команда.",
  },
};

/** Locales on mmol/L by default (and in the "in total below / above" labels). */
const MMOL_LOCALES: readonly AppLocale[] = ["fi", "nl", "nb", "sv", "ru"];

const BAND_COLOR: Record<TirBand, string> = {
  veryLow: "#a81d20",
  low: "var(--color-low)",
  inRange: "var(--color-range)",
  high: "var(--color-high)",
  veryHigh: "#c9781a",
};

/** One example day, every 15 minutes (96 readings), in mg/dL: a calm night, a breakfast and a dinner rise, one low. */
const EXAMPLE_MGDL = [
  118, 115, 112, 110, 108, 106, 104, 103, 101, 99, 98, 97, 96, 95, 96, 98, 101, 105, 110, 114, 118, 121, 124, 126,
  130, 142, 160, 181, 199, 212, 218, 214, 203, 188, 172, 158, 146, 136, 128, 121, 116, 112, 109, 107, 105, 103, 101, 98,
  94, 89, 82, 75, 68, 63, 61, 66, 74, 85, 97, 108, 117, 124, 129, 133, 136, 138, 139, 140, 141, 145, 158, 178,
  201, 226, 248, 262, 266, 257, 241, 222, 203, 186, 171, 159, 149, 141, 134, 129, 125, 122, 120, 119, 118, 118, 117, 118,
];

function duration(pct: number, locale: AppLocale): string {
  const total = Math.round(minutesPerDay(pct));
  const h = Math.floor(total / 60);
  const m = total % 60;
  return locale === "ru" ? `${h} ч ${m} мин` : `${h} h ${m} min`;
}

export function TimeInRangeCalculator({ locale }: { locale: AppLocale }) {
  const l = L[locale];
  const [unit, setUnit] = useState<"mgdl" | "mmol">(MMOL_LOCALES.includes(locale) ? "mmol" : "mgdl");
  const [text, setText] = useState("");

  const readings = useMemo(() => parseReadings(text, unit), [text, unit]);
  const result = useMemo(() => timeInRange(readings, unit), [readings, unit]);
  const limits = tirLimits(unit, locale);
  const pct = (v: number) => `${fmt(v, v > 0 && v < 1 ? 1 : 0, locale)} %`;

  const below70 = result ? result.pct.veryLow + result.pct.low : 0;
  const above180 = result ? result.pct.high + result.pct.veryHigh : 0;
  const T = TIR_TARGETS;
  const targets: Record<TirBand, { text: string; met: boolean }> = {
    veryLow: { text: `< ${T.below54.pct} %`, met: (result?.pct.veryLow ?? 0) < T.below54.pct },
    low: { text: `< ${T.below70.pct} % ${l.below70.replace("{x}", unit === "mgdl" ? "70" : fmt(3.9, 1, locale))}`, met: below70 < T.below70.pct },
    inRange: { text: `> ${T.inRange.pct} %`, met: (result?.pct.inRange ?? 0) > T.inRange.pct },
    high: { text: `< ${T.above180.pct} % ${l.above180.replace("{x}", unit === "mgdl" ? "180" : fmt(10, 1, locale))}`, met: above180 < T.above180.pct },
    veryHigh: { text: `< ${T.above250.pct} %`, met: (result?.pct.veryHigh ?? 0) < T.above250.pct },
  };

  /** Switching unit converts what's already pasted, so the result stays the same. */
  const switchUnit = (next: "mgdl" | "mmol") => {
    if (next === unit) return;
    if (readings.length)
      setText(readings.map((v) => (next === "mmol" ? fmt(toMmol(v), 1, locale) : fmt(toMgdl(v), 0, locale))).join("\n"));
    setUnit(next);
  };

  const glucose = (mgdl: number) =>
    unit === "mgdl" ? `${fmt(mgdl, 0, locale)} mg/dL` : `${fmt(toMmol(mgdl), 1, locale)} mmol/L`;

  const tab = (active: boolean) =>
    `h-10 rounded-full px-4 text-label font-medium transition-colors ${active ? "bg-ember text-ember-ink" : "text-soft hover:text-ink"}`;

  return (
    <div className="rounded-[28px] border border-white/8 bg-glass p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label text-soft">{l.unit}</p>
          <div role="radiogroup" aria-label={l.unit} className="mt-2 inline-flex gap-1 rounded-full border border-white/10 p-1">
            {(["mgdl", "mmol"] as const).map((u) => (
              <button key={u} role="radio" aria-checked={unit === u} className={tab(unit === u)} onClick={() => switchUnit(u)}>
                {u === "mgdl" ? "mg/dL" : "mmol/L"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setText(
                EXAMPLE_MGDL.map((v) => (unit === "mgdl" ? String(v) : fmt(toMmol(v), 1, locale))).join("\n"),
              )
            }
            className="h-10 rounded-full border border-white/12 px-4 text-label text-ink transition-colors hover:border-ember"
          >
            {l.example}
          </button>
          {text ? (
            <button type="button" onClick={() => setText("")} className="h-10 rounded-full px-4 text-label text-soft hover:text-ink">
              {l.clear}
            </button>
          ) : null}
        </div>
      </div>

      <label className="mt-6 block text-label text-soft">
        {l.readings}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          spellCheck={false}
          placeholder={unit === "mgdl" ? "112\n135\n160\n…" : fmt(6.2, 1, locale) + "\n" + fmt(7.5, 1, locale) + "\n…"}
          className="mt-2 block w-full resize-y rounded-[16px] border border-white/12 bg-ground-2 px-4 py-3 font-mono text-body text-ink outline-none transition-colors placeholder:text-mute focus:border-ember"
        />
      </label>
      <p className="mt-2 text-caption text-mute">
        {l.hint}
        {result ? <span className="text-soft"> · {l.count(result.count)}</span> : null}
      </p>

      <div className="mt-6" aria-live="polite">
        {result ? (
          <>
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-ground-2" aria-hidden>
              {TIR_BANDS.map((b) =>
                result.pct[b] > 0 ? (
                  <span key={b} style={{ width: `${result.pct[b]}%`, background: BAND_COLOR[b] }} />
                ) : null,
              )}
            </div>
            <ul className="mt-4 divide-y divide-white/8 rounded-[18px] border border-white/8 bg-ground-2">
              {[...TIR_BANDS].reverse().map((b) => (
                <li key={b} className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: BAND_COLOR[b] }} aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-body text-ink">
                      {l.bands[b]} <span className="whitespace-nowrap text-caption text-mute">{limits[b]}</span>
                    </span>
                    <span className="block text-caption text-mute">
                      {l.target}: {targets[b].text}{" "}
                      <span className={targets[b].met ? "text-range-text" : "text-high-text"}>
                        · {targets[b].met ? l.met : l.notMet}
                      </span>
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[1.35rem] font-light tabular-nums text-ink">{pct(result.pct[b])}</span>
                    <span className="block text-caption tabular-nums text-mute">
                      {duration(result.pct[b], locale)} {l.perDay}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Stat label={l.average} value={glucose(result.meanMgdl)} />
              <Stat label={l.gmi} value={`${fmt(gmiFromMean(result.meanMgdl), 1, locale)} %`} />
              <Stat label={l.cv} value={`${fmt(result.cv, 0, locale)} %`} help={l.cvHelp} />
            </div>
            <p className="mt-4 text-caption text-mute">{l.note}</p>
          </>
        ) : (
          <p className="rounded-[18px] border border-dashed border-white/12 px-4 py-6 text-center text-label text-mute">{l.empty}</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, help }: { label: string; value: string; help?: string }) {
  return (
    <div className="rounded-[18px] border border-white/8 bg-ground-2 px-4 py-3">
      <p className="text-caption text-mute">{label}</p>
      <p className="mt-1 text-[1.35rem] font-light tabular-nums text-ink">{value}</p>
      {help ? <p className="text-caption text-mute">{help}</p> : null}
    </div>
  );
}

