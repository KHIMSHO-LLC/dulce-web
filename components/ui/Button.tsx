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
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember text-ember-ink hover:bg-ember-hi shadow-[var(--shadow-cta-rest)] active:shadow-[var(--shadow-cta-press)]",
  secondary: "border border-white/15 bg-white/[0.04] text-ink hover:bg-white/10",
  ghost: "bg-transparent text-ink hover:bg-white/8",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-label",
  md: "h-12 px-6 text-body",
  lg: "h-14 px-7 text-body",
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
