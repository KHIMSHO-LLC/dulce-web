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

export const CATEGORY_LABEL: Record<ArticleCategory, Localized> = {
  guide: { es: "Guía de Dulce", en: "Dulce guide", de: "Dulce-Ratgeber", fr: "Guide Dulce", it: "Guida di Dulce" },
  health: { es: "Salud", en: "Health", de: "Gesundheit", fr: "Santé", it: "Salute" },
  help: { es: "Ayuda", en: "Help", de: "Hilfe", fr: "Aide", it: "Aiuto" },
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
      fr: "freestyle-libre-apple-watch-glycemie",
      it: "freestyle-libre-apple-watch-glicemia",
    },
    title: {
      es: "Cómo ver tu glucosa del FreeStyle Libre en el Apple Watch",
      en: "How to see your FreeStyle Libre glucose on Apple Watch",
      de: "FreeStyle Libre Blutzucker auf der Apple Watch anzeigen",
      fr: "Voir sa glycémie FreeStyle Libre sur l'Apple Watch",
      it: "Vedere la glicemia del FreeStyle Libre su Apple Watch",
    },
    description: {
      es: "Pon tu glucosa del Libre 2 o Libre 3 en la esfera del Apple Watch con LibreLinkUp y Dulce: complicaciones, gráfica y por qué a veces se queda congelada.",
      en: "Put your Libre 2 or Libre 3 glucose on your Apple Watch face with LibreLinkUp and Dulce: complications, the chart, and why watch readings sometimes freeze.",
      de: "So kommt dein Libre 2 oder Libre 3 Wert mit LibreLinkUp und Dulce aufs Zifferblatt der Apple Watch: Komplikationen, Verlauf und warum Werte manchmal hängen.",
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
    image: "/guides/apple-watch-1.jpg",
    imageAlt: {
      es: "Complicación de Dulce en la esfera del Apple Watch con glucosa 91 y gráfica",
      en: "Dulce complication on an Apple Watch face showing glucose 91 with a chart",
      de: "Dulce-Komplikation auf dem Zifferblatt der Apple Watch mit Glukose 91 und Verlauf",
      fr: "Complication Dulce sur un cadran d'Apple Watch affichant une glycémie de 91 avec une courbe",
      it: "Complicazione di Dulce su un quadrante di Apple Watch con glicemia 91 e grafico",
    },
    related: ["lock-screen", "alerts", "librelinkup-not-working", "glucose-apps-compared"],
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
      fr: [
        { q: "Comment voir ma glycémie FreeStyle Libre sur l'Apple Watch ?", a: "Avec une app qui lit ton compte LibreLinkUp, comme Dulce. Connecte-toi à Dulce avec ton compte LibreLinkUp, active Apple Watch dans les Réglages (fonction Dulce Pro avec 14 jours d'essai gratuit) et ajoute la complication Dulce à ton cadran." },
        { q: "Faut-il une Apple Watch cellulaire ?", a: "Non. Ça fonctionne avec n'importe quelle Apple Watch jumelée à ton iPhone." },
        { q: "Puis-je voir la glycémie de mon enfant sur ma montre ?", a: "La montre affiche la glycémie du compte connecté sur ton iPhone. Pour suivre la glycémie de ton enfant depuis ton téléphone, avec alertes et écran verrouillé, deviens son abonné dans Dulce.", link: "child-glucose" },
        { q: "Puis-je aussi voir ma glycémie sur l'écran verrouillé de l'iPhone ?", a: "Oui, avec l'Activité en direct de Dulce, qui affiche ta glycémie sur l'écran verrouillé et dans la Dynamic Island.", link: "lock-screen" },
      ],
      it: [
        { q: "Come vedo la glicemia del FreeStyle Libre su Apple Watch?", a: "Con un'app che legge il tuo account LibreLinkUp, come Dulce. Accedi a Dulce con il tuo account LibreLinkUp, attiva Apple Watch in Impostazioni (funzione Dulce Pro con 14 giorni di prova gratuita) e aggiungi la complicazione di Dulce al quadrante." },
        { q: "Serve un Apple Watch con rete cellulare?", a: "No. Funziona con qualsiasi Apple Watch abbinato al tuo iPhone." },
        { q: "Posso vedere la glicemia di mio figlio sull'orologio?", a: "L'orologio mostra la glicemia dell'account collegato sul tuo iPhone. Per seguire la glicemia di tuo figlio dal telefono, con avvisi e schermata di blocco, diventa suo follower in Dulce.", link: "child-glucose" },
        { q: "Posso vedere la glicemia anche sulla schermata di blocco dell'iPhone?", a: "Sì, con l'Attività in tempo reale di Dulce, che mostra la glicemia sulla schermata di blocco e nella Dynamic Island.", link: "lock-screen" },
      ],
    },
  },
  {
    id: "time-in-range",
    category: "health",
    author: "giorgi",
    datePublished: "2026-07-12",
    dateModified: "2026-10-28",
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
    dateModified: "2026-10-26",
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
      es: "Comparte tus lecturas del FreeStyle Libre en tiempo real con hasta 3 familiares en Dulce: invitación por enlace, avisos para ellos y el botón «Estoy bien».",
      en: "Share your FreeStyle Libre readings in real time with up to 3 family members in Dulce: invite by link, alerts for them, and the one-tap “I'm OK” reply.",
      de: "Teile deine FreeStyle Libre Werte live mit bis zu 3 Familienmitgliedern in Dulce: Einladung per Link, eigene Warnungen und die Antwort „Mir geht es gut“.",
      fr: "Partage tes mesures FreeStyle Libre en temps réel avec jusqu'à 3 proches dans Dulce : invitation par lien, alertes pour eux et réponse « Ça va » en un geste.",
      it: "Condividi le letture del FreeStyle Libre in tempo reale con fino a 3 familiari in Dulce: invito con link, avvisi per loro e risposta «Sto bene» con un tocco.",
    },
    summary: {
      es: "En Dulce, ve a Ajustes, Seguidores, Invitar a alguien y manda el enlace o el código: hasta 3 familiares instalan Dulce gratis y ven tu glucosa en tiempo real, con sus propios avisos, sin sensor ni cuenta de Abbott. Compartir es una función de Dulce Pro para quien lleva el sensor, con 14 días de prueba gratis, y los seguidores no pagan nada. Puedes quitar a un seguidor cuando quieras y deja de ver tu glucosa al momento.",
      en: "In Dulce, go to Settings, Followers, Invite someone and send the link or code: up to 3 family members install Dulce for free and see your glucose in real time, with their own alerts, without a sensor or an Abbott account. Sharing is a Dulce Pro feature for the person wearing the sensor, with a 14-day free trial, and followers pay nothing. You can remove a follower at any time and they stop seeing your glucose immediately.",
      de: "Geh in Dulce zu Einstellungen, Follower, Jemanden einladen und schick den Link oder den Code: Bis zu 3 Familienmitglieder installieren Dulce kostenlos und sehen deinen Zucker in Echtzeit, mit eigenen Warnungen, ohne Sensor und ohne Abbott-Konto. Teilen ist eine Dulce Pro Funktion für die Person mit dem Sensor, mit 14 Tagen Gratis-Test, Follower zahlen nichts. Du kannst Follower jederzeit entfernen, dann sehen sie deinen Wert sofort nicht mehr.",
      fr: "Dans Dulce, va dans Réglages, Abonnés, Inviter quelqu'un et envoie le lien ou le code : jusqu'à 3 proches installent Dulce gratuitement et voient ta glycémie en temps réel, avec leurs propres alertes, sans capteur ni compte Abbott. Le partage est une fonction Dulce Pro pour la personne qui porte le capteur, avec 14 jours d'essai gratuit, et les abonnés ne paient rien. Tu peux retirer un abonné quand tu veux, il cesse aussitôt de voir ta glycémie.",
      it: "In Dulce vai su Impostazioni, Follower, Invita qualcuno e manda il link o il codice: fino a 3 familiari installano Dulce gratis e vedono la tua glicemia in tempo reale, con i propri avvisi, senza sensore né account Abbott. La condivisione è una funzione Dulce Pro per chi porta il sensore, con 14 giorni di prova gratuita, e i follower non pagano nulla. Puoi rimuovere un follower quando vuoi e smette subito di vedere la tua glicemia.",
    },
    keywords: {
      es: ["compartir glucosa familia", "compartir libre con familia", "librelinkup familia", "compartir glucosa libre"],
      en: ["share libre with family", "share glucose with family", "follow libre", "librelinkup follower"],
      de: ["libre teilen", "blutzucker familie teilen", "libre familie", "librelinkup follower"],
      fr: ["partager libre famille", "partager glycémie famille", "suivre glycémie proche", "abonné librelinkup"],
      it: ["condividere libre famiglia", "condividere glicemia famiglia", "seguire glicemia familiare", "follower librelinkup"],
    },
    image: "/guides/family-followers.jpg",
    imageAlt: {
      es: "Lista de seguidores de Dulce con un mensaje para revisar la glucosa y el botón Estoy bien",
      en: "Dulce followers list with a “Check your glucose” message and the I'm OK button",
      de: "Follower-Liste in Dulce mit einer Nachricht zum Zucker-Check und der Antwort „Mir geht es gut“",
      fr: "Liste des abonnés de Dulce avec un message « Vérifie ta glycémie » et le bouton Ça va",
      it: "Elenco dei follower di Dulce con un messaggio «Controlla la glicemia» e il pulsante Sto bene",
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
      fr: [
        { q: "Comment ma famille peut-elle voir ma glycémie FreeStyle Libre ?", a: "En les invitant depuis Dulce. Va dans Réglages, Abonnés, Inviter quelqu'un, et envoie-leur le lien ou le code. Ils installent Dulce gratuitement et voient ta glycémie en temps réel, sans capteur ni compte Abbott." },
        { q: "Combien de personnes peuvent me suivre, et combien ça coûte ?", a: "Jusqu'à 3 personnes. Le partage est une fonction de Dulce Pro pour la personne qui porte le capteur, avec 14 jours d'essai gratuit ; les abonnés ne paient rien." },
        { q: "Mes abonnés reçoivent-ils des alertes d'hypo et d'hyper ?", a: "Oui. Chaque abonné a ses propres alertes de glycémie basse et haute, avec ses propres heures calmes, et les valeurs très basses lui arrivent toujours. Il peut aussi t'avoir sur son écran verrouillé avec une Activité en direct.", link: "alerts" },
        { q: "Mes abonnés peuvent-ils m'envoyer des messages ?", a: "Oui, des messages courts. Un abonné peut t'envoyer « Ça va ? », « Vérifie ta glycémie » ou son propre texte ; il arrive en notification et tu réponds « Ça va » d'un geste. Tu peux désactiver les messages de la famille dans les Réglages.", link: "child-glucose" },
      ],
      it: [
        { q: "Come può la mia famiglia vedere la glicemia del mio FreeStyle Libre?", a: "Invitandola da Dulce. Vai su Impostazioni, Follower, Invita qualcuno, e manda il link o il codice. Installano Dulce gratis e vedono la tua glicemia in tempo reale, senza sensore né account Abbott." },
        { q: "Quante persone possono seguirmi e quanto costa?", a: "Fino a 3 persone. La condivisione è una funzione di Dulce Pro per chi porta il sensore, con 14 giorni di prova gratuita; i follower non pagano nulla." },
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
    dateModified: "2026-10-24",
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
      es: ["libre pantalla de bloqueo", "glucosa pantalla de bloqueo", "libre 3 isla dinamica", "dynamic island glucosa", "freestyle libre iphone"],
      en: ["libre lock screen", "libre 3 lock screen", "libre live activity", "libre dynamic island", "glucose lock screen iphone"],
      de: ["libre sperrbildschirm", "blutzucker sperrbildschirm", "libre live aktivität", "dynamic island blutzucker", "libre 3 iphone"],
      fr: ["libre écran verrouillé", "glycémie écran verrouillé iphone", "libre activité en direct", "libre dynamic island", "libre 3 écran verrouillé"],
      it: ["libre schermata di blocco", "glicemia schermata di blocco iphone", "libre attività in tempo reale", "libre dynamic island", "libre 3 schermata di blocco"],
    },
    image: "/guides/lock-screen-alerts-watch.jpg",
    imageAlt: {
      es: "Pantalla de bloqueo del iPhone con la Actividad en vivo de Dulce mostrando 120 mg/dL y avisos de glucosa",
      en: "iPhone Lock Screen with the Dulce Live Activity showing 120 mg/dL and glucose alerts",
      de: "iPhone-Sperrbildschirm mit der Live-Aktivität von Dulce, 120 mg/dL und Glukosewarnungen",
      fr: "Écran verrouillé d'iPhone avec l'Activité en direct de Dulce à 120 mg/dL et des alertes de glycémie",
      it: "Schermata di blocco dell'iPhone con l'Attività in tempo reale di Dulce a 120 mg/dL e avvisi di glicemia",
    },
    related: ["widgets", "apple-watch", "alerts", "glucose-apps-compared"],
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
      fr: [
        { q: "Comment afficher ma glycémie Libre sur l'écran verrouillé de l'iPhone ?", a: "Avec une Activité en direct, car l'app Libre ne l'affiche pas à cet endroit. Dans Dulce, connecte ton compte LibreLinkUp, active Activité en direct et Dynamic Island dans les Réglages et autorise les Activités en direct de Dulce dans les Réglages de l'iPhone." },
        { q: "À quelle fréquence l'Activité en direct se met-elle à jour ?", a: "Chaque minute avec Dulce Pro, même iPhone verrouillé et app fermée. Le chiffre ne peut pas être plus récent que la dernière mesure envoyée par l'app Libre du téléphone du capteur, alors regarde toujours l'heure de la mesure." },
        { q: "Pourquoi ma glycémie disparaît-elle de l'écran verrouillé ?", a: "Parce qu'iOS met fin aux Activités en direct après un nombre maximal d'heures. Ouvre Dulce et elle revient. Si Dulce ne peut pas mettre à jour ton écran verrouillé pendant un moment, il t'envoie une notification discrète pour ouvrir l'app." },
        { q: "Est-ce gratuit ?", a: "L'Activité en direct est une fonction de Dulce Pro avec 14 jours d'essai gratuit. Les widgets de glycémie pour l'écran verrouillé et l'écran d'accueil sont gratuits.", link: "widgets" },
      ],
      it: [
        { q: "Come metto la glicemia del Libre sulla schermata di blocco dell'iPhone?", a: "Con un'Attività in tempo reale, perché l'app Libre non la mostra lì. In Dulce collega il tuo account LibreLinkUp, attiva Attività in tempo reale e Dynamic Island in Impostazioni e consenti le Attività in tempo reale di Dulce nelle Impostazioni dell'iPhone." },
        { q: "Ogni quanto si aggiorna l'Attività in tempo reale?", a: "Ogni minuto con Dulce Pro, anche con l'iPhone bloccato e l'app chiusa. Il valore può essere solo recente quanto l'ultima lettura caricata dall'app Libre sul telefono del sensore, quindi guarda sempre l'ora della lettura." },
        { q: "Perché la glicemia sparisce dalla schermata di blocco?", a: "Perché iOS chiude le Attività in tempo reale dopo un numero massimo di ore. Apri Dulce e torna. Se Dulce non riesce ad aggiornare la schermata di blocco per un po', ti manda una notifica discreta per aprire l'app." },
        { q: "È gratis?", a: "L'Attività in tempo reale è una funzione di Dulce Pro con 14 giorni di prova gratuita. I widget della glicemia per la schermata di blocco e la Home sono gratis.", link: "widgets" },
      ],
    },
  },
  {
    id: "widgets",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-29",
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
      es: ["widget libre iphone", "freestyle libre 3 widget iphone", "libre widget", "widget glucosa iphone", "freestyle libre 2 widget"],
      en: ["libre widget iphone", "freestyle libre 3 widget", "libre widget", "glucose widget iphone", "cgm widget iphone"],
      de: ["libre widget", "libre 3 widget iphone", "blutzucker widget", "glukose widget", "freestyle libre widget"],
      fr: ["widget libre iphone", "widget freestyle libre 3", "widget glycémie iphone", "widget libre", "widget cgm iphone"],
      it: ["widget libre iphone", "widget freestyle libre 3", "widget glicemia iphone", "widget libre", "widget sensore glicemia iphone"],
    },
    image: "/guides/widgets-everywhere.jpg",
    imageAlt: {
      es: "Widgets de Dulce: Dynamic Island, pantalla de bloqueo, pantalla de inicio y Apple Watch",
      en: "Dulce widgets: Dynamic Island, Lock Screen, Home Screen and Apple Watch",
      de: "Dulce-Widgets: Dynamic Island, Sperrbildschirm, Home-Bildschirm und Apple Watch",
      fr: "Widgets de Dulce : Dynamic Island, écran verrouillé, écran d'accueil et Apple Watch",
      it: "Widget di Dulce: Dynamic Island, schermata di blocco, Home e Apple Watch",
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
      fr: [
        { q: "Existe-t-il un widget FreeStyle Libre pour iPhone ?", a: "Pas chez Abbott : LibreLink, Libre 3 et LibreLinkUp n'ont pas de widget de glycémie. Dulce lit tes données LibreLinkUp et ajoute gratuitement des widgets pour l'écran d'accueil, l'écran verrouillé et StandBy." },
        { q: "À quelle fréquence le widget de glycémie se met-il à jour ?", a: "Quand iOS le décide, pas chaque minute. iOS limite les actualisations des widgets pour économiser la batterie : les widgets de Dulce affichent donc l'âge de la mesure et ont un bouton d'actualisation. Pour un chiffre mis à jour chaque minute, utilise l'Activité en direct.", link: "lock-screen" },
        { q: "Puis-je voir ma glycémie sur la table de nuit ?", a: "Oui, avec StandBy. Charge ton iPhone verrouillé, posé sur le côté à l'horizontale, et ajoute le petit widget Dulce à la vue StandBy." },
      ],
      it: [
        { q: "Esiste un widget del FreeStyle Libre per iPhone?", a: "Non di Abbott: LibreLink, Libre 3 e LibreLinkUp non hanno un widget della glicemia. Dulce legge i tuoi dati di LibreLinkUp e aggiunge gratis widget per la Home, la schermata di blocco e StandBy." },
        { q: "Ogni quanto si aggiorna il widget della glicemia?", a: "Quando lo decide iOS, non ogni minuto. iOS limita gli aggiornamenti dei widget per risparmiare batteria, quindi i widget di Dulce mostrano da quanto risale la lettura e hanno un pulsante per aggiornare. Per un valore aggiornato ogni minuto, usa l'Attività in tempo reale.", link: "lock-screen" },
        { q: "Posso vedere la glicemia sul comodino di notte?", a: "Sì, con StandBy. Ricarica l'iPhone bloccato appoggiato di lato in orizzontale e aggiungi il widget piccolo di Dulce alla vista StandBy." },
      ],
    },
  },
  {
    id: "alerts",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-19",
    dateModified: "2026-10-26",
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
      es: "Dulce tiene avisos de bajada y subida con tus propios umbrales, además de cambio rápido, previsión de bajada y un aviso de hipo crítica a 55 mg/dL o menos, todo en Ajustes → Avisos. Son notificaciones normales del iPhone, así que siguen el modo silencio y Concentración: de noche, quita el modo silencio y permite Dulce en Dormir. Mantén también las alarmas de la app de tu sensor, porque Dulce es una capa extra, no un producto sanitario.",
      en: "Dulce has low and high alerts with your own thresholds, plus rapid change, predictive low and a critical low alert for 55 mg/dL or less, all under Settings → Alerts. They are regular iPhone notifications, so they follow silent mode and Focus: at night, turn silent mode off and allow Dulce in your Sleep Focus. Keep your sensor app's own alarms on too, because Dulce is an extra layer, not a medical device.",
      de: "Dulce hat Warnungen für niedrige und hohe Werte mit deinen eigenen Grenzen, dazu schnelle Änderung, vorausschauende Unterzucker-Warnung und eine kritische Warnung ab 55 mg/dL oder weniger, alles unter Einstellungen → Warnungen. Es sind normale iPhone-Mitteilungen, sie folgen also Stummmodus und Fokus: Schalte nachts den Stummmodus aus und erlaube Dulce im Fokus Schlafen. Lass auch die Alarme deiner Sensor-App an, denn Dulce ist eine zusätzliche Hilfe, kein Medizinprodukt.",
      fr: "Dulce propose des alertes d'hypo et d'hyper avec tes propres seuils, plus variation rapide, hypo prévue et une alerte d'hypo critique à 55 mg/dL ou moins, le tout dans Réglages → Alertes. Ce sont des notifications iPhone normales, elles suivent donc le mode silencieux et Concentration : la nuit, désactive le mode silencieux et autorise Dulce dans Sommeil. Garde aussi les alarmes de l'app de ton capteur, car Dulce est une aide en plus, pas un dispositif médical.",
      it: "Dulce ha avvisi di ipo e iper con le tue soglie, più variazione rapida, ipo prevista e un avviso di ipo critica a 55 mg/dL o meno, tutto in Impostazioni → Avvisi. Sono normali notifiche dell'iPhone, quindi seguono il silenzioso e Full immersion: di notte disattiva il silenzioso e consenti Dulce in Riposo. Tieni attivi anche gli allarmi dell'app del sensore, perché Dulce è un aiuto in più, non un dispositivo medico.",
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
        { q: "¿Pueden sonar los avisos de glucosa con el iPhone en silencio?", a: "No. Los avisos de Dulce son notificaciones normales y siguen los ajustes de sonido del iPhone, también el modo silencio y Concentración. De noche, quita el modo silencio y permite Dulce en Dormir. El aviso de hipo crítica sí atraviesa las horas tranquilas y las pausas de Dulce." },
        { q: "¿Dulce sustituye las alarmas de la app de Libre?", a: "No. Mantén activadas las alarmas de tu FreeStyle Libre 2 o Libre 3. Dulce es una capa más, no un dispositivo médico." },
        { q: "¿Llegan los avisos con la app cerrada?", a: "Sí. El servidor de Dulce revisa tus lecturas de LibreLinkUp y te manda el aviso: cada minuto con Dulce Pro y cada 5 minutos con la versión gratuita." },
        { q: "¿Puede mi familia recibir mis avisos?", a: "Sí. Tus seguidores pueden recibir sus propios avisos cuando bajas o subes, con sus propias horas tranquilas, y las bajadas muy fuertes siempre les llegan.", link: "family-sharing" },
      ],
      en: [
        { q: "Can glucose alerts ring when my iPhone is on silent?", a: "No. Dulce's alerts are regular notifications and follow your iPhone's sound settings, including silent mode and Focus. At night, turn silent mode off and allow Dulce in your Sleep Focus. The critical low alert does come through Dulce's own quiet hours and snoozes." },
        { q: "Does Dulce replace the Libre app's alarms?", a: "No. Keep your FreeStyle Libre 2 or Libre 3 alarms on. Dulce is an extra layer, not a medical device." },
        { q: "Do alerts arrive with the app closed?", a: "Yes. Dulce's server checks your LibreLinkUp readings and sends you the alert: every minute with Dulce Pro and every 5 minutes with the free version." },
        { q: "Can my family get my alerts?", a: "Yes. Your followers can get their own alerts when you go low or high, with their own quiet hours, and very low readings always reach them.", link: "family-sharing" },
      ],
      de: [
        { q: "Können Zucker-Warnungen klingeln, wenn das iPhone stumm ist?", a: "Nein. Die Warnungen von Dulce sind normale Mitteilungen und folgen den Toneinstellungen des iPhone, auch Stummmodus und Fokus. Schalte nachts den Stummmodus aus und erlaube Dulce im Fokus Schlafen. Die kritische Unterzucker-Warnung kommt aber durch Dulces Ruhezeiten und Pausen." },
        { q: "Ersetzt Dulce die Alarme der Libre-App?", a: "Nein. Lass die Alarme deines FreeStyle Libre 2 oder Libre 3 eingeschaltet. Dulce ist eine zusätzliche Ebene, kein Medizinprodukt." },
        { q: "Kommen die Warnungen auch bei geschlossener App?", a: "Ja. Der Server von Dulce prüft deine LibreLinkUp-Werte und schickt dir die Warnung: jede Minute mit Dulce Pro und alle 5 Minuten in der kostenlosen Version." },
        { q: "Kann meine Familie meine Warnungen bekommen?", a: "Ja. Deine Follower können eigene Warnungen bekommen, wenn du niedrig oder hoch bist, mit eigenen Ruhezeiten, und sehr niedrige Werte kommen immer bei ihnen an.", link: "family-sharing" },
      ],
      fr: [
        { q: "Les alertes de glycémie peuvent-elles sonner iPhone en silencieux ?", a: "Non. Les alertes de Dulce sont des notifications normales et suivent les réglages de son de l'iPhone, y compris le mode silencieux et Concentration. La nuit, désactive le mode silencieux et autorise Dulce dans Sommeil. L'alerte d'hypo critique passe en revanche outre les heures calmes et les pauses de Dulce." },
        { q: "Dulce remplace-t-il les alarmes de l'app Libre ?", a: "Non. Garde les alarmes de ton FreeStyle Libre 2 ou Libre 3 activées. Dulce est une couche de plus, pas un dispositif médical." },
        { q: "Les alertes arrivent-elles avec l'app fermée ?", a: "Oui. Le serveur de Dulce vérifie tes mesures LibreLinkUp et t'envoie l'alerte : chaque minute avec Dulce Pro et toutes les 5 minutes avec la version gratuite." },
        { q: "Ma famille peut-elle recevoir mes alertes ?", a: "Oui. Tes abonnés peuvent recevoir leurs propres alertes quand tu es en hypo ou en hyper, avec leurs propres heures calmes, et les valeurs très basses leur arrivent toujours.", link: "family-sharing" },
      ],
      it: [
        { q: "Gli avvisi di glicemia possono suonare con l'iPhone in silenzioso?", a: "No. Gli avvisi di Dulce sono normali notifiche e seguono le impostazioni audio dell'iPhone, compresi silenzioso e Full immersion. Di notte disattiva il silenzioso e consenti Dulce in Riposo. L'avviso di ipo critica invece supera le ore di silenzio e le pause di Dulce." },
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
    dateModified: "2026-10-24",
    slug: {
      es: "librelinkup-no-funciona",
      en: "librelinkup-not-working",
      de: "librelinkup-funktioniert-nicht",
      fr: "librelinkup-ne-fonctionne-pas",
      it: "librelinkup-non-funziona",
    },
    title: {
      es: "LibreLinkUp no funciona: sin datos, no se actualiza o no inicia sesión",
      en: "LibreLinkUp not working: no data, not updating or can't log in",
      de: "LibreLinkUp funktioniert nicht: keine Daten, keine Updates, kein Login",
      fr: "LibreLinkUp ne fonctionne pas : pas de données ou connexion impossible",
      it: "LibreLinkUp non funziona: niente dati o accesso impossibile",
    },
    description: {
      es: "Soluciones paso a paso cuando LibreLinkUp no muestra datos, no se actualiza o rechaza tu contraseña, y qué revisar en el móvil de quien lleva el sensor.",
      en: "Step-by-step fixes when LibreLinkUp shows no data, stops updating or rejects your password, and what to check on the phone of the person wearing the sensor.",
      de: "Schritt-für-Schritt-Lösungen, wenn LibreLinkUp keine Daten zeigt, nicht aktualisiert oder dein Passwort ablehnt, und was du am Handy des Sensorträgers prüfst.",
      fr: "Solutions pas à pas quand LibreLinkUp n'affiche aucune donnée, ne se met plus à jour ou refuse ton mot de passe, et quoi vérifier sur le téléphone du capteur.",
      it: "Soluzioni passo passo quando LibreLinkUp non mostra dati, non si aggiorna o rifiuta la password, e cosa controllare sul telefono di chi porta il sensore.",
    },
    summary: {
      es: "Casi todos los problemas de LibreLinkUp son uno de estos tres: no puedes entrar (casi siempre porque escribes la contraseña de LibreLink, que es otra cuenta), entras pero no ves datos (nadie comparte todavía con esa cuenta) o los datos dejan de actualizarse. Las lecturas van sensor → app de Libre → nube de Abbott → LibreLinkUp, así que si se congelan comprueba que el móvil del sensor tiene internet, no ha cerrado la app de Libre y está cerca del sensor.",
      en: "Almost every LibreLinkUp problem is one of three: you can't log in (usually because you're typing your LibreLink password, which belongs to a separate account), you log in but see no data (nobody is sharing with that account yet), or the data stops updating. Readings travel sensor → Libre app → Abbott's cloud → LibreLinkUp, so for frozen data check that the sensor phone has internet, keeps the Libre app running and stays near the sensor.",
      de: "Fast jedes LibreLinkUp-Problem ist eines von dreien: Du kommst nicht rein (meist, weil du das Passwort von LibreLink eingibst, einem anderen Konto), du kommst rein, siehst aber keine Daten (noch teilt niemand mit diesem Konto), oder die Daten werden nicht mehr aktualisiert. Die Werte laufen Sensor → Libre-App → Abbott-Cloud → LibreLinkUp; wenn sie hängen, prüf also, ob das Sensor-Handy Internet hat, die Libre-App nicht beendet wurde und das Handy in der Nähe des Sensors ist.",
      fr: "Presque tous les problèmes de LibreLinkUp se rangent en trois cas : tu n'arrives pas à te connecter (souvent parce que tu tapes le mot de passe de LibreLink, un autre compte), tu te connectes mais ne vois aucune donnée (personne ne partage encore avec ce compte), ou les données ne se mettent plus à jour. Les mesures passent capteur → app Libre → cloud d'Abbott → LibreLinkUp : si elles se figent, vérifie que le téléphone du capteur a internet, n'a pas fermé l'app Libre et reste près du capteur.",
      it: "Quasi tutti i problemi di LibreLinkUp sono uno di questi tre: non riesci ad accedere (di solito perché scrivi la password di LibreLink, che è un altro account), accedi ma non vedi dati (nessuno condivide ancora con quell'account) oppure i dati smettono di aggiornarsi. Le letture passano sensore → app Libre → cloud di Abbott → LibreLinkUp, quindi se si bloccano controlla che il telefono del sensore abbia internet, non abbia chiuso l'app Libre e sia vicino al sensore.",
    },
    keywords: {
      es: ["librelinkup no funciona", "librelinkup no muestra datos", "librelinkup no se actualiza", "librelinkup login", "librelink vs librelinkup"],
      en: ["librelinkup not working", "librelinkup no data", "librelinkup not updating", "librelinkup login", "librelink vs librelinkup"],
      de: ["librelinkup funktioniert nicht", "librelinkup keine daten", "librelinkup aktualisiert nicht", "librelinkup login", "librelink librelinkup unterschied"],
      fr: ["librelinkup ne fonctionne pas", "librelinkup pas de données", "librelinkup ne se met pas à jour", "librelinkup connexion", "librelink ou librelinkup"],
      it: ["librelinkup non funziona", "librelinkup nessun dato", "librelinkup non si aggiorna", "librelinkup accesso", "librelink o librelinkup"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce recibiendo lecturas de LibreLinkUp",
      en: "Dulce home screen receiving readings from LibreLinkUp",
      de: "Startbildschirm von Dulce mit Werten aus LibreLinkUp",
      fr: "Écran d'accueil de Dulce recevant des mesures de LibreLinkUp",
      it: "Schermata Home di Dulce che riceve letture da LibreLinkUp",
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
    },
  },
  {
    id: "trends",
    category: "guide",
    author: "levan",
    datePublished: "2026-10-19",
    dateModified: "2026-10-23",
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
    dateModified: "2026-10-22",
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
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce con botones de hidratos e insulina",
      en: "Dulce home screen with the carbs and insulin buttons",
      de: "Startbildschirm von Dulce mit den Schaltflächen für Kohlenhydrate und Insulin",
      fr: "Écran d'accueil de Dulce avec les boutons glucides et insuline",
      it: "Schermata Home di Dulce con i pulsanti carboidrati e insulina",
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
    dateModified: "2026-10-24",
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
        { q: "How much does it cost to follow someone?", a: "Nothing for the follower. Sharing is a Dulce Pro feature for the person wearing the sensor, with a 14-day free trial, and allows up to 3 followers." },
        { q: "Does it work for caring for an older parent?", a: "Yes. If their Libre app shares with your LibreLinkUp account, you sign in to Dulce with it and they don't have to install anything else on their phone." },
      ],
      de: [
        { q: "Kann ich den Zucker meines Kindes auf meinem iPhone-Sperrbildschirm sehen?", a: "Ja. Mit Dulce erscheint der FreeStyle Libre Wert deines Kindes als Live-Aktivität auf deinem Sperrbildschirm, mit Warnungen bei niedrigen und hohen Werten, ohne dass du das Handy entsperrst. Dein Kind lädt dich in Dulce als Follower ein, oder du meldest dich in Dulce mit dem LibreLinkUp-Konto an, mit dem es schon teilt." },
        { q: "Braucht mein Kind ein iPhone?", a: "Es braucht ein Handy mit der Libre-App, die den Sensor ausliest, und Internet. Um dich aus Dulce einzuladen, muss das ein iPhone sein; teilt es nur mit deinem LibreLinkUp-Konto, öffnest du Dulce auf deinem iPhone mit diesem Konto." },
        { q: "Was kostet es, jemandem zu folgen?", a: "Für Follower nichts. Teilen ist eine Dulce Pro Funktion für die Person mit dem Sensor, mit 14 Tagen Gratis-Test, und erlaubt bis zu 3 Follower." },
        { q: "Funktioniert das auch für ältere Eltern?", a: "Ja. Wenn ihre Libre-App mit deinem LibreLinkUp-Konto teilt, meldest du dich damit in Dulce an, und sie müssen nichts weiter auf ihrem Handy installieren." },
      ],
      fr: [
        { q: "Puis-je suivre la glycémie de mon enfant sur l'écran verrouillé de mon iPhone ?", a: "Oui. Avec Dulce, la glycémie FreeStyle Libre de ton enfant s'affiche sur ton écran verrouillé en Activité en direct, avec des alertes d'hypo et d'hyper, sans déverrouiller ton téléphone. Ton enfant t'invite comme abonné depuis Dulce, ou tu te connectes à Dulce avec le compte LibreLinkUp avec lequel il partage déjà." },
        { q: "Mon enfant a-t-il besoin d'un iPhone ?", a: "Il lui faut un téléphone avec l'app Libre qui lit son capteur et une connexion Internet. Pour t'inviter depuis Dulce, ce téléphone doit être un iPhone ; s'il partage seulement avec ton compte LibreLinkUp, tu ouvres Dulce sur ton iPhone avec ce compte." },
        { q: "Combien coûte le fait de suivre quelqu'un ?", a: "Rien pour l'abonné. Le partage est une fonction de Dulce Pro pour la personne qui porte le capteur, avec 14 jours d'essai gratuit, et permet jusqu'à 3 abonnés." },
        { q: "Est-ce que ça marche pour veiller sur un parent âgé ?", a: "Oui. Si son app Libre partage avec ton compte LibreLinkUp, tu te connectes à Dulce avec ce compte et il n'a rien d'autre à installer sur son téléphone." },
      ],
      it: [
        { q: "Posso seguire la glicemia di mio figlio sulla schermata di blocco del mio iPhone?", a: "Sì. Con Dulce la glicemia del FreeStyle Libre di tuo figlio compare sulla tua schermata di blocco come Attività in tempo reale, con avvisi di ipo e iper, senza sbloccare il telefono. Tuo figlio ti invita come follower da Dulce, oppure accedi a Dulce con l'account LibreLinkUp con cui già condivide." },
        { q: "Mio figlio ha bisogno di un iPhone?", a: "Gli serve un telefono con l'app Libre che legge il sensore e una connessione a Internet. Per invitarti da Dulce quel telefono deve essere un iPhone; se condivide solo con il tuo account LibreLinkUp, apri Dulce sul tuo iPhone con quell'account." },
        { q: "Quanto costa seguire qualcuno?", a: "Niente per il follower. La condivisione è una funzione di Dulce Pro per chi porta il sensore, con 14 giorni di prova gratuita, e permette fino a 3 follower." },
        { q: "Funziona anche per un genitore anziano?", a: "Sì. Se la sua app Libre condivide con il tuo account LibreLinkUp, accedi a Dulce con quell'account e lui non deve installare nient'altro sul telefono." },
      ],
    },
  },
  {
    id: "night-lows",
    category: "health",
    author: "giorgi",
    datePublished: "2026-10-23",
    dateModified: "2026-10-24",
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
    image: "/guides/lock-screen-alerts-watch.jpg",
    imageAlt: {
      es: "Avisos de Dulce en la pantalla de bloqueo: glucosa muy baja y glucosa baja",
      en: "Dulce alerts on the Lock Screen: glucose very low and low glucose",
      de: "Dulce-Warnungen auf dem Sperrbildschirm: Glukose sehr niedrig und Glukose niedrig",
      fr: "Alertes de Dulce sur l'écran verrouillé : glycémie très basse et glycémie basse",
      it: "Avvisi di Dulce sulla schermata di blocco: glicemia molto bassa e glicemia bassa",
    },
    related: ["alerts", "time-in-range", "child-glucose"],
    faq: {
      es: [
        { q: "¿Qué se considera hipoglucemia nocturna?", a: "Una bajada de glucosa por debajo de 70 mg/dL mientras duermes. La ADA llama nivel 2 a la que baja de 54 mg/dL y nivel 3 al episodio grave en el que necesitas ayuda de otra persona, sea de día o de noche." },
        { q: "¿Por qué no me despierto con una hipoglucemia?", a: "Porque durante el sueño el cuerpo responde con menos adrenalina. En un estudio, solo 1 de 16 personas con diabetes tipo 1 se despertó con una bajada provocada durante el sueño, frente a 10 de 16 sin diabetes." },
        { q: "¿Mi sensor puede marcar una bajada falsa por la noche?", a: "Sí. Si duermes encima del sensor, la presión puede dar una caída brusca que se recupera al darte la vuelta. Ante la duda, trátala como real y confirma con un glucómetro." },
        { q: "¿Suenan los avisos de Dulce con el iPhone en silencio?", a: "No. Llegan como notificaciones normales y siguen el sonido del iPhone. Por la noche quita el modo silencio y, si usas la concentración Dormir, permite las notificaciones de Dulce.", link: "alerts" },
      ],
      en: [
        { q: "What counts as nocturnal hypoglycemia?", a: "A glucose level below 70 mg/dL while you sleep. The ADA calls a drop below 54 mg/dL level 2, and a severe episode where you need someone else's help level 3, day or night." },
        { q: "Why don't I wake up during a low?", a: "Because during sleep the body releases less adrenaline in response to a low. In one study, only 1 of 16 people with type 1 diabetes woke up during a low induced in their sleep, compared with 10 of 16 without diabetes." },
        { q: "Can my sensor show a false low at night?", a: "Yes. Sleeping on the sensor can cause a sharp drop that bounces back once you turn over. If in doubt, treat it as real and confirm with a fingerstick meter." },
        { q: "Do Dulce alerts ring with my iPhone on silent?", a: "No. They arrive as regular notifications and follow your iPhone's sound settings. At night, turn silent mode off and, if you use the Sleep Focus, allow notifications from Dulce.", link: "alerts" },
      ],
      de: [
        { q: "Was gilt als nächtliche Unterzuckerung?", a: "Ein Glukosewert unter 70 mg/dL im Schlaf. Die ADA nennt einen Abfall unter 54 mg/dL Stufe 2 und ein schweres Ereignis, bei dem du fremde Hilfe brauchst, Stufe 3, tagsüber wie nachts." },
        { q: "Warum wache ich bei einer Unterzuckerung nicht auf?", a: "Weil der Körper im Schlaf weniger Adrenalin ausschüttet. In einer Studie wachte nur 1 von 16 Menschen mit Typ-1-Diabetes bei einer im Schlaf ausgelösten Unterzuckerung auf, bei Menschen ohne Diabetes waren es 10 von 16." },
        { q: "Kann mein Sensor nachts ein falsches Tief zeigen?", a: "Ja. Liegst du auf dem Sensor, kann der Druck einen steilen Absturz erzeugen, der sich beim Umdrehen wieder erholt. Im Zweifel behandle es als echt und prüf mit einem Blutzuckermessgerät." },
        { q: "Klingeln die Warnungen von Dulce, wenn das iPhone stumm ist?", a: "Nein. Sie kommen als normale Mitteilungen und folgen den Toneinstellungen des iPhone. Schalte nachts den Stummmodus aus und erlaube Dulce im Fokus Schlafen, falls du ihn nutzt.", link: "alerts" },
      ],
      fr: [
        { q: "Qu'appelle-t-on hypoglycémie nocturne ?", a: "Une glycémie sous 70 mg/dL pendant le sommeil. L'ADA appelle niveau 2 une baisse sous 54 mg/dL, et niveau 3 un épisode sévère où tu as besoin de l'aide de quelqu'un, de jour comme de nuit." },
        { q: "Pourquoi je ne me réveille pas pendant une hypo ?", a: "Parce que pendant le sommeil, le corps libère moins d'adrénaline face à une hypo. Dans une étude, 1 seule personne sur 16 avec un diabète de type 1 s'est réveillée pendant une hypo provoquée dans son sommeil, contre 10 sur 16 sans diabète." },
        { q: "Mon capteur peut-il afficher une fausse hypo la nuit ?", a: "Oui. Dormir sur le capteur peut provoquer une chute brutale qui remonte dès que tu te retournes. En cas de doute, considère-la comme réelle et vérifie avec un lecteur capillaire." },
        { q: "Les alertes de Dulce sonnent-elles iPhone en silencieux ?", a: "Non. Elles arrivent comme des notifications normales et suivent les réglages de son de l'iPhone. La nuit, désactive le mode silencieux et, si tu utilises la Concentration Sommeil, autorise les notifications de Dulce.", link: "alerts" },
      ],
      it: [
        { q: "Cosa si intende per ipoglicemia notturna?", a: "Una glicemia sotto 70 mg/dL mentre dormi. L'ADA chiama livello 2 un calo sotto 54 mg/dL e livello 3 un evento grave in cui ti serve l'aiuto di un'altra persona, di giorno come di notte." },
        { q: "Perché non mi sveglio durante un'ipo?", a: "Perché nel sonno il corpo rilascia meno adrenalina in risposta all'ipo. In uno studio si è svegliata solo 1 persona su 16 con diabete di tipo 1 durante un'ipo indotta nel sonno, contro 10 su 16 senza diabete." },
        { q: "Il sensore può mostrare una falsa ipo di notte?", a: "Sì. Dormire sopra il sensore può causare un crollo brusco che rientra appena ti giri. Nel dubbio trattala come vera e verifica con un glucometro da dito." },
        { q: "Gli avvisi di Dulce suonano con l'iPhone in silenzioso?", a: "No. Arrivano come normali notifiche e seguono le impostazioni audio dell'iPhone. Di notte disattiva la modalità silenziosa e, se usi la Full immersion Riposo, consenti le notifiche di Dulce.", link: "alerts" },
      ],
    },
  },
  {
    id: "libreview",
    category: "help",
    author: "levan",
    datePublished: "2026-10-24",
    dateModified: "2026-10-24",
    slug: {
      es: "libreview",
      en: "libreview",
      de: "libreview",
      fr: "libreview",
      it: "libreview",
    },
    title: {
      es: "LibreView: qué es, cómo entrar y en qué se diferencia de LibreLinkUp",
      en: "LibreView: what it is, how to log in and how it differs from LibreLinkUp",
      de: "LibreView: was es ist, Login und der Unterschied zu LibreLinkUp",
      fr: "LibreView : c'est quoi, connexion et différence avec LibreLinkUp",
      it: "LibreView: cos'è, come accedere e la differenza con LibreLinkUp",
    },
    description: {
      es: "LibreView es la web de Abbott con tus lecturas de FreeStyle Libre: qué cuenta usa, cómo compartirla con tu centro y por qué no vale para LibreLinkUp.",
      en: "LibreView is Abbott's website for your FreeStyle Libre readings: which login it uses, how to share it with your clinic and why it won't open LibreLinkUp.",
      de: "LibreView ist Abbotts Webseite für deine Libre-Werte: welches Konto sie nutzt, wie du sie mit der Praxis teilst und warum es nicht für LibreLinkUp gilt.",
      fr: "LibreView, le site d'Abbott pour tes mesures Libre : quel compte il utilise, comment le partager avec ton centre et pourquoi il n'ouvre pas LibreLinkUp.",
      it: "LibreView è il sito di Abbott con le letture del tuo Libre: quale account usa, come condividerlo con il centro e perché non ti fa entrare in LibreLinkUp.",
    },
    summary: {
      es: "LibreView es la web de Abbott (libreview.com) donde se guardan las lecturas de tu FreeStyle Libre y se convierten en informes, como el AGP con el tiempo en rango, para ti y tu centro de salud. Usa el mismo usuario que la app con la que lees el sensor (FreeStyle LibreLink o FreeStyle Libre 3), no tu cuenta de LibreLinkUp, y por eso esa contraseña no abre LibreLinkUp.",
      en: "LibreView is Abbott's website (libreview.com) where your FreeStyle Libre readings are stored and turned into reports, such as the AGP with time in range, for you and your clinic. It uses the same login as the app that reads your sensor (FreeStyle LibreLink or FreeStyle Libre 3), not your LibreLinkUp account, which is why that password won't open LibreLinkUp.",
      de: "LibreView ist Abbotts Website (libreview.com), auf der deine FreeStyle Libre Werte gespeichert und zu Berichten wie dem AGP mit der Zeit im Zielbereich werden, für dich und deine Praxis. Sie nutzt denselben Login wie die App, mit der du den Sensor ausliest (FreeStyle LibreLink oder FreeStyle Libre 3), nicht dein LibreLinkUp-Konto, deshalb öffnet dieses Passwort LibreLinkUp nicht.",
      fr: "LibreView est le site d'Abbott (libreview.com) où tes mesures FreeStyle Libre sont stockées et transformées en rapports, comme l'AGP avec le temps dans la cible, pour toi et ton équipe soignante. Il utilise les mêmes identifiants que l'app qui lit ton capteur (FreeStyle LibreLink ou FreeStyle Libre 3), pas ton compte LibreLinkUp, c'est pourquoi ce mot de passe n'ouvre pas LibreLinkUp.",
      it: "LibreView è il sito di Abbott (libreview.com) dove le letture del tuo FreeStyle Libre vengono salvate e trasformate in report, come l'AGP con il tempo nel range, per te e il tuo centro diabetologico. Usa le stesse credenziali dell'app con cui leggi il sensore (FreeStyle LibreLink o FreeStyle Libre 3), non il tuo account LibreLinkUp, ed è per questo che quella password non apre LibreLinkUp.",
    },
    keywords: {
      es: ["libreview", "libreview login", "libreview qué es", "libreview id de consulta", "libreview vs librelinkup"],
      en: ["libreview", "libreview login", "what is libreview", "libreview practice id", "libreview vs librelinkup"],
      de: ["libreview", "libreview login", "libreview anmelden", "libreview praxis id", "libreview librelinkup unterschied"],
      fr: ["libreview", "libreview connexion", "libreview c'est quoi", "libreview id cabinet", "libreview ou librelinkup"],
      it: ["libreview", "libreview accesso", "libreview cos'è", "libreview id centro", "libreview o librelinkup"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce con lecturas recibidas a través de LibreLinkUp",
      en: "Dulce home screen with readings received through LibreLinkUp",
      de: "Startbildschirm von Dulce mit Werten, die über LibreLinkUp ankommen",
      fr: "Écran d'accueil de Dulce avec des mesures reçues via LibreLinkUp",
      it: "Schermata Home di Dulce con letture ricevute tramite LibreLinkUp",
    },
    related: ["librelinkup-not-working", "time-in-range", "trends"],
    faq: {
      es: [
        { q: "¿Qué es LibreView?", a: "Es la plataforma en la nube de Abbott para los datos de FreeStyle Libre. Tú y tu equipo médico podéis ver en ella informes de tus lecturas, como el AGP con el tiempo en rango." },
        { q: "¿Qué usuario y contraseña uso en LibreView?", a: "Los mismos que en la app con la que lees tu sensor (FreeStyle LibreLink o FreeStyle Libre 3). Si usas esa app, ya tienes cuenta de LibreView." },
        { q: "¿Puedo entrar en LibreLinkUp con mi cuenta de LibreView?", a: "No. LibreLinkUp es la app de seguidores y tiene su propia cuenta. Hay que invitarla desde Apps conectadas en la app de Libre de quien lleva el sensor.", link: "librelinkup-not-working" },
        { q: "¿Dulce necesita mi cuenta de LibreView?", a: "No. Dulce inicia sesión con una cuenta de LibreLinkUp con la que compartes tus lecturas. Con tus datos de LibreLink o LibreView no puede entrar." },
      ],
      en: [
        { q: "What is LibreView?", a: "It's Abbott's cloud platform for FreeStyle Libre data. You and your care team can see reports of your readings there, such as the AGP report with time in range." },
        { q: "Which username and password do I use for LibreView?", a: "The same ones as the app you read your sensor with (FreeStyle LibreLink or FreeStyle Libre 3). If you use that app, you already have a LibreView account." },
        { q: "Can I log in to LibreLinkUp with my LibreView account?", a: "No. LibreLinkUp is the follower app and has its own account. It has to be invited from Connected Apps in the Libre app of the person wearing the sensor.", link: "librelinkup-not-working" },
        { q: "Does Dulce need my LibreView account?", a: "No. Dulce signs in with a LibreLinkUp account you share your readings with. It can't sign in with your LibreLink or LibreView details." },
      ],
      de: [
        { q: "Was ist LibreView?", a: "Abbotts Cloud-Plattform für FreeStyle-Libre-Daten. Du und dein Diabetesteam könnt dort Berichte deiner Werte ansehen, etwa den AGP-Bericht mit der Zeit im Zielbereich." },
        { q: "Welchen Benutzernamen und welches Passwort nutze ich für LibreView?", a: "Dieselben wie in der App, mit der du deinen Sensor ausliest (FreeStyle LibreLink oder FreeStyle Libre 3). Wenn du diese App nutzt, hast du schon ein LibreView-Konto." },
        { q: "Kann ich mich mit meinem LibreView-Konto bei LibreLinkUp anmelden?", a: "Nein. LibreLinkUp ist die Follower-App und hat ein eigenes Konto. Es muss über Verbundene Apps in der Libre-App der Person mit dem Sensor eingeladen werden.", link: "librelinkup-not-working" },
        { q: "Braucht Dulce mein LibreView-Konto?", a: "Nein. Dulce meldet sich mit einem LibreLinkUp-Konto an, mit dem du deine Werte teilst. Mit deinen LibreLink- oder LibreView-Daten kann sich Dulce nicht anmelden." },
      ],
      fr: [
        { q: "C'est quoi, LibreView ?", a: "La plateforme cloud d'Abbott pour les données FreeStyle Libre. Toi et ton équipe soignante pouvez y consulter des rapports sur tes mesures, comme le rapport AGP avec le temps dans la cible." },
        { q: "Quel identifiant et quel mot de passe pour LibreView ?", a: "Les mêmes que dans l'app avec laquelle tu lis ton capteur (FreeStyle LibreLink ou FreeStyle Libre 3). Si tu utilises cette app, tu as déjà un compte LibreView." },
        { q: "Puis-je me connecter à LibreLinkUp avec mon compte LibreView ?", a: "Non. LibreLinkUp est l'app des abonnés et a son propre compte. Il faut l'inviter depuis Applis connectées dans l'app Libre de la personne qui porte le capteur.", link: "librelinkup-not-working" },
        { q: "Dulce a-t-il besoin de mon compte LibreView ?", a: "Non. Dulce se connecte avec un compte LibreLinkUp avec lequel tu partages tes mesures. Il ne peut pas se connecter avec tes identifiants LibreLink ou LibreView." },
      ],
      it: [
        { q: "Cos'è LibreView?", a: "La piattaforma cloud di Abbott per i dati del FreeStyle Libre. Tu e il tuo team diabetologico potete vedere lì i report delle tue letture, come il report AGP con il tempo nel range." },
        { q: "Quale nome utente e password uso per LibreView?", a: "Gli stessi dell'app con cui leggi il sensore (FreeStyle LibreLink o FreeStyle Libre 3). Se usi quell'app, hai già un account LibreView." },
        { q: "Posso accedere a LibreLinkUp con l'account LibreView?", a: "No. LibreLinkUp è l'app dei follower e ha un account suo. Va invitato da App collegate nell'app Libre di chi porta il sensore.", link: "librelinkup-not-working" },
        { q: "Dulce ha bisogno del mio account LibreView?", a: "No. Dulce accede con un account LibreLinkUp con cui condividi le tue letture. Con i dati di LibreLink o LibreView non può accedere." },
      ],
    },
  },
  {
    id: "glucose-apps-compared",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-24",
    dateModified: "2026-10-25",
    slug: {
      es: "alternativa-sweet-dreams",
      en: "sweet-dreams-alternative",
      de: "sweet-dreams-alternative",
      fr: "alternative-sweet-dreams",
      it: "alternativa-sweet-dreams",
    },
    title: {
      es: "Alternativa a Sweet Dreams: apps de glucosa Libre para iPhone",
      en: "Sweet Dreams alternative: Libre glucose apps for iPhone compared",
      de: "Sweet Dreams Alternative: Libre-Apps fürs iPhone im Vergleich",
      fr: "Alternative à Sweet Dreams : les apps de glycémie Libre comparées",
      it: "Alternativa a Sweet Dreams: app per la glicemia Libre a confronto",
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
      ],
      en: [
        { q: "What is Sweet Dreams?", a: "An iPhone app that shows glucose from several CGMs (FreeStyle Libre through LibreLinkUp, Dexcom, Medtronic and others) on the Lock Screen, widgets and Apple Watch. Its App Store listing is in English." },
        { q: "What's the best Sweet Dreams alternative for a FreeStyle Libre?", a: "If you wear a Libre and want the app in your language, with a free carbs and insulin logbook and free followers, Dulce. If you use a Medtronic pump or a sensor other than Libre or Dexcom, Sweet Dreams covers more models." },
        { q: "Do I have to change anything on my sensor to switch to Dulce?", a: "No. Dulce uses the same LibreLinkUp account as your current app. You just sign in with that email and password." },
        { q: "Which sensors does Dulce read?", a: "FreeStyle Libre 2 and Libre 3 through LibreLinkUp, and Dexcom G6, G7 and ONE+ through Dexcom Share." },
      ],
      de: [
        { q: "Was ist Sweet Dreams?", a: "Eine iPhone-App, die Werte mehrerer CGMs (FreeStyle Libre über LibreLinkUp, Dexcom, Medtronic und andere) auf Sperrbildschirm, Widgets und Apple Watch zeigt. Ihr App-Store-Eintrag ist auf Englisch." },
        { q: "Was ist die beste Sweet-Dreams-Alternative für einen FreeStyle Libre?", a: "Wenn du einen Libre trägst und die App auf Deutsch willst, mit kostenlosem Tagebuch für KH und Insulin und kostenlosen Followern: Dulce. Mit einer Medtronic-Pumpe oder einem anderen Sensor als Libre oder Dexcom deckt Sweet Dreams mehr Modelle ab." },
        { q: "Muss ich am Sensor etwas ändern, um zu Dulce zu wechseln?", a: "Nein. Dulce nutzt dasselbe LibreLinkUp-Konto wie deine jetzige App. Du meldest dich nur mit dieser E-Mail und dem Passwort an." },
        { q: "Welche Sensoren liest Dulce?", a: "FreeStyle Libre 2 und Libre 3 über LibreLinkUp, und Dexcom G6, G7 und ONE+ über Dexcom Share." },
      ],
      fr: [
        { q: "C'est quoi, Sweet Dreams ?", a: "Une app iPhone qui affiche la glycémie de plusieurs capteurs (FreeStyle Libre via LibreLinkUp, Dexcom, Medtronic et d'autres) sur l'écran verrouillé, les widgets et l'Apple Watch. Sa fiche App Store est en anglais." },
        { q: "Quelle est la meilleure alternative à Sweet Dreams pour un FreeStyle Libre ?", a: "Si tu portes un Libre et veux l'app en français, avec un journal des glucides et de l'insuline gratuit et des abonnés gratuits : Dulce. Avec une pompe Medtronic ou un capteur autre que Libre ou Dexcom, Sweet Dreams couvre plus de modèles." },
        { q: "Dois-je changer quelque chose sur mon capteur pour passer à Dulce ?", a: "Non. Dulce utilise le même compte LibreLinkUp que ton app actuelle. Tu te connectes simplement avec cet e-mail et ce mot de passe." },
        { q: "Quels capteurs Dulce lit-il ?", a: "Les FreeStyle Libre 2 et Libre 3 via LibreLinkUp, et les Dexcom G6, G7 et ONE+ via Dexcom Share." },
      ],
      it: [
        { q: "Cos'è Sweet Dreams?", a: "Un'app per iPhone che mostra la glicemia di diversi CGM (FreeStyle Libre tramite LibreLinkUp, Dexcom, Medtronic e altri) sulla schermata di blocco, nei widget e su Apple Watch. La sua scheda dell'App Store è in inglese." },
        { q: "Qual è la migliore alternativa a Sweet Dreams per un FreeStyle Libre?", a: "Se porti un Libre e vuoi l'app in italiano, con diario di carboidrati e insulina gratis e follower gratis: Dulce. Con un microinfusore Medtronic o un sensore diverso da Libre e Dexcom, Sweet Dreams copre più modelli." },
        { q: "Devo cambiare qualcosa sul sensore per passare a Dulce?", a: "No. Dulce usa lo stesso account LibreLinkUp della tua app attuale. Basta accedere con quell'email e quella password." },
        { q: "Quali sensori legge Dulce?", a: "FreeStyle Libre 2 e Libre 3 tramite LibreLinkUp, e Dexcom G6, G7 e ONE+ tramite Dexcom Share." },
      ],
    },
  },
  {
    id: "dexcom",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-25",
    dateModified: "2026-10-26",
    slug: {
      es: "dexcom-en-apple-watch-y-pantalla-de-bloqueo",
      en: "dexcom-on-apple-watch-and-lock-screen",
      de: "dexcom-auf-apple-watch-und-sperrbildschirm",
      fr: "dexcom-apple-watch-ecran-verrouille",
      it: "dexcom-apple-watch-schermata-di-blocco",
    },
    title: {
      es: "Dexcom en el Apple Watch, la pantalla de bloqueo y CarPlay con Dulce",
      en: "Dexcom on Apple Watch, the Lock Screen and CarPlay with Dulce",
      de: "Dexcom auf Apple Watch, Sperrbildschirm und CarPlay mit Dulce",
      fr: "Dexcom sur l'Apple Watch, l'écran verrouillé et CarPlay avec Dulce",
      it: "Dexcom su Apple Watch, schermata di blocco e CarPlay con Dulce",
    },
    description: {
      es: "Cómo ver tu Dexcom G6, G7 o ONE+ en la pantalla de bloqueo, la Dynamic Island, el Apple Watch y CarPlay: Dexcom Share, qué necesitas y cómo conectarlo.",
      en: "See your Dexcom G6, G7 or ONE+ on the Lock Screen, Dynamic Island, Apple Watch and CarPlay: how Dexcom Share works, what you need and how to connect.",
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
      es: ["dexcom apple watch", "dexcom pantalla de bloqueo", "dexcom g7 iphone widget", "dexcom carplay", "dexcom share app iphone"],
      en: ["dexcom apple watch", "dexcom lock screen", "dexcom g7 live activity", "dexcom carplay", "dexcom follow alternative"],
      de: ["dexcom apple watch", "dexcom sperrbildschirm", "dexcom g7 widget iphone", "dexcom carplay", "dexcom follow alternative"],
      fr: ["dexcom apple watch", "dexcom écran verrouillé", "dexcom g7 widget iphone", "dexcom carplay", "alternative dexcom follow"],
      it: ["dexcom apple watch", "dexcom schermata di blocco", "dexcom g7 widget iphone", "dexcom carplay", "alternativa dexcom follow"],
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
      ],
      en: [
        { q: "Which Dexcom sensors work with Dulce?", a: "Dexcom G6, G7 and ONE+, through Dexcom Share. Share must be on in the Dexcom app, with at least one follower invited." },
        { q: "Which account do I sign in with?", a: "Your own Dexcom account, the one you use in the Dexcom app, not a follower's. Also pick the region where you created it: United States, Japan or Outside the US." },
        { q: "How often does it update?", a: "Dexcom shares a new reading every 5 minutes, and Dulce updates with each one, on the Lock Screen and the watch too." },
      ],
      de: [
        { q: "Welche Dexcom-Sensoren funktionieren mit Dulce?", a: "Dexcom G6, G7 und ONE+, über Dexcom Share. Teilen muss in der Dexcom-App aktiviert sein, mit mindestens einem eingeladenen Follower." },
        { q: "Mit welchem Konto melde ich mich an?", a: "Mit deinem eigenen Dexcom-Konto aus der Dexcom-App, nicht mit dem eines Followers. Wähle auch die Region, in der du es erstellt hast: USA, Japan oder Außerhalb der USA." },
        { q: "Wie oft wird aktualisiert?", a: "Dexcom teilt alle 5 Minuten einen neuen Wert, und Dulce aktualisiert mit jedem, auch auf dem Sperrbildschirm und der Uhr." },
      ],
      fr: [
        { q: "Quels Dexcom fonctionnent avec Dulce ?", a: "Les Dexcom G6, G7 et ONE+, via Dexcom Share. Le partage doit être activé dans l'app Dexcom, avec au moins un abonné invité." },
        { q: "Avec quel compte je me connecte ?", a: "Avec ton propre compte Dexcom, celui de l'app Dexcom, pas celui d'un abonné. Choisis aussi la région où tu l'as créé : États-Unis, Japon ou Hors des États-Unis." },
        { q: "À quelle fréquence ça se met à jour ?", a: "Dexcom partage une nouvelle mesure toutes les 5 minutes, et Dulce se met à jour à chacune, y compris sur l'écran verrouillé et la montre." },
      ],
      it: [
        { q: "Quali Dexcom funzionano con Dulce?", a: "Dexcom G6, G7 e ONE+, tramite Dexcom Share. La condivisione deve essere attiva nell'app Dexcom, con almeno un follower invitato." },
        { q: "Con quale account accedo?", a: "Con il tuo account Dexcom, quello dell'app Dexcom, non con quello di un follower. Scegli anche la regione in cui l'hai creato: Stati Uniti, Giappone o Fuori dagli Stati Uniti." },
        { q: "Ogni quanto si aggiorna?", a: "Dexcom condivide una nuova lettura ogni 5 minuti e Dulce si aggiorna con ognuna, anche sulla schermata di blocco e sull'orologio." },
      ],
    },
  },
  {
    id: "dexcom-follow-alternative",
    category: "guide",
    author: "giorgi",
    datePublished: "2026-10-26",
    dateModified: "2026-10-26",
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
        { q: "¿Los avisos de Dulce suenan con el iPhone en silencio?", a: "No. Son notificaciones normales y siguen los ajustes de sonido del iPhone. Si necesitas avisos que suenen en silencio, mantén las alarmas de Dexcom o usa una app que las ofrezca.", link: "alerts" },
      ],
      en: [
        { q: "Can I use Dulce and Dexcom Follow at the same time?", a: "Yes. Both read from Dexcom Share and change nothing on the sensor or in the Dexcom app. A Dexcom Follow follower already counts as the follower Dexcom needs before it shares." },
        { q: "Can I sign in to Dulce with my Dexcom Follow follower account?", a: "No. Dulce needs the Dexcom account of the person wearing the sensor. To follow someone, have them invite you from Dulce, or sign in with their account if you look after it.", link: "child-glucose" },
        { q: "Do Dulce's alerts ring when the iPhone is on silent?", a: "No. They are regular notifications and follow the iPhone's sound settings. If you need alerts that ring on silent, keep the Dexcom alarms on or use an app that offers them.", link: "alerts" },
      ],
      de: [
        { q: "Kann ich Dulce und Dexcom Follow gleichzeitig nutzen?", a: "Ja. Beide lesen über Dexcom Share und ändern nichts am Sensor oder in der Dexcom-App. Ein Follower in Dexcom Follow zählt bereits als der Follower, den Dexcom zum Teilen verlangt." },
        { q: "Kann ich mich mit meinem Follower-Konto von Dexcom Follow bei Dulce anmelden?", a: "Nein. Dulce braucht das Dexcom-Konto der Person, die den Sensor trägt. Um jemandem zu folgen, lass dich aus Dulce einladen oder melde dich mit ihrem Konto an, wenn du es verwaltest.", link: "child-glucose" },
        { q: "Klingeln die Alarme von Dulce, wenn das iPhone stumm ist?", a: "Nein. Es sind normale Mitteilungen, die den Toneinstellungen des iPhones folgen. Brauchst du Alarme, die auch stumm klingeln, lass die Dexcom-Alarme an oder nutze eine App, die das bietet.", link: "alerts" },
      ],
      fr: [
        { q: "Puis-je utiliser Dulce et Dexcom Follow en même temps ?", a: "Oui. Les deux lisent via Dexcom Share et ne changent rien au capteur ni à l'app Dexcom. Un abonné Dexcom Follow compte déjà comme l'abonné que Dexcom exige pour partager." },
        { q: "Puis-je me connecter à Dulce avec mon compte d'abonné Dexcom Follow ?", a: "Non. Dulce a besoin du compte Dexcom de la personne qui porte le capteur. Pour suivre quelqu'un, fais-toi inviter depuis Dulce ou connecte-toi avec son compte si c'est toi qui le gères.", link: "child-glucose" },
        { q: "Les alertes de Dulce sonnent-elles iPhone en silencieux ?", a: "Non. Ce sont des notifications normales qui suivent les réglages de son de l'iPhone. S'il te faut des alertes qui sonnent en silencieux, garde les alarmes Dexcom ou utilise une app qui les propose.", link: "alerts" },
      ],
      it: [
        { q: "Posso usare Dulce e Dexcom Follow insieme?", a: "Sì. Entrambe leggono da Dexcom Share e non cambiano nulla sul sensore né nell'app Dexcom. Un follower di Dexcom Follow conta già come il follower che Dexcom richiede per condividere." },
        { q: "Posso accedere a Dulce con il mio account da follower di Dexcom Follow?", a: "No. Dulce ha bisogno dell'account Dexcom di chi porta il sensore. Per seguire qualcuno, fatti invitare da Dulce oppure accedi con il suo account se lo gestisci tu.", link: "child-glucose" },
        { q: "Gli avvisi di Dulce suonano con l'iPhone in silenzioso?", a: "No. Sono notifiche normali e seguono le impostazioni audio dell'iPhone. Se ti servono avvisi che suonino in silenzioso, tieni attivi gli allarmi Dexcom o usa un'app che li offre.", link: "alerts" },
      ],
    },
  },
  {
    id: "blood-sugar-levels",
    category: "health",
    author: "giorgi",
    datePublished: "2026-10-28",
    dateModified: "2026-10-28",
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
      es: ["valores normales de glucosa", "glucosa en sangre valores normales", "glucosa en ayunas normal", "hemoglobina glicosilada valores normales", "tabla de glucosa"],
      en: ["blood sugar levels chart", "normal blood sugar levels", "fasting blood sugar normal range", "prediabetes range", "a1c chart"],
      de: ["blutzuckerwerte tabelle", "normale blutzuckerwerte", "nüchternblutzucker normalwerte", "hba1c tabelle", "diabetes werte tabelle"],
      fr: ["glycémie normale", "tableau glycémie", "glycémie à jeun normale", "prédiabète glycémie", "hémoglobine glyquée normale"],
      it: ["valori glicemia", "glicemia normale", "glicemia a digiuno valori normali", "emoglobina glicata valori normali", "tabella glicemia"],
    },
    image: "/guides/home-screen.jpg",
    imageAlt: {
      es: "Pantalla de inicio de Dulce con 131 mg/dL y la barra de tiempo en rango",
      en: "Dulce home screen showing 131 mg/dL and the time in range bar",
      de: "Startbildschirm von Dulce mit 131 mg/dL und dem Balken für die Zeit im Zielbereich",
      fr: "Écran d'accueil de Dulce avec 131 mg/dL et la barre de temps dans la cible",
      it: "Schermata Home di Dulce con 131 mg/dL e la barra del tempo nel range",
    },
    related: ["time-in-range", "night-lows", "trends"],
    faq: {
      es: [
        { q: "¿Cuál es la glucosa normal en ayunas?", a: "Menos de 100 mg/dL (5,6 mmol/L) según la ADA. De 100 a 125 mg/dL se considera prediabetes y 126 mg/dL o más, repetido, diabetes. La OMS empieza la glucosa alterada en ayunas en 110 mg/dL." },
        { q: "¿Qué hemoglobina glicosilada es normal?", a: "Menos del 5,7 % (39 mmol/mol). Del 5,7 % al 6,4 % es prediabetes y del 6,5 % en adelante, confirmado, diabetes. Con diabetes, el objetivo habitual de la ADA es menos del 7 %." },
        { q: "¿Puedo diagnosticarme diabetes con un sensor o un glucómetro?", a: "No. El diagnóstico se hace con análisis de laboratorio pedidos por un médico, normalmente repetidos. Un sensor o un glucómetro sirven para el día a día, no para diagnosticar." },
      ],
      en: [
        { q: "What is a normal fasting blood sugar?", a: "Under 100 mg/dL (5.6 mmol/L), according to the ADA. 100 to 125 mg/dL counts as prediabetes and 126 mg/dL or more, confirmed, as diabetes. The WHO starts impaired fasting glucose at 110 mg/dL." },
        { q: "What HbA1c is normal?", a: "Under 5.7% (39 mmol/mol). 5.7% to 6.4% is prediabetes and 6.5% or more, confirmed, is diabetes. For people with diabetes, the ADA's usual goal is under 7%." },
        { q: "Can a sensor or a meter diagnose diabetes?", a: "No. Diabetes is diagnosed from laboratory tests ordered by a doctor, usually repeated. A sensor or a meter is for everyday management, not for diagnosis." },
      ],
      de: [
        { q: "Welcher Nüchternblutzucker ist normal?", a: "Unter 100 mg/dL (5,6 mmol/L) laut ADA. 100 bis 125 mg/dL gilt als Prädiabetes, 126 mg/dL oder mehr, bestätigt, als Diabetes. Bei der WHO beginnt die abnorme Nüchternglukose erst bei 110 mg/dL." },
        { q: "Welcher HbA1c ist normal?", a: "Unter 5,7 % (39 mmol/mol). 5,7 % bis 6,4 % ist Prädiabetes, ab 6,5 %, bestätigt, Diabetes. Mit Diabetes ist das übliche Ziel der ADA unter 7 %." },
        { q: "Kann ich Diabetes mit einem Sensor oder Messgerät feststellen?", a: "Nein. Die Diagnose stellt eine Ärztin oder ein Arzt mit Laborwerten, meist wiederholt. Sensor und Messgerät sind für den Alltag gedacht, nicht für die Diagnose." },
      ],
      fr: [
        { q: "Quelle est la glycémie normale à jeun ?", a: "Moins de 100 mg/dL (1,00 g/L ou 5,6 mmol/L) selon l'ADA. De 100 à 125 mg/dL, on parle de prédiabète, et à partir de 126 mg/dL, confirmé, de diabète. L'OMS fait commencer l'hyperglycémie modérée à jeun à 110 mg/dL." },
        { q: "Quelle HbA1c est normale ?", a: "Moins de 5,7 % (39 mmol/mol). De 5,7 % à 6,4 %, c'est un prédiabète, et à partir de 6,5 %, confirmé, un diabète. Avec un diabète, l'objectif habituel de l'ADA est moins de 7 %." },
        { q: "Un capteur ou un lecteur peut-il diagnostiquer un diabète ?", a: "Non. Le diagnostic se fait avec des analyses de laboratoire prescrites par un médecin, en général répétées. Un capteur ou un lecteur sert au suivi quotidien, pas au diagnostic." },
      ],
      it: [
        { q: "Qual è la glicemia normale a digiuno?", a: "Meno di 100 mg/dL (5,6 mmol/L) secondo l'ADA. Da 100 a 125 mg/dL si parla di prediabete e da 126 mg/dL in su, confermato, di diabete. Per l'OMS l'alterata glicemia a digiuno parte da 110 mg/dL." },
        { q: "Quale emoglobina glicata è normale?", a: "Meno del 5,7% (39 mmol/mol). Dal 5,7% al 6,4% è prediabete e dal 6,5% in su, confermato, diabete. Con il diabete, l'obiettivo abituale dell'ADA è meno del 7%." },
        { q: "Posso diagnosticare il diabete con un sensore o un glucometro?", a: "No. La diagnosi si fa con esami di laboratorio prescritti da un medico, di solito ripetuti. Sensore e glucometro servono per la gestione quotidiana, non per la diagnosi." },
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
