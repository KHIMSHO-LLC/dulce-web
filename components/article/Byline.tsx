import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { AUTHORS, type AuthorId } from "@/content/authors";
import { formatDate } from "@/lib/dates";

/**
 * Author + "Updated <date>" under a page title. The date must be the same one
 * the page's JSON-LD gives as dateModified.
 */
export async function Byline({
  locale,
  author: id,
  dateModified,
  extra,
}: {
  locale: AppLocale;
  author: AuthorId;
  dateModified: string;
  extra?: string;
}) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const author = AUTHORS[id];
  return (
    <div className="mt-8 flex items-center gap-3 text-label text-mute">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember/15 text-label font-semibold text-ember">
        {author.initials}
      </span>
      <div>
        <Link
          href={{ pathname: "/authors/[author]", params: { author: author.slug } }}
          className="font-medium text-ink transition-colors hover:text-ember"
        >
          {t("by", { name: author.name })}
        </Link>
        <p>
          <time dateTime={dateModified}>{t("updated", { date: formatDate(dateModified, locale) })}</time>
          {extra ? ` · ${extra}` : null}
        </p>
      </div>
    </div>
  );
}

/**
 * The 2-3 sentence direct answer under the H1. Falls back to the page
 * description until the summary is written, flagged in development only.
 */
export function AnswerFirst({ summary, fallback }: { summary?: string; fallback: string }) {
  return (
    <>
      <p className="mt-5 text-[1.125rem] leading-relaxed text-soft">{summary ?? fallback}</p>
      {!summary && process.env.NODE_ENV === "development" ? (
        <p className="mt-2 rounded-lg border border-dashed border-ember/60 px-3 py-2 text-label text-ember">
          TODO: answer-first summary (2-3 sentences) in content/articles.ts `summary`.
        </p>
      ) : null}
    </>
  );
}
