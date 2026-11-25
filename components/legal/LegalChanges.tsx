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
        "Ad measurement (iOS): the app now uses Apple’s SKAdNetwork (aggregated, delayed, no advertising identifier, no health data) to measure installs and purchases (section 2.2.2).",
        "Meta: there is no longer a consent question. Sharing install and purchase events with Meta only starts if you turn on “Share install and purchase events with Meta” in Settings; it is off by default (section 2.2.2).",
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
        "Medición de anuncios (iOS): la app usa ahora SKAdNetwork de Apple (agregado, con retraso, sin identificador publicitario ni datos de salud) para medir instalaciones y compras (apartado 2.2.2).",
        "Meta: ya no hay una pregunta de consentimiento. Compartir eventos de instalación y compra con Meta solo empieza si activas «Compartir eventos de instalación y compra con Meta» en Ajustes; está desactivado por defecto (apartado 2.2.2).",
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
        "Werbemessung (iOS): Die App nutzt jetzt Apples SKAdNetwork (aggregiert, verzögert, ohne Werbe-ID, ohne Gesundheitsdaten), um Installationen und Käufe zu messen (Abschnitt 2.2.2).",
        "Meta: Es gibt keine Einwilligungsfrage mehr. Das Teilen von Installations- und Kaufereignissen mit Meta beginnt nur, wenn du in den Einstellungen „Installations- und Kaufereignisse mit Meta teilen“ einschaltest; standardmäßig ist es aus (Abschnitt 2.2.2).",
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
        "Mesure publicitaire (iOS) : l’app utilise maintenant SKAdNetwork d’Apple (agrégé, différé, sans identifiant publicitaire ni donnée de santé) pour mesurer les installations et les achats (section 2.2.2).",
        "Meta : il n’y a plus de question de consentement. Le partage des événements d’installation et d’achat avec Meta ne démarre que si tu actives « Partager les événements d’installation et d’achat avec Meta » dans Réglages ; il est désactivé par défaut (section 2.2.2).",
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
        "Misurazione degli annunci (iOS): l’app usa ora SKAdNetwork di Apple (aggregato, ritardato, senza identificativo pubblicitario né dati sanitari) per misurare installazioni e acquisti (sezione 2.2.2).",
        "Meta: non c’è più una domanda di consenso. La condivisione di eventi di installazione e acquisto con Meta parte solo se attivi «Condividi eventi di installazione e acquisto con Meta» in Impostazioni; è disattivata per impostazione predefinita (sezione 2.2.2).",
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
