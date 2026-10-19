import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx. Article-specific components (which need the locale
 * and the article id) are passed per article in app/[locale]/blog/[slug].
 */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
