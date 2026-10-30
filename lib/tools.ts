/**
 * The free calculators: formulas (with their sources) and copy.
 * Formulas are the published ones, not approximations of our own:
 *  - mg/dL ↔ mmol/L: glucose molar mass 180.16 g/mol, so 1 mmol/L = 18.016 mg/dL.
 *    The Dulce app and most meters round this to 18; we use 18 too so numbers match the app.
 *  - eAG = 28.7 × A1C − 46.7 (mg/dL). Nathan et al., Diabetes Care 2008;31:1473 (ADAG study).
 *  - GMI (%) = 3.31 + 0.02392 × mean glucose (mg/dL). Bergenstal et al., Diabetes Care 2018;41:2275.
 *  - IFCC (mmol/mol) = (NGSP % − 2.15) × 10.929. IFCC/NGSP master equation.
 *  - Sensor life: FreeStyle Libre 2 / 3 14 days, Libre 2 Plus / 3 Plus 15 days, 60-minute warm-up
 *    (Abbott, FreeStyle Libre CGM systems comparison guide).
 */
import type { AppLocale } from "@/i18n/routing";

export const MGDL_PER_MMOLL = 18;

export const toMmol = (mgdl: number) => mgdl / MGDL_PER_MMOLL;
export const toMgdl = (mmol: number) => mmol * MGDL_PER_MMOLL;
export const eagFromA1c = (a1c: number) => 28.7 * a1c - 46.7;
export const a1cFromEag = (eagMgdl: number) => (eagMgdl + 46.7) / 28.7;
export const gmiFromMean = (meanMgdl: number) => 3.31 + 0.02392 * meanMgdl;
export const ifccFromNgsp = (ngsp: number) => (ngsp - 2.15) * 10.929;

export type SensorModel = "libre2" | "libre2plus" | "libre3" | "libre3plus";

export const SENSORS: Record<SensorModel, { name: string; days: number }> = {
  libre2: { name: "FreeStyle Libre 2", days: 14 },
  libre2plus: { name: "FreeStyle Libre 2 Plus", days: 15 },
  libre3: { name: "FreeStyle Libre 3", days: 14 },
  libre3plus: { name: "FreeStyle Libre 3 Plus", days: 15 },
};

export const SENSOR_WARMUP_MIN = 60;

/** Ready (end of warm-up) and end times, epoch ms, from the start time. */
export function sensorTimes(model: SensorModel, startMs: number): { readyAt: number; endsAt: number } {
  return { readyAt: startMs + SENSOR_WARMUP_MIN * 60_000, endsAt: startMs + SENSORS[model].days * 86_400_000 };
}

export type ToolPath = "/tools/glucose-converter" | "/tools/a1c-calculator" | "/tools/sensor-end-date";

type ToolCopy = { title: string; description: string };

