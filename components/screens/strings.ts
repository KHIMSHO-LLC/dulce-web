/**
 * UI strings for the depicted app screens. The app ships in Spanish and
 * English, so each locale shows the app in its own language.
 */
export type ScreenLocale = "es" | "en";

export type ScreenStrings = {
  lastReading: string;
  inRange: string;
  high: string;
  low: string;
  change: string;
  last12h: string;
  tir: string;
  carbs: string;
  insulin: string;
  tabs: [string, string, string, string];
  now: string;
  minAgo: (n: number) => string;
  keepItUp: string;
  liveActivity: string;
  alertVeryLow: string;
  alertLow: string;
  alertHigh: string;
  actNow: string;
  alarm: string;
  followers: string;
  followersSub: string;
  invite: string;
  inviteSub: string;
  seesGlucose: string;
  getsAlerts: string;
  imOk: string;
  nudgeFrom: (name: string) => string;
  nudgeText: string;
  logbook: string;
  last7: string;
  average: string;
  gmi: string;
  entries: Array<{ time: string; kind: "insulin" | "carbs" | "glucose"; text: string }>;
  addEntry: string;
  units: string;
  trends: string;
  days: string;
  tirTarget: string;
  morning: string;
  afternoon: string;
  night: string;
  health: string;
  healthSub: string;
  readOnly: string;
  healthRows: [string, string, string];
  connected: string;
  weekday: (d: Date) => string;
  parentName: string;
  followerAlert: (name: string) => string;
  sample: string;
};

const esDays = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const esMonths = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const enMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SCREEN_STRINGS: Record<ScreenLocale, ScreenStrings> = {
  es: {
    lastReading: "Última lectura",
    inRange: "En rango",
    high: "Alta",
    low: "Baja",
    change: "cambio",
    last12h: "Últimas 12 horas",
    tir: "Tiempo en rango",
    carbs: "Hidratos",
    insulin: "Insulina",
    tabs: ["Inicio", "Diario", "Tendencias", "Ajustes"],
    now: "ahora",
    minAgo: (n) => `hace ${n} min`,
    keepItUp: "Sigue así",
    liveActivity: "Dulce",
    alertVeryLow: "Glucosa muy baja",
    alertLow: "Glucosa baja",
    alertHigh: "Glucosa alta",
    actNow: "actúa ahora",
    alarm: "Alarma",
    followers: "Tus seguidores",
    followersSub: "Quienes pueden ver tu glucosa en tiempo real.",
    invite: "Invitar a alguien",
    inviteSub: "Envía un enlace y verán tu glucosa en Dulce.",
    seesGlucose: "Ve tu glucosa",
    getsAlerts: "Recibe avisos",
    imOk: "Estoy bien",
    nudgeFrom: (name) => `${name} te ha mandado un toque`,
    nudgeText: "¿Todo bien?",
    logbook: "Diario",
    last7: "Últimos 7 días",
    average: "media",
    gmi: "GMI",
    entries: [
      { time: "13:36", kind: "insulin", text: "5,5 u · bolo" },
      { time: "13:30", kind: "carbs", text: "45 g · comida" },
      { time: "12:58", kind: "glucose", text: "142 mg/dL" },
      { time: "08:10", kind: "insulin", text: "4 u · bolo" },
      { time: "08:02", kind: "carbs", text: "30 g · desayuno" },
      { time: "07:40", kind: "glucose", text: "104 mg/dL" },
    ],
    addEntry: "Añadir registro",
    units: "u",
    trends: "Tendencias",
    days: "días",
    tirTarget: "Objetivo 70%",
    morning: "Mañana",
    afternoon: "Tarde",
    night: "Noche",
    health: "Apple Salud",
    healthSub: "Dulce lee estos datos para tenerlo todo junto.",
    readOnly: "Solo lectura",
    healthRows: ["Glucosa en sangre", "Hidratos de carbono", "Insulina"],
    connected: "Conectado",
    weekday: (d) => `${esDays[d.getDay()]}, ${d.getDate()} de ${esMonths[d.getMonth()]}`,
    parentName: "Lucía",
    followerAlert: (name) => `${name} · glucosa baja`,
    sample: "Datos de ejemplo",
  },
  en: {
    lastReading: "Last reading",
    inRange: "In range",
    high: "High",
    low: "Low",
    change: "change",
    last12h: "Last 12 hours",
    tir: "Time in range",
    carbs: "Carbs",
    insulin: "Insulin",
    tabs: ["Home", "Logbook", "Trends", "Settings"],
    now: "now",
    minAgo: (n) => `${n} min ago`,
    keepItUp: "Keep it up",
    liveActivity: "Dulce",
    alertVeryLow: "Glucose very low",
    alertLow: "Glucose low",
    alertHigh: "Glucose high",
    actNow: "act now",
    alarm: "Alarm",
    followers: "Your followers",
    followersSub: "The people who can see your glucose in real time.",
    invite: "Invite someone",
    inviteSub: "Send a link and they'll see your glucose in Dulce.",
    seesGlucose: "Sees your glucose",
    getsAlerts: "Gets alerts",
    imOk: "I'm OK",
    nudgeFrom: (name) => `${name} sent you a nudge`,
    nudgeText: "All good?",
    logbook: "Logbook",
    last7: "Last 7 days",
    average: "average",
    gmi: "GMI",
    entries: [
      { time: "1:36 PM", kind: "insulin", text: "5.5 u · bolus" },
      { time: "1:30 PM", kind: "carbs", text: "45 g · lunch" },
      { time: "12:58 PM", kind: "glucose", text: "142 mg/dL" },
      { time: "8:10 AM", kind: "insulin", text: "4 u · bolus" },
      { time: "8:02 AM", kind: "carbs", text: "30 g · breakfast" },
      { time: "7:40 AM", kind: "glucose", text: "104 mg/dL" },
    ],
    addEntry: "Add entry",
    units: "u",
    trends: "Trends",
    days: "days",
    tirTarget: "Goal 70%",
    morning: "Morning",
    afternoon: "Afternoon",
    night: "Night",
    health: "Apple Health",
    healthSub: "Dulce reads this data so everything sits together.",
    readOnly: "Read only",
    healthRows: ["Blood glucose", "Carbohydrates", "Insulin"],
    connected: "Connected",
    weekday: (d) => `${enDays[d.getDay()]}, ${enMonths[d.getMonth()]} ${d.getDate()}`,
    parentName: "Lucy",
    followerAlert: (name) => `${name} · glucose low`,
    sample: "Sample data",
  },
};
