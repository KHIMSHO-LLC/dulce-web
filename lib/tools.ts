/**
 * The free calculators: formulas (with their sources) and copy.
 * Formulas are the published ones, not approximations of our own:
 *  - mg/dL ↔ mmol/L: glucose molar mass 180.16 g/mol, so 1 mmol/L = 18.016 mg/dL.
 *    The Dulce app and most meters round this to 18; we use 18 too so numbers match the app.
 *  - eAG = 28.7 × A1C − 46.7 (mg/dL). Nathan et al., Diabetes Care 2008;31:1473 (ADAG study).
 *  - GMI (%) = 3.31 + 0.02392 × mean glucose (mg/dL). Bergenstal et al., Diabetes Care 2018;41:2275.
 *  - IFCC (mmol/mol) = (NGSP % − 2.15) × 10.929. IFCC/NGSP master equation.
 *  - GMI (mmol/mol) = 12.71 + 4.70587 × mean glucose (mmol/L). Same paper.
 *  - Time in range bands and targets: Battelino et al., Diabetes Care 2019;42:1593 (International Consensus
 *    on Time in Range): <54, 54-69, 70-180, 181-250, >250 mg/dL (<3.0, 3.0-3.8, 3.9-10.0, 10.1-13.9, >13.9 mmol/L);
 *    targets >70 % in range, <4 % below 70 (<1 % below 54), <25 % above 180 (<5 % above 250); CV ≤36 %.
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
export const gmiMmolMolFromMean = (meanMmol: number) => 12.71 + 4.70587 * meanMmol;

/** The five consensus bands, lowest first. */
export type TirBand = "veryLow" | "low" | "inRange" | "high" | "veryHigh";
export const TIR_BANDS: readonly TirBand[] = ["veryLow", "low", "inRange", "high", "veryHigh"];

/** Band of one reading. mmol/L uses the consensus mmol/L limits (13.9 is still "high", not 250.2 mg/dL). */
export function tirBand(value: number, unit: "mgdl" | "mmol"): TirBand {
  const [a, b, c, d] = unit === "mgdl" ? [54, 70, 180, 250] : [3.0, 3.9, 10.0, 13.9];
  if (value < a) return "veryLow";
  if (value < b) return "low";
  if (value <= c) return "inRange";
  if (value <= d) return "high";
  return "veryHigh";
}

/** Band limits as shown next to each band, per unit (decimal comma outside English). */
export function tirLimits(unit: "mgdl" | "mmol", locale: AppLocale): Record<TirBand, string> {
  const l = unit === "mgdl"
    ? { veryLow: "< 54", low: "54–69", inRange: "70–180", high: "181–250", veryHigh: "> 250" }
    : { veryLow: "< 3.0", low: "3.0–3.8", inRange: "3.9–10.0", high: "10.1–13.9", veryHigh: "> 13.9" };
  return locale === "en" ? l : (Object.fromEntries(Object.entries(l).map(([k, v]) => [k, v.replace(/\./g, ",")])) as Record<TirBand, string>);
}

/**
 * Consensus targets (Battelino 2019) for most adults with type 1 or type 2 diabetes. Low and high
 * targets are cumulative: "below 70" includes the readings below 54, "above 180" those above 250.
 */
export const TIR_TARGETS = {
  inRange: { op: ">", pct: 70 },
  below70: { op: "<", pct: 4 },
  below54: { op: "<", pct: 1 },
  above180: { op: "<", pct: 25 },
  above250: { op: "<", pct: 5 },
} as const;

export type TirResult = {
  count: number;
  pct: Record<TirBand, number>;
  meanMgdl: number;
  /** Coefficient of variation, % (SD / mean, population SD). */
  cv: number;
};

/** Plausible CGM readings only (20-600 mg/dL), so pasted dates, times or row numbers don't count. */
const PLAUSIBLE_MGDL: [number, number] = [20, 600];

/**
 * Readings from pasted text: one per line, or separated by spaces, tabs, semicolons or commas.
 * In mmol/L "5,6" is a decimal comma (one or two digits after it), like the site's other inputs.
 */
