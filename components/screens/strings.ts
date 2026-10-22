/**
 * UI strings for the depicted app screens. Each site language shows the app
 * in its own language, so keep these in sync with dulce-app's locale files.
 */
export type ScreenLocale = "es" | "en" | "de" | "fr" | "it";

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
const deDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const deMonths = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const frDays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const frMonths = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const itDays = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
const itMonths = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
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
  de: {
    lastReading: "Letzter Wert",
    inRange: "Im Zielbereich",
    high: "Hoch",
    low: "Niedrig",
    change: "Änderung",
    last12h: "Letzte 12 Stunden",
    tir: "Zeit im Zielbereich",
    carbs: "Kohlenhydrate",
    insulin: "Insulin",
    tabs: ["Start", "Logbuch", "Trends", "Einstellungen"],
    now: "jetzt",
    minAgo: (n) => `vor ${n} Min.`,
    keepItUp: "Weiter so",
    liveActivity: "Dulce",
    alertVeryLow: "Glukose sehr niedrig",
    alertLow: "Glukose niedrig",
    alertHigh: "Glukose hoch",
    actNow: "jetzt handeln",
    alarm: "Alarm",
    followers: "Deine Follower",
    followersSub: "Wer deine Glukose in Echtzeit sehen kann.",
    invite: "Jemanden einladen",
    inviteSub: "Schick einen Link, dann sehen sie deine Glukose in Dulce.",
    seesGlucose: "Sieht deine Glukose",
    getsAlerts: "Bekommt Warnungen",
    imOk: "Mir geht es gut",
    nudgeFrom: (name) => `${name} hat dich angestupst`,
    nudgeText: "Alles okay?",
    logbook: "Logbuch",
    last7: "Letzte 7 Tage",
    average: "Durchschnitt",
    gmi: "GMI",
    entries: [
      { time: "13:36", kind: "insulin", text: "5,5 IE · Bolus" },
      { time: "13:30", kind: "carbs", text: "45 g · Mittagessen" },
      { time: "12:58", kind: "glucose", text: "142 mg/dL" },
      { time: "08:10", kind: "insulin", text: "4 IE · Bolus" },
      { time: "08:02", kind: "carbs", text: "30 g · Frühstück" },
      { time: "07:40", kind: "glucose", text: "104 mg/dL" },
    ],
    addEntry: "Eintrag hinzufügen",
    units: "IE",
    trends: "Trends",
    days: "Tage",
    tirTarget: "Ziel 70 %",
    morning: "Morgen",
    afternoon: "Nachmittag",
    night: "Nacht",
    health: "Apple Health",
    healthSub: "Dulce liest diese Daten, damit alles beisammen ist.",
    readOnly: "Nur lesen",
    healthRows: ["Blutzucker", "Kohlenhydrate", "Insulin"],
    connected: "Verbunden",
    weekday: (d) => `${deDays[d.getDay()]}, ${d.getDate()}. ${deMonths[d.getMonth()]}`,
    parentName: "Lena",
    followerAlert: (name) => `${name} · Glukose niedrig`,
    sample: "Beispieldaten",
  },
  fr: {
    lastReading: "Dernière mesure",
    inRange: "Dans la cible",
    high: "Haute",
    low: "Basse",
    change: "Variation",
    last12h: "12 dernières heures",
    tir: "Temps dans la cible",
    carbs: "Glucides",
    insulin: "Insuline",
    tabs: ["Accueil", "Journal", "Tendances", "Réglages"],
    now: "maintenant",
    minAgo: (n) => `il y a ${n} min`,
    keepItUp: "Continue comme ça",
    liveActivity: "Dulce",
    alertVeryLow: "Glycémie très basse",
    alertLow: "Glycémie basse",
    alertHigh: "Glycémie haute",
    actNow: "agis maintenant",
    alarm: "Alarme",
    followers: "Tes abonnés",
    followersSub: "Qui peut voir ta glycémie en temps réel.",
    invite: "Inviter quelqu'un",
    inviteSub: "Envoie un lien et ils verront ta glycémie dans Dulce.",
    seesGlucose: "Voit ta glycémie",
    getsAlerts: "Reçoit les alertes",
    imOk: "Ça va",
    nudgeFrom: (name) => `${name} t'a envoyé un message`,
    nudgeText: "Ça va ?",
    logbook: "Journal",
    last7: "7 derniers jours",
    average: "Moyenne",
    gmi: "GMI",
    entries: [
      { time: "13:36", kind: "insulin", text: "5,5 U · bolus" },
      { time: "13:30", kind: "carbs", text: "45 g · déjeuner" },
      { time: "12:58", kind: "glucose", text: "142 mg/dL" },
      { time: "08:10", kind: "insulin", text: "4 U · bolus" },
      { time: "08:02", kind: "carbs", text: "30 g · petit-déjeuner" },
      { time: "07:40", kind: "glucose", text: "104 mg/dL" },
    ],
    addEntry: "Ajouter",
    units: "U",
    trends: "Tendances",
    days: "jours",
    tirTarget: "Objectif 70 %",
    morning: "Matin",
    afternoon: "Après-midi",
    night: "Nuit",
    health: "Apple Santé",
    healthSub: "Dulce lit ces données pour tout réunir au même endroit.",
    readOnly: "Lecture seule",
    healthRows: ["Glycémie", "Glucides", "Insuline"],
    connected: "Connecté",
    weekday: (d) => `${frDays[d.getDay()]} ${d.getDate()} ${frMonths[d.getMonth()]}`,
    parentName: "Léa",
    followerAlert: (name) => `${name} · glycémie basse`,
    sample: "Données d'exemple",
  },
  it: {
    lastReading: "Ultima lettura",
    inRange: "Nel range",
    high: "Alta",
    low: "Bassa",
    change: "Variazione",
    last12h: "Ultime 12 ore",
    tir: "Tempo nel range",
    carbs: "Carboidrati",
    insulin: "Insulina",
    tabs: ["Home", "Diario", "Andamento", "Impostazioni"],
    now: "ora",
    minAgo: (n) => `${n} min fa`,
    keepItUp: "Continua così",
    liveActivity: "Dulce",
    alertVeryLow: "Glicemia molto bassa",
    alertLow: "Glicemia bassa",
    alertHigh: "Glicemia alta",
    actNow: "agisci ora",
    alarm: "Allarme",
    followers: "I tuoi follower",
    followersSub: "Chi può vedere la tua glicemia in tempo reale.",
    invite: "Invita qualcuno",
    inviteSub: "Manda un link e vedranno la tua glicemia in Dulce.",
    seesGlucose: "Vede la tua glicemia",
    getsAlerts: "Riceve gli avvisi",
    imOk: "Sto bene",
    nudgeFrom: (name) => `${name} ti ha scritto`,
    nudgeText: "Tutto bene?",
    logbook: "Diario",
    last7: "Ultimi 7 giorni",
    average: "Media",
    gmi: "GMI",
    entries: [
      { time: "13:36", kind: "insulin", text: "5,5 U · bolo" },
      { time: "13:30", kind: "carbs", text: "45 g · pranzo" },
      { time: "12:58", kind: "glucose", text: "142 mg/dL" },
      { time: "08:10", kind: "insulin", text: "4 U · bolo" },
      { time: "08:02", kind: "carbs", text: "30 g · colazione" },
      { time: "07:40", kind: "glucose", text: "104 mg/dL" },
    ],
    addEntry: "Aggiungi",
    units: "U",
    trends: "Andamento",
    days: "giorni",
    tirTarget: "Obiettivo 70%",
    morning: "Mattina",
    afternoon: "Pomeriggio",
    night: "Notte",
    health: "Salute di Apple",
    healthSub: "Dulce legge questi dati per avere tutto in un unico posto.",
    readOnly: "Sola lettura",
    healthRows: ["Glicemia", "Carboidrati", "Insulina"],
    connected: "Connesso",
    weekday: (d) => `${itDays[d.getDay()]} ${d.getDate()} ${itMonths[d.getMonth()]}`,
    parentName: "Giulia",
    followerAlert: (name) => `${name} · glicemia bassa`,
    sample: "Dati di esempio",
  },
};
