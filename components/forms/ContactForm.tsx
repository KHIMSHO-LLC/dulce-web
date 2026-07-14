"use client";

import { useActionState, useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const initial: ContactState = { status: "idle" };

const inputClass = cn(
  "w-full px-4 py-3 rounded-[var(--radius-button)] bg-background border border-border-subtle",
  "text-body text-foreground placeholder:text-muted/60",
  "focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors",
);

const labelClass = "block text-label font-semibold text-foreground mb-1.5";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();

  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  const [state, formAction, pending] = useActionState(sendContactMessage, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] bg-state-in-range/10 border border-state-in-range/30 p-6 flex items-start gap-3"
      >
        <CheckCircle2 className="h-5 w-5 text-state-in-range flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-label font-bold text-state-in-range">{t("success.title")}</p>
          <p className="text-label text-state-in-range/80 mt-1">{t("success.body")}</p>
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

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={nameId} className={labelClass}>
            {t("name.label")}
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={t("name.placeholder")}
            aria-invalid={state.status === "error" ? true : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={emailId} className={labelClass}>
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
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={subjectId} className={labelClass}>
          {t("subject.label")}
        </label>
        <input
          id={subjectId}
          type="text"
          name="subject"
          required
          placeholder={t("subject.placeholder")}
          aria-invalid={state.status === "error" ? true : undefined}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={messageId} className={labelClass}>
          {t("message.label")}
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={6}
          placeholder={t("message.placeholder")}
          aria-invalid={state.status === "error" ? true : undefined}
          className={cn(inputClass, "resize-none")}
        />
      </div>

      {errorMessage && (
        <p role="alert" className="text-label font-semibold text-state-low">
          {errorMessage}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}
