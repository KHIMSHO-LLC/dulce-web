import { ArrowUpRight } from "lucide-react";
import { appStoreUrl, type StoreCampaign } from "@/lib/appStore";
import { cn } from "@/lib/utils/cn";

/** The ember action. Always the install, always one intent: download. */
export function DownloadButton({
  label,
  campaign,
  className,
  size = "lg",
}: {
  label: string;
  campaign: StoreCampaign;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={appStoreUrl(campaign)}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ember font-semibold text-ember-ink",
        "shadow-[var(--shadow-cta-rest)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-out-expo)]",
        "hover:bg-ember-hi active:translate-y-px active:shadow-[var(--shadow-cta-press)]",
        size === "lg" ? "h-12 pl-6 pr-5 text-body" : "h-10 pl-4 pr-3.5 text-label",
        className,
      )}
    >
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2}
        aria-hidden
      />
    </a>
  );
}
