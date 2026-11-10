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
import type { AppLocale, CoreLocale, ExtraLocale } from "@/i18n/routing";
import type { AuthorId } from "./authors";

/** Every core language, plus fi/nl once the article is translated into them. */
export type Localized<T = string> = Record<CoreLocale, T> & Partial<Record<ExtraLocale, T>>;
/** Fully localized (site chrome: category labels). */
export type AllLocales<T = string> = Record<AppLocale, T>;

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
  /**
   * The direct answer, 2-3 sentences, shown right under the H1 (what AI answers
   * quote). Plain text. Until written, the page shows `description` there and a
   * TODO marker in development (components/article/Byline.tsx).
   */
  summary?: Localized;
  /** The search queries this article is written to answer (from Search Console / autocomplete). */
  keywords: Localized<string[]>;
  /** Image under /public, used for the card, OpenGraph and the article schema. */
  image: string;
  imageAlt: Localized;
  related: string[];
  /** Quick questions, same count and order in every language. */
  faq?: Localized<FaqEntry[]>;
};

export const CATEGORY_LABEL: Record<ArticleCategory, AllLocales> = {
  guide: { es: "Guía de Dulce", en: "Dulce guide", de: "Dulce-Ratgeber", fr: "Guide Dulce", it: "Guida di Dulce", fi: "Dulce-opas", nl: "Dulce-gids", nb: "Dulce-guide", sv: "Dulce-guide", ru: "Руководство Dulce" },
  health: { es: "Salud", en: "Health", de: "Gesundheit", fr: "Santé", it: "Salute", fi: "Terveys", nl: "Gezondheid", nb: "Helse", sv: "Hälsa", ru: "Здоровье" },
  help: { es: "Ayuda", en: "Help", de: "Hilfe", fr: "Aide", it: "Aiuto", fi: "Ohjeet", nl: "Hulp", nb: "Hjelp", sv: "Hjälp", ru: "Помощь" },
};

export const ARTICLES: readonly Article[] = [
  {
    id: "apple-watch",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-07-08",
    dateModified: "2026-10-31",
    slug: {
      es: "como-ver-glucosa-cgm-en-apple-watch",
      en: "how-to-see-cgm-glucose-on-apple-watch",
      de: "libre-blutzucker-auf-der-apple-watch",
      fr: "freestyle-libre-apple-watch-glycemie",
      it: "freestyle-libre-apple-watch-glicemia",
    },
    title: {
      es: "Libre 3 y Libre 3 Plus en el Apple Watch: cómo ver tu glucosa",
      en: "Libre 3 and Libre 3 Plus on Apple Watch: how to see your glucose",
      de: "Libre 3 und Libre 3 Plus auf der Apple Watch: Blutzucker anzeigen",
      fr: "Voir sa glycémie FreeStyle Libre sur l'Apple Watch",
      it: "Vedere la glicemia del FreeStyle Libre su Apple Watch",
    },
    description: {
      es: "Pon tu glucosa del Libre 2, 3 o 3 Plus en la esfera del Apple Watch con LibreLinkUp y Dulce: complicaciones, gráfica y por qué a veces se queda congelada.",
      en: "Put your Libre 2, 3 or 3 Plus glucose on your Apple Watch face with LibreLinkUp and Dulce: complications, the chart, and why watch readings sometimes freeze.",
      de: "So kommt dein Libre 2, 3 oder 3 Plus Wert mit LibreLinkUp und Dulce aufs Zifferblatt der Apple Watch: Komplikationen, Verlauf und warum Werte manchmal hängen.",
      fr: "Affiche ta glycémie Libre 2 ou Libre 3 sur le cadran de l'Apple Watch avec LibreLinkUp et Dulce : complications, courbe et pourquoi la montre se fige parfois.",
      it: "Porta la glicemia del Libre 2 o Libre 3 sul quadrante di Apple Watch con LibreLinkUp e Dulce: complicazioni, grafico e perché a volte l'orologio si blocca.",
    },
    summary: {
      es: "Las apps de Abbott apenas funcionan en el Apple Watch, así que para ver la glucosa de tu FreeStyle Libre en la muñeca necesitas una app que lea tu cuenta de LibreLinkUp, como Dulce. Inicia sesión en Dulce con LibreLinkUp, activa Apple Watch en Ajustes (función de Dulce Pro, con 14 días de prueba gratis) y añade la complicación de Dulce a tu esfera. Sirve cualquier Apple Watch enlazado a tu iPhone, no hace falta que tenga datos móviles.",
      en: "Abbott's apps have very limited Apple Watch support, so to see your FreeStyle Libre glucose on your wrist you need an app that reads your LibreLinkUp account, such as Dulce. Sign in to Dulce with LibreLinkUp, turn on Apple Watch in Settings (a Dulce Pro feature with a 14-day free trial) and add the Dulce complication to your watch face. It works with any Apple Watch paired with your iPhone, no cellular model needed.",
      de: "Abbotts Apps können auf der Apple Watch kaum etwas. Um deinen FreeStyle Libre Wert am Handgelenk zu sehen, brauchst du eine App, die dein LibreLinkUp-Konto liest, zum Beispiel Dulce. Melde dich in Dulce mit LibreLinkUp an, schalte in den Einstellungen Apple Watch ein (eine Dulce Pro Funktion mit 14 Tagen Gratis-Test) und füge die Dulce-Komplikation zu deinem Zifferblatt hinzu. Das klappt mit jeder Apple Watch, die mit deinem iPhone gekoppelt ist, auch ohne Mobilfunk.",
      fr: "Les apps d'Abbott font très peu de choses sur l'Apple Watch : pour voir ta glycémie FreeStyle Libre au poignet, il te faut une app qui lit ton compte LibreLinkUp, comme Dulce. Connecte-toi à Dulce avec LibreLinkUp, active Apple Watch dans les Réglages (fonction Dulce Pro avec 14 jours d'essai gratuit) et ajoute la complication Dulce à ton cadran. Ça marche avec toute Apple Watch jumelée à ton iPhone, même sans modèle cellulaire.",
      it: "Le app di Abbott su Apple Watch fanno ben poco: per vedere la glicemia del FreeStyle Libre al polso ti serve un'app che legga il tuo account LibreLinkUp, come Dulce. Accedi a Dulce con LibreLinkUp, attiva Apple Watch in Impostazioni (funzione Dulce Pro con 14 giorni di prova gratuita) e aggiungi la complicazione di Dulce al quadrante. Funziona con qualsiasi Apple Watch abbinato al tuo iPhone, anche senza modello cellular.",
    },
    keywords: {
      es: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "glucosa apple watch", "app glucosa apple watch"],
      en: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "cgm apple watch", "glucose apple watch complication"],
      de: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "blutzucker apple watch", "cgm apple watch"],
      fr: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "glycémie apple watch", "complication glycémie apple watch"],
      it: ["freestyle libre apple watch", "libre 3 apple watch", "librelinkup apple watch", "glicemia apple watch", "sensore glicemia apple watch"],
    },
    image: "/guides/covers/apple-watch.webp",
    imageAlt: {
      es: "Apple Watch con Dulce mostrando glucosa 89 y la gráfica de 12 horas, junto a un iPhone",
      en: "Apple Watch with Dulce showing glucose 89 and a 12-hour chart, next to an iPhone",
      de: "Apple Watch mit Dulce, Glukose 89 und 12-Stunden-Verlauf, daneben ein iPhone",
      fr: "Apple Watch avec Dulce affichant une glycémie de 89 et la courbe sur 12 heures, à côté d'un iPhone",
      it: "Apple Watch con Dulce che mostra glicemia 89 e il grafico di 12 ore, accanto a un iPhone",
    },
    related: ["lock-screen", "alerts", "librelinkup-not-working", "glucose-apps-compared", "apple-watch-glucose"],
    faq: {
      es: [
        { q: "¿Cómo veo la glucosa de mi FreeStyle Libre en el Apple Watch?", a: "Con una app que lea tu cuenta de LibreLinkUp, como Dulce. Inicia sesión en Dulce con tu cuenta de LibreLinkUp, activa Apple Watch en Ajustes (función de Dulce Pro, con 14 días de prueba gratis) y añade la complicación de Dulce a tu esfera." },
        { q: "¿Necesito un Apple Watch con datos móviles?", a: "No. Funciona con cualquier Apple Watch emparejado con tu iPhone." },
        { q: "¿Puedo ver en el reloj la glucosa de mi hijo?", a: "El reloj muestra la glucosa de la cuenta conectada en tu iPhone. Para seguir la glucosa de tu hijo desde tu móvil, con avisos y pantalla de bloqueo, hazte seguidor suyo en Dulce.", link: "child-glucose" },
        { q: "¿Puedo ver la glucosa también en la pantalla de bloqueo del iPhone?", a: "Sí, con la Live Activity de Dulce, que muestra tu glucosa en la pantalla de bloqueo y en la Dynamic Island.", link: "lock-screen" },
        { q: "¿Se puede conectar el Libre 3 o el Libre 3 Plus al Apple Watch?", a: "Sí, a través de LibreLinkUp. Activa el uso compartido en la app que lee tu sensor, inicia sesión en Dulce con tu cuenta de LibreLinkUp y tu glucosa aparece en la app de Dulce para Apple Watch y en sus complicaciones. Funciona igual con Libre 2, 2 Plus, 3 y 3 Plus. El reloj requiere Dulce Pro." },
      ],
      en: [
        { q: "How do I see my FreeStyle Libre glucose on my Apple Watch?", a: "With an app that reads your LibreLinkUp account, like Dulce. Sign in to Dulce with your LibreLinkUp account, turn on Apple Watch in Settings (a Dulce Pro feature with a 14-day free trial) and add the Dulce complication to your watch face." },
        { q: "Do I need a cellular Apple Watch?", a: "No. It works with any Apple Watch paired with your iPhone." },
        { q: "Can I see my child's glucose on my watch?", a: "The watch shows the glucose of the account connected on your iPhone. To follow your child's glucose from your phone, with alerts and the Lock Screen, become their follower in Dulce.", link: "child-glucose" },
        { q: "Can I also see my glucose on the iPhone Lock Screen?", a: "Yes, with Dulce's Live Activity, which shows your glucose on the Lock Screen and in the Dynamic Island.", link: "lock-screen" },
        { q: "Can Libre 3 or Libre 3 Plus connect to Apple Watch?", a: "Yes, through LibreLinkUp. Turn on sharing in the app that reads your sensor, sign in to Dulce with your LibreLinkUp account, and your glucose shows on the Dulce Apple Watch app and its complications. It works the same for Libre 2, 2 Plus, 3 and 3 Plus. Dulce Pro is needed for the watch." },
      ],
      de: [
        { q: "Wie sehe ich meinen FreeStyle Libre Wert auf der Apple Watch?", a: "Mit einer App, die dein LibreLinkUp-Konto liest, zum Beispiel Dulce. Melde dich in Dulce mit deinem LibreLinkUp-Konto an, schalte in den Einstellungen Apple Watch ein (eine Dulce Pro Funktion mit 14 Tagen Gratis-Test) und füge die Dulce-Komplikation zu deinem Zifferblatt hinzu." },
        { q: "Brauche ich eine Apple Watch mit Mobilfunk?", a: "Nein. Es funktioniert mit jeder Apple Watch, die mit deinem iPhone gekoppelt ist." },
        { q: "Kann ich den Zucker meines Kindes auf der Uhr sehen?", a: "Die Uhr zeigt den Zucker des Kontos, das auf deinem iPhone verbunden ist. Um den Zucker deines Kindes auf deinem Handy zu verfolgen, mit Warnungen und Sperrbildschirm, folgst du ihm in Dulce.", link: "child-glucose" },
        { q: "Kann ich den Wert auch auf dem iPhone-Sperrbildschirm sehen?", a: "Ja, mit der Live-Aktivität von Dulce, die deinen Zucker auf dem Sperrbildschirm und in der Dynamic Island zeigt.", link: "lock-screen" },
        { q: "Kann man den Libre 3 oder Libre 3 Plus mit der Apple Watch verbinden?", a: "Ja, über LibreLinkUp. Schalte in der App, die deinen Sensor ausliest, das Teilen ein, melde dich in Dulce mit deinem LibreLinkUp-Konto an, und dein Wert erscheint in der Dulce-App auf der Apple Watch und in ihren Komplikationen. Das gilt genauso für Libre 2, 2 Plus, 3 und 3 Plus. Für die Uhr brauchst du Dulce Pro." },
      ],
      fr: [
        { q: "Comment voir ma glycémie FreeStyle Libre sur l'Apple Watch ?", a: "Avec une app qui lit ton compte LibreLinkUp, comme Dulce. Connecte-toi à Dulce avec ton compte LibreLinkUp, active Apple Watch dans les Réglages (fonction Dulce Pro avec 14 jours d'essai gratuit) et ajoute la complication Dulce à ton cadran." },
        { q: "Faut-il une Apple Watch cellulaire ?", a: "Non. Ça fonctionne avec n'importe quelle Apple Watch jumelée à ton iPhone." },
        { q: "Puis-je voir la glycémie de mon enfant sur ma montre ?", a: "La montre affiche la glycémie du compte connecté sur ton iPhone. Pour suivre la glycémie de ton enfant depuis ton téléphone, avec alertes et écran verrouillé, deviens son abonné dans Dulce.", link: "child-glucose" },
        { q: "Puis-je aussi voir ma glycémie sur l'écran verrouillé de l'iPhone ?", a: "Oui, avec l'Activité en direct de Dulce, qui affiche ta glycémie sur l'écran verrouillé et dans la Dynamic Island.", link: "lock-screen" },
        { q: "Peut-on connecter un Libre 3 ou un Libre 3 Plus à l'Apple Watch ?", a: "Oui, via LibreLinkUp. Active le partage dans l'app qui lit ton capteur, connecte-toi à Dulce avec ton compte LibreLinkUp, et ta glycémie s'affiche dans l'app Dulce sur l'Apple Watch et dans ses complications. C'est pareil pour les Libre 2, 2 Plus, 3 et 3 Plus. La montre nécessite Dulce Pro." },
      ],
      it: [
        { q: "Come vedo la glicemia del FreeStyle Libre su Apple Watch?", a: "Con un'app che legge il tuo account LibreLinkUp, come Dulce. Accedi a Dulce con il tuo account LibreLinkUp, attiva Apple Watch in Impostazioni (funzione Dulce Pro con 14 giorni di prova gratuita) e aggiungi la complicazione di Dulce al quadrante." },
        { q: "Serve un Apple Watch con rete cellulare?", a: "No. Funziona con qualsiasi Apple Watch abbinato al tuo iPhone." },
        { q: "Posso vedere la glicemia di mio figlio sull'orologio?", a: "L'orologio mostra la glicemia dell'account collegato sul tuo iPhone. Per seguire la glicemia di tuo figlio dal telefono, con avvisi e schermata di blocco, diventa suo follower in Dulce.", link: "child-glucose" },
        { q: "Posso vedere la glicemia anche sulla schermata di blocco dell'iPhone?", a: "Sì, con l'Attività in tempo reale di Dulce, che mostra la glicemia sulla schermata di blocco e nella Dynamic Island.", link: "lock-screen" },
        { q: "Si può collegare il Libre 3 o il Libre 3 Plus ad Apple Watch?", a: "Sì, tramite LibreLinkUp. Attiva la condivisione nell'app che legge il sensore, accedi a Dulce con il tuo account LibreLinkUp e la glicemia compare nell'app Dulce su Apple Watch e nelle sue complicazioni. Vale allo stesso modo per Libre 2, 2 Plus, 3 e 3 Plus. L'orologio richiede Dulce Pro." },
      ],
    },
  },
  {
    id: "time-in-range",
    category: "health",
    author: "giorgi",
    datePublished: "2026-07-12",
    dateModified: "2026-11-05",
    slug: {
      es: "tiempo-en-rango-vs-hba1c",
      en: "time-in-range-vs-a1c",
      de: "zeit-im-zielbereich-vs-hba1c",
      fr: "temps-dans-la-cible-vs-hba1c",
      it: "tempo-nel-range-vs-emoglobina-glicata",
    },
    title: {
      es: "Tiempo en rango vs. HbA1c: qué mide cada uno y cuál mirar",
      en: "Time in range vs. A1C: what each measures and which to watch",
      de: "Zeit im Zielbereich vs. HbA1c: Was beides misst und worauf du achtest",
      fr: "Temps dans la cible ou HbA1c : ce que mesure chacun",
      it: "Tempo nel range o HbA1c: cosa misura ciascuno",
    },
    description: {
      es: "Qué es el tiempo en rango (70-180 mg/dL), los objetivos del consenso internacional, qué es el GMI y por qué tu HbA1c no cuenta toda la historia.",
      en: "What time in range (70-180 mg/dL) is, the international consensus targets, what GMI means, and why your A1C doesn't tell the whole story.",
      de: "Was Zeit im Zielbereich (70-180 mg/dL) ist, die Zielwerte des internationalen Konsens, was der GMI bedeutet und warum dein HbA1c nicht alles verrät.",
      fr: "Ce qu'est le temps dans la cible (70-180 mg/dL), les objectifs du consensus international, ce que signifie le GMI et pourquoi l'HbA1c ne dit pas tout.",
      it: "Cos'è il tempo nel range (70-180 mg/dL), gli obiettivi del consenso internazionale, cosa significa il GMI e perché la HbA1c non racconta tutto.",
    },
    summary: {
      es: "El tiempo en rango es el porcentaje de lecturas del sensor entre 70 y 180 mg/dL (3,9 a 10,0 mmol/L), mientras que la HbA1c es un análisis de sangre que refleja tu media de unos tres meses. Para la mayoría de adultos con diabetes, el consenso internacional de 2019 marca más del 70% en rango, con menos del 4% por debajo de 70 y menos del 1% por debajo de 54 mg/dL; un 70% en rango equivale más o menos a una HbA1c del 7%. Tu equipo médico puede fijarte otros objetivos.",
      en: "Time in range is the share of your sensor readings between 70 and 180 mg/dL (3.9 to 10.0 mmol/L), while A1C is a blood test that reflects your average over about three months. For most adults with diabetes, the 2019 international consensus target is over 70% in range, with under 4% below 70 and under 1% below 54 mg/dL; 70% in range corresponds roughly to an A1C of 7%. Your care team may set different targets.",
      de: "Die Zeit im Zielbereich ist der Anteil deiner Sensorwerte zwischen 70 und 180 mg/dL (3,9 bis 10,0 mmol/L), der HbA1c dagegen ein Bluttest, der deinen Mittelwert über etwa drei Monate zeigt. Für die meisten Erwachsenen mit Diabetes empfiehlt der internationale Konsens von 2019 über 70% im Zielbereich, unter 4% unter 70 und unter 1% unter 54 mg/dL; 70% im Zielbereich entsprechen ungefähr einem HbA1c von 7%. Dein Diabetes-Team kann andere Ziele festlegen.",
      fr: "Le temps dans la cible est la part de tes mesures du capteur entre 70 et 180 mg/dL (3,9 à 10,0 mmol/L), alors que l'HbA1c est une prise de sang qui reflète ta moyenne sur environ trois mois. Pour la plupart des adultes diabétiques, le consensus international de 2019 vise plus de 70 % dans la cible, moins de 4 % sous 70 et moins de 1 % sous 54 mg/dL ; 70 % dans la cible correspondent à peu près à une HbA1c de 7 %. Ton équipe soignante peut fixer d'autres objectifs.",
      it: "Il tempo nel range è la quota delle letture del sensore tra 70 e 180 mg/dL (da 3,9 a 10,0 mmol/L), mentre l'HbA1c è un esame del sangue che riflette la media di circa tre mesi. Per la maggior parte degli adulti con diabete, il consenso internazionale del 2019 indica oltre il 70% nel range, meno del 4% sotto 70 e meno dell'1% sotto 54 mg/dL; il 70% nel range corrisponde più o meno a una HbA1c del 7%. Il tuo team diabetologico può fissare obiettivi diversi.",
    },
    keywords: {
      es: ["tiempo en rango", "tiempo en rango diabetes", "hemoglobina glicosilada", "gmi diabetes", "tiempo en rango objetivo"],
      en: ["time in range", "time in range vs a1c", "time in range diabetes", "gmi vs a1c", "glucose management indicator"],
      de: ["zeit im zielbereich", "time in range diabetes", "hba1c", "gmi diabetes", "zeit im zielbereich ziel"],
      fr: ["temps dans la cible", "time in range diabète", "temps dans la cible hba1c", "gmi hba1c", "indicateur de gestion du glucose"],
      it: ["tempo nel range", "time in range diabete", "tempo nel range emoglobina glicata", "gmi hba1c", "indicatore di gestione del glucosio"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce con glucosa y barra de tiempo en rango",
      en: "Dulce home screen with glucose and the time in range bar",
      de: "Startbildschirm von Dulce mit Glukose und Balken für die Zeit im Zielbereich",
      fr: "Écran d'accueil de Dulce avec la glycémie et la barre de temps dans la cible",
      it: "Schermata Home di Dulce con la glicemia e la barra del tempo nel range",
    },
    related: ["trends", "blood-sugar-levels", "alerts"],
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
      fr: [
        { q: "Qu'est-ce qu'un bon temps dans la cible ?", a: "Plus de 70 % entre 70 et 180 mg/dL pour la plupart des adultes avec un diabète de type 1 ou de type 2, selon le consensus international de 2019, avec moins de 4 % sous 70 et moins de 1 % sous 54. Ton équipe soignante peut fixer d'autres objectifs." },
        { q: "À quelle HbA1c correspondent 70 % de temps dans la cible ?", a: "À une HbA1c d'environ 7 %, selon le même consensus. C'est une approximation : l'HbA1c est une analyse de sang et peut ne pas correspondre." },
        { q: "De combien de jours de données ai-je besoin ?", a: "Au moins 14 jours, avec le capteur porté 70 % du temps, selon le consensus. Une seule journée dit très peu.", link: "trends" },
      ],
      it: [
        { q: "Qual è un buon tempo nel range?", a: "Oltre il 70% tra 70 e 180 mg/dL per la maggior parte degli adulti con diabete di tipo 1 o di tipo 2, secondo il consenso internazionale del 2019, con meno del 4% sotto 70 e meno dell'1% sotto 54. Il tuo team diabetologico può fissare obiettivi diversi." },
        { q: "A quale HbA1c corrisponde il 70% di tempo nel range?", a: "A una HbA1c di circa il 7%, secondo lo stesso consenso. È un'approssimazione: la HbA1c è un esame del sangue e può non coincidere." },
        { q: "Di quanti giorni di dati ho bisogno?", a: "Almeno 14 giorni, con il sensore indossato per il 70% del tempo, secondo il consenso. Un solo giorno dice molto poco.", link: "trends" },
      ],
    },
  },
  {
    id: "family-sharing",
    category: "guide",
    author: "levan",
    datePublished: "2026-07-16",
    dateModified: "2026-11-06",
    slug: {
      es: "compartir-glucosa-cgm-con-familia",
      en: "sharing-cgm-glucose-with-family",
      de: "blutzucker-mit-der-familie-teilen",
      fr: "partager-glycemie-libre-avec-sa-famille",
      it: "condividere-glicemia-libre-con-la-famiglia",
    },
    title: {
      es: "Cómo compartir tu glucosa del Libre con tu familia",
      en: "How to share your Libre glucose with your family",
      de: "So teilst du deinen Libre Blutzucker mit deiner Familie",
      fr: "Comment partager ta glycémie Libre avec ta famille",
      it: "Come condividere la glicemia del Libre con la famiglia",
    },
    description: {
      es: "Comparte tus lecturas del FreeStyle Libre en tiempo real con toda tu familia en Dulce: invitación por enlace, avisos para ellos y el botón «Estoy bien».",
      en: "Share your FreeStyle Libre readings in real time with your whole family in Dulce: invite by link, alerts for them, and the one-tap “I'm OK” reply.",
      de: "Teile deine FreeStyle Libre Werte live mit deiner ganzen Familie in Dulce: Einladung per Link, eigene Warnungen und die Antwort „Mir geht es gut“.",
      fr: "Partage tes mesures FreeStyle Libre en temps réel avec toute ta famille dans Dulce : invitation par lien, alertes pour eux et réponse « Ça va » en un geste.",
      it: "Condividi le letture del FreeStyle Libre in tempo reale con tutta la famiglia in Dulce: invito con link, avvisi per loro e risposta «Sto bene» con un tocco.",
    },
    summary: {
      es: "En Dulce, ve a Ajustes, Seguidores, Invitar a alguien y manda el enlace o el código: tus familiares, sin límite, instalan Dulce gratis y ven tu glucosa en tiempo real, con sus propios avisos, sin sensor ni cuenta de Abbott. Compartir es una función de Dulce Pro para quien lleva el sensor, con 14 días de prueba gratis, y los seguidores no pagan nada. Puedes quitar a un seguidor cuando quieras y deja de ver tu glucosa al momento.",
      en: "In Dulce, go to Settings, Followers, Invite someone and send the link or code: any number of family members install Dulce for free and see your glucose in real time, with their own alerts, without a sensor or an Abbott account. Sharing is a Dulce Pro feature for the person wearing the sensor, with a 14-day free trial, and followers pay nothing. You can remove a follower at any time and they stop seeing your glucose immediately.",
      de: "Geh in Dulce zu Einstellungen, Follower, Jemanden einladen und schick den Link oder den Code: Beliebig viele Familienmitglieder installieren Dulce kostenlos und sehen deinen Zucker in Echtzeit, mit eigenen Warnungen, ohne Sensor und ohne Abbott-Konto. Teilen ist eine Dulce Pro Funktion für die Person mit dem Sensor, mit 14 Tagen Gratis-Test, Follower zahlen nichts. Du kannst Follower jederzeit entfernen, dann sehen sie deinen Wert sofort nicht mehr.",
      fr: "Dans Dulce, va dans Réglages, Abonnés, Inviter quelqu'un et envoie le lien ou le code : tes proches, sans limite, installent Dulce gratuitement et voient ta glycémie en temps réel, avec leurs propres alertes, sans capteur ni compte Abbott. Le partage est une fonction Dulce Pro pour la personne qui porte le capteur, avec 14 jours d'essai gratuit, et les abonnés ne paient rien. Tu peux retirer un abonné quand tu veux, il cesse aussitôt de voir ta glycémie.",
      it: "In Dulce vai su Impostazioni, Follower, Invita qualcuno e manda il link o il codice: i tuoi familiari, senza limiti, installano Dulce gratis e vedono la tua glicemia in tempo reale, con i propri avvisi, senza sensore né account Abbott. La condivisione è una funzione Dulce Pro per chi porta il sensore, con 14 giorni di prova gratuita, e i follower non pagano nulla. Puoi rimuovere un follower quando vuoi e smette subito di vedere la tua glicemia.",
    },
    keywords: {
      es: ["compartir glucosa familia", "compartir libre con familia", "librelinkup familia", "compartir glucosa libre"],
      en: ["share libre with family", "share glucose with family", "follow libre", "librelinkup follower"],
      de: ["libre teilen", "blutzucker familie teilen", "libre familie", "librelinkup follower"],
      fr: ["partager libre famille", "partager glycémie famille", "suivre glycémie proche", "abonné librelinkup"],
      it: ["condividere libre famiglia", "condividere glicemia famiglia", "seguire glicemia familiare", "follower librelinkup"],
    },
    image: "/guides/covers/family-sharing.webp",
    imageAlt: {
      es: "Mano sosteniendo un iPhone con la pantalla de seguidores de Dulce",
      en: "Hand holding an iPhone with Dulce's followers screen",
      de: "Hand hält ein iPhone mit dem Follower-Bildschirm von Dulce",
      fr: "Main tenant un iPhone avec l'écran des abonnés de Dulce",
      it: "Mano che tiene un iPhone con la schermata dei follower di Dulce",
    },
    related: ["alerts", "lock-screen", "librelinkup-not-working", "pet-glucose"],
    faq: {
      es: [
        { q: "¿Cómo puede mi familia ver la glucosa de mi FreeStyle Libre?", a: "Invitándoles desde Dulce. Ve a Ajustes, Seguidores, Invitar a alguien, y mándales el enlace o el código. Instalan Dulce gratis y ven tu glucosa en tiempo real, sin sensor ni cuenta de Abbott." },
        { q: "¿Cuántas personas pueden seguirme y cuánto cuesta?", a: "Todas las que quieras, sin límite. Compartir es una función de Dulce Pro para quien lleva el sensor, con 14 días de prueba gratis; los seguidores no pagan nada." },
        { q: "¿Mis seguidores reciben avisos de hipo e hiper?", a: "Sí. Cada seguidor tiene sus propios avisos de glucosa baja y alta, con sus propias horas tranquilas, y las bajadas muy fuertes siempre le llegan. También puede tenerte en su pantalla de bloqueo con una Live Activity.", link: "alerts" },
        { q: "¿Mis seguidores pueden mandarme mensajes?", a: "Sí, mensajes cortos. Un seguidor puede mandarte “¿Estás bien?”, “Revisa tu glucosa” o un texto suyo; te llega como notificación y respondes “Estoy bien” con un toque. Puedes desactivar los mensajes de la familia en Ajustes.", link: "child-glucose" },
      ],
      en: [
        { q: "How can my family see my FreeStyle Libre glucose?", a: "Invite them from Dulce. Go to Settings, Followers, Invite someone, and send them the link or the code. They install Dulce for free and see your glucose in real time, with no sensor and no Abbott account." },
        { q: "How many people can follow me, and what does it cost?", a: "As many as you like, there's no limit. Sharing is a Dulce Pro feature for the person wearing the sensor, with a 14-day free trial; followers pay nothing." },
        { q: "Do my followers get low and high alerts?", a: "Yes. Each follower has their own low and high alerts, with their own quiet hours, and very low readings always reach them. They can also have you on their Lock Screen with a Live Activity.", link: "alerts" },
        { q: "Can my followers send me messages?", a: "Yes, short ones. A follower can send “Are you OK?”, “Check your glucose” or their own text; it arrives as a notification and you reply “I'm OK” with one tap. You can turn off messages from family in Settings.", link: "child-glucose" },
      ],
      de: [
        { q: "Wie kann meine Familie meinen FreeStyle Libre Wert sehen?", a: "Lade sie in Dulce ein. Geh zu Einstellungen, Follower, Jemanden einladen, und schick ihnen den Link oder den Code. Sie installieren Dulce kostenlos und sehen deinen Zucker in Echtzeit, ohne Sensor und ohne Abbott-Konto." },
        { q: "Wie viele Personen können mir folgen, und was kostet das?", a: "So viele du willst, ohne Limit. Teilen ist eine Dulce Pro Funktion für die Person mit dem Sensor, mit 14 Tagen Gratis-Test; Follower zahlen nichts." },
        { q: "Bekommen meine Follower Warnungen bei Unter- und Überzucker?", a: "Ja. Jeder Follower hat eigene Warnungen für niedrige und hohe Werte, mit eigenen Ruhezeiten, und sehr niedrige Werte kommen immer an. Sie können dich auch mit einer Live-Aktivität auf ihrem Sperrbildschirm haben.", link: "alerts" },
        { q: "Können mir meine Follower Nachrichten schicken?", a: "Ja, kurze. Ein Follower kann dir „Geht es dir gut?“, „Überprüfe deinen Glukosewert“ oder einen eigenen Text schicken; er kommt als Mitteilung an, und du antwortest mit einem Tipp „Mir geht es gut“. Familien-Nachrichten kannst du in den Einstellungen ausschalten.", link: "child-glucose" },
      ],
      fr: [
        { q: "Comment ma famille peut-elle voir ma glycémie FreeStyle Libre ?", a: "En les invitant depuis Dulce. Va dans Réglages, Abonnés, Inviter quelqu'un, et envoie-leur le lien ou le code. Ils installent Dulce gratuitement et voient ta glycémie en temps réel, sans capteur ni compte Abbott." },
        { q: "Combien de personnes peuvent me suivre, et combien ça coûte ?", a: "Autant que tu veux, sans limite. Le partage est une fonction de Dulce Pro pour la personne qui porte le capteur, avec 14 jours d'essai gratuit ; les abonnés ne paient rien." },
        { q: "Mes abonnés reçoivent-ils des alertes d'hypo et d'hyper ?", a: "Oui. Chaque abonné a ses propres alertes de glycémie basse et haute, avec ses propres heures calmes, et les valeurs très basses lui arrivent toujours. Il peut aussi t'avoir sur son écran verrouillé avec une Activité en direct.", link: "alerts" },
        { q: "Mes abonnés peuvent-ils m'envoyer des messages ?", a: "Oui, des messages courts. Un abonné peut t'envoyer « Ça va ? », « Vérifie ta glycémie » ou son propre texte ; il arrive en notification et tu réponds « Ça va » d'un geste. Tu peux désactiver les messages de la famille dans les Réglages.", link: "child-glucose" },
      ],
      it: [
        { q: "Come può la mia famiglia vedere la glicemia del mio FreeStyle Libre?", a: "Invitandola da Dulce. Vai su Impostazioni, Follower, Invita qualcuno, e manda il link o il codice. Installano Dulce gratis e vedono la tua glicemia in tempo reale, senza sensore né account Abbott." },
        { q: "Quante persone possono seguirmi e quanto costa?", a: "Quante ne vuoi, senza limiti. La condivisione è una funzione di Dulce Pro per chi porta il sensore, con 14 giorni di prova gratuita; i follower non pagano nulla." },
        { q: "I miei follower ricevono avvisi di ipo e iper?", a: "Sì. Ogni follower ha i propri avvisi di glicemia bassa e alta, con le proprie ore di silenzio, e i valori molto bassi gli arrivano sempre. Può anche averti sulla sua schermata di blocco con un'Attività in tempo reale.", link: "alerts" },
        { q: "I miei follower possono mandarmi messaggi?", a: "Sì, brevi. Un follower può mandarti «Tutto bene?», «Controlla la glicemia» o un testo suo; arriva come notifica e rispondi «Sto bene» con un tocco. Puoi disattivare i messaggi dalla famiglia in Impostazioni.", link: "child-glucose" },
      ],
    },
  },
  {
    id: "lock-screen",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-11-10",
    slug: {
      es: "glucosa-libre-en-pantalla-de-bloqueo-iphone",
      en: "libre-glucose-on-iphone-lock-screen",
      de: "libre-blutzucker-auf-dem-iphone-sperrbildschirm",
      fr: "glycemie-libre-ecran-verrouille-iphone",
      it: "glicemia-libre-schermata-di-blocco-iphone",
    },
    title: {
      es: "Tu glucosa del Libre en la pantalla de bloqueo y la Dynamic Island",
      en: "Your Libre glucose on the iPhone Lock Screen and Dynamic Island",
      de: "Dein Libre Blutzucker auf dem Sperrbildschirm und in der Dynamic Island",
      fr: "Ta glycémie Libre sur l'écran verrouillé de l'iPhone",
      it: "La glicemia del Libre sulla schermata di blocco dell'iPhone",
    },
    description: {
      es: "Cómo ver tu glucosa del FreeStyle Libre en la pantalla de bloqueo del iPhone sin desbloquearlo: Actividad en vivo, Dynamic Island, estilos y límites de iOS.",
      en: "How to see your FreeStyle Libre glucose on the iPhone Lock Screen without unlocking: Live Activity, Dynamic Island, the styles and the iOS limits to know.",
      de: "So siehst du deinen FreeStyle Libre Wert auf dem iPhone-Sperrbildschirm ohne Entsperren: Live-Aktivität, Dynamic Island, Stile und die Grenzen von iOS.",
      fr: "Comment voir ta glycémie FreeStyle Libre sur l'écran verrouillé sans déverrouiller : Activité en direct, Dynamic Island, styles et limites d'iOS à connaître.",
      it: "Come vedere la glicemia del FreeStyle Libre sulla schermata di blocco senza sbloccare: Attività in tempo reale, Dynamic Island, stili e limiti di iOS.",
    },
    summary: {
      es: "La app de Libre no muestra tu glucosa en la pantalla de bloqueo del iPhone, pero una Live Activity sí: tu valor, la flecha de tendencia y la hora de la lectura se quedan en la pantalla de bloqueo y en la Dynamic Island. En Dulce, conecta LibreLinkUp, activa Live Activity e isla dinámica en Ajustes y permite las Live Activities de Dulce en los Ajustes del iPhone. Con Dulce Pro se actualiza cada minuto, aunque el móvil esté bloqueado y la app cerrada.",
      en: "The Libre app doesn't show your glucose on the iPhone Lock Screen, but a Live Activity can: your number, trend arrow and reading time stay on the Lock Screen and in the Dynamic Island. In Dulce, connect LibreLinkUp, turn on Live Activity & Dynamic Island in Settings and allow Live Activities for Dulce in the iPhone Settings app. With Dulce Pro it updates every minute, even with the phone locked and the app closed.",
      de: "Die Libre-App zeigt deinen Zucker nicht auf dem Sperrbildschirm des iPhone, eine Live-Aktivität schon: Wert, Trendpfeil und Uhrzeit der Messung bleiben auf dem Sperrbildschirm und in der Dynamic Island. Verbinde in Dulce LibreLinkUp, schalte in den Einstellungen die Live-Aktivität ein und erlaube Live-Aktivitäten für Dulce in den iPhone-Einstellungen. Mit Dulce Pro aktualisiert sie sich jede Minute, auch bei gesperrtem iPhone und geschlossener App.",
      fr: "L'app Libre n'affiche pas ta glycémie sur l'écran verrouillé de l'iPhone, mais une Activité en direct, si : ta valeur, la flèche de tendance et l'heure de la mesure restent sur l'écran verrouillé et dans la Dynamic Island. Dans Dulce, connecte LibreLinkUp, active Activité en direct et Dynamic Island dans les Réglages et autorise les Activités en direct de Dulce dans les Réglages de l'iPhone. Avec Dulce Pro, elle se met à jour chaque minute, même téléphone verrouillé et app fermée.",
      it: "L'app Libre non mostra la glicemia sulla schermata di blocco dell'iPhone, un'Attività in tempo reale sì: valore, freccia di tendenza e ora della lettura restano sulla schermata di blocco e nella Dynamic Island. In Dulce collega LibreLinkUp, attiva Attività in tempo reale e Dynamic Island in Impostazioni e consenti le Attività in tempo reale di Dulce nelle Impostazioni dell'iPhone. Con Dulce Pro si aggiorna ogni minuto, anche con il telefono bloccato e l'app chiusa.",
    },
    keywords: {
      es: ["libre pantalla de bloqueo", "glucosa pantalla de bloqueo", "libre 3 isla dinamica", "dynamic island glucosa", "freestyle libre iphone", "libre 3 plus app iphone", "libre 3 plus moviles compatibles"],
      en: ["libre lock screen", "libre 3 lock screen", "libre live activity", "libre dynamic island", "glucose lock screen iphone", "libre 3 plus app for iphone", "libre 3 plus compatible phones"],
      de: ["libre sperrbildschirm", "blutzucker sperrbildschirm", "libre live aktivität", "dynamic island blutzucker", "libre 3 iphone", "libre 3 plus app iphone", "libre 3 plus kompatible handys"],
      fr: ["libre écran verrouillé", "glycémie écran verrouillé iphone", "libre activité en direct", "libre dynamic island", "libre 3 écran verrouillé", "libre 3 plus app iphone", "libre 3 plus téléphones compatibles"],
      it: ["libre schermata di blocco", "glicemia schermata di blocco iphone", "libre attività in tempo reale", "libre dynamic island", "libre 3 schermata di blocco", "libre 3 plus app iphone", "libre 3 plus telefoni compatibili"],
    },
    image: "/guides/covers/lock-screen.webp",
    imageAlt: {
      es: "Pantalla de bloqueo del iPhone con la Actividad en vivo de Dulce: glucosa 87 y tiempo en rango",
      en: "iPhone Lock Screen with the Dulce Live Activity showing glucose 87 and time in range",
      de: "iPhone-Sperrbildschirm mit der Dulce Live-Aktivität: Glukose 87 und Zeit im Zielbereich",
      fr: "Écran verrouillé de l'iPhone avec l'Activité en direct de Dulce : glycémie 87 et temps dans la cible",
      it: "Schermata di blocco dell'iPhone con l'Attività in tempo reale di Dulce: glicemia 87 e tempo nell'intervallo",
    },
    related: ["widgets", "apple-watch", "alerts", "glucose-apps-compared"],
    faq: {
      es: [
        { q: "¿Cómo pongo la glucosa del Libre en la pantalla de bloqueo del iPhone?", a: "Con una Live Activity, porque la app de Libre no la muestra ahí. En Dulce, conecta tu cuenta de LibreLinkUp, activa Live Activity e isla dinámica en Ajustes y permite las Live Activities de Dulce en los Ajustes del iPhone." },
        { q: "¿Cada cuánto se actualiza la Live Activity?", a: "Cada minuto con Dulce Pro, aunque el iPhone esté bloqueado y la app cerrada. El número solo puede ser tan reciente como la última lectura que subió la app de Libre del móvil del sensor, así que mira siempre la hora de la lectura." },
        { q: "¿Por qué desaparece la glucosa de la pantalla de bloqueo?", a: "Porque iOS cierra las Live Activities tras un número máximo de horas. Abre Dulce y vuelve. Si Dulce no puede actualizar tu pantalla de bloqueo durante un rato, te manda una notificación discreta para que abras la app." },
        { q: "¿Funciona con el FreeStyle Libre 3 Plus?", a: "Sí. Dulce lee tu glucosa de LibreLinkUp, no del sensor, así que el 3 Plus funciona igual que el Libre 2 o el 3. Activa el uso compartido en la app de Abbott que lee el sensor (FreeStyle Libre 3 o, en algunos países, la app Libre). Ese móvil tiene que estar en la lista de compatibilidad de Abbott; Dulce necesita iOS 17 o posterior." },
        { q: "¿Es gratis?", a: "La Live Activity es una función de Dulce Pro con 14 días de prueba gratis. Los widgets de glucosa para la pantalla de bloqueo y de inicio son gratis.", link: "widgets" },
      ],
      en: [
        { q: "How do I put my Libre glucose on the iPhone Lock Screen?", a: "With a Live Activity, because the Libre app doesn't show it there. In Dulce, connect your LibreLinkUp account, turn on Live Activity & Dynamic Island in Settings and allow Live Activities for Dulce in the iPhone Settings app." },
        { q: "How often does the Live Activity update?", a: "Every minute with Dulce Pro, even with the iPhone locked and the app closed. The number can only be as fresh as the last reading the Libre app on the sensor phone uploaded, so always check the reading time." },
        { q: "Why does my glucose disappear from the Lock Screen?", a: "Because iOS ends Live Activities after a maximum number of hours. Open Dulce and it comes back. If Dulce can't update your Lock Screen for a while, it sends you a quiet notification to open the app." },
        { q: "Does it work with the FreeStyle Libre 3 Plus?", a: "Yes. Dulce reads your glucose from LibreLinkUp, not from the sensor, so the 3 Plus works just like the Libre 2 or 3. Turn on sharing in the Abbott app that reads the sensor (FreeStyle Libre 3, or the Libre app in some countries). That phone must be on Abbott's compatibility list; Dulce needs iOS 17 or later." },
        { q: "Is it free?", a: "The Live Activity is a Dulce Pro feature with a 14-day free trial. Glucose widgets for the Lock Screen and Home Screen are free.", link: "widgets" },
      ],
      de: [
        { q: "Wie bekomme ich meinen Libre Wert auf den iPhone-Sperrbildschirm?", a: "Mit einer Live-Aktivität, denn die Libre-App zeigt ihn dort nicht. Verbinde in Dulce dein LibreLinkUp-Konto, schalte in den Einstellungen die Live-Aktivität ein und erlaube Live-Aktivitäten für Dulce in den iPhone-Einstellungen." },
        { q: "Wie oft aktualisiert sich die Live-Aktivität?", a: "Jede Minute mit Dulce Pro, auch bei gesperrtem iPhone und geschlossener App. Der Wert ist nur so aktuell wie der letzte Wert, den die Libre-App auf dem Sensor-Handy hochgeladen hat, also schau immer auf die Uhrzeit." },
        { q: "Warum verschwindet mein Zucker vom Sperrbildschirm?", a: "Weil iOS Live-Aktivitäten nach einer Höchstzahl an Stunden beendet. Öffne Dulce, dann ist sie wieder da. Wenn Dulce deinen Sperrbildschirm eine Weile nicht aktualisieren kann, schickt es dir eine leise Mitteilung, die App zu öffnen." },
        { q: "Funktioniert das mit dem FreeStyle Libre 3 Plus?", a: "Ja. Dulce liest deine Werte aus LibreLinkUp, nicht vom Sensor, deshalb funktioniert der 3 Plus genau wie Libre 2 oder 3. Schalte das Teilen in der Abbott-App ein, die den Sensor ausliest (FreeStyle Libre 3 oder in manchen Ländern die Libre-App). Dieses Handy muss auf Abbotts Kompatibilitätsliste stehen; Dulce braucht iOS 17 oder neuer." },
        { q: "Ist das kostenlos?", a: "Die Live-Aktivität ist eine Dulce Pro Funktion mit 14 Tagen Gratis-Test. Die Glukose-Widgets für Sperr- und Home-Bildschirm sind kostenlos.", link: "widgets" },
      ],
      fr: [
        { q: "Comment afficher ma glycémie Libre sur l'écran verrouillé de l'iPhone ?", a: "Avec une Activité en direct, car l'app Libre ne l'affiche pas à cet endroit. Dans Dulce, connecte ton compte LibreLinkUp, active Activité en direct et Dynamic Island dans les Réglages et autorise les Activités en direct de Dulce dans les Réglages de l'iPhone." },
        { q: "À quelle fréquence l'Activité en direct se met-elle à jour ?", a: "Chaque minute avec Dulce Pro, même iPhone verrouillé et app fermée. Le chiffre ne peut pas être plus récent que la dernière mesure envoyée par l'app Libre du téléphone du capteur, alors regarde toujours l'heure de la mesure." },
        { q: "Pourquoi ma glycémie disparaît-elle de l'écran verrouillé ?", a: "Parce qu'iOS met fin aux Activités en direct après un nombre maximal d'heures. Ouvre Dulce et elle revient. Si Dulce ne peut pas mettre à jour ton écran verrouillé pendant un moment, il t'envoie une notification discrète pour ouvrir l'app." },
        { q: "Est-ce que ça marche avec le FreeStyle Libre 3 Plus ?", a: "Oui. Dulce lit ta glycémie depuis LibreLinkUp, pas depuis le capteur, donc le 3 Plus fonctionne comme les Libre 2 ou 3. Active le partage dans l'app Abbott qui lit le capteur (FreeStyle Libre 3 ou, dans certains pays, l'app Libre). Ce téléphone doit figurer sur la liste de compatibilité d'Abbott ; Dulce demande iOS 17 ou plus récent." },
        { q: "Est-ce gratuit ?", a: "L'Activité en direct est une fonction de Dulce Pro avec 14 jours d'essai gratuit. Les widgets de glycémie pour l'écran verrouillé et l'écran d'accueil sont gratuits.", link: "widgets" },
      ],
      it: [
        { q: "Come metto la glicemia del Libre sulla schermata di blocco dell'iPhone?", a: "Con un'Attività in tempo reale, perché l'app Libre non la mostra lì. In Dulce collega il tuo account LibreLinkUp, attiva Attività in tempo reale e Dynamic Island in Impostazioni e consenti le Attività in tempo reale di Dulce nelle Impostazioni dell'iPhone." },
        { q: "Ogni quanto si aggiorna l'Attività in tempo reale?", a: "Ogni minuto con Dulce Pro, anche con l'iPhone bloccato e l'app chiusa. Il valore può essere solo recente quanto l'ultima lettura caricata dall'app Libre sul telefono del sensore, quindi guarda sempre l'ora della lettura." },
        { q: "Perché la glicemia sparisce dalla schermata di blocco?", a: "Perché iOS chiude le Attività in tempo reale dopo un numero massimo di ore. Apri Dulce e torna. Se Dulce non riesce ad aggiornare la schermata di blocco per un po', ti manda una notifica discreta per aprire l'app." },
        { q: "Funziona con il FreeStyle Libre 3 Plus?", a: "Sì. Dulce legge la glicemia da LibreLinkUp, non dal sensore, quindi il 3 Plus funziona come Libre 2 o 3. Attiva la condivisione nell'app Abbott che legge il sensore (FreeStyle Libre 3 oppure, in alcuni paesi, l'app Libre). Quel telefono deve essere nella lista di compatibilità di Abbott; Dulce richiede iOS 17 o successivo." },
        { q: "È gratis?", a: "L'Attività in tempo reale è una funzione di Dulce Pro con 14 giorni di prova gratuita. I widget della glicemia per la schermata di blocco e la Home sono gratis.", link: "widgets" },
      ],
    },
  },
  {
    id: "widgets",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-11-01",
    slug: {
      es: "widget-libre-para-iphone",
      en: "libre-widget-for-iphone",
      de: "libre-widget-fuer-das-iphone",
      fr: "widget-freestyle-libre-iphone",
      it: "widget-freestyle-libre-iphone",
    },
    title: {
      es: "Widget del FreeStyle Libre para iPhone: inicio, bloqueo y StandBy",
      en: "FreeStyle Libre iPhone Widget: Home, Lock Screen, StandBy",
      de: "FreeStyle Libre iPhone-Widget: Home, Sperrbildschirm, StandBy",
      fr: "Widget FreeStyle Libre pour iPhone : accueil, verrouillage, StandBy",
      it: "Widget FreeStyle Libre per iPhone: Home, blocco e StandBy",
    },
    description: {
      es: "La app de Libre no trae widget. Así añades un widget de glucosa del Libre 2 o Libre 3 a la pantalla de inicio, la de bloqueo y el modo StandBy del iPhone.",
      en: "The Libre app has no widget. Here is how to add a Libre 2 or Libre 3 glucose widget to your iPhone Home Screen, Lock Screen and StandBy mode.",
      de: "Die Libre-App hat kein Widget. So fügst du ein Libre 2 oder Libre 3 Glukose-Widget zum Home-Bildschirm, Sperrbildschirm und StandBy deines iPhones hinzu.",
      fr: "L'app Libre n'a pas de widget. Voici comment ajouter un widget de glycémie Libre 2 ou Libre 3 sur l'écran d'accueil, l'écran verrouillé et en StandBy.",
      it: "L'app Libre non ha un widget. Ecco come aggiungere un widget della glicemia Libre 2 o Libre 3 alla schermata Home, alla schermata di blocco e in StandBy.",
    },
    summary: {
      es: "Las apps de Abbott (FreeStyle LibreLink, FreeStyle Libre 3 y LibreLinkUp) no tienen widget de glucosa para el iPhone. Dulce lee tus datos de LibreLinkUp y añade widgets gratis para la pantalla de inicio, la pantalla de bloqueo y StandBy. iOS decide cuándo se refrescan los widgets, por eso muestran la antigüedad de la lectura; si quieres un valor que se actualice cada minuto, usa la Live Activity.",
      en: "Abbott's apps (FreeStyle LibreLink, FreeStyle Libre 3 and LibreLinkUp) have no glucose widget for iPhone. Dulce reads your LibreLinkUp data and adds free widgets for the Home Screen, the Lock Screen and StandBy. iOS decides when widgets refresh, so they show how old the reading is; for a number that updates every minute, use the Live Activity.",
      de: "Abbotts Apps (FreeStyle LibreLink, FreeStyle Libre 3 und LibreLinkUp) haben kein Glukose-Widget fürs iPhone. Dulce liest deine LibreLinkUp-Daten und bringt kostenlose Widgets für Home-Bildschirm, Sperrbildschirm und StandBy. Wann Widgets neu laden, entscheidet iOS, deshalb zeigen sie, wie alt der Wert ist; für einen Wert, der sich jede Minute aktualisiert, nimm die Live-Aktivität.",
      fr: "Les apps d'Abbott (FreeStyle LibreLink, FreeStyle Libre 3 et LibreLinkUp) n'ont pas de widget de glycémie pour iPhone. Dulce lit tes données LibreLinkUp et ajoute gratuitement des widgets pour l'écran d'accueil, l'écran verrouillé et StandBy. C'est iOS qui décide quand les widgets se rafraîchissent, ils indiquent donc l'âge de la mesure ; pour une valeur mise à jour chaque minute, utilise l'Activité en direct.",
      it: "Le app di Abbott (FreeStyle LibreLink, FreeStyle Libre 3 e LibreLinkUp) non hanno un widget della glicemia per iPhone. Dulce legge i tuoi dati di LibreLinkUp e aggiunge gratis widget per la Home, la schermata di blocco e StandBy. È iOS a decidere quando aggiornare i widget, per questo mostrano da quanto risale la lettura; per un valore aggiornato ogni minuto usa l'Attività in tempo reale.",
    },
    keywords: {
      es: ["widget libre iphone", "freestyle libre 3 widget iphone", "libre widget", "widget glucosa iphone", "freestyle libre 2 widget", "widget libre 3 plus"],
      en: ["libre widget iphone", "freestyle libre 3 widget", "libre widget", "glucose widget iphone", "cgm widget iphone", "libre 3 plus widget iphone", "libre 3 widget lock screen"],
      de: ["libre widget", "libre 3 widget iphone", "blutzucker widget", "glukose widget", "freestyle libre widget", "libre 3 plus widget"],
      fr: ["widget libre iphone", "widget freestyle libre 3", "widget glycémie iphone", "widget libre", "widget cgm iphone", "widget libre 3 plus"],
      it: ["widget libre iphone", "widget freestyle libre 3", "widget glicemia iphone", "widget libre", "widget sensore glicemia iphone", "widget libre 3 plus"],
    },
    image: "/guides/covers/widgets.webp",
    imageAlt: {
      es: "Widgets de glucosa de Dulce con gráficas en un iPhone",
      en: "Dulce glucose widgets with charts on an iPhone",
      de: "Glukose-Widgets von Dulce mit Verlauf auf einem iPhone",
      fr: "Widgets de glycémie Dulce avec courbes sur un iPhone",
      it: "Widget della glicemia di Dulce con grafici su un iPhone",
    },
    related: ["lock-screen", "apple-watch", "librelinkup-not-working"],
    faq: {
      es: [
        { q: "¿Hay un widget del FreeStyle Libre para iPhone?", a: "No de Abbott: LibreLink, Libre 3 y LibreLinkUp no tienen widget de glucosa. Dulce lee tus datos de LibreLinkUp y añade widgets para la pantalla de inicio, la pantalla de bloqueo y StandBy, gratis." },
        { q: "¿Cada cuánto se actualiza el widget de glucosa?", a: "Cuando iOS decide, no cada minuto. iOS limita los refrescos de los widgets para ahorrar batería, así que los widgets de Dulce muestran hace cuánto fue la lectura y tienen un botón para actualizar. Para un número que se actualice cada minuto, usa la Live Activity.", link: "lock-screen" },
        { q: "¿Puedo ver la glucosa en la mesilla por la noche?", a: "Sí, con StandBy. Pon el iPhone a cargar bloqueado y en horizontal, y añade el widget pequeño de Dulce a la vista de StandBy." },
        { q: "¿Hay widget para el Libre 3 Plus o para Dexcom?", a: "Sí. Los widgets de Dulce muestran cualquier sensor que Dulce lee: FreeStyle Libre 2, 2 Plus, 3 y 3 Plus a través de LibreLinkUp, y Dexcom G6, G7 y ONE+ a través de Dexcom Share. Los widgets son gratis.", link: "dexcom" },
      ],
      en: [
        { q: "Is there a FreeStyle Libre widget for iPhone?", a: "Not from Abbott: LibreLink, Libre 3 and LibreLinkUp have no glucose widget. Dulce reads your LibreLinkUp data and adds widgets for the Home Screen, Lock Screen and StandBy, for free." },
        { q: "How often does the glucose widget update?", a: "When iOS decides, not every minute. iOS limits widget refreshes to save battery, so Dulce's widgets show how long ago the reading was and have a refresh button. For a number that updates every minute, use the Live Activity.", link: "lock-screen" },
        { q: "Can I see my glucose on the nightstand at night?", a: "Yes, with StandBy. Charge your locked iPhone on its side in landscape and add the small Dulce widget to the StandBy view." },
        { q: "Is there a widget for Libre 3 Plus or Dexcom?", a: "Yes. Dulce's widgets show any sensor Dulce reads: FreeStyle Libre 2, 2 Plus, 3 and 3 Plus through LibreLinkUp, and Dexcom G6, G7 and ONE+ through Dexcom Share. The widgets are free.", link: "dexcom" },
      ],
      de: [
        { q: "Gibt es ein FreeStyle Libre Widget fürs iPhone?", a: "Nicht von Abbott: LibreLink, Libre 3 und LibreLinkUp haben kein Glukose-Widget. Dulce liest deine LibreLinkUp-Daten und bringt kostenlose Widgets für Home-Bildschirm, Sperrbildschirm und StandBy." },
        { q: "Wie oft aktualisiert sich das Glukose-Widget?", a: "Wann iOS entscheidet, nicht jede Minute. iOS begrenzt Widget-Aktualisierungen, um Akku zu sparen, deshalb zeigen die Dulce-Widgets, wie alt der Wert ist, und haben einen Aktualisieren-Knopf. Für einen Wert, der sich jede Minute aktualisiert, nimm die Live-Aktivität.", link: "lock-screen" },
        { q: "Kann ich meinen Zucker nachts auf dem Nachttisch sehen?", a: "Ja, mit StandBy. Lade dein gesperrtes iPhone quer auf und füge das kleine Dulce-Widget zur StandBy-Ansicht hinzu." },
        { q: "Gibt es ein Widget für Libre 3 Plus oder Dexcom?", a: "Ja. Die Widgets von Dulce zeigen jeden Sensor, den Dulce liest: FreeStyle Libre 2, 2 Plus, 3 und 3 Plus über LibreLinkUp sowie Dexcom G6, G7 und ONE+ über Dexcom Share. Die Widgets sind kostenlos.", link: "dexcom" },
      ],
      fr: [
        { q: "Existe-t-il un widget FreeStyle Libre pour iPhone ?", a: "Pas chez Abbott : LibreLink, Libre 3 et LibreLinkUp n'ont pas de widget de glycémie. Dulce lit tes données LibreLinkUp et ajoute gratuitement des widgets pour l'écran d'accueil, l'écran verrouillé et StandBy." },
        { q: "À quelle fréquence le widget de glycémie se met-il à jour ?", a: "Quand iOS le décide, pas chaque minute. iOS limite les actualisations des widgets pour économiser la batterie : les widgets de Dulce affichent donc l'âge de la mesure et ont un bouton d'actualisation. Pour un chiffre mis à jour chaque minute, utilise l'Activité en direct.", link: "lock-screen" },
        { q: "Puis-je voir ma glycémie sur la table de nuit ?", a: "Oui, avec StandBy. Charge ton iPhone verrouillé, posé sur le côté à l'horizontale, et ajoute le petit widget Dulce à la vue StandBy." },
        { q: "Existe-t-il un widget pour le Libre 3 Plus ou le Dexcom ?", a: "Oui. Les widgets de Dulce affichent tout capteur que Dulce lit : FreeStyle Libre 2, 2 Plus, 3 et 3 Plus via LibreLinkUp, et Dexcom G6, G7 et ONE+ via Dexcom Share. Les widgets sont gratuits.", link: "dexcom" },
      ],
      it: [
        { q: "Esiste un widget del FreeStyle Libre per iPhone?", a: "Non di Abbott: LibreLink, Libre 3 e LibreLinkUp non hanno un widget della glicemia. Dulce legge i tuoi dati di LibreLinkUp e aggiunge gratis widget per la Home, la schermata di blocco e StandBy." },
        { q: "Ogni quanto si aggiorna il widget della glicemia?", a: "Quando lo decide iOS, non ogni minuto. iOS limita gli aggiornamenti dei widget per risparmiare batteria, quindi i widget di Dulce mostrano da quanto risale la lettura e hanno un pulsante per aggiornare. Per un valore aggiornato ogni minuto, usa l'Attività in tempo reale.", link: "lock-screen" },
        { q: "Posso vedere la glicemia sul comodino di notte?", a: "Sì, con StandBy. Ricarica l'iPhone bloccato appoggiato di lato in orizzontale e aggiungi il widget piccolo di Dulce alla vista StandBy." },
        { q: "Esiste un widget per Libre 3 Plus o Dexcom?", a: "Sì. I widget di Dulce mostrano qualsiasi sensore che Dulce legge: FreeStyle Libre 2, 2 Plus, 3 e 3 Plus tramite LibreLinkUp, e Dexcom G6, G7 e ONE+ tramite Dexcom Share. I widget sono gratuiti.", link: "dexcom" },
      ],
    },
  },
  {
    id: "alerts",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-31",
    slug: {
      es: "alarmas-de-glucosa-en-el-iphone",
      en: "glucose-alerts-on-iphone",
      de: "blutzucker-alarme-auf-dem-iphone",
      fr: "alertes-glycemie-iphone",
      it: "avvisi-glicemia-iphone",
    },
    title: {
      es: "Alarmas de glucosa en el iPhone: bajas, altas y cómo oírlas de noche",
      en: "Glucose alerts on iPhone: lows, highs and how to hear them at night",
      de: "Blutzucker-Alarme am iPhone: tief, hoch und nachts sicher hören",
      fr: "Alertes de glycémie sur iPhone : hypos, hypers et les entendre la nuit",
      it: "Avvisi di glicemia su iPhone: ipo, iper e come sentirli di notte",
    },
    description: {
      es: "Avisos de glucosa baja y alta en Dulce: la alerta de baja crítica, las horas tranquilas, el aviso predictivo y cómo oírlos con el iPhone de noche.",
      en: "How to set low and high glucose alerts in Dulce, the critical low alert, quiet hours, the predictive low alert, and how to hear them on your iPhone at night.",
      de: "Warnungen für niedrige und hohe Glukose in Dulce: die kritische Warnung, Ruhezeiten, die vorausschauende Tief-Warnung und wie du sie nachts hörst.",
      fr: "Alertes de glycémie basse et haute dans Dulce : l'alerte d'hypo critique, les heures calmes, l'alerte prédictive et comment les entendre la nuit.",
      it: "Come impostare gli avvisi di glicemia bassa e alta in Dulce, l'avviso di ipo critica, le ore di silenzio, l'avviso predittivo e come sentirli di notte.",
    },
    summary: {
      es: "Dulce tiene avisos de bajada y subida con tus propios umbrales, además de cambio rápido, previsión de bajada y un aviso de hipo crítica a 55 mg/dL o menos, todo en Ajustes → Avisos. El aviso de hipo crítica suena aunque el iPhone esté en silencio o en No molestar; los demás son notificaciones normales que siguen el modo silencio y Concentración, así que de noche quita el modo silencio y permite Dulce en Dormir. Mantén también las alarmas de la app de tu sensor, porque Dulce es una capa extra, no un producto sanitario.",
      en: "Dulce has low and high alerts with your own thresholds, plus rapid change, predictive low and a critical low alert for 55 mg/dL or less, all under Settings → Alerts. The critical low alert rings even with your iPhone on silent or in Do Not Disturb; the others are regular notifications that follow silent mode and Focus, so at night turn silent mode off and allow Dulce in your Sleep Focus. Keep your sensor app's own alarms on too, because Dulce is an extra layer, not a medical device.",
      de: "Dulce hat Warnungen für niedrige und hohe Werte mit deinen eigenen Grenzen, dazu schnelle Änderung, vorausschauende Unterzucker-Warnung und eine kritische Warnung ab 55 mg/dL oder weniger, alles unter Einstellungen → Warnungen. Die kritische Warnung klingelt auch bei stummem iPhone und „Nicht stören“; die anderen sind normale Mitteilungen, die Stummmodus und Fokus folgen, also schalte nachts den Stummmodus aus und erlaube Dulce im Fokus Schlafen. Lass auch die Alarme deiner Sensor-App an, denn Dulce ist eine zusätzliche Hilfe, kein Medizinprodukt.",
      fr: "Dulce propose des alertes d'hypo et d'hyper avec tes propres seuils, plus variation rapide, hypo prévue et une alerte d'hypo critique à 55 mg/dL ou moins, le tout dans Réglages → Alertes. L'alerte d'hypo critique sonne même iPhone en silencieux ou en Ne pas déranger ; les autres sont des notifications normales qui suivent le mode silencieux et Concentration, donc la nuit désactive le mode silencieux et autorise Dulce dans Sommeil. Garde aussi les alarmes de l'app de ton capteur, car Dulce est une aide en plus, pas un dispositif médical.",
      it: "Dulce ha avvisi di ipo e iper con le tue soglie, più variazione rapida, ipo prevista e un avviso di ipo critica a 55 mg/dL o meno, tutto in Impostazioni → Avvisi. L'avviso di ipo critica suona anche con l'iPhone in silenzioso o in Non disturbare; gli altri sono normali notifiche che seguono il silenzioso e Full immersion, quindi di notte disattiva il silenzioso e consenti Dulce in Riposo. Tieni attivi anche gli allarmi dell'app del sensore, perché Dulce è un aiuto in più, non un dispositivo medico.",
    },
    keywords: {
      es: ["alarma glucosa baja", "libre alarmas", "alarma de glucosa", "libre 3 alarma", "alarma glucosa modo silencio"],
      en: ["librelinkup alarms", "libre 3 alarms", "glucose alarm silent mode iphone", "low glucose alert", "cgm alerts iphone"],
      de: ["libre alarm", "libre 3 alarm einstellen", "unterzuckerung alarm", "blutzucker alarm iphone", "librelinkup alarm"],
      fr: ["alarme librelinkup", "alarme libre 3", "alarme glycémie iphone silencieux", "alerte hypoglycémie", "alerte glycémie iphone"],
      it: ["allarmi librelinkup", "allarmi libre 3", "allarme glicemia iphone silenzioso", "avviso ipoglicemia", "avvisi glicemia iphone"],
    },
    image: "/guides/lock-screen-alerts-watch.jpg",
    imageAlt: {
      es: "Avisos de Dulce en la pantalla de bloqueo: glucosa muy baja y glucosa baja",
      en: "Dulce alerts on the Lock Screen: glucose very low and low glucose",
      de: "Dulce-Warnungen auf dem Sperrbildschirm: Glukose sehr niedrig und Glukose niedrig",
      fr: "Alertes de Dulce sur l'écran verrouillé : glycémie très basse et glycémie basse",
      it: "Avvisi di Dulce sulla schermata di blocco: glicemia molto bassa e glicemia bassa",
    },
    related: ["family-sharing", "lock-screen", "apple-watch"],
    faq: {
      es: [
        { q: "¿Pueden sonar los avisos de glucosa con el iPhone en silencio?", a: "El de hipo crítica, sí. Ante una bajada grave (55 mg/dL o menos) Dulce envía una alerta crítica de iOS, que suena aunque el iPhone esté en silencio o en No molestar si permites las alertas críticas de Dulce. Los demás avisos siguen los ajustes de sonido del iPhone: de noche, quita el modo silencio y permite Dulce en Dormir." },
        { q: "¿Dulce sustituye las alarmas de la app de Libre?", a: "No. Mantén activadas las alarmas de tu FreeStyle Libre 2 o Libre 3. Dulce es una capa más, no un dispositivo médico." },
        { q: "¿Llegan los avisos con la app cerrada?", a: "Sí. El servidor de Dulce revisa tus lecturas de LibreLinkUp y te manda el aviso: cada minuto con Dulce Pro y cada 5 minutos con la versión gratuita." },
        { q: "¿Puede mi familia recibir mis avisos?", a: "Sí. Tus seguidores pueden recibir sus propios avisos cuando bajas o subes, con sus propias horas tranquilas, y las bajadas muy fuertes siempre les llegan.", link: "family-sharing" },
      ],
      en: [
        { q: "Can glucose alerts ring when my iPhone is on silent?", a: "The critical low alert can. For a severe low (55 mg/dL or less) Dulce sends an iOS critical alert, which rings even on silent and in Do Not Disturb once you allow critical alerts for Dulce. The other alerts follow your iPhone's sound settings, so at night turn silent mode off and allow Dulce in your Sleep Focus." },
        { q: "Does Dulce replace the Libre app's alarms?", a: "No. Keep your FreeStyle Libre 2 or Libre 3 alarms on. Dulce is an extra layer, not a medical device." },
        { q: "Do alerts arrive with the app closed?", a: "Yes. Dulce's server checks your LibreLinkUp readings and sends you the alert: every minute with Dulce Pro and every 5 minutes with the free version." },
        { q: "Can my family get my alerts?", a: "Yes. Your followers can get their own alerts when you go low or high, with their own quiet hours, and very low readings always reach them.", link: "family-sharing" },
      ],
      de: [
        { q: "Können Zucker-Warnungen klingeln, wenn das iPhone stumm ist?", a: "Die kritische Warnung schon. Bei schwerer Unterzuckerung (55 mg/dL oder weniger) schickt Dulce einen kritischen Hinweis von iOS, der auch bei Stummmodus und „Nicht stören“ klingelt, sobald du Dulce kritische Hinweise erlaubst. Die anderen Warnungen folgen den Toneinstellungen des iPhone: Schalte nachts den Stummmodus aus und erlaube Dulce im Fokus Schlafen." },
        { q: "Ersetzt Dulce die Alarme der Libre-App?", a: "Nein. Lass die Alarme deines FreeStyle Libre 2 oder Libre 3 eingeschaltet. Dulce ist eine zusätzliche Ebene, kein Medizinprodukt." },
        { q: "Kommen die Warnungen auch bei geschlossener App?", a: "Ja. Der Server von Dulce prüft deine LibreLinkUp-Werte und schickt dir die Warnung: jede Minute mit Dulce Pro und alle 5 Minuten in der kostenlosen Version." },
        { q: "Kann meine Familie meine Warnungen bekommen?", a: "Ja. Deine Follower können eigene Warnungen bekommen, wenn du niedrig oder hoch bist, mit eigenen Ruhezeiten, und sehr niedrige Werte kommen immer bei ihnen an.", link: "family-sharing" },
      ],
      fr: [
        { q: "Les alertes de glycémie peuvent-elles sonner iPhone en silencieux ?", a: "L'alerte d'hypo critique, oui. En cas d'hypo sévère (55 mg/dL ou moins), Dulce envoie une alerte critique iOS, qui sonne même en silencieux et en Ne pas déranger une fois que tu autorises les alertes critiques de Dulce. Les autres alertes suivent les réglages de son de l'iPhone : la nuit, désactive le mode silencieux et autorise Dulce dans Sommeil." },
        { q: "Dulce remplace-t-il les alarmes de l'app Libre ?", a: "Non. Garde les alarmes de ton FreeStyle Libre 2 ou Libre 3 activées. Dulce est une couche de plus, pas un dispositif médical." },
        { q: "Les alertes arrivent-elles avec l'app fermée ?", a: "Oui. Le serveur de Dulce vérifie tes mesures LibreLinkUp et t'envoie l'alerte : chaque minute avec Dulce Pro et toutes les 5 minutes avec la version gratuite." },
        { q: "Ma famille peut-elle recevoir mes alertes ?", a: "Oui. Tes abonnés peuvent recevoir leurs propres alertes quand tu es en hypo ou en hyper, avec leurs propres heures calmes, et les valeurs très basses leur arrivent toujours.", link: "family-sharing" },
      ],
      it: [
        { q: "Gli avvisi di glicemia possono suonare con l'iPhone in silenzioso?", a: "L'avviso di ipo critica sì. Per un'ipo grave (55 mg/dL o meno) Dulce invia un avviso critico di iOS, che suona anche in silenzioso e in Non disturbare dopo che consenti gli avvisi critici di Dulce. Gli altri avvisi seguono le impostazioni audio dell'iPhone: di notte disattiva il silenzioso e consenti Dulce in Riposo." },
        { q: "Dulce sostituisce gli allarmi dell'app Libre?", a: "No. Tieni attivi gli allarmi del tuo FreeStyle Libre 2 o Libre 3. Dulce è un livello in più, non un dispositivo medico." },
        { q: "Gli avvisi arrivano anche con l'app chiusa?", a: "Sì. Il server di Dulce controlla le tue letture di LibreLinkUp e ti manda l'avviso: ogni minuto con Dulce Pro e ogni 5 minuti con la versione gratuita." },
        { q: "La mia famiglia può ricevere i miei avvisi?", a: "Sì. I tuoi follower possono ricevere i propri avvisi quando sei basso o alto, con le proprie ore di silenzio, e i valori molto bassi arrivano sempre.", link: "family-sharing" },
      ],
    },
  },
  {
    id: "librelinkup-not-working",
    category: "help",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-11-04",
    slug: {
      es: "librelinkup-no-funciona",
      en: "librelinkup-not-working",
      de: "librelinkup-funktioniert-nicht",
      fr: "librelinkup-ne-fonctionne-pas",
      it: "librelinkup-non-funziona",
      fi: "librelinkup-ei-toimi",
      nl: "librelinkup-werkt-niet",
      nb: "librelinkup-fungerer-ikke",
      sv: "librelinkup-fungerar-inte",
      ru: "librelinkup-ne-rabotaet",
    },
    title: {
      es: "LibreLinkUp no funciona: sin datos recientes, no se actualiza o no entra",
      en: "LibreLinkUp not working: no recent data, not updating, login",
      de: "LibreLinkUp funktioniert nicht: keine aktuellen Daten, kein Login",
      fr: "LibreLinkUp ne fonctionne pas : pas de données ou connexion impossible",
      it: "LibreLinkUp non funziona: niente dati o accesso impossibile",
      fi: "LibreLinkUp ei toimi: ei uusia tietoja, ei päivity, kirjautuminen",
      nl: "LibreLinkUp werkt niet: geen recente gegevens, inloggen",
      nb: "LibreLinkUp fungerer ikke: ingen nye data, oppdateres ikke, pålogging",
      sv: "LibreLinkUp fungerar inte: inga nya data, uppdateras inte, inloggning",
      ru: "LibreLinkUp не работает: нет новых данных, не обновляется, вход",
    },
    description: {
      es: "Soluciones paso a paso cuando LibreLinkUp no muestra datos, no se actualiza o rechaza tu contraseña, y qué revisar en el móvil de quien lleva el sensor.",
      en: "Step-by-step fixes when LibreLinkUp shows no data, stops updating or rejects your password, and what to check on the phone of the person wearing the sensor.",
      de: "Schritt-für-Schritt-Lösungen, wenn LibreLinkUp keine Daten zeigt, nicht aktualisiert oder dein Passwort ablehnt, und was du am Handy des Sensorträgers prüfst.",
      fr: "Solutions pas à pas quand LibreLinkUp n'affiche aucune donnée, ne se met plus à jour ou refuse ton mot de passe, et quoi vérifier sur le téléphone du capteur.",
      it: "Soluzioni passo passo quando LibreLinkUp non mostra dati, non si aggiorna o rifiuta la password, e cosa controllare sul telefono di chi porta il sensore.",
      fi: "Vaiheittaiset korjaukset, kun LibreLinkUp ei näytä tietoja, lakkaa päivittymästä tai hylkää salasanasi, ja mitä tarkistaa sensoria käyttävän puhelimesta.",
      nl: "Stap voor stap oplossen als LibreLinkUp geen gegevens toont, niet meer bijwerkt of je wachtwoord weigert, en wat je controleert op de telefoon met de sensor.",
      nb: "Trinnvise løsninger når LibreLinkUp ikke viser data, slutter å oppdatere eller avviser passordet ditt, og hva du sjekker på telefonen til den som har sensoren.",
      sv: "Steg för steg när LibreLinkUp inte visar data, slutar uppdateras eller avvisar ditt lösenord, och vad du kontrollerar på telefonen hos den som bär sensorn.",
      ru: "Пошаговые решения, когда LibreLinkUp не показывает данные, перестаёт обновляться или не принимает пароль, и что проверить на телефоне человека с сенсором.",
    },
    summary: {
      es: "Casi todos los problemas de LibreLinkUp son uno de estos tres: no puedes entrar (casi siempre porque escribes la contraseña de LibreLink, que es otra cuenta), entras pero no ves datos (nadie comparte todavía con esa cuenta) o los datos dejan de actualizarse. Las lecturas van sensor → app de Libre → nube de Abbott → LibreLinkUp, así que si se congelan comprueba que el móvil del sensor tiene internet, no ha cerrado la app de Libre y está cerca del sensor.",
      en: "Almost every LibreLinkUp problem is one of three: you can't log in (usually because you're typing your LibreLink password, which belongs to a separate account), you log in but see no data (nobody is sharing with that account yet), or the data stops updating. Readings travel sensor → Libre app → Abbott's cloud → LibreLinkUp, so for frozen data check that the sensor phone has internet, keeps the Libre app running and stays near the sensor.",
      de: "Fast jedes LibreLinkUp-Problem ist eines von dreien: Du kommst nicht rein (meist, weil du das Passwort von LibreLink eingibst, einem anderen Konto), du kommst rein, siehst aber keine Daten (noch teilt niemand mit diesem Konto), oder die Daten werden nicht mehr aktualisiert. Die Werte laufen Sensor → Libre-App → Abbott-Cloud → LibreLinkUp; wenn sie hängen, prüf also, ob das Sensor-Handy Internet hat, die Libre-App nicht beendet wurde und das Handy in der Nähe des Sensors ist.",
      fr: "Presque tous les problèmes de LibreLinkUp se rangent en trois cas : tu n'arrives pas à te connecter (souvent parce que tu tapes le mot de passe de LibreLink, un autre compte), tu te connectes mais ne vois aucune donnée (personne ne partage encore avec ce compte), ou les données ne se mettent plus à jour. Les mesures passent capteur → app Libre → cloud d'Abbott → LibreLinkUp : si elles se figent, vérifie que le téléphone du capteur a internet, n'a pas fermé l'app Libre et reste près du capteur.",
      it: "Quasi tutti i problemi di LibreLinkUp sono uno di questi tre: non riesci ad accedere (di solito perché scrivi la password di LibreLink, che è un altro account), accedi ma non vedi dati (nessuno condivide ancora con quell'account) oppure i dati smettono di aggiornarsi. Le letture passano sensore → app Libre → cloud di Abbott → LibreLinkUp, quindi se si bloccano controlla che il telefono del sensore abbia internet, non abbia chiuso l'app Libre e sia vicino al sensore.",
      fi: "Lähes jokainen LibreLinkUp-ongelma on yksi kolmesta: et pääse kirjautumaan (yleensä koska syötät LibreLink-salasanasi, joka kuuluu eri tilille), kirjaudut mutta et näe tietoja (kukaan ei vielä jaa sille tilille), tai tiedot lakkaavat päivittymästä. Lukemat kulkevat sensori → Libre-sovellus → Abbottin pilvi → LibreLinkUp, joten jäätyneiden tietojen kohdalla tarkista, että sensorin puhelimella on internet, sensori on Bluetooth-kantamalla eikä Libre-sovellusta ole suljettu väkisin.",
      nl: "Bijna elk LibreLinkUp-probleem is een van drie: je kunt niet inloggen (meestal omdat je je LibreLink-wachtwoord typt, dat bij een ander account hoort), je logt in maar ziet geen gegevens (niemand deelt nog met dat account), of de gegevens worden niet meer bijgewerkt. Metingen reizen sensor → Libre-app → cloud van Abbott → LibreLinkUp, dus bij bevroren gegevens controleer je of de telefoon met de sensor internet heeft, de sensor binnen Bluetooth-bereik is en de Libre-app niet geforceerd is afgesloten.",
      nb: "Nesten alle LibreLinkUp-problemer er ett av tre: du kommer ikke inn (vanligvis fordi du skriver inn LibreLink-passordet, som hører til en annen konto), du kommer inn men ser ingen data (ingen deler med kontoen ennå), eller dataene slutter å oppdateres. Målingene går sensor → Libre-appen → Abbotts sky → LibreLinkUp, så ved frosne data sjekker du at sensortelefonen har internett, holder Libre-appen i gang og er nær sensoren.",
      sv: "Nästan alla LibreLinkUp-problem är ett av tre: du kan inte logga in (oftast för att du skriver ditt LibreLink-lösenord, som hör till ett annat konto), du loggar in men ser inga data (ingen delar med kontot än), eller så slutar data att uppdateras. Mätvärdena går sensor → Libre-appen → Abbotts moln → LibreLinkUp, så vid frysta data kontrollerar du att sensortelefonen har internet, håller Libre-appen igång och är nära sensorn.",
      ru: "Почти любая проблема с LibreLinkUp — одна из трёх: не получается войти (обычно потому, что вы вводите пароль от LibreLink, а это другой аккаунт), вход есть, но данных нет (с этим аккаунтом пока никто не делится), или данные перестают обновляться. Показания идут так: сенсор → приложение Libre → облако Abbott → LibreLinkUp, поэтому при замерших данных проверьте, что у телефона с сенсором есть интернет, приложение Libre работает, а сенсор рядом.",
    },
    keywords: {
      es: ["librelinkup no funciona", "librelinkup no muestra datos", "librelinkup no se actualiza", "librelinkup login", "librelink vs librelinkup"],
      en: ["librelinkup not working", "librelinkup no data", "librelinkup not updating", "librelinkup login", "librelink vs librelinkup", "librelinkup app not receiving data"],
      de: ["librelinkup funktioniert nicht", "librelinkup keine daten", "librelinkup aktualisiert nicht", "librelinkup login", "librelink librelinkup unterschied"],
      fr: ["librelinkup ne fonctionne pas", "librelinkup pas de données", "librelinkup ne se met pas à jour", "librelinkup connexion", "librelink ou librelinkup"],
      it: ["librelinkup non funziona", "librelinkup nessun dato", "librelinkup non si aggiorna", "librelinkup accesso", "librelink o librelinkup"],
      fi: ["librelinkup ei toimi", "librelinkup ei näytä tietoja", "librelinkup ei päivity", "librelinkup kirjautuminen", "librelink vai librelinkup"],
      nl: ["librelinkup werkt niet", "librelinkup geen gegevens", "librelinkup geen recente gegevens", "librelinkup inloggen", "librelink of librelinkup", "librelinkup storing"],
      nb: ["librelinkup fungerer ikke", "librelinkup ingen data", "librelinkup oppdateres ikke", "librelinkup pålogging", "librelink eller librelinkup"],
      sv: ["librelinkup fungerar inte", "librelinkup inga data", "librelinkup uppdateras inte", "librelinkup inloggning", "librelink eller librelinkup"],
      ru: ["librelinkup не работает", "librelinkup нет данных", "librelinkup не обновляется", "librelinkup вход", "librelink или librelinkup"],
    },
    image: "/guides/covers/librelinkup-not-working.webp",
    imageAlt: {
      es: "Lista para LibreLinkUp: volver a iniciar sesión, aceptar la invitación, arreglar datos con retraso",
      en: "LibreLinkUp checklist: sign in again, accept the invitation, fix delayed data",
      de: "LibreLinkUp-Checkliste: neu anmelden, Einladung annehmen, verzögerte Daten beheben",
      fr: "Liste LibreLinkUp : se reconnecter, accepter l'invitation, corriger les données en retard",
      it: "Lista per LibreLinkUp: accedi di nuovo, accetta l'invito, risolvi i dati in ritardo",
      fi: "LibreLinkUp-tarkistuslista: kirjaudu uudelleen, hyväksy kutsu, korjaa viivästyneet tiedot",
      nl: "LibreLinkUp-checklist: opnieuw inloggen, uitnodiging accepteren, vertraagde gegevens oplossen",
      nb: "Sjekkliste for LibreLinkUp: logg inn på nytt, godta invitasjonen, fiks forsinkede data",
      sv: "Checklista för LibreLinkUp: logga in igen, godkänn inbjudan, åtgärda fördröjda data",
      ru: "Чек-лист LibreLinkUp: войти снова, принять приглашение, исправить задержку данных",
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
      fr: [
        { q: "Pourquoi je n'arrive pas à me connecter à LibreLinkUp ?", a: "Presque toujours parce que tu tapes le mot de passe de LibreLink. LibreLink et LibreLinkUp sont deux apps distinctes avec des comptes distincts. Après plusieurs essais d'affilée, attends une minute, et accepte les nouvelles conditions si l'app te le demande." },
        { q: "Pourquoi LibreLinkUp n'affiche aucune donnée ?", a: "Parce que personne ne partage encore avec ce compte. Sur le téléphone de la personne qui porte le capteur, ouvre l'app Libre, va dans Applis connectées, ajoute LibreLinkUp avec l'e-mail exact du compte LibreLinkUp et accepte l'invitation dans LibreLinkUp." },
        { q: "Pourquoi LibreLinkUp est-il en retard ou figé ?", a: "Presque toujours parce que le téléphone du capteur n'envoie rien. Il lui faut Internet, avec le Libre 3 le capteur doit rester à portée Bluetooth, et l'app Libre ne doit être ni fermée de force ni ralentie par le mode Économie d'énergie." },
        { q: "Dulce fonctionne-t-il si LibreLinkUp ne reçoit rien ?", a: "Non. Dulce reçoit tes mesures via LibreLinkUp : si LibreLinkUp ne reçoit rien, Dulce non plus. Dulce t'affiche en revanche l'âge de la dernière mesure et te prévient à la connexion si tu utilises le mauvais compte.", link: "family-sharing" },
      ],
      it: [
        { q: "Perché non riesco ad accedere a LibreLinkUp?", a: "Quasi sempre perché stai scrivendo la password di LibreLink. LibreLink e LibreLinkUp sono app separate con account separati. Dopo molti tentativi di fila aspetta un minuto, e accetta le nuove condizioni se l'app te lo chiede." },
        { q: "Perché LibreLinkUp non mostra dati?", a: "Perché nessuno condivide ancora con quell'account. Sul telefono di chi porta il sensore apri l'app Libre, vai su App collegate, aggiungi LibreLinkUp con l'email esatta dell'account LibreLinkUp e accetta l'invito in LibreLinkUp." },
        { q: "Perché LibreLinkUp è in ritardo o bloccato?", a: "Quasi sempre perché il telefono del sensore non carica. Ha bisogno di Internet, con il Libre 3 il sensore deve restare nel raggio Bluetooth, e l'app Libre non deve essere chiusa a forza né rallentata dal Risparmio energetico." },
        { q: "Dulce funziona se LibreLinkUp non riceve dati?", a: "No. Dulce riceve le letture tramite LibreLinkUp, quindi se LibreLinkUp non riceve nulla non lo riceve nemmeno Dulce. Dulce però mostra da quanto risale l'ultima lettura e ti avvisa all'accesso se usi l'account sbagliato.", link: "family-sharing" },
      ],
      fi: [
        { q: "Miksi en pääse kirjautumaan LibreLinkUpiin?", a: "Lähes aina siksi, että syötät LibreLink-salasanasi. LibreLink ja LibreLinkUp ovat erillisiä sovelluksia erillisillä tileillä. Jos olet yrittänyt monta kertaa peräkkäin, odota minuutti ja hyväksy uudet ehdot, jos sovellus pyytää." },
        { q: "Miksi LibreLinkUp ei näytä tietoja?", a: "Koska kukaan ei vielä jaa sille tilille. Avaa sensoria käyttävän puhelimessa Libre-sovellus, mene kohtaan Yhdistetyt sovellukset, lisää LibreLinkUp LibreLinkUp-tilin tarkalla sähköpostiosoitteella ja hyväksy kutsu LibreLinkUpissa." },
        { q: "Miksi LibreLinkUp on myöhässä tai jumissa?", a: "Lähes aina siksi, ettei sensorin puhelin lähetä lukemia. Se tarvitsee internetin, Libre 3:lla sensorin on oltava Bluetooth-kantamalla, eikä Libre-sovellusta saa sulkea väkisin tai hidastaa virransäästötilalla." },
        { q: "Toimiiko Dulce, jos LibreLinkUp ei saa tietoja?", a: "Ei. Dulce saa lukemasi LibreLinkUpin kautta, joten jos LibreLinkUp ei saa mitään, ei Dulcekaan. Dulce näyttää kuitenkin, kuinka kauan viimeisestä lukemasta on, ja kertoo kirjautuessa, jos käytät väärää tiliä.", link: "family-sharing" },
      ],
      nl: [
        { q: "Waarom kan ik niet inloggen bij LibreLinkUp?", a: "Bijna altijd omdat je het wachtwoord van LibreLink typt. LibreLink en LibreLinkUp zijn aparte apps met aparte accounts. Heb je het vaak achter elkaar geprobeerd, wacht dan een minuut, en accepteer nieuwe voorwaarden als de app erom vraagt." },
        { q: "Waarom toont LibreLinkUp geen gegevens?", a: "Omdat niemand nog met dat account deelt. Open op de telefoon van degene met de sensor de Libre-app, ga naar Verbonden apps, voeg LibreLinkUp toe met het exacte e-mailadres van het LibreLinkUp-account en accepteer de uitnodiging in LibreLinkUp." },
        { q: "Waarom loopt LibreLinkUp achter of staat het stil?", a: "Bijna altijd omdat de telefoon met de sensor niets uploadt. Die heeft internet nodig, bij de Libre 3 moet de sensor binnen Bluetooth-bereik zijn, en de Libre-app mag niet geforceerd worden afgesloten of afgeremd door de energiebesparingsmodus." },
        { q: "Werkt Dulce als LibreLinkUp geen gegevens krijgt?", a: "Nee. Dulce krijgt je metingen via LibreLinkUp, dus als LibreLinkUp niets krijgt, krijgt Dulce ook niets. Dulce laat wel zien hoe lang geleden de laatste meting was en zegt bij het inloggen of je het verkeerde account gebruikt.", link: "family-sharing" },
      ],
      nb: [
        { q: "Hvorfor kommer jeg ikke inn i LibreLinkUp?", a: "Nesten alltid fordi du skriver inn LibreLink-passordet ditt. LibreLink og LibreLinkUp er separate apper med separate kontoer. Har du prøvd mange ganger på rad, vent et minutt, og godta eventuelle nye vilkår appen ber om." },
        { q: "Hvorfor viser ikke LibreLinkUp data?", a: "Fordi ingen deler med den kontoen ennå. Åpne Libre-appen på telefonen til den som har sensoren, gå til Tilkoblede apper, legg til LibreLinkUp med nøyaktig samme e-post som LibreLinkUp-kontoen og godta invitasjonen i LibreLinkUp." },
        { q: "Hvorfor er LibreLinkUp forsinket eller står stille?", a: "Nesten alltid fordi sensortelefonen ikke laster opp. Den trenger internett, med Libre 3 må sensoren være innenfor Bluetooth-rekkevidde, og Libre-appen må ikke tvangsavsluttes eller bremses av strømsparingsmodus." },
        { q: "Fungerer Dulce hvis LibreLinkUp ikke får data?", a: "Nei. Dulce får målingene dine via LibreLinkUp, så får ikke LibreLinkUp noe, får heller ikke Dulce det. Dulce viser likevel hvor lenge siden den siste målingen var, og sier fra ved pålogging hvis du bruker feil konto.", link: "family-sharing" },
      ],
      sv: [
        { q: "Varför kan jag inte logga in i LibreLinkUp?", a: "Nästan alltid för att du skriver ditt LibreLink-lösenord. LibreLink och LibreLinkUp är separata appar med separata konton. Om du har försökt många gånger i rad, vänta en minut och godkänn eventuella nya villkor som appen ber om." },
        { q: "Varför visar LibreLinkUp inga data?", a: "För att ingen delar med det kontot än. Öppna Libre-appen på telefonen hos den som bär sensorn, gå till Anslutna appar, lägg till LibreLinkUp med exakt samma e-post som LibreLinkUp-kontot och godkänn inbjudan i LibreLinkUp." },
        { q: "Varför är LibreLinkUp fördröjt eller fryst?", a: "Nästan alltid för att sensortelefonen inte laddar upp. Den behöver internet, med Libre 3 måste sensorn vara inom Bluetooth-räckvidd, och Libre-appen får inte tvångsavslutas eller bromsas av strömsparläge." },
        { q: "Fungerar Dulce om LibreLinkUp inte får några data?", a: "Nej. Dulce får dina mätvärden via LibreLinkUp, så om LibreLinkUp inte får något får inte Dulce det heller. Dulce visar ändå hur länge sedan det senaste mätvärdet kom och säger till vid inloggningen om du använder fel konto.", link: "family-sharing" },
      ],
      ru: [
        { q: "Почему не получается войти в LibreLinkUp?", a: "Почти всегда потому, что вы вводите пароль от LibreLink. LibreLink и LibreLinkUp — разные приложения с разными аккаунтами. Если вы пробовали много раз подряд, подождите минуту и примите новые условия, если приложение их предлагает." },
        { q: "Почему LibreLinkUp не показывает данные?", a: "Потому что с этим аккаунтом пока никто не делится. На телефоне человека с сенсором откройте приложение Libre, перейдите в «Подключённые приложения», добавьте LibreLinkUp с точной почтой аккаунта LibreLinkUp и примите приглашение в LibreLinkUp." },
        { q: "Почему LibreLinkUp запаздывает или замер?", a: "Почти всегда потому, что телефон с сенсором ничего не отправляет. Ему нужен интернет, с Libre 3 сенсор должен быть в зоне Bluetooth, а приложение Libre нельзя закрывать принудительно или тормозить режимом энергосбережения." },
        { q: "Работает ли Dulce, если LibreLinkUp не получает данных?", a: "Нет. Dulce получает показания через LibreLinkUp, поэтому если LibreLinkUp ничего не получает, Dulce тоже. Но Dulce показывает, сколько прошло с последнего показания, и при входе сообщает, если вы используете не тот аккаунт.", link: "family-sharing" },
      ],
    },
  },
  {
    id: "trends",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-11-03",
    slug: {
      es: "tendencias-glucosa-tiempo-en-rango-gmi",
      en: "glucose-trends-time-in-range-gmi",
      de: "glukose-trends-zeit-im-zielbereich-gmi",
      fr: "tendances-glycemie-temps-dans-la-cible-gmi",
      it: "andamento-glicemia-tempo-nel-range-gmi",
    },
    title: {
      es: "Tendencias en Dulce: tiempo en rango, media y GMI de tu Libre",
      en: "Trends in Dulce: time in range, average and GMI from your Libre",
      de: "Trends in Dulce: Zeit im Zielbereich, Mittelwert und GMI deines Libre",
      fr: "Tendances dans Dulce : temps dans la cible, moyenne et GMI",
      it: "Andamento in Dulce: tempo nel range, media e GMI",
    },
    description: {
      es: "Cómo leer la pestaña Tendencias de Dulce: tiempo en rango de 7 a 90 días, glucosa media, GMI y el reparto por mañana, tarde y noche para ver patrones.",
      en: "How to read the Trends tab in Dulce: time in range over 7 to 90 days, average glucose, GMI, and the morning, afternoon and night split that reveals patterns.",
      de: "So liest du den Trends-Tab in Dulce: Zeit im Zielbereich über 7 bis 90 Tage, Mittelwert, GMI und die Aufteilung nach Morgen, Nachmittag und Nacht.",
      fr: "Comment lire l'onglet Tendances de Dulce : temps dans la cible sur 7 à 90 jours, glycémie moyenne, GMI et la répartition matin, après-midi et nuit.",
      it: "Come leggere la scheda Andamento di Dulce: tempo nel range da 7 a 90 giorni, glicemia media, GMI e la divisione mattina, pomeriggio e notte.",
    },
    summary: {
      es: "La pestaña Tendencias de Dulce muestra tu tiempo en rango, tu glucosa media y una HbA1c estimada (GMI) para 7, 14, 30 o 90 días, cada una comparada con el periodo anterior. Debajo, el desglose por día y por mañana, tarde y noche te enseña dónde está de verdad el problema. El GMI se calcula con la media del sensor, así que no coincidirá exactamente con la HbA1c del laboratorio.",
      en: "The Trends tab in Dulce shows your time in range, average glucose and an estimated A1C (GMI) over 7, 14, 30 or 90 days, each compared with the previous period. Below that, a breakdown by day and by morning, afternoon and night shows where the problem actually is. GMI is calculated from your sensor's average, so it won't match a lab A1C exactly.",
      de: "Der Tab Trends in Dulce zeigt deine Zeit im Zielbereich, deine Durchschnittsglukose und einen geschätzten HbA1c (GMI) für 7, 14, 30 oder 90 Tage, jeweils im Vergleich zum vorherigen Zeitraum. Darunter zeigt die Aufteilung nach Tag und nach Morgen, Nachmittag und Nacht, wo das Problem wirklich liegt. Der GMI wird aus dem Mittelwert deines Sensors berechnet und passt deshalb nicht genau zum HbA1c aus dem Labor.",
      fr: "L'onglet Tendances de Dulce affiche ton temps dans la cible, ta glycémie moyenne et une HbA1c estimée (GMI) sur 7, 14, 30 ou 90 jours, chacun comparé à la période précédente. En dessous, le détail par jour et par matin, après-midi et nuit montre où se situe vraiment le problème. Le GMI est calculé à partir de la moyenne de ton capteur, il ne correspondra donc pas exactement à l'HbA1c du laboratoire.",
      it: "La scheda Andamento di Dulce mostra il tempo nel range, la glicemia media e una HbA1c stimata (GMI) su 7, 14, 30 o 90 giorni, ciascuno confrontato con il periodo precedente. Sotto, il dettaglio per giorno e per mattina, pomeriggio e notte mostra dove sta davvero il problema. Il GMI si calcola dalla media del sensore, quindi non coinciderà esattamente con l'HbA1c di laboratorio.",
    },
    keywords: {
      es: ["tiempo en rango libre", "gmi libre", "glucosa media", "patrones de glucosa", "informe glucosa libre"],
      en: ["libre time in range", "gmi calculator", "average glucose", "glucose patterns", "cgm report"],
      de: ["zeit im zielbereich libre", "gmi", "durchschnittlicher blutzucker", "glukose muster", "cgm auswertung"],
      fr: ["temps dans la cible libre", "calcul gmi", "glycémie moyenne", "profil glycémique", "rapport capteur glycémie"],
      it: ["tempo nel range libre", "calcolo gmi", "glicemia media", "profilo glicemico", "report sensore glicemia"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Dulce con la gráfica de 12 horas y el tiempo en rango",
      en: "Dulce with the 12-hour chart and time in range",
      de: "Dulce mit dem 12-Stunden-Verlauf und der Zeit im Zielbereich",
      fr: "Dulce avec la courbe sur 12 heures et le temps dans la cible",
      it: "Dulce con il grafico delle 12 ore e il tempo nel range",
    },
    related: ["time-in-range", "hba1c", "logbook", "apple-health"],
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
      fr: [
        { q: "Que montre l'onglet Tendances de Dulce ?", a: "Ton temps dans la cible, ta glycémie moyenne et une HbA1c estimée (GMI) sur 7, 14, 30 ou 90 jours, chacun comparé à la période précédente, plus le détail par jour et par moment de la journée." },
        { q: "Pourquoi l'HbA1c estimée ne correspond-elle pas à celle du laboratoire ?", a: "Parce que c'est le GMI, calculé à partir de la glycémie moyenne du capteur, alors que l'HbA1c est une analyse de sang. Il est normal qu'elles ne coïncident pas exactement.", link: "time-in-range" },
        { q: "Puis-je modifier la plage cible ?", a: "Oui. Dans Réglages, Plage cible et Objectif de temps dans la cible. Par défaut : 70 à 180 mg/dL et 70 %, les objectifs du consensus pour la plupart des adultes." },
      ],
      it: [
        { q: "Cosa mostra la scheda Andamento di Dulce?", a: "Il tempo nel range, la glicemia media e una HbA1c stimata (GMI) su 7, 14, 30 o 90 giorni, ciascuno confrontato con il periodo precedente, più il dettaglio per giorno e per fascia oraria." },
        { q: "Perché la HbA1c stimata non coincide con quella del laboratorio?", a: "Perché è il GMI, calcolato dalla glicemia media del sensore, mentre la HbA1c è un esame del sangue. È normale che non coincidano del tutto.", link: "time-in-range" },
        { q: "Posso cambiare l'intervallo target?", a: "Sì. In Impostazioni, Intervallo target e Obiettivo tempo nel range. Di default sono 70-180 mg/dL e 70%, gli obiettivi del consenso per la maggior parte degli adulti." },
      ],
    },
  },
  {
    id: "logbook",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-11-05",
    slug: {
      es: "diario-de-diabetes-hidratos-e-insulina",
      en: "diabetes-logbook-carbs-and-insulin",
      de: "diabetes-tagebuch-kohlenhydrate-und-insulin",
      fr: "carnet-diabete-glucides-insuline",
      it: "diario-diabete-carboidrati-insulina",
    },
    title: {
      es: "Diario de diabetes: apunta hidratos e insulina junto a tu Libre",
      en: "Diabetes logbook: log carbs and insulin next to your Libre",
      de: "Diabetes-Tagebuch: Kohlenhydrate und Insulin neben deinem Libre",
      fr: "Carnet de diabète : noter glucides et insuline avec ton Libre",
      it: "Diario del diabete: registra carboidrati e insulina con il Libre",
    },
    description: {
      es: "Cómo registrar hidratos, insulina y glucosa capilar en segundos en el Diario de Dulce y verlos en una sola línea de tiempo con las lecturas del sensor.",
      en: "How to log carbs, insulin and fingerstick glucose in seconds in the Dulce Logbook and see them on one timeline with your sensor readings.",
      de: "So trägst du Kohlenhydrate, Insulin und blutige Messungen in Sekunden ins Dulce-Tagebuch ein und siehst sie auf einer Zeitleiste mit den Sensorwerten.",
      fr: "Comment noter glucides, insuline et glycémie capillaire en quelques secondes dans le Journal de Dulce et les voir sur la même chronologie que ton capteur.",
      it: "Come registrare carboidrati, insulina e glicemia capillare in pochi secondi nel Diario di Dulce e vederli sulla stessa linea del tempo del sensore.",
    },
    summary: {
      es: "El Diario de Dulce te deja apuntar hidratos, insulina (bolo o basal, por separado) y glucosa capilar en segundos, desde la pestaña Diario o con los botones de hidratos e insulina de la pantalla principal. Cada apunte aparece en la misma línea de tiempo que tus lecturas del sensor, así que cada subida tiene su motivo al lado. El Diario es gratis; Dulce Pro solo hace falta para leer datos de Apple Salud.",
      en: "Dulce's Logbook lets you record carbs, insulin (bolus or basal, kept apart) and fingerstick glucose in seconds, from the Logbook tab or the Carbs and Insulin buttons on the home screen. Every entry sits on the same timeline as your sensor readings, so a spike has its reason right next to it. The Logbook is free; Dulce Pro is only needed to read data from Apple Health.",
      de: "Im Logbuch von Dulce trägst du Kohlenhydrate, Insulin (Bolus und Basal getrennt) und Blutzucker aus dem Finger in Sekunden ein, über den Tab Logbuch oder die Knöpfe für Kohlenhydrate und Insulin auf dem Startbildschirm. Jeder Eintrag steht auf derselben Zeitachse wie deine Sensorwerte, so hat jeder Anstieg seinen Grund gleich daneben. Das Logbuch ist kostenlos; Dulce Pro brauchst du nur, um Daten aus Apple Health zu lesen.",
      fr: "Le Journal de Dulce te permet de noter glucides, insuline (bolus et basale séparés) et glycémie capillaire en quelques secondes, depuis l'onglet Journal ou les boutons glucides et insuline de l'écran principal. Chaque entrée apparaît sur la même ligne de temps que tes mesures du capteur, donc chaque pic a sa raison juste à côté. Le Journal est gratuit ; Dulce Pro n'est nécessaire que pour lire les données d'Apple Santé.",
      it: "Il Diario di Dulce ti fa registrare carboidrati, insulina (bolo e basale separati) e glicemia capillare in pochi secondi, dalla scheda Diario o con i pulsanti carboidrati e insulina della schermata principale. Ogni voce compare sulla stessa linea del tempo delle letture del sensore, così ogni picco ha il suo motivo accanto. Il Diario è gratuito; Dulce Pro serve solo per leggere i dati di Salute di Apple.",
    },
    keywords: {
      es: ["diario diabetes app", "app diabetes tipo 1", "registro insulina app", "contar hidratos app", "diario glucosa"],
      en: ["diabetes logbook app", "insulin log app", "carb tracker diabetes", "type 1 diabetes app", "blood sugar log"],
      de: ["diabetes tagebuch app", "insulin tagebuch", "kohlenhydrate app diabetes", "diabetes app", "blutzucker tagebuch"],
      fr: ["carnet diabète app", "app carnet glycémie", "noter insuline app", "compter glucides diabète", "app diabète type 1"],
      it: ["diario diabete app", "app diario glicemia", "registrare insulina app", "contare carboidrati diabete", "app diabete tipo 1"],
    },
    image: "/guides/logbook.jpg",
    imageAlt: {
      es: "Diario de Dulce con registros de insulina e hidratos y el panel para añadir 5,5 u",
      en: "Dulce Logbook with insulin and carb entries and the add-entry sheet at 5.5 u",
      de: "Dulce-Tagebuch mit Insulin- und Kohlenhydrat-Einträgen und dem Eingabefeld mit 5,5 IE",
      fr: "Journal de Dulce avec des entrées d'insuline et de glucides et la fiche d'ajout à 5,5 U",
      it: "Diario di Dulce con voci di insulina e carboidrati e la scheda di inserimento a 5,5 U",
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
      fr: [
        { q: "Faut-il Dulce Pro pour le Journal ?", a: "Non. Le Journal et l'onglet Tendances font partie de la version gratuite. Pro n'est nécessaire que pour lire les données d'Apple Santé." },
        { q: "Puis-je séparer bolus et basale ?", a: "Oui. Quand tu notes de l'insuline, tu choisis bolus ou basale, et elle apparaît ainsi dans le Journal." },
        { q: "Et si j'utilise les mmol/L ?", a: "La glycémie manuelle se saisit dans l'unité choisie dans les Réglages, mg/dL ou mmol/L." },
      ],
      it: [
        { q: "Serve Dulce Pro per il Diario?", a: "No. Il Diario e la scheda Andamento sono nella versione gratuita. Pro serve solo per leggere i dati di Salute di Apple." },
        { q: "Posso separare bolo e basale?", a: "Sì. Quando registri l'insulina scegli bolo o basale, e compare così nel Diario." },
        { q: "E se uso i mmol/L?", a: "La glicemia manuale si inserisce nell'unità scelta in Impostazioni, mg/dL o mmol/L." },
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
      fr: "freestyle-libre-et-apple-sante",
      it: "freestyle-libre-e-salute-di-apple",
    },
    title: {
      es: "FreeStyle Libre y Apple Salud: qué datos se pueden ver juntos",
      en: "FreeStyle Libre and Apple Health: what you can see together",
      de: "FreeStyle Libre und Apple Health: Welche Daten zusammenkommen",
      fr: "FreeStyle Libre et Apple Santé : ce que tu peux voir ensemble",
      it: "FreeStyle Libre e Salute di Apple: cosa puoi vedere insieme",
    },
    description: {
      es: "Cómo funciona Apple Salud con tu glucosa, qué lee Dulce (glucosa, insulina e hidratos), qué no escribe y cómo dar o quitar el permiso en el iPhone.",
      en: "How Apple Health works with your glucose, what Dulce reads (glucose, insulin and carbs), what it never writes, and how to grant or revoke access on iPhone.",
      de: "Wie Apple Health mit deinem Blutzucker funktioniert, was Dulce liest (Glukose, Insulin, Kohlenhydrate), was es nie schreibt und wie du den Zugriff steuerst.",
      fr: "Comment Apple Santé gère ta glycémie, ce que Dulce lit (glycémie, insuline et glucides), ce qu'il n'écrit jamais et comment donner ou retirer l'accès.",
      it: "Come Salute di Apple gestisce la glicemia, cosa legge Dulce (glicemia, insulina e carboidrati), cosa non scrive mai e come concedere o revocare l'accesso.",
    },
    summary: {
      es: "Apple Salud guarda glucosa, insulina e hidratos que escriben distintas apps, y tú decides qué apps pueden leer o escribir cada dato. Dulce solo lee de Apple Salud (glucosa, insulina e hidratos, con Dulce Pro) y nunca escribe; la glucosa de tu sensor llega a Dulce por LibreLinkUp, no por Salud. Puedes retirarle el acceso a Dulce cuando quieras desde la app Salud.",
      en: "Apple Health stores blood glucose, insulin and carbs written by different apps, and you decide which apps may read or write each one. Dulce only reads from Apple Health (glucose, insulin and carbs, with Dulce Pro) and never writes to it; your sensor glucose reaches Dulce through LibreLinkUp, not through Health. You can revoke Dulce's access at any time in the Health app.",
      de: "Apple Health speichert Blutzucker, Insulin und Kohlenhydrate aus verschiedenen Apps, und du entscheidest, welche App was lesen oder schreiben darf. Dulce liest nur aus Apple Health (Glukose, Insulin und Kohlenhydrate, mit Dulce Pro) und schreibt nie hinein; dein Sensorwert kommt über LibreLinkUp zu Dulce, nicht über Health. Den Zugriff von Dulce kannst du jederzeit in der Health-App widerrufen.",
      fr: "Apple Santé stocke glycémie, insuline et glucides écrits par différentes apps, et c'est toi qui décides quelle app peut lire ou écrire chaque donnée. Dulce ne fait que lire dans Apple Santé (glycémie, insuline et glucides, avec Dulce Pro) et n'y écrit jamais ; la glycémie de ton capteur arrive dans Dulce par LibreLinkUp, pas par Santé. Tu peux retirer l'accès à Dulce à tout moment dans l'app Santé.",
      it: "Salute di Apple conserva glicemia, insulina e carboidrati scritti da app diverse, e sei tu a decidere quale app può leggere o scrivere ciascun dato. Dulce legge soltanto da Salute di Apple (glicemia, insulina e carboidrati, con Dulce Pro) e non scrive mai; la glicemia del sensore arriva a Dulce tramite LibreLinkUp, non da Salute. Puoi revocare l'accesso a Dulce quando vuoi dall'app Salute.",
    },
    keywords: {
      es: ["libre apple salud", "freestyle libre apple health", "glucosa apple salud", "libre 3 apple health", "insulina apple salud"],
      en: ["freestyle libre apple health", "libre 3 apple health", "glucose apple health", "librelinkup apple health", "insulin apple health"],
      de: ["libre apple health", "freestyle libre apple health", "blutzucker apple health", "libre 3 apple health", "insulin apple health"],
      fr: ["freestyle libre apple santé", "libre 3 apple santé", "glycémie apple santé", "librelinkup apple santé", "insuline apple santé"],
      it: ["freestyle libre salute apple", "libre 3 app salute", "glicemia app salute iphone", "librelinkup salute apple", "insulina app salute"],
    },
    image: "/guides/covers/apple-health.webp",
    imageAlt: {
      es: "iPhone con Dulce y los datos que lee de Apple Salud: glucosa, insulina, hidratos",
      en: "iPhone with Dulce and the data it reads from Apple Health: glucose, insulin, carbs",
      de: "iPhone mit Dulce und den Daten, die es aus Apple Health liest: Glukose, Insulin, Kohlenhydrate",
      fr: "iPhone avec Dulce et les données lues dans Apple Santé : glycémie, insuline, glucides",
      it: "iPhone con Dulce e i dati che legge da Apple Salute: glicemia, insulina, carboidrati",
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
      fr: [
        { q: "Faut-il Apple Santé pour utiliser Dulce ?", a: "Non. Dulce reçoit ta glycémie du capteur via LibreLinkUp. Apple Santé est facultatif et sert à ajouter les données d'autres apps." },
        { q: "Dulce envoie-t-il ma glycémie à Apple Santé ?", a: "Non. Dulce lit uniquement dans Apple Santé ; il n'y écrit rien." },
        { q: "Les données d'Apple Santé apparaissent-elles dans l'Activité en direct et sur l'Apple Watch ?", a: "Non. Celles-ci affichent les mesures de ton capteur. Les données de Santé apparaissent dans le Journal et dans Tendances." },
      ],
      it: [
        { q: "Serve Salute di Apple per usare Dulce?", a: "No. Dulce riceve la glicemia dal sensore tramite LibreLinkUp. Salute di Apple è facoltativa e serve ad aggiungere dati di altre app." },
        { q: "Dulce invia la mia glicemia a Salute di Apple?", a: "No. Dulce legge soltanto da Salute; non scrive nulla." },
        { q: "I dati di Salute compaiono nell'Attività in tempo reale e su Apple Watch?", a: "No. Lì vedi le letture del sensore. I dati di Salute compaiono nel Diario e in Andamento." },
      ],
    },
  },
  {
    id: "child-glucose",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-22",
    dateModified: "2026-11-05",
    slug: {
      es: "ver-glucosa-de-mi-hijo-en-el-iphone",
      en: "monitor-child-glucose-on-iphone",
      de: "blutzucker-vom-kind-auf-dem-iphone-sehen",
      fr: "voir-glycemie-de-mon-enfant-sur-iphone",
      it: "vedere-glicemia-di-mio-figlio-su-iphone",
    },
    title: {
      es: "Cómo ver la glucosa de tu hijo en tu iPhone",
      en: "How to see your child's glucose on your iPhone",
      de: "Den Blutzucker deines Kindes auf dem iPhone sehen",
      fr: "Comment voir la glycémie de ton enfant sur ton iPhone",
      it: "Come vedere la glicemia di tuo figlio sul tuo iPhone",
    },
    description: {
      es: "Para padres y cuidadores: sigue la glucosa del FreeStyle Libre de tu hijo o de tu padre en tu iPhone, con avisos, pantalla de bloqueo y mensajes de un toque.",
      en: "For parents and caregivers: follow your child's or parent's FreeStyle Libre glucose on your iPhone, with alerts, the Lock Screen and one-tap check-in messages.",
      de: "Für Eltern und Angehörige: Verfolge den FreeStyle Libre Wert deines Kindes oder Elternteils auf dem iPhone, mit Warnungen, Sperrbildschirm und Nachrichten.",
      fr: "Parents et aidants : suis la glycémie FreeStyle Libre de ton enfant ou de ton parent sur ton iPhone, avec alertes, écran verrouillé et messages en un geste.",
      it: "Genitori e caregiver: segui la glicemia del FreeStyle Libre di tuo figlio o di un genitore sul tuo iPhone, con avvisi, schermata di blocco e messaggi.",
    },
    summary: {
      es: "Puedes ver la glucosa del FreeStyle Libre de tu hijo en tu propio iPhone, también en la pantalla de bloqueo, con avisos de bajadas y subidas y sin desbloquear el móvil. O tu hijo te invita como seguidor desde Dulce, o tú inicias sesión en Dulce con la cuenta de LibreLinkUp con la que ya comparte. Su móvil tiene que seguir leyendo el sensor con la app de Libre y tener internet, porque así salen las lecturas del sensor.",
      en: "You can see your child's FreeStyle Libre glucose on your own iPhone, Lock Screen included, with low and high alerts and without unlocking your phone. Either your child invites you as a follower from Dulce, or you sign in to Dulce with the LibreLinkUp account they already share with. Their phone has to keep the Libre app reading the sensor and stay online, because that is how readings leave the sensor.",
      de: "Du kannst den FreeStyle Libre Wert deines Kindes auf deinem eigenen iPhone sehen, auch auf dem Sperrbildschirm, mit Warnungen bei niedrigen und hohen Werten und ohne das Handy zu entsperren. Entweder lädt dein Kind dich in Dulce als Follower ein, oder du meldest dich in Dulce mit dem LibreLinkUp-Konto an, mit dem es schon teilt. Sein Handy muss mit der Libre-App den Sensor weiter auslesen und online sein, denn nur so verlassen die Werte den Sensor.",
      fr: "Tu peux voir la glycémie FreeStyle Libre de ton enfant sur ton propre iPhone, écran verrouillé compris, avec des alertes d'hypo et d'hyper et sans déverrouiller ton téléphone. Soit ton enfant t'invite comme abonné depuis Dulce, soit tu te connectes à Dulce avec le compte LibreLinkUp avec lequel il partage déjà. Son téléphone doit continuer à lire le capteur avec l'app Libre et rester connecté, car c'est ainsi que les mesures quittent le capteur.",
      it: "Puoi vedere la glicemia del FreeStyle Libre di tuo figlio sul tuo iPhone, anche sulla schermata di blocco, con avvisi di ipo e iper e senza sbloccare il telefono. O tuo figlio ti invita come follower da Dulce, oppure accedi a Dulce con l'account LibreLinkUp con cui già condivide. Il suo telefono deve continuare a leggere il sensore con l'app Libre ed essere connesso, perché è così che le letture lasciano il sensore.",
    },
    keywords: {
      es: ["ver glucosa de mi hijo", "seguir glucosa hijo", "controlar glucosa hijo a distancia", "app diabetes padres", "libre seguir a mi hijo"],
      en: ["monitor child glucose remotely", "see my child's blood sugar on iphone", "follow child libre", "diabetes app for parents", "caregiver glucose app"],
      de: ["blutzucker kind überwachen", "blutzucker kind handy", "libre kind folgen", "diabetes app eltern", "blutzucker eltern überwachen"],
      fr: ["voir glycémie de mon enfant", "suivre glycémie enfant à distance", "app diabète parents", "glycémie enfant iphone", "aidant diabète app"],
      it: ["vedere glicemia di mio figlio", "monitorare glicemia figlio a distanza", "app diabete genitori", "glicemia bambino iphone", "app glicemia caregiver"],
    },
    image: "/guides/family-followers.jpg",
    imageAlt: {
      es: "Pantalla Tus seguidores de Dulce con un mensaje de la familia y el botón Estoy bien",
      en: "Dulce Your followers screen with a family message and the I'm OK button",
      de: "Follower-Bildschirm von Dulce mit einer Nachricht aus der Familie und der Antwort-Schaltfläche",
      fr: "Écran Tes abonnés de Dulce avec un message de la famille et le bouton Ça va",
      it: "Schermata I tuoi follower di Dulce con un messaggio della famiglia e il pulsante Sto bene",
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
        { q: "How much does it cost to follow someone?", a: "Nothing for the follower. Sharing is a Dulce Pro feature for the person wearing the sensor, with a 14-day free trial, and has no limit on followers." },
        { q: "Does it work for caring for an older parent?", a: "Yes. If their Libre app shares with your LibreLinkUp account, you sign in to Dulce with it and they don't have to install anything else on their phone." },
      ],
      de: [
        { q: "Kann ich den Zucker meines Kindes auf meinem iPhone-Sperrbildschirm sehen?", a: "Ja. Mit Dulce erscheint der FreeStyle Libre Wert deines Kindes als Live-Aktivität auf deinem Sperrbildschirm, mit Warnungen bei niedrigen und hohen Werten, ohne dass du das Handy entsperrst. Dein Kind lädt dich in Dulce als Follower ein, oder du meldest dich in Dulce mit dem LibreLinkUp-Konto an, mit dem es schon teilt." },
        { q: "Braucht mein Kind ein iPhone?", a: "Es braucht ein Handy mit der Libre-App, die den Sensor ausliest, und Internet. Um dich aus Dulce einzuladen, muss das ein iPhone sein; teilt es nur mit deinem LibreLinkUp-Konto, öffnest du Dulce auf deinem iPhone mit diesem Konto." },
        { q: "Was kostet es, jemandem zu folgen?", a: "Für Follower nichts. Teilen ist eine Dulce Pro Funktion für die Person mit dem Sensor, mit 14 Tagen Gratis-Test, und erlaubt beliebig viele Follower." },
        { q: "Funktioniert das auch für ältere Eltern?", a: "Ja. Wenn ihre Libre-App mit deinem LibreLinkUp-Konto teilt, meldest du dich damit in Dulce an, und sie müssen nichts weiter auf ihrem Handy installieren." },
      ],
      fr: [
        { q: "Puis-je suivre la glycémie de mon enfant sur l'écran verrouillé de mon iPhone ?", a: "Oui. Avec Dulce, la glycémie FreeStyle Libre de ton enfant s'affiche sur ton écran verrouillé en Activité en direct, avec des alertes d'hypo et d'hyper, sans déverrouiller ton téléphone. Ton enfant t'invite comme abonné depuis Dulce, ou tu te connectes à Dulce avec le compte LibreLinkUp avec lequel il partage déjà." },
        { q: "Mon enfant a-t-il besoin d'un iPhone ?", a: "Il lui faut un téléphone avec l'app Libre qui lit son capteur et une connexion Internet. Pour t'inviter depuis Dulce, ce téléphone doit être un iPhone ; s'il partage seulement avec ton compte LibreLinkUp, tu ouvres Dulce sur ton iPhone avec ce compte." },
        { q: "Combien coûte le fait de suivre quelqu'un ?", a: "Rien pour l'abonné. Le partage est une fonction de Dulce Pro pour la personne qui porte le capteur, avec 14 jours d'essai gratuit, et sans limite d'abonnés." },
        { q: "Est-ce que ça marche pour veiller sur un parent âgé ?", a: "Oui. Si son app Libre partage avec ton compte LibreLinkUp, tu te connectes à Dulce avec ce compte et il n'a rien d'autre à installer sur son téléphone." },
      ],
      it: [
        { q: "Posso seguire la glicemia di mio figlio sulla schermata di blocco del mio iPhone?", a: "Sì. Con Dulce la glicemia del FreeStyle Libre di tuo figlio compare sulla tua schermata di blocco come Attività in tempo reale, con avvisi di ipo e iper, senza sbloccare il telefono. Tuo figlio ti invita come follower da Dulce, oppure accedi a Dulce con l'account LibreLinkUp con cui già condivide." },
        { q: "Mio figlio ha bisogno di un iPhone?", a: "Gli serve un telefono con l'app Libre che legge il sensore e una connessione a Internet. Per invitarti da Dulce quel telefono deve essere un iPhone; se condivide solo con il tuo account LibreLinkUp, apri Dulce sul tuo iPhone con quell'account." },
        { q: "Quanto costa seguire qualcuno?", a: "Niente per il follower. La condivisione è una funzione di Dulce Pro per chi porta il sensore, con 14 giorni di prova gratuita, e senza limite di follower." },
        { q: "Funziona anche per un genitore anziano?", a: "Sì. Se la sua app Libre condivide con il tuo account LibreLinkUp, accedi a Dulce con quell'account e lui non deve installare nient'altro sul telefono." },
      ],
    },
  },
  {
    id: "night-lows",
    category: "health",
    author: "giorgi",
    datePublished: "2026-10-23",
    dateModified: "2026-10-31",
    slug: {
      es: "hipoglucemia-nocturna",
      en: "nocturnal-hypoglycemia",
      de: "naechtliche-unterzuckerung",
      fr: "hypoglycemie-nocturne",
      it: "ipoglicemia-notturna",
    },
    title: {
      es: "Hipoglucemia nocturna: por qué cuesta notarla y cómo no dormirla",
      en: "Nocturnal hypoglycemia: why night lows are easy to miss",
      de: "Nächtliche Unterzuckerung: warum man sie verschläft und was hilft",
      fr: "Hypoglycémie nocturne : pourquoi on la rate et comment la repérer",
      it: "Ipoglicemia notturna: perché sfugge e come non dormirci sopra",
    },
    description: {
      es: "Por qué cuesta notar las bajadas de noche, cómo distinguir un falso bajo por compresión y cómo preparar iPhone y sensor para que un aviso te despierte.",
      en: "Why lows at night are easy to sleep through, how to spot a compression low, and how to set up your iPhone and sensor so an alert can actually wake you.",
      de: "Warum man Unterzuckerungen nachts verschläft, wie du ein Kompressionstief erkennst und wie du iPhone und Sensor einstellst, damit dich eine Warnung weckt.",
      fr: "Pourquoi on dort pendant une hypo nocturne, comment repérer une hypo de compression et comment régler iPhone et capteur pour qu'une alerte te réveille.",
      it: "Perché di notte un'ipo passa inosservata, come riconoscere un falso calo da compressione e come impostare iPhone e sensore perché un avviso ti svegli.",
    },
    summary: {
      es: "Una hipo nocturna es una glucosa por debajo de 70 mg/dL mientras duermes, y cuesta notarla porque durmiendo el cuerpo libera menos adrenalina ante una bajada, así que mucha gente no se despierta. Una caída brusca mientras estás tumbado sobre el sensor también puede ser una falsa bajada por compresión. Configura avisos que de verdad te despierten (sin modo silencio y con Dulce permitido en Dormir) y confirma cualquier bajada con tu sensor y tu equipo médico.",
      en: "A night low is glucose below 70 mg/dL while you sleep, and it is easy to miss because the body releases less adrenaline in response to a low during sleep, so many people don't wake up. A sharp dip while you lie on the sensor can also be a compression low rather than a real one. Set up alerts that can actually wake you (silent mode off, Dulce allowed in your Sleep Focus), and confirm any low with your sensor and your care team.",
      de: "Eine nächtliche Unterzuckerung ist ein Wert unter 70 mg/dL im Schlaf, und sie fällt leicht durch, weil der Körper im Schlaf auf einen Unterzucker weniger Adrenalin ausschüttet und viele deshalb nicht aufwachen. Ein steiler Abfall, während du auf dem Sensor liegst, kann auch ein Kompressionstief statt eines echten Unterzuckers sein. Richte Warnungen ein, die dich wirklich wecken (Stummmodus aus, Dulce im Fokus Schlafen erlaubt), und prüf jeden niedrigen Wert mit deinem Sensor und deinem Diabetes-Team.",
      fr: "Une hypo nocturne, c'est une glycémie sous 70 mg/dL pendant le sommeil, et on la rate facilement parce qu'en dormant le corps libère moins d'adrénaline face à une hypo, si bien que beaucoup ne se réveillent pas. Une chute brutale pendant que tu es couché sur le capteur peut aussi être une fausse hypo par compression. Règle des alertes capables de te réveiller (mode silencieux désactivé, Dulce autorisé dans Sommeil) et confirme toute hypo avec ton capteur et ton équipe soignante.",
      it: "Un'ipo notturna è una glicemia sotto 70 mg/dL mentre dormi, ed è facile non accorgersene perché nel sonno il corpo rilascia meno adrenalina davanti a un'ipo, quindi molti non si svegliano. Un calo brusco mentre sei sdraiato sul sensore può anche essere un'ipo da compressione e non reale. Imposta avvisi che possano davvero svegliarti (silenzioso disattivato, Dulce consentito in Riposo) e conferma ogni ipo con il sensore e il tuo team diabetologico.",
    },
    keywords: {
      es: ["hipoglucemia nocturna", "bajada de glucosa por la noche", "hipoglucemia durmiendo", "falsa hipoglucemia sensor libre", "alarma glucosa noche"],
      en: ["nocturnal hypoglycemia", "low blood sugar at night", "night time lows type 1 diabetes", "compression low libre", "cgm alarm at night"],
      de: ["nächtliche unterzuckerung", "unterzuckerung nachts", "unterzuckerung im schlaf", "kompressionstief libre", "libre alarm nachts"],
      fr: ["hypoglycémie nocturne", "hypo la nuit", "hypoglycémie pendant le sommeil", "hypo de compression libre", "alarme glycémie nuit"],
      it: ["ipoglicemia notturna", "ipo di notte", "ipoglicemia nel sonno", "falsa ipo da compressione libre", "allarme glicemia notte"],
    },
    image: "/guides/covers/night-lows.webp",
    imageAlt: {
      es: "Ilustración de una curva de glucosa nocturna que baja de 70 hacia las 3 de la madrugada",
      en: "Illustration of an overnight glucose curve dropping below 70 around 3 a.m.",
      de: "Illustration einer nächtlichen Glukosekurve, die gegen 3 Uhr unter 70 fällt",
      fr: "Illustration d'une courbe de glycémie nocturne qui passe sous 70 vers 3 h du matin",
      it: "Illustrazione di una curva glicemica notturna che scende sotto 70 verso le 3",
    },
    related: ["alerts", "time-in-range", "child-glucose"],
    faq: {
      es: [
        { q: "¿Qué se considera hipoglucemia nocturna?", a: "Una bajada de glucosa por debajo de 70 mg/dL mientras duermes. La ADA llama nivel 2 a la que baja de 54 mg/dL y nivel 3 al episodio grave en el que necesitas ayuda de otra persona, sea de día o de noche." },
        { q: "¿Por qué no me despierto con una hipoglucemia?", a: "Porque durante el sueño el cuerpo responde con menos adrenalina. En un estudio, solo 1 de 16 personas con diabetes tipo 1 se despertó con una bajada provocada durante el sueño, frente a 10 de 16 sin diabetes." },
        { q: "¿Mi sensor puede marcar una bajada falsa por la noche?", a: "Sí. Si duermes encima del sensor, la presión puede dar una caída brusca que se recupera al darte la vuelta. Ante la duda, trátala como real y confirma con un glucómetro." },
        { q: "¿Suenan los avisos de Dulce con el iPhone en silencio?", a: "El de hipo crítica, sí: con 55 mg/dL o menos llega como alerta crítica de iOS y suena aunque el iPhone esté en silencio, si permites las alertas críticas de Dulce. Los demás avisos siguen el sonido del iPhone: por la noche quita el modo silencio y, si usas la concentración Dormir, permite las notificaciones de Dulce.", link: "alerts" },
      ],
      en: [
        { q: "What counts as nocturnal hypoglycemia?", a: "A glucose level below 70 mg/dL while you sleep. The ADA calls a drop below 54 mg/dL level 2, and a severe episode where you need someone else's help level 3, day or night." },
        { q: "Why don't I wake up during a low?", a: "Because during sleep the body releases less adrenaline in response to a low. In one study, only 1 of 16 people with type 1 diabetes woke up during a low induced in their sleep, compared with 10 of 16 without diabetes." },
        { q: "Can my sensor show a false low at night?", a: "Yes. Sleeping on the sensor can cause a sharp drop that bounces back once you turn over. If in doubt, treat it as real and confirm with a fingerstick meter." },
        { q: "Do Dulce alerts ring with my iPhone on silent?", a: "The critical low alert does: at 55 mg/dL or less it arrives as an iOS critical alert and rings even on silent, once you allow critical alerts for Dulce. The other alerts follow your iPhone's sound settings, so at night turn silent mode off and, if you use the Sleep Focus, allow notifications from Dulce.", link: "alerts" },
      ],
      de: [
        { q: "Was gilt als nächtliche Unterzuckerung?", a: "Ein Glukosewert unter 70 mg/dL im Schlaf. Die ADA nennt einen Abfall unter 54 mg/dL Stufe 2 und ein schweres Ereignis, bei dem du fremde Hilfe brauchst, Stufe 3, tagsüber wie nachts." },
        { q: "Warum wache ich bei einer Unterzuckerung nicht auf?", a: "Weil der Körper im Schlaf weniger Adrenalin ausschüttet. In einer Studie wachte nur 1 von 16 Menschen mit Typ-1-Diabetes bei einer im Schlaf ausgelösten Unterzuckerung auf, bei Menschen ohne Diabetes waren es 10 von 16." },
        { q: "Kann mein Sensor nachts ein falsches Tief zeigen?", a: "Ja. Liegst du auf dem Sensor, kann der Druck einen steilen Absturz erzeugen, der sich beim Umdrehen wieder erholt. Im Zweifel behandle es als echt und prüf mit einem Blutzuckermessgerät." },
        { q: "Klingeln die Warnungen von Dulce, wenn das iPhone stumm ist?", a: "Die kritische Warnung schon: Bei 55 mg/dL oder weniger kommt sie als kritischer Hinweis von iOS und klingelt auch bei stummem iPhone, sobald du Dulce kritische Hinweise erlaubst. Die anderen Warnungen folgen den Toneinstellungen des iPhone: Schalte nachts den Stummmodus aus und erlaube Dulce im Fokus Schlafen, falls du ihn nutzt.", link: "alerts" },
      ],
      fr: [
        { q: "Qu'appelle-t-on hypoglycémie nocturne ?", a: "Une glycémie sous 70 mg/dL pendant le sommeil. L'ADA appelle niveau 2 une baisse sous 54 mg/dL, et niveau 3 un épisode sévère où tu as besoin de l'aide de quelqu'un, de jour comme de nuit." },
        { q: "Pourquoi je ne me réveille pas pendant une hypo ?", a: "Parce que pendant le sommeil, le corps libère moins d'adrénaline face à une hypo. Dans une étude, 1 seule personne sur 16 avec un diabète de type 1 s'est réveillée pendant une hypo provoquée dans son sommeil, contre 10 sur 16 sans diabète." },
        { q: "Mon capteur peut-il afficher une fausse hypo la nuit ?", a: "Oui. Dormir sur le capteur peut provoquer une chute brutale qui remonte dès que tu te retournes. En cas de doute, considère-la comme réelle et vérifie avec un lecteur capillaire." },
        { q: "Les alertes de Dulce sonnent-elles iPhone en silencieux ?", a: "L'alerte d'hypo critique, oui : à 55 mg/dL ou moins, elle arrive comme alerte critique iOS et sonne même en silencieux, une fois que tu autorises les alertes critiques de Dulce. Les autres alertes suivent les réglages de son de l'iPhone : la nuit, désactive le mode silencieux et, si tu utilises la Concentration Sommeil, autorise les notifications de Dulce.", link: "alerts" },
      ],
      it: [
        { q: "Cosa si intende per ipoglicemia notturna?", a: "Una glicemia sotto 70 mg/dL mentre dormi. L'ADA chiama livello 2 un calo sotto 54 mg/dL e livello 3 un evento grave in cui ti serve l'aiuto di un'altra persona, di giorno come di notte." },
        { q: "Perché non mi sveglio durante un'ipo?", a: "Perché nel sonno il corpo rilascia meno adrenalina in risposta all'ipo. In uno studio si è svegliata solo 1 persona su 16 con diabete di tipo 1 durante un'ipo indotta nel sonno, contro 10 su 16 senza diabete." },
        { q: "Il sensore può mostrare una falsa ipo di notte?", a: "Sì. Dormire sopra il sensore può causare un crollo brusco che rientra appena ti giri. Nel dubbio trattala come vera e verifica con un glucometro da dito." },
        { q: "Gli avvisi di Dulce suonano con l'iPhone in silenzioso?", a: "L'avviso di ipo critica sì: a 55 mg/dL o meno arriva come avviso critico di iOS e suona anche in silenzioso, dopo che consenti gli avvisi critici di Dulce. Gli altri avvisi seguono le impostazioni audio dell'iPhone: di notte disattiva la modalità silenziosa e, se usi la Full immersion Riposo, consenti le notifiche di Dulce.", link: "alerts" },
      ],
    },
  },
  {
    id: "libreview",
    category: "help",
    author: "levan",
    datePublished: "2026-10-24",
    dateModified: "2026-11-03",
    slug: {
      es: "libreview",
      en: "libreview",
      de: "libreview",
      fr: "libreview",
      it: "libreview",
      fi: "libreview",
      nl: "libreview",
      nb: "libreview",
      sv: "libreview",
      ru: "libreview",
    },
    title: {
      es: "LibreView iniciar sesión (libreview.com): acceso, contraseña y errores",
      en: "LibreView login (libreview.com): sign in, reset password, fix errors",
      de: "LibreView Login (libreview.com): anmelden, Passwort, Fehler beheben",
      fr: "LibreView connexion (libreview.com) : se connecter, mot de passe, erreurs",
      it: "LibreView accedi (libreview.com): login, password e problemi di accesso",
      fi: "LibreView kirjautuminen (libreview.com): salasana ja virheet",
      nl: "LibreView inloggen (libreview.com): aanmelden, wachtwoord, fouten",
      nb: "LibreView-pålogging (libreview.com): logg på, nytt passord, feil",
      sv: "LibreView-inloggning (libreview.com): logga in, nytt lösenord, fel",
      ru: "Вход в LibreView (libreview.com): войти, сбросить пароль, ошибки",
    },
    description: {
      es: "Enlace directo a libreview.com y el acceso correcto: el de tu app de Libre, no LibreLinkUp. Contraseña olvidada, cuenta borrada o compartir con tu centro.",
      en: "Direct link to libreview.com and the right login: your Libre app's, not LibreLinkUp. Forgot password, deleted account or sharing with your clinic: fixes.",
      de: "Direkter Link zu libreview.com und der richtige Login: der deiner Libre-App, nicht LibreLinkUp. Passwort vergessen, Konto gelöscht, Praxis verbinden.",
      fr: "Lien direct vers libreview.com et le bon identifiant : celui de ton app Libre, pas LibreLinkUp. Mot de passe oublié, compte supprimé, partage avec ton centre.",
      it: "Link diretto a libreview.com e il login giusto: quello della tua app Libre, non LibreLinkUp. Password dimenticata, account cancellato, condividere col centro.",
      fi: "Suora linkki libreview.comiin ja oikea kirjautuminen: Libre-sovelluksesi tunnukset, ei LibreLinkUp. Unohtunut salasana, poistettu tili ja jakaminen hoitopaikalle.",
      nl: "Directe link naar libreview.com en de juiste login: die van je Libre-app, niet LibreLinkUp. Wachtwoord vergeten, verwijderd account of delen met je zorgverlener.",
      nb: "Direkte lenke til libreview.com og riktig pålogging: den fra Libre-appen din, ikke LibreLinkUp. Glemt passord, slettet konto eller deling med klinikken: løsninger.",
      sv: "Direktlänk till libreview.com och rätt inloggning: den från din Libre-app, inte LibreLinkUp. Glömt lösenord, raderat konto eller delning med mottagningen: lösningar.",
      ru: "Прямая ссылка на libreview.com и правильный вход: от вашего приложения Libre, а не LibreLinkUp. Забытый пароль, удалённый аккаунт или доступ для клиники: решения.",
    },
    summary: {
      es: "Para entrar en LibreView, abre libreview.com y usa el mismo email y contraseña que en la app con la que lees el sensor (FreeStyle LibreLink, FreeStyle Libre 3 o Libre), no tu cuenta de LibreLinkUp, que es otra distinta. Si has olvidado la contraseña, es la misma que la de esa app y se restablece con un enlace por email; según Abbott, las cuentas sin uso en 6 meses pueden borrarse tras un aviso. LibreView guarda tus lecturas y las convierte en informes, como el AGP con el tiempo en rango, para ti y tu centro.",
      en: "To log in to LibreView, go to libreview.com and use the same email and password as the app that reads your sensor (FreeStyle LibreLink, FreeStyle Libre 3 or Libre), not your LibreLinkUp account, which is a separate one. If you forgot the password, it's the same as that app's and is reset through an email link; Abbott says accounts unused for 6 months can be deleted after a notice. LibreView stores your readings and turns them into reports, such as the AGP with time in range, for you and your clinic.",
      de: "Für den LibreView Login öffnest du libreview.com und nutzt dieselbe E-Mail und dasselbe Passwort wie in der App, mit der du den Sensor ausliest (FreeStyle LibreLink, FreeStyle Libre 3 oder Libre), nicht dein LibreLinkUp-Konto, das ein eigenes ist. Ein vergessenes Passwort ist das dieser App und wird über einen Link per E-Mail zurückgesetzt; laut Abbott können Konten, die 6 Monate ungenutzt sind, nach einer Vorwarnung gelöscht werden. LibreView speichert deine Werte und macht daraus Berichte wie das AGP mit der Zeit im Zielbereich, für dich und deine Praxis.",
      fr: "Pour te connecter à LibreView, ouvre libreview.com avec le même e-mail et le même mot de passe que dans l'app qui lit ton capteur (FreeStyle LibreLink, FreeStyle Libre 3 ou Libre), pas ton compte LibreLinkUp, qui est un compte à part. Un mot de passe oublié est celui de cette app et se réinitialise par un lien envoyé par e-mail ; selon Abbott, les comptes inutilisés pendant 6 mois peuvent être supprimés après un avertissement. LibreView stocke tes mesures et en fait des rapports, comme l'AGP avec le temps dans la cible, pour toi et ton centre.",
      it: "Per accedere a LibreView apri libreview.com e usa la stessa email e la stessa password dell'app con cui leggi il sensore (FreeStyle LibreLink, FreeStyle Libre 3 o Libre), non l'account LibreLinkUp, che è un altro. Se hai dimenticato la password, è quella di quell'app e si ripristina con un link via email; secondo Abbott gli account inutilizzati per 6 mesi possono essere cancellati dopo un avviso. LibreView salva le tue letture e le trasforma in report, come l'AGP con il tempo nel range, per te e il tuo centro.",
      fi: "Kirjaudu LibreView'hun osoitteessa libreview.com samalla sähköpostilla ja salasanalla kuin sovelluksessa, jolla luet sensoria (FreeStyle LibreLink, FreeStyle Libre 3 tai Libre), et LibreLinkUp-tililläsi, joka on eri tili. Jos unohdit salasanan, se on sama kuin tuon sovelluksen ja palautetaan kirjautumisnäytön Unohditko salasanan -toiminnolla. LibreView'lla ei ole omaa sovellusta: se on verkkosivusto raportteja varten.",
      nl: "Log in bij LibreView op libreview.com met hetzelfde e-mailadres en wachtwoord als de app waarmee je je sensor uitleest (FreeStyle LibreLink, FreeStyle Libre 3 of Libre), niet met je LibreLinkUp-account, want dat is een ander account. Ben je je wachtwoord vergeten, dan is het hetzelfde als dat van die app en reset je het met Wachtwoord vergeten op het inlogscherm. LibreView heeft geen eigen app: het is een website voor rapporten.",
      nb: "For å logge på LibreView går du til libreview.com og bruker samme e-post og passord som appen som leser sensoren (FreeStyle LibreLink, FreeStyle Libre 3 eller Libre), ikke LibreLinkUp-kontoen, som er en annen. Har du glemt passordet, er det det samme som i den appen og tilbakestilles via en lenke på e-post; ifølge Abbott kan kontoer som ikke er brukt på 6 måneder slettes etter varsel. LibreView lagrer målingene dine og gjør dem om til rapporter, som AGP med tid i målområdet, for deg og klinikken.",
      sv: "För att logga in i LibreView går du till libreview.com och använder samma e-post och lösenord som appen som läser av sensorn (FreeStyle LibreLink, FreeStyle Libre 3 eller Libre), inte ditt LibreLinkUp-konto, som är ett annat. Har du glömt lösenordet är det samma som i den appen och återställs via en länk i ett mejl; enligt Abbott kan konton som inte använts på 6 månader raderas efter ett meddelande. LibreView lagrar dina mätvärden och gör om dem till rapporter, som AGP med tid inom målområdet, för dig och din mottagning.",
      ru: "Чтобы войти в LibreView, откройте libreview.com и используйте ту же почту и пароль, что и в приложении, которое читает сенсор (FreeStyle LibreLink, FreeStyle Libre 3 или Libre), а не аккаунт LibreLinkUp — он отдельный. Если вы забыли пароль, он такой же, как в этом приложении, и сбрасывается по ссылке из письма; по словам Abbott, аккаунты, которыми не пользовались 6 месяцев, могут быть удалены после уведомления. LibreView хранит ваши показания и превращает их в отчёты, например AGP со временем в диапазоне, для вас и вашей клиники.",
    },
    keywords: {
      es: ["libreview", "libreview login", "libreview iniciar sesión", "libreview contraseña olvidada", "libreview app", "libreview vs librelinkup"],
      en: ["libreview", "libreview login", "libreview forgot password", "libreview app", "what is libreview", "libreview vs librelinkup"],
      de: ["libreview", "libreview login", "libreview anmelden", "libreview passwort vergessen", "libreview app", "libreview librelinkup unterschied"],
      fr: ["libreview", "libreview connexion", "libreview se connecter", "libreview mon compte", "libreview mot de passe oublié", "libreview ou librelinkup"],
      it: ["libreview", "libreview accedi", "libreview login", "libreview password dimenticata", "libreview app", "libreview o librelinkup"],
      fi: ["libreview", "libreview kirjautuminen", "libreview kirjaudu sisään", "libreview salasana unohtunut", "libreview sovellus", "libreview vai librelinkup"],
      nl: ["libreview", "libreview inloggen", "libreview aanmelden", "libreview wachtwoord vergeten", "libreview app", "libreview of librelinkup"],
      nb: ["libreview", "libreview logg inn", "libreview glemt passord", "libreview app", "hva er libreview", "libreview eller librelinkup"],
      sv: ["libreview", "libreview logga in", "libreview glömt lösenord", "libreview app", "vad är libreview", "libreview eller librelinkup"],
      ru: ["libreview", "libreview вход", "libreview забыл пароль", "libreview приложение", "что такое libreview", "libreview или librelinkup"],
    },
    image: "/guides/covers/libreview.webp",
    imageAlt: {
      es: "Guía de LibreView: iniciar sesión, restablecer la contraseña, compartir con tu clínica",
      en: "LibreView guide: sign in, reset your password, share with your clinic",
      de: "LibreView-Ratgeber: anmelden, Passwort zurücksetzen, mit der Praxis teilen",
      fr: "Guide LibreView : se connecter, réinitialiser le mot de passe, partager avec son cabinet",
      it: "Guida a LibreView: accedere, reimpostare la password, condividere con il centro",
      fi: "LibreView-opas: kirjaudu, vaihda salasana, jaa vastaanotolle",
      nl: "LibreView-gids: inloggen, wachtwoord herstellen, delen met je zorgverlener",
      nb: "LibreView-guide: logg inn, tilbakestill passordet, del med klinikken",
      sv: "LibreView-guide: logga in, återställ lösenordet, dela med din mottagning",
      ru: "Гид по LibreView: вход, сброс пароля, доступ для клиники",
    },
    related: ["librelinkup-not-working", "time-in-range", "trends"],
    faq: {
      es: [
        { q: "¿Qué es LibreView?", a: "Es la plataforma en la nube de Abbott para los datos de FreeStyle Libre. Tú y tu equipo médico podéis ver en ella informes de tus lecturas, como el AGP con el tiempo en rango." },
        { q: "¿Qué usuario y contraseña uso en LibreView?", a: "Los mismos que en la app con la que lees tu sensor (FreeStyle LibreLink o FreeStyle Libre 3). Si usas esa app, ya tienes cuenta de LibreView." },
        { q: "He olvidado la contraseña de LibreView, ¿qué hago?", a: "Es la misma que la de tu app de Libre. Usa la opción de contraseña olvidada al iniciar sesión y sigue el enlace que Abbott te envía por email. Si sigues sin entrar, contacta con Abbott en tu país." },
        { q: "¿Hay una app de LibreView?", a: "No encontramos ninguna en el App Store (España, Italia y Alemania, octubre de 2026). LibreView se usa en el navegador, en libreview.com; en el móvil tus lecturas están en la app de Libre." },
        { q: "¿Puedo entrar en LibreLinkUp con mi cuenta de LibreView?", a: "No. LibreLinkUp es la app de seguidores y tiene su propia cuenta. Hay que invitarla desde Apps conectadas en la app de Libre de quien lleva el sensor.", link: "librelinkup-not-working" },
        { q: "¿Dulce necesita mi cuenta de LibreView?", a: "No. Dulce inicia sesión con una cuenta de LibreLinkUp con la que compartes tus lecturas. Con tus datos de LibreLink o LibreView no puede entrar." },
      ],
      en: [
        { q: "What is LibreView?", a: "It's Abbott's cloud platform for FreeStyle Libre data. You and your care team can see reports of your readings there, such as the AGP report with time in range." },
        { q: "Which username and password do I use for LibreView?", a: "The same ones as the app you read your sensor with (FreeStyle LibreLink or FreeStyle Libre 3). If you use that app, you already have a LibreView account." },
        { q: "I forgot my LibreView password. What do I do?", a: "It's the same password as your Libre app. Use the forgotten-password option when signing in and follow the link Abbott emails you. If you still can't get in, contact Abbott in your country." },
        { q: "Is there a LibreView app?", a: "We found none on the App Store (Spain, Italy and Germany, October 2026). LibreView is used in a browser at libreview.com; on your phone, your readings are in the Libre app." },
        { q: "Can I log in to LibreLinkUp with my LibreView account?", a: "No. LibreLinkUp is the follower app and has its own account. It has to be invited from Connected Apps in the Libre app of the person wearing the sensor.", link: "librelinkup-not-working" },
        { q: "Does Dulce need my LibreView account?", a: "No. Dulce signs in with a LibreLinkUp account you share your readings with. It can't sign in with your LibreLink or LibreView details." },
      ],
      de: [
        { q: "Was ist LibreView?", a: "Abbotts Cloud-Plattform für FreeStyle-Libre-Daten. Du und dein Diabetesteam könnt dort Berichte deiner Werte ansehen, etwa den AGP-Bericht mit der Zeit im Zielbereich." },
        { q: "Welchen Benutzernamen und welches Passwort nutze ich für LibreView?", a: "Dieselben wie in der App, mit der du deinen Sensor ausliest (FreeStyle LibreLink oder FreeStyle Libre 3). Wenn du diese App nutzt, hast du schon ein LibreView-Konto." },
        { q: "Ich habe mein LibreView-Passwort vergessen. Was tun?", a: "Es ist dasselbe Passwort wie in deiner Libre-App. Nutz bei der Anmeldung die Option für ein vergessenes Passwort und folge dem Link in Abbotts Mail. Klappt es dann immer noch nicht, wende dich an Abbott in deinem Land." },
        { q: "Gibt es eine LibreView-App?", a: "Wir haben im App Store keine gefunden (Spanien, Italien und Deutschland, Oktober 2026). LibreView nutzt du im Browser auf libreview.com; auf dem Handy stehen deine Werte in der Libre-App." },
        { q: "Kann ich mich mit meinem LibreView-Konto bei LibreLinkUp anmelden?", a: "Nein. LibreLinkUp ist die Follower-App und hat ein eigenes Konto. Es muss über Verbundene Apps in der Libre-App der Person mit dem Sensor eingeladen werden.", link: "librelinkup-not-working" },
        { q: "Braucht Dulce mein LibreView-Konto?", a: "Nein. Dulce meldet sich mit einem LibreLinkUp-Konto an, mit dem du deine Werte teilst. Mit deinen LibreLink- oder LibreView-Daten kann sich Dulce nicht anmelden." },
      ],
      fr: [
        { q: "C'est quoi, LibreView ?", a: "La plateforme cloud d'Abbott pour les données FreeStyle Libre. Toi et ton équipe soignante pouvez y consulter des rapports sur tes mesures, comme le rapport AGP avec le temps dans la cible." },
        { q: "Quel identifiant et quel mot de passe pour LibreView ?", a: "Les mêmes que dans l'app avec laquelle tu lis ton capteur (FreeStyle LibreLink ou FreeStyle Libre 3). Si tu utilises cette app, tu as déjà un compte LibreView." },
        { q: "J'ai oublié mon mot de passe LibreView, je fais quoi ?", a: "C'est le même que celui de ton app Libre. Utilise l'option de mot de passe oublié à la connexion et suis le lien qu'Abbott t'envoie par e-mail. Si ça bloque encore, contacte Abbott dans ton pays." },
        { q: "Existe-t-il une app LibreView ?", a: "On n'en a trouvé aucune sur l'App Store (Espagne, Italie et Allemagne, octobre 2026). LibreView s'utilise dans un navigateur sur libreview.com ; sur ton téléphone, tes mesures sont dans l'app Libre." },
        { q: "Puis-je me connecter à LibreLinkUp avec mon compte LibreView ?", a: "Non. LibreLinkUp est l'app des abonnés et a son propre compte. Il faut l'inviter depuis Applis connectées dans l'app Libre de la personne qui porte le capteur.", link: "librelinkup-not-working" },
        { q: "Dulce a-t-il besoin de mon compte LibreView ?", a: "Non. Dulce se connecte avec un compte LibreLinkUp avec lequel tu partages tes mesures. Il ne peut pas se connecter avec tes identifiants LibreLink ou LibreView." },
      ],
      it: [
        { q: "Cos'è LibreView?", a: "La piattaforma cloud di Abbott per i dati del FreeStyle Libre. Tu e il tuo team diabetologico potete vedere lì i report delle tue letture, come il report AGP con il tempo nel range." },
        { q: "Quale nome utente e password uso per LibreView?", a: "Gli stessi dell'app con cui leggi il sensore (FreeStyle LibreLink o FreeStyle Libre 3). Se usi quell'app, hai già un account LibreView." },
        { q: "Ho dimenticato la password di LibreView, cosa faccio?", a: "È la stessa della tua app Libre. Usa l'opzione per la password dimenticata quando accedi e segui il link che Abbott ti manda via email. Se ancora non entri, contatta Abbott nel tuo paese." },
        { q: "Esiste un'app LibreView?", a: "Non ne abbiamo trovate nell'App Store (Spagna, Italia e Germania, ottobre 2026). LibreView si usa nel browser su libreview.com; sul telefono le tue letture sono nell'app Libre." },
        { q: "Posso accedere a LibreLinkUp con l'account LibreView?", a: "No. LibreLinkUp è l'app dei follower e ha un account suo. Va invitato da App collegate nell'app Libre di chi porta il sensore.", link: "librelinkup-not-working" },
        { q: "Dulce ha bisogno del mio account LibreView?", a: "No. Dulce accede con un account LibreLinkUp con cui condividi le tue letture. Con i dati di LibreLink o LibreView non può accedere." },
      ],
      fi: [
        { q: "Mikä LibreView on?", a: "Se on Abbottin pilvipalvelu FreeStyle Libre -tiedoille. Sinä ja hoitotiimisi näette siellä raportteja lukemistasi, kuten AGP-raportin ja ajan tavoitealueella." },
        { q: "Millä käyttäjätunnuksella ja salasanalla kirjaudun LibreView'hun?", a: "Samoilla kuin sovelluksessa, jolla luet sensoria (FreeStyle LibreLink tai FreeStyle Libre 3). Jos käytät sitä sovellusta, sinulla on jo LibreView-tili." },
        { q: "Unohdin LibreView-salasanani. Mitä teen?", a: "Se on sama salasana kuin Libre-sovelluksessasi. Valitse kirjautuessa Unohditko salasanan ja seuraa Abbottin sähköpostilla lähettämää linkkiä. Jos et vieläkään pääse sisään, ota yhteyttä Abbottiin omassa maassasi." },
        { q: "Onko LibreView-sovellusta?", a: "Emme löytäneet sellaista App Storesta (Espanja, Italia ja Saksa, lokakuu 2026). LibreView'ta käytetään selaimessa osoitteessa libreview.com; puhelimessa lukemasi ovat Libre-sovelluksessa." },
        { q: "Voinko kirjautua LibreLinkUpiin LibreView-tililläni?", a: "Et. LibreLinkUp on seuraajan sovellus, ja sillä on oma tilinsä. Se kutsutaan sensoria käyttävän Libre-sovelluksesta kohdasta Yhdistetyt sovellukset.", link: "librelinkup-not-working" },
        { q: "Tarvitseeko Dulce LibreView-tiliäni?", a: "Ei. Dulce kirjautuu LibreLinkUp-tilillä, jolle jaat lukemasi. LibreLink- tai LibreView-tunnuksillasi se ei pääse sisään." },
      ],
      nl: [
        { q: "Wat is LibreView?", a: "Het cloudplatform van Abbott voor FreeStyle Libre-gegevens. Jij en je zorgteam zien daar rapporten van je metingen, zoals het AGP-rapport met tijd binnen bereik." },
        { q: "Welke gebruikersnaam en welk wachtwoord gebruik ik voor LibreView?", a: "Dezelfde als in de app waarmee je je sensor uitleest (FreeStyle LibreLink of FreeStyle Libre 3). Gebruik je die app, dan heb je al een LibreView-account." },
        { q: "Ik ben mijn LibreView-wachtwoord vergeten. Wat nu?", a: "Het is hetzelfde wachtwoord als van je Libre-app. Kies bij het inloggen Wachtwoord vergeten en volg de link die Abbott je mailt. Kom je er nog steeds niet in, neem dan contact op met Abbott in je land." },
        { q: "Is er een LibreView-app?", a: "We vonden er geen in de App Store (Spanje, Italië en Duitsland, oktober 2026). LibreView gebruik je in een browser op libreview.com; op je telefoon staan je metingen in de Libre-app." },
        { q: "Kan ik met mijn LibreView-account inloggen bij LibreLinkUp?", a: "Nee. LibreLinkUp is de app voor volgers en heeft een eigen account. Het moet worden uitgenodigd via Verbonden apps in de Libre-app van degene met de sensor.", link: "librelinkup-not-working" },
        { q: "Heeft Dulce mijn LibreView-account nodig?", a: "Nee. Dulce logt in met een LibreLinkUp-account waarmee je je metingen deelt. Met je LibreLink- of LibreView-gegevens kan het niet inloggen." },
      ],
      nb: [
        { q: "Hva er LibreView?", a: "Det er Abbotts skyplattform for FreeStyle Libre-data. Du og behandlerne dine kan se rapporter over målingene dine der, som AGP-rapporten med tid i målområdet." },
        { q: "Hvilket brukernavn og passord bruker jeg for LibreView?", a: "De samme som i appen du leser sensoren med (FreeStyle LibreLink eller FreeStyle Libre 3). Bruker du den appen, har du allerede en LibreView-konto." },
        { q: "Jeg har glemt LibreView-passordet. Hva gjør jeg?", a: "Det er samme passord som i Libre-appen. Bruk valget for glemt passord ved pålogging og følg lenken Abbott sender på e-post. Kommer du fortsatt ikke inn, kontakt Abbott i landet ditt." },
        { q: "Finnes det en LibreView-app?", a: "Vi fant ingen i App Store (Spania, Italia og Tyskland, oktober 2026). LibreView brukes i en nettleser på libreview.com; på telefonen ligger målingene i Libre-appen." },
        { q: "Kan jeg logge på LibreLinkUp med LibreView-kontoen?", a: "Nei. LibreLinkUp er følgerappen og har sin egen konto. Den må inviteres fra Tilkoblede apper i Libre-appen til den som har sensoren.", link: "librelinkup-not-working" },
        { q: "Trenger Dulce LibreView-kontoen min?", a: "Nei. Dulce logger på med en LibreLinkUp-konto du deler målingene dine med. Den kan ikke logge på med LibreLink- eller LibreView-detaljene dine." },
      ],
      sv: [
        { q: "Vad är LibreView?", a: "Det är Abbotts molnplattform för FreeStyle Libre-data. Du och ditt vårdteam kan se rapporter över dina mätvärden där, som AGP-rapporten med tid inom målområdet." },
        { q: "Vilket användarnamn och lösenord använder jag för LibreView?", a: "Samma som i appen du läser av sensorn med (FreeStyle LibreLink eller FreeStyle Libre 3). Om du använder den appen har du redan ett LibreView-konto." },
        { q: "Jag har glömt mitt LibreView-lösenord. Vad gör jag?", a: "Det är samma lösenord som i Libre-appen. Använd alternativet för glömt lösenord vid inloggningen och följ länken som Abbott mejlar dig. Kommer du ändå inte in, kontakta Abbott i ditt land." },
        { q: "Finns det en LibreView-app?", a: "Vi hittade ingen i App Store (Spanien, Italien och Tyskland, oktober 2026). LibreView används i en webbläsare på libreview.com; på telefonen finns dina mätvärden i Libre-appen." },
        { q: "Kan jag logga in i LibreLinkUp med mitt LibreView-konto?", a: "Nej. LibreLinkUp är följarappen och har ett eget konto. Den måste bjudas in från Anslutna appar i Libre-appen hos den som bär sensorn.", link: "librelinkup-not-working" },
        { q: "Behöver Dulce mitt LibreView-konto?", a: "Nej. Dulce loggar in med ett LibreLinkUp-konto som du delar dina mätvärden med. Den kan inte logga in med dina LibreLink- eller LibreView-uppgifter." },
      ],
      ru: [
        { q: "Что такое LibreView?", a: "Это облачная платформа Abbott для данных FreeStyle Libre. Там вы и ваша лечащая команда видите отчёты по вашим показаниям, например отчёт AGP со временем в диапазоне." },
        { q: "Какие логин и пароль использовать для LibreView?", a: "Те же, что в приложении, которым вы читаете сенсор (FreeStyle LibreLink или FreeStyle Libre 3). Если вы им пользуетесь, аккаунт LibreView у вас уже есть." },
        { q: "Я забыл(а) пароль LibreView. Что делать?", a: "Это тот же пароль, что и в приложении Libre. Нажмите «Забыли пароль» при входе и перейдите по ссылке из письма Abbott. Если войти так и не удаётся, обратитесь в Abbott в вашей стране." },
        { q: "Есть ли приложение LibreView?", a: "Мы не нашли его в App Store (Испания, Италия и Германия, октябрь 2026). LibreView открывается в браузере на libreview.com; на телефоне ваши показания — в приложении Libre." },
        { q: "Можно ли войти в LibreLinkUp с аккаунтом LibreView?", a: "Нет. LibreLinkUp — приложение для наблюдателей со своим аккаунтом. Его нужно пригласить из «Подключённых приложений» в приложении Libre человека с сенсором.", link: "librelinkup-not-working" },
        { q: "Нужен ли Dulce мой аккаунт LibreView?", a: "Нет. Dulce входит через аккаунт LibreLinkUp, с которым вы делитесь показаниями. Войти с данными LibreLink или LibreView он не может." },
      ],
    },
  },
  {
    id: "glucose-apps-compared",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-24",
    dateModified: "2026-11-04",
    slug: {
      es: "alternativa-sweet-dreams",
      en: "sweet-dreams-alternative",
      de: "sweet-dreams-alternative",
      fr: "alternative-sweet-dreams",
      it: "alternativa-sweet-dreams",
    },
    title: {
      es: "Alternativas a Sweet Dreams y LibreLinkUp: apps Libre para iPhone",
      en: "Sweet Dreams and LibreLinkUp alternatives: Libre apps compared",
      de: "Alternative zu Sweet Dreams und LibreLinkUp: Libre-Apps im Vergleich",
      fr: "Alternatives à Sweet Dreams et LibreLinkUp : apps Libre comparées",
      it: "Alternative a Sweet Dreams e LibreLinkUp: app Libre a confronto",
    },
    description: {
      es: "Dulce, Sweet Dreams, Gluroo y LibreLinkUp comparadas con honestidad: sensores, pantalla de bloqueo, Apple Watch, idiomas, precio y cómo cambiar en un minuto.",
      en: "Dulce, Sweet Dreams, Gluroo and LibreLinkUp compared honestly: sensors, Lock Screen, Apple Watch, languages, price, and how to switch in a minute.",
      de: "Dulce, Sweet Dreams, Gluroo und LibreLinkUp ehrlich verglichen: Sensoren, Sperrbildschirm, Apple Watch, Sprachen, Preis und Wechsel in einer Minute.",
      fr: "Dulce, Sweet Dreams, Gluroo et LibreLinkUp comparées : capteurs, écran verrouillé, Apple Watch, langues, prix et comment changer en une minute.",
      it: "Dulce, Sweet Dreams, Gluroo e LibreLinkUp a confronto: sensori, schermata di blocco, Apple Watch, lingue, prezzo e come cambiare in un minuto.",
    },
    summary: {
      es: "Sweet Dreams, Gluroo y Dulce leen los mismos datos de LibreLinkUp y los muestran en la pantalla de bloqueo, widgets o Apple Watch, así que puedes cambiar de una a otra sin tocar el sensor. Dulce es la opción si quieres la app en español, un diario de hidratos e insulina gratis y seguidores gratis; Sweet Dreams cubre más modelos de sensor y bombas. Pasarte a Dulce lleva un minuto con el mismo usuario de LibreLinkUp.",
      en: "Sweet Dreams, Gluroo and Dulce all read the same LibreLinkUp data and show it on the Lock Screen, widgets or Apple Watch, so you can switch between them without touching your sensor. Dulce is the pick if you want the app in Spanish, German, French or Italian, a free carbs and insulin logbook and free followers; Sweet Dreams covers more sensor models and pumps. Switching to Dulce takes a minute with the same LibreLinkUp login.",
      de: "Sweet Dreams, Gluroo und Dulce lesen dieselben LibreLinkUp-Daten und zeigen sie auf Sperrbildschirm, Widgets oder Apple Watch, du kannst also wechseln, ohne den Sensor anzufassen. Dulce passt, wenn du die App auf Deutsch willst, ein kostenloses Logbuch für Kohlenhydrate und Insulin und kostenlose Follower; Sweet Dreams unterstützt mehr Sensoren und Pumpen. Der Wechsel zu Dulce dauert eine Minute, mit demselben LibreLinkUp-Login.",
      fr: "Sweet Dreams, Gluroo et Dulce lisent les mêmes données LibreLinkUp et les affichent sur l'écran verrouillé, les widgets ou l'Apple Watch, donc tu peux passer de l'une à l'autre sans toucher au capteur. Dulce est le bon choix si tu veux l'app en français, un journal des glucides et de l'insuline gratuit et des abonnés gratuits ; Sweet Dreams couvre plus de capteurs et de pompes. Passer à Dulce prend une minute, avec le même identifiant LibreLinkUp.",
      it: "Sweet Dreams, Gluroo e Dulce leggono gli stessi dati di LibreLinkUp e li mostrano sulla schermata di blocco, nei widget o su Apple Watch, quindi puoi passare dall'una all'altra senza toccare il sensore. Dulce fa per te se vuoi l'app in italiano, un diario gratuito di carboidrati e insulina e follower gratuiti; Sweet Dreams copre più sensori e microinfusori. Passare a Dulce richiede un minuto, con lo stesso accesso di LibreLinkUp.",
    },
    keywords: {
      es: ["alternativa sweet dreams", "sweet dreams diabetes", "app glucosa libre iphone", "mejor app freestyle libre apple watch", "app librelinkup iphone"],
      en: ["sweet dreams alternative", "sweet dreams diabetes app", "best libre app for iphone", "freestyle libre apple watch app", "librelinkup app iphone"],
      de: ["sweet dreams alternative", "sweet dreams diabetes", "libre app iphone", "beste app freestyle libre apple watch", "librelinkup app iphone"],
      fr: ["alternative sweet dreams", "sweet dreams diabète", "app glycémie libre iphone", "meilleure app freestyle libre apple watch", "app librelinkup iphone"],
      it: ["alternativa sweet dreams", "sweet dreams diabete", "app glicemia libre iphone", "migliore app freestyle libre apple watch", "app librelinkup iphone"],
    },
    image: "/guides/widgets-everywhere.jpg",
    imageAlt: {
      es: "La glucosa del Libre en la pantalla de bloqueo, los widgets y el Apple Watch con Dulce",
      en: "Libre glucose on the Lock Screen, widgets and Apple Watch with Dulce",
      de: "Libre-Werte auf Sperrbildschirm, Widgets und Apple Watch mit Dulce",
      fr: "La glycémie Libre sur l'écran verrouillé, les widgets et l'Apple Watch avec Dulce",
      it: "La glicemia del Libre sulla schermata di blocco, nei widget e su Apple Watch con Dulce",
    },
    related: ["lock-screen", "apple-watch", "widgets"],
    faq: {
      es: [
        { q: "¿Qué es Sweet Dreams?", a: "Una app para iPhone que muestra la glucosa de varios MCG (FreeStyle Libre vía LibreLinkUp, Dexcom, Medtronic y otros) en la pantalla de bloqueo, widgets y Apple Watch. Su ficha del App Store está en inglés." },
        { q: "¿Cuál es la mejor alternativa a Sweet Dreams para un FreeStyle Libre?", a: "Si llevas un Libre y quieres la app en español, con diario de carbohidratos e insulina gratis y seguidores gratis, Dulce. Si llevas una bomba de Medtronic u otro sensor que no sea Libre ni Dexcom, Sweet Dreams cubre más modelos." },
        { q: "¿Tengo que cambiar algo en el sensor para pasarme a Dulce?", a: "No. Dulce usa la misma cuenta de LibreLinkUp que tu app actual. Solo inicias sesión con ese correo y esa contraseña." },
        { q: "¿Qué sensores lee Dulce?", a: "FreeStyle Libre 2 y Libre 3 a través de LibreLinkUp, y Dexcom G6, G7 y ONE+ a través de Dexcom Share." },
        { q: "¿Hay alguna alternativa a la app LibreLinkUp?", a: "Sí. Apps como Dulce inician sesión con la misma cuenta de LibreLinkUp y muestran las mismas lecturas en la pantalla de bloqueo, los widgets y el Apple Watch, con sus propios avisos. No cambia nada en el sensor ni en el móvil que lo lee." },
      ],
      en: [
        { q: "What is Sweet Dreams?", a: "An iPhone app that shows glucose from several CGMs (FreeStyle Libre through LibreLinkUp, Dexcom, Medtronic and others) on the Lock Screen, widgets and Apple Watch. Its App Store listing is in English." },
        { q: "What's the best Sweet Dreams alternative for a FreeStyle Libre?", a: "If you wear a Libre and want the app in your language, with a free carbs and insulin logbook and free followers, Dulce. If you use a Medtronic pump or a sensor other than Libre or Dexcom, Sweet Dreams covers more models." },
        { q: "Do I have to change anything on my sensor to switch to Dulce?", a: "No. Dulce uses the same LibreLinkUp account as your current app. You just sign in with that email and password." },
        { q: "Which sensors does Dulce read?", a: "FreeStyle Libre 2 and Libre 3 through LibreLinkUp, and Dexcom G6, G7 and ONE+ through Dexcom Share." },
        { q: "Is there an alternative to the LibreLinkUp app?", a: "Yes. Apps like Dulce sign in with the same LibreLinkUp account and show the same readings on the iPhone Lock Screen, widgets and Apple Watch, with their own alerts. Nothing changes on the sensor or on the phone that reads it." },
      ],
      de: [
        { q: "Was ist Sweet Dreams?", a: "Eine iPhone-App, die Werte mehrerer CGMs (FreeStyle Libre über LibreLinkUp, Dexcom, Medtronic und andere) auf Sperrbildschirm, Widgets und Apple Watch zeigt. Ihr App-Store-Eintrag ist auf Englisch." },
        { q: "Was ist die beste Sweet-Dreams-Alternative für einen FreeStyle Libre?", a: "Wenn du einen Libre trägst und die App auf Deutsch willst, mit kostenlosem Tagebuch für KH und Insulin und kostenlosen Followern: Dulce. Mit einer Medtronic-Pumpe oder einem anderen Sensor als Libre oder Dexcom deckt Sweet Dreams mehr Modelle ab." },
        { q: "Muss ich am Sensor etwas ändern, um zu Dulce zu wechseln?", a: "Nein. Dulce nutzt dasselbe LibreLinkUp-Konto wie deine jetzige App. Du meldest dich nur mit dieser E-Mail und dem Passwort an." },
        { q: "Welche Sensoren liest Dulce?", a: "FreeStyle Libre 2 und Libre 3 über LibreLinkUp, und Dexcom G6, G7 und ONE+ über Dexcom Share." },
        { q: "Gibt es eine Alternative zur LibreLinkUp-App?", a: "Ja. Apps wie Dulce melden sich mit demselben LibreLinkUp-Konto an und zeigen dieselben Werte auf Sperrbildschirm, Widgets und Apple Watch, mit eigenen Warnungen. Am Sensor und am Handy, das ihn ausliest, ändert sich nichts." },
      ],
      fr: [
        { q: "C'est quoi, Sweet Dreams ?", a: "Une app iPhone qui affiche la glycémie de plusieurs capteurs (FreeStyle Libre via LibreLinkUp, Dexcom, Medtronic et d'autres) sur l'écran verrouillé, les widgets et l'Apple Watch. Sa fiche App Store est en anglais." },
        { q: "Quelle est la meilleure alternative à Sweet Dreams pour un FreeStyle Libre ?", a: "Si tu portes un Libre et veux l'app en français, avec un journal des glucides et de l'insuline gratuit et des abonnés gratuits : Dulce. Avec une pompe Medtronic ou un capteur autre que Libre ou Dexcom, Sweet Dreams couvre plus de modèles." },
        { q: "Dois-je changer quelque chose sur mon capteur pour passer à Dulce ?", a: "Non. Dulce utilise le même compte LibreLinkUp que ton app actuelle. Tu te connectes simplement avec cet e-mail et ce mot de passe." },
        { q: "Quels capteurs Dulce lit-il ?", a: "Les FreeStyle Libre 2 et Libre 3 via LibreLinkUp, et les Dexcom G6, G7 et ONE+ via Dexcom Share." },
        { q: "Existe-t-il une alternative à l'app LibreLinkUp ?", a: "Oui. Des apps comme Dulce se connectent avec le même compte LibreLinkUp et affichent les mêmes mesures sur l'écran verrouillé, les widgets et l'Apple Watch, avec leurs propres alertes. Rien ne change sur le capteur ni sur le téléphone qui le lit." },
      ],
      it: [
        { q: "Cos'è Sweet Dreams?", a: "Un'app per iPhone che mostra la glicemia di diversi CGM (FreeStyle Libre tramite LibreLinkUp, Dexcom, Medtronic e altri) sulla schermata di blocco, nei widget e su Apple Watch. La sua scheda dell'App Store è in inglese." },
        { q: "Qual è la migliore alternativa a Sweet Dreams per un FreeStyle Libre?", a: "Se porti un Libre e vuoi l'app in italiano, con diario di carboidrati e insulina gratis e follower gratis: Dulce. Con un microinfusore Medtronic o un sensore diverso da Libre e Dexcom, Sweet Dreams copre più modelli." },
        { q: "Devo cambiare qualcosa sul sensore per passare a Dulce?", a: "No. Dulce usa lo stesso account LibreLinkUp della tua app attuale. Basta accedere con quell'email e quella password." },
        { q: "Quali sensori legge Dulce?", a: "FreeStyle Libre 2 e Libre 3 tramite LibreLinkUp, e Dexcom G6, G7 e ONE+ tramite Dexcom Share." },
        { q: "Esiste un'alternativa all'app LibreLinkUp?", a: "Sì. App come Dulce accedono con lo stesso account LibreLinkUp e mostrano le stesse letture su schermata di blocco, widget e Apple Watch, con avvisi propri. Non cambia nulla sul sensore né sul telefono che lo legge." },
      ],
    },
  },
  {
    id: "dexcom",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-25",
    dateModified: "2026-10-31",
    slug: {
      es: "dexcom-en-apple-watch-y-pantalla-de-bloqueo",
      en: "dexcom-on-apple-watch-and-lock-screen",
      de: "dexcom-auf-apple-watch-und-sperrbildschirm",
      fr: "dexcom-apple-watch-ecran-verrouille",
      it: "dexcom-apple-watch-schermata-di-blocco",
    },
    title: {
      es: "Dexcom en el Apple Watch, la pantalla de bloqueo y CarPlay con Dulce",
      en: "Dexcom widget, Apple Watch and CarPlay on iPhone with Dulce",
      de: "Dexcom auf Apple Watch, Sperrbildschirm und CarPlay mit Dulce",
      fr: "Dexcom sur l'Apple Watch, l'écran verrouillé et CarPlay avec Dulce",
      it: "Dexcom su Apple Watch, schermata di blocco e CarPlay con Dulce",
    },
    description: {
      es: "Cómo ver tu Dexcom G6, G7 o ONE+ en la pantalla de bloqueo, la Dynamic Island, el Apple Watch y CarPlay: Dexcom Share, qué necesitas y cómo conectarlo.",
      en: "Your Dexcom G6, G7 or ONE+ in an iPhone widget, on the Lock Screen, Apple Watch and CarPlay: how Dexcom Share works, what you need, how to connect.",
      de: "So siehst du deinen Dexcom G6, G7 oder ONE+ auf Sperrbildschirm, Dynamic Island, Apple Watch und CarPlay: Dexcom Share, was du brauchst, wie du verbindest.",
      fr: "Voir ton Dexcom G6, G7 ou ONE+ sur l'écran verrouillé, la Dynamic Island, l'Apple Watch et CarPlay : Dexcom Share, ce qu'il te faut, comment te connecter.",
      it: "Vedi il tuo Dexcom G6, G7 o ONE+ sulla schermata di blocco, nella Dynamic Island, su Apple Watch e CarPlay: Dexcom Share, cosa serve e come collegarlo.",
    },
    summary: {
      es: "Dulce muestra la glucosa de tu Dexcom G6, G7 o ONE+ en la pantalla de bloqueo del iPhone, la Dynamic Island, los widgets, el Apple Watch y, con iOS 26, CarPlay. Lee Dexcom Share con tu propia cuenta de Dexcom, así que Compartir tiene que estar activado en la app de Dexcom con al menos un seguidor invitado, y eliges la región donde creaste la cuenta. No cambia nada en tu sensor ni en la app de Dexcom.",
      en: "Dulce shows your Dexcom G6, G7 or ONE+ glucose on the iPhone Lock Screen, the Dynamic Island, widgets, Apple Watch and, with iOS 26, CarPlay. It reads Dexcom Share with your own Dexcom account, so Share must be on in the Dexcom app with at least one follower invited, and you pick the region where you created the account. Nothing changes on your sensor or in the Dexcom app.",
      de: "Dulce zeigt deinen Dexcom G6, G7 oder ONE+ Wert auf dem Sperrbildschirm des iPhone, in der Dynamic Island, in Widgets, auf der Apple Watch und mit iOS 26 in CarPlay. Es liest Dexcom Share mit deinem eigenen Dexcom-Konto; Teilen muss in der Dexcom-App aktiv sein, mit mindestens einem eingeladenen Follower, und du wählst die Region, in der du das Konto erstellt hast. An deinem Sensor und in der Dexcom-App ändert sich nichts.",
      fr: "Dulce affiche la glycémie de ton Dexcom G6, G7 ou ONE+ sur l'écran verrouillé de l'iPhone, la Dynamic Island, les widgets, l'Apple Watch et, avec iOS 26, CarPlay. Il lit Dexcom Share avec ton propre compte Dexcom : le partage doit être activé dans l'app Dexcom avec au moins un abonné invité, et tu choisis la région où tu as créé le compte. Rien ne change sur ton capteur ni dans l'app Dexcom.",
      it: "Dulce mostra la glicemia del tuo Dexcom G6, G7 o ONE+ sulla schermata di blocco dell'iPhone, nella Dynamic Island, nei widget, su Apple Watch e, con iOS 26, su CarPlay. Legge Dexcom Share con il tuo account Dexcom, quindi la condivisione deve essere attiva nell'app Dexcom con almeno un follower invitato, e scegli la regione in cui hai creato l'account. Sul sensore e nell'app Dexcom non cambia nulla.",
    },
    keywords: {
      es: ["dexcom apple watch", "dexcom pantalla de bloqueo", "dexcom g7 iphone widget", "dexcom carplay", "dexcom share app iphone", "widget dexcom iphone", "dexcom g7 apple watch"],
      en: ["dexcom apple watch", "dexcom lock screen", "dexcom g7 live activity", "dexcom carplay", "dexcom follow alternative", "dexcom widget iphone", "dexcom g7 apple watch", "dexcom apple watch complication", "dexcom g7 widget lock screen", "dexcom widget not updating"],
      de: ["dexcom apple watch", "dexcom sperrbildschirm", "dexcom g7 widget iphone", "dexcom carplay", "dexcom follow alternative", "dexcom widget", "dexcom g7 apple watch"],
      fr: ["dexcom apple watch", "dexcom écran verrouillé", "dexcom g7 widget iphone", "dexcom carplay", "alternative dexcom follow", "widget dexcom iphone", "dexcom g7 apple watch"],
      it: ["dexcom apple watch", "dexcom schermata di blocco", "dexcom g7 widget iphone", "dexcom carplay", "alternativa dexcom follow", "widget dexcom iphone", "dexcom g7 apple watch"],
    },
    image: "/guides/lock-screen-alerts-watch.jpg",
    imageAlt: {
      es: "La glucosa en la pantalla de bloqueo y el Apple Watch con Dulce",
      en: "Glucose on the Lock Screen and Apple Watch with Dulce",
      de: "Glukosewert auf Sperrbildschirm und Apple Watch mit Dulce",
      fr: "La glycémie sur l'écran verrouillé et l'Apple Watch avec Dulce",
      it: "La glicemia sulla schermata di blocco e su Apple Watch con Dulce",
    },
    related: ["lock-screen", "apple-watch", "dexcom-follow-alternative"],
    faq: {
      es: [
        { q: "¿Qué Dexcom funciona con Dulce?", a: "Dexcom G6, G7 y ONE+, a través de Dexcom Share. Compartir tiene que estar activado en la app de Dexcom, con al menos un seguidor invitado." },
        { q: "¿Con qué cuenta inicio sesión en Dulce?", a: "Con tu propia cuenta de Dexcom, la que usas en la app de Dexcom, no con la de un seguidor. Elige también la región donde la creaste: Estados Unidos, Japón o Fuera de EE. UU." },
        { q: "¿Cada cuánto se actualiza?", a: "Dexcom comparte una lectura nueva cada 5 minutos, y Dulce se actualiza con cada una, también en la pantalla de bloqueo y el reloj." },
        { q: "¿Hay un widget de Dexcom o una complicación para el Apple Watch?", a: "Sí, con Dulce. Cuando inicias sesión con tu cuenta de Dexcom (con Share activado), tu glucosa de Dexcom aparece en los widgets de inicio y de bloqueo de Dulce y, con Dulce Pro, en la Live Activity y en la app de Apple Watch con sus complicaciones." },
        { q: "¿Funciona Dulce con el Apple Watch SE o el Ultra?", a: "Sí. La app de Dulce para el reloj funciona en cualquier Apple Watch con watchOS 11 o posterior enlazado a tu iPhone, también el Apple Watch SE (2.ª generación o posterior) y el Ultra. El reloj es una función de Dulce Pro.", link: "apple-watch" },
        { q: "¿Puedo ver mi Dexcom en el Apple Watch sin el móvil cerca?", a: "Sí, mientras el reloj tenga wifi o datos móviles: el servidor de Dulce envía cada lectura nueva directamente al reloj. Las lecturas siguen saliendo del móvil con la app de Dexcom, así que ese móvil tiene que estar encendido y con conexión." },
      ],
      en: [
        { q: "Which Dexcom sensors work with Dulce?", a: "Dexcom G6, G7 and ONE+, through Dexcom Share. Share must be on in the Dexcom app, with at least one follower invited." },
        { q: "Which account do I sign in with?", a: "Your own Dexcom account, the one you use in the Dexcom app, not a follower's. Also pick the region where you created it: United States, Japan or Outside the US." },
        { q: "How often does it update?", a: "Dexcom shares a new reading every 5 minutes, and Dulce updates with each one, on the Lock Screen and the watch too." },
        { q: "Is there a Dexcom widget or Apple Watch complication for iPhone?", a: "Yes, with Dulce. Once you sign in with your Dexcom account (Share on), your Dexcom glucose shows in Dulce's Home Screen and Lock Screen widgets and, with Dulce Pro, in the Live Activity and on the Apple Watch app and its complications." },
        { q: "Does Dulce work with Apple Watch SE or Ultra?", a: "Yes. The Dulce watch app runs on any Apple Watch with watchOS 11 or later paired with your iPhone, including Apple Watch SE (2nd generation and later) and Ultra. The watch is a Dulce Pro feature.", link: "apple-watch" },
        { q: "Can I see my Dexcom on Apple Watch without my phone nearby?", a: "Yes, as long as the watch has Wi-Fi or cellular: Dulce's server sends each new reading straight to the watch. The readings still come from the phone running the Dexcom app, so that phone must be on and online." },
      ],
      de: [
        { q: "Welche Dexcom-Sensoren funktionieren mit Dulce?", a: "Dexcom G6, G7 und ONE+, über Dexcom Share. Teilen muss in der Dexcom-App aktiviert sein, mit mindestens einem eingeladenen Follower." },
        { q: "Mit welchem Konto melde ich mich an?", a: "Mit deinem eigenen Dexcom-Konto aus der Dexcom-App, nicht mit dem eines Followers. Wähle auch die Region, in der du es erstellt hast: USA, Japan oder Außerhalb der USA." },
        { q: "Wie oft wird aktualisiert?", a: "Dexcom teilt alle 5 Minuten einen neuen Wert, und Dulce aktualisiert mit jedem, auch auf dem Sperrbildschirm und der Uhr." },
        { q: "Gibt es ein Dexcom-Widget oder eine Komplikation für die Apple Watch?", a: "Ja, mit Dulce. Sobald du dich mit deinem Dexcom-Konto anmeldest (Share an), erscheint dein Dexcom-Wert in den Widgets von Dulce auf Home- und Sperrbildschirm und mit Dulce Pro in der Live-Aktivität sowie in der Apple-Watch-App und ihren Komplikationen." },
        { q: "Funktioniert Dulce mit der Apple Watch SE oder Ultra?", a: "Ja. Die Dulce-App für die Uhr läuft auf jeder Apple Watch mit watchOS 11 oder neuer, die mit deinem iPhone gekoppelt ist, auch auf der Apple Watch SE (ab 2. Generation) und der Ultra. Die Uhr ist eine Dulce Pro Funktion.", link: "apple-watch" },
        { q: "Sehe ich meinen Dexcom auf der Apple Watch auch ohne Handy in der Nähe?", a: "Ja, solange die Uhr WLAN oder Mobilfunk hat: Der Server von Dulce schickt jeden neuen Wert direkt an die Uhr. Die Werte kommen trotzdem vom Handy mit der Dexcom-App, das also an und online sein muss." },
      ],
      fr: [
        { q: "Quels Dexcom fonctionnent avec Dulce ?", a: "Les Dexcom G6, G7 et ONE+, via Dexcom Share. Le partage doit être activé dans l'app Dexcom, avec au moins un abonné invité." },
        { q: "Avec quel compte je me connecte ?", a: "Avec ton propre compte Dexcom, celui de l'app Dexcom, pas celui d'un abonné. Choisis aussi la région où tu l'as créé : États-Unis, Japon ou Hors des États-Unis." },
        { q: "À quelle fréquence ça se met à jour ?", a: "Dexcom partage une nouvelle mesure toutes les 5 minutes, et Dulce se met à jour à chacune, y compris sur l'écran verrouillé et la montre." },
        { q: "Existe-t-il un widget Dexcom ou une complication pour l'Apple Watch ?", a: "Oui, avec Dulce. Une fois connecté avec ton compte Dexcom (Share activé), ta glycémie Dexcom s'affiche dans les widgets de Dulce sur l'écran d'accueil et l'écran verrouillé et, avec Dulce Pro, dans l'Activité en direct et l'app Apple Watch avec ses complications." },
        { q: "Dulce fonctionne-t-il avec l'Apple Watch SE ou Ultra ?", a: "Oui. L'app Dulce pour la montre fonctionne sur toute Apple Watch sous watchOS 11 ou plus récent jumelée à ton iPhone, y compris l'Apple Watch SE (2e génération et suivantes) et l'Ultra. La montre est une fonction Dulce Pro.", link: "apple-watch" },
        { q: "Puis-je voir mon Dexcom sur l'Apple Watch sans mon téléphone à côté ?", a: "Oui, tant que la montre a du Wi-Fi ou du cellulaire : le serveur de Dulce envoie chaque nouvelle mesure directement à la montre. Les mesures viennent toujours du téléphone qui fait tourner l'app Dexcom, qui doit donc être allumé et connecté." },
      ],
      it: [
        { q: "Quali Dexcom funzionano con Dulce?", a: "Dexcom G6, G7 e ONE+, tramite Dexcom Share. La condivisione deve essere attiva nell'app Dexcom, con almeno un follower invitato." },
        { q: "Con quale account accedo?", a: "Con il tuo account Dexcom, quello dell'app Dexcom, non con quello di un follower. Scegli anche la regione in cui l'hai creato: Stati Uniti, Giappone o Fuori dagli Stati Uniti." },
        { q: "Ogni quanto si aggiorna?", a: "Dexcom condivide una nuova lettura ogni 5 minuti e Dulce si aggiorna con ognuna, anche sulla schermata di blocco e sull'orologio." },
        { q: "Esiste un widget Dexcom o una complicazione per Apple Watch?", a: "Sì, con Dulce. Dopo l'accesso con il tuo account Dexcom (con Share attivo), la glicemia Dexcom compare nei widget di Dulce su schermata Home e di blocco e, con Dulce Pro, nell'Attività in tempo reale e nell'app per Apple Watch con le sue complicazioni." },
        { q: "Dulce funziona con Apple Watch SE o Ultra?", a: "Sì. L'app di Dulce per l'orologio funziona su qualsiasi Apple Watch con watchOS 11 o successivo abbinato al tuo iPhone, compresi Apple Watch SE (dalla 2ª generazione) e Ultra. L'orologio è una funzione di Dulce Pro.", link: "apple-watch" },
        { q: "Posso vedere il mio Dexcom su Apple Watch senza il telefono vicino?", a: "Sì, purché l'orologio abbia Wi-Fi o rete cellulare: il server di Dulce invia ogni nuova lettura direttamente all'orologio. Le letture arrivano comunque dal telefono con l'app Dexcom, che deve essere acceso e connesso." },
      ],
    },
  },
  {
    id: "dexcom-follow-alternative",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-26",
    dateModified: "2026-10-31",
    slug: {
      es: "alternativa-dexcom-follow-sugarmate",
      en: "dexcom-follow-sugarmate-alternative",
      de: "dexcom-follow-sugarmate-alternative",
      fr: "alternative-dexcom-follow-sugarmate",
      it: "alternativa-dexcom-follow-sugarmate",
    },
    title: {
      es: "Alternativa a Dexcom Follow y Sugarmate en el iPhone",
      en: "A Dexcom Follow and Sugarmate alternative for iPhone",
      de: "Alternative zu Dexcom Follow und Sugarmate fürs iPhone",
      fr: "Une alternative à Dexcom Follow et Sugarmate sur iPhone",
      it: "Un'alternativa a Dexcom Follow e Sugarmate su iPhone",
    },
    description: {
      es: "Dexcom Follow, Sugarmate y Dulce comparadas con honestidad: pantalla de bloqueo, Apple Watch, CarPlay, avisos, familia y precio, y cuándo conviene cada una.",
      en: "Dexcom Follow, Sugarmate and Dulce compared honestly: Lock Screen, Apple Watch, CarPlay, alerts, family and price, and when each one is the better pick.",
      de: "Dexcom Follow, Sugarmate und Dulce ehrlich verglichen: Sperrbildschirm, Apple Watch, CarPlay, Alarme, Familie und Preis, und wann welche App besser passt.",
      fr: "Dexcom Follow, Sugarmate et Dulce comparées honnêtement : écran verrouillé, Apple Watch, CarPlay, alertes, famille et prix, et quand choisir chacune.",
      it: "Dexcom Follow, Sugarmate e Dulce a confronto onesto: schermata di blocco, Apple Watch, CarPlay, avvisi, famiglia e prezzo, e quando conviene ciascuna.",
    },
    summary: {
      es: "Dexcom Follow, Sugarmate y Dulce leen los mismos datos de Dexcom Share, una lectura nueva cada 5 minutos, y puedes usarlas a la vez. Dulce añade el valor en la pantalla de bloqueo, el Apple Watch y CarPlay sin abrir ninguna app. Dexcom Follow sigue siendo mejor para seguir a muchas personas (hasta 25), y Sugarmate para avisos que atraviesan el modo silencio.",
      en: "Dexcom Follow, Sugarmate and Dulce all read the same Dexcom Share data, a new reading every 5 minutes, and you can use them side by side. Dulce adds the number on the Lock Screen, Apple Watch and CarPlay without opening an app. Dexcom Follow is still the better choice for following many people (up to 25), and Sugarmate for alerts that override silent mode.",
      de: "Dexcom Follow, Sugarmate und Dulce lesen dieselben Daten aus Dexcom Share, alle 5 Minuten ein neuer Wert, und du kannst sie parallel nutzen. Dulce bringt den Wert auf Sperrbildschirm, Apple Watch und CarPlay, ohne dass du eine App öffnest. Dexcom Follow bleibt die bessere Wahl, um vielen Menschen zu folgen (bis zu 25), Sugarmate für Warnungen, die den Stummmodus übergehen.",
      fr: "Dexcom Follow, Sugarmate et Dulce lisent les mêmes données Dexcom Share, une nouvelle mesure toutes les 5 minutes, et tu peux les utiliser en même temps. Dulce ajoute la valeur sur l'écran verrouillé, l'Apple Watch et CarPlay sans ouvrir d'app. Dexcom Follow reste le meilleur choix pour suivre beaucoup de personnes (jusqu'à 25), et Sugarmate pour des alertes qui passent outre le mode silencieux.",
      it: "Dexcom Follow, Sugarmate e Dulce leggono gli stessi dati di Dexcom Share, una nuova lettura ogni 5 minuti, e puoi usarle insieme. Dulce aggiunge il valore sulla schermata di blocco, su Apple Watch e su CarPlay senza aprire nessuna app. Dexcom Follow resta la scelta migliore per seguire molte persone (fino a 25), e Sugarmate per avvisi che superano il silenzioso.",
    },
    keywords: {
      es: ["alternativa dexcom follow", "alternativa sugarmate", "dexcom follow iphone", "sugarmate dexcom", "dexcom follow widget"],
      en: ["dexcom follow alternative", "sugarmate alternative", "dexcom follow widget", "sugarmate vs dexcom follow", "dexcom follow apple watch"],
      de: ["dexcom follow alternative", "sugarmate alternative", "dexcom follow widget", "dexcom follow apple watch", "sugarmate deutsch"],
      fr: ["alternative dexcom follow", "alternative sugarmate", "dexcom follow widget", "dexcom follow apple watch", "sugarmate français"],
      it: ["alternativa dexcom follow", "alternativa sugarmate", "dexcom follow widget", "dexcom follow apple watch", "sugarmate italiano"],
    },
    image: "/guides/family-followers.jpg",
    imageAlt: {
      es: "Pantalla de seguidores de Dulce con un mensaje de la familia",
      en: "Dulce followers screen with a family message",
      de: "Follower-Bildschirm von Dulce mit einer Nachricht aus der Familie",
      fr: "Écran des abonnés de Dulce avec un message de la famille",
      it: "Schermata dei follower di Dulce con un messaggio della famiglia",
    },
    related: ["dexcom", "family-sharing", "glucose-apps-compared"],
    faq: {
      es: [
        { q: "¿Puedo usar Dulce y Dexcom Follow a la vez?", a: "Sí. Las dos leen de Dexcom Share y no cambian nada en el sensor ni en la app de Dexcom. Un seguidor de Dexcom Follow ya cuenta como el seguidor que Dexcom exige para compartir." },
        { q: "¿Puedo entrar en Dulce con mi cuenta de seguidor de Dexcom Follow?", a: "No. Dulce necesita la cuenta de Dexcom de quien lleva el sensor. Para seguir a alguien, que te invite desde Dulce o entra con su cuenta si la gestionas tú.", link: "child-glucose" },
        { q: "¿Los avisos de Dulce suenan con el iPhone en silencio?", a: "Solo el de hipo crítica. Ante una bajada grave (55 mg/dL o menos) Dulce envía una alerta crítica de iOS, que suena en silencio y en No molestar si permites las alertas críticas de Dulce. Los demás avisos siguen los ajustes de sonido del iPhone, así que mantén también las alarmas de Dexcom.", link: "alerts" },
      ],
      en: [
        { q: "Can I use Dulce and Dexcom Follow at the same time?", a: "Yes. Both read from Dexcom Share and change nothing on the sensor or in the Dexcom app. A Dexcom Follow follower already counts as the follower Dexcom needs before it shares." },
        { q: "Can I sign in to Dulce with my Dexcom Follow follower account?", a: "No. Dulce needs the Dexcom account of the person wearing the sensor. To follow someone, have them invite you from Dulce, or sign in with their account if you look after it.", link: "child-glucose" },
        { q: "Do Dulce's alerts ring when the iPhone is on silent?", a: "Only the critical low alert. For a severe low (55 mg/dL or less) Dulce sends an iOS critical alert that rings on silent and in Do Not Disturb, once you allow critical alerts for Dulce. Its other alerts follow the iPhone's sound settings, so keep the Dexcom alarms on too.", link: "alerts" },
      ],
      de: [
        { q: "Kann ich Dulce und Dexcom Follow gleichzeitig nutzen?", a: "Ja. Beide lesen über Dexcom Share und ändern nichts am Sensor oder in der Dexcom-App. Ein Follower in Dexcom Follow zählt bereits als der Follower, den Dexcom zum Teilen verlangt." },
        { q: "Kann ich mich mit meinem Follower-Konto von Dexcom Follow bei Dulce anmelden?", a: "Nein. Dulce braucht das Dexcom-Konto der Person, die den Sensor trägt. Um jemandem zu folgen, lass dich aus Dulce einladen oder melde dich mit ihrem Konto an, wenn du es verwaltest.", link: "child-glucose" },
        { q: "Klingeln die Alarme von Dulce, wenn das iPhone stumm ist?", a: "Nur die kritische Warnung. Bei schwerer Unterzuckerung (55 mg/dL oder weniger) schickt Dulce einen kritischen Hinweis von iOS, der auch stumm und bei „Nicht stören“ klingelt, sobald du Dulce kritische Hinweise erlaubst. Die anderen Alarme folgen den Toneinstellungen des iPhones, lass also auch die Dexcom-Alarme an.", link: "alerts" },
      ],
      fr: [
        { q: "Puis-je utiliser Dulce et Dexcom Follow en même temps ?", a: "Oui. Les deux lisent via Dexcom Share et ne changent rien au capteur ni à l'app Dexcom. Un abonné Dexcom Follow compte déjà comme l'abonné que Dexcom exige pour partager." },
        { q: "Puis-je me connecter à Dulce avec mon compte d'abonné Dexcom Follow ?", a: "Non. Dulce a besoin du compte Dexcom de la personne qui porte le capteur. Pour suivre quelqu'un, fais-toi inviter depuis Dulce ou connecte-toi avec son compte si c'est toi qui le gères.", link: "child-glucose" },
        { q: "Les alertes de Dulce sonnent-elles iPhone en silencieux ?", a: "Seulement l'alerte d'hypo critique. En cas d'hypo sévère (55 mg/dL ou moins), Dulce envoie une alerte critique iOS qui sonne en silencieux et en Ne pas déranger, une fois que tu autorises les alertes critiques de Dulce. Ses autres alertes suivent les réglages de son de l'iPhone, donc garde aussi les alarmes Dexcom.", link: "alerts" },
      ],
      it: [
        { q: "Posso usare Dulce e Dexcom Follow insieme?", a: "Sì. Entrambe leggono da Dexcom Share e non cambiano nulla sul sensore né nell'app Dexcom. Un follower di Dexcom Follow conta già come il follower che Dexcom richiede per condividere." },
        { q: "Posso accedere a Dulce con il mio account da follower di Dexcom Follow?", a: "No. Dulce ha bisogno dell'account Dexcom di chi porta il sensore. Per seguire qualcuno, fatti invitare da Dulce oppure accedi con il suo account se lo gestisci tu.", link: "child-glucose" },
        { q: "Gli avvisi di Dulce suonano con l'iPhone in silenzioso?", a: "Solo l'avviso di ipo critica. Per un'ipo grave (55 mg/dL o meno) Dulce invia un avviso critico di iOS che suona in silenzioso e in Non disturbare, dopo che consenti gli avvisi critici di Dulce. Gli altri avvisi seguono le impostazioni audio dell'iPhone, quindi tieni attivi anche gli allarmi Dexcom.", link: "alerts" },
      ],
    },
  },
  {
    id: "blood-sugar-levels",
    category: "health",
    author: "giorgi",
    datePublished: "2026-10-28",
    dateModified: "2026-10-31",
    slug: {
      es: "valores-normales-glucosa-tabla",
      en: "blood-sugar-levels-chart",
      de: "blutzuckerwerte-tabelle",
      fr: "glycemie-normale-tableau",
      it: "valori-glicemia-tabella",
    },
    title: {
      es: "Valores normales de glucosa: tabla en mg/dL y mmol/L",
      en: "Blood sugar levels chart: normal, prediabetes, diabetes",
      de: "Blutzuckerwerte-Tabelle: normal, Prädiabetes, Diabetes",
      fr: "Glycémie normale : tableau des valeurs en mg/dL et mmol/L",
      it: "Valori della glicemia: tabella normale, prediabete, diabete",
    },
    description: {
      es: "Glucosa en ayunas, tras la sobrecarga y HbA1c: valores normales, de prediabetes y de diabetes, objetivos con diabetes y límites de hipoglucemia, con fuentes.",
      en: "Fasting glucose, glucose tolerance test and HbA1c: normal, prediabetes and diabetes values, targets with diabetes and low levels, in mg/dL and mmol/L.",
      de: "Nüchternblutzucker, oGTT und HbA1c: normale Werte, Prädiabetes und Diabetes, Zielwerte mit Diabetes und Grenzen der Unterzuckerung, in mg/dL und mmol/L.",
      fr: "Glycémie à jeun, HGPO et HbA1c : valeurs normales, prédiabète et diabète, objectifs avec un diabète et seuils d'hypoglycémie, en mg/dL et mmol/L.",
      it: "Glicemia a digiuno, curva da carico e HbA1c: valori normali, prediabete e diabete, obiettivi con il diabete e soglie di ipoglicemia, in mg/dL e mmol/L.",
    },
    summary: {
      es: "En adultos no embarazadas, la ADA sitúa la glucosa normal en ayunas por debajo de 100 mg/dL (5,6 mmol/L), la prediabetes entre 100 y 125 mg/dL y la diabetes en 126 mg/dL o más, repetido. La HbA1c es normal por debajo del 5,7% (39 mmol/mol), prediabetes del 5,7% al 6,4% y diabetes a partir del 6,5%. Son cortes de laboratorio para diagnosticar, no objetivos para quien ya vive con diabetes, que fija sus rangos con su equipo médico.",
      en: "For non-pregnant adults, the ADA puts a normal fasting blood sugar under 100 mg/dL (5.6 mmol/L), prediabetes at 100 to 125 mg/dL and diabetes at 126 mg/dL or more, confirmed. HbA1c is normal under 5.7% (39 mmol/mol), prediabetes from 5.7% to 6.4% and diabetes from 6.5%. These lab cut-offs are for diagnosis, not targets for people already living with diabetes, whose ranges are set with their care team.",
      de: "Für nicht schwangere Erwachsene setzt die ADA einen normalen Nüchternblutzucker unter 100 mg/dL (5,6 mmol/L) an, Prädiabetes bei 100 bis 125 mg/dL und Diabetes ab 126 mg/dL, bestätigt. Der HbA1c ist unter 5,7% (39 mmol/mol) normal, von 5,7% bis 6,4% Prädiabetes und ab 6,5% Diabetes. Diese Laborgrenzen dienen der Diagnose und sind keine Ziele für Menschen, die schon mit Diabetes leben; deren Zielbereiche werden mit dem Diabetes-Team festgelegt.",
      fr: "Chez l'adulte hors grossesse, l'ADA place une glycémie à jeun normale sous 100 mg/dL (1,00 g/L ou 5,6 mmol/L), le prédiabète entre 100 et 125 mg/dL et le diabète à partir de 126 mg/dL, confirmé. L'HbA1c est normale sous 5,7 % (39 mmol/mol), en prédiabète de 5,7 % à 6,4 % et en diabète à partir de 6,5 %. Ces seuils de laboratoire servent au diagnostic, pas d'objectifs pour qui vit déjà avec un diabète, dont les plages se fixent avec l'équipe soignante.",
      it: "Per gli adulti non in gravidanza, l'ADA pone la glicemia a digiuno normale sotto 100 mg/dL (5,6 mmol/L), il prediabete tra 100 e 125 mg/dL e il diabete da 126 mg/dL in su, confermato. L'HbA1c è normale sotto il 5,7% (39 mmol/mol), prediabete dal 5,7% al 6,4% e diabete dal 6,5%. Sono soglie di laboratorio per la diagnosi, non obiettivi per chi vive già con il diabete, i cui intervalli si decidono con il team diabetologico.",
    },
    keywords: {
      es: ["valores normales de glucosa", "glucosa en sangre valores normales", "glucosa en ayunas normal", "hemoglobina glicosilada valores normales", "tabla de glucosa", "tabla glucosa mmol/l"],
      en: ["blood sugar levels chart", "normal blood sugar levels", "fasting blood sugar normal range", "prediabetes range", "a1c chart", "blood sugar chart mmol/l", "blood sugar chart canada", "blood sugar chart canada vs us"],
      de: ["blutzuckerwerte tabelle", "normale blutzuckerwerte", "nüchternblutzucker normalwerte", "hba1c tabelle", "diabetes werte tabelle", "blutzuckerwerte tabelle mmol"],
      fr: ["glycémie normale", "tableau glycémie", "glycémie à jeun normale", "prédiabète glycémie", "hémoglobine glyquée normale", "tableau glycémie mmol/l"],
      it: ["valori glicemia", "glicemia normale", "glicemia a digiuno valori normali", "emoglobina glicata valori normali", "tabella glicemia", "tabella glicemia mmol/l"],
    },
    image: "/guides/covers/blood-sugar-levels.webp",
    imageAlt: {
      es: "Tabla de glucosa en ayunas: normal menos de 100, prediabetes 100–125, diabetes 126 mg/dL o más",
      en: "Fasting glucose chart: normal under 100, prediabetes 100–125, diabetes 126 mg/dL or more",
      de: "Nüchternglukose: normal unter 100, Prädiabetes 100–125, Diabetes ab 126 mg/dL",
      fr: "Glycémie à jeun : normale sous 100, prédiabète 100–125, diabète à partir de 126 mg/dL",
      it: "Glicemia a digiuno: normale sotto 100, prediabete 100–125, diabete da 126 mg/dL",
    },
    related: ["time-in-range", "night-lows", "trends"],
    faq: {
      es: [
        { q: "¿Cuál es la glucosa normal en ayunas?", a: "Menos de 100 mg/dL (5,6 mmol/L) según la ADA. De 100 a 125 mg/dL se considera prediabetes y 126 mg/dL o más, repetido, diabetes. La OMS empieza la glucosa alterada en ayunas en 110 mg/dL." },
        { q: "¿Qué hemoglobina glicosilada es normal?", a: "Menos del 5,7 % (39 mmol/mol). Del 5,7 % al 6,4 % es prediabetes y del 6,5 % en adelante, confirmado, diabetes. Con diabetes, el objetivo habitual de la ADA es menos del 7 %." },
        { q: "¿Puedo diagnosticarme diabetes con un sensor o un glucómetro?", a: "No. El diagnóstico se hace con análisis de laboratorio pedidos por un médico, normalmente repetidos. Un sensor o un glucómetro sirven para el día a día, no para diagnosticar." },
        { q: "¿Por qué unas tablas dan la glucosa en mg/dL y otras en mmol/L?", a: "Es la misma glucosa en dos unidades. España, Italia, Francia y Estados Unidos usan sobre todo mg/dL; Reino Unido, Irlanda, Canadá y Australia, mmol/L. Para pasar de mg/dL a mmol/L se divide entre 18: 100 mg/dL son 5,6 mmol/L." },
      ],
      en: [
        { q: "What is a normal fasting blood sugar?", a: "Under 100 mg/dL (5.6 mmol/L), according to the ADA. 100 to 125 mg/dL counts as prediabetes and 126 mg/dL or more, confirmed, as diabetes. The WHO starts impaired fasting glucose at 110 mg/dL." },
        { q: "What HbA1c is normal?", a: "Under 5.7% (39 mmol/mol). 5.7% to 6.4% is prediabetes and 6.5% or more, confirmed, is diabetes. For people with diabetes, the ADA's usual goal is under 7%." },
        { q: "Can a sensor or a meter diagnose diabetes?", a: "No. Diabetes is diagnosed from laboratory tests ordered by a doctor, usually repeated. A sensor or a meter is for everyday management, not for diagnosis." },
        { q: "Is a blood sugar chart in Canada different from the US?", a: "Mainly in the unit: the US mostly uses mg/dL and Canada uses mmol/L (divide mg/dL by 18; 100 mg/dL is 5.6 mmol/L). The diabetes cut-offs match, but Diabetes Canada starts prediabetes higher than the ADA: a fasting 6.1-6.9 mmol/L or an A1C of 6.0-6.4%. The charts here show both units." },
      ],
      de: [
        { q: "Welcher Nüchternblutzucker ist normal?", a: "Unter 100 mg/dL (5,6 mmol/L) laut ADA. 100 bis 125 mg/dL gilt als Prädiabetes, 126 mg/dL oder mehr, bestätigt, als Diabetes. Bei der WHO beginnt die abnorme Nüchternglukose erst bei 110 mg/dL." },
        { q: "Welcher HbA1c ist normal?", a: "Unter 5,7 % (39 mmol/mol). 5,7 % bis 6,4 % ist Prädiabetes, ab 6,5 %, bestätigt, Diabetes. Mit Diabetes ist das übliche Ziel der ADA unter 7 %." },
        { q: "Kann ich Diabetes mit einem Sensor oder Messgerät feststellen?", a: "Nein. Die Diagnose stellt eine Ärztin oder ein Arzt mit Laborwerten, meist wiederholt. Sensor und Messgerät sind für den Alltag gedacht, nicht für die Diagnose." },
        { q: "Warum stehen Blutzuckerwerte mal in mg/dl und mal in mmol/l?", a: "Es ist derselbe Zucker in zwei Einheiten. In Deutschland siehst du beide; die USA nutzen meist mg/dl, Großbritannien, Kanada und Australien mmol/l. Von mg/dl zu mmol/l teilst du durch 18: 100 mg/dl sind 5,6 mmol/l." },
      ],
      fr: [
        { q: "Quelle est la glycémie normale à jeun ?", a: "Moins de 100 mg/dL (1,00 g/L ou 5,6 mmol/L) selon l'ADA. De 100 à 125 mg/dL, on parle de prédiabète, et à partir de 126 mg/dL, confirmé, de diabète. L'OMS fait commencer l'hyperglycémie modérée à jeun à 110 mg/dL." },
        { q: "Quelle HbA1c est normale ?", a: "Moins de 5,7 % (39 mmol/mol). De 5,7 % à 6,4 %, c'est un prédiabète, et à partir de 6,5 %, confirmé, un diabète. Avec un diabète, l'objectif habituel de l'ADA est moins de 7 %." },
        { q: "Un capteur ou un lecteur peut-il diagnostiquer un diabète ?", a: "Non. Le diagnostic se fait avec des analyses de laboratoire prescrites par un médecin, en général répétées. Un capteur ou un lecteur sert au suivi quotidien, pas au diagnostic." },
        { q: "Pourquoi certains tableaux donnent la glycémie en mg/dL et d'autres en mmol/L ?", a: "C'est la même glycémie dans deux unités. La France, l'Espagne, l'Italie et les États-Unis utilisent surtout les mg/dL ; le Royaume-Uni, l'Irlande, le Canada et l'Australie les mmol/L. Pour passer des mg/dL aux mmol/L, on divise par 18 : 100 mg/dL font 5,6 mmol/L." },
      ],
      it: [
        { q: "Qual è la glicemia normale a digiuno?", a: "Meno di 100 mg/dL (5,6 mmol/L) secondo l'ADA. Da 100 a 125 mg/dL si parla di prediabete e da 126 mg/dL in su, confermato, di diabete. Per l'OMS l'alterata glicemia a digiuno parte da 110 mg/dL." },
        { q: "Quale emoglobina glicata è normale?", a: "Meno del 5,7% (39 mmol/mol). Dal 5,7% al 6,4% è prediabete e dal 6,5% in su, confermato, diabete. Con il diabete, l'obiettivo abituale dell'ADA è meno del 7%." },
        { q: "Posso diagnosticare il diabete con un sensore o un glucometro?", a: "No. La diagnosi si fa con esami di laboratorio prescritti da un medico, di solito ripetuti. Sensore e glucometro servono per la gestione quotidiana, non per la diagnosi." },
        { q: "Perché alcune tabelle danno la glicemia in mg/dL e altre in mmol/L?", a: "È la stessa glicemia in due unità. Italia, Spagna, Francia e Stati Uniti usano soprattutto i mg/dL; Regno Unito, Irlanda, Canada e Australia i mmol/L. Per passare da mg/dL a mmol/L si divide per 18: 100 mg/dL sono 5,6 mmol/L." },
      ],
    },
  },
  {
    id: "apple-watch-glucose",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    slug: {
      es: "apple-watch-medir-glucosa",
      en: "can-apple-watch-measure-blood-sugar",
      de: "blutzucker-messen-apple-watch",
      fr: "apple-watch-mesurer-glycemie",
      it: "apple-watch-misurare-glicemia",
      fi: "voiko-apple-watch-mitata-verensokeria",
      nl: "kan-apple-watch-bloedsuiker-meten",
      nb: "kan-apple-watch-male-blodsukker",
      sv: "kan-apple-watch-mata-blodsocker",
      ru: "mogut-li-apple-watch-izmeryat-sahar",
    },
    title: {
      es: "¿Puede el Apple Watch medir la glucosa? Lo que hay en 2026",
      en: "Can Apple Watch measure blood sugar? Where Apple is in 2026",
      de: "Kann die Apple Watch Blutzucker messen? Stand 2026",
      fr: "L'Apple Watch peut-elle mesurer la glycémie ? Où en est Apple",
      it: "Apple Watch può misurare la glicemia? A che punto è Apple",
      fi: "Voiko Apple Watch mitata verensokeria? Tilanne 2026",
      nl: "Kan een Apple Watch bloedsuiker meten? Stand van zaken 2026",
      nb: "Kan Apple Watch måle blodsukker? Hvor Apple står i 2026",
      sv: "Kan Apple Watch mäta blodsocker? Var Apple står 2026",
      ru: "Могут ли Apple Watch измерять сахар в крови? Что известно в 2026 году",
    },
    description: {
      es: "Ningún Apple Watch mide la glucosa, tampoco el Series 12. Qué prepara Apple, por qué es tan difícil, los relojes «de glucosa» a evitar y cómo verla hoy.",
      en: "No Apple Watch measures blood sugar, Series 12 included. What Apple is building, why it's hard, the glucose watches to avoid and how to see yours today.",
      de: "Keine Apple Watch misst Blutzucker, auch nicht die Series 12. Woran Apple arbeitet, warum es so schwer ist, welche Uhren du meidest und was heute geht.",
      fr: "Aucune Apple Watch ne mesure la glycémie, Series 12 comprise. Ce qu'Apple prépare, pourquoi c'est dur, les montres à éviter et comment la voir aujourd'hui.",
      it: "Nessun Apple Watch misura la glicemia, nemmeno il Series 12. Cosa prepara Apple, perché è difficile, gli orologi da evitare e come vederla già oggi.",
      fi: "Mikään Apple Watch ei mittaa verensokeria, ei Series 12:kaan. Mitä Apple rakentaa, miksi se on vaikeaa, mitä kelloja välttää ja miten näet glukoosisi jo nyt.",
      nl: "Geen Apple Watch meet bloedsuiker, ook de Series 12 niet. Wat Apple bouwt, waarom het zo moeilijk is, welke glucosehorloges je vermijdt en hoe je je waarde nu al ziet.",
      nb: "Ingen Apple Watch måler blodsukker, heller ikke Series 12. Hva Apple bygger, hvorfor det er vanskelig, hvilke glukoseklokker du bør unngå og hvordan du ser ditt i dag.",
      sv: "Ingen Apple Watch mäter blodsocker, inte heller Series 12. Vad Apple bygger, varför det är svårt, vilka glukosklockor du ska undvika och hur du ser ditt i dag.",
      ru: "Ни одни Apple Watch не измеряют сахар, включая Series 12. Что разрабатывает Apple, почему это сложно, каких «часов с глюкозой» избегать и как видеть сахар уже сегодня.",
    },
    summary: {
      es: "No: ningún Apple Watch puede medir la glucosa, tampoco el Series 12 de septiembre de 2026. Según Bloomberg, Apple trabaja desde hace más de 15 años en un sensor óptico sin agujas, pero aún faltarían años y Apple no ha anunciado nada. Hoy, para ver tu glucosa en la muñeca necesitas un sensor como FreeStyle Libre o Dexcom y una app como Dulce que la lleve al reloj.",
      en: "No: no Apple Watch can measure blood sugar, including the Series 12 released in September 2026. According to Bloomberg, Apple has worked for more than 15 years on a needle-free optical sensor, but it's reportedly still years away and Apple hasn't announced anything. Today, to see your glucose on your wrist you need a sensor such as a FreeStyle Libre or Dexcom and an app like Dulce that puts it on the watch.",
      de: "Nein: Keine Apple Watch kann Blutzucker messen, auch nicht die Series 12 vom September 2026. Laut Bloomberg arbeitet Apple seit über 15 Jahren an einem optischen Sensor ohne Nadel, aber das soll noch Jahre dauern, und Apple hat nichts angekündigt. Heute brauchst du für deinen Zucker am Handgelenk einen Sensor wie FreeStyle Libre oder Dexcom und eine App wie Dulce, die ihn auf die Uhr bringt.",
      fr: "Non : aucune Apple Watch ne peut mesurer la glycémie, pas même la Series 12 sortie en septembre 2026. Selon Bloomberg, Apple travaille depuis plus de 15 ans sur un capteur optique sans aiguille, mais il faudrait encore des années et Apple n'a rien annoncé. Aujourd'hui, pour voir ta glycémie au poignet, il te faut un capteur comme un FreeStyle Libre ou un Dexcom et une app comme Dulce qui l'affiche sur la montre.",
      it: "No: nessun Apple Watch può misurare la glicemia, nemmeno il Series 12 uscito a settembre 2026. Secondo Bloomberg, Apple lavora da più di 15 anni a un sensore ottico senza aghi, ma mancherebbero ancora anni e Apple non ha annunciato nulla. Oggi, per vedere la glicemia al polso ti servono un sensore come FreeStyle Libre o Dexcom e un'app come Dulce che la porti sull'orologio.",
      fi: "Ei: mikään Apple Watch ei pysty mittaamaan verensokeria, ei myöskään syyskuussa 2026 julkaistu Series 12. Bloombergin mukaan Apple on työstänyt neulatonta optista sensoria yli 15 vuotta, mutta siihen on kertoman mukaan yhä vuosia, eikä Apple ole ilmoittanut mitään. Tänään glukoosin näkeminen ranteessa vaatii sensorin, kuten FreeStyle Libren tai Dexcomin, ja Dulcen kaltaisen sovelluksen, joka tuo sen kelloon.",
      nl: "Nee: geen enkele Apple Watch kan bloedsuiker meten, ook de Series 12 van september 2026 niet. Volgens Bloomberg werkt Apple al meer dan 15 jaar aan een optische sensor zonder naald, maar die is naar verluidt nog jaren weg en Apple heeft niets aangekondigd. Vandaag heb je om je glucose om je pols te zien een sensor nodig, zoals een FreeStyle Libre of Dexcom, en een app zoals Dulce die de waarde op het horloge zet.",
      nb: "Nei: ingen Apple Watch kan måle blodsukker, heller ikke Series 12 som kom i september 2026. Ifølge Bloomberg har Apple jobbet i over 15 år med en optisk sensor uten nål, men den skal fortsatt være flere år unna, og Apple har ikke kunngjort noe. For å se glukosen på håndleddet i dag trenger du en sensor som FreeStyle Libre eller Dexcom og en app som Dulce som viser den på klokken.",
      sv: "Nej: ingen Apple Watch kan mäta blodsocker, inte heller Series 12 som kom i september 2026. Enligt Bloomberg har Apple arbetat i över 15 år med en optisk sensor utan nål, men den uppges fortfarande vara flera år bort och Apple har inte tillkännagett något. För att se din glukos på handleden i dag behöver du en sensor som FreeStyle Libre eller Dexcom och en app som Dulce som visar den på klockan.",
      ru: "Нет: ни одни Apple Watch не умеют измерять сахар в крови, включая Series 12, вышедшие в сентябре 2026 года. По данным Bloomberg, Apple больше 15 лет работает над оптическим сенсором без иглы, но до него, по сообщениям, ещё годы, и Apple ничего не объявляла. Чтобы видеть глюкозу на запястье сегодня, нужен сенсор вроде FreeStyle Libre или Dexcom и приложение вроде Dulce, которое выводит её на часы.",
    },
    keywords: {
      es: ["apple watch mide glucosa", "apple watch medir azúcar", "glucosa apple watch", "medir glucosa apple watch sin pinchar", "reloj que mide la glucosa"],
      en: ["can apple watch measure blood sugar", "blood sugar apple watch", "apple watch glucose monitoring", "apple watch series 12 blood sugar", "non invasive glucose apple watch"],
      de: ["blutzucker messen apple watch", "blutzucker apple watch", "kann die apple watch blutzucker messen", "apple watch blutzucker ohne stechen", "smartwatch blutzucker messen"],
      fr: ["apple watch mesure glycémie", "glycémie apple watch", "mesure glycémie apple watch", "montre qui mesure la glycémie", "apple watch glycémie sans piqûre"],
      it: ["apple watch misura glicemia", "glicemia apple watch", "misurazione glicemia apple watch", "orologio che misura la glicemia", "apple watch glicemia senza aghi"],
      fi: ["verensokeri apple watch", "voiko apple watch mitata verensokeria", "apple watch verensokerin mittaus", "apple watch glukoosi", "verensokerikello"],
      nl: ["bloedsuiker meten apple watch", "kan apple watch bloedsuiker meten", "apple watch glucose meten", "apple watch bloedsuiker", "glucose horloge"],
      nb: ["kan apple watch måle blodsukker", "blodsukker apple watch", "apple watch glukose", "apple watch series 12 blodsukker", "glukoseklokke"],
      sv: ["kan apple watch mäta blodsocker", "blodsocker apple watch", "apple watch glukos", "apple watch series 12 blodsocker", "glukosklocka"],
      ru: ["могут ли apple watch измерять сахар", "сахар в крови apple watch", "apple watch глюкоза", "apple watch series 12 сахар", "часы измеряющие сахар"],
    },
    image: "/guides/apple-watch-3.jpg",
    imageAlt: {
      es: "App de Dulce en el Apple Watch con glucosa 86 y la gráfica del día",
      en: "Dulce app on Apple Watch showing glucose 86 and the day's chart",
      de: "Dulce-App auf der Apple Watch mit Glukose 86 und Tagesverlauf",
      fr: "App Dulce sur l'Apple Watch affichant une glycémie de 86 et la courbe du jour",
      it: "App di Dulce su Apple Watch con glicemia 86 e grafico della giornata",
      fi: "Dulce-sovellus Apple Watchissa näyttää glukoosin 86 ja päivän käyrän",
      nl: "Dulce-app op de Apple Watch met glucose 86 en de grafiek van de dag",
      nb: "Dulce-appen på Apple Watch viser glukose 86 og dagens graf",
      sv: "Dulce-appen på Apple Watch visar glukos 86 och dagens diagram",
      ru: "Приложение Dulce на Apple Watch показывает глюкозу 86 и график за день",
    },
    related: ["apple-watch", "dexcom", "blood-sugar-levels", "glucose-apps-compared"],
    faq: {
      es: [
        { q: "¿El Apple Watch mide la glucosa?", a: "No. Ningún Apple Watch mide la glucosa, tampoco el Series 12 de septiembre de 2026. Sí puede mostrar, a través de una app, la glucosa de un sensor como FreeStyle Libre o Dexcom." },
        { q: "¿Cuándo medirá la glucosa el Apple Watch?", a: "Nadie fuera de Apple lo sabe. Según Bloomberg, Apple trabaja desde hace más de 15 años en un sensor óptico sin agujas y aún faltarían varios años, si es que llega. Apple no ha anunciado nada." },
        { q: "¿Existen relojes que midan el azúcar sin pinchar?", a: "No de forma fiable. La FDA pidió en febrero de 2024 no comprar ni usar relojes o anillos que dicen medir la glucosa sin atravesar la piel: ninguno está autorizado y sus lecturas pueden llevar a errores de dosis peligrosos." },
        { q: "¿Cómo veo mi glucosa en el Apple Watch?", a: "Con un monitor continuo de glucosa y una app que la lleve al reloj. Dulce lee FreeStyle Libre a través de LibreLinkUp y Dexcom a través de Dexcom Share y muestra tu glucosa en complicaciones y en una app para el reloj (Dulce Pro, 14 días de prueba gratis).", link: "apple-watch" },
      ],
      en: [
        { q: "Can Apple Watch measure blood sugar?", a: "No. No Apple Watch measures blood glucose, including the Series 12 released in September 2026. It can show glucose from a sensor such as a FreeStyle Libre or Dexcom through an app." },
        { q: "When will Apple Watch measure glucose?", a: "Nobody outside Apple knows. Bloomberg reports Apple has worked on a needle-free optical sensor for more than 15 years and that it's still several years away, if it ever ships. Apple hasn't announced anything." },
        { q: "Are smartwatches that measure blood sugar real?", a: "No. The FDA warned in February 2024 not to buy or use smartwatches or rings that claim to measure glucose without piercing the skin: none is authorized and their readings can lead to dangerous dosing errors." },
        { q: "How can I see my blood sugar on my Apple Watch?", a: "With a continuous glucose monitor and an app that shows it on the watch. Dulce reads FreeStyle Libre through LibreLinkUp and Dexcom through Dexcom Share and shows your glucose in complications and a watch app (Dulce Pro, 14-day free trial).", link: "apple-watch" },
      ],
      de: [
        { q: "Kann die Apple Watch Blutzucker messen?", a: "Nein. Keine Apple Watch misst Blutzucker, auch nicht die Series 12 vom September 2026. Über eine App kann sie aber den Wert eines Sensors wie FreeStyle Libre oder Dexcom anzeigen." },
        { q: "Wann misst die Apple Watch Blutzucker?", a: "Das weiß außerhalb von Apple niemand. Laut Bloomberg arbeitet Apple seit über 15 Jahren an einem optischen Sensor ohne Nadel, und es soll noch mehrere Jahre dauern, wenn es überhaupt kommt. Apple hat nichts angekündigt." },
        { q: "Gibt es Smartwatches, die Blutzucker ohne Stechen messen?", a: "Nicht verlässlich. Die FDA hat im Februar 2024 davor gewarnt, Uhren oder Ringe zu kaufen oder zu benutzen, die Blutzucker ohne Stich messen wollen: Keines dieser Geräte ist zugelassen, und ihre Werte können zu gefährlichen Dosierfehlern führen." },
        { q: "Wie sehe ich meinen Blutzucker auf der Apple Watch?", a: "Mit einem CGM und einer App, die den Wert auf die Uhr bringt. Dulce liest FreeStyle Libre über LibreLinkUp und Dexcom über Dexcom Share und zeigt deinen Zucker in Komplikationen und einer Uhr-App (Dulce Pro, 14 Tage Gratis-Test).", link: "apple-watch" },
      ],
      fr: [
        { q: "L'Apple Watch mesure-t-elle la glycémie ?", a: "Non. Aucune Apple Watch ne mesure la glycémie, pas même la Series 12 de septembre 2026. Elle peut en revanche afficher, via une app, la glycémie d'un capteur comme un FreeStyle Libre ou un Dexcom." },
        { q: "Quand l'Apple Watch mesurera-t-elle la glycémie ?", a: "Personne hors d'Apple ne le sait. Selon Bloomberg, Apple travaille depuis plus de 15 ans sur un capteur optique sans aiguille et il faudrait encore plusieurs années, si ça arrive un jour. Apple n'a rien annoncé." },
        { q: "Les montres qui mesurent la glycémie sans piqûre existent-elles ?", a: "Pas de façon fiable. En février 2024, la FDA a demandé de ne pas acheter ni utiliser les montres ou bagues qui prétendent mesurer la glycémie sans percer la peau : aucune n'est autorisée et leurs mesures peuvent entraîner de dangereuses erreurs de dose." },
        { q: "Comment voir ma glycémie sur l'Apple Watch ?", a: "Avec un capteur de glucose en continu et une app qui l'affiche sur la montre. Dulce lit le FreeStyle Libre via LibreLinkUp et le Dexcom via Dexcom Share et affiche ta glycémie dans des complications et une app pour la montre (Dulce Pro, 14 jours d'essai gratuit).", link: "apple-watch" },
      ],
      it: [
        { q: "Apple Watch misura la glicemia?", a: "No. Nessun Apple Watch misura la glicemia, nemmeno il Series 12 di settembre 2026. Tramite un'app può però mostrare la glicemia di un sensore come FreeStyle Libre o Dexcom." },
        { q: "Quando Apple Watch misurerà la glicemia?", a: "Fuori da Apple nessuno lo sa. Secondo Bloomberg, Apple lavora da più di 15 anni a un sensore ottico senza aghi e mancherebbero ancora diversi anni, sempre che arrivi. Apple non ha annunciato nulla." },
        { q: "Esistono orologi che misurano la glicemia senza aghi?", a: "Non in modo affidabile. A febbraio 2024 la FDA ha chiesto di non comprare né usare orologi o anelli che dicono di misurare la glicemia senza forare la pelle: nessuno è autorizzato e le loro letture possono portare a errori di dose pericolosi." },
        { q: "Come vedo la glicemia su Apple Watch?", a: "Con un sensore per il monitoraggio continuo e un'app che porti il valore sull'orologio. Dulce legge FreeStyle Libre tramite LibreLinkUp e Dexcom tramite Dexcom Share e mostra la glicemia nelle complicazioni e in un'app per l'orologio (Dulce Pro, 14 giorni di prova gratuita).", link: "apple-watch" },
      ],
      fi: [
        { q: "Voiko Apple Watch mitata verensokeria?", a: "Ei. Mikään Apple Watch ei mittaa verensokeria, ei myöskään syyskuussa 2026 julkaistu Series 12. Se voi kuitenkin näyttää sovelluksen kautta sensorin, kuten FreeStyle Libren tai Dexcomin, glukoosin." },
        { q: "Milloin Apple Watch mittaa glukoosia?", a: "Kukaan Applen ulkopuolella ei tiedä. Bloombergin mukaan Apple on työstänyt neulatonta optista sensoria yli 15 vuotta, ja siihen on yhä useita vuosia, jos se koskaan tulee. Apple ei ole ilmoittanut mitään." },
        { q: "Ovatko verensokeria mittaavat älykellot totta?", a: "Eivät. FDA varoitti helmikuussa 2024 ostamasta tai käyttämästä älykelloja tai -sormuksia, jotka väittävät mittaavansa glukoosia ihoa lävistämättä: yhtäkään ei ole hyväksytty, ja niiden lukemat voivat johtaa vaarallisiin annosteluvirheisiin." },
        { q: "Miten näen verensokerini Apple Watchissa?", a: "Jatkuvalla glukoosinseurannalla ja sovelluksella, joka näyttää sen kellossa. Dulce lukee FreeStyle Librea LibreLinkUpin ja Dexcomia Dexcom Sharen kautta ja näyttää glukoosisi komplikaatioissa ja kellosovelluksessa (Dulce Pro, 14 päivän ilmainen kokeilu).", link: "apple-watch" },
      ],
      nl: [
        { q: "Kan een Apple Watch bloedsuiker meten?", a: "Nee. Geen enkele Apple Watch meet bloedglucose, ook de Series 12 van september 2026 niet. Via een app kan hij wel de glucose van een sensor zoals een FreeStyle Libre of Dexcom tonen." },
        { q: "Wanneer gaat de Apple Watch glucose meten?", a: "Niemand buiten Apple weet het. Volgens Bloomberg werkt Apple al meer dan 15 jaar aan een optische sensor zonder naald en duurt het nog een aantal jaar, als hij er ooit komt. Apple heeft niets aangekondigd." },
        { q: "Bestaan er smartwatches die bloedsuiker meten zonder prikken?", a: "Niet betrouwbaar. De FDA waarschuwde in februari 2024 om geen smartwatches of ringen te kopen of te gebruiken die zeggen glucose te meten zonder door de huid te gaan: geen enkele is toegelaten en hun waarden kunnen tot gevaarlijke doseerfouten leiden." },
        { q: "Hoe zie ik mijn bloedsuiker op mijn Apple Watch?", a: "Met een continue glucosemonitor en een app die de waarde op het horloge zet. Dulce leest de FreeStyle Libre via LibreLinkUp en de Dexcom via Dexcom Share en toont je glucose in complicaties en een horloge-app (Dulce Pro, 14 dagen gratis proberen).", link: "apple-watch" },
      ],
      nb: [
        { q: "Kan Apple Watch måle blodsukker?", a: "Nei. Ingen Apple Watch måler blodsukker, heller ikke Series 12 som kom i september 2026. Den kan vise glukose fra en sensor som FreeStyle Libre eller Dexcom via en app." },
        { q: "Når vil Apple Watch måle glukose?", a: "Ingen utenfor Apple vet. Bloomberg rapporterer at Apple har jobbet med en optisk sensor uten nål i mer enn 15 år, og at den fortsatt er flere år unna, om den i det hele tatt kommer. Apple har ikke kunngjort noe." },
        { q: "Finnes det ekte smartklokker som måler blodsukker?", a: "Nei. FDA advarte i februar 2024 mot å kjøpe eller bruke smartklokker eller ringer som påstår å måle glukose uten å stikke i huden: ingen er godkjent, og målingene kan føre til farlige feil i doseringen." },
        { q: "Hvordan ser jeg blodsukkeret på Apple Watch?", a: "Med en kontinuerlig glukosemåler og en app som viser den på klokken. Dulce leser FreeStyle Libre via LibreLinkUp og Dexcom via Dexcom Share og viser glukosen i komplikasjoner og en klokkeapp (Dulce Pro, 14 dagers gratis prøveperiode).", link: "apple-watch" },
      ],
      sv: [
        { q: "Kan Apple Watch mäta blodsocker?", a: "Nej. Ingen Apple Watch mäter blodsocker, inte heller Series 12 som kom i september 2026. Den kan visa glukos från en sensor som FreeStyle Libre eller Dexcom via en app." },
        { q: "När kommer Apple Watch att mäta glukos?", a: "Ingen utanför Apple vet. Bloomberg rapporterar att Apple har arbetat med en optisk sensor utan nål i mer än 15 år och att den fortfarande är flera år bort, om den alls kommer. Apple har inte tillkännagett något." },
        { q: "Finns det riktiga smartklockor som mäter blodsocker?", a: "Nej. FDA varnade i februari 2024 för att köpa eller använda smartklockor eller ringar som påstår sig mäta glukos utan att sticka i huden: ingen är godkänd och deras värden kan leda till farliga doseringsfel." },
        { q: "Hur ser jag mitt blodsocker på Apple Watch?", a: "Med en kontinuerlig glukosmätare och en app som visar den på klockan. Dulce läser FreeStyle Libre via LibreLinkUp och Dexcom via Dexcom Share och visar din glukos i komplikationer och en klockapp (Dulce Pro, 14 dagars gratis provperiod).", link: "apple-watch" },
      ],
      ru: [
        { q: "Могут ли Apple Watch измерять сахар в крови?", a: "Нет. Ни одни Apple Watch не измеряют глюкозу в крови, включая Series 12, вышедшие в сентябре 2026 года. Они могут показывать глюкозу с сенсора вроде FreeStyle Libre или Dexcom через приложение." },
        { q: "Когда Apple Watch будут измерять глюкозу?", a: "Вне Apple этого никто не знает. Bloomberg сообщает, что Apple больше 15 лет работает над оптическим сенсором без иглы и что до него ещё несколько лет, если он вообще появится. Apple ничего не объявляла." },
        { q: "Бывают ли настоящие смарт-часы, измеряющие сахар?", a: "Нет. В феврале 2024 года FDA предупредило не покупать и не использовать смарт-часы и кольца, которые якобы измеряют глюкозу без прокола кожи: ни одно из них не одобрено, а их показания могут привести к опасным ошибкам в дозировке." },
        { q: "Как видеть сахар на Apple Watch?", a: "С помощью системы непрерывного мониторинга глюкозы и приложения, которое выводит её на часы. Dulce читает FreeStyle Libre через LibreLinkUp и Dexcom через Dexcom Share и показывает глюкозу в расширениях и приложении для часов (Dulce Pro, 14 дней бесплатно).", link: "apple-watch" },
      ],
    },
  },
  {
    id: "hba1c",
    category: "health",
    author: "giorgi",
    datePublished: "2026-11-03",
    dateModified: "2026-11-05",
    slug: {
      es: "hemoglobina-glicosilada-hba1c",
      en: "hba1c-a1c-test-vs-gmi",
      de: "hba1c-wert-normalwerte-gmi",
      fr: "hemoglobine-glyquee-hba1c",
      it: "emoglobina-glicata-hba1c",
    },
    title: {
      es: "Hemoglobina glicosilada (HbA1c): valores y por qué difiere del GMI",
      en: "HbA1c (A1C): normal levels, targets and why GMI differs",
      de: "HbA1c-Wert: Normalwerte, Zielwert und warum der GMI abweicht",
      fr: "Hémoglobine glyquée (HbA1c) : valeurs, objectif et GMI",
      it: "Emoglobina glicata (HbA1c): valori, obiettivo e GMI",
    },
    description: {
      es: "Qué mide la HbA1c, valores normales y objetivos, si hay que ir en ayunas, qué la falsea y por qué la HbA1c estimada (GMI) de tu sensor no coincide.",
      en: "What HbA1c measures, normal levels and targets, fasting, what skews it, and why your Libre or Dexcom estimated A1C (GMI) doesn't match the lab.",
      de: "Was der HbA1c misst, Normal- und Zielwerte, ob du nüchtern sein musst, was ihn verfälscht und warum der geschätzte HbA1c (GMI) deines Sensors abweicht.",
      fr: "Ce que mesure l'HbA1c, valeurs normales et objectifs, jeûne ou pas, ce qui la fausse et pourquoi l'HbA1c estimée (GMI) de ton capteur diffère.",
      it: "Cosa misura l'HbA1c, valori normali e obiettivi, se serve il digiuno, cosa la falsa e perché l'HbA1c stimata (GMI) del sensore è diversa.",
    },
    summary: {
      es: "La hemoglobina glicosilada (HbA1c) es un análisis de sangre que refleja tu glucosa media de unos tres meses: es normal por debajo del 5,7 % (39 mmol/mol), prediabetes del 5,7 % al 6,4 % y diabetes desde el 6,5 %, y en muchos adultos con diabetes el objetivo habitual es menos del 7 %. No hace falta ayunar. El GMI o «HbA1c estimada» de un sensor es un cálculo a partir de tu glucosa media, y en el estudio que lo definió difería del análisis en 0,5 puntos o más en el 28 % de las personas.",
      en: "HbA1c is a blood test that reflects your average glucose over about three months: it's normal under 5.7% (39 mmol/mol), prediabetes from 5.7% to 6.4% and diabetes from 6.5%, and the usual target for many adults with diabetes is under 7%. You don't need to fast. A sensor's GMI or \"estimated A1C\" is a calculation from your average glucose, and in the study that defined it, it differed from the lab result by 0.5 points or more in 28% of people.",
      de: "Der HbA1c ist ein Bluttest, der deinen durchschnittlichen Blutzucker der letzten etwa drei Monate zeigt: normal unter 5,7 % (39 mmol/mol), Prädiabetes von 5,7 % bis 6,4 %, Diabetes ab 6,5 %, und das übliche Ziel für viele Erwachsene mit Diabetes ist unter 7 %. Nüchtern musst du dafür nicht sein. Der GMI oder „geschätzte HbA1c“ eines Sensors wird aus deiner Durchschnittsglukose berechnet und wich in der Studie, die ihn festlegte, bei 28 % der Menschen um 0,5 Punkte oder mehr vom Laborwert ab.",
      fr: "L'hémoglobine glyquée (HbA1c) est une analyse de sang qui reflète ta glycémie moyenne sur environ trois mois : elle est normale sous 5,7 % (39 mmol/mol), en prédiabète de 5,7 % à 6,4 % et en diabète à partir de 6,5 %, et l'objectif habituel pour beaucoup d'adultes avec un diabète est moins de 7 %. Pas besoin d'être à jeun. Le GMI ou « HbA1c estimée » d'un capteur est un calcul à partir de ta glycémie moyenne, et dans l'étude qui l'a défini, il s'écartait de l'analyse de 0,5 point ou plus chez 28 % des personnes.",
      it: "L'emoglobina glicata (HbA1c) è un esame del sangue che riflette la glicemia media di circa tre mesi: è normale sotto il 5,7% (39 mmol/mol), prediabete dal 5,7% al 6,4% e diabete dal 6,5%, e per molti adulti con diabete l'obiettivo abituale è sotto il 7%. Non serve il digiuno. Il GMI o «HbA1c stimata» di un sensore è un calcolo dalla glicemia media e, nello studio che lo ha definito, differiva dall'esame di 0,5 punti o più nel 28% delle persone.",
    },
    keywords: {
      es: ["hemoglobina glicosilada", "hemoglobina glicosilada valores normales", "hba1c", "glucosa glicosilada alta", "gmi vs hba1c", "hba1c estimada libre", "hemoglobina glicosilada en ayunas"],
      en: ["hba1c", "a1c test", "normal a1c levels", "libre gmi vs a1c", "gmi vs a1c", "glucose high but a1c normal", "low blood sugar but high a1c", "libre estimated a1c"],
      de: ["hba1c", "hba1c wert", "hba1c normalwerte", "hba1c zielwert typ 1 diabetes", "gmi hba1c unterschied", "langzeitzucker", "hba1c nüchtern"],
      fr: ["hémoglobine glyquée", "hba1c", "hémoglobine glyquée normale", "glycémie hba1c c'est quoi", "gmi hba1c", "hba1c à jeun", "hba1c estimée libre"],
      it: ["emoglobina glicata", "emoglobina glicata valori normali", "hba1c", "glicemia hba1c", "gmi e hba1c", "emoglobina glicata digiuno", "hba1c stimata libre"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce con 131 mg/dL y la barra de tiempo en rango",
      en: "Dulce home screen showing 131 mg/dL and the time in range bar",
      de: "Startbildschirm von Dulce mit 131 mg/dL und dem Balken für die Zeit im Zielbereich",
      fr: "Écran d'accueil de Dulce avec 131 mg/dL et la barre de temps dans la cible",
      it: "Schermata Home di Dulce con 131 mg/dL e la barra del tempo nel range",
    },
    related: ["blood-sugar-levels", "time-in-range", "trends", "night-lows"],
    faq: {
      es: [
        { q: "¿Qué valor de hemoglobina glicosilada es normal?", a: "Menos del 5,7 % (39 mmol/mol). Del 5,7 % al 6,4 % es prediabetes y del 6,5 % en adelante, confirmado con otro análisis, diabetes. Con diabetes, el objetivo habitual en muchos adultos es menos del 7 % (53 mmol/mol), pero tu equipo médico lo ajusta a ti." },
        { q: "¿Hay que ir en ayunas para la hemoglobina glicosilada?", a: "No. La HbA1c no necesita ayuno y se puede hacer a cualquier hora. Si en el mismo análisis te miden la glucosa en ayunas, para esa sí tendrás que ayunar." },
        { q: "¿Por qué la HbA1c estimada de mi Libre no coincide con el análisis?", a: "Porque es el GMI, un cálculo a partir de la glucosa media del sensor, mientras que la HbA1c es un análisis de sangre que depende también de tus glóbulos rojos. En el estudio que definió el GMI, la diferencia fue de 0,5 puntos o más en el 28 % de las personas." },
        { q: "¿Cómo puedo tener hipoglucemias y la HbA1c alta?", a: "Porque la HbA1c es una media: las bajadas y las subidas se compensan. Por eso con sensor se mira también el tiempo en rango, que enseña cuánto tiempo pasas por debajo de 70 mg/dL.", link: "time-in-range" },
      ],
      en: [
        { q: "What is a normal HbA1c?", a: "Under 5.7% (39 mmol/mol). 5.7% to 6.4% is prediabetes and 6.5% or more, confirmed by a second test, is diabetes. With diabetes, the usual target for many adults is under 7% (53 mmol/mol), but your care team adjusts it to you." },
        { q: "Do I need to fast for an A1C test?", a: "No. The A1C test doesn't need fasting and can be done at any time of day. If the same blood draw includes a fasting glucose, you'll need to fast for that one." },
        { q: "Why doesn't my Libre's estimated A1C match my lab A1C?", a: "Because it's the GMI, calculated from your sensor's average glucose, while A1C is a blood test that also depends on your red blood cells. In the study that defined GMI, the two differed by 0.5 points or more in 28% of people." },
        { q: "How can I have lows but a high A1C?", a: "Because A1C is an average: lows and highs cancel out. That's why sensor users also look at time in range, which shows how much time you spend below 70 mg/dL.", link: "time-in-range" },
      ],
      de: [
        { q: "Welcher HbA1c-Wert ist normal?", a: "Unter 5,7 % (39 mmol/mol). 5,7 % bis 6,4 % ist Prädiabetes, ab 6,5 %, mit einem zweiten Test bestätigt, Diabetes. Mit Diabetes ist das übliche Ziel für viele Erwachsene unter 7 % (53 mmol/mol), dein Diabetes-Team passt es aber an dich an." },
        { q: "Muss man für den HbA1c nüchtern sein?", a: "Nein. Für den HbA1c musst du nicht nüchtern sein, der Test geht zu jeder Tageszeit. Wird bei derselben Blutabnahme auch der Nüchternblutzucker bestimmt, gilt dafür das Nüchterngebot." },
        { q: "Warum passt der geschätzte HbA1c meines Libre nicht zum Laborwert?", a: "Weil es der GMI ist, berechnet aus der Durchschnittsglukose des Sensors, während der HbA1c ein Bluttest ist, der auch von deinen roten Blutkörperchen abhängt. In der Studie, die den GMI festlegte, lagen beide bei 28 % der Menschen 0,5 Punkte oder mehr auseinander." },
        { q: "Wie kann ich Unterzuckerungen und trotzdem einen hohen HbA1c haben?", a: "Weil der HbA1c ein Durchschnitt ist: Tiefs und Hochs gleichen sich aus. Deshalb schauen Sensor-Nutzer auch auf die Zeit im Zielbereich, die zeigt, wie viel Zeit du unter 70 mg/dL verbringst.", link: "time-in-range" },
      ],
      fr: [
        { q: "Quelle hémoglobine glyquée est normale ?", a: "Moins de 5,7 % (39 mmol/mol). De 5,7 % à 6,4 %, c'est un prédiabète, et à partir de 6,5 %, confirmé par une deuxième analyse, un diabète. Avec un diabète, l'objectif habituel pour beaucoup d'adultes est moins de 7 % (53 mmol/mol), mais ton équipe soignante l'adapte à toi." },
        { q: "Faut-il être à jeun pour l'hémoglobine glyquée ?", a: "Non. L'HbA1c ne demande pas d'être à jeun et peut se faire à toute heure. Si la même prise de sang comprend une glycémie à jeun, il faudra être à jeun pour celle-là." },
        { q: "Pourquoi l'HbA1c estimée de mon Libre ne correspond-elle pas au laboratoire ?", a: "Parce que c'est le GMI, calculé à partir de la glycémie moyenne du capteur, alors que l'HbA1c est une analyse de sang qui dépend aussi de tes globules rouges. Dans l'étude qui a défini le GMI, l'écart était de 0,5 point ou plus chez 28 % des personnes." },
        { q: "Comment peut-on faire des hypos et avoir une HbA1c élevée ?", a: "Parce que l'HbA1c est une moyenne : les hypos et les hypers se compensent. C'est pourquoi avec un capteur on regarde aussi le temps dans la cible, qui montre le temps passé sous 70 mg/dL.", link: "time-in-range" },
      ],
      it: [
        { q: "Quale valore di emoglobina glicata è normale?", a: "Sotto il 5,7% (39 mmol/mol). Dal 5,7% al 6,4% è prediabete e dal 6,5% in su, confermato da un secondo esame, diabete. Con il diabete, l'obiettivo abituale per molti adulti è sotto il 7% (53 mmol/mol), ma il tuo team diabetologico lo adatta a te." },
        { q: "Serve il digiuno per l'emoglobina glicata?", a: "No. L'HbA1c non richiede il digiuno e si può fare a qualsiasi ora. Se nello stesso prelievo c'è anche la glicemia a digiuno, per quella il digiuno serve." },
        { q: "Perché l'HbA1c stimata del mio Libre non coincide con l'esame?", a: "Perché è il GMI, calcolato dalla glicemia media del sensore, mentre l'HbA1c è un esame del sangue che dipende anche dai globuli rossi. Nello studio che ha definito il GMI, la differenza era di 0,5 punti o più nel 28% delle persone." },
        { q: "Come posso avere ipoglicemie e l'HbA1c alta?", a: "Perché l'HbA1c è una media: ipo e iper si compensano. Per questo con il sensore si guarda anche il tempo nel range, che mostra quanto tempo passi sotto i 70 mg/dL.", link: "time-in-range" },
      ],
    },
  },
  {
    id: "xdrip-iphone",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-11-04",
    dateModified: "2026-11-04",
    slug: {
      es: "xdrip-y-juggluco-en-iphone",
      en: "xdrip-and-juggluco-on-iphone",
      de: "xdrip-und-juggluco-auf-dem-iphone",
      fr: "xdrip-et-juggluco-sur-iphone",
      it: "xdrip-e-juggluco-su-iphone",
    },
    title: {
      es: "xDrip y Juggluco en iPhone: qué funciona y alternativas",
      en: "xDrip and Juggluco on iPhone: what works and alternatives",
      de: "xDrip und Juggluco auf dem iPhone: was geht, Alternativen",
      fr: "xDrip et Juggluco sur iPhone : ce qui marche, alternatives",
      it: "xDrip e Juggluco su iPhone: cosa funziona e alternative",
    },
    description: {
      es: "xDrip+ y Juggluco son de Android. Qué hay en iPhone: xDrip4iOS (TestFlight o compilarla), Zukka en el App Store, o leer LibreLinkUp y Dexcom Share con Dulce.",
      en: "xDrip+ and Juggluco are Android apps. What exists on iPhone: xDrip4iOS (TestFlight or self-build), Zukka in the App Store, or LibreLinkUp and Dexcom Share with Dulce.",
      de: "xDrip+ und Juggluco gibt es nur für Android. Was es fürs iPhone gibt: xDrip4iOS (TestFlight oder selbst bauen), Zukka im App Store oder LibreLinkUp mit Dulce.",
      fr: "xDrip+ et Juggluco sont des apps Android. Ce qui existe sur iPhone : xDrip4iOS (TestFlight ou compilation), Zukka sur l'App Store, ou LibreLinkUp avec Dulce.",
      it: "xDrip+ e Juggluco sono app Android. Cosa c'è su iPhone: xDrip4iOS (TestFlight o da compilare), Zukka nell'App Store, oppure LibreLinkUp e Dexcom Share con Dulce.",
    },
    summary: {
      es: "xDrip+ y Juggluco son apps de Android y no están en el App Store. En iPhone puedes instalar xDrip4iOS con una invitación de TestFlight o compilándola tú, usar Zukka (del App Store, basada en el código de xDrip4iOS) o usar una app como Dulce, que lee LibreLinkUp o Dexcom Share mientras la app de Abbott o Dexcom sigue a cargo del sensor y de sus alarmas.",
      en: "xDrip+ and Juggluco are Android apps and aren't in the App Store. On an iPhone you can install xDrip4iOS from a TestFlight invitation or build it yourself, use Zukka (in the App Store, based on the xDrip4iOS code), or use an app like Dulce that reads LibreLinkUp or Dexcom Share while Abbott's or Dexcom's app stays in charge of the sensor and its alarms.",
      de: "xDrip+ und Juggluco sind Android-Apps und nicht im App Store. Auf dem iPhone kannst du xDrip4iOS über eine TestFlight-Einladung installieren oder selbst bauen, Zukka nutzen (im App Store, auf dem xDrip4iOS-Code aufgebaut) oder eine App wie Dulce, die LibreLinkUp oder Dexcom Share liest, während die App von Abbott oder Dexcom für Sensor und Alarme zuständig bleibt.",
      fr: "xDrip+ et Juggluco sont des apps Android et ne sont pas sur l'App Store. Sur iPhone, tu peux installer xDrip4iOS avec une invitation TestFlight ou la compiler toi-même, utiliser Zukka (sur l'App Store, basée sur le code de xDrip4iOS) ou une app comme Dulce, qui lit LibreLinkUp ou Dexcom Share pendant que l'app d'Abbott ou de Dexcom garde la main sur le capteur et ses alarmes.",
      it: "xDrip+ e Juggluco sono app Android e non sono nell'App Store. Su iPhone puoi installare xDrip4iOS con un invito TestFlight o compilandola tu, usare Zukka (nell'App Store, basata sul codice di xDrip4iOS) oppure un'app come Dulce, che legge LibreLinkUp o Dexcom Share mentre l'app di Abbott o di Dexcom resta responsabile del sensore e dei suoi allarmi.",
    },
    keywords: {
      es: ["xdrip iphone", "xdrip para iphone", "xdrip ios", "juggluco iphone", "juggluco ios", "xdrip4ios"],
      en: ["xdrip iphone", "xdrip ios", "xdrip4ios", "xdrip for iphone", "juggluco iphone", "juggluco ios", "xdrip iphone app"],
      de: ["xdrip iphone", "xdrip ios", "juggluco iphone", "juggluco für iphone", "juggluco für ios", "xdrip4ios"],
      fr: ["xdrip iphone", "xdrip ios", "juggluco iphone", "juggluco ios", "xdrip4ios"],
      it: ["xdrip iphone", "xdrip ios", "juggluco iphone", "juggluco ios", "xdrip4ios"],
    },
    image: "/guides/widgets-everywhere.jpg",
    imageAlt: {
      es: "La glucosa en la pantalla de bloqueo, los widgets y el Apple Watch con Dulce",
      en: "Glucose on the Lock Screen, widgets and Apple Watch with Dulce",
      de: "Glukosewerte auf Sperrbildschirm, Widgets und Apple Watch mit Dulce",
      fr: "La glycémie sur l'écran verrouillé, les widgets et l'Apple Watch avec Dulce",
      it: "La glicemia sulla schermata di blocco, nei widget e su Apple Watch con Dulce",
    },
    related: ["glucose-apps-compared", "apple-watch", "lock-screen"],
    faq: {
      es: [
        { q: "¿Hay xDrip para iPhone?", a: "No xDrip+, que es solo para Android. Para iPhone existe xDrip4iOS, un proyecto aparte de código abierto que no está en el App Store: se instala con una invitación de TestFlight o compilándolo. Zukka, en el App Store, está basada en su código." },
        { q: "¿Hay Juggluco para iPhone?", a: "No. Juggluco es una app de Android y Wear OS; el 4 de noviembre de 2026 no había ninguna app Juggluco en el App Store." },
        { q: "¿Cuál es la alternativa más sencilla en iPhone?", a: "Una app del App Store que lea LibreLinkUp o Dexcom Share, como Dulce: sigues usando la app de Abbott o Dexcom para el sensor y ves la glucosa en la pantalla de bloqueo, los widgets y el Apple Watch.", link: "glucose-apps-compared" },
        { q: "¿Dulce lee el sensor por Bluetooth como xDrip?", a: "No. Dulce lee las lecturas de LibreLinkUp o Dexcom Share, así que la app de Abbott o Dexcom sigue leyendo el sensor y necesitas conexión a internet." },
      ],
      en: [
        { q: "Is there xDrip for iPhone?", a: "Not xDrip+, which is Android only. For iPhone there is xDrip4iOS, a separate open-source project that isn't in the App Store: you install it from a TestFlight invitation or build it yourself. Zukka, in the App Store, is based on its code." },
        { q: "Is there Juggluco for iPhone?", a: "No. Juggluco is an Android and Wear OS app; on 4 November 2026 there was no Juggluco app in the App Store." },
        { q: "What's the easiest alternative on iPhone?", a: "An App Store app that reads LibreLinkUp or Dexcom Share, like Dulce: you keep Abbott's or Dexcom's app for the sensor and see your glucose on the Lock Screen, widgets and Apple Watch.", link: "glucose-apps-compared" },
        { q: "Does Dulce read the sensor over Bluetooth like xDrip?", a: "No. Dulce reads your readings from LibreLinkUp or Dexcom Share, so Abbott's or Dexcom's app keeps reading the sensor and you need an internet connection." },
      ],
      de: [
        { q: "Gibt es xDrip fürs iPhone?", a: "Nicht xDrip+, das gibt es nur für Android. Fürs iPhone gibt es xDrip4iOS, ein eigenes Open-Source-Projekt, das nicht im App Store ist: Du installierst es über eine TestFlight-Einladung oder baust es selbst. Zukka im App Store basiert auf seinem Code." },
        { q: "Gibt es Juggluco fürs iPhone?", a: "Nein. Juggluco ist eine App für Android und Wear OS; am 4. November 2026 gab es keine Juggluco-App im App Store." },
        { q: "Was ist die einfachste Alternative auf dem iPhone?", a: "Eine App aus dem App Store, die LibreLinkUp oder Dexcom Share liest, wie Dulce: Du behältst die App von Abbott oder Dexcom für den Sensor und siehst deinen Wert auf Sperrbildschirm, Widgets und Apple Watch.", link: "glucose-apps-compared" },
        { q: "Liest Dulce den Sensor per Bluetooth wie xDrip?", a: "Nein. Dulce liest deine Werte aus LibreLinkUp oder Dexcom Share, die App von Abbott oder Dexcom liest also weiter den Sensor aus, und du brauchst Internet." },
      ],
      fr: [
        { q: "Existe-t-il xDrip pour iPhone ?", a: "Pas xDrip+, qui est réservé à Android. Pour iPhone, il existe xDrip4iOS, un projet open source distinct qui n'est pas sur l'App Store : tu l'installes avec une invitation TestFlight ou en le compilant. Zukka, sur l'App Store, est basée sur son code." },
        { q: "Existe-t-il Juggluco pour iPhone ?", a: "Non. Juggluco est une app Android et Wear OS ; le 4 novembre 2026, il n'y avait aucune app Juggluco sur l'App Store." },
        { q: "Quelle est l'alternative la plus simple sur iPhone ?", a: "Une app de l'App Store qui lit LibreLinkUp ou Dexcom Share, comme Dulce : tu gardes l'app d'Abbott ou de Dexcom pour le capteur et tu vois ta glycémie sur l'écran verrouillé, les widgets et l'Apple Watch.", link: "glucose-apps-compared" },
        { q: "Dulce lit-il le capteur en Bluetooth comme xDrip ?", a: "Non. Dulce lit tes mesures depuis LibreLinkUp ou Dexcom Share : l'app d'Abbott ou de Dexcom continue donc de lire le capteur, et il te faut une connexion internet." },
      ],
      it: [
        { q: "Esiste xDrip per iPhone?", a: "Non xDrip+, che è solo per Android. Per iPhone esiste xDrip4iOS, un progetto open source separato che non è nell'App Store: si installa con un invito TestFlight o compilandolo. Zukka, nell'App Store, è basata sul suo codice." },
        { q: "Esiste Juggluco per iPhone?", a: "No. Juggluco è un'app per Android e Wear OS; il 4 novembre 2026 non c'era nessuna app Juggluco nell'App Store." },
        { q: "Qual è l'alternativa più semplice su iPhone?", a: "Un'app dell'App Store che legge LibreLinkUp o Dexcom Share, come Dulce: tieni l'app di Abbott o di Dexcom per il sensore e vedi la glicemia sulla schermata di blocco, nei widget e su Apple Watch.", link: "glucose-apps-compared" },
        { q: "Dulce legge il sensore via Bluetooth come xDrip?", a: "No. Dulce legge le letture da LibreLinkUp o Dexcom Share, quindi l'app di Abbott o di Dexcom continua a leggere il sensore e serve una connessione a internet." },
      ],
    },
  },
  {
    id: "libre-signal-loss",
    category: "help",
    author: "giorgi",
    datePublished: "2026-11-04",
    dateModified: "2026-11-04",
    slug: {
      es: "libre-3-perdida-de-senal-iphone",
      en: "libre-3-signal-loss-iphone",
      de: "libre-3-signalverlust-iphone",
      fr: "libre-3-perte-de-signal-iphone",
      it: "libre-3-perdita-segnale-iphone",
    },
    title: {
      es: "Pérdida de señal del Libre 3 en el iPhone: causas y solución",
      en: "Libre 3 signal loss on iPhone: causes and how to fix it",
      de: "Libre 3 Signalverlust am iPhone: Ursachen und Lösung",
      fr: "Perte de signal du Libre 3 sur iPhone : causes et solutions",
      it: "Perdita del segnale del Libre 3 su iPhone: cause e soluzioni",
    },
    description: {
      es: "La alarma de Pérdida de señal del FreeStyle Libre 3 y 3 Plus: qué significa, sus causas (distancia, Bluetooth, app cerrada) y cómo reconectar en minutos.",
      en: "The FreeStyle Libre 3 and 3 Plus Signal Loss alarm: what it means, the causes (distance, Bluetooth, a closed app) and how to reconnect in minutes.",
      de: "Der Signalverlust-Alarm beim FreeStyle Libre 3 und 3 Plus: was er bedeutet, die Ursachen (Abstand, Bluetooth, beendete App) und wie du neu verbindest.",
      fr: "L'alarme Perte de signal du FreeStyle Libre 3 et 3 Plus : ce qu'elle veut dire, ses causes (distance, Bluetooth, app fermée) et comment reconnecter.",
      it: "L'allarme Perdita del segnale del FreeStyle Libre 3 e 3 Plus: cosa significa, le cause (distanza, Bluetooth, app chiusa) e come riconnettere in pochi minuti.",
    },
    summary: {
      es: "La alarma de Pérdida de señal salta cuando el sensor lleva 20 minutos sin comunicarse con la app de Libre, y mientras dura tus alarmas de glucosa no funcionan. Acerca el móvil a menos de 10 metros del Libre 3 o 3 Plus, espera de 2 a 4 minutos, no cierres a la fuerza la app de Libre y, si no vuelve, apaga y enciende el Bluetooth y reinicia el móvil. El Libre 3 rellena solo las lecturas que faltan al reconectar.",
      en: "The Signal Loss alarm goes off when the sensor hasn't communicated with the Libre app for 20 minutes, and while it lasts your glucose alarms don't work. Bring the phone within 10 metres (33 ft) of the Libre 3 or 3 Plus, wait 2 to 4 minutes, don't force-close the Libre app, and if it doesn't return, turn Bluetooth off and on and restart the phone. The Libre 3 fills in the missing readings by itself once reconnected.",
      de: "Der Signalverlust-Alarm kommt, wenn der Sensor 20 Minuten lang nicht mit der Libre-App gesprochen hat, und solange er anhält, funktionieren deine Glukosealarme nicht. Bring das Handy auf weniger als 10 Meter an den Libre 3 oder 3 Plus, warte 2 bis 4 Minuten, beende die Libre-App nicht zwangsweise, und wenn es nicht zurückkommt, schalte Bluetooth aus und ein und starte das Handy neu. Der Libre 3 füllt die fehlenden Werte nach dem Verbinden selbst auf.",
      fr: "L'alarme Perte de signal se déclenche quand le capteur n'a pas communiqué avec l'app Libre depuis 20 minutes, et pendant ce temps tes alarmes de glycémie ne fonctionnent pas. Rapproche le téléphone à moins de 10 mètres du Libre 3 ou 3 Plus, attends 2 à 4 minutes, ne force pas la fermeture de l'app Libre et, si ça ne revient pas, coupe puis réactive le Bluetooth et redémarre le téléphone. Le Libre 3 comble seul les mesures manquantes une fois reconnecté.",
      it: "L'allarme Perdita del segnale scatta quando il sensore non comunica con l'app Libre da 20 minuti, e finché dura gli allarmi della glicemia non funzionano. Avvicina il telefono a meno di 10 metri dal Libre 3 o 3 Plus, aspetta da 2 a 4 minuti, non chiudere a forza l'app Libre e, se non torna, spegni e riaccendi il Bluetooth e riavvia il telefono. Il Libre 3 recupera da solo le letture mancanti una volta riconnesso.",
    },
    keywords: {
      es: ["libre 3 perdida de señal", "perdida de señal libre 3 iphone", "libre 3 no conecta", "libre 3 alarmas no disponibles", "freestyle libre 3 perdida de señal"],
      en: ["libre 3 signal loss", "libre 3 signal loss iphone", "libre 3 signal loss fix", "libre 3 alarms unavailable", "libre 3 not connecting to iphone", "libre 3 plus signal loss"],
      de: ["libre 3 signalverlust", "libre 3 signalverlust iphone", "libre 3 verbindet nicht", "libre 3 alarme nicht verfügbar", "freestyle libre 3 signalverlust"],
      fr: ["libre 3 perte de signal", "perte de signal libre 3 iphone", "libre 3 ne se connecte pas", "libre 3 alarmes indisponibles", "freestyle libre 3 perte de signal"],
      it: ["libre 3 perdita del segnale", "perdita segnale libre 3 iphone", "libre 3 non si connette", "libre 3 allarmi non disponibili", "freestyle libre 3 perdita segnale"],
    },
    image: "/guides/lock-screen-alerts-watch.jpg",
    imageAlt: {
      es: "Avisos de glucosa en la pantalla de bloqueo y el Apple Watch con Dulce",
      en: "Glucose alerts on the Lock Screen and Apple Watch with Dulce",
      de: "Glukosewarnungen auf Sperrbildschirm und Apple Watch mit Dulce",
      fr: "Alertes de glycémie sur l'écran verrouillé et l'Apple Watch avec Dulce",
      it: "Avvisi della glicemia sulla schermata di blocco e su Apple Watch con Dulce",
    },
    related: ["librelinkup-not-working", "alerts", "lock-screen"],
    faq: {
      es: [
        { q: "¿Qué significa Pérdida de señal en el Libre 3?", a: "Que el sensor lleva 20 minutos sin comunicarse con la app de Libre del móvil. Mientras dura, tus alarmas de glucosa no están disponibles." },
        { q: "¿Cómo arreglo la pérdida de señal del Libre 3?", a: "Acerca el móvil a menos de 10 metros del sensor y espera de 2 a 4 minutos. Si no vuelve, apaga y enciende el Bluetooth y reinicia el móvil. Si sigue, contacta con Abbott." },
        { q: "¿Se pierden las lecturas durante la pérdida de señal?", a: "Con el Libre 3 y el 3 Plus no: la app rellena el hueco sola al reconectar, sin escanear. Con el Libre 2 escaneas el sensor para recuperar las últimas 8 horas." },
        { q: "¿Por qué pierdo la señal por la noche?", a: "Casi siempre por la distancia o por tu cuerpo entre el sensor y el móvil, por ejemplo con el móvil cargando al otro lado de la habitación. Déjalo cerca y del mismo lado que el sensor." },
      ],
      en: [
        { q: "What does Signal Loss mean on the Libre 3?", a: "That the sensor hasn't communicated with the Libre app on your phone for 20 minutes. While it lasts, your glucose alarms aren't available." },
        { q: "How do I fix Libre 3 signal loss?", a: "Bring the phone within 10 metres (33 ft) of the sensor and wait 2 to 4 minutes. If it doesn't return, turn Bluetooth off and on and restart the phone. If it keeps happening, contact Abbott." },
        { q: "Are readings lost during signal loss?", a: "Not with the Libre 3 and 3 Plus: the app fills in the gap automatically once reconnected, without scanning. With the Libre 2 you scan the sensor to recover the last 8 hours." },
        { q: "Why do I get signal loss at night?", a: "Almost always distance or your body between sensor and phone, for example with the phone charging across the room. Keep it close and on the same side as the sensor." },
      ],
      de: [
        { q: "Was bedeutet Signalverlust beim Libre 3?", a: "Dass der Sensor seit 20 Minuten nicht mit der Libre-App auf deinem Handy kommuniziert hat. Solange das so ist, sind deine Glukosealarme nicht verfügbar." },
        { q: "Wie behebe ich den Signalverlust beim Libre 3?", a: "Bring das Handy auf weniger als 10 Meter an den Sensor und warte 2 bis 4 Minuten. Kommt es nicht zurück, schalte Bluetooth aus und ein und starte das Handy neu. Passiert es weiter, kontaktiere Abbott." },
        { q: "Gehen beim Signalverlust Werte verloren?", a: "Beim Libre 3 und 3 Plus nicht: Die App füllt die Lücke nach dem Verbinden automatisch auf, ohne Scannen. Beim Libre 2 scannst du den Sensor, um die letzten 8 Stunden zu holen." },
        { q: "Warum habe ich nachts Signalverlust?", a: "Fast immer wegen des Abstands oder deines Körpers zwischen Sensor und Handy, etwa wenn das Handy quer durchs Zimmer lädt. Leg es nah und auf dieselbe Seite wie den Sensor." },
      ],
      fr: [
        { q: "Que veut dire Perte de signal sur le Libre 3 ?", a: "Que le capteur n'a pas communiqué avec l'app Libre de ton téléphone depuis 20 minutes. Pendant ce temps, tes alarmes de glycémie ne sont pas disponibles." },
        { q: "Comment régler la perte de signal du Libre 3 ?", a: "Rapproche le téléphone à moins de 10 mètres du capteur et attends 2 à 4 minutes. Si ça ne revient pas, coupe puis réactive le Bluetooth et redémarre le téléphone. Si ça continue, contacte Abbott." },
        { q: "Les mesures sont-elles perdues pendant la perte de signal ?", a: "Pas avec le Libre 3 et le 3 Plus : l'app comble le trou automatiquement une fois reconnectée, sans scanner. Avec le Libre 2, tu scannes le capteur pour récupérer les 8 dernières heures." },
        { q: "Pourquoi je perds le signal la nuit ?", a: "Presque toujours à cause de la distance ou de ton corps entre le capteur et le téléphone, par exemple quand il charge à l'autre bout de la pièce. Garde-le près de toi, du même côté que le capteur." },
      ],
      it: [
        { q: "Cosa significa Perdita del segnale sul Libre 3?", a: "Che il sensore non comunica con l'app Libre del telefono da 20 minuti. Finché dura, gli allarmi della glicemia non sono disponibili." },
        { q: "Come risolvo la perdita del segnale del Libre 3?", a: "Avvicina il telefono a meno di 10 metri dal sensore e aspetta da 2 a 4 minuti. Se non torna, spegni e riaccendi il Bluetooth e riavvia il telefono. Se continua, contatta Abbott." },
        { q: "Si perdono letture durante la perdita del segnale?", a: "Con il Libre 3 e il 3 Plus no: l'app riempie il buco da sola una volta riconnessa, senza scansionare. Con il Libre 2 scansioni il sensore per recuperare le ultime 8 ore." },
        { q: "Perché perdo il segnale di notte?", a: "Quasi sempre per la distanza o per il tuo corpo tra sensore e telefono, per esempio con il telefono in carica dall'altra parte della stanza. Tienilo vicino e dallo stesso lato del sensore." },
      ],
    },
  },
  {
    id: "smart-insulin-pen",
    category: "guide",
    author: "levan",
    datePublished: "2026-11-05",
    dateModified: "2026-11-05",
    slug: {
      es: "novopen-6-app-iphone-pluma-insulina",
      en: "novopen-6-iphone-app-smart-insulin-pen",
      de: "novopen-6-app-iphone-insulinpen",
      fr: "novopen-6-application-iphone-stylo-insuline",
      it: "novopen-6-app-iphone-penna-insulina",
    },
    title: {
      es: "NovoPen 6 y Echo Plus en el iPhone: importa tus dosis de insulina solas",
      en: "NovoPen 6 and Echo Plus on iPhone: import your insulin doses automatically",
      de: "NovoPen 6 und Echo Plus am iPhone: Insulindosen automatisch übernehmen",
      fr: "NovoPen 6 et Echo Plus sur iPhone : importer tes doses d'insuline",
      it: "NovoPen 6 ed Echo Plus su iPhone: importa le dosi di insulina da sole",
    },
    description: {
      es: "Cómo leer la memoria de tu NovoPen 6 o NovoPen Echo Plus con el NFC del iPhone y tener cada dosis en el Diario de Dulce junto a tu glucosa. Gratis.",
      en: "How to read your NovoPen 6 or NovoPen Echo Plus memory with your iPhone's NFC and get every dose in the Dulce Logbook next to your glucose. Free.",
      de: "So liest du den Speicher deines NovoPen 6 oder NovoPen Echo Plus per NFC mit dem iPhone aus und hast jede Dosis im Dulce-Logbuch neben deiner Glukose. Kostenlos.",
      fr: "Comment lire la mémoire de ton NovoPen 6 ou NovoPen Echo Plus avec le NFC de l'iPhone et retrouver chaque dose dans le Journal de Dulce à côté de ta glycémie. Gratuit.",
      it: "Come leggere la memoria della tua NovoPen 6 o NovoPen Echo Plus con l'NFC dell'iPhone e avere ogni dose nel Diario di Dulce accanto alla glicemia. Gratis.",
    },
    summary: {
      es: "Sí: Dulce lee la memoria de la NovoPen 6 y la NovoPen Echo Plus con el NFC del iPhone y añade cada dosis a tu Diario con su hora exacta, junto a tus lecturas de glucosa. Estas plumas guardan las últimas 800 dosis; Dulce oculta las purgas (2 unidades o menos justo antes de una dosis), nunca duplica dosis al volver a escanear y no calcula ni sugiere dosis. Es gratis y, con una automatización de Atajos, basta con acercar la pluma al iPhone.",
      en: "Yes: Dulce reads the memory of NovoPen 6 and NovoPen Echo Plus with your iPhone's NFC and adds every dose to your Logbook with its exact time, next to your glucose readings. These pens keep the last 800 doses; Dulce hides priming shots (2 units or less just before a dose), never duplicates doses when you scan again, and doesn't calculate or suggest doses. It's free, and with a Shortcuts automation you just hold the pen to your iPhone.",
      de: "Ja: Dulce liest den Speicher von NovoPen 6 und NovoPen Echo Plus per NFC mit dem iPhone aus und trägt jede Dosis mit genauer Uhrzeit ins Logbuch ein, neben deinen Glukosewerten. Die Pens speichern die letzten 800 Dosen; Dulce blendet Entlüftungen aus (2 Einheiten oder weniger direkt vor einer Dosis), übernimmt beim erneuten Scannen keine Dosis doppelt und berechnet oder empfiehlt keine Dosen. Es ist kostenlos, und mit einer Kurzbefehle-Automation hältst du den Pen einfach ans iPhone.",
      fr: "Oui : Dulce lit la mémoire du NovoPen 6 et du NovoPen Echo Plus avec le NFC de l'iPhone et ajoute chaque dose à ton Journal avec son heure exacte, à côté de tes mesures de glycémie. Ces stylos gardent les 800 dernières doses ; Dulce masque les purges (2 unités ou moins juste avant une dose), ne duplique jamais une dose quand tu scannes à nouveau, et ne calcule ni ne suggère aucune dose. C'est gratuit et, avec une automatisation Raccourcis, il suffit d'approcher le stylo de l'iPhone.",
      it: "Sì: Dulce legge la memoria di NovoPen 6 e NovoPen Echo Plus con l'NFC dell'iPhone e aggiunge ogni dose al tuo Diario con l'ora esatta, accanto alle letture della glicemia. Queste penne conservano le ultime 800 dosi; Dulce nasconde gli spurghi (2 unità o meno subito prima di una dose), non duplica mai le dosi quando scansioni di nuovo e non calcola né suggerisce dosi. È gratis e, con un'automazione di Comandi, basta avvicinare la penna all'iPhone.",
    },
    keywords: {
      es: ["novopen 6 app", "novopen echo plus app", "pluma de insulina inteligente", "novopen 6 iphone", "registro de insulina app"],
      en: ["novopen 6 app", "novopen echo plus app", "smart insulin pen app", "novopen 6 iphone", "insulin dose log app"],
      de: ["novopen 6 app", "novopen echo plus app", "smarter insulinpen", "novopen 6 iphone", "insulin tagebuch app"],
      fr: ["novopen 6 application", "novopen echo plus application", "stylo à insuline connecté", "novopen 6 iphone", "carnet insuline application"],
      it: ["novopen 6 app", "novopen echo plus app", "penna per insulina smart", "novopen 6 iphone", "diario insulina app"],
    },
    image: "/guides/logbook.jpg",
    imageAlt: {
      es: "Diario de Dulce con registros de insulina y la hoja para añadir un registro",
      en: "Dulce Logbook with insulin entries and the add-entry sheet",
      de: "Dulce-Logbuch mit Insulineinträgen und dem Fenster zum Hinzufügen",
      fr: "Journal de Dulce avec des entrées d'insuline et la fenêtre d'ajout",
      it: "Diario di Dulce con voci di insulina e il pannello per aggiungere una voce",
    },
    related: ["logbook", "trends", "apple-health"],
    faq: {
      es: [
        { q: "¿Qué plumas puede leer Dulce?", a: "La NovoPen 6 y la NovoPen Echo Plus de Novo Nordisk, por NFC. Otras plumas conectadas y capuchones inteligentes todavía no son compatibles." },
        { q: "¿Necesito Dulce Pro para leer la pluma?", a: "No. Leer una pluma de insulina es gratis, igual que el Diario.", link: "logbook" },
        { q: "¿Se duplican las dosis si escaneo dos veces?", a: "No. Cada dosis tiene su hora en la pluma, así que al volver a escanear solo se añaden las nuevas." },
        { q: "¿Dulce me dice cuánta insulina ponerme?", a: "No. Dulce solo registra lo que guardó la pluma. No calcula ni sugiere dosis; eso lo decides con tu equipo sanitario." },
      ],
      en: [
        { q: "Which pens can Dulce read?", a: "Novo Nordisk's NovoPen 6 and NovoPen Echo Plus, over NFC. Other connected pens and pen caps aren't supported yet." },
        { q: "Do I need Dulce Pro to read my pen?", a: "No. Reading an insulin pen is free, like the Logbook.", link: "logbook" },
        { q: "Are doses duplicated if I scan twice?", a: "No. Every dose has its time in the pen, so scanning again only adds the new ones." },
        { q: "Does Dulce tell me how much insulin to take?", a: "No. Dulce only records what your pen recorded. It doesn't calculate or suggest doses; that's for you and your care team." },
      ],
      de: [
        { q: "Welche Pens kann Dulce auslesen?", a: "NovoPen 6 und NovoPen Echo Plus von Novo Nordisk, per NFC. Andere vernetzte Pens und smarte Pen-Kappen werden noch nicht unterstützt." },
        { q: "Brauche ich Dulce Pro, um meinen Pen auszulesen?", a: "Nein. Das Auslesen eines Insulinpens ist kostenlos, wie das Logbuch.", link: "logbook" },
        { q: "Werden Dosen doppelt eingetragen, wenn ich zweimal scanne?", a: "Nein. Jede Dosis hat ihre Uhrzeit im Pen, beim erneuten Scannen kommen also nur die neuen dazu." },
        { q: "Sagt mir Dulce, wie viel Insulin ich spritzen soll?", a: "Nein. Dulce trägt nur ein, was dein Pen gespeichert hat. Es berechnet oder empfiehlt keine Dosen; das entscheidest du mit deinem Behandlungsteam." },
      ],
      fr: [
        { q: "Quels stylos Dulce peut-il lire ?", a: "Le NovoPen 6 et le NovoPen Echo Plus de Novo Nordisk, par NFC. Les autres stylos et capuchons connectés ne sont pas encore pris en charge." },
        { q: "Faut-il Dulce Pro pour lire mon stylo ?", a: "Non. Lire un stylo à insuline est gratuit, comme le Journal.", link: "logbook" },
        { q: "Les doses sont-elles dupliquées si je scanne deux fois ?", a: "Non. Chaque dose a son heure dans le stylo, donc un nouveau scan n'ajoute que les nouvelles." },
        { q: "Dulce me dit-il combien d'insuline faire ?", a: "Non. Dulce enregistre seulement ce que ton stylo a mémorisé. Il ne calcule ni ne suggère de doses ; c'est à décider avec ton équipe soignante." },
      ],
      it: [
        { q: "Quali penne può leggere Dulce?", a: "NovoPen 6 e NovoPen Echo Plus di Novo Nordisk, via NFC. Le altre penne e i cappucci connessi non sono ancora supportati." },
        { q: "Serve Dulce Pro per leggere la penna?", a: "No. Leggere una penna per insulina è gratis, come il Diario.", link: "logbook" },
        { q: "Le dosi si duplicano se scansiono due volte?", a: "No. Ogni dose ha la sua ora nella penna, quindi una nuova scansione aggiunge solo quelle nuove." },
        { q: "Dulce mi dice quanta insulina fare?", a: "No. Dulce registra solo ciò che la penna ha memorizzato. Non calcola né suggerisce dosi; lo decidi con il tuo team di cura." },
      ],
    },
  },
  {
    "id": "lada-diabetes",
    "category": "health",
    "author": "giorgi",
    "datePublished": "2026-11-05",
    "dateModified": "2026-11-06",
    "slug": {
      "es": "diabetes-lada",
      "en": "lada-diabetes",
      "de": "lada-diabetes",
      "fr": "diabete-lada",
      "it": "diabete-lada",
      "fi": "lada-diabetes",
      "nl": "lada-diabetes",
      "nb": "lada-diabetes",
      "sv": "lada-diabetes",
      "ru": "lada-diabet"
    },
    "title": {
      "es": "Diabetes LADA: qué es, síntomas, diagnóstico y diferencias con MODY",
      "en": "LADA diabetes: symptoms, diagnosis, treatment and LADA vs MODY",
      "de": "LADA Diabetes: Symptome, Diagnostik, Therapie und Unterschied zu MODY",
      "fr": "Diabète LADA : symptômes, diagnostic, traitement, LADA ou MODY",
      "it": "Diabete LADA: cos'è, sintomi, diagnosi, terapia e differenze con MODY",
      "fi": "LADA-diabetes: oireet, diagnoosi, hoito ja ero MODYyn",
      "nl": "LADA-diabetes: symptomen, diagnose, behandeling en verschil met MODY",
      "nb": "LADA-diabetes: symptomer, diagnose, behandling og forskjell fra MODY",
      "sv": "LADA-diabetes: symtom, diagnos, behandling och skillnad mot MODY",
      "ru": "Диабет LADA: симптомы, диагностика, лечение и отличие от MODY"
    },
    "description": {
      "es": "Qué es la diabetes LADA o tipo 1,5: síntomas, anticuerpos y diagnóstico, tratamiento, diferencias con tipo 1, tipo 2 y MODY, y qué aporta un sensor de glucosa.",
      "en": "What LADA (type 1.5) diabetes is: symptoms, antibody tests, diagnosis, treatment, how it compares with type 1, type 2 and MODY, and how a sensor helps.",
      "de": "Was LADA Diabetes (Typ 1,5) ist: Symptome, Antikörper und Diagnostik, Therapie, der Vergleich mit Typ 1, Typ 2 und MODY und was ein Glukosesensor dabei bringt.",
      "fr": "Le diabète LADA ou type 1,5 : symptômes, anticorps, diagnostic, traitement, différences avec le type 1, le type 2 et le MODY, et l'apport d'un capteur.",
      "it": "Cos'è il diabete LADA o tipo 1,5: sintomi, anticorpi e diagnosi, terapia, differenze con tipo 1, tipo 2 e MODY e cosa aggiunge un sensore del glucosio.",
      "fi": "Mitä LADA-diabetes eli tyyppi 1,5 on: oireet, vasta-aineet ja diagnoosi, hoito, erot tyyppeihin 1 ja 2 sekä MODYyn, ja mitä glukoosisensori tuo mukanaan.",
      "nl": "Wat LADA-diabetes (type 1,5) is: symptomen, antistoffen en diagnose, behandeling, de verschillen met type 1, type 2 en MODY en wat een glucosesensor toevoegt.",
      "nb": "Hva LADA-diabetes (type 1,5) er: symptomer, antistoffer og diagnose, behandling, forskjellene fra type 1, type 2 og MODY, og hva en glukosesensor kan bidra med.",
      "sv": "Vad LADA-diabetes (typ 1,5) är: symtom, antikroppar och diagnos, behandling, skillnaderna mot typ 1, typ 2 och MODY, och vad en glukossensor kan tillföra.",
      "ru": "Что такое диабет LADA (тип 1,5): симптомы, антитела и диагностика, лечение, отличия от 1 и 2 типа и MODY и чем может помочь сенсор глюкозы."
    },
    "summary": {
      "es": "La diabetes LADA es una diabetes autoinmune que empieza despacio en adultos, por lo que al principio suele confundirse con la tipo 2. Se confirma con un análisis de autoanticuerpos, sobre todo anti-GAD, y el tratamiento lo decide tu equipo médico según cuánta insulina sigas produciendo. Muchas personas acaban necesitando insulina con el tiempo.",
      "en": "LADA is autoimmune diabetes that starts slowly in adults, so it's often first mistaken for type 2. It's confirmed with a blood test for autoantibodies, most often GAD, and your care team sets the treatment according to how much insulin you still make. Many people with LADA need insulin sooner or later.",
      "de": "LADA ist ein autoimmuner Diabetes, der bei Erwachsenen langsam beginnt und deshalb anfangs oft für Typ 2 gehalten wird. Bestätigt wird er durch einen Bluttest auf Autoantikörper, meist GAD, und die Therapie legt dein Behandlungsteam danach fest, wie viel Insulin du noch bildest. Viele Menschen mit LADA brauchen früher oder später Insulin.",
      "fr": "Le LADA est un diabète auto-immun qui s'installe lentement chez l'adulte et que l'on prend donc souvent d'abord pour un type 2. Il se confirme par une recherche d'auto-anticorps, le plus souvent anti-GAD, et ton équipe soignante fixe le traitement selon la quantité d'insuline que tu produis encore. Beaucoup de personnes finissent par avoir besoin d'insuline.",
      "it": "Il LADA è un diabete autoimmune che inizia lentamente negli adulti e all'inizio viene spesso scambiato per tipo 2. Si conferma con un esame degli autoanticorpi, di solito anti-GAD, e il tuo team decide la terapia in base a quanta insulina produci ancora. Molte persone con LADA hanno bisogno di insulina prima o poi.",
      "fi": "LADA on autoimmuunidiabetes, joka alkaa hitaasti aikuisena, joten sitä luullaan usein aluksi tyypin 2 diabetekseksi. Se varmistetaan autovasta-aineiden verikokeella, useimmiten GAD-vasta-aineilla, ja hoitotiimisi päättää hoidosta sen mukaan, kuinka paljon insuliinia vielä tuotat. Moni LADA-diabeetikko tarvitsee insuliinia ennemmin tai myöhemmin.",
      "nl": "LADA is auto-immune diabetes die langzaam begint bij volwassenen, en daarom in het begin vaak voor type 2 wordt aangezien. De diagnose wordt bevestigd met een bloedtest op auto-antistoffen, meestal GAD, en je zorgteam bepaalt de behandeling op basis van hoeveel insuline je nog maakt. Veel mensen met LADA hebben vroeg of laat insuline nodig.",
      "nb": "LADA er autoimmun diabetes som begynner langsomt hos voksne, og som derfor ofte først forveksles med type 2. Den bekreftes med en blodprøve for autoantistoffer, oftest GAD, og behandlingsteamet ditt legger opp behandlingen etter hvor mye insulin du fortsatt lager. Mange med LADA trenger insulin før eller siden.",
      "sv": "LADA är autoimmun diabetes som börjar långsamt hos vuxna och därför ofta först misstas för typ 2. Den bekräftas med ett blodprov för autoantikroppar, oftast GAD, och ditt vårdteam bestämmer behandlingen utifrån hur mycket insulin du fortfarande bildar. Många med LADA behöver insulin förr eller senare.",
      "ru": "LADA — это аутоиммунный диабет, который начинается медленно у взрослых, поэтому его часто сначала принимают за диабет 2 типа. Его подтверждают анализом крови на аутоантитела, чаще всего к GAD, а лечение определяет лечащая команда в зависимости от того, сколько инсулина вы ещё вырабатываете. Многим людям с LADA рано или поздно нужен инсулин."
    },
    "keywords": {
      "es": [
        "diabetes lada",
        "diabetes lada síntomas",
        "diabetes lada tratamiento",
        "diabetes lada y mody diferencias",
        "diabetes lada anticuerpos"
      ],
      "en": [
        "lada diabetes",
        "lada diabetes symptoms",
        "lada diabetes treatment",
        "lada diabetes diagnosis",
        "lada vs mody"
      ],
      "de": [
        "lada diabetes",
        "lada diabetes symptome",
        "lada diabetes therapie",
        "lada diabetes diagnostik",
        "lada diabetes typ 1"
      ],
      "fr": [
        "diabète lada",
        "diabète lada symptômes",
        "diabète lada traitement",
        "diabète lada diagnostic",
        "diabète lada et mody"
      ],
      "it": [
        "diabete lada",
        "diabete lada sintomi",
        "diabete lada cos'è",
        "diabete lada cura",
        "diabete mody e lada"
      ],
      "fi": [
        "lada diabetes",
        "lada diabetes oireet",
        "lada diabetes hoito",
        "lada diabetes diagnoosi",
        "lada ja mody"
      ],
      "nl": [
        "lada diabetes",
        "lada diabetes symptomen",
        "lada diabetes behandeling",
        "lada diabetes diagnose",
        "diabetes type 1,5"
      ],
      "nb": [
        "lada diabetes",
        "lada diabetes symptomer",
        "lada diabetes behandling",
        "lada diabetes diagnose",
        "diabetes type 1,5"
      ],
      "sv": [
        "lada diabetes",
        "lada diabetes symtom",
        "lada diabetes behandling",
        "lada diabetes diagnos",
        "diabetes typ 1,5"
      ],
      "ru": [
        "диабет lada",
        "lada диабет симптомы",
        "lada диабет лечение",
        "lada диабет диагностика",
        "диабет 1,5 типа"
      ]
    },
    "image": "/guides/home-screen.jpg",
    "imageAlt": {
      "es": "Pantalla de inicio de Dulce con glucosa y barra de tiempo en rango",
      "en": "Dulce home screen with glucose and the time in range bar",
      "de": "Startbildschirm von Dulce mit Glukose und Balken für die Zeit im Zielbereich",
      "fr": "Écran d'accueil de Dulce avec la glycémie et la barre de temps dans la cible",
      "it": "Schermata Home di Dulce con la glicemia e la barra del tempo nel range",
      "fi": "Dulcen aloitusnäkymä, jossa näkyvät glukoosi ja tavoitealueella olevan ajan palkki",
      "nl": "Startscherm van Dulce met glucose en de balk voor tijd binnen bereik",
      "nb": "Dulce-hjemskjermen med glukose og stolpen for tid i målområdet",
      "sv": "Dulces hemskärm med glukos och stapeln för tid inom målområdet",
      "ru": "Главный экран Dulce с глюкозой и полосой времени в диапазоне"
    },
    "related": [
      "type-2-cgm",
      "time-in-range",
      "blood-sugar-levels"
    ],
    "faq": {
      "es": [
        {
          "q": "¿La diabetes LADA es tipo 1 o tipo 2?",
          "a": "Es autoinmune, como la tipo 1, pero avanza más despacio y al principio se parece a la tipo 2. La Asociación Americana de Diabetes la incluye en la tipo 1, y a veces se la llama tipo 1,5."
        },
        {
          "q": "¿La LADA siempre necesita insulina?",
          "a": "Muchas personas la necesitan antes o después, pero el momento varía. Tu equipo médico lo decide según cuánta insulina produce aún tu cuerpo."
        },
        {
          "q": "¿En qué se diferencia la LADA de la MODY?",
          "a": "La LADA es autoinmune y aparece en adultos con anticuerpos. La MODY la causa un solo gen heredado, no tiene anticuerpos y se confirma con una prueba genética."
        },
        {
          "q": "¿Dulce funciona con diabetes LADA?",
          "a": "Sí, siempre que uses un sensor compatible. Dulce muestra lo que mide tu sensor y no pregunta qué tipo de diabetes tienes.",
          "link": "type-2-cgm"
        }
      ],
      "en": [
        {
          "q": "Is LADA type 1 or type 2?",
          "a": "It's autoimmune like type 1, but it progresses more slowly and looks like type 2 at first. The American Diabetes Association groups it under type 1, and it's sometimes called type 1.5."
        },
        {
          "q": "Does LADA always need insulin?",
          "a": "Many people need it sooner or later, but the timing varies. Your care team decides based on how much insulin your body still makes."
        },
        {
          "q": "What's the difference between LADA and MODY?",
          "a": "LADA is autoimmune and appears in adults with antibodies. MODY is caused by a single inherited gene, has no antibodies and is confirmed with a genetic test."
        },
        {
          "q": "Does Dulce work with LADA?",
          "a": "Yes, as long as you use a supported sensor. Dulce shows what your sensor measures and doesn't ask what type of diabetes you have.",
          "link": "type-2-cgm"
        }
      ],
      "de": [
        {
          "q": "Ist LADA Typ 1 oder Typ 2?",
          "a": "LADA ist autoimmun wie Typ 1, schreitet aber langsamer voran und ähnelt anfangs Typ 2. Die American Diabetes Association ordnet ihn Typ 1 zu, manchmal heißt er auch Typ 1,5."
        },
        {
          "q": "Braucht man bei LADA immer Insulin?",
          "a": "Viele brauchen es früher oder später, der Zeitpunkt ist aber unterschiedlich. Dein Behandlungsteam entscheidet danach, wie viel Insulin dein Körper noch bildet."
        },
        {
          "q": "Was ist der Unterschied zwischen LADA und MODY?",
          "a": "LADA ist autoimmun und tritt bei Erwachsenen mit Antikörpern auf. MODY entsteht durch ein einzelnes vererbtes Gen, hat keine Antikörper und wird per Gentest bestätigt."
        },
        {
          "q": "Funktioniert Dulce bei LADA?",
          "a": "Ja, solange du einen unterstützten Sensor nutzt. Dulce zeigt, was dein Sensor misst, und fragt nicht nach deinem Diabetestyp.",
          "link": "type-2-cgm"
        }
      ],
      "fr": [
        {
          "q": "Le LADA est-il un type 1 ou un type 2 ?",
          "a": "Il est auto-immun comme le type 1, mais il progresse plus lentement et ressemble d'abord à un type 2. L'American Diabetes Association le classe dans le type 1, et on l'appelle parfois type 1,5."
        },
        {
          "q": "Le LADA nécessite-t-il toujours de l'insuline ?",
          "a": "Beaucoup de personnes en ont besoin tôt ou tard, mais le moment varie. Ton équipe soignante décide selon la quantité d'insuline que ton corps produit encore."
        },
        {
          "q": "Quelle différence entre LADA et MODY ?",
          "a": "Le LADA est auto-immun et apparaît chez l'adulte avec des anticorps. Le MODY est dû à un seul gène hérité, sans anticorps, et se confirme par un test génétique."
        },
        {
          "q": "Dulce fonctionne-t-elle avec le LADA ?",
          "a": "Oui, dès lors que tu utilises un capteur pris en charge. Dulce affiche ce que mesure ton capteur et ne demande pas ton type de diabète.",
          "link": "type-2-cgm"
        }
      ],
      "it": [
        {
          "q": "Il LADA è tipo 1 o tipo 2?",
          "a": "È autoimmune come il tipo 1, ma progredisce più lentamente e all'inizio somiglia al tipo 2. L'American Diabetes Association lo comprende nel tipo 1, e a volte si chiama tipo 1,5."
        },
        {
          "q": "Il LADA richiede sempre l'insulina?",
          "a": "Molte persone ne hanno bisogno prima o poi, ma i tempi variano. Decide il tuo team in base a quanta insulina produce ancora il tuo corpo."
        },
        {
          "q": "Che differenza c'è tra LADA e MODY?",
          "a": "Il LADA è autoimmune e compare negli adulti con anticorpi. Il MODY è causato da un solo gene ereditato, non ha anticorpi e si conferma con un test genetico."
        },
        {
          "q": "Dulce funziona con il LADA?",
          "a": "Sì, purché tu usi un sensore supportato. Dulce mostra ciò che misura il tuo sensore e non chiede che tipo di diabete hai.",
          "link": "type-2-cgm"
        }
      ],
      "fi": [
        {
          "q": "Onko LADA tyyppi 1 vai tyyppi 2?",
          "a": "Se on autoimmuuni kuten tyyppi 1, mutta etenee hitaammin ja näyttää alussa tyypiltä 2. American Diabetes Association luokittelee sen tyyppiin 1, ja sitä kutsutaan joskus tyypiksi 1,5."
        },
        {
          "q": "Tarvitaanko LADAssa aina insuliinia?",
          "a": "Moni tarvitsee sitä ennemmin tai myöhemmin, mutta ajankohta vaihtelee. Hoitotiimisi päättää asiasta sen mukaan, kuinka paljon insuliinia kehosi vielä tuottaa."
        },
        {
          "q": "Mitä eroa on LADAlla ja MODYlla?",
          "a": "LADA on autoimmuuni ja ilmenee aikuisilla vasta-aineiden kanssa. MODYn aiheuttaa yksi periytyvä geeni, siinä ei ole vasta-aineita ja se varmistetaan geenitestillä."
        },
        {
          "q": "Toimiiko Dulce LADAssa?",
          "a": "Kyllä, kunhan käytät tuettua sensoria. Dulce näyttää sen, mitä sensorisi mittaa, eikä kysy diabetestyyppiäsi.",
          "link": "type-2-cgm"
        }
      ],
      "nl": [
        {
          "q": "Is LADA type 1 of type 2?",
          "a": "LADA is auto-immuun, net als type 1, maar verloopt langzamer en lijkt in het begin op type 2. De American Diabetes Association rekent het tot type 1, en soms heet het type 1,5."
        },
        {
          "q": "Is bij LADA altijd insuline nodig?",
          "a": "Veel mensen hebben het vroeg of laat nodig, maar het moment verschilt. Je zorgteam beslist op basis van hoeveel insuline je lichaam nog maakt."
        },
        {
          "q": "Wat is het verschil tussen LADA en MODY?",
          "a": "LADA is auto-immuun en komt voor bij volwassenen met antistoffen. MODY wordt veroorzaakt door één erfelijk gen, heeft geen antistoffen en wordt bevestigd met een genetische test."
        },
        {
          "q": "Werkt Dulce bij LADA?",
          "a": "Ja, zolang je een ondersteunde sensor gebruikt. Dulce toont wat je sensor meet en vraagt niet welk type diabetes je hebt.",
          "link": "type-2-cgm"
        }
      ],
      "nb": [
        {
          "q": "Er LADA type 1 eller type 2?",
          "a": "Den er autoimmun som type 1, men utvikler seg langsommere og ligner på type 2 i starten. American Diabetes Association regner den som type 1, og den kalles noen ganger type 1,5."
        },
        {
          "q": "Trenger man alltid insulin ved LADA?",
          "a": "Mange trenger det før eller siden, men tidspunktet varierer. Behandlingsteamet ditt avgjør det ut fra hvor mye insulin kroppen fortsatt lager."
        },
        {
          "q": "Hva er forskjellen på LADA og MODY?",
          "a": "LADA er autoimmun og oppstår hos voksne med antistoffer. MODY skyldes ett arvelig gen, har ikke antistoffer og bekreftes med en gentest."
        },
        {
          "q": "Virker Dulce ved LADA?",
          "a": "Ja, så lenge du bruker en støttet sensor. Dulce viser det sensoren måler, og spør ikke hvilken type diabetes du har.",
          "link": "type-2-cgm"
        }
      ],
      "sv": [
        {
          "q": "Är LADA typ 1 eller typ 2?",
          "a": "Den är autoimmun som typ 1, men utvecklas långsammare och liknar typ 2 i början. American Diabetes Association räknar den till typ 1, och den kallas ibland typ 1,5."
        },
        {
          "q": "Behövs alltid insulin vid LADA?",
          "a": "Många behöver det förr eller senare, men tidpunkten varierar. Ditt vårdteam avgör det utifrån hur mycket insulin kroppen fortfarande bildar."
        },
        {
          "q": "Vad är skillnaden mellan LADA och MODY?",
          "a": "LADA är autoimmun och uppstår hos vuxna med antikroppar. MODY orsakas av en enda ärftlig gen, har inga antikroppar och bekräftas med ett gentest."
        },
        {
          "q": "Fungerar Dulce vid LADA?",
          "a": "Ja, så länge du använder en sensor som stöds. Dulce visar vad din sensor mäter och frågar inte vilken typ av diabetes du har.",
          "link": "type-2-cgm"
        }
      ],
      "ru": [
        {
          "q": "LADA — это 1 или 2 тип диабета?",
          "a": "Он аутоиммунный, как 1 тип, но развивается медленнее и поначалу похож на 2 тип. Американская диабетическая ассоциация относит его к 1 типу, а иногда его называют типом 1,5."
        },
        {
          "q": "При LADA всегда нужен инсулин?",
          "a": "Многим он рано или поздно нужен, но сроки различаются. Решение принимает лечащая команда, исходя из того, сколько инсулина ещё вырабатывает ваш организм."
        },
        {
          "q": "Чем LADA отличается от MODY?",
          "a": "LADA аутоиммунный и возникает у взрослых, у которых есть антитела. MODY вызван одним наследуемым геном, антител при нём нет, а подтверждают его генетическим тестом."
        },
        {
          "q": "Работает ли Dulce при LADA?",
          "a": "Да, если вы пользуетесь поддерживаемым сенсором. Dulce показывает то, что измеряет сенсор, и не спрашивает, какой у вас тип диабета.",
          "link": "type-2-cgm"
        }
      ]
    }
  },
  {
    "id": "newly-diagnosed",
    "category": "guide",
    "author": "giorgi",
    "datePublished": "2026-11-05",
    "dateModified": "2026-11-05",
    "slug": {
      "es": "debut-diabetes-tipo-1",
      "en": "newly-diagnosed-type-1-diabetes",
      "de": "typ-1-diabetes-neu-diagnostiziert",
      "fr": "decouverte-diabete-type-1",
      "it": "esordio-diabete-tipo-1"
    },
    "title": {
      "es": "Debut de diabetes tipo 1 en adultos y niños: las primeras semanas",
      "en": "Newly diagnosed with type 1 diabetes: a guide to the first weeks",
      "de": "Typ-1-Diabetes neu diagnostiziert: die ersten Wochen",
      "fr": "Découverte d'un diabète de type 1 : guide des premières semaines",
      "it": "Esordio del diabete di tipo 1: guida alle prime settimane"
    },
    "description": {
      "es": "Acabas de recibir el diagnóstico, tú o tu hijo: qué aclarar con tu equipo médico, las palabras clave, tu primer sensor y cómo ver la glucosa sin agobiarte.",
      "en": "Just diagnosed with type 1, as an adult or as a parent? What to ask your care team, the key words, your first sensor and how to see your glucose without stress.",
      "de": "Gerade die Diagnose Typ 1 bekommen, als Erwachsener oder als Eltern? Was du klären solltest, die wichtigsten Begriffe und dein erster Sensor.",
      "fr": "Tu viens d'apprendre un diabète de type 1, pour toi ou ton enfant ? Quoi demander à ton équipe, les mots clés et ton premier capteur.",
      "it": "Hai appena ricevuto la diagnosi di tipo 1, per te o tuo figlio? Cosa chiedere al team, le parole chiave, il primo sensore e come vedere la glicemia senza ansia."
    },
    "summary": {
      "es": "En las primeras semanas tras el debut de la diabetes tipo 1, lo prioritario es saber tratar una hipoglucemia, qué hacer si estás enfermo y a quién llamar, todo con tu equipo médico. El debut puede ocurrir a cualquier edad, y la Asociación Americana de Diabetes respalda usar un sensor desde el inicio. Dulce empieza gratis y te enseña la glucosa sin abrir ninguna app, mientras los tuyos te acompañan.",
      "en": "In the first weeks after a type 1 diagnosis, the priorities are knowing how to treat a low, what to do when you're ill and who to call, all with your care team. Type 1 can start at any age, and the American Diabetes Association supports using a sensor from the start. Dulce starts free and shows your glucose without opening an app while the people around you follow along.",
      "de": "In den ersten Wochen nach der Diagnose Typ 1 zählt vor allem, mit deinem Behandlungsteam zu klären, wie du eine Unterzuckerung behandelst, was du bei Krankheit tust und wen du anrufst. Typ 1 kann in jedem Alter beginnen, und die American Diabetes Association befürwortet einen Sensor von Anfang an. Dulce startet kostenlos und zeigt deinen Wert, ohne dass du eine App öffnen musst.",
      "fr": "Dans les premières semaines après la découverte d'un type 1, la priorité est de savoir traiter une hypo, quoi faire quand tu es malade et qui appeler, avec ton équipe soignante. Le type 1 peut débuter à tout âge, et l'American Diabetes Association soutient l'usage d'un capteur dès le début. Dulce démarre gratuitement et affiche ta glycémie sans ouvrir d'app.",
      "it": "Nelle prime settimane dopo l'esordio del tipo 1 la priorità è sapere come trattare un'ipo, cosa fare quando stai male e chi chiamare, insieme al tuo team. Il tipo 1 può iniziare a ogni età, e l'American Diabetes Association sostiene l'uso del sensore fin dall'inizio. Dulce parte gratis e mostra la glicemia senza aprire nessuna app."
    },
    "keywords": {
      "es": [
        "debut diabetes tipo 1",
        "debut diabetes tipo 1 en adultos",
        "debut diabetes adultos",
        "sintomas debut diabetes tipo 1",
        "debut diabetes tipo 1 tratamiento"
      ],
      "en": [
        "newly diagnosed type 1 diabetes",
        "newly diagnosed type 1 diabetes adults",
        "newly diagnosed type 1 diabetes child",
        "can you get type 1 diabetes later in life",
        "type 1 diabetes first weeks"
      ],
      "de": [
        "typ 1 diabetes neu diagnostiziert",
        "diabetes typ 1 erwachsene",
        "diabetes typ 1 erwachsenenalter",
        "diabetes neu diagnostiziert",
        "diagnose typ 1 diabetes"
      ],
      "fr": [
        "découverte diabète type 1",
        "diabète type 1 découverte à 40 ans",
        "diagnostic diabète type 1 adulte",
        "diabète type 1 adulte",
        "bilan découverte diabète type 1"
      ],
      "it": [
        "esordio diabete tipo 1",
        "diabete tipo 1 esordio tardivo",
        "esordio diabete tipo 1 bambini",
        "sintomi esordio diabete tipo 1",
        "età esordio diabete tipo 1"
      ]
    },
    "image": "/guides/lock-screen-alerts-watch.jpg",
    "imageAlt": {
      "es": "Pantalla de bloqueo del iPhone con la Actividad en vivo de Dulce mostrando 120 mg/dL y avisos de glucosa",
      "en": "iPhone Lock Screen with the Dulce Live Activity showing 120 mg/dL and glucose alerts",
      "de": "iPhone-Sperrbildschirm mit der Live-Aktivität von Dulce, 120 mg/dL und Glukosewarnungen",
      "fr": "Écran verrouillé d'iPhone avec l'Activité en direct de Dulce à 120 mg/dL et des alertes de glycémie",
      "it": "Schermata di blocco dell'iPhone con l'Attività in tempo reale di Dulce a 120 mg/dL e avvisi di glicemia"
    },
    "related": [
      "child-glucose",
      "family-sharing",
      "time-in-range"
    ],
    "faq": {
      "es": [
        {
          "q": "¿Se puede tener un debut de diabetes tipo 1 de adulto?",
          "a": "Sí. La diabetes tipo 1 puede aparecer a cualquier edad. Si te diagnostican de adulto, tu equipo médico confirmará el tipo con las pruebas adecuadas."
        },
        {
          "q": "¿Cuándo empezar con un sensor?",
          "a": "Pregunta a tu equipo desde el principio. La Asociación Americana de Diabetes respalda el sensor desde el debut en niños, adolescentes y adultos con insulina que puedan usarlo con seguridad."
        },
        {
          "q": "¿Dulce me dice cuánta insulina ponerme?",
          "a": "No. Dulce muestra lecturas y guarda tu Diario, pero no calcula ni sugiere dosis. Eso se decide con tu equipo médico."
        },
        {
          "q": "¿Mi familia puede ver mi glucosa?",
          "a": "Sí. Con Dulce Pro puedes invitar a todas las personas que quieras, que ven tu glucosa desde su iPhone sin pagar nada.",
          "link": "family-sharing"
        }
      ],
      "en": [
        {
          "q": "Can you get type 1 diabetes as an adult?",
          "a": "Yes. Type 1 diabetes can start at any age. If you're diagnosed as an adult, your care team will confirm the type with the right tests."
        },
        {
          "q": "When should I start using a sensor?",
          "a": "Ask your care team from the start. The American Diabetes Association supports a sensor from the onset of diabetes for children, teens and adults on insulin who can use it safely."
        },
        {
          "q": "Does Dulce tell me how much insulin to take?",
          "a": "No. Dulce shows readings and keeps your Logbook, but it doesn't calculate or suggest doses. That's for you and your care team."
        },
        {
          "q": "Can my family see my glucose?",
          "a": "Yes. With Dulce Pro you can invite as many people as you like, who see your glucose on their own iPhone and pay nothing.",
          "link": "family-sharing"
        }
      ],
      "de": [
        {
          "q": "Kann man als Erwachsener Typ-1-Diabetes bekommen?",
          "a": "Ja. Typ-1-Diabetes kann in jedem Alter beginnen. Bei einer Diagnose im Erwachsenenalter bestätigt dein Behandlungsteam den Typ mit den passenden Tests."
        },
        {
          "q": "Wann sollte ich mit einem Sensor anfangen?",
          "a": "Frag dein Team von Anfang an. Die American Diabetes Association befürwortet einen Sensor ab Beginn bei Kindern, Jugendlichen und Erwachsenen mit Insulin, die ihn sicher nutzen können."
        },
        {
          "q": "Sagt mir Dulce, wie viel Insulin ich spritzen soll?",
          "a": "Nein. Dulce zeigt Werte und führt dein Logbuch, berechnet oder empfiehlt aber keine Dosen. Das entscheidest du mit deinem Behandlungsteam."
        },
        {
          "q": "Kann meine Familie meinen Wert sehen?",
          "a": "Ja. Mit Dulce Pro lädst du so viele Personen ein, wie du willst, die deinen Wert auf dem eigenen iPhone sehen und nichts zahlen.",
          "link": "family-sharing"
        }
      ],
      "fr": [
        {
          "q": "Peut-on découvrir un diabète de type 1 à l'âge adulte ?",
          "a": "Oui. Le diabète de type 1 peut débuter à tout âge. Si le diagnostic tombe à l'âge adulte, ton équipe soignante confirme le type avec les examens adaptés."
        },
        {
          "q": "Quand commencer un capteur ?",
          "a": "Pose la question à ton équipe dès le début. L'American Diabetes Association soutient le capteur dès le début du diabète chez les enfants, ados et adultes sous insuline qui peuvent l'utiliser en sécurité."
        },
        {
          "q": "Dulce me dit-elle combien d'insuline faire ?",
          "a": "Non. Dulce affiche les mesures et tient ton Journal, mais elle ne calcule ni ne suggère de doses. Cela se décide avec ton équipe soignante."
        },
        {
          "q": "Ma famille peut-elle voir ma glycémie ?",
          "a": "Oui. Avec Dulce Pro, tu invites autant de personnes que tu veux, qui voient ta glycémie sur leur iPhone sans rien payer.",
          "link": "family-sharing"
        }
      ],
      "it": [
        {
          "q": "Il diabete di tipo 1 può comparire da adulti?",
          "a": "Sì. Il diabete di tipo 1 può iniziare a ogni età. Se la diagnosi arriva da adulto, il tuo team conferma il tipo con gli esami adatti."
        },
        {
          "q": "Quando iniziare con un sensore?",
          "a": "Chiedilo al tuo team fin dall'inizio. L'American Diabetes Association sostiene il sensore dall'esordio in bambini, ragazzi e adulti in terapia insulinica che possono usarlo in sicurezza."
        },
        {
          "q": "Dulce mi dice quanta insulina fare?",
          "a": "No. Dulce mostra le letture e tiene il Diario, ma non calcola né suggerisce dosi. Questo si decide con il tuo team."
        },
        {
          "q": "La mia famiglia può vedere la mia glicemia?",
          "a": "Sì. Con Dulce Pro inviti tutte le persone che vuoi, che vedono la tua glicemia sul proprio iPhone senza pagare nulla.",
          "link": "family-sharing"
        }
      ]
    }
  },
  {
    "id": "older-adults-cgm",
    "category": "guide",
    "author": "giorgi",
    "datePublished": "2026-11-05",
    "dateModified": "2026-11-05",
    "slug": {
      "es": "sensor-glucosa-personas-mayores",
      "en": "cgm-for-older-adults",
      "de": "glukosesensor-senioren",
      "fr": "capteur-glycemie-personnes-agees",
      "it": "sensore-glicemia-anziani"
    },
    "title": {
      "es": "Sensor de glucosa para personas mayores: cómo elegir y seguirlo",
      "en": "Best CGM for elderly people: how to choose and follow from afar",
      "de": "Glukosesensor für Senioren: Auswahl und Mitverfolgen durch die Familie",
      "fr": "Capteur de glycémie pour personne âgée : choisir et suivre",
      "it": "Sensore glicemia per anziani: come scegliere e seguirlo in famiglia"
    },
    "description": {
      "es": "Qué mirar en un sensor para personas mayores, por qué conviene tocar menos la pantalla y cómo un hijo puede seguir la glucosa desde otra casa.",
      "en": "What to look for in a CGM for older adults, why less tapping matters, and how a son or daughter can follow a parent's glucose from another home.",
      "de": "Worauf es bei einem Sensor für Senioren ankommt, warum weniger Tippen zählt und wie Söhne oder Töchter den Wert von zu Hause aus verfolgen.",
      "fr": "Quoi regarder dans un capteur pour personne âgée, pourquoi moins toucher l'écran compte et comment suivre sa glycémie depuis chez toi.",
      "it": "Cosa guardare in un sensore per anziani, perché toccare meno lo schermo conta e come un figlio può seguire la glicemia da un'altra casa con i propri avvisi."
    },
    "summary": {
      "es": "No hay un mejor sensor para personas mayores: depende de la vista, la destreza, el móvil y quién ayude, y conviene elegirlo con su equipo médico. La Asociación Americana de Diabetes recomienda el sensor en mayores con tipo 1 y con tipo 2 con insulina. Con Dulce, el número queda en la pantalla de bloqueo y un hijo puede seguir la glucosa desde su iPhone con sus propios avisos.",
      "en": "There's no single best CGM for older adults: it depends on eyesight, dexterity, their phone and who helps, so choose with their care team. The American Diabetes Association recommends CGM for older adults with type 1 and for those with type 2 on insulin. With Dulce the number stays on the Lock Screen, and a son or daughter can follow from their own iPhone with their own alerts.",
      "de": "Den einen besten Sensor für Senioren gibt es nicht: Es kommt auf Sehkraft, Fingerfertigkeit, Handy und Hilfe an, also wählt ihn am besten mit dem Behandlungsteam. Die American Diabetes Association empfiehlt CGM für Ältere mit Typ 1 und mit Typ 2 unter Insulin. Mit Dulce bleibt der Wert auf dem Sperrbildschirm, und Sohn oder Tochter folgen mit eigenen Warnungen vom eigenen iPhone aus.",
      "fr": "Il n'y a pas de meilleur capteur pour personne âgée : tout dépend de la vue, de la dextérité, du téléphone et de l'aide, à voir avec son équipe soignante. L'American Diabetes Association recommande le capteur aux personnes âgées avec un type 1 ou un type 2 sous insuline. Avec Dulce, le chiffre reste sur l'écran verrouillé et un fils ou une fille peut suivre depuis son iPhone.",
      "it": "Non esiste un sensore migliore per gli anziani: dipende da vista, manualità, telefono e aiuto disponibile, quindi va scelto con il team diabetologico. L'American Diabetes Association lo raccomanda agli anziani con tipo 1 e con tipo 2 in terapia insulinica. Con Dulce il numero resta sulla schermata di blocco e un figlio può seguire dal proprio iPhone con i suoi avvisi."
    },
    "keywords": {
      "es": [
        "sensor glucosa personas mayores",
        "diabetes personas mayores",
        "controlar glucosa padre mayor",
        "cuidar diabetes anciano",
        "sensor glucosa ancianos"
      ],
      "en": [
        "cgm for elderly",
        "best cgm for elderly",
        "cgm for seniors",
        "best glucose monitor for elderly",
        "easiest glucose monitor for elderly"
      ],
      "de": [
        "glukosesensor senioren",
        "diabetes im alter",
        "blutzucker eltern überwachen",
        "diabetes senioren",
        "sensor senioren diabetes"
      ],
      "fr": [
        "capteur glycémie personne âgée",
        "diabète personne âgée",
        "diabète personne âgée taux",
        "surveiller glycémie parent âgé",
        "diabète senior"
      ],
      "it": [
        "sensore glicemia anziani",
        "diabete anziani",
        "diabete anziani valori",
        "controllare glicemia genitore anziano",
        "glicemia anziani"
      ]
    },
    "image": "/guides/widgets-everywhere.jpg",
    "imageAlt": {
      "es": "Widgets de Dulce: Dynamic Island, pantalla de bloqueo, pantalla de inicio y Apple Watch",
      "en": "Dulce widgets: Dynamic Island, Lock Screen, Home Screen and Apple Watch",
      "de": "Dulce-Widgets: Dynamic Island, Sperrbildschirm, Home-Bildschirm und Apple Watch",
      "fr": "Widgets de Dulce : Dynamic Island, écran verrouillé, écran d'accueil et Apple Watch",
      "it": "Widget di Dulce: Dynamic Island, schermata di blocco, Home e Apple Watch"
    },
    "related": [
      "child-glucose",
      "widgets",
      "night-lows"
    ],
    "faq": {
      "es": [
        {
          "q": "¿Cuál es el mejor sensor de glucosa para personas mayores?",
          "a": "No hay uno mejor para todos. Elige con su equipo médico según la vista, la destreza, el móvil que use y quién le ayude."
        },
        {
          "q": "¿Mi padre o mi madre tiene que usar la app?",
          "a": "No necesariamente. Si su app del sensor comparte con tu cuenta de LibreLinkUp, tú abres Dulce en tu iPhone y en su móvil no cambia nada.",
          "link": "child-glucose"
        },
        {
          "q": "¿Funciona con el lector del sensor?",
          "a": "No. Los lectores no envían lecturas a internet. Hace falta un móvil que lea el sensor y tenga conexión."
        },
        {
          "q": "¿Los objetivos son distintos en mayores?",
          "a": "Pueden serlo. El consenso propone objetivos más suaves para mayores o con más riesgo de hipoglucemia, pero el rango lo fija su equipo médico."
        }
      ],
      "en": [
        {
          "q": "What's the best CGM for elderly people?",
          "a": "There's no single best one. Choose with their care team based on eyesight, dexterity, the phone they use and who helps them."
        },
        {
          "q": "Does my parent have to use the app?",
          "a": "Not necessarily. If their sensor app shares with your LibreLinkUp account, you open Dulce on your iPhone and nothing changes on theirs.",
          "link": "child-glucose"
        },
        {
          "q": "Does it work with the sensor's reader?",
          "a": "No. Readers don't send readings to the internet. You need a phone that reads the sensor and stays online."
        },
        {
          "q": "Are targets different for older adults?",
          "a": "They can be. Consensus targets are gentler for older people or those at higher risk of lows, but their care team sets the range."
        }
      ],
      "de": [
        {
          "q": "Welcher Glukosesensor ist der beste für Senioren?",
          "a": "Den einen besten gibt es nicht. Wählt ihn mit dem Behandlungsteam nach Sehkraft, Fingerfertigkeit, Handy und vorhandener Hilfe aus."
        },
        {
          "q": "Muss meine Mutter oder mein Vater die App nutzen?",
          "a": "Nicht unbedingt. Teilt die Sensor-App mit deinem LibreLinkUp-Konto, öffnest du Dulce auf deinem iPhone, und auf ihrem Handy ändert sich nichts.",
          "link": "child-glucose"
        },
        {
          "q": "Funktioniert es mit dem Lesegerät?",
          "a": "Nein. Lesegeräte senden keine Werte ins Internet. Nötig ist ein Handy, das den Sensor liest und online bleibt."
        },
        {
          "q": "Gelten für Senioren andere Ziele?",
          "a": "Das kann sein. Die Konsensziele sind für Ältere oder bei höherem Unterzuckerungsrisiko milder, den Bereich legt aber das Behandlungsteam fest."
        }
      ],
      "fr": [
        {
          "q": "Quel est le meilleur capteur de glycémie pour une personne âgée ?",
          "a": "Il n'y en a pas un seul. Choisissez avec l'équipe soignante selon la vue, la dextérité, le téléphone utilisé et l'aide disponible."
        },
        {
          "q": "Mon parent doit-il utiliser l'app ?",
          "a": "Pas forcément. Si l'app de son capteur partage avec ton compte LibreLinkUp, tu ouvres Dulce sur ton iPhone et rien ne change sur le sien.",
          "link": "child-glucose"
        },
        {
          "q": "Est-ce que ça marche avec le lecteur du capteur ?",
          "a": "Non. Les lecteurs n'envoient rien sur internet. Il faut un téléphone qui lit le capteur et reste connecté."
        },
        {
          "q": "Les objectifs sont-ils différents pour les personnes âgées ?",
          "a": "Ils peuvent l'être. Les objectifs de consensus sont plus souples pour les personnes âgées ou à risque d'hypo, mais c'est l'équipe soignante qui fixe la cible."
        }
      ],
      "it": [
        {
          "q": "Qual è il miglior sensore glicemia per anziani?",
          "a": "Non ne esiste uno migliore per tutti. Scegliete con il team in base a vista, manualità, telefono usato e aiuto disponibile."
        },
        {
          "q": "Mio padre o mia madre deve usare l'app?",
          "a": "Non per forza. Se l'app del sensore condivide con il tuo account LibreLinkUp, apri Dulce sul tuo iPhone e sul suo telefono non cambia niente.",
          "link": "child-glucose"
        },
        {
          "q": "Funziona con il lettore del sensore?",
          "a": "No. I lettori non inviano nulla a internet. Serve un telefono che legga il sensore e resti connesso."
        },
        {
          "q": "Gli obiettivi sono diversi per gli anziani?",
          "a": "Possono esserlo. Gli obiettivi di consenso sono più morbidi per gli anziani o per chi ha più rischio di ipo, ma l'intervallo lo fissa il team."
        }
      ]
    }
  },
  {
    "id": "diabetes-at-work",
    "category": "guide",
    "author": "giorgi",
    "datePublished": "2026-11-05",
    "dateModified": "2026-11-05",
    "slug": {
      "es": "diabetes-en-el-trabajo",
      "en": "type-1-diabetes-at-work",
      "de": "diabetes-bei-der-arbeit",
      "fr": "diabete-au-travail",
      "it": "diabete-e-lavoro"
    },
    "title": {
      "es": "Diabetes en el trabajo: ver tu glucosa sin abrir apps y qué decir",
      "en": "Type 1 diabetes at work: check glucose without opening an app",
      "de": "Diabetes bei der Arbeit: Werte im Blick, ohne eine App zu öffnen",
      "fr": "Diabète au travail : voir sa glycémie sans ouvrir d'app",
      "it": "Diabete e lavoro: vedere la glicemia senza aprire un'app"
    },
    "description": {
      "es": "Cómo ver tu glucosa en reuniones, turnos o con guantes sin abrir una app, qué hacer si no se permiten móviles, y qué decirle a la empresa sobre tu diabetes.",
      "en": "See your glucose in meetings, on shifts or with gloves on without opening an app, what to do if phones are banned, and what to tell your employer.",
      "de": "So siehst du deinen Wert in Meetings, in der Schicht oder mit Handschuhen ohne App, was bei Handyverbot hilft und was du dem Arbeitgeber sagst.",
      "fr": "Comment voir ta glycémie en réunion, de garde ou avec des gants sans ouvrir d'app, que faire si le téléphone est interdit et que dire à ton employeur.",
      "it": "Come vedere la glicemia in riunione, nei turni o con i guanti senza aprire un'app, cosa fare se i telefoni sono vietati e cosa dire al datore di lavoro."
    },
    "summary": {
      "es": "Para ver tu glucosa en el trabajo sin abrir una app, deja el número en la pantalla de bloqueo o en el Apple Watch con Dulce, y mira solo cuando lo necesites. Si no se permiten móviles, el teléfono que lee el sensor debe seguir al alcance. Lo que debes contar a la empresa depende del país y del puesto, así que pregunta a tu asociación de diabetes.",
      "en": "To see your glucose at work without opening an app, keep the number on your Lock Screen or Apple Watch with Dulce and glance only when you need to. If phones aren't allowed, the phone reading your sensor must still stay within range. What you tell your employer depends on your country and job, so ask your diabetes association or an adviser.",
      "de": "Um deinen Wert bei der Arbeit ohne App zu sehen, halte ihn mit Dulce auf dem Sperrbildschirm oder der Apple Watch und schau nur bei Bedarf hin. Gilt ein Handyverbot, muss das Telefon, das den Sensor liest, trotzdem in Reichweite bleiben. Was du dem Arbeitgeber sagst, hängt von Land und Beruf ab, frag also eine Beratungsstelle oder diabetesDE.",
      "fr": "Pour voir ta glycémie au travail sans ouvrir d'app, garde le chiffre sur l'écran verrouillé ou l'Apple Watch avec Dulce et regarde seulement quand il le faut. Si les téléphones sont interdits, celui qui lit ton capteur doit quand même rester à portée. Ce que tu dis à ton employeur dépend du pays et du métier : renseigne-toi auprès d'une association.",
      "it": "Per vedere la glicemia al lavoro senza aprire un'app, tieni il numero sulla schermata di blocco o su Apple Watch con Dulce e guarda solo quando serve. Se i telefoni sono vietati, quello che legge il sensore deve comunque restare a portata. Cosa dire al datore di lavoro dipende da paese e mansione, quindi chiedi a un'associazione."
    },
    "keywords": {
      "es": [
        "diabetes en el trabajo",
        "diabetes tipo 1 y trabajo",
        "diabetes en el lugar de trabajo",
        "ley de diabetes en el trabajo",
        "diabetes mellitus en el trabajo"
      ],
      "en": [
        "type 1 diabetes at work",
        "diabetes at work",
        "managing type 1 diabetes at work",
        "type 1 diabetes rights at work",
        "type 1 diabetes work accommodations"
      ],
      "de": [
        "diabetes arbeit",
        "diabetes arbeitgeber",
        "diabetes typ 1 beruf",
        "diabetes arbeitgeber melden",
        "diabetes arbeitsrecht"
      ],
      "fr": [
        "diabète au travail",
        "diabète type 1 travail",
        "diabète type 1 et travail de nuit",
        "diabète travail de nuit",
        "diabète travailleur handicapé"
      ],
      "it": [
        "diabete e lavoro",
        "diabete tipo 1 e lavoro notturno",
        "diabete e lavoro a turni",
        "diabete lavoro notturno",
        "diabete lavoro agevolazioni"
      ]
    },
    "image": "/guides/lock-screen-alerts-watch.jpg",
    "imageAlt": {
      "es": "Pantalla de bloqueo del iPhone con la Actividad en vivo de Dulce mostrando 120 mg/dL y avisos de glucosa",
      "en": "iPhone Lock Screen with the Dulce Live Activity showing 120 mg/dL and glucose alerts",
      "de": "iPhone-Sperrbildschirm mit der Live-Aktivität von Dulce, 120 mg/dL und Glukosewarnungen",
      "fr": "Écran verrouillé d'iPhone avec l'Activité en direct de Dulce à 120 mg/dL et des alertes de glycémie",
      "it": "Schermata di blocco dell'iPhone con l'Attività in tempo reale di Dulce a 120 mg/dL e avvisi di glicemia"
    },
    "related": [
      "apple-watch",
      "lock-screen",
      "widgets"
    ],
    "faq": {
      "es": [
        {
          "q": "¿Puedo ver mi glucosa en el trabajo sin sacar el móvil?",
          "a": "Sí. Con Dulce Pro la lectura aparece en el Apple Watch y sus complicaciones, y basta con mirar la muñeca.",
          "link": "apple-watch"
        },
        {
          "q": "¿Tengo que decirle a la empresa que tengo diabetes?",
          "a": "Depende del país y del puesto. Consulta a tu asociación de diabetes o a un asesor laboral, sobre todo si tu trabajo tiene normas de seguridad."
        },
        {
          "q": "¿Qué pasa si en mi trabajo no se permiten móviles?",
          "a": "El teléfono que lee el sensor debe seguir al alcance y con internet. Acuerda con la empresa un sitio cercano para dejarlo."
        },
        {
          "q": "¿Dulce sirve para el trabajo a turnos?",
          "a": "Sí. Puedes poner las horas tranquilas según lo que duermes, y los avisos de glucosa muy baja siguen llegando."
        }
      ],
      "en": [
        {
          "q": "Can I see my glucose at work without taking out my phone?",
          "a": "Yes. With Dulce Pro the reading appears on your Apple Watch and its complications, so a look at your wrist is enough.",
          "link": "apple-watch"
        },
        {
          "q": "Do I have to tell my employer I have diabetes?",
          "a": "It depends on your country and job. Ask your diabetes association or an employment adviser, especially if your work has safety rules."
        },
        {
          "q": "What if phones aren't allowed at my work?",
          "a": "The phone reading your sensor has to stay within range and online. Agree on a nearby spot for it with your employer."
        },
        {
          "q": "Does Dulce work for shift work?",
          "a": "Yes. You can set quiet hours around when you actually sleep, and very low alerts still come through."
        }
      ],
      "de": [
        {
          "q": "Kann ich meinen Wert bei der Arbeit sehen, ohne das Handy herauszuholen?",
          "a": "Ja. Mit Dulce Pro erscheint der Wert auf der Apple Watch und in den Komplikationen, ein Blick aufs Handgelenk genügt.",
          "link": "apple-watch"
        },
        {
          "q": "Muss ich dem Arbeitgeber sagen, dass ich Diabetes habe?",
          "a": "Das hängt von Land und Beruf ab. Frag diabetesDE, den Betriebsrat oder eine Beratungsstelle, vor allem wenn dein Beruf Sicherheitsvorgaben hat."
        },
        {
          "q": "Was, wenn Handys bei der Arbeit nicht erlaubt sind?",
          "a": "Das Telefon, das den Sensor liest, muss in Reichweite und online bleiben. Sprich mit dem Arbeitgeber einen Platz in der Nähe ab."
        },
        {
          "q": "Passt Dulce zur Schichtarbeit?",
          "a": "Ja. Du legst die Ruhezeiten auf die Stunden, in denen du wirklich schläfst, und sehr niedrige Werte kommen weiter durch."
        }
      ],
      "fr": [
        {
          "q": "Puis-je voir ma glycémie au travail sans sortir mon téléphone ?",
          "a": "Oui. Avec Dulce Pro, la mesure s'affiche sur l'Apple Watch et ses complications : un regard au poignet suffit.",
          "link": "apple-watch"
        },
        {
          "q": "Dois-je dire à mon employeur que je suis diabétique ?",
          "a": "Cela dépend du pays et du métier. Renseigne-toi auprès de la Fédération Française des Diabétiques ou de la médecine du travail, surtout si ton poste a des règles de sécurité."
        },
        {
          "q": "Et si les téléphones sont interdits à mon travail ?",
          "a": "Celui qui lit ton capteur doit rester à portée et connecté. Convenez avec ton employeur d'un endroit proche."
        },
        {
          "q": "Dulce convient-elle au travail posté ?",
          "a": "Oui. Tu règles les heures calmes selon ton vrai sommeil, et les alertes de glycémie très basse passent toujours."
        }
      ],
      "it": [
        {
          "q": "Posso vedere la glicemia al lavoro senza tirare fuori il telefono?",
          "a": "Sì. Con Dulce Pro la lettura compare su Apple Watch e nelle complicazioni: basta un'occhiata al polso.",
          "link": "apple-watch"
        },
        {
          "q": "Devo dire al datore di lavoro che ho il diabete?",
          "a": "Dipende dal paese e dalla mansione. Chiedi a Diabete Italia, al medico competente o al sindacato, soprattutto se il tuo lavoro ha regole di sicurezza."
        },
        {
          "q": "E se al lavoro i telefoni sono vietati?",
          "a": "Quello che legge il sensore deve restare a portata e connesso. Concorda con il datore di lavoro un punto vicino."
        },
        {
          "q": "Dulce va bene per il lavoro a turni?",
          "a": "Sì. Imposti le ore di silenzio sulle ore in cui dormi davvero, e gli avvisi di glicemia molto bassa arrivano comunque."
        }
      ]
    }
  },
  {
    "id": "diabetes-at-school",
    "category": "guide",
    "author": "giorgi",
    "datePublished": "2026-11-05",
    "dateModified": "2026-11-05",
    "slug": {
      "es": "diabetes-tipo-1-en-el-colegio",
      "en": "type-1-diabetes-at-school",
      "de": "diabetes-typ-1-kind-schule",
      "fr": "diabete-enfant-ecole",
      "it": "diabete-bambini-scuola"
    },
    "title": {
      "es": "Niños con diabetes tipo 1 en el colegio: plan, móvil y seguimiento",
      "en": "Type 1 diabetes at school: a parent's guide to plans and phones",
      "de": "Diabetes Typ 1 in der Schule: Plan, Handy und Sensor für Eltern",
      "fr": "Diabète de l'enfant à l'école : PAI, téléphone et capteur",
      "it": "Diabete di tipo 1 a scuola: piano, telefono e sensore per i genitori"
    },
    "description": {
      "es": "Guía para padres: qué acordar con el colegio, qué hacer con el móvil que lee el sensor y cómo seguir la glucosa de tu hijo desde el trabajo.",
      "en": "A guide for parents: what to agree with the school, what to do about the phone reading the sensor, and how to follow your child's glucose from work.",
      "de": "Für Eltern: was du mit der Schule vereinbarst, was mit dem Handy am Sensor passiert und wie du den Wert deines Kindes bei der Arbeit siehst.",
      "fr": "Pour les parents : quoi convenir avec l'école, que faire du téléphone qui lit le capteur et comment suivre la glycémie de ton enfant depuis ton travail.",
      "it": "Per i genitori: cosa concordare con la scuola, cosa fare del telefono che legge il sensore e come seguire la glicemia di tuo figlio dal lavoro senza chiamare."
    },
    "summary": {
      "es": "Antes del primer día, acuerda con el colegio un plan escrito: cómo tratar una bajada, quién está formado y a quién llamar. El móvil que lee el sensor debe seguir cerca de tu hijo y con internet, así que pide que conste en el plan como necesidad médica. Con Dulce ves su glucosa en tu pantalla de bloqueo, con tus propios avisos, sin llamar al colegio.",
      "en": "Before the first day, agree a written plan with the school: how to treat a low, who is trained and who to call. The phone reading the sensor has to stay near your child and online, so ask for it to be written into the plan as a medical need. With Dulce you see their glucose on your own Lock Screen, with your own alerts, without calling the school.",
      "de": "Vereinbare vor dem ersten Tag einen schriftlichen Plan mit der Schule: wie eine Unterzuckerung behandelt wird, wer eingewiesen ist und wer angerufen wird. Das Handy, das den Sensor liest, muss nah beim Kind und online bleiben, also lass es als medizinische Notwendigkeit in den Plan aufnehmen. Mit Dulce siehst du den Wert auf deinem Sperrbildschirm, mit eigenen Warnungen.",
      "fr": "Avant le premier jour, convenez d'un plan écrit avec l'école (PAI en France) : comment traiter une hypo, qui est formé et qui appeler. Le téléphone qui lit le capteur doit rester près de ton enfant et connecté, demande donc qu'il figure au plan comme un besoin médical. Avec Dulce, tu vois sa glycémie sur ton écran verrouillé, avec tes propres alertes.",
      "it": "Prima del primo giorno concorda con la scuola un piano scritto: come trattare un'ipo, chi è formato e chi chiamare. Il telefono che legge il sensore deve restare vicino a tuo figlio e connesso, quindi chiedi che sia scritto nel piano come necessità medica. Con Dulce vedi la sua glicemia sulla tua schermata di blocco, con i tuoi avvisi."
    },
    "keywords": {
      "es": [
        "niños con diabetes tipo 1 en el colegio",
        "diabetes en el colegio",
        "diabetes tipo 1 en el colegio",
        "niños con diabetes en el colegio",
        "sensor glucosa niños"
      ],
      "en": [
        "type 1 diabetes at school",
        "type 1 diabetes child in school",
        "diabetic child at school",
        "cgm at school",
        "best cgm for kids"
      ],
      "de": [
        "diabetes typ 1 kind schule",
        "diabetes kind schule",
        "typ 1 diabetes kinder",
        "diabetes typ 1 kinder schulbegleiter",
        "sensor diabetes kinder"
      ],
      "fr": [
        "diabète enfant école",
        "pai diabète école",
        "capteur glycémie enfant",
        "diabète type 1 enfant école",
        "application diabète enfant"
      ],
      "it": [
        "diabete bambini scuola",
        "sensore glicemia bambini",
        "diabete tipo 1 scuola",
        "diabete adolescenti",
        "diabete tipo 1 bambini"
      ]
    },
    "image": "/guides/family-followers.jpg",
    "imageAlt": {
      "es": "Lista de seguidores de Dulce con un mensaje para revisar la glucosa y el botón Estoy bien",
      "en": "Dulce followers list with a “Check your glucose” message and the I'm OK button",
      "de": "Follower-Liste in Dulce mit einer Nachricht zum Zucker-Check und der Antwort „Mir geht es gut“",
      "fr": "Liste des abonnés de Dulce avec un message « Vérifie ta glycémie » et le bouton Ça va",
      "it": "Elenco dei follower di Dulce con un messaggio «Controlla la glicemia» e il pulsante Sto bene"
    },
    "related": [
      "child-glucose",
      "family-sharing",
      "alerts"
    ],
    "faq": {
      "es": [
        {
          "q": "¿Mi hijo puede llevar el móvil al colegio por la diabetes?",
          "a": "Pídelo por escrito. El móvil que lee el sensor debe seguir cerca de él y con internet, así que conviene que el plan lo recoja como necesidad médica."
        },
        {
          "q": "¿Puedo ver su glucosa desde el trabajo?",
          "a": "Sí. Con Dulce la ves en tu iPhone, con tus propios avisos, si su app de Libre comparte con tu cuenta de LibreLinkUp o si te invita desde Dulce.",
          "link": "child-glucose"
        },
        {
          "q": "¿Un niño puede usar Dulce?",
          "a": "Dulce lo usa el adulto. Con menos de 14 años, un padre o tutor sigue la glucosa del niño bajo su responsabilidad."
        },
        {
          "q": "¿El profesor necesita instalar algo?",
          "a": "No. Basta con el plan del colegio y una hoja con qué hacer. Nadie espera que siga los datos en su móvil salvo que el plan lo diga."
        }
      ],
      "en": [
        {
          "q": "Can my child keep a phone at school for diabetes?",
          "a": "Ask for it in writing. The phone reading the sensor has to stay near them and online, so it's best written into the plan as a medical need."
        },
        {
          "q": "Can I see their glucose from work?",
          "a": "Yes. With Dulce you see it on your iPhone with your own alerts, if their Libre app shares with your LibreLinkUp account or they invite you from Dulce.",
          "link": "child-glucose"
        },
        {
          "q": "Can a child use Dulce?",
          "a": "Dulce is used by the adult. Under 14, a parent or guardian follows the child's glucose under their own responsibility."
        },
        {
          "q": "Does the teacher need to install anything?",
          "a": "No. The school plan and one page of what to do are enough. Nobody expects them to follow data on their own phone unless the plan says so."
        }
      ],
      "de": [
        {
          "q": "Darf mein Kind wegen Diabetes ein Handy in der Schule haben?",
          "a": "Lass es schriftlich festhalten. Das Handy, das den Sensor liest, muss nah beim Kind und online bleiben, am besten steht es als medizinische Notwendigkeit im Plan."
        },
        {
          "q": "Kann ich den Wert von der Arbeit aus sehen?",
          "a": "Ja. Mit Dulce siehst du ihn mit eigenen Warnungen auf deinem iPhone, wenn die Libre-App mit deinem LibreLinkUp-Konto teilt oder dein Kind dich aus Dulce einlädt.",
          "link": "child-glucose"
        },
        {
          "q": "Kann ein Kind Dulce nutzen?",
          "a": "Dulce nutzt der Erwachsene. Unter 14 Jahren folgen Eltern oder Erziehungsberechtigte den Werten des Kindes in eigener Verantwortung."
        },
        {
          "q": "Muss die Lehrkraft etwas installieren?",
          "a": "Nein. Der Schulplan und eine Seite mit dem, was zu tun ist, reichen. Niemand erwartet, dass sie Daten auf dem eigenen Handy verfolgt, sofern der Plan das nicht vorsieht."
        }
      ],
      "fr": [
        {
          "q": "Mon enfant peut-il garder un téléphone à l'école pour son diabète ?",
          "a": "Demande-le par écrit. Le téléphone qui lit le capteur doit rester près de lui et connecté : le mieux est de l'inscrire au PAI comme un besoin médical."
        },
        {
          "q": "Puis-je voir sa glycémie depuis mon travail ?",
          "a": "Oui. Avec Dulce, tu la vois sur ton iPhone avec tes propres alertes, si son app Libre partage avec ton compte LibreLinkUp ou s'il t'invite depuis Dulce.",
          "link": "child-glucose"
        },
        {
          "q": "Un enfant peut-il utiliser Dulce ?",
          "a": "Dulce est utilisée par l'adulte. Avant 14 ans, un parent ou tuteur suit la glycémie de l'enfant sous sa responsabilité."
        },
        {
          "q": "L'enseignant doit-il installer quelque chose ?",
          "a": "Non. Le plan de l'école et une page sur quoi faire suffisent. On n'attend pas de lui qu'il suive les données sur son téléphone, sauf si le plan le prévoit."
        }
      ],
      "it": [
        {
          "q": "Mio figlio può tenere il telefono a scuola per il diabete?",
          "a": "Chiedilo per iscritto. Il telefono che legge il sensore deve restare vicino a lui e connesso, quindi conviene scriverlo nel piano come necessità medica."
        },
        {
          "q": "Posso vedere la sua glicemia dal lavoro?",
          "a": "Sì. Con Dulce la vedi sul tuo iPhone con i tuoi avvisi, se la sua app Libre condivide con il tuo account LibreLinkUp o se ti invita da Dulce.",
          "link": "child-glucose"
        },
        {
          "q": "Un bambino può usare Dulce?",
          "a": "Dulce la usa l'adulto. Sotto i 14 anni un genitore o tutore segue la glicemia del bambino sotto la propria responsabilità."
        },
        {
          "q": "L'insegnante deve installare qualcosa?",
          "a": "No. Bastano il piano della scuola e una pagina su cosa fare. Nessuno si aspetta che segua i dati sul proprio telefono, salvo che il piano lo preveda."
        }
      ]
    }
  },
  {
    "id": "type-2-cgm",
    "category": "health",
    "author": "giorgi",
    "datePublished": "2026-11-05",
    "dateModified": "2026-11-05",
    "slug": {
      "es": "sensor-glucosa-diabetes-tipo-2",
      "en": "cgm-for-type-2-diabetes",
      "de": "sensor-diabetes-typ-2",
      "fr": "capteur-glycemie-diabete-type-2",
      "it": "sensore-glicemia-diabete-tipo-2"
    },
    "title": {
      "es": "Sensor de glucosa en diabetes tipo 2: con insulina o sin ella",
      "en": "CGM for type 2 diabetes: with or without insulin",
      "de": "Sensor bei Diabetes Typ 2: mit oder ohne Insulin",
      "fr": "Capteur de glycémie et diabète de type 2 : avec ou sans insuline",
      "it": "Sensore glicemia e diabete di tipo 2: con o senza insulina"
    },
    "description": {
      "es": "Qué muestra un sensor de glucosa en la diabetes tipo 2, con insulina o sin ella, qué no hace, la financiación y cómo ver los números sin abrir una app.",
      "en": "What a CGM shows in type 2 diabetes, on insulin or not, what it doesn't do, how coverage varies, and how to see the numbers without opening an app.",
      "de": "Was ein Sensor bei Diabetes Typ 2 mit oder ohne Insulin zeigt, was er nicht leistet, was die Krankenkasse zahlt und wie du die Werte ohne App-Öffnen siehst.",
      "fr": "Ce que montre un capteur dans le diabète de type 2, avec ou sans insuline, ce qu'il ne fait pas, le remboursement et comment voir les chiffres.",
      "it": "Cosa mostra un sensore nel diabete di tipo 2, con o senza insulina, cosa non fa, la rimborsabilità e come vedere i numeri senza aprire un'app."
    },
    "summary": {
      "es": "Un sensor de glucosa también sirve en la diabetes tipo 2: enseña cómo responden tus comidas, qué hace un paseo y si tienes bajadas, y la Asociación Americana de Diabetes lo contempla con insulina y con otros tratamientos. La financiación cambia según el país. Si usas un sensor compatible, Dulce muestra tus lecturas gratis en widgets, con avisos, Diario y Tendencias.",
      "en": "A glucose sensor is useful in type 2 too: it shows how meals affect you, what a walk does and whether you have lows, and the American Diabetes Association includes it for people on insulin and on other treatments. Coverage varies by country. With a supported sensor, Dulce shows your readings for free in widgets, with alerts, a Logbook and Trends.",
      "de": "Ein Glukosesensor nützt auch bei Typ 2: Er zeigt, wie Mahlzeiten wirken, was ein Spaziergang bewirkt und ob Unterzuckerungen auftreten, und die American Diabetes Association sieht ihn bei Insulin und anderen Therapien vor. Die Kostenübernahme ist je nach Land und Kasse verschieden. Mit einem unterstützten Sensor zeigt Dulce deine Werte kostenlos in Widgets, mit Warnungen, Logbuch und Trends.",
      "fr": "Un capteur de glucose est utile aussi dans le type 2 : il montre l'effet des repas, d'une marche et d'éventuelles hypos, et l'American Diabetes Association le prévoit sous insuline et avec d'autres traitements. Le remboursement varie selon les pays. Avec un capteur pris en charge, Dulce affiche tes mesures gratuitement en widget, avec alertes, Journal et Tendances.",
      "it": "Un sensore del glucosio è utile anche nel tipo 2: mostra l'effetto dei pasti, di una passeggiata e di eventuali ipo, e l'American Diabetes Association lo contempla con l'insulina e con altre terapie. La rimborsabilità varia secondo il paese. Con un sensore supportato, Dulce mostra le letture gratis nei widget, con avvisi, Diario e Andamento."
    },
    "keywords": {
      "es": [
        "sensor glucosa diabetes tipo 2",
        "diabetes tipo 2 sensor glucosa",
        "app diabetes tipo 2",
        "sensor glucosa sin insulina",
        "tabla glucosa diabetes tipo 2"
      ],
      "en": [
        "cgm for type 2 diabetes",
        "cgm for type 2 diabetes no insulin",
        "cgm for type 2 diabetes on insulin",
        "type 2 diabetes app iphone",
        "best free type 2 diabetes app for iphone"
      ],
      "de": [
        "sensor typ 2 diabetes",
        "diabetes typ 2 sensor krankenkasse",
        "cgm bei diabetes typ 2",
        "blutzucker sensor diabetes typ 2",
        "diabetes typ 2 app"
      ],
      "fr": [
        "capteur glycémie diabète type 2",
        "application diabète type 2",
        "capteur glycémie diabète type 2 prix",
        "mesure glycémie diabète type 2",
        "application diabète type 2 gratuit"
      ],
      "it": [
        "sensore glicemia diabete tipo 2",
        "app diabete tipo 2",
        "sensore diabete tipo 2",
        "app per diabete tipo 2",
        "sensore glicemia senza insulina"
      ]
    },
    "image": "/guides/logbook.jpg",
    "imageAlt": {
      "es": "Diario de Dulce con registros de insulina e hidratos y el panel para añadir 5,5 u",
      "en": "Dulce Logbook with insulin and carb entries and the add-entry sheet at 5.5 u",
      "de": "Dulce-Tagebuch mit Insulin- und Kohlenhydrat-Einträgen und dem Eingabefeld mit 5,5 IE",
      "fr": "Journal de Dulce avec des entrées d'insuline et de glucides et la fiche d'ajout à 5,5 U",
      "it": "Diario di Dulce con voci di insulina e carboidrati e la scheda di inserimento a 5,5 U"
    },
    "related": [
      "lada-diabetes",
      "logbook",
      "time-in-range"
    ],
    "faq": {
      "es": [
        {
          "q": "¿Puedo usar un sensor de glucosa con diabetes tipo 2 sin insulina?",
          "a": "Sí, y mucha gente lo hace durante un tiempo para aprender cómo responde a las comidas. La financiación depende del país, así que pregunta a tu equipo médico."
        },
        {
          "q": "¿Dulce sirve para la diabetes tipo 2?",
          "a": "Sí. Muestra lo que mide cualquier sensor compatible, y los widgets, avisos, Diario y Tendencias son gratis."
        },
        {
          "q": "¿Dulce me dice qué comer?",
          "a": "No. Dulce muestra datos y los guarda en tu Diario. No da consejos de dieta ni de medicación.",
          "link": "logbook"
        }
      ],
      "en": [
        {
          "q": "Can I use a CGM with type 2 diabetes without insulin?",
          "a": "Yes, and many people do for a while to learn how they respond to meals. Coverage depends on your country, so ask your care team."
        },
        {
          "q": "Does Dulce work for type 2 diabetes?",
          "a": "Yes. It shows what any supported sensor measures, and widgets, alerts, the Logbook and Trends are free."
        },
        {
          "q": "Does Dulce tell me what to eat?",
          "a": "No. Dulce shows your data and keeps it in your Logbook. It doesn't give diet or medication advice.",
          "link": "logbook"
        }
      ],
      "de": [
        {
          "q": "Kann ich bei Typ 2 ohne Insulin einen Sensor nutzen?",
          "a": "Ja, viele tun das eine Zeit lang, um zu lernen, wie sie auf Mahlzeiten reagieren. Ob die Kasse zahlt, hängt von Land und Therapie ab, frag dein Behandlungsteam."
        },
        {
          "q": "Funktioniert Dulce bei Typ-2-Diabetes?",
          "a": "Ja. Es zeigt, was jeder unterstützte Sensor misst, und Widgets, Warnungen, Logbuch und Trends sind kostenlos."
        },
        {
          "q": "Sagt mir Dulce, was ich essen soll?",
          "a": "Nein. Dulce zeigt deine Daten und speichert sie im Logbuch. Es gibt keine Ernährungs- oder Medikamentenratschläge.",
          "link": "logbook"
        }
      ],
      "fr": [
        {
          "q": "Puis-je utiliser un capteur avec un type 2 sans insuline ?",
          "a": "Oui, et beaucoup de personnes le font un temps pour apprendre comment elles réagissent aux repas. Le remboursement dépend du pays, demande à ton équipe soignante."
        },
        {
          "q": "Dulce convient-elle au diabète de type 2 ?",
          "a": "Oui. Elle affiche ce que mesure tout capteur pris en charge, et les widgets, les alertes, le Journal et les Tendances sont gratuits."
        },
        {
          "q": "Dulce me dit-elle quoi manger ?",
          "a": "Non. Dulce affiche tes données et les garde dans ton Journal. Elle ne donne aucun conseil de régime ni de traitement.",
          "link": "logbook"
        }
      ],
      "it": [
        {
          "q": "Posso usare un sensore con il tipo 2 senza insulina?",
          "a": "Sì, e molti lo fanno per un periodo per capire come reagiscono ai pasti. La rimborsabilità dipende dal paese, quindi chiedi al tuo team."
        },
        {
          "q": "Dulce va bene per il diabete di tipo 2?",
          "a": "Sì. Mostra ciò che misura qualsiasi sensore supportato, e widget, avvisi, Diario e Andamento sono gratis."
        },
        {
          "q": "Dulce mi dice cosa mangiare?",
          "a": "No. Dulce mostra i tuoi dati e li conserva nel Diario. Non dà consigli su dieta o farmaci.",
          "link": "logbook"
        }
      ]
    }
  },
  {
    "id": "pet-glucose",
    "category": "guide",
    "author": "giorgi",
    "datePublished": "2026-11-06",
    "dateModified": "2026-11-06",
    "slug": {
      "es": "sensor-glucosa-perros-gatos",
      "en": "cgm-for-dogs-and-cats",
      "de": "glukosesensor-hund-katze",
      "fr": "capteur-glycemie-chien-chat",
      "it": "sensore-glicemia-cane-gatto"
    },
    "title": {
      "es": "Sensor de glucosa en perros y gatos: verla en tu iPhone",
      "en": "CGM for dogs and cats: see your pet's glucose on your iPhone",
      "de": "Glukosesensor bei Hund und Katze: Werte auf dem iPhone",
      "fr": "Capteur de glycémie chien et chat : la voir sur iPhone",
      "it": "Sensore glicemia per cane e gatto: vederla sull'iPhone"
    },
    "description": {
      "es": "Qué saber antes de poner un FreeStyle Libre a tu perro o gato, por qué las bajadas se leen altas y cómo ver su glucosa con el modo mascota de Dulce.",
      "en": "What to know before your dog or cat gets a FreeStyle Libre, why lows read too high, and how to see their glucose with Dulce's pet mode and your vet's ranges.",
      "de": "Was du vor dem FreeStyle Libre für Hund oder Katze wissen solltest, warum tiefe Werte zu hoch erscheinen und wie du sie mit dem Haustiermodus von Dulce siehst.",
      "fr": "Ce qu'il faut savoir avant un FreeStyle Libre pour ton chien ou ton chat, pourquoi les hypos s'affichent trop haut et le mode animal de Dulce.",
      "it": "Cosa sapere prima di mettere un FreeStyle Libre al cane o al gatto, perché le ipo sembrano più alte e come vedere la glicemia con la modalità animale di Dulce."
    },
    "summary": {
      "es": "Sí, muchos veterinarios usan un FreeStyle Libre en perros y gatos, aunque es un uso fuera de indicación: es útil en general, pero en bajadas marcadas (por debajo de unos 55-60 mg/dL) marca de más, así que una lectura baja se comprueba con glucómetro. Con el modo mascota de Dulce pones el rango, los colores y el nivel crítico de tu veterinario y ves la glucosa en la pantalla de bloqueo, y pueden seguirla todas las personas que quieras.",
      "en": "Yes, many vets use a FreeStyle Libre on dogs and cats, although it is off-label: it is clinically useful, but in marked lows (below about 55-60 mg/dL) it reads too high, so check a low reading with a meter. With Dulce's pet mode you set your vet's range, line colours and critical level, see the glucose on your Lock Screen, and as many people as you like can follow.",
      "de": "Ja, viele Tierarztpraxen nutzen einen FreeStyle Libre bei Hund und Katze, auch wenn das Off-Label ist: Er ist klinisch brauchbar, zeigt aber bei deutlicher Unterzuckerung (unter etwa 55-60 mg/dL) zu hoch an, also prüfe tiefe Werte mit einem Messgerät. Im Haustiermodus von Dulce stellst du Zielbereich, Linienfarben und kritische Grenze deiner Praxis ein, siehst den Wert auf dem Sperrbildschirm, und beliebig viele Personen folgen.",
      "fr": "Oui, beaucoup de vétérinaires posent un FreeStyle Libre aux chiens et aux chats, même si c'est hors indication : il est utile, mais en hypo marquée (sous 55-60 mg/dL environ) il affiche trop haut, donc vérifie une valeur basse au lecteur. Avec le mode animal de Dulce, tu règles la plage, les couleurs et le seuil critique de ton vétérinaire, tu vois la glycémie sur l'écran verrouillé et autant de personnes que tu veux suivent.",
      "it": "Sì, molti veterinari usano un FreeStyle Libre su cani e gatti, anche se è off-label: è utile, ma in ipoglicemia marcata (sotto circa 55-60 mg/dL) segna troppo alto, quindi una lettura bassa va controllata con il glucometro. Con la modalità animale di Dulce imposti intervallo, colori e soglia critica del veterinario, vedi la glicemia sulla schermata di blocco e possono seguirla tutte le persone che vuoi."
    },
    "keywords": {
      "es": [
        "sensor glucosa perro",
        "sensor de glucosa para perros",
        "freestyle libre perro",
        "freestyle libre gato",
        "perro diabetico sensor"
      ],
      "en": [
        "cgm for dogs",
        "libre sensor dog",
        "freestyle libre cat",
        "dog glucose monitor",
        "cgm for dogs and cats"
      ],
      "de": [
        "libre sensor hund",
        "freestyle libre sensor hund",
        "glukosesensor hund",
        "libre sensor katze",
        "diabetes hund sensor"
      ],
      "fr": [
        "capteur glycémie chien",
        "freestyle libre chien",
        "freestyle libre chat",
        "chien diabétique capteur",
        "chat diabétique capteur"
      ],
      "it": [
        "sensore glicemia cane",
        "freestyle libre cane",
        "freestyle libre gatto",
        "cane diabetico sensore",
        "gatto diabetico sensore"
      ]
    },
    "image": "/guides/covers/pet-glucose.webp",
    "imageAlt": {
      "es": "Ajuste de Dulce “¿Para quién es Dulce?” con la opción de mascota elegida",
      "en": "Dulce's “Who is Dulce for?” setting with “A pet” selected",
      "de": "Dulce-Einstellung „Für wen ist Dulce?“ mit ausgewähltem Haustier",
      "fr": "Réglage Dulce « Pour qui est Dulce ? » avec l'option animal choisie",
      "it": "Impostazione di Dulce “Per chi è Dulce?” con l'opzione animale scelta"
    },
    "related": [
      "family-sharing",
      "alerts",
      "librelinkup-not-working"
    ],
    "faq": {
      "es": [
        {
          "q": "¿Se puede usar un FreeStyle Libre en un perro o un gato?",
          "a": "Sí, muchos veterinarios lo hacen, pero es un uso fuera de indicación porque el sensor está aprobado para personas. Lo coloca y lo interpreta tu veterinario."
        },
        {
          "q": "¿Es fiable el sensor cuando mi mascota está baja?",
          "a": "Menos que en valores normales. En gatos marcó más alto que la sangre por debajo de unos 55-60 mg/dL, así que comprueba siempre una lectura baja con un glucómetro."
        },
        {
          "q": "¿Dulce tiene un modo para mascotas?",
          "a": "Sí, desde la versión 1.0.7. En Ajustes, Objetivos y unidades, ¿Para quién es Dulce?, eliges Mascota y pones el rango, los colores y el nivel crítico de tu veterinario."
        },
        {
          "q": "¿Puede seguirlo también quien cuida a mi mascota?",
          "a": "Sí. Con Dulce Pro invitas a todas las personas que quieras, que ven la glucosa en su iPhone con sus propias alertas sin pagar nada.",
          "link": "family-sharing"
        }
      ],
      "en": [
        {
          "q": "Can a FreeStyle Libre be used on a dog or cat?",
          "a": "Yes, many vets do it, but it is off-label because the sensor is approved for people. Your vet places it and interprets it."
        },
        {
          "q": "Is the sensor reliable when my pet is low?",
          "a": "Less than in the normal range. In cats it read higher than blood below about 55-60 mg/dL, so always check a low reading with a meter."
        },
        {
          "q": "Does Dulce have a pet mode?",
          "a": "Yes, from version 1.0.7. In Settings, Targets & units, Who is Dulce for?, choose A pet and enter your vet's range, line colours and critical level."
        },
        {
          "q": "Can my pet sitter follow too?",
          "a": "Yes. With Dulce Pro you invite as many people as you like, who see the glucose on their own iPhone with their own alerts and pay nothing.",
          "link": "family-sharing"
        }
      ],
      "de": [
        {
          "q": "Kann man einen FreeStyle Libre bei Hund oder Katze verwenden?",
          "a": "Ja, viele Tierarztpraxen tun das, aber es ist Off-Label, weil der Sensor für Menschen zugelassen ist. Setzen und auswerten sollte ihn deine Praxis."
        },
        {
          "q": "Ist der Sensor zuverlässig, wenn mein Tier tief ist?",
          "a": "Weniger als im Normalbereich. Bei Katzen zeigte er unter etwa 55-60 mg/dL höher an als das Blut, also prüfe tiefe Werte immer mit einem Messgerät."
        },
        {
          "q": "Hat Dulce einen Haustiermodus?",
          "a": "Ja, ab Version 1.0.7. Unter Einstellungen, Zielwerte & Einheiten, Für wen ist Dulce? wählst du Ein Haustier und trägst Zielbereich, Linienfarben und kritische Grenze deiner Praxis ein."
        },
        {
          "q": "Kann auch der Tiersitter mitverfolgen?",
          "a": "Ja. Mit Dulce Pro lädst du so viele Personen ein, wie du willst, die den Wert auf dem eigenen iPhone mit eigenen Alarmen sehen und nichts zahlen.",
          "link": "family-sharing"
        }
      ],
      "fr": [
        {
          "q": "Peut-on utiliser un FreeStyle Libre sur un chien ou un chat ?",
          "a": "Oui, beaucoup de vétérinaires le font, mais c'est hors indication car le capteur est autorisé pour les personnes. C'est ton vétérinaire qui le pose et interprète les valeurs."
        },
        {
          "q": "Le capteur est-il fiable quand mon animal est bas ?",
          "a": "Moins que dans les valeurs normales. Chez le chat, il a affiché plus haut que le sang sous 55-60 mg/dL environ, donc vérifie toujours une valeur basse au lecteur."
        },
        {
          "q": "Dulce a-t-il un mode animal ?",
          "a": "Oui, depuis la version 1.0.7. Dans Réglages, Cibles et unités, Pour qui est Dulce ?, choisis Un animal et saisis la plage, les couleurs et le seuil critique de ton vétérinaire."
        },
        {
          "q": "Mon pet-sitter peut-il suivre aussi ?",
          "a": "Oui. Avec Dulce Pro, tu invites autant de personnes que tu veux, qui voient la glycémie sur leur iPhone avec leurs propres alertes et ne paient rien.",
          "link": "family-sharing"
        }
      ],
      "it": [
        {
          "q": "Si può usare un FreeStyle Libre su un cane o un gatto?",
          "a": "Sì, molti veterinari lo fanno, ma è off-label perché il sensore è approvato per le persone. Lo applica e lo interpreta il tuo veterinario."
        },
        {
          "q": "Il sensore è affidabile quando il mio animale è basso?",
          "a": "Meno che nei valori normali. Nei gatti ha segnato più alto del sangue sotto circa 55-60 mg/dL, quindi controlla sempre una lettura bassa con un glucometro."
        },
        {
          "q": "Dulce ha una modalità per animali?",
          "a": "Sì, dalla versione 1.0.7. In Impostazioni, Obiettivi e unità, Per chi è Dulce?, scegli Un animale e inserisci intervallo, colori e soglia critica del veterinario."
        },
        {
          "q": "Anche il pet sitter può seguirlo?",
          "a": "Sì. Con Dulce Pro inviti tutte le persone che vuoi, che vedono la glicemia sul proprio iPhone con i propri avvisi senza pagare nulla.",
          "link": "family-sharing"
        }
      ]
    }
  },
  {
    id: "carplay",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    slug: {
      es: "glucosa-en-carplay-iphone",
      en: "glucose-on-carplay-iphone",
      de: "glukose-in-carplay-iphone",
      fr: "glycemie-sur-carplay-iphone",
      it: "glicemia-su-carplay-iphone",
    },
    title: {
      es: "Glucosa en CarPlay: tu Libre o Dexcom en la pantalla del coche",
      en: "Glucose on CarPlay: your Libre or Dexcom on the car screen",
      de: "Glukose in CarPlay: dein Libre oder Dexcom auf dem Autodisplay",
      fr: "Glycémie sur CarPlay : ton Libre ou Dexcom sur l'écran de la voiture",
      it: "Glicemia su CarPlay: il tuo Libre o Dexcom sullo schermo dell'auto",
    },
    description: {
      es: "Con iOS 26, la Live Activity de Dulce aparece en el panel de CarPlay: tu glucosa, la flecha y la hora de la lectura. Qué necesitas, cómo activarla y qué tarjeta elegir.",
      en: "With iOS 26, Dulce's Live Activity shows on the CarPlay Dashboard: your glucose, trend arrow and reading time. What you need, how to turn it on, which card to pick.",
      de: "Mit iOS 26 erscheint Dulces Live-Aktivität im CarPlay-Dashboard: Glukosewert, Trendpfeil und Uhrzeit. Was du brauchst, wie du sie einschaltest, welche Karte passt.",
      fr: "Avec iOS 26, l'Activité en direct de Dulce s'affiche sur le Dashboard CarPlay : ta glycémie, la flèche et l'heure. Ce qu'il faut et quelle carte choisir.",
      it: "Con iOS 26 l'Attività in tempo reale di Dulce compare nella Dashboard di CarPlay: glicemia, freccia e ora. Cosa serve e quale scheda scegliere.",
    },
    summary: {
      es: "Dulce no tiene app de CarPlay, pero con iOS 26 su Live Activity aparece en el panel de CarPlay: tu glucosa, la flecha de tendencia y la hora de la lectura en una tarjeta pensada para verse de un vistazo. Solo se ve mientras la Live Activity está activa, que es una función de Dulce Pro (14 días de prueba gratis), y la misma tarjeta sale en la pila inteligente del Apple Watch. En Ajustes, Estilo de Live Activity, pestaña CarPlay, eliges entre número grande, número y gráfica, número y tiempo en rango o noche.",
      en: "Dulce has no CarPlay app, but with iOS 26 its Live Activity shows on the CarPlay Dashboard: your glucose, trend arrow and the time of the reading on a card made to be read at a glance. It only shows while the Live Activity runs, which is a Dulce Pro feature (14-day free trial), and the same card appears in the Apple Watch Smart Stack. In Settings, Live Activity style, CarPlay tab, you pick big number, number and chart, number and time in range, or night.",
      de: "Dulce hat keine CarPlay-App, aber mit iOS 26 erscheint seine Live-Aktivität im CarPlay-Dashboard: dein Glukosewert, der Trendpfeil und die Uhrzeit des Werts auf einer Karte, die man mit einem Blick liest. Sie ist nur sichtbar, solange die Live-Aktivität läuft, eine Funktion von Dulce Pro (14 Tage kostenlos testen), und dieselbe Karte zeigt der Smart Stack der Apple Watch. Unter Einstellungen, Stil der Live-Aktivität, Tab CarPlay wählst du große Zahl, Zahl und Verlauf, Zahl und Zeit im Zielbereich oder Nacht.",
      fr: "Dulce n'a pas d'app CarPlay, mais avec iOS 26 son Activité en direct s'affiche sur le Dashboard CarPlay : ta glycémie, la flèche de tendance et l'heure de la mesure sur une carte faite pour être lue d'un coup d'œil. Elle n'apparaît que pendant que l'Activité en direct tourne, une fonction de Dulce Pro (14 jours d'essai gratuit), et la même carte s'affiche dans la Pile intelligente de l'Apple Watch. Dans Réglages, Style de l'Activité en direct, onglet CarPlay, tu choisis grand chiffre, chiffre et courbe, chiffre et temps dans la cible, ou nuit.",
      it: "Dulce non ha un'app per CarPlay, ma con iOS 26 la sua Attività in tempo reale compare nella Dashboard di CarPlay: glicemia, freccia di tendenza e ora della lettura in una scheda pensata per un'occhiata. Si vede solo mentre l'Attività in tempo reale è attiva, una funzione di Dulce Pro (14 giorni di prova gratuita), e la stessa scheda appare nella Pila smart di Apple Watch. In Impostazioni, Stile dell'Attività in tempo reale, scheda CarPlay, scegli numero grande, numero e grafico, numero e tempo nel range oppure notte.",
    },
    keywords: {
      es: ["glucosa en carplay", "libre carplay", "dexcom carplay", "freestyle libre carplay", "carplay live activity glucosa", "carplay ios 26 glucosa"],
      en: ["glucose carplay", "libre carplay", "dexcom carplay", "freestyle libre carplay", "carplay live activities glucose", "blood sugar carplay", "carplay ios 26 glucose"],
      de: ["glukose carplay", "libre carplay", "dexcom carplay", "freestyle libre carplay", "blutzucker carplay", "carplay live aktivität glukose"],
      fr: ["glycémie carplay", "libre carplay", "dexcom carplay", "freestyle libre carplay", "carplay activité en direct glycémie"],
      it: ["glicemia carplay", "libre carplay", "dexcom carplay", "freestyle libre carplay", "carplay attività in tempo reale glicemia"],
    },
    image: "/guides/live-activity-styles.jpg",
    imageAlt: {
      es: "Pantalla de estilo de Live Activity de Dulce y la tarjeta pequeña de glucosa en un Apple Watch",
      en: "Dulce's Live Activity style screen and the small glucose card on an Apple Watch",
      de: "Dulces Bildschirm für den Stil der Live-Aktivität und die kleine Glukosekarte auf einer Apple Watch",
      fr: "L'écran Style de l'Activité en direct de Dulce et la petite carte de glycémie sur une Apple Watch",
      it: "La schermata Stile dell'Attività in tempo reale di Dulce e la piccola scheda della glicemia su un Apple Watch",
    },
    related: ["lock-screen", "apple-watch", "widgets"],
    faq: {
      es: [
        { q: "¿Hay una app de Dulce para CarPlay?", a: "No. Con iOS 26, CarPlay muestra la Live Activity de Dulce en el panel sin necesidad de una app de CarPlay." },
        { q: "¿Qué necesito para ver mi glucosa en CarPlay?", a: "Un iPhone con iOS 26 conectado a un coche con CarPlay, Dulce conectado a tu sensor y la Live Activity activada, que es de Dulce Pro con 14 días de prueba gratis.", link: "lock-screen" },
        { q: "¿Funciona con Dexcom?", a: "Sí. La tarjeta de CarPlay muestra la lectura que llega a Dulce, sea de un FreeStyle Libre por LibreLinkUp, de un Dexcom por Dexcom Share, de Medtronic CareLink o de Nightscout.", link: "dexcom" },
        { q: "¿Por qué la tarjeta de CarPlay es igual a la del Apple Watch?", a: "Porque iOS usa una sola tarjeta pequeña para el panel de CarPlay y la pila inteligente del Apple Watch, así que el estilo que eliges vale para los dos.", link: "apple-watch" },
      ],
      en: [
        { q: "Is there a Dulce app for CarPlay?", a: "No. With iOS 26, CarPlay shows Dulce's Live Activity on the Dashboard without a CarPlay app." },
        { q: "What do I need to see my glucose on CarPlay?", a: "An iPhone on iOS 26 connected to a car with CarPlay, Dulce connected to your sensor, and the Live Activity turned on, which is part of Dulce Pro with a 14-day free trial.", link: "lock-screen" },
        { q: "Does it work with Dexcom?", a: "Yes. The CarPlay card shows whatever reading reaches Dulce, whether from a FreeStyle Libre via LibreLinkUp, a Dexcom via Dexcom Share, Medtronic CareLink or Nightscout.", link: "dexcom" },
        { q: "Why does the CarPlay card look like the Apple Watch one?", a: "Because iOS uses one small card for both the CarPlay Dashboard and the Apple Watch Smart Stack, so the style you choose applies to both.", link: "apple-watch" },
      ],
      de: [
        { q: "Gibt es eine Dulce-App für CarPlay?", a: "Nein. Mit iOS 26 zeigt CarPlay Dulces Live-Aktivität im Dashboard, ganz ohne CarPlay-App." },
        { q: "Was brauche ich, um meine Glukose in CarPlay zu sehen?", a: "Ein iPhone mit iOS 26, verbunden mit einem Auto mit CarPlay, Dulce mit deinem Sensor verbunden und die Live-Aktivität eingeschaltet. Sie gehört zu Dulce Pro, mit 14 Tagen kostenlosem Test.", link: "lock-screen" },
        { q: "Funktioniert das mit Dexcom?", a: "Ja. Die CarPlay-Karte zeigt den Wert, der bei Dulce ankommt, ob von einem FreeStyle Libre über LibreLinkUp, einem Dexcom über Dexcom Share, Medtronic CareLink oder Nightscout.", link: "dexcom" },
        { q: "Warum sieht die CarPlay-Karte aus wie die auf der Apple Watch?", a: "Weil iOS eine einzige kleine Karte für das CarPlay-Dashboard und den Smart Stack der Apple Watch nutzt. Der Stil, den du wählst, gilt also für beide.", link: "apple-watch" },
      ],
      fr: [
        { q: "Existe-t-il une app Dulce pour CarPlay ?", a: "Non. Avec iOS 26, CarPlay affiche l'Activité en direct de Dulce sur le Dashboard, sans app CarPlay." },
        { q: "Que faut-il pour voir ma glycémie sur CarPlay ?", a: "Un iPhone sous iOS 26 connecté à une voiture compatible CarPlay, Dulce connecté à ton capteur et l'Activité en direct activée, qui fait partie de Dulce Pro avec 14 jours d'essai gratuit.", link: "lock-screen" },
        { q: "Est-ce que ça marche avec Dexcom ?", a: "Oui. La carte CarPlay affiche la mesure qui arrive dans Dulce, qu'elle vienne d'un FreeStyle Libre via LibreLinkUp, d'un Dexcom via Dexcom Share, de Medtronic CareLink ou de Nightscout.", link: "dexcom" },
        { q: "Pourquoi la carte CarPlay ressemble à celle de l'Apple Watch ?", a: "Parce qu'iOS utilise une seule petite carte pour le Dashboard CarPlay et la Pile intelligente de l'Apple Watch : le style que tu choisis vaut pour les deux.", link: "apple-watch" },
      ],
      it: [
        { q: "Esiste un'app Dulce per CarPlay?", a: "No. Con iOS 26 CarPlay mostra l'Attività in tempo reale di Dulce nella Dashboard, senza bisogno di un'app per CarPlay." },
        { q: "Cosa serve per vedere la glicemia su CarPlay?", a: "Un iPhone con iOS 26 collegato a un'auto con CarPlay, Dulce collegato al tuo sensore e l'Attività in tempo reale attiva, che fa parte di Dulce Pro con 14 giorni di prova gratuita.", link: "lock-screen" },
        { q: "Funziona con Dexcom?", a: "Sì. La scheda di CarPlay mostra la lettura che arriva a Dulce, che venga da un FreeStyle Libre tramite LibreLinkUp, da un Dexcom tramite Dexcom Share, da Medtronic CareLink o da Nightscout.", link: "dexcom" },
        { q: "Perché la scheda di CarPlay è uguale a quella di Apple Watch?", a: "Perché iOS usa una sola scheda piccola per la Dashboard di CarPlay e la Pila smart di Apple Watch, quindi lo stile che scegli vale per entrambe.", link: "apple-watch" },
      ],
    },
  },
];

/** The value for a locale; fi/nl fall back to English (callers only show articles translated into it). */
export function pick<T>(map: Localized<T>, locale: AppLocale): T {
  return (map as Partial<Record<AppLocale, T>>)[locale] ?? map.en;
}

/** Whether the article is written in that language (always true for the core languages). */
export function isTranslated(article: Article, locale: AppLocale): boolean {
  return Boolean((article.slug as Partial<Record<AppLocale, string>>)[locale]);
}

/** The languages an article is written in. */
export function articleLocales(article: Article): AppLocale[] {
  return (Object.keys(article.slug) as AppLocale[]).filter((l) => isTranslated(article, l));
}

export function getArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

export function articleBySlug(locale: AppLocale, slug: string): Article | undefined {
  return ARTICLES.find((a) => isTranslated(a, locale) && pick(a.slug, locale) === slug);
}

/** Newest first, by publish date then registry order. */
export function articlesNewestFirst(): Article[] {
  return [...ARTICLES]
    .map((a, i) => ({ a, i }))
    .sort((x, y) => y.a.datePublished.localeCompare(x.a.datePublished) || y.i - x.i)
    .map(({ a }) => a);
}
