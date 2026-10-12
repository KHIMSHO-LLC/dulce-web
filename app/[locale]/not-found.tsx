import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="container-page relative z-10 flex min-h-[80vh] flex-col justify-center py-32">
      <p className="type-numeral text-[clamp(6rem,18vw,14rem)] leading-none text-ember">404</p>
      <h1 className="type-display mt-6 text-[clamp(2.2rem,4.6vw,4rem)] text-ink">{t("headline")}</h1>
      <p className="mt-4 max-w-xl text-[1.125rem] leading-relaxed text-soft">{t("body")}</p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-full bg-ember px-6 font-semibold text-ember-ink transition-colors hover:bg-ember-hi"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
