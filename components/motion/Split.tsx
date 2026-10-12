import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Splits a heading into words for the rise-in reveal. Server-rendered and
 * fully visible without JavaScript; the accessible name stays the plain text.
 * Pass `slot` to place an inline element (a glyph) after word index `slotAfter`.
 */
export function Split({
  text,
  as: Tag = "h2",
  className,
  slot,
  slotAfter,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  slot?: ReactNode;
  slotAfter?: number;
  id?: string;
}) {
  const lines = text.split("\n");
  let index = 0;
  return (
    <Tag id={id} className={className} aria-label={text.replace(/\n/g, " ")} data-split>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.split(" ").map((word, wi, arr) => {
            const i = index++;
            return (
              <span key={wi}>
                <span className="split-word">
                  <span>{word}</span>
                </span>
                {slot && slotAfter === i ? (
                  <>
                    {" "}
                    {slot}
                  </>
                ) : null}
                {wi < arr.length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Lighter variant for body copy: fades and lifts as a block. */
export function Fade({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return (
    <Tag className={cn(className)} data-fade>
      {children}
    </Tag>
  );
}
