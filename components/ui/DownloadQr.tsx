import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

type Props = {
  locale: "es" | "en";
  className?: string;
};

/**
 * Desktop download affordance. Most visitors browse on a laptop but install on
 * their phone, so we show a scannable QR (→ App Store) alongside the badge.
 * Hidden on small screens where the badge alone is enough.
 */
export function DownloadQr({ locale, className }: Props) {
  const caption = locale === "es" ? "Escanéalo para descargar en tu iPhone" : "Scan to download on your iPhone";

  return (
    <div className={`hidden md:flex items-center gap-4 ${className ?? ""}`}>
      <div className="rounded-[var(--radius-card)] bg-white p-2.5 shadow-[var(--shadow-card-rest)] border border-border-subtle">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/appstore-qr.svg" alt="" aria-hidden width={88} height={88} className="h-[88px] w-[88px]" />
      </div>
      <div className="flex flex-col gap-2">
        <AppStoreBadge campaign="web_hero" locale={locale} />
        <span className="text-caption text-muted">{caption}</span>
      </div>
    </div>
  );
}
