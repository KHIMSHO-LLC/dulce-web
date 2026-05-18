import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-card rounded-[var(--radius-card-lg)] shadow-[var(--shadow-card-rest)] p-6 md:p-8",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
