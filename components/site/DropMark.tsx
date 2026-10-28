import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/**
 * The Dulce drop, cut from the logo with its wave as negative space
 * (public/brand/dulce-drop.png, derived from public/dulce-logo.png).
 * Sized by height; width follows the 386:512 artwork. It never shows more than
 * ~120px wide, so the intrinsic size is 120 and no `sizes`: the srcset is then
 * 1x/2x (128/256w) instead of every device width up to 3840.
 * Decorative everywhere it appears (alt="").
 */
export function DropMark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/dulce-drop.png"
      alt=""
      aria-hidden
      width={120}
      height={159}
      priority={priority}
      className={cn("inline-block h-[1em] w-auto select-none", className)}
    />
  );
}
