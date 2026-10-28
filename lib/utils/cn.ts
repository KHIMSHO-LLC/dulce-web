import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scale, so it read our type sizes
 * (`text-body`, `text-label`, ... from globals.css @theme) as text colours and
 * dropped the real colour next to them: the hero download button lost
 * `text-ember-ink` and rendered light-on-ember (contrast 2.7).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display-xl", "display-lg", "display", "headline", "body", "label", "caption"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
