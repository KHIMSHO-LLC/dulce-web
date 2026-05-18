import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

type Props = ButtonProps | AnchorProps;

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-[var(--shadow-cta-rest)] active:shadow-[var(--shadow-cta-press)]",
  secondary:
    "bg-card text-foreground border border-border-subtle hover:bg-accent-soft hover:border-accent/30",
  ghost:
    "bg-transparent text-foreground hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-label rounded-[var(--radius-button-sm)]",
  md: "h-12 px-5 text-body rounded-[var(--radius-button)]",
  lg: "h-14 px-7 text-body rounded-[var(--radius-button)]",
};

export const Button = forwardRef<HTMLElement, Props>(function Button(
  { variant = "primary", size = "md", fullWidth, className, children, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  if ("as" in rest && rest.as === "a") {
    const { as: _as, ...anchorRest } = rest;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonRest}
    >
      {children}
    </button>
  );
});
