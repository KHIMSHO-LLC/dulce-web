/**
 * Dates of the privacy policy and terms of use, and their archived earlier versions.
 *
 * PUBLISH DAY: set PRIVACY_UPDATED and TERMS_UPDATED to the date the new text goes live
 * (the "What changed" box and the "Last updated" line use them, and the archived version's
 * "valid until" date is the day before). Spanish text prevails; the others are translations.
 */
export const PRIVACY_UPDATED = "2026-11-25";
export const TERMS_UPDATED = "2026-11-24";

export type LegalDoc = "privacy" | "terms";

/** Earlier versions kept online (noindex) at /legal/<doc>/<version>. Newest first. */
export const LEGAL_ARCHIVE: Record<LegalDoc, readonly { version: string; validFrom: string }[]> = {
  privacy: [
    { version: "2026-11-24", validFrom: "2026-11-24" },
    { version: "2026-11-16", validFrom: "2026-11-16" },
    { version: "2026-11-10", validFrom: "2026-11-10" },
  ],
  terms: [
    { version: "2026-11-16", validFrom: "2026-11-16" },
    { version: "2026-11-05", validFrom: "2026-11-05" },
  ],
};

export const CURRENT_UPDATED: Record<LegalDoc, string> = {
  privacy: PRIVACY_UPDATED,
  terms: TERMS_UPDATED,
};

/** The day before a YYYY-MM-DD date (an archived version is valid until the day before the next one). */
export function dayBefore(date: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}
