import { appStoreUrl, type StoreCampaign } from "@/lib/appStore";
import { cn } from "@/lib/utils/cn";

type Props = {
  /** Which web placement this badge is — feeds the App Analytics `ct` token. */
  campaign: StoreCampaign;
  locale: "es" | "en";
  className?: string;
  /** Renders full-width (useful inside stacked mobile CTAs). */
  fullWidth?: boolean;
};

/**
 * Official "Download on the App Store" badge artwork (from Apple's badge
 * generator at tools.applemediaservices.com), per Apple's Marketing Guidelines:
 * https://developer.apple.com/app-store/marketing/guidelines/ — the artwork
 * itself must not be redrawn, recolored, or have its proportions changed, so
 * this renders the untouched SVG rather than a custom reconstruction. Only
 * the surrounding clear space and link behavior are ours to control.
 */
export function AppStoreBadge({ campaign, locale, className, fullWidth }: Props) {
  const aria = locale === "es" ? "Descargar Dulce en el App Store" : "Download Dulce on the App Store";
  const src = locale === "es" ? "/badges/app-store-badge-es.svg" : "/badges/app-store-badge-en.svg";

  return (
    <a
      href={appStoreUrl(campaign)}
      aria-label={aria}
      className={cn(
        "inline-flex items-center transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-[10px]",
        fullWidth && "w-full justify-center",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden width={150} height={50} className="h-[50px] w-auto" />
    </a>
  );
}
