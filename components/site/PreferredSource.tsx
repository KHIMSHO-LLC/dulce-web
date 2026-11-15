import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";

/**
 * "Add Dulce as a preferred source on Google": Google's deeplink to its source
 * preferences tool (developers.google.com/search/docs/appearance/preferred-sources).
 * People who pick Dulce see our pages more often in Top Stories and get a
 * "preferred" badge in AI Mode / AI Overviews. A plain link on purpose: Google's
 * JS button loads a news.google.com script, which would need cookie consent
 * first. Not a Google logo (their brand rules), our own pill.
 */
export const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=dulceglucosa.com";

export async function PreferredSourceLink({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Footer: a short plain link like its neighbours instead of the pill. */
  compact?: boolean;
}) {
  const t = await getTranslations("preferredSource");
  if (compact) {
    return (
      <a
        href={PREFERRED_SOURCE_URL}
        target="_blank"
        rel="noopener"
        title={t("cta")}
        className={`inline-flex items-center gap-1.5 text-soft transition-colors duration-200 hover:text-ink ${className}`}
      >
        <Star className="h-3.5 w-3.5 shrink-0 text-ember" aria-hidden />
        {t("short")}
      </a>
    );
  }
  return (
    <a
      href={PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-label text-soft transition-colors duration-200 hover:border-white/25 hover:text-ink ${className}`}
    >
      <Star className="h-4 w-4 shrink-0 text-ember" aria-hidden />
      {t("cta")}
    </a>
  );
}
