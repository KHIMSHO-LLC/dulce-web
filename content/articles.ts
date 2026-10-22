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

/**
 * One "Quick questions" entry. Rendered at the end of the article and emitted
 * as FAQPage JSON-LD, so `q` and `a` are plain text (no Markdown) and the
 * first sentence of `a` answers the question outright. `link` is an optional
 * article id shown as "Read more" under the answer.
 */
export type FaqEntry = { q: string; a: string; link?: string };

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
  /** Quick questions, same count and order in every language. */
  faq?: Localized<FaqEntry[]>;
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
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Cómo veo la glucosa de mi FreeStyle Libre en el Apple Watch?", a: "Con una app que lea tu cuenta de LibreLinkUp, como Dulce. Inicia sesión en Dulce con tu cuenta de LibreLinkUp, activa Apple Watch en Ajustes (función de Dulce Pro, con 14 días de prueba gratis) y añade la complicación de Dulce a tu esfera." },
        { q: "¿Necesito un Apple Watch con datos móviles?", a: "No. Funciona con cualquier Apple Watch emparejado con tu iPhone." },
        { q: "¿Puedo ver en el reloj la glucosa de mi hijo?", a: "El reloj muestra la glucosa de la cuenta conectada en tu iPhone. Para seguir la glucosa de tu hijo desde tu móvil, con avisos y pantalla de bloqueo, hazte seguidor suyo en Dulce.", link: "child-glucose" },
        { q: "¿Puedo ver la glucosa también en la pantalla de bloqueo del iPhone?", a: "Sí, con la Live Activity de Dulce, que muestra tu glucosa en la pantalla de bloqueo y en la Dynamic Island.", link: "lock-screen" },
      ],
      en: [
        { q: "How do I see my FreeStyle Libre glucose on my Apple Watch?", a: "With an app that reads your LibreLinkUp account, like Dulce. Sign in to Dulce with your LibreLinkUp account, turn on Apple Watch in Settings (a Dulce Pro feature with a 14-day free trial) and add the Dulce complication to your watch face." },
        { q: "Do I need a cellular Apple Watch?", a: "No. It works with any Apple Watch paired with your iPhone." },
        { q: "Can I see my child's glucose on my watch?", a: "The watch shows the glucose of the account connected on your iPhone. To follow your child's glucose from your phone, with alerts and the Lock Screen, become their follower in Dulce.", link: "child-glucose" },
        { q: "Can I also see my glucose on the iPhone Lock Screen?", a: "Yes, with Dulce's Live Activity, which shows your glucose on the Lock Screen and in the Dynamic Island.", link: "lock-screen" },
      ],
      de: [
        { q: "Wie sehe ich meinen FreeStyle Libre Wert auf der Apple Watch?", a: "Mit einer App, die dein LibreLinkUp-Konto liest, zum Beispiel Dulce. Melde dich in Dulce mit deinem LibreLinkUp-Konto an, schalte in den Einstellungen Apple Watch ein (eine Dulce Pro Funktion mit 14 Tagen Gratis-Test) und füge die Dulce-Komplikation zu deinem Zifferblatt hinzu." },
        { q: "Brauche ich eine Apple Watch mit Mobilfunk?", a: "Nein. Es funktioniert mit jeder Apple Watch, die mit deinem iPhone gekoppelt ist." },
        { q: "Kann ich den Zucker meines Kindes auf der Uhr sehen?", a: "Die Uhr zeigt den Zucker des Kontos, das auf deinem iPhone verbunden ist. Um den Zucker deines Kindes auf deinem Handy zu verfolgen, mit Warnungen und Sperrbildschirm, folgst du ihm in Dulce.", link: "child-glucose" },
        { q: "Kann ich den Wert auch auf dem iPhone-Sperrbildschirm sehen?", a: "Ja, mit der Live-Aktivität von Dulce, die deinen Zucker auf dem Sperrbildschirm und in der Dynamic Island zeigt.", link: "lock-screen" },
      ],
    },
  },
  {
    id: "time-in-range",
    category: "health",
    author: "giorgi",
    datePublished: "2026-07-12",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Qué es un buen tiempo en rango?", a: "Más del 70% entre 70 y 180 mg/dL para la mayoría de adultos con diabetes tipo 1 o tipo 2, según el consenso internacional de 2019, con menos del 4% por debajo de 70 y menos del 1% por debajo de 54. Tu equipo médico puede fijarte otros objetivos." },
        { q: "¿A qué HbA1c equivale un 70% de tiempo en rango?", a: "Aproximadamente a una HbA1c del 7%, según el mismo consenso. Es una aproximación: la HbA1c es un análisis de sangre y puede no coincidir." },
        { q: "¿Cuántos días de datos necesito?", a: "Al menos 14 días, con el sensor puesto el 70% del tiempo, según el consenso. Un solo día dice muy poco.", link: "trends" },
      ],
      en: [
        { q: "What is a good time in range?", a: "Over 70% between 70 and 180 mg/dL for most adults with type 1 or type 2 diabetes, according to the 2019 international consensus, with under 4% below 70 and under 1% below 54. Your care team may set different targets." },
        { q: "What A1C does 70% time in range correspond to?", a: "Roughly an A1C of 7%, according to the same consensus. It's an approximation: A1C is a blood test and may not match." },
        { q: "How many days of data do I need?", a: "At least 14 days, with the sensor worn 70% of the time, according to the consensus. A single day says very little.", link: "trends" },
      ],
      de: [
        { q: "Was ist eine gute Zeit im Zielbereich?", a: "Über 70% zwischen 70 und 180 mg/dL für die meisten Erwachsenen mit Typ-1- oder Typ-2-Diabetes, laut dem internationalen Konsens von 2019, mit unter 4% unter 70 und unter 1% unter 54. Dein Diabetes-Team kann andere Ziele festlegen." },
        { q: "Welchem HbA1c entsprechen 70% Zeit im Zielbereich?", a: "Ungefähr einem HbA1c von 7%, laut demselben Konsens. Das ist eine Annäherung: Der HbA1c ist ein Bluttest und kann abweichen." },
        { q: "Wie viele Tage Daten brauche ich?", a: "Mindestens 14 Tage, bei denen der Sensor 70% der Zeit getragen wurde, laut dem Konsens. Ein einzelner Tag sagt sehr wenig.", link: "trends" },
      ],
    },
  },
  {
    id: "family-sharing",
    category: "guide",
    author: "levan",
    datePublished: "2026-07-16",
    dateModified: "2026-10-22",
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
      es: ["compartir glucosa familia", "compartir libre con familia", "librelinkup familia", "compartir glucosa libre"],
      en: ["share libre with family", "share glucose with family", "follow libre", "librelinkup follower"],
      de: ["libre teilen", "blutzucker familie teilen", "libre familie", "librelinkup follower"],
    },
    image: "/guides/family-followers.jpg",
    imageAlt: {
      es: "Lista de seguidores de Dulce con un mensaje para revisar la glucosa y el botón Estoy bien",
      en: "Dulce followers list with a “Check your glucose” message and the I'm OK button",
      de: "Follower-Liste in Dulce mit einer Nachricht zum Zucker-Check und der Antwort „Mir geht es gut“",
    },
    related: ["alerts", "lock-screen", "librelinkup-not-working"],
    faq: {
      es: [
        { q: "¿Cómo puede mi familia ver la glucosa de mi FreeStyle Libre?", a: "Invitándoles desde Dulce. Ve a Ajustes, Seguidores, Invitar a alguien, y mándales el enlace o el código. Instalan Dulce gratis y ven tu glucosa en tiempo real, sin sensor ni cuenta de Abbott." },
        { q: "¿Cuántas personas pueden seguirme y cuánto cuesta?", a: "Hasta 3 personas. Compartir es una función de Dulce Pro para quien lleva el sensor, con 14 días de prueba gratis; los seguidores no pagan nada." },
        { q: "¿Mis seguidores reciben avisos de hipo e hiper?", a: "Sí. Cada seguidor tiene sus propios avisos de glucosa baja y alta, con sus propias horas tranquilas, y las bajadas muy fuertes siempre le llegan. También puede tenerte en su pantalla de bloqueo con una Live Activity.", link: "alerts" },
        { q: "¿Mis seguidores pueden mandarme mensajes?", a: "Sí, mensajes cortos. Un seguidor puede mandarte “¿Estás bien?”, “Revisa tu glucosa” o un texto suyo; te llega como notificación y respondes “Estoy bien” con un toque. Puedes desactivar los mensajes de la familia en Ajustes.", link: "child-glucose" },
      ],
      en: [
        { q: "How can my family see my FreeStyle Libre glucose?", a: "Invite them from Dulce. Go to Settings, Followers, Invite someone, and send them the link or the code. They install Dulce for free and see your glucose in real time, with no sensor and no Abbott account." },
        { q: "How many people can follow me, and what does it cost?", a: "Up to 3 people. Sharing is a Dulce Pro feature for the person wearing the sensor, with a 14-day free trial; followers pay nothing." },
        { q: "Do my followers get low and high alerts?", a: "Yes. Each follower has their own low and high alerts, with their own quiet hours, and very low readings always reach them. They can also have you on their Lock Screen with a Live Activity.", link: "alerts" },
        { q: "Can my followers send me messages?", a: "Yes, short ones. A follower can send “Are you OK?”, “Check your glucose” or their own text; it arrives as a notification and you reply “I'm OK” with one tap. You can turn off messages from family in Settings.", link: "child-glucose" },
      ],
      de: [
        { q: "Wie kann meine Familie meinen FreeStyle Libre Wert sehen?", a: "Lade sie in Dulce ein. Geh zu Einstellungen, Follower, Jemanden einladen, und schick ihnen den Link oder den Code. Sie installieren Dulce kostenlos und sehen deinen Zucker in Echtzeit, ohne Sensor und ohne Abbott-Konto." },
        { q: "Wie viele Personen können mir folgen, und was kostet das?", a: "Bis zu 3 Personen. Teilen ist eine Dulce Pro Funktion für die Person mit dem Sensor, mit 14 Tagen Gratis-Test; Follower zahlen nichts." },
        { q: "Bekommen meine Follower Warnungen bei Unter- und Überzucker?", a: "Ja. Jeder Follower hat eigene Warnungen für niedrige und hohe Werte, mit eigenen Ruhezeiten, und sehr niedrige Werte kommen immer an. Sie können dich auch mit einer Live-Aktivität auf ihrem Sperrbildschirm haben.", link: "alerts" },
        { q: "Können mir meine Follower Nachrichten schicken?", a: "Ja, kurze. Ein Follower kann dir „Geht es dir gut?“, „Überprüfe deinen Glukosewert“ oder einen eigenen Text schicken; er kommt als Mitteilung an, und du antwortest mit einem Tipp „Mir geht es gut“. Familien-Nachrichten kannst du in den Einstellungen ausschalten.", link: "child-glucose" },
      ],
    },
  },
  {
    id: "lock-screen",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Cómo pongo la glucosa del Libre en la pantalla de bloqueo del iPhone?", a: "Con una Live Activity, porque la app de Libre no la muestra ahí. En Dulce, conecta tu cuenta de LibreLinkUp, activa Live Activity e isla dinámica en Ajustes y permite las Live Activities de Dulce en los Ajustes del iPhone." },
        { q: "¿Cada cuánto se actualiza la Live Activity?", a: "Cada minuto con Dulce Pro, aunque el iPhone esté bloqueado y la app cerrada. El número solo puede ser tan reciente como la última lectura que subió la app de Libre del móvil del sensor, así que mira siempre la hora de la lectura." },
        { q: "¿Por qué desaparece la glucosa de la pantalla de bloqueo?", a: "Porque iOS cierra las Live Activities tras un número máximo de horas. Abre Dulce y vuelve. Si Dulce no puede actualizar tu pantalla de bloqueo durante un rato, te manda una notificación discreta para que abras la app." },
        { q: "¿Es gratis?", a: "La Live Activity es una función de Dulce Pro con 14 días de prueba gratis. Los widgets de glucosa para la pantalla de bloqueo y de inicio son gratis.", link: "widgets" },
      ],
      en: [
        { q: "How do I put my Libre glucose on the iPhone Lock Screen?", a: "With a Live Activity, because the Libre app doesn't show it there. In Dulce, connect your LibreLinkUp account, turn on Live Activity & Dynamic Island in Settings and allow Live Activities for Dulce in the iPhone Settings app." },
        { q: "How often does the Live Activity update?", a: "Every minute with Dulce Pro, even with the iPhone locked and the app closed. The number can only be as fresh as the last reading the Libre app on the sensor phone uploaded, so always check the reading time." },
        { q: "Why does my glucose disappear from the Lock Screen?", a: "Because iOS ends Live Activities after a maximum number of hours. Open Dulce and it comes back. If Dulce can't update your Lock Screen for a while, it sends you a quiet notification to open the app." },
        { q: "Is it free?", a: "The Live Activity is a Dulce Pro feature with a 14-day free trial. Glucose widgets for the Lock Screen and Home Screen are free.", link: "widgets" },
      ],
      de: [
        { q: "Wie bekomme ich meinen Libre Wert auf den iPhone-Sperrbildschirm?", a: "Mit einer Live-Aktivität, denn die Libre-App zeigt ihn dort nicht. Verbinde in Dulce dein LibreLinkUp-Konto, schalte in den Einstellungen die Live-Aktivität ein und erlaube Live-Aktivitäten für Dulce in den iPhone-Einstellungen." },
        { q: "Wie oft aktualisiert sich die Live-Aktivität?", a: "Jede Minute mit Dulce Pro, auch bei gesperrtem iPhone und geschlossener App. Der Wert ist nur so aktuell wie der letzte Wert, den die Libre-App auf dem Sensor-Handy hochgeladen hat, also schau immer auf die Uhrzeit." },
        { q: "Warum verschwindet mein Zucker vom Sperrbildschirm?", a: "Weil iOS Live-Aktivitäten nach einer Höchstzahl an Stunden beendet. Öffne Dulce, dann ist sie wieder da. Wenn Dulce deinen Sperrbildschirm eine Weile nicht aktualisieren kann, schickt es dir eine leise Mitteilung, die App zu öffnen." },
        { q: "Ist das kostenlos?", a: "Die Live-Aktivität ist eine Dulce Pro Funktion mit 14 Tagen Gratis-Test. Die Glukose-Widgets für Sperr- und Home-Bildschirm sind kostenlos.", link: "widgets" },
      ],
    },
  },
  {
    id: "widgets",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Hay un widget del FreeStyle Libre para iPhone?", a: "No de Abbott: LibreLink, Libre 3 y LibreLinkUp no tienen widget de glucosa. Dulce lee tus datos de LibreLinkUp y añade widgets para la pantalla de inicio, la pantalla de bloqueo y StandBy, gratis." },
        { q: "¿Cada cuánto se actualiza el widget de glucosa?", a: "Cuando iOS decide, no cada minuto. iOS limita los refrescos de los widgets para ahorrar batería, así que los widgets de Dulce muestran hace cuánto fue la lectura y tienen un botón para actualizar. Para un número que se actualice cada minuto, usa la Live Activity.", link: "lock-screen" },
        { q: "¿Puedo ver la glucosa en la mesilla por la noche?", a: "Sí, con StandBy. Pon el iPhone a cargar bloqueado y en horizontal, y añade el widget pequeño de Dulce a la vista de StandBy." },
      ],
      en: [
        { q: "Is there a FreeStyle Libre widget for iPhone?", a: "Not from Abbott: LibreLink, Libre 3 and LibreLinkUp have no glucose widget. Dulce reads your LibreLinkUp data and adds widgets for the Home Screen, Lock Screen and StandBy, for free." },
        { q: "How often does the glucose widget update?", a: "When iOS decides, not every minute. iOS limits widget refreshes to save battery, so Dulce's widgets show how long ago the reading was and have a refresh button. For a number that updates every minute, use the Live Activity.", link: "lock-screen" },
        { q: "Can I see my glucose on the nightstand at night?", a: "Yes, with StandBy. Charge your locked iPhone on its side in landscape and add the small Dulce widget to the StandBy view." },
      ],
      de: [
        { q: "Gibt es ein FreeStyle Libre Widget fürs iPhone?", a: "Nicht von Abbott: LibreLink, Libre 3 und LibreLinkUp haben kein Glukose-Widget. Dulce liest deine LibreLinkUp-Daten und bringt kostenlose Widgets für Home-Bildschirm, Sperrbildschirm und StandBy." },
        { q: "Wie oft aktualisiert sich das Glukose-Widget?", a: "Wann iOS entscheidet, nicht jede Minute. iOS begrenzt Widget-Aktualisierungen, um Akku zu sparen, deshalb zeigen die Dulce-Widgets, wie alt der Wert ist, und haben einen Aktualisieren-Knopf. Für einen Wert, der sich jede Minute aktualisiert, nimm die Live-Aktivität.", link: "lock-screen" },
        { q: "Kann ich meinen Zucker nachts auf dem Nachttisch sehen?", a: "Ja, mit StandBy. Lade dein gesperrtes iPhone quer auf und füge das kleine Dulce-Widget zur StandBy-Ansicht hinzu." },
      ],
    },
  },
  {
    id: "alerts",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Pueden sonar los avisos de glucosa con el iPhone en silencio?", a: "Solo el aviso de hipo crítica. Suena ante una bajada grave (55 mg/dL o menos) aunque el iPhone esté en silencio, en un modo de concentración o en horas tranquilas, siempre que permitas las Alertas críticas de Dulce en iOS." },
        { q: "¿Dulce sustituye las alarmas de la app de Libre?", a: "No. Mantén activadas las alarmas de tu FreeStyle Libre 2 o Libre 3. Dulce es una capa más, no un dispositivo médico." },
        { q: "¿Llegan los avisos con la app cerrada?", a: "Sí. El servidor de Dulce revisa tus lecturas de LibreLinkUp y te manda el aviso: cada minuto con Dulce Pro y cada 5 minutos con la versión gratuita." },
        { q: "¿Puede mi familia recibir mis avisos?", a: "Sí. Tus seguidores pueden recibir sus propios avisos cuando bajas o subes, con sus propias horas tranquilas, y las bajadas muy fuertes siempre les llegan.", link: "family-sharing" },
      ],
      en: [
        { q: "Can glucose alerts ring when my iPhone is on silent?", a: "Only the critical low alert. It rings on a severe low (55 mg/dL or less) even on silent, in a Focus or during quiet hours, as long as you allow Critical Alerts for Dulce in iOS." },
        { q: "Does Dulce replace the Libre app's alarms?", a: "No. Keep your FreeStyle Libre 2 or Libre 3 alarms on. Dulce is an extra layer, not a medical device." },
        { q: "Do alerts arrive with the app closed?", a: "Yes. Dulce's server checks your LibreLinkUp readings and sends you the alert: every minute with Dulce Pro and every 5 minutes with the free version." },
        { q: "Can my family get my alerts?", a: "Yes. Your followers can get their own alerts when you go low or high, with their own quiet hours, and very low readings always reach them.", link: "family-sharing" },
      ],
      de: [
        { q: "Können Zucker-Warnungen klingeln, wenn das iPhone stumm ist?", a: "Nur die kritische Unterzucker-Warnung. Sie klingelt bei einem schweren Unterzucker (55 mg/dL oder weniger) auch im Stumm-Modus, in einem Fokus oder in Ruhezeiten, wenn du Kritische Benachrichtigungen für Dulce in iOS erlaubst." },
        { q: "Ersetzt Dulce die Alarme der Libre-App?", a: "Nein. Lass die Alarme deines FreeStyle Libre 2 oder Libre 3 eingeschaltet. Dulce ist eine zusätzliche Ebene, kein Medizinprodukt." },
        { q: "Kommen die Warnungen auch bei geschlossener App?", a: "Ja. Der Server von Dulce prüft deine LibreLinkUp-Werte und schickt dir die Warnung: jede Minute mit Dulce Pro und alle 5 Minuten in der kostenlosen Version." },
        { q: "Kann meine Familie meine Warnungen bekommen?", a: "Ja. Deine Follower können eigene Warnungen bekommen, wenn du niedrig oder hoch bist, mit eigenen Ruhezeiten, und sehr niedrige Werte kommen immer bei ihnen an.", link: "family-sharing" },
      ],
    },
  },
  {
    id: "librelinkup-not-working",
    category: "help",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Por qué no puedo iniciar sesión en LibreLinkUp?", a: "Casi siempre porque estás escribiendo la contraseña de LibreLink. LibreLink y LibreLinkUp son apps distintas con cuentas distintas. Si has probado muchas veces seguidas, espera un minuto, y acepta las condiciones nuevas si la app te las pide." },
        { q: "¿Por qué LibreLinkUp no muestra datos?", a: "Porque nadie comparte todavía con esa cuenta. En el móvil de quien lleva el sensor, abre la app de Libre, entra en Apps conectadas, añade LibreLinkUp con el email exacto de la cuenta de LibreLinkUp y acepta la invitación en LibreLinkUp." },
        { q: "¿Por qué LibreLinkUp va con retraso o se queda congelado?", a: "Casi siempre porque el móvil del sensor no sube lecturas. Necesita internet, con Libre 3 el sensor tiene que estar al alcance del Bluetooth, y la app de Libre no debe cerrarse a la fuerza ni frenarse con el Modo de bajo consumo." },
        { q: "¿Funciona Dulce si LibreLinkUp no recibe datos?", a: "No. Dulce recibe tus lecturas a través de LibreLinkUp, así que si LibreLinkUp no recibe nada, Dulce tampoco. Dulce sí te muestra hace cuánto fue la última lectura y te avisa al iniciar sesión si usas la cuenta equivocada.", link: "family-sharing" },
      ],
      en: [
        { q: "Why can't I log in to LibreLinkUp?", a: "Almost always because you're typing your LibreLink password. LibreLink and LibreLinkUp are separate apps with separate accounts. If you've tried many times in a row, wait a minute, and accept any new terms the app asks for." },
        { q: "Why does LibreLinkUp show no data?", a: "Because nobody is sharing with that account yet. On the phone of the person wearing the sensor, open the Libre app, go to Connected Apps, add LibreLinkUp with the exact email of the LibreLinkUp account and accept the invitation in LibreLinkUp." },
        { q: "Why is LibreLinkUp delayed or frozen?", a: "Almost always because the sensor phone isn't uploading. It needs internet, with Libre 3 the sensor must be within Bluetooth range, and the Libre app must not be force-quit or slowed down by Low Power Mode." },
        { q: "Does Dulce work if LibreLinkUp gets no data?", a: "No. Dulce receives your readings through LibreLinkUp, so if LibreLinkUp gets nothing, neither does Dulce. Dulce does show how long ago the last reading was and tells you at sign-in if you're using the wrong account.", link: "family-sharing" },
      ],
      de: [
        { q: "Warum kann ich mich bei LibreLinkUp nicht anmelden?", a: "Fast immer, weil du das Passwort von LibreLink eingibst. LibreLink und LibreLinkUp sind getrennte Apps mit getrennten Konten. Nach vielen Versuchen hintereinander warte eine Minute, und akzeptiere neue Bedingungen, wenn die App danach fragt." },
        { q: "Warum zeigt LibreLinkUp keine Daten?", a: "Weil noch niemand mit diesem Konto teilt. Öffne auf dem Handy der Person mit dem Sensor die Libre-App, geh zu Verbundene Apps, füge LibreLinkUp mit genau der E-Mail des LibreLinkUp-Kontos hinzu und nimm die Einladung in LibreLinkUp an." },
        { q: "Warum ist LibreLinkUp verzögert oder hängt?", a: "Fast immer, weil das Sensor-Handy keine Werte hochlädt. Es braucht Internet, beim Libre 3 muss der Sensor in Bluetooth-Reichweite sein, und die Libre-App darf weder zwangsbeendet noch vom Stromsparmodus gebremst werden." },
        { q: "Funktioniert Dulce, wenn LibreLinkUp keine Daten bekommt?", a: "Nein. Dulce bekommt deine Werte über LibreLinkUp, also bekommt Dulce nichts, wenn LibreLinkUp nichts bekommt. Dulce zeigt dir aber, wie alt der letzte Wert ist, und sagt dir bei der Anmeldung, wenn du das falsche Konto nutzt.", link: "family-sharing" },
      ],
    },
  },
  {
    id: "trends",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Qué muestra la pestaña Tendencias de Dulce?", a: "Tu tiempo en rango, tu glucosa media y una HbA1c estimada (GMI) para 7, 14, 30 o 90 días, cada una comparada con el periodo anterior, además del desglose por día y por franja del día." },
        { q: "¿Por qué la HbA1c estimada no coincide con la del análisis?", a: "Porque es el GMI, calculado a partir de la glucosa media del sensor, mientras que la HbA1c es un análisis de sangre. Es normal que no coincidan del todo.", link: "time-in-range" },
        { q: "¿Puedo cambiar el rango objetivo?", a: "Sí. En Ajustes, Rango objetivo y Objetivo de TIR. Por defecto son 70 a 180 mg/dL y un 70%, los objetivos del consenso para la mayoría de adultos." },
      ],
      en: [
        { q: "What does the Trends tab in Dulce show?", a: "Your time in range, average glucose and an estimated A1C (GMI) over 7, 14, 30 or 90 days, each compared with the previous period, plus breakdowns by day and by time of day." },
        { q: "Why doesn't the estimated A1C match my lab result?", a: "Because it's the GMI, calculated from your sensor's average glucose, while A1C is a blood test. It's normal for them not to match exactly.", link: "time-in-range" },
        { q: "Can I change the target range?", a: "Yes. In Settings, Target range and Time-in-range goal. The defaults are 70 to 180 mg/dL and 70%, the consensus targets for most adults." },
      ],
      de: [
        { q: "Was zeigt der Tab Trends in Dulce?", a: "Deine Zeit im Zielbereich, deine Durchschnittsglukose und einen geschätzten HbA1c (GMI) für 7, 14, 30 oder 90 Tage, jeweils im Vergleich zum vorherigen Zeitraum, dazu die Aufteilung nach Tag und Tageszeit." },
        { q: "Warum stimmt der geschätzte HbA1c nicht mit dem Labor überein?", a: "Weil es der GMI ist, berechnet aus der Durchschnittsglukose des Sensors, während der HbA1c ein Bluttest ist. Dass sie nicht genau übereinstimmen, ist normal.", link: "time-in-range" },
        { q: "Kann ich den Zielbereich ändern?", a: "Ja. In den Einstellungen unter Zielbereich und Ziel für Zeit im Zielbereich. Standard sind 70 bis 180 mg/dL und 70%, die Konsens-Ziele für die meisten Erwachsenen." },
      ],
    },
  },
  {
    id: "logbook",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Necesito Dulce Pro para el Diario?", a: "No. El Diario y la pestaña Tendencias están en la versión gratuita. Pro solo hace falta para leer datos de Apple Salud." },
        { q: "¿Puedo separar bolo y basal?", a: "Sí. Al apuntar insulina eliges si es bolo o basal, y lo ves así en el Diario." },
        { q: "¿Y si uso mmol/L?", a: "La glucosa manual se escribe en la unidad que tengas elegida en Ajustes, mg/dL o mmol/L." },
      ],
      en: [
        { q: "Do I need Dulce Pro for the Logbook?", a: "No. The Logbook and the Trends tab are in the free version. You only need Pro to read data from Apple Health." },
        { q: "Can I keep bolus and basal apart?", a: "Yes. When you log insulin you choose bolus or basal, and it shows that way in the Logbook." },
        { q: "What if I use mmol/L?", a: "Manual glucose is entered in whichever unit you chose in Settings, mg/dL or mmol/L." },
      ],
      de: [
        { q: "Brauche ich Dulce Pro für das Logbuch?", a: "Nein. Logbuch und Trends sind in der kostenlosen Version enthalten. Pro brauchst du nur, um Daten aus Apple Health zu lesen." },
        { q: "Kann ich Bolus und Basal trennen?", a: "Ja. Beim Eintragen von Insulin wählst du Bolus oder Basal, und so steht es dann im Logbuch." },
        { q: "Und wenn ich mmol/L nutze?", a: "Manuelle Glukose gibst du in der Einheit ein, die du in den Einstellungen gewählt hast, mg/dL oder mmol/L." },
      ],
    },
  },
  {
    id: "apple-health",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-22",
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
    faq: {
      es: [
        { q: "¿Necesito Apple Salud para usar Dulce?", a: "No. Dulce recibe tu glucosa del sensor a través de LibreLinkUp. Apple Salud es opcional y sirve para sumar datos de otras apps." },
        { q: "¿Dulce envía mi glucosa a Apple Salud?", a: "No. Dulce solo lee de Apple Salud; no escribe nada." },
        { q: "¿Los datos de Apple Salud salen en la Live Activity y el Apple Watch?", a: "No. Esas funciones muestran las lecturas de tu sensor. Los datos de Salud aparecen en el Diario y en Tendencias." },
      ],
      en: [
        { q: "Do I need Apple Health to use Dulce?", a: "No. Dulce gets your glucose from the sensor through LibreLinkUp. Apple Health is optional and adds data from other apps." },
        { q: "Does Dulce send my glucose to Apple Health?", a: "No. Dulce only reads from Apple Health; it writes nothing." },
        { q: "Does Apple Health data show on the Live Activity and Apple Watch?", a: "No. Those show your sensor readings. Health data appears in the Logbook and in Trends." },
      ],
      de: [
        { q: "Brauche ich Apple Health, um Dulce zu nutzen?", a: "Nein. Dulce bekommt deinen Zucker über LibreLinkUp vom Sensor. Apple Health ist optional und ergänzt Daten aus anderen Apps." },
        { q: "Schickt Dulce meinen Zucker an Apple Health?", a: "Nein. Dulce liest nur aus Apple Health und schreibt nichts." },
        { q: "Erscheinen Apple Health Daten in der Live-Aktivität und auf der Apple Watch?", a: "Nein. Dort siehst du deine Sensorwerte. Health-Daten erscheinen im Logbuch und in Trends." },
      ],
    },
  },
  {
    id: "child-glucose",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-22",
    dateModified: "2026-10-22",
    slug: {
      es: "ver-glucosa-de-mi-hijo-en-el-iphone",
      en: "monitor-child-glucose-on-iphone",
      de: "blutzucker-vom-kind-auf-dem-iphone-sehen",
    },
    title: {
      es: "Cómo ver la glucosa de tu hijo en tu iPhone",
      en: "How to see your child's glucose on your iPhone",
      de: "Den Blutzucker deines Kindes auf dem iPhone sehen",
    },
    description: {
      es: "Para padres y cuidadores: sigue la glucosa del FreeStyle Libre de tu hijo o de tu padre en tu iPhone, con avisos, pantalla de bloqueo y mensajes de un toque.",
      en: "For parents and caregivers: follow your child's or parent's FreeStyle Libre glucose on your iPhone, with alerts, the Lock Screen and one-tap check-in messages.",
      de: "Für Eltern und Angehörige: Verfolge den FreeStyle Libre Wert deines Kindes oder Elternteils auf dem iPhone, mit Warnungen, Sperrbildschirm und Nachrichten.",
    },
    keywords: {
      es: ["ver glucosa de mi hijo", "seguir glucosa hijo", "controlar glucosa hijo a distancia", "app diabetes padres", "libre seguir a mi hijo"],
      en: ["monitor child glucose remotely", "see my child's blood sugar on iphone", "follow child libre", "diabetes app for parents", "caregiver glucose app"],
      de: ["blutzucker kind überwachen", "blutzucker kind handy", "libre kind folgen", "diabetes app eltern", "blutzucker eltern überwachen"],
    },
    image: "/guides/family-followers.jpg",
    imageAlt: {
      es: "Pantalla Tus seguidores de Dulce con un mensaje de la familia y el botón Estoy bien",
      en: "Dulce Your followers screen with a family message and the I'm OK button",
      de: "Follower-Bildschirm von Dulce mit einer Nachricht aus der Familie und der Antwort-Schaltfläche",
    },
    related: ["family-sharing", "alerts", "lock-screen"],
    faq: {
      es: [
        { q: "¿Puedo ver la glucosa de mi hijo en la pantalla de bloqueo de mi iPhone?", a: "Sí. Con Dulce, la glucosa del FreeStyle Libre de tu hijo aparece en tu pantalla de bloqueo con una Live Activity, junto con avisos de bajadas y subidas, sin desbloquear el móvil. Tu hijo te invita como seguidor desde Dulce, o tú inicias sesión en Dulce con la cuenta de LibreLinkUp con la que ya comparte." },
        { q: "¿Mi hijo necesita un iPhone?", a: "Necesita un móvil con la app de Libre que lea su sensor y tenga internet. Para invitarte desde Dulce, ese móvil tiene que ser un iPhone; si solo comparte con tu cuenta de LibreLinkUp, tú abres Dulce en tu iPhone con esa cuenta." },
        { q: "¿Cuánto cuesta seguir a alguien?", a: "Nada para el seguidor. Compartir es una función de Dulce Pro para quien lleva el sensor, con 14 días de prueba gratis, y permite hasta 3 seguidores." },
        { q: "¿Sirve para cuidar a un padre o una madre mayor?", a: "Sí. Si su app de Libre comparte con tu cuenta de LibreLinkUp, inicias sesión en Dulce con ella y no tiene que instalar nada más en su móvil." },
      ],
      en: [
        { q: "Can I monitor my child's glucose on my iPhone Lock Screen?", a: "Yes. With Dulce, your child's FreeStyle Libre glucose shows on your Lock Screen as a Live Activity, with low and high alerts, without unlocking your phone. Your child invites you as a follower from Dulce, or you sign in to Dulce with the LibreLinkUp account they already share with." },
        { q: "Does my child need an iPhone?", a: "They need a phone with the Libre app reading their sensor and an internet connection. To invite you from Dulce, that phone has to be an iPhone; if it only shares with your LibreLinkUp account, you open Dulce on your iPhone with that account." },
        { q: "How much does it cost to follow someone?", a: "Nothing for the follower. Sharing is a Dulce Pro feature for the person wearing the sensor, with a 14-day free trial, and allows up to 3 followers." },
        { q: "Does it work for caring for an older parent?", a: "Yes. If their Libre app shares with your LibreLinkUp account, you sign in to Dulce with it and they don't have to install anything else on their phone." },
      ],
      de: [
        { q: "Kann ich den Zucker meines Kindes auf meinem iPhone-Sperrbildschirm sehen?", a: "Ja. Mit Dulce erscheint der FreeStyle Libre Wert deines Kindes als Live-Aktivität auf deinem Sperrbildschirm, mit Warnungen bei niedrigen und hohen Werten, ohne dass du das Handy entsperrst. Dein Kind lädt dich in Dulce als Follower ein, oder du meldest dich in Dulce mit dem LibreLinkUp-Konto an, mit dem es schon teilt." },
        { q: "Braucht mein Kind ein iPhone?", a: "Es braucht ein Handy mit der Libre-App, die den Sensor ausliest, und Internet. Um dich aus Dulce einzuladen, muss das ein iPhone sein; teilt es nur mit deinem LibreLinkUp-Konto, öffnest du Dulce auf deinem iPhone mit diesem Konto." },
        { q: "Was kostet es, jemandem zu folgen?", a: "Für Follower nichts. Teilen ist eine Dulce Pro Funktion für die Person mit dem Sensor, mit 14 Tagen Gratis-Test, und erlaubt bis zu 3 Follower." },
        { q: "Funktioniert das auch für ältere Eltern?", a: "Ja. Wenn ihre Libre-App mit deinem LibreLinkUp-Konto teilt, meldest du dich damit in Dulce an, und sie müssen nichts weiter auf ihrem Handy installieren." },
      ],
    },
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
