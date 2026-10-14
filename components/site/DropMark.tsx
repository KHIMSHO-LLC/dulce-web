import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/**
 * The Dulce drop, cut from the logo with its wave as negative space
 * (public/brand/dulce-drop.png, derived from public/dulce-logo.png).
 * Sized by height; width follows the 386:512 artwork.
 */
export function DropMark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/dulce-drop.png"
      alt=""
      aria-hidden
      width={386}
      height={512}
      priority={priority}
      sizes="160px"
      className={cn("inline-block h-[1em] w-auto select-none", className)}
    />
  );
}
