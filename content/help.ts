import type { AppLocale, CoreLocale } from "@/i18n/routing";
import { CORE_LOCALES } from "@/i18n/routing";

/**
 * Help centre: short "how do I…" pages for people who already use Dulce, in the style of
 * "here are your options, the pros and cons of each, and what we'd pick". Not SEO guides
 * (those are content/articles): no CTA, no byline, one task per page.
 *
 * Bodies: content/help/<id>/<locale>.mdx for every core locale (en, es, de, fr, it).
 * Other site languages (fi, nl, nb, sv, ru) show the English page with a notice, noindex.
 *
 * The app opens these pages from Settings › Help › How-to guides and from the
 * "What Dulce can do" explainers, by id (dulce-app `src/constants/links.ts` `helpUrl`).
 * Never rename an id: installed app versions link to it.
 */
export type HelpId = "apple-watch" | "iphone-glance" | "alerts" | "family" | "sensor" | "not-updating";

export type HelpIcon = "watch" | "lock" | "bell" | "users" | "plug" | "refresh";

export type HelpArticle = {
  id: HelpId;
  icon: HelpIcon;
  title: Record<CoreLocale, string>;
  description: Record<CoreLocale, string>;
  dateModified: string;
};

export const HELP: readonly HelpArticle[] = [
  {
    id: "apple-watch",
    icon: "watch",
    title: {
      en: "See your glucose on Apple Watch",
      es: "Ver tu glucosa en el Apple Watch",
      de: "Glukose auf der Apple Watch sehen",
      fr: "Voir ta glycémie sur l'Apple Watch",
      it: "Vedere la glicemia su Apple Watch",
    },
    description: {
      en: "Three ways to keep up with your readings on your wrist, with the pros and cons of each.",
      es: "Tres formas de seguir tus lecturas en la muñeca, con los pros y contras de cada una.",
      de: "Drei Wege, deine Werte am Handgelenk im Blick zu behalten, mit Vor- und Nachteilen.",
      fr: "Trois façons de suivre tes valeurs au poignet, avec les avantages et inconvénients de chacune.",
      it: "Tre modi per seguire i valori al polso, con pro e contro di ognuno.",
    },
    dateModified: "2026-11-09",
  },
  {
    id: "iphone-glance",
    icon: "lock",
    title: {
      en: "See your glucose without opening the app",
      es: "Ver tu glucosa sin abrir la app",
      de: "Glukose sehen, ohne die App zu öffnen",
      fr: "Voir ta glycémie sans ouvrir l'app",
      it: "Vedere la glicemia senza aprire l'app",
    },
    description: {
      en: "Lock Screen, Dynamic Island, widgets and StandBy: which one to use and how to turn it on.",
      es: "Pantalla de bloqueo, Dynamic Island, widgets y StandBy: cuál usar y cómo activarlo.",
      de: "Sperrbildschirm, Dynamic Island, Widgets und StandBy: was du nutzen solltest und wie.",
      fr: "Écran verrouillé, Dynamic Island, widgets et StandBy : lequel choisir et comment l'activer.",
      it: "Schermata di blocco, Dynamic Island, widget e StandBy: quale usare e come attivarlo.",
    },
    dateModified: "2026-11-09",
  },
  {
    id: "alerts",
    icon: "bell",
    title: {
      en: "Set up alerts that suit you",
      es: "Configurar alertas a tu medida",
      de: "Alarme passend einrichten",
      fr: "Régler des alertes qui te conviennent",
      it: "Impostare avvisi su misura",
    },
    description: {
      en: "Limits, critical lows, ringing on silent, quiet hours and sounds, and a setup for the night.",
      es: "Límites, bajadas críticas, sonar en silencio, horas tranquilas y sonidos, y una configuración para la noche.",
      de: "Grenzwerte, kritische Tiefs, Klingeln im Stummmodus, Ruhezeiten und Töne, plus ein Setup für die Nacht.",
      fr: "Seuils, hypos critiques, sonnerie en mode silencieux, heures calmes et sons, et un réglage pour la nuit.",
      it: "Limiti, ipo critiche, suono in modalità silenziosa, ore di silenzio e suoni, più una configurazione per la notte.",
    },
    dateModified: "2026-11-09",
  },
  {
    id: "family",
    icon: "users",
    title: {
      en: "Share your glucose with family",
      es: "Compartir tu glucosa con la familia",
      de: "Glukose mit der Familie teilen",
      fr: "Partager ta glycémie avec ta famille",
      it: "Condividere la glicemia con la famiglia",
    },
    description: {
      en: "Invite as many people as you like, what they see on their iPhone, and how messages work.",
      es: "Invita a todas las personas que quieras, qué ven en su iPhone y cómo funcionan los mensajes.",
      de: "Beliebig viele Personen einladen, was sie auf ihrem iPhone sehen und wie Nachrichten funktionieren.",
      fr: "Invite autant de personnes que tu veux, ce qu'elles voient sur leur iPhone et comment marchent les messages.",
      it: "Invita tutte le persone che vuoi, cosa vedono sul loro iPhone e come funzionano i messaggi.",
    },
    dateModified: "2026-11-09",
  },
  {
    id: "sensor",
    icon: "plug",
    title: {
      en: "Connect your sensor",
      es: "Conectar tu sensor",
      de: "Sensor verbinden",
      fr: "Connecter ton capteur",
      it: "Collegare il sensore",
    },
    description: {
      en: "FreeStyle Libre, Dexcom, Medtronic or Nightscout: what each connection needs and how often it updates.",
      es: "FreeStyle Libre, Dexcom, Medtronic o Nightscout: qué necesita cada conexión y cada cuánto se actualiza.",
      de: "FreeStyle Libre, Dexcom, Medtronic oder Nightscout: was jede Verbindung braucht und wie oft sie aktualisiert.",
      fr: "FreeStyle Libre, Dexcom, Medtronic ou Nightscout : ce qu'il faut pour chaque connexion et sa fréquence.",
      it: "FreeStyle Libre, Dexcom, Medtronic o Nightscout: cosa serve per ogni collegamento e ogni quanto si aggiorna.",
    },
    dateModified: "2026-11-09",
  },
  {
    id: "not-updating",
    icon: "refresh",
    title: {
      en: "Readings not updating",
      es: "Las lecturas no se actualizan",
      de: "Werte aktualisieren sich nicht",
      fr: "Les valeurs ne se mettent pas à jour",
      it: "I valori non si aggiornano",
    },
    description: {
      en: "Old number on the Lock Screen, watch or widget? Check these things in this order.",
      es: "¿Número antiguo en la pantalla de bloqueo, el reloj o un widget? Revisa esto, en este orden.",
      de: "Alter Wert auf Sperrbildschirm, Uhr oder Widget? Prüfe diese Punkte der Reihe nach.",
      fr: "Ancienne valeur sur l'écran verrouillé, la montre ou un widget ? Vérifie ces points dans l'ordre.",
      it: "Valore vecchio sulla schermata di blocco, sull'orologio o in un widget? Controlla questi punti in ordine.",
    },
    dateModified: "2026-11-09",
  },
];

export function getHelp(id: string): HelpArticle | undefined {
  return HELP.find((h) => h.id === id);
}

/** The language a help page's text is in: its own for core locales, English for the rest. */
export function helpLocale(locale: AppLocale): CoreLocale {
  return (CORE_LOCALES as readonly string[]).includes(locale) ? (locale as CoreLocale) : "en";
}
