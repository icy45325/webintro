import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllWorks } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n";
import { WorkGrid } from "@/components/work-grid";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("works.title"),
    description: t("works.subtitle"),
  };
}

export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("works");
  const works = await getAllWorks(locale);

  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-32">
      <header className="mb-16 md:mb-20">
        <div className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-4">
          {t("subtitle")}
        </div>
        <h1 className="font-serif text-5xl md:text-7xl">{t("title")}</h1>
      </header>
      <WorkGrid works={works} />
    </section>
  );
}
