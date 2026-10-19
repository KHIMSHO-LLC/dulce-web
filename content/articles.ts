/**
 * Every article on the site. Single source of truth for slugs, titles, dates
 * and authors: the blog index, article pages, author pages, sitemap and
 * JSON-LD all read from here. The body of each article is
 * content/articles/<id>/<locale>.mdx.
 *
 * Adding an article: append an entry (newest last), write the three MDX files,
 * link to it from at least two related articles (`related` + an <ArticleLink>
 * in the body), then run `npm run check:content`.
 *
 * Rules (see content/README.md): only describe what the released app does,
 * real dates (never future), a named author, sources for any medical number.
 */
import type { AppLocale } from "@/i18n/routing";
import type { AuthorId } from "./authors";

export type Localized<T = string> = Record<AppLocale, T>;

export type ArticleCategory = "guide" | "health" | "help";

export type Article = {
  /** Stable id: folder name in content/articles and the App Store campaign (`blog_<id>`). */
  id: string;
  category: ArticleCategory;
  author: AuthorId;
  /** YYYY-MM-DD, never in the future. */
  datePublished: string;
  dateModified: string;
  /** URL slug per language (lowercase, hyphens, no accents). */
  slug: Localized;
  /** <title> and H1. Keep under ~60 characters where possible. */
  title: Localized;
  /** Meta description and card text. 120-160 characters. */
  description: Localized;
  /** The search queries this article is written to answer (from Search Console / autocomplete). */
  keywords: Localized<string[]>;
  /** Image under /public, used for the card, OpenGraph and the article schema. */
  image: string;
  imageAlt: Localized;
  related: string[];
};

export const CATEGORY_LABEL: Record<ArticleCategory, Localized> = {
  guide: { es: "Guía de Dulce", en: "Dulce guide", de: "Dulce-Ratgeber" },
  health: { es: "Salud", en: "Health", de: "Gesundheit" },
  help: { es: "Ayuda", en: "Help", de: "Hilfe" },
};

