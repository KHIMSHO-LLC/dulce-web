/**
 * Sensors Dulce reads (released app), in the order the app's sensor picker shows them.
 * `id` is the section anchor on /sensors, the same in every language; the homepage
 * "Works with" strip links to `/sensors#<id>`. Copy lives in messages `sensors.items`.
 */
export const SENSOR_IDS = ["freestyle-libre", "dexcom", "medtronic", "nightscout"] as const;
export type SensorId = (typeof SENSOR_IDS)[number];

/** Short labels for the homepage strip: product names, not translated. */
export const SENSOR_STRIP: { id: SensorId; label: string }[] = [
  { id: "freestyle-libre", label: "FreeStyle Libre 2 · 3" },
  { id: "dexcom", label: "Dexcom G6 · G7 · ONE+" },
  { id: "medtronic", label: "Medtronic Simplera · 780G" },
  { id: "nightscout", label: "Nightscout" },
];

/**
 * Where each sensor's "If it doesn't connect" link goes: a troubleshooting guide (article id)
 * or the help-centre page `sensor` (content/help/sensor, covers all four ways in).
 * Label is the shared message `sensors.troubleshoot`.
 */
export const SENSOR_TROUBLESHOOT: Record<SensorId, { kind: "article"; id: string } | { kind: "help"; id: "sensor" }> = {
  "freestyle-libre": { kind: "article", id: "librelinkup-not-working" },
  dexcom: { kind: "article", id: "dexcom" },
  medtronic: { kind: "help", id: "sensor" },
  nightscout: { kind: "help", id: "sensor" },
};

export type SensorItem = {
  id: SensorId;
  name: string;
  models: string;
  via: string;
  need: string;
  cadence: string;
  intro: string;
  steps: { title: string; body: string }[];
  note?: string;
  /** Link text to /setup (FreeStyle Libre only). */
  more?: string;
};
