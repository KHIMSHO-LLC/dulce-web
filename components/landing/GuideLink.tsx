import { ArrowRight } from "lucide-react";

/**
 * Small inline arrow link to a guide, set under a homepage chapter's copy.
 * Takes a ready href (see `guideHref` in Audience.tsx) so client chapters
 * don't pull the article registry into the browser bundle.
 */
export function GuideLink({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 text-label text-ink underline decoration-ember/60 underline-offset-4 ${className ?? ""}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
    </a>
  );
}
