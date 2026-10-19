import type { ReactNode } from "react";
import { PROSE } from "@/components/article/prose";

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
      <article className={PROSE}>
        {children}
      </article>
    </div>
  );
}
