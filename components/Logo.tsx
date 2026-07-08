import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function Logo({ ariaLabel = "Dulce" }: { ariaLabel?: string }) {
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 group"
    >
      <Image
        src="/dulce-logo.png"
        alt=""
        aria-hidden
        width={36}
        height={36}
        className="h-9 w-9 rounded-[12px] shadow-[var(--shadow-cta-rest)] transition-transform group-hover:scale-[1.03]"
      />
      <span className="text-headline font-bold tracking-tight text-foreground">
        Dulce
      </span>
    </Link>
  );
}
