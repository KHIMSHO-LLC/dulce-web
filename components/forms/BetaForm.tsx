"use client";

import { useActionState, useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { applyForBeta, type BetaState } from "@/app/actions/beta";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

const initial: BetaState = { status: "idle" };

const cgmOptions = ["libre2", "libre3", "dexcomG6", "dexcomG7", "nightscout", "none"] as const;
const regionOptions = ["es", "mx", "other"] as const;

const inputClass = cn(
  "w-full h-12 px-4 rounded-[var(--radius-button)] bg-card border border-border-subtle",
  "text-body text-foreground placeholder:text-muted/70",
  "focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors",
);

export function BetaForm() {
  const t = useTranslations("beta.form");
  const locale = useLocale();
  const ids = {
    name: useId(),
    email: useId(),
    cgm: useId(),
    region: useId(),
    notes: useId(),
    consent: useId(),
  };

  const [state, formAction, pending] = useActionState(applyForBeta, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card-lg)] bg-state-in-range/10 border border-state-in-range/30 p-6 flex items-start gap-3"
      >
        <CheckCircle2 className="h-6 w-6 text-state-in-range flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-headline font-bold text-state-in-range">{t("success")}</p>
        </div>
      </div>
    );
  }

  const errorMessage =
    state.status === "error"
      ? {
          validation: t("errors.validation"),
          "rate-limit": t("errors.rateLimit"),
          generic: t("errors.generic"),
        }[state.code]
      : null;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <div className="space-y-1.5">
        <label htmlFor={ids.name} className="text-label font-semibold text-foreground">
          {t("name.label")}
        </label>
        <input
          id={ids.name}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t("name.placeholder")}
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor={ids.email} className="text-label font-semibold text-foreground">
          {t("email.label")}
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={t("email.placeholder")}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor={ids.cgm} className="text-label font-semibold text-foreground">
            {t("cgm.label")}
          </label>
          <select id={ids.cgm} name="cgm_device" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              —
            </option>
            {cgmOptions.map((opt) => (
              <option key={opt} value={opt}>
                {t(`cgm.options.${opt}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor={ids.region} className="text-label font-semibold text-foreground">
            {t("region.label")}
          </label>
          <select id={ids.region} name="region" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              —
            </option>
            {regionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {t(`region.options.${opt}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor={ids.notes} className="text-label font-semibold text-foreground">
          {t("notes.label")}
        </label>
        <textarea
          id={ids.notes}
          name="notes"
          rows={4}
          placeholder={t("notes.placeholder")}
          className={cn(inputClass, "h-auto py-3 leading-relaxed resize-y min-h-[7rem]")}
        />
      </div>

      <label
        htmlFor={ids.consent}
        className="flex items-start gap-2.5 text-caption text-muted cursor-pointer select-none"
      >
        <input
          id={ids.consent}
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

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={pending}>
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

      {errorMessage && (
        <p role="alert" className="text-label font-semibold text-state-low">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
