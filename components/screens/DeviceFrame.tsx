import { cn } from "@/lib/utils/cn";
import { ScreenCanvas } from "./ScreenCanvas";
import type { ScreenName } from "./draw";
import type { ScreenLocale } from "./strings";

/**
 * A flat phone or watch around one depicted screen: the static stand-in for
 * the 3D stage (reduced motion, no WebGL) and the visual inside cards.
 */
export function DeviceFrame({
  name,
  locale,
  label,
  className,
  kind = "phone",
  progress,
}: {
  name: ScreenName;
  locale: ScreenLocale;
  label: string;
  className?: string;
  kind?: "phone" | "watch";
  progress?: number;
}) {
  return (
    <div
      className={cn(
        "relative bg-[#0a0909] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]",
        kind === "phone" ? "rounded-[13%/6%] p-[3.2%]" : "rounded-[24%/20%] p-[5%]",
        "ring-[5px] ring-[#4d4036]",
        className,
      )}
    >
      <div className={cn("overflow-hidden", kind === "phone" ? "rounded-[10.5%/4.9%]" : "rounded-[20%/16%]")}>
        <ScreenCanvas name={name} locale={locale} label={label} progress={progress} />
      </div>
    </div>
  );
}
