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
    <div className="container-page py-16 md:py-24">
      <header className="max-w-3xl mb-12">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          Legal
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {title}
        </h1>
        <p className="mt-3 text-label text-muted">{lastUpdated}</p>
      </header>
      <article
        className="
          max-w-3xl
          [&_h2]:text-display [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:scroll-mt-24
          [&_h3]:text-headline [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2
          [&_p]:text-body [&_p]:text-muted [&_p]:leading-relaxed [&_p]:mt-3
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-3 [&_ul]:text-body [&_ul]:text-muted [&_ul]:space-y-2 [&_ul]:leading-relaxed
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mt-3 [&_ol]:text-body [&_ol]:text-muted [&_ol]:space-y-2
          [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-hover
          [&_strong]:text-foreground [&_strong]:font-semibold
          [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-accent-soft [&_blockquote]:py-3 [&_blockquote]:px-5 [&_blockquote]:my-6 [&_blockquote]:rounded-r-[var(--radius-card)]
          [&_blockquote_p]:text-foreground [&_blockquote_p]:font-semibold
        "
      >
        {children}
      </article>
    </div>
  );
}
