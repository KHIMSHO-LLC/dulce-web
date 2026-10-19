/**
 * Long-form reading styles, shared by legal pages and articles so both read
 * the same. Applied to the element that wraps rendered markdown.
 */
export const PROSE = `
  max-w-[68ch]
  [&_h2]:mb-3 [&_h2]:mt-14 [&_h2]:scroll-mt-24 [&_h2]:text-[1.6rem] [&_h2]:font-light [&_h2]:tracking-[-0.02em] [&_h2]:text-ink
  [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-[1.15rem] [&_h3]:font-medium [&_h3]:text-ink
  [&_p]:mt-4 [&_p]:text-[1.0625rem] [&_p]:leading-[1.75] [&_p]:text-soft
  [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-[1.0625rem] [&_ul]:leading-relaxed [&_ul]:text-soft
  [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-body [&_ol]:text-soft
  [&_a]:text-ember [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-ember-hi
  [&_strong]:font-semibold [&_strong]:text-ink
  [&_blockquote]:my-6 [&_blockquote]:rounded-[18px] [&_blockquote]:border [&_blockquote]:border-ember/30 [&_blockquote]:bg-ember/10 [&_blockquote]:px-5 [&_blockquote]:py-3
  [&_blockquote_p]:font-medium [&_blockquote_p]:text-ink
  [&_table]:mt-6 [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-label md:[&_table]:table
  [&_th]:border-b [&_th]:border-white/15 [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-ink
  [&_td]:border-b [&_td]:border-white/8 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_td]:text-soft
`;
