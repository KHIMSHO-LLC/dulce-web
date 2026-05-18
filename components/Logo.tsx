import { Link } from "@/i18n/navigation";

export function Logo({ ariaLabel = "Dulce" }: { ariaLabel?: string }) {
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 group"
    >
      <span
        aria-hidden
        className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-accent text-white text-headline font-bold shadow-[var(--shadow-cta-rest)] transition-transform group-hover:scale-[1.03]"
      >
        D
      </span>
      <span className="text-headline font-bold tracking-tight text-foreground">
        Dulce
      </span>
    </Link>
  );
}