export function parseReadings(text: string, unit: "mgdl" | "mmol"): number[] {
  const out: number[] = [];
  for (const token of text.split(/[\s;]+/)) {
    const parts = unit === "mmol" && /^\d{1,2},\d{1,2}$/.test(token) ? [token.replace(",", ".")] : token.split(",");
    for (const p of parts) {
      if (!/^\d+(\.\d+)?$/.test(p)) continue;
      const v = Number(p);
      const mgdl = unit === "mgdl" ? v : toMgdl(v);
      if (mgdl >= PLAUSIBLE_MGDL[0] && mgdl <= PLAUSIBLE_MGDL[1]) out.push(v);
    }
  }
  return out;
}

/** Time in range from evenly spaced readings (each reading = the same share of time, as in CGM reports). */
export function timeInRange(readings: number[], unit: "mgdl" | "mmol"): TirResult | null {
  if (!readings.length) return null;
  const counts: Record<TirBand, number> = { veryLow: 0, low: 0, inRange: 0, high: 0, veryHigh: 0 };
  for (const r of readings) counts[tirBand(r, unit)]++;
  const mgdl = readings.map((r) => (unit === "mgdl" ? r : toMgdl(r)));
  const mean = mgdl.reduce((a, b) => a + b, 0) / mgdl.length;
  const sd = Math.sqrt(mgdl.reduce((a, b) => a + (b - mean) ** 2, 0) / mgdl.length);
  const pct = Object.fromEntries(TIR_BANDS.map((b) => [b, (counts[b] / readings.length) * 100])) as Record<TirBand, number>;
  return { count: readings.length, pct, meanMgdl: mean, cv: (sd / mean) * 100 };
}

/** Minutes per day for a share of the day. */
export const minutesPerDay = (pct: number) => (pct / 100) * 1440;

/** GMI chart rows: mean glucose 100-350 mg/dL every 10: mg/dL, mmol/L, GMI %, GMI mmol/mol. */
export function gmiChartRows(locale: AppLocale): [string, string, string, string][] {
  return chartRange(100, 350, 10).map((v) => [
    fmt(v, 0, locale),
    fmt(toMmol(v), 1, locale),
    fmt(gmiFromMean(v), 1, locale),
    fmt(gmiMmolMolFromMean(toMmol(v)), 0, locale),
  ]);
}

