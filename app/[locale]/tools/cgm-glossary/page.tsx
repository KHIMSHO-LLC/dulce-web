import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { ToolPage } from "@/components/tools/ToolPage";
import { Term, termsFromSource } from "@/components/tools/GlossaryTerm";
import { definedTermSetSchema } from "@/lib/schema";
import { absoluteUrl, localizedPath, pageTitle, seoFor } from "@/lib/seo";
import { TOOL_COPY, toolByPath } from "@/lib/tools";

const PATH = "/tools/cgm-glossary" as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/cgm-glossary">): Promise<Metadata> {
  const { locale } = await params;
  const loc = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const copy = TOOL_COPY[PATH][loc];
  return { title: pageTitle(copy.title), description: copy.description, ...seoFor(loc, PATH, copy) };
}

/**
 * Plain-language CGM glossary: content/tools/cgm-glossary/<locale>.mdx, one `<Term id name>` per
 * entry (ids are the anchors, identical in every language). The term index under the title and the
 * DefinedTermSet JSON-LD are built from that same file.
 */
export default async function Page({ params }: PageProps<"/[locale]/tools/cgm-glossary">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "blog" });
  const copy = TOOL_COPY[PATH][loc];
  const source = readFileSync(join(process.cwd(), "content/tools/cgm-glossary", `${loc}.mdx`), "utf8");
  const terms = termsFromSource(source);

  const index = (
    <nav aria-label={t("glossaryLabel")}>
      <ul className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <li key={term.id}>
            <a
              href={`#${term.id}`}
              className="inline-block rounded-full border border-white/12 px-3.5 py-1.5 text-label text-soft transition-colors hover:border-ember/60 hover:text-ink"
            >
              {term.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <ToolPage
      locale={loc}
      path={PATH}
      name="cgm-glossary"
      calculator={index}
      eyebrow={t("glossaryLabel")}
      extraComponents={{ Term }}
      schema={definedTermSetSchema({
        url: absoluteUrl(localizedPath(loc, PATH)),
        name: copy.title,
        description: copy.description,
        locale: loc,
        dateModified: toolByPath(PATH).dateModified,
        terms,
      })}
    />
  );
}
