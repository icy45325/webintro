import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getFeaturedWorks, getPhilosophy } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n";
import { WorkCard } from "@/components/work-card";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("meta.homeTitle"),
    description: t("meta.homeDescription"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [featured, philosophy] = await Promise.all([
    getFeaturedWorks(locale, 6),
    getPhilosophy(locale),
  ]);
  const philosophyExcerpt = philosophy ? philosophy.split("\n\n").slice(0, 2).join("\n\n") : null;

  return (
    <>
      {/* HERO */}
      <section className="relative h-[calc(100vh-56px)] flex flex-col">
        <div className="flex-1 flex items-end px-6 md:px-10 pb-16 md:pb-24 max-w-[1600px] mx-auto w-full">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-8">
              {t("site.studio")}
            </div>
            <h1 className="font-serif text-[44px] md:text-[88px] leading-[1.02] tracking-tight">
              {t("site.tagline")}
            </h1>
          </div>
        </div>
        <div className="px-6 md:px-10 pb-6 flex justify-between items-end text-[11px] tracking-[0.2em] uppercase text-ink/50">
          <span className="font-mono">— {new Date().getFullYear()}</span>
          <span>{t("home.scroll")} ↓</span>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl">{t("home.selectedWorks")}</h2>
          <Link
            href={`/${locale}/works`}
            className="text-[12px] tracking-[0.2em] uppercase text-ink hover:text-accent"
          >
            {t("home.viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {featured.map((w, i) => (
            <WorkCard key={w.slug} work={w} index={i} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* PHILOSOPHY EXCERPT */}
      {philosophyExcerpt ? (
        <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32 border-t border-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <div className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-4">
                {t("home.philosophyHeading")}
              </div>
              <Link
                href={`/${locale}/philosophy`}
                className="font-serif text-2xl hover:text-accent"
              >
                {t("home.philosophyReadMore")}
              </Link>
            </div>
            <div className="md:col-span-7 md:col-start-6 font-serif text-xl md:text-2xl leading-[1.6] text-ink/85">
              <MDXRemote source={philosophyExcerpt} components={mdxComponents} />
            </div>
          </div>
        </section>
      ) : null}

      {/* CONTACT CTA */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32 border-t border-ink/10">
        <Link
          href={`/${locale}/contact`}
          className="group flex items-baseline justify-between"
        >
          <span className="font-serif text-4xl md:text-7xl tracking-tight group-hover:text-accent transition-colors">
            {t("home.contactCta")}
          </span>
          <span className="text-xl md:text-3xl group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </section>
    </>
  );
}