export const TOOL_COPY: Record<ToolPath, Record<AppLocale, ToolCopy>> = {
  "/tools/glucose-converter": {
    es: {
      title: "Conversor de glucosa mg/dL a mmol/L, con tabla",
      description: "Convierte la glucosa de mg/dL a mmol/L y al revés al instante. Tabla completa de 40 a 400 mg/dL y de 2 a 25 mmol/L, con los rangos objetivo.",
    },
    en: {
      title: "mg/dL to mmol/L converter and chart for blood sugar",
      description: "Convert blood sugar from mg/dL to mmol/L and back instantly. Full chart from 40 to 400 mg/dL and 2 to 25 mmol/L, with the target ranges.",
    },
    de: {
      title: "Blutzucker umrechnen: mg/dL in mmol/L, mit Tabelle",
      description: "Rechne Blutzucker sofort von mg/dL in mmol/L um und zurück. Komplette Tabelle von 40 bis 400 mg/dL und 2 bis 25 mmol/L, mit Zielbereichen.",
    },
    fr: {
      title: "Convertisseur glycémie mg/dL en mmol/L, avec tableau",
      description: "Convertis ta glycémie de mg/dL en mmol/L et inversement. Tableau complet de 40 à 400 mg/dL et de 2 à 25 mmol/L, avec les plages cibles.",
    },
    it: {
      title: "Convertitore glicemia da mg/dL a mmol/L, con tabella",
      description: "Converti la glicemia da mg/dL a mmol/L e viceversa all'istante. Tabella completa da 40 a 400 mg/dL e da 2 a 25 mmol/L, con gli intervalli target.",
    },
  },
  "/tools/a1c-calculator": {
    es: {
      title: "Calculadora y tabla de hemoglobina glicosilada (HbA1c)",
      description: "Pasa tu HbA1c a glucosa media estimada y a mmol/mol, o calcula el GMI con la media de tu sensor. Tabla completa de HbA1c del 4 % al 14 %.",
    },
    en: {
      title: "A1C calculator and chart: A1C to average glucose, GMI",
      description: "Convert A1C to estimated average glucose and mmol/mol, or get GMI from your sensor average. Full A1C chart from 4% to 14%.",
    },
    de: {
      title: "HbA1c-Rechner und HbA1c-Tabelle: Ø Blutzucker und GMI",
      description: "Rechne HbA1c in durchschnittlichen Blutzucker und mmol/mol um oder den GMI aus deinem Sensor-Mittelwert. HbA1c-Tabelle von 4 bis 14 %.",
    },
    fr: {
      title: "Calculateur et tableau HbA1c : glycémie moyenne, GMI",
      description: "Convertis ton HbA1c en glycémie moyenne estimée et en mmol/mol, ou calcule le GMI avec la moyenne de ton capteur. Tableau HbA1c de 4 à 14 %.",
    },
    it: {
      title: "Calcolatore e tabella emoglobina glicata (HbA1c)",
      description: "Converti la HbA1c in glicemia media stimata e in mmol/mol, o calcola il GMI dalla media del sensore. Tabella HbA1c completa dal 4% al 14%.",
    },
  },
  "/tools/sensor-end-date": {
    es: {
      title: "Calculadora de fin del sensor FreeStyle Libre",
      description: "Calcula cuándo termina tu sensor FreeStyle Libre 2, 3, 2 Plus o 3 Plus y cuándo tendrás lecturas tras el calentamiento, a partir del día y la hora en que lo pusiste.",
    },
    en: {
      title: "FreeStyle Libre sensor end date calculator",
      description: "Work out when your FreeStyle Libre 2, 3, 2 Plus or 3 Plus sensor ends and when readings start after warm-up, from the day and time you applied it.",
    },
    de: {
      title: "FreeStyle Libre Sensor-Ablauf-Rechner",
      description: "Berechne, wann dein FreeStyle Libre 2, 3, 2 Plus oder 3 Plus Sensor abläuft und wann nach der Aufwärmphase Werte kommen, ab dem Zeitpunkt des Setzens.",
    },
    fr: {
      title: "Calculateur de fin de capteur FreeStyle Libre",
      description: "Calcule quand ton capteur FreeStyle Libre 2, 3, 2 Plus ou 3 Plus expire et quand les mesures arrivent après le préchauffage, à partir du jour et de l'heure de pose.",
    },
    it: {
      title: "Calcolatore di scadenza del sensore FreeStyle Libre",
      description: "Calcola quando scade il tuo sensore FreeStyle Libre 2, 3, 2 Plus o 3 Plus e quando arrivano le letture dopo il riscaldamento, dal giorno e dall'ora di applicazione.",
    },
  },
};

/** Locale-aware number formatting with a fixed number of decimals. */
export function fmt(value: number, decimals: number, locale: AppLocale): string {
  if (!Number.isFinite(value)) return "–";
  // Round half up on the decimal value: 125.5 is stored as 125.4999…, and toFixed alone gives 125.
  const f = 10 ** decimals;
  const s = (Math.round(value * f + 1e-9) / f).toFixed(decimals);
  return locale === "en" ? s : s.replace(".", ",");
}

