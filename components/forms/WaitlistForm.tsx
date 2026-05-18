"use client";

import { useActionState, useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

const initial: WaitlistState = { status: "idle" };

export function WaitlistForm({
  source = "hero",
  variant = "stacked",
}: {
  source?: string;
  variant?: "stacked" | "inline";
}) {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const emailId = useId();
  const consentId = useId();

  const [state, formAction, pending] = useActionState(joinWaitlist, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] bg-state-in-range/10 border border-state-in-range/30 p-5 flex items-start gap-3"
      >
        <CheckCircle2 className="h-5 w-5 text-state-in-range flex-shrink-0 mt-0.5" />
        <p className="text-label font-semibold text-state-in-range">{t("success")}</p>
      </div>
    );
  }

  const errorMessage =
    state.status === "error"
      ? {
          "validation": t("errors.invalidEmail"),
          "rate-limit": t("errors.rateLimit"),
          "already-joined": t("errors.alreadyJoined"),
          "generic": t("errors.generic"),
        }[state.code]
      : null;

  return (
    <form action={formAction} className="space-y-3" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={source} />

      <div className={cn(variant === "inline" ? "flex flex-col sm:flex-row gap-2" : "space-y-2")}>
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            {t("email.label")}
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={t("email.placeholder")}
            aria-invalid={state.status === "error" ? true : undefined}
            className={cn(
              "w-full h-12 px-4 rounded-[var(--radius-button)] bg-card border border-border-subtle",
              "text-body text-foreground placeholder:text-muted/70",
              "focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors",
            )}
          />
        </div>
        <Button type="submit" size="md" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submit")
          )}
        </Button>
      </div>

      <label
        htmlFor={consentId}
        className="flex items-start gap-2.5 text-caption text-muted cursor-pointer select-none"
      >
        <input
          id={consentId}
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded-[4px] border border-border-subtle accent-accent flex-shrink-0"
        />
        <span className="leading-relaxed">
          {t.rich("consent", {
            privacy: (chunks) => (
              <Link
                href="/legal/privacy"
                className="text-accent hover:text-accent-hover underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>

      {errorMessage && (
        <p
          role="alert"
          className="text-label font-semibold text-state-low"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
