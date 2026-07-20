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
 * "Download on the App Store" badge.
 *
 * The wordmark "App Store" stays in English per Apple's badge guidelines; only
 * the lead-in line is localized. Links straight to the live listing with an
 * attribution campaign so we can measure web → install.
 */
export function AppStoreBadge({ campaign, locale, className, fullWidth }: Props) {
  const lead = locale === "es" ? "Descárgalo en el" : "Download on the";
  const aria = locale === "es" ? "Descargar Dulce en el App Store" : "Download Dulce on the App Store";

  return (
    <a
      href={appStoreUrl(campaign)}
      aria-label={aria}
      className={cn(
        "inline-flex items-center gap-3 rounded-[14px] bg-black px-4 py-2.5 text-white",
        "shadow-[var(--shadow-cta-rest)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        fullWidth && "w-full justify-center",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-7 w-7 shrink-0"
        fill="currentColor"
      >
        <path d="M17.05 12.53c-.02-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.29 2-1.4 2.44-.36 6.05 1.01 8.03.67.97 1.47 2.06 2.51 2.02 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.99 2.44-1.96.77-1.12 1.09-2.21 1.11-2.27-.02-.01-2.13-.82-2.15-3.25zM15.04 6.6c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.21-.52.6-.97 1.56-.85 2.48.9.07 1.83-.46 2.39-1.13z" />
      </svg>
      <span className="flex flex-col leading-none text-left">
        <span className="text-[10px] font-medium tracking-wide opacity-90">{lead}</span>
        <span className="text-[19px] font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  );
}
