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
      title: "Conversor de glucosa: mg/dL a mmol/L",
      description: "Convierte tu glucosa de mg/dL a mmol/L y al revés al instante, con una tabla de valores habituales y los rangos objetivo.",
    },
    en: {
      title: "Blood sugar converter: mg/dL to mmol/L",
      description: "Convert your glucose from mg/dL to mmol/L and back instantly, with a table of common values and the target ranges.",
    },
    de: {
      title: "Blutzucker-Umrechner: mg/dL in mmol/L",
      description: "Rechne deinen Blutzucker sofort von mg/dL in mmol/L um und zurück, mit einer Tabelle üblicher Werte und den Zielbereichen.",
    },
    fr: {
      title: "Convertisseur de glycémie : mg/dL en mmol/L",
      description: "Convertis ta glycémie de mg/dL en mmol/L et inversement en un instant, avec un tableau des valeurs courantes et les plages cibles.",
    },
    it: {
      title: "Convertitore di glicemia: da mg/dL a mmol/L",
      description: "Converti la tua glicemia da mg/dL a mmol/L e viceversa all'istante, con una tabella dei valori più comuni e gli intervalli target.",
    },
  },
  "/tools/a1c-calculator": {
    es: {
      title: "Calculadora de HbA1c y glucosa media (eAG y GMI)",
      description: "Calcula la glucosa media estimada a partir de tu HbA1c, o una HbA1c estimada y el GMI a partir de la glucosa media de tu sensor.",
    },
    en: {
      title: "A1C calculator: average glucose, eAG and GMI",
      description: "Work out your estimated average glucose from your A1C, or an estimated A1C and GMI from your sensor's average glucose.",
    },
    de: {
      title: "HbA1c-Rechner: durchschnittlicher Blutzucker, eAG und GMI",
      description: "Berechne aus deinem HbA1c den geschätzten durchschnittlichen Blutzucker oder aus dem Mittelwert deines Sensors einen geschätzten HbA1c und den GMI.",
    },
    fr: {
      title: "Calculateur HbA1c : glycémie moyenne, eAG et GMI",
      description: "Calcule ta glycémie moyenne estimée à partir de ton HbA1c, ou une HbA1c estimée et le GMI à partir de la glycémie moyenne de ton capteur.",
    },
    it: {
      title: "Calcolatore HbA1c: glicemia media, eAG e GMI",
      description: "Calcola la glicemia media stimata dalla tua HbA1c, oppure una HbA1c stimata e il GMI dalla glicemia media del tuo sensore.",
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
  const s = value.toFixed(decimals);
  return locale === "en" ? s : s.replace(".", ",");
}

/** Parses "5,5" or "5.5". */
export function parseNum(input: string): number {
  const n = Number(input.trim().replace(",", "."));
  return input.trim() === "" ? NaN : n;
}

/** Every calculator: route and content folder (content/tools/<name>). */
export const TOOLS: readonly { path: ToolPath; name: string }[] = [
  { path: "/tools/glucose-converter", name: "glucose-converter" },
  { path: "/tools/a1c-calculator", name: "a1c-calculator" },
  { path: "/tools/sensor-end-date", name: "sensor-end-date" },
];
