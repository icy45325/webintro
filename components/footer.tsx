import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-ink/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 flex flex-col md:flex-row justify-between gap-10 text-[11px] tracking-[0.2em] uppercase text-ink/60">
        <div className="space-y-2">
          <div className="font-serif text-base normal-case tracking-normal text-ink">
            {t("site.studio")}
          </div>
          <div>© {year} · {t("footer.rights")}</div>
        </div>
        <div className="flex gap-10">
          <Link href={`/${locale}/works`} className="hover:text-ink">{t("nav.works")}</Link>
          <Link href={`/${locale}/philosophy`} className="hover:text-ink">{t("nav.philosophy")}</Link>
          <Link href={`/${locale}/cv`} className="hover:text-ink">{t("nav.cv")}</Link>
          <Link href={`/${locale}/contact`} className="hover:text-ink">{t("nav.contact")}</Link>
        </div>
      </div>
    </footer>
  );
}
