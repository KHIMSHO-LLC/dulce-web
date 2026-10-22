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
    dateModified: "2026-10-22",
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
    dateModified: "2026-10-22",
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
      de: "Teile deine FreeStyle Libre Werte in Echtzeit mit bis zu 3 Familienmitgliedern in Dulce: Einladung per Link, Warnungen für sie und die schnelle Antwort „Mir geht es gut“.",
      fr: "Partage tes mesures FreeStyle Libre en temps réel avec jusqu'à 3 proches dans Dulce : invitation par lien, alertes pour eux et réponse « Ça va » en un geste.",
      it: "Condividi le letture del FreeStyle Libre in tempo reale con fino a 3 familiari in Dulce: invito con link, avvisi per loro e risposta «Sto bene» con un tocco.",
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
    dateModified: "2026-10-22",
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
    dateModified: "2026-10-22",
    slug: {
      es: "widget-libre-para-iphone",
      en: "libre-widget-for-iphone",
      de: "libre-widget-fuer-das-iphone",
      fr: "widget-freestyle-libre-iphone",
      it: "widget-freestyle-libre-iphone",
    },
    title: {
      es: "Widget del FreeStyle Libre para iPhone: inicio, bloqueo y StandBy",
      en: "FreeStyle Libre widget for iPhone: Home Screen, Lock Screen, StandBy",
      de: "FreeStyle Libre Widget fürs iPhone: Home, Sperrbildschirm, StandBy",
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
    dateModified: "2026-10-22",
    slug: {
      es: "alarmas-de-glucosa-en-el-iphone",
      en: "glucose-alerts-on-iphone",
      de: "blutzucker-alarme-auf-dem-iphone",
      fr: "alertes-glycemie-iphone",
      it: "avvisi-glicemia-iphone",
    },
    title: {
      es: "Alarmas de glucosa en el iPhone: bajas, altas y la que suena en silencio",
      en: "Glucose alerts on iPhone: lows, highs and the one that rings on silent",
      de: "Blutzucker-Alarme am iPhone: tief, hoch und trotz Stummschaltung",
      fr: "Alertes de glycémie sur iPhone : hypos, hypers et mode silencieux",
      it: "Avvisi di glicemia su iPhone: ipo, iper e quello che suona in silenzioso",
    },
    description: {
      es: "Cómo configurar avisos de glucosa baja y alta en Dulce, la alarma crítica que suena con el móvil en silencio, las horas de silencio y el aviso predictivo.",
      en: "How to set low and high glucose alerts in Dulce, the critical alarm that rings with your phone on silent, quiet hours, and the predictive low alert.",
      de: "So stellst du Warnungen für niedrige und hohe Glukose in Dulce ein: der kritische Alarm trotz Stummschaltung, Ruhezeiten und die vorausschauende Tief-Warnung.",
      fr: "Comment régler les alertes de glycémie basse et haute dans Dulce, l'alarme critique qui sonne en silencieux, les heures calmes et l'alerte d'hypo prédictive.",
      it: "Come impostare gli avvisi di glicemia bassa e alta in Dulce, l'allarme critico che suona in silenzioso, le ore di silenzio e l'avviso di ipo predittiva.",
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
      fr: [
        { q: "Les alertes de glycémie peuvent-elles sonner iPhone en silencieux ?", a: "Seulement l'alerte d'hypo critique. Elle sonne en cas d'hypo sévère (55 mg/dL ou moins) même en silencieux, en mode Concentration ou pendant les heures calmes, à condition d'autoriser les Alertes critiques de Dulce dans iOS." },
        { q: "Dulce remplace-t-il les alarmes de l'app Libre ?", a: "Non. Garde les alarmes de ton FreeStyle Libre 2 ou Libre 3 activées. Dulce est une couche de plus, pas un dispositif médical." },
        { q: "Les alertes arrivent-elles avec l'app fermée ?", a: "Oui. Le serveur de Dulce vérifie tes mesures LibreLinkUp et t'envoie l'alerte : chaque minute avec Dulce Pro et toutes les 5 minutes avec la version gratuite." },
        { q: "Ma famille peut-elle recevoir mes alertes ?", a: "Oui. Tes abonnés peuvent recevoir leurs propres alertes quand tu es en hypo ou en hyper, avec leurs propres heures calmes, et les valeurs très basses leur arrivent toujours.", link: "family-sharing" },
      ],
      it: [
        { q: "Gli avvisi di glicemia possono suonare con l'iPhone in silenzioso?", a: "Solo l'avviso di ipo critica. Suona in caso di ipo grave (55 mg/dL o meno) anche in silenzioso, in una modalità Full immersion o durante le ore di silenzio, purché tu consenta gli Avvisi critici di Dulce in iOS." },
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
    dateModified: "2026-10-22",
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
    dateModified: "2026-10-22",
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
    dateModified: "2026-10-22",
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
