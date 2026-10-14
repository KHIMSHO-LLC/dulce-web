"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * A working miniature of the follower nudge: the message arrives, the visitor
 * answers with the same one tap the app offers, and the reply is sent.
 */
export function NudgeDemo({
  from,
  incoming,
  question,
  reply,
  sent,
  again,
}: {
  from: string;
  incoming: string;
  question: string;
  reply: string;
  sent: string;
  again: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <div className="relative w-full max-w-[24rem] border-t border-white/12 pt-5" aria-live="polite">
      <div>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ember text-body font-semibold text-ember-ink">
            {from[0]}
          </span>
          <div className="min-w-0">
            <p className="truncate text-label font-semibold text-ink">{incoming}</p>
            <p className="text-label text-soft">{question}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            disabled={done}
            onClick={() => setDone(true)}
            className={cn(
              "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-label font-semibold transition-[background-color,color,transform] duration-300 active:scale-[0.97]",
              done ? "bg-range/20 text-range-text" : "bg-ember text-ember-ink hover:bg-ember-hi",
            )}
          >
            {done ? <Check className="h-4 w-4" strokeWidth={2.2} aria-hidden /> : null}
            {reply}
          </button>
          {done ? (
            <button
              type="button"
              onClick={() => setDone(false)}
              aria-label={again}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-mute transition-colors hover:text-ink"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.8} aria-hidden />
            </button>
          ) : null}
        </div>
      </div>
      <p
        className={cn(
          "mt-3 pl-1 text-label text-range-text transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
          done ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        {done ? sent : " "}
      </p>
    </div>
  );
}
