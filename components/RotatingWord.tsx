"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through `words`, swapping one at a time with a fade + slide-up.
 * Respects prefers-reduced-motion: it still rotates the text but drops the
 * motion, relying on a plain crossfade so it never distracts.
 */
export function RotatingWord({
  words,
  intervalMs = 2200,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span className="rotating-word inline-block align-bottom">
      {/* Keying the span restarts the enter animation on every change. */}
      <span key={index} className={className}>
        {words[index]}
      </span>
    </span>
  );
}
