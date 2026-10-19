import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { CATEGORY_LABEL, type Article } from "@/content/articles";

/** Article teaser: picture, category, title. Used by the index, author pages and "keep reading". */
export function ArticleCard({
  article,
  locale,
  readLabel,
}: {
  article: Article;
  locale: AppLocale;
  readLabel: string;
}) {
  return (
    <Link
      href={{ pathname: "/blog/[slug]", params: { slug: article.slug[locale] } }}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/8 bg-glass transition-colors hover:border-white/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ground-2">
        <Image
          src={article.image}
          alt={article.imageAlt[locale]}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-[50%_58%] opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-caption uppercase tracking-wide text-mute">{CATEGORY_LABEL[article.category][locale]}</p>
        <p className="mt-2 font-medium leading-snug text-ink">{article.title[locale]}</p>
        <p className="mt-auto pt-4 text-label text-ember">{readLabel} →</p>
      </div>
    </Link>
  );
}
