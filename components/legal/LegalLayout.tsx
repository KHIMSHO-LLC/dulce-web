import type { ReactNode } from "react";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page relative z-10 pb-16 pt-28 md:pt-36">
      <header className="mb-14 max-w-3xl">
        <h1 className="type-display text-[clamp(2.6rem,5.6vw,5rem)] text-ink">{title}</h1>
        <p className="mt-5 text-label text-mute">{lastUpdated}</p>
      </header>
      <article
        className="
          max-w-3xl
          [&_h2]:mb-3 [&_h2]:mt-14 [&_h2]:scroll-mt-24 [&_h2]:text-[1.6rem] [&_h2]:font-light [&_h2]:tracking-[-0.02em] [&_h2]:text-ink
          [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-[1.15rem] [&_h3]:font-medium [&_h3]:text-ink
          [&_p]:mt-3 [&_p]:text-body [&_p]:leading-relaxed [&_p]:text-soft
          [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-body [&_ul]:leading-relaxed [&_ul]:text-soft
          [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-body [&_ol]:text-soft
          [&_a]:text-ember [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-ember-hi
          [&_strong]:font-semibold [&_strong]:text-ink
          [&_blockquote]:my-6 [&_blockquote]:rounded-[18px] [&_blockquote]:border [&_blockquote]:border-ember/30 [&_blockquote]:bg-ember/10 [&_blockquote]:px-5 [&_blockquote]:py-3
          [&_blockquote_p]:font-medium [&_blockquote_p]:text-ink
        "
      >
        {children}
      </article>
    </div>
  );
}
