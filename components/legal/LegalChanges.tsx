import { Link } from "@/i18n/navigation";
import type { AppLocale, CoreLocale } from "@/i18n/routing";
import { CORE_LOCALES } from "@/i18n/routing";
import { CURRENT_UPDATED, LEGAL_ARCHIVE, dayBefore, type LegalDoc } from "@/lib/legalVersions";

/**
 * "What changed in this update" box at the top of the privacy policy and the terms, with a link to
 * the previous version (archived at /legal/<doc>/<version>). Update the bullets with every new
 * version of the text. Languages without their own legal text show the English box.
 */
type Copy = {
  heading: (date: string) => string;
  previous: (until: string) => string;
  items: Record<LegalDoc, string[]>;
};

const COPY: Record<CoreLocale, Copy> = {
  en: {
    heading: (date) => `What changed in this update (${date})`,
    previous: (until) => `Previous version (valid until ${until})`,
    items: {
      privacy: [
        "Garmin watches (optional): if you link a Garmin watch, it shows your glucose through the Garmin Connect app; the data field can save glucose in your Garmin activities, and you can unlink at any time (section 2.9).",
      ],
      terms: [
        "Saved chart history now includes your logbook, and sharing shows followers only the shared entries (sections 2 and 8.1).",
      ],
    },
  },
  es: {
    heading: (date) => `Qué cambia en esta versión (${date})`,
    previous: (until) => `Versión anterior (vigente hasta el ${until})`,
    items: {
      privacy: [
        "Relojes Garmin (opcional): si vinculas un reloj Garmin, muestra tu glucosa a través de la app Garmin Connect; el campo de datos puede guardar la glucosa en tus actividades de Garmin, y puedes desvincularlo cuando quieras (apartado 2.9).",
      ],
      terms: [
        "El historial guardado incluye ahora tu diario, y al compartir los seguidores solo ven las entradas compartidas (apartados 2 y 8.1).",
      ],
    },
  },
  de: {
    heading: (date) => `Was sich in dieser Fassung ändert (${date})`,
    previous: (until) => `Vorherige Fassung (gültig bis ${until})`,
    items: {
      privacy: [
        "Garmin-Uhren (optional): Wenn du eine Garmin-Uhr verbindest, zeigt sie deinen Glukosewert über die Garmin Connect App an; das Datenfeld kann Glukosewerte in deinen Garmin-Aktivitäten speichern, und du kannst die Uhr jederzeit trennen (Abschnitt 2.9).",
      ],
      terms: [
        "Der gespeicherte Kurvenverlauf umfasst jetzt dein Logbuch; beim Teilen sehen Follower nur die geteilten Einträge (Abschnitte 2 und 8.1).",
      ],
    },
  },
  fr: {
    heading: (date) => `Ce qui change dans cette version (${date})`,
    previous: (until) => `Version précédente (en vigueur jusqu'au ${until})`,
    items: {
      privacy: [
        "Montres Garmin (facultatif) : si tu associes une montre Garmin, elle affiche ta glycémie via l’app Garmin Connect ; le champ de données peut enregistrer la glycémie dans tes activités Garmin, et tu peux la dissocier à tout moment (section 2.9).",
      ],
      terms: [
        "L’historique enregistré inclut maintenant ton journal ; en partageant, tes abonnés ne voient que les entrées partagées (sections 2 et 8.1).",
      ],
    },
  },
  it: {
    heading: (date) => `Cosa cambia in questa versione (${date})`,
    previous: (until) => `Versione precedente (valida fino al ${until})`,
    items: {
      privacy: [
        "Orologi Garmin (facoltativo): se colleghi un orologio Garmin, mostra la tua glicemia tramite l’app Garmin Connect; il campo dati può salvare la glicemia nelle tue attività Garmin, e puoi scollegarlo in qualsiasi momento (sezione 2.9).",
      ],
      terms: [
        "La cronologia salvata include ora il tuo diario; condividendo, i follower vedono solo le voci condivise (sezioni 2 e 8.1).",
      ],
    },
  },
};

export function legalCopyLocale(locale: AppLocale): CoreLocale {
  return (CORE_LOCALES as readonly string[]).includes(locale) ? (locale as CoreLocale) : "en";
}

export function LegalChanges({ doc, locale }: { doc: LegalDoc; locale: AppLocale }) {
  const copy = COPY[legalCopyLocale(locale)];
  const previous = LEGAL_ARCHIVE[doc][0];
  const href =
    doc === "privacy"
      ? ({ pathname: "/legal/privacy/[version]", params: { version: previous.version } } as const)
      : ({ pathname: "/legal/terms/[version]", params: { version: previous.version } } as const);
  return (
    <aside className="my-8 rounded-[18px] border border-white/10 bg-glass px-5 py-4 [&_p]:mt-0">
      <p>
        <strong>{copy.heading(CURRENT_UPDATED[doc])}</strong>
      </p>
      <ul>
        {copy.items[doc].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {previous ? (
        <p>
          <Link href={href}>{copy.previous(dayBefore(CURRENT_UPDATED[doc]))}</Link>
        </p>
      ) : null}
    </aside>
  );
}

const ARCHIVE_NOTICE: Record<CoreLocale, (from: string, until: string) => string> = {
  en: (from, until) => `This is an earlier version, valid from ${from} until ${until}. It no longer applies.`,
  es: (from, until) => `Esta es una versión anterior, vigente del ${from} al ${until}. Ya no se aplica.`,
  de: (from, until) => `Dies ist eine frühere Fassung, gültig vom ${from} bis ${until}. Sie gilt nicht mehr.`,
  fr: (from, until) => `Ceci est une version précédente, en vigueur du ${from} au ${until}. Elle ne s'applique plus.`,
  it: (from, until) => `Questa è una versione precedente, valida dal ${from} al ${until}. Non si applica più.`,
};

const CURRENT_LINK: Record<CoreLocale, string> = {
  en: "Read the current version",
  es: "Lee la versión actual",
  de: "Zur aktuellen Fassung",
  fr: "Lire la version actuelle",
  it: "Leggi la versione attuale",
};

export function ArchivedNotice({ doc, locale, version }: { doc: LegalDoc; locale: AppLocale; version: string }) {
  const l = legalCopyLocale(locale);
  const list = LEGAL_ARCHIVE[doc];
  const i = list.findIndex((v) => v.version === version);
  const nextStart = i > 0 ? list[i - 1].validFrom : CURRENT_UPDATED[doc];
  return (
    <aside className="my-8 rounded-[18px] border border-ember/35 bg-ember/10 px-5 py-4 [&_p]:mt-0">
      <p>
        <strong>{ARCHIVE_NOTICE[l](list[i]?.validFrom ?? version, dayBefore(nextStart))}</strong>{" "}
        <Link href={doc === "privacy" ? "/legal/privacy" : "/legal/terms"}>{CURRENT_LINK[l]}</Link>
      </p>
    </aside>
  );
}
