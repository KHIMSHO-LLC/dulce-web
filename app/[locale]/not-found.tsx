import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="container-page py-24 md:py-32 text-center">
      <p className="text-caption font-semibold uppercase tracking-wider text-accent">404</p>
      <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
        {t("headline")}
      </h1>
      <p className="mt-4 text-headline text-muted max-w-xl mx-auto leading-snug">{t("body")}</p>
      <div className="mt-8 inline-flex">
        <Button as="a" href="/" size="lg">
          {t("cta")}
        </Button>
      </div>
    </div>
  );
}
