import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { LocaleSwitcher } from "./locale-switcher";

export async function Nav() {
  const t = await getTranslations();
  const locale = await getLocale();
  const items = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/works`, label: t("nav.works") },
    { href: `/${locale}/philosophy`, label: t("nav.philosophy") },
    { href: `/${locale}/cv`, label: t("nav.cv") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 md:px-10">
        <Link
          href={`/${locale}`}
          className="font-serif text-sm tracking-[0.18em] uppercase"
        >
          {t("site.studioShort")}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-[0.2em] uppercase text-ink/70 hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
        </div>
      </div>
      <div className="h-px w-full bg-ink/10" />
    </header>
  );
}