export const ARTICLES: readonly Article[] = [
  {
    id: "apple-watch",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-07-08",
    dateModified: "2026-10-19",
    slug: {
      es: "como-ver-glucosa-cgm-en-apple-watch",
      en: "how-to-see-cgm-glucose-on-apple-watch",
      de: "libre-blutzucker-auf-der-apple-watch",
    },
    title: {
      es: "Cómo ver tu glucosa del FreeStyle Libre en el Apple Watch",
      en: "How to see your FreeStyle Libre glucose on Apple Watch",
      de: "FreeStyle Libre Blutzucker auf der Apple Watch anzeigen",
    },
    description: {
      es: "Pon tu glucosa del Libre 2 o Libre 3 en la esfera del Apple Watch con LibreLinkUp y Dulce: complicaciones, gráfica y por qué a veces se queda congelada.",
      en: "Put your Libre 2 or Libre 3 glucose on your Apple Watch face with LibreLinkUp and Dulce: complications, the chart, and why watch readings sometimes freeze.",
      de: "So kommt dein Libre 2 oder Libre 3 Wert mit LibreLinkUp und Dulce aufs Zifferblatt der Apple Watch: Komplikationen, Verlauf und warum Werte manchmal hängen.",
    },
    keywords: {
      es: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "glucosa apple watch", "app glucosa apple watch"],
      en: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "cgm apple watch", "glucose apple watch complication"],
      de: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "blutzucker apple watch", "cgm apple watch"],
    },
    image: "/guides/apple-watch-1.jpg",
    imageAlt: {
      es: "Complicación de Dulce en la esfera del Apple Watch con glucosa 91 y gráfica",
      en: "Dulce complication on an Apple Watch face showing glucose 91 with a chart",
      de: "Dulce-Komplikation auf dem Zifferblatt der Apple Watch mit Glukose 91 und Verlauf",
    },
    related: ["lock-screen", "alerts", "librelinkup-not-working"],
  },
  {
    id: "time-in-range",
    category: "health",
    author: "giorgi",
    datePublished: "2026-07-12",
    dateModified: "2026-10-19",
    slug: {
      es: "tiempo-en-rango-vs-hba1c",
      en: "time-in-range-vs-a1c",
      de: "zeit-im-zielbereich-vs-hba1c",
    },
    title: {
      es: "Tiempo en rango vs. HbA1c: qué mide cada uno y cuál mirar",
      en: "Time in range vs. A1C: what each measures and which to watch",
      de: "Zeit im Zielbereich vs. HbA1c: Was beides misst und worauf du achtest",
    },
    description: {
      es: "Qué es el tiempo en rango (70-180 mg/dL), los objetivos del consenso internacional, qué es el GMI y por qué tu HbA1c no cuenta toda la historia.",
      en: "What time in range (70-180 mg/dL) is, the international consensus targets, what GMI means, and why your A1C doesn't tell the whole story.",
      de: "Was Zeit im Zielbereich (70-180 mg/dL) ist, die Zielwerte des internationalen Konsens, was der GMI bedeutet und warum dein HbA1c nicht alles verrät.",
    },
    keywords: {
      es: ["tiempo en rango", "tiempo en rango diabetes", "hemoglobina glicosilada", "gmi diabetes", "tiempo en rango objetivo"],
      en: ["time in range", "time in range vs a1c", "time in range diabetes", "gmi vs a1c", "glucose management indicator"],
      de: ["zeit im zielbereich", "time in range diabetes", "hba1c", "gmi diabetes", "zeit im zielbereich ziel"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce con glucosa y barra de tiempo en rango",
      en: "Dulce home screen with glucose and the time in range bar",
      de: "Startbildschirm von Dulce mit Glukose und Balken für die Zeit im Zielbereich",
    },
    related: ["trends", "alerts", "logbook"],
  },
  {
    id: "family-sharing",
    category: "guide",
    author: "levan",
    datePublished: "2026-07-16",
    dateModified: "2026-10-19",
    slug: {
      es: "compartir-glucosa-cgm-con-familia",
      en: "sharing-cgm-glucose-with-family",
      de: "blutzucker-mit-der-familie-teilen",
    },
    title: {
      es: "Cómo compartir tu glucosa del Libre con tu familia",
      en: "How to share your Libre glucose with your family",
      de: "So teilst du deinen Libre Blutzucker mit deiner Familie",
    },
    description: {
      es: "Comparte tus lecturas del FreeStyle Libre en tiempo real con hasta 3 familiares en Dulce: invitación por enlace, avisos para ellos y el botón «Estoy bien».",
      en: "Share your FreeStyle Libre readings in real time with up to 3 family members in Dulce: invite by link, alerts for them, and the one-tap “I'm OK” reply.",
      de: "Teile deine FreeStyle Libre Werte in Echtzeit mit bis zu 3 Familienmitgliedern in Dulce: Einladung per Link, Warnungen für sie und die schnelle Antwort „Mir geht es gut“.",
    },
    keywords: {
      es: ["compartir glucosa familia", "compartir libre con familia", "seguir glucosa hijo", "librelinkup familia", "ver glucosa de mi hijo"],
      en: ["share libre with family", "share glucose with family", "follow libre", "monitor child glucose remotely", "librelinkup follower"],
      de: ["libre teilen", "blutzucker familie teilen", "libre familie", "blutzucker kind überwachen", "librelinkup follower"],
    },
    image: "/guides/family-followers.jpg",
    imageAlt: {
      es: "Lista de seguidores de Dulce con un mensaje para revisar la glucosa y el botón Estoy bien",
      en: "Dulce followers list with a “Check your glucose” message and the I'm OK button",
      de: "Follower-Liste in Dulce mit einer Nachricht zum Zucker-Check und der Antwort „Mir geht es gut“",
    },
    related: ["alerts", "lock-screen", "librelinkup-not-working"],
  },
  {
    id: "lock-screen",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    slug: {
      es: "glucosa-libre-en-pantalla-de-bloqueo-iphone",
      en: "libre-glucose-on-iphone-lock-screen",
      de: "libre-blutzucker-auf-dem-iphone-sperrbildschirm",
    },
    title: {
      es: "Tu glucosa del Libre en la pantalla de bloqueo y la Dynamic Island",
      en: "Your Libre glucose on the iPhone Lock Screen and Dynamic Island",
      de: "Dein Libre Blutzucker auf dem Sperrbildschirm und in der Dynamic Island",
    },
    description: {
      es: "Cómo ver tu glucosa del FreeStyle Libre en la pantalla de bloqueo del iPhone sin desbloquearlo: Actividad en vivo, Dynamic Island, estilos y límites de iOS.",
      en: "How to see your FreeStyle Libre glucose on the iPhone Lock Screen without unlocking: Live Activity, Dynamic Island, the styles and the iOS limits to know.",
      de: "So siehst du deinen FreeStyle Libre Wert auf dem iPhone-Sperrbildschirm ohne Entsperren: Live-Aktivität, Dynamic Island, Stile und die Grenzen von iOS.",
    },
    keywords: {
      es: ["libre pantalla de bloqueo", "glucosa pantalla de bloqueo", "libre 3 isla dinamica", "dynamic island glucosa", "freestyle libre iphone"],
      en: ["libre lock screen", "libre 3 lock screen", "libre live activity", "libre dynamic island", "glucose lock screen iphone"],
      de: ["libre sperrbildschirm", "blutzucker sperrbildschirm", "libre live aktivität", "dynamic island blutzucker", "libre 3 iphone"],
    },
    image: "/guides/lock-screen-alerts-watch.jpg",
    imageAlt: {
      es: "Pantalla de bloqueo del iPhone con la Actividad en vivo de Dulce mostrando 120 mg/dL y avisos de glucosa",
      en: "iPhone Lock Screen with the Dulce Live Activity showing 120 mg/dL and glucose alerts",
      de: "iPhone-Sperrbildschirm mit der Live-Aktivität von Dulce, 120 mg/dL und Glukosewarnungen",
    },
    related: ["widgets", "apple-watch", "alerts"],
  },
  {
    id: "widgets",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    slug: {
      es: "widget-libre-para-iphone",
      en: "libre-widget-for-iphone",
      de: "libre-widget-fuer-das-iphone",
    },
    title: {
      es: "Widget del FreeStyle Libre para iPhone: inicio, bloqueo y StandBy",
      en: "FreeStyle Libre widget for iPhone: Home Screen, Lock Screen, StandBy",
      de: "FreeStyle Libre Widget fürs iPhone: Home, Sperrbildschirm, StandBy",
    },
    description: {
      es: "La app de Libre no trae widget. Así añades un widget de glucosa del Libre 2 o Libre 3 a la pantalla de inicio, la de bloqueo y el modo StandBy del iPhone.",
      en: "The Libre app has no widget. Here is how to add a Libre 2 or Libre 3 glucose widget to your iPhone Home Screen, Lock Screen and StandBy mode.",
      de: "Die Libre-App hat kein Widget. So fügst du ein Libre 2 oder Libre 3 Glukose-Widget zum Home-Bildschirm, Sperrbildschirm und StandBy deines iPhones hinzu.",
    },
    keywords: {
      es: ["widget libre iphone", "freestyle libre 3 widget iphone", "libre widget", "widget glucosa iphone", "freestyle libre 2 widget"],
      en: ["libre widget iphone", "freestyle libre 3 widget", "libre widget", "glucose widget iphone", "cgm widget iphone"],
      de: ["libre widget", "libre 3 widget iphone", "blutzucker widget", "glukose widget", "freestyle libre widget"],
    },
    image: "/guides/widgets-everywhere.jpg",
    imageAlt: {
      es: "Widgets de Dulce: Dynamic Island, pantalla de bloqueo, pantalla de inicio y Apple Watch",
      en: "Dulce widgets: Dynamic Island, Lock Screen, Home Screen and Apple Watch",
      de: "Dulce-Widgets: Dynamic Island, Sperrbildschirm, Home-Bildschirm und Apple Watch",
    },
    related: ["lock-screen", "apple-watch", "librelinkup-not-working"],
  },
  {
    id: "alerts",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    slug: {
      es: "alarmas-de-glucosa-en-el-iphone",
      en: "glucose-alerts-on-iphone",
      de: "blutzucker-alarme-auf-dem-iphone",
    },
    title: {
      es: "Alarmas de glucosa en el iPhone: bajas, altas y la que suena en silencio",
      en: "Glucose alerts on iPhone: lows, highs and the one that rings on silent",
      de: "Blutzucker-Alarme am iPhone: tief, hoch und trotz Stummschaltung",
    },
    description: {
      es: "Cómo configurar avisos de glucosa baja y alta en Dulce, la alarma crítica que suena con el móvil en silencio, las horas de silencio y el aviso predictivo.",
      en: "How to set low and high glucose alerts in Dulce, the critical alarm that rings with your phone on silent, quiet hours, and the predictive low alert.",
      de: "So stellst du Warnungen für niedrige und hohe Glukose in Dulce ein: der kritische Alarm trotz Stummschaltung, Ruhezeiten und die vorausschauende Tief-Warnung.",
    },
    keywords: {
      es: ["alarma glucosa baja", "libre alarmas", "alarma de glucosa", "libre 3 alarma", "alarma glucosa modo silencio"],
      en: ["librelinkup alarms", "libre 3 alarms", "glucose alarm silent mode iphone", "low glucose alert", "cgm alerts iphone"],
      de: ["libre alarm", "libre 3 alarm einstellen", "unterzuckerung alarm", "blutzucker alarm iphone", "librelinkup alarm"],
    },
    image: "/guides/lock-screen-alerts-watch.jpg",
    imageAlt: {
      es: "Avisos de Dulce en la pantalla de bloqueo: glucosa muy baja y glucosa baja",
      en: "Dulce alerts on the Lock Screen: glucose very low and low glucose",
      de: "Dulce-Warnungen auf dem Sperrbildschirm: Glukose sehr niedrig und Glukose niedrig",
    },
    related: ["family-sharing", "lock-screen", "apple-watch"],
  },
  {
    id: "librelinkup-not-working",
    category: "help",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    slug: {
      es: "librelinkup-no-funciona",
      en: "librelinkup-not-working",
      de: "librelinkup-funktioniert-nicht",
    },
    title: {
      es: "LibreLinkUp no funciona: sin datos, no se actualiza o no inicia sesión",
      en: "LibreLinkUp not working: no data, not updating or can't log in",
      de: "LibreLinkUp funktioniert nicht: keine Daten, keine Updates, kein Login",
    },
    description: {
      es: "Soluciones paso a paso cuando LibreLinkUp no muestra datos, no se actualiza o rechaza tu contraseña, y qué revisar en el móvil de quien lleva el sensor.",
      en: "Step-by-step fixes when LibreLinkUp shows no data, stops updating or rejects your password, and what to check on the phone of the person wearing the sensor.",
      de: "Schritt-für-Schritt-Lösungen, wenn LibreLinkUp keine Daten zeigt, nicht aktualisiert oder dein Passwort ablehnt, und was du am Handy des Sensorträgers prüfst.",
    },
    keywords: {
      es: ["librelinkup no funciona", "librelinkup no muestra datos", "librelinkup no se actualiza", "librelinkup login", "librelink vs librelinkup"],
      en: ["librelinkup not working", "librelinkup no data", "librelinkup not updating", "librelinkup login", "librelink vs librelinkup"],
      de: ["librelinkup funktioniert nicht", "librelinkup keine daten", "librelinkup aktualisiert nicht", "librelinkup login", "librelink librelinkup unterschied"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce recibiendo lecturas de LibreLinkUp",
      en: "Dulce home screen receiving readings from LibreLinkUp",
      de: "Startbildschirm von Dulce mit Werten aus LibreLinkUp",
    },
    related: ["widgets", "family-sharing", "apple-watch"],
  },
  {
    id: "trends",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    slug: {
      es: "tendencias-glucosa-tiempo-en-rango-gmi",
      en: "glucose-trends-time-in-range-gmi",
      de: "glukose-trends-zeit-im-zielbereich-gmi",
    },
    title: {
      es: "Tendencias en Dulce: tiempo en rango, media y GMI de tu Libre",
      en: "Trends in Dulce: time in range, average and GMI from your Libre",
      de: "Trends in Dulce: Zeit im Zielbereich, Mittelwert und GMI deines Libre",
    },
    description: {
      es: "Cómo leer la pestaña Tendencias de Dulce: tiempo en rango de 7 a 90 días, glucosa media, GMI y el reparto por mañana, tarde y noche para ver patrones.",
      en: "How to read the Trends tab in Dulce: time in range over 7 to 90 days, average glucose, GMI, and the morning, afternoon and night split that reveals patterns.",
      de: "So liest du den Trends-Tab in Dulce: Zeit im Zielbereich über 7 bis 90 Tage, Mittelwert, GMI und die Aufteilung nach Morgen, Nachmittag und Nacht.",
    },
    keywords: {
      es: ["tiempo en rango libre", "gmi libre", "glucosa media", "patrones de glucosa", "informe glucosa libre"],
      en: ["libre time in range", "gmi calculator", "average glucose", "glucose patterns", "cgm report"],
      de: ["zeit im zielbereich libre", "gmi", "durchschnittlicher blutzucker", "glukose muster", "cgm auswertung"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Dulce con la gráfica de 12 horas y el tiempo en rango",
      en: "Dulce with the 12-hour chart and time in range",
      de: "Dulce mit dem 12-Stunden-Verlauf und der Zeit im Zielbereich",
    },
    related: ["time-in-range", "logbook", "apple-health"],
  },
  {
    id: "logbook",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    slug: {
      es: "diario-de-diabetes-hidratos-e-insulina",
      en: "diabetes-logbook-carbs-and-insulin",
      de: "diabetes-tagebuch-kohlenhydrate-und-insulin",
    },
    title: {
      es: "Diario de diabetes: apunta hidratos e insulina junto a tu Libre",
      en: "Diabetes logbook: log carbs and insulin next to your Libre",
      de: "Diabetes-Tagebuch: Kohlenhydrate und Insulin neben deinem Libre",
    },
    description: {
      es: "Cómo registrar hidratos, insulina y glucosa capilar en segundos en el Diario de Dulce y verlos en una sola línea de tiempo con las lecturas del sensor.",
      en: "How to log carbs, insulin and fingerstick glucose in seconds in the Dulce Logbook and see them on one timeline with your sensor readings.",
      de: "So trägst du Kohlenhydrate, Insulin und blutige Messungen in Sekunden ins Dulce-Tagebuch ein und siehst sie auf einer Zeitleiste mit den Sensorwerten.",
    },
    keywords: {
      es: ["diario diabetes app", "app diabetes tipo 1", "registro insulina app", "contar hidratos app", "diario glucosa"],
      en: ["diabetes logbook app", "insulin log app", "carb tracker diabetes", "type 1 diabetes app", "blood sugar log"],
      de: ["diabetes tagebuch app", "insulin tagebuch", "kohlenhydrate app diabetes", "diabetes app", "blutzucker tagebuch"],
    },
    image: "/guides/logbook.jpg",
    imageAlt: {
      es: "Diario de Dulce con registros de insulina e hidratos y el panel para añadir 5,5 u",
      en: "Dulce Logbook with insulin and carb entries and the add-entry sheet at 5.5 u",
      de: "Dulce-Tagebuch mit Insulin- und Kohlenhydrat-Einträgen und dem Eingabefeld mit 5,5 IE",
    },
    related: ["trends", "apple-health", "time-in-range"],
  },
  {
    id: "apple-health",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    slug: {
      es: "freestyle-libre-y-apple-salud",
      en: "freestyle-libre-and-apple-health",
      de: "freestyle-libre-und-apple-health",
    },
    title: {
      es: "FreeStyle Libre y Apple Salud: qué datos se pueden ver juntos",
      en: "FreeStyle Libre and Apple Health: what you can see together",
      de: "FreeStyle Libre und Apple Health: Welche Daten zusammenkommen",
    },
    description: {
      es: "Cómo funciona Apple Salud con tu glucosa, qué lee Dulce (glucosa, insulina e hidratos), qué no escribe y cómo dar o quitar el permiso en el iPhone.",
      en: "How Apple Health works with your glucose, what Dulce reads (glucose, insulin and carbs), what it never writes, and how to grant or revoke access on iPhone.",
      de: "Wie Apple Health mit deinem Blutzucker funktioniert, was Dulce liest (Glukose, Insulin, Kohlenhydrate), was es nie schreibt und wie du den Zugriff steuerst.",
    },
    keywords: {
      es: ["libre apple salud", "freestyle libre apple health", "glucosa apple salud", "libre 3 apple health", "insulina apple salud"],
      en: ["freestyle libre apple health", "libre 3 apple health", "glucose apple health", "librelinkup apple health", "insulin apple health"],
      de: ["libre apple health", "freestyle libre apple health", "blutzucker apple health", "libre 3 apple health", "insulin apple health"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce con botones de hidratos e insulina",
      en: "Dulce home screen with the carbs and insulin buttons",
      de: "Startbildschirm von Dulce mit den Schaltflächen für Kohlenhydrate und Insulin",
    },
    related: ["logbook", "trends", "apple-watch"],
  },
];

export function getArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

export function articleBySlug(locale: AppLocale, slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug[locale] === slug);
}

/** Newest first, by publish date then registry order. */
export function articlesNewestFirst(): Article[] {
  return [...ARTICLES]
    .map((a, i) => ({ a, i }))
    .sort((x, y) => y.a.datePublished.localeCompare(x.a.datePublished) || y.i - x.i)
    .map(({ a }) => a);
}
