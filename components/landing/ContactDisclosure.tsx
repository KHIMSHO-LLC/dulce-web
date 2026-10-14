"use client";

import { useId, useState } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { cn } from "@/lib/utils/cn";

/** "Write to us" opens the contact form in place, no modal, no new page. */
export function ContactDisclosure({ openLabel, closeLabel }: { openLabel: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-12 cursor-pointer items-center rounded-full border border-white/15 px-6 text-body font-semibold text-ink transition-colors hover:bg-white/8"
      >
        {open ? closeLabel : openLabel}
      </button>
      <div
        id={id}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
          open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="glass rounded-[28px] p-5 md:p-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
