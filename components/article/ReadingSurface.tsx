import type { ReactNode } from "react";

/**
 * A calm, near-opaque sheet for long reading. The landing page's atmosphere
 * (moving chart, light beams) stays visible around it but never behind text.
 */
export function ReadingSurface({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 px-2 pb-6 pt-20 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1180px] rounded-[32px] border border-white/[0.06] bg-ground/[0.96] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        {children}
      </div>
    </div>
  );
}
