import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const sections = [
    {
      title: t("sections.product.title"),
      links: [
        { href: "/features" as const, label: t("sections.product.features") },
        { href: "/beta" as const, label: t("sections.product.beta") },
      ],
    },
    {
      title: t("sections.company.title"),
      links: [
        { href: "/about" as const, label: t("sections.company.about") },
        { href: "/contact" as const, label: t("sections.company.contact") },
      ],
    },
    {
      title: t("sections.legal.title"),
      links: [
        { href: "/legal/privacy" as const, label: t("sections.legal.privacy") },
        { href: "/legal/terms" as const, label: t("sections.legal.terms") },
        { href: "/legal/disclaimer" as const, label: t("sections.legal.disclaimer") },
        { href: "/legal/cookies" as const, label: t("sections.legal.cookies") },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-border-subtle bg-card/40">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-3">
            <Logo />
            <p className="text-label text-muted max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-caption uppercase tracking-wider font-semibold text-muted">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-label text-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-caption text-muted">
          <p>{t("copyright", { year })}</p>
          <p className="max-w-md md:text-right">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
