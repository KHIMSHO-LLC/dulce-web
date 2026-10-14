"use client";

import { useEffect, useId, useRef, useState } from "react";
import { QrCode, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Desktop hand-off: a round button that opens a small card with the App Store
 * QR code (public/appstore-qr.svg encodes the `web_qr` campaign link).
 */
export function QrButton({
  openLabel,
  caption,
  className,
  placement = "top",
}: {
  openLabel: string;
  caption: string;
  className?: string;
  placement?: "top" | "bottom";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={wrap} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={openLabel}
        onClick={() => setOpen((v) => !v)}
        className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/12 bg-white/[0.04] text-ink transition-[background-color,transform] duration-200 hover:bg-white/10 active:scale-95"
      >
        {open ? <X className="h-5 w-5" strokeWidth={1.6} /> : <QrCode className="h-5 w-5" strokeWidth={1.6} />}
      </button>
      <div
        id={id}
        role="dialog"
        aria-label={caption}
        className={cn(
          "glass absolute left-0 z-50 w-56 origin-bottom-left rounded-[22px] p-3 transition-[opacity,transform,filter] duration-300 ease-[var(--ease-out-expo)]",
          placement === "top" ? "bottom-[calc(100%+12px)]" : "top-[calc(100%+12px)] origin-top-left",
          open ? "visible scale-100 opacity-100 blur-0" : "invisible scale-95 opacity-0 blur-[6px]",
        )}
      >
        <div className="rounded-[14px] bg-[#f6f0ea] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/appstore-qr.svg" alt="" width={176} height={176} className="h-auto w-full" />
        </div>
        <p className="px-1 pb-1 pt-3 text-label text-soft">{caption}</p>
      </div>
    </div>
  );
}