export const GMI_CHART_HEAD: Record<AppLocale, [string, string, string, string]> = {
  es: ["Glucosa media (mg/dL)", "Glucosa media (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  en: ["Average glucose (mg/dL)", "Average glucose (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  de: ["Ø Blutzucker (mg/dL)", "Ø Blutzucker (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  fr: ["Glycémie moyenne (mg/dL)", "Glycémie moyenne (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  it: ["Glicemia media (mg/dL)", "Glicemia media (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  fi: ["Keskiglukoosi (mg/dL)", "Keskiglukoosi (mmol/l)", "GMI (%)", "GMI (mmol/mol)"],
  nl: ["Gemiddelde glucose (mg/dL)", "Gemiddelde glucose (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  nb: ["Gjennomsnittlig glukose (mg/dL)", "Gjennomsnittlig glukose (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  sv: ["Genomsnittlig glukos (mg/dL)", "Genomsnittlig glukos (mmol/L)", "GMI (%)", "GMI (mmol/mol)"],
  ru: ["Средняя глюкоза (мг/дл)", "Средняя глюкоза (ммоль/л)", "GMI (%)", "GMI (ммоль/моль)"],
};

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

export type ToolPath =
  | "/tools/glucose-converter"
  | "/tools/a1c-calculator"
  | "/tools/sensor-end-date"
  | "/tools/time-in-range-calculator"
  | "/tools/gmi-calculator";

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
    fi: {
      title: "Verensokerin muunnin mg/dL ↔ mmol/l ja taulukko",
      description: "Muunna verensokeri mg/dL-arvosta mmol/l-arvoksi ja takaisin heti. Koko taulukko 40–400 mg/dL ja 2–25 mmol/l sekä tavoitealueet.",
    },
    nl: {
      title: "Bloedsuiker omrekenen: mg/dL naar mmol/L, met tabel",
      description: "Reken je bloedsuiker direct om van mg/dL naar mmol/L en terug. Volledige tabel van 40 tot 400 mg/dL en 2 tot 25 mmol/L, met de streefwaarden.",
    },
    nb: {
      title: "Blodsukkeromregner mg/dL til mmol/L, med tabell",
      description: "Regn om blodsukkeret fra mg/dL til mmol/L og tilbake med en gang. Full tabell fra 40 til 400 mg/dL og 2 til 25 mmol/L, med målområdene.",
    },
    sv: {
      title: "Blodsockeromvandlare mg/dL till mmol/L, med tabell",
      description: "Räkna om blodsockret från mg/dL till mmol/L och tillbaka direkt. Fullständig tabell från 40 till 400 mg/dL och 2 till 25 mmol/L, med målområdena.",
    },
    ru: {
      title: "Конвертер глюкозы из мг/дл в ммоль/л с таблицей",
      description: "Мгновенно переводите глюкозу из мг/дл в ммоль/л и обратно. Полная таблица от 40 до 400 мг/дл и от 2 до 25 ммоль/л с целевыми диапазонами.",
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
    fi: {
      title: "HbA1c-laskuri ja -taulukko: keskiglukoosi ja GMI",
      description: "Muunna HbA1c arvioiduksi keskiglukoosiksi ja mmol/mol-arvoksi tai laske GMI sensorisi keskiarvosta. HbA1c-taulukko 4–14 %.",
    },
    nl: {
      title: "HbA1c berekenen en tabel: gemiddelde glucose en GMI",
      description: "Reken je HbA1c om naar geschatte gemiddelde glucose en mmol/mol, of bereken de GMI uit het gemiddelde van je sensor. HbA1c-tabel van 4 tot 14%.",
    },
    nb: {
      title: "HbA1c-kalkulator og tabell: gjennomsnittlig glukose og GMI",
      description: "Regn om HbA1c til anslått gjennomsnittlig glukose og mmol/mol, eller finn GMI fra sensorens gjennomsnitt. HbA1c-tabell fra 4 til 14 %.",
    },
    sv: {
      title: "HbA1c-kalkylator och tabell: genomsnittlig glukos och GMI",
      description: "Räkna om HbA1c till uppskattad genomsnittlig glukos och mmol/mol, eller få GMI från sensorns genomsnitt. HbA1c-tabell från 4 till 14 %.",
    },
    ru: {
      title: "Калькулятор и таблица HbA1c: средняя глюкоза и GMI",
      description: "Переведите HbA1c в расчётную среднюю глюкозу и ммоль/моль или узнайте GMI по средней глюкозе сенсора. Таблица HbA1c от 4 до 14 %.",
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
    fi: {
      title: "FreeStyle Libre -sensorin vaihtopäivän laskuri",
      description: "Laske, milloin FreeStyle Libre 2-, 3-, 2 Plus- tai 3 Plus -sensorisi päättyy ja milloin lukemat alkavat lämpenemisen jälkeen, asetuspäivän ja -ajan perusteella.",
    },
    nl: {
      title: "FreeStyle Libre sensor einddatum berekenen",
      description: "Bereken wanneer je FreeStyle Libre 2, 3, 2 Plus of 3 Plus sensor afloopt en wanneer de metingen na de opwarmtijd beginnen, vanaf de dag en tijd van plaatsen.",
    },
    nb: {
      title: "Kalkulator for utløpsdato for FreeStyle Libre-sensor",
      description: "Regn ut når FreeStyle Libre 2-, 3-, 2 Plus- eller 3 Plus-sensoren din slutter og når målingene starter etter oppvarmingen, ut fra dagen og tiden du satte den på.",
    },
    sv: {
      title: "Kalkylator för slutdatum för FreeStyle Libre-sensor",
      description: "Räkna ut när din FreeStyle Libre 2-, 3-, 2 Plus- eller 3 Plus-sensor slutar och när mätvärdena börjar efter uppvärmningen, utifrån dag och tid då du satte på den.",
    },
    ru: {
      title: "Калькулятор окончания сенсора FreeStyle Libre",
      description: "Узнайте, когда заканчивается ваш сенсор FreeStyle Libre 2, 3, 2 Plus или 3 Plus и когда после прогрева появятся показания, по дню и времени установки.",
    },
  },
  "/tools/time-in-range-calculator": {
    es: {
      title: "Calculadora de tiempo en rango (TIR) de tu sensor",
      description: "Pega tus lecturas de glucosa y calcula el tiempo en rango (70-180 mg/dL), por debajo y por encima, con los objetivos del consenso internacional al lado.",
    },
    en: {
      title: "Time in range calculator (TIR) for CGM readings",
      description: "Paste your glucose readings and get time in range (70-180 mg/dL), time below and above range, with the international consensus targets next to each number.",
    },
    de: {
      title: "Time-in-Range-Rechner: Zeit im Zielbereich berechnen",
      description: "Füge deine Glukosewerte ein und berechne die Zeit im Zielbereich (70-180 mg/dL), darunter und darüber, mit den Zielen des internationalen Konsenses daneben.",
    },
    fr: {
      title: "Calculateur de temps dans la cible (TIR) glycémie",
      description: "Colle tes glycémies et calcule le temps dans la cible (70-180 mg/dL), en dessous et au-dessus, avec les objectifs du consensus international à côté.",
    },
    it: {
      title: "Calcolatore del tempo nel range (TIR) della glicemia",
      description: "Incolla le tue letture di glicemia e calcola il tempo nel range (70-180 mg/dL), sotto e sopra, con gli obiettivi del consenso internazionale accanto.",
    },
    fi: {
      title: "Aika tavoitealueella -laskuri (TIR) sensorin lukemille",
      description: "Liitä glukoosilukemasi ja laske aika tavoitealueella (3,9–10,0 mmol/l) sekä sen ala- ja yläpuolella, kansainvälisen konsensuksen tavoitteet vieressä.",
    },
    nl: {
      title: "Tijd binnen bereik berekenen (TIR) voor je sensorwaarden",
      description: "Plak je glucosewaarden en bereken de tijd binnen bereik (3,9-10,0 mmol/L), eronder en erboven, met de doelen van de internationale consensus ernaast.",
    },
    nb: {
      title: "Kalkulator for tid i målområdet (TIR) for sensormålinger",
      description: "Lim inn glukosemålingene dine og regn ut tid i målområdet (3,9–10,0 mmol/L), under og over, med målene fra den internasjonale konsensusen ved siden av.",
    },
    sv: {
      title: "Kalkylator för tid inom målområdet (TIR) för sensorvärden",
      description: "Klistra in dina glukosvärden och räkna ut tid inom målområdet (3,9–10,0 mmol/L), under och över, med målen från den internationella konsensusen bredvid.",
    },
    ru: {
      title: "Калькулятор времени в целевом диапазоне (TIR)",
      description: "Вставьте показания глюкозы и рассчитайте время в диапазоне (3,9–10,0 ммоль/л), ниже и выше него, рядом с целями международного консенсуса.",
    },
  },
  "/tools/gmi-calculator": {
    es: {
      title: "Calculadora de GMI (indicador de gestión de glucosa)",
      description: "Calcula el GMI a partir de la glucosa media de tu sensor, en mg/dL o mmol/L, en % y en mmol/mol. Con la fórmula de Bergenstal y una tabla completa.",
    },
    en: {
      title: "GMI calculator: glucose management indicator from CGM",
      description: "Work out your GMI from your sensor's average glucose, in mg/dL or mmol/L, as % and mmol/mol. Uses the published Bergenstal formula, with a full chart.",
    },
    de: {
      title: "GMI-Rechner: Glukose-Management-Indikator berechnen",
      description: "Berechne den GMI aus dem Mittelwert deines Sensors, in mg/dL oder mmol/L, als % und mmol/mol. Mit der Formel von Bergenstal und einer kompletten Tabelle.",
    },
    fr: {
      title: "Calculateur de GMI (indicateur de gestion du glucose)",
      description: "Calcule ton GMI à partir de la glycémie moyenne de ton capteur, en mg/dL ou mmol/L, en % et en mmol/mol. Formule de Bergenstal et tableau complet.",
    },
    it: {
      title: "Calcolatore GMI (indicatore di gestione del glucosio)",
      description: "Calcola il GMI dalla glicemia media del tuo sensore, in mg/dL o mmol/L, in % e in mmol/mol. Con la formula di Bergenstal e una tabella completa.",
    },
    fi: {
      title: "GMI-laskuri: glukoosinhallinnan indikaattori sensorista",
      description: "Laske GMI sensorisi keskiglukoosista, yksikössä mmol/l tai mg/dL, prosentteina ja mmol/mol. Bergenstalin julkaistulla kaavalla, mukana koko taulukko.",
    },
    nl: {
      title: "GMI berekenen: glucosemanagementindicator uit je sensor",
      description: "Bereken je GMI uit de gemiddelde glucose van je sensor, in mmol/L of mg/dL, als % en mmol/mol. Met de formule van Bergenstal en een volledige tabel.",
    },
    nb: {
      title: "GMI-kalkulator: glukosestyringsindikator fra sensoren",
      description: "Regn ut GMI fra sensorens gjennomsnittlige glukose, i mmol/L eller mg/dL, som % og mmol/mol. Med Bergenstals publiserte formel og en full tabell.",
    },
    sv: {
      title: "GMI-kalkylator: glukoskontrollindikator från sensorn",
      description: "Räkna ut GMI från sensorns genomsnittliga glukos, i mmol/L eller mg/dL, som % och mmol/mol. Med Bergenstals publicerade formel och en fullständig tabell.",
    },
    ru: {
      title: "Калькулятор GMI: индикатор управления глюкозой",
      description: "Рассчитайте GMI по средней глюкозе сенсора в ммоль/л или мг/дл, в % и ммоль/моль. По опубликованной формуле Бергенстала, с полной таблицей.",
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
  fi: ["HbA1c (%)", "IFCC (mmol/mol)", "Keskiglukoosi (mg/dL)", "Keskiglukoosi (mmol/l)"],
  nl: ["HbA1c (%)", "IFCC (mmol/mol)", "Gemiddelde glucose (mg/dL)", "Gemiddelde glucose (mmol/L)"],
  nb: ["HbA1c (%)", "IFCC (mmol/mol)", "Gjennomsnittlig glukose (mg/dL)", "Gjennomsnittlig glukose (mmol/L)"],
  sv: ["HbA1c (%)", "IFCC (mmol/mol)", "Genomsnittlig glukos (mg/dL)", "Genomsnittlig glukos (mmol/L)"],
  ru: ["HbA1c (%)", "IFCC (ммоль/моль)", "Средняя глюкоза (мг/дл)", "Средняя глюкоза (ммоль/л)"],
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
    guides: ["blood-sugar-levels", "alerts", "night-lows", "child-glucose", "family-sharing", "dexcom", "dexcom-follow-alternative", "glucose-apps-compared", "xdrip-iphone", "diabetes-at-school", "older-adults-cgm", "pet-glucose"],
  },
  {
    path: "/tools/a1c-calculator",
    name: "a1c-calculator",
    dateModified: "2026-10-30",
    guides: ["hba1c", "blood-sugar-levels", "time-in-range", "trends", "logbook", "smart-insulin-pen", "apple-health", "libreview", "lada-diabetes", "type-2-cgm", "newly-diagnosed"],
  },
  {
    path: "/tools/sensor-end-date",
    name: "sensor-end-date",
    dateModified: "2026-10-23",
    guides: ["librelinkup-not-working", "libre-signal-loss", "apple-watch", "apple-watch-glucose", "lock-screen", "widgets", "diabetes-at-work"],
  },
  {
    path: "/tools/time-in-range-calculator",
    name: "time-in-range-calculator",
    dateModified: "2026-11-07",
    guides: ["time-in-range", "trends", "blood-sugar-levels", "hba1c", "night-lows", "type-2-cgm", "newly-diagnosed"],
  },
  {
    path: "/tools/gmi-calculator",
    name: "gmi-calculator",
    dateModified: "2026-11-07",
    guides: ["hba1c", "trends", "time-in-range", "libreview", "type-2-cgm", "lada-diabetes"],
  },
];

export const toolByPath = (path: ToolPath) => TOOLS.find((t) => t.path === path)!;

/** Calculators that list an article as related. */
export const toolsForArticle = (articleId: string) => TOOLS.filter((t) => t.guides.includes(articleId));
