import { JsonLd } from "@/components/JsonLd";
import { getPost, type BlogSlug } from "@/lib/blog";
import { blogPostingSchema, articleBreadcrumbs } from "@/lib/schema";
import type { AppLocale } from "@/i18n/routing";

/**
 * Emits BlogPosting + BreadcrumbList JSON-LD for an article. Drop this at the
 * top of a post so the page is eligible for article + breadcrumb rich results.
 */
export function ArticleSchema({ slug, locale }: { slug: BlogSlug; locale: AppLocale }) {
  const post = getPost(slug);
  return (
    <>
      <JsonLd data={blogPostingSchema(post, locale)} />
      <JsonLd data={articleBreadcrumbs(post, locale)} />
    </>
  );
}
