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
        "Logbook: if you use saved chart history (Dulce Pro), your logbook, every entry with all its details including notes, is now saved on our relay as part of it, so it comes back after a reinstall or on a new phone (section 2.6).",
        "If you accepted saved chart history before, your logbook is not saved until you agree in the app; you can change it with “Save my logbook” (section 2.6).",
        "Family: “Share my logbook with family” only decides whether followers see it. Turning it on shows them your saved logbook of the last 90 days (sections 2.4 and 2.6).",
        "Deleting: turning off “Save my logbook” deletes the saved logbook while sharing is off; the other ways to delete now cover the logbook too (sections 2.6 and 9).",
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
        "Diario: si usas el historial guardado (Dulce Pro), tu diario, cada entrada con todos sus datos y las notas, se guarda ahora en nuestro relay como parte de él, para que vuelva tras reinstalar o en un móvil nuevo (apartado 2.6).",
        "Si aceptaste el historial guardado antes, tu diario no se guarda hasta que lo aceptes en la app; puedes cambiarlo con «Guardar mi diario» (apartado 2.6).",
        "Familia: «Compartir mi diario con la familia» solo decide si los seguidores lo ven. Al activarlo, ven tu diario guardado de los últimos 90 días (apartados 2.4 y 2.6).",
        "Borrado: al desactivar «Guardar mi diario» se borra el diario guardado mientras no lo compartas; las demás formas de borrar ahora incluyen también el diario (apartados 2.6 y 9).",
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
        "Logbuch: Wenn du den gespeicherten Kurvenverlauf nutzt (Dulce Pro), wird dein Logbuch, jeder Eintrag mit allen Angaben samt Notizen, jetzt als Teil davon auf unserem Relay gespeichert, damit es nach einer Neuinstallation oder auf einem neuen Handy zurückkommt (Abschnitt 2.6).",
        "Hast du dem gespeicherten Kurvenverlauf früher zugestimmt, wird dein Logbuch erst gespeichert, wenn du in der App zustimmst; du kannst das mit „Mein Logbuch speichern“ ändern (Abschnitt 2.6).",
        "Familie: „Mein Logbuch mit der Familie teilen“ entscheidet nur, ob Follower es sehen. Wenn du es einschaltest, sehen sie dein gespeichertes Logbuch der letzten 90 Tage (Abschnitte 2.4 und 2.6).",
        "Löschen: Wenn du „Mein Logbuch speichern“ ausschaltest, wird das gespeicherte Logbuch gelöscht, solange du es nicht teilst; die anderen Wege zum Löschen umfassen jetzt auch das Logbuch (Abschnitte 2.6 und 9).",
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
        "Journal : si tu utilises l’historique enregistré (Dulce Pro), ton journal, chaque entrée avec tous ses détails, notes comprises, est maintenant enregistré sur notre relay dans ce cadre, pour qu’il revienne après une réinstallation ou sur un nouveau téléphone (section 2.6).",
        "Si tu as accepté l’historique enregistré avant, ton journal n’est enregistré qu’une fois que tu l’acceptes dans l’app ; tu peux le changer avec « Enregistrer mon journal » (section 2.6).",
        "Famille : « Partager mon journal avec ma famille » décide seulement si tes abonnés le voient. En l’activant, ils voient ton journal enregistré des 90 derniers jours (sections 2.4 et 2.6).",
        "Suppression : désactiver « Enregistrer mon journal » supprime le journal enregistré tant que tu ne le partages pas ; les autres façons de supprimer couvrent maintenant aussi le journal (sections 2.6 et 9).",
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
        "Diario: se usi la cronologia salvata (Dulce Pro), il tuo diario, ogni voce con tutti i dettagli, note comprese, viene ora salvato sul nostro relay come parte di essa, così torna dopo una reinstallazione o su un telefono nuovo (sezione 2.6).",
        "Se hai accettato la cronologia salvata prima, il tuo diario non viene salvato finché non lo accetti nell’app; puoi cambiarlo con «Salva il mio diario» (sezione 2.6).",
        "Famiglia: «Condividi il mio diario con la famiglia» decide solo se i follower lo vedono. Attivandolo, vedono il tuo diario salvato degli ultimi 90 giorni (sezioni 2.4 e 2.6).",
        "Eliminazione: disattivare «Salva il mio diario» elimina il diario salvato finché non lo condividi; gli altri modi per eliminare ora coprono anche il diario (sezioni 2.6 e 9).",
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