/** Ascending, de-duplicated range (in tenths, so no float drift) plus extra values. */
function chartRange(from: number, to: number, step: number, extra: number[] = []): number[] {
  const out = new Set<number>();
  for (let v = Math.round(from * 10); v <= Math.round(to * 10); v += Math.round(step * 10)) out.add(v / 10);
  extra.forEach((v) => out.add(v));
  return [...out].sort((a, b) => a - b);
}

/** Full glucose chart rows, formatted like the converter: mg/dL 40-400 (every 5) or mmol/L 2-25 (every 0.5). */
export function glucoseChartRows(from: "mgdl" | "mmol", locale: AppLocale): [string, string][] {
  return from === "mgdl"
    ? chartRange(40, 400, 5, [54, 63, 126, 144, 162, 198]).map((v) => [fmt(v, 0, locale), fmt(toMmol(v), 1, locale)])
    : chartRange(2, 25, 0.5, [3.9, 5.6, 7.8, 13.9]).map((v) => [fmt(v, 1, locale), fmt(toMgdl(v), 0, locale)]);
}

/** A1C chart rows (4-14 %, every 0.1 between 5 and 9): A1C %, IFCC mmol/mol, eAG mg/dL, eAG mmol/L. */
export function a1cChartRows(locale: AppLocale): [string, string, string, string][] {
  return chartRange(4, 14, 0.5, chartRange(5, 9, 0.1)).map((v) => {
    const eag = eagFromA1c(v);
    return [fmt(v, 1, locale), fmt(ifccFromNgsp(v), 0, locale), fmt(eag, 0, locale), fmt(toMmol(eag), 1, locale)];
  });
}

export const A1C_CHART_HEAD: Record<AppLocale, [string, string, string, string]> = {
  es: ["HbA1c (%)", "IFCC (mmol/mol)", "Glucosa media (mg/dL)", "Glucosa media (mmol/L)"],
  en: ["A1C (%)", "IFCC (mmol/mol)", "Average glucose (mg/dL)", "Average glucose (mmol/L)"],
  de: ["HbA1c (%)", "IFCC (mmol/mol)", "Ø Blutzucker (mg/dL)", "Ø Blutzucker (mmol/L)"],
  fr: ["HbA1c (%)", "IFCC (mmol/mol)", "Glycémie moyenne (mg/dL)", "Glycémie moyenne (mmol/L)"],
  it: ["HbA1c (%)", "IFCC (mmol/mol)", "Glicemia media (mg/dL)", "Glicemia media (mmol/L)"],
};

/** Parses "5,5" or "5.5". */
export function parseNum(input: string): number {
  const n = Number(input.trim().replace(",", "."));
  return input.trim() === "" ? NaN : n;
}

export type Tool = {
  path: ToolPath;
  /** Content folder (content/tools/<name>). */
  name: string;
  /** When the explanation (content/tools/<name>) last changed. Shown on the page and in its JSON-LD. */
  dateModified: string;
  /** Guides this calculator links to; each guide links back to the calculators that list it. */
  guides: string[];
};

/** Every calculator. Every article id should appear in at least one `guides` list. */
export const TOOLS: readonly Tool[] = [
  {
    path: "/tools/glucose-converter",
    name: "glucose-converter",
    dateModified: "2026-10-30",
    guides: ["blood-sugar-levels", "alerts", "night-lows", "child-glucose", "family-sharing", "dexcom", "dexcom-follow-alternative", "glucose-apps-compared"],
  },
  {
    path: "/tools/a1c-calculator",
    name: "a1c-calculator",
    dateModified: "2026-10-30",
    guides: ["blood-sugar-levels", "time-in-range", "trends", "logbook", "apple-health", "libreview"],
  },
  {
    path: "/tools/sensor-end-date",
    name: "sensor-end-date",
    dateModified: "2026-10-23",
    guides: ["librelinkup-not-working", "apple-watch", "lock-screen", "widgets"],
  },
];

export const toolByPath = (path: ToolPath) => TOOLS.find((t) => t.path === path)!;

/** Calculators that list an article as related. */
export const toolsForArticle = (articleId: string) => TOOLS.filter((t) => t.guides.includes(articleId));
