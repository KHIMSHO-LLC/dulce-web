import type { ReactNode } from "react";

/**
 * One glossary entry in content/tools/cgm-glossary/<locale>.mdx:
 * `<Term id="tir" name="Time in range (TIR)">definition</Term>`.
 * `id` is the anchor, the same in every language. The page also reads these blocks from the MDX
 * source for the DefinedTermSet JSON-LD and the term index (see termsFromSource).
 */
export function Term({ id, name, children }: { id: string; name: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 border-t border-white/10 pb-1 pt-5 first:border-t-0">
      <h3 className="!mt-0">
        <a href={`#${id}`} className="!text-ink !no-underline hover:!text-ember">
          {name}
        </a>
      </h3>
      <div className="[&>p:first-child]:!mt-2">{children}</div>
    </div>
  );
}

export type GlossaryEntry = { id: string; name: string; description: string };

/** Terms (id, name, plain-text definition) from the MDX source of the glossary. */
export function termsFromSource(source: string): GlossaryEntry[] {
  const out: GlossaryEntry[] = [];
  for (const m of source.matchAll(/<Term\s+id="([^"]+)"\s+name="([^"]+)"\s*>([\s\S]*?)<\/Term>/g)) {
    const description = m[3]!
      .replace(/<ArticleLink[^>]*>([\s\S]*?)<\/ArticleLink>/g, "$1")
      .replace(/<PageLink[^>]*>([\s\S]*?)<\/PageLink>/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/\*\*|__|`/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    out.push({ id: m[1]!, name: m[2]!, description });
  }
  return out;
}
