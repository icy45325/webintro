import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPhilosophy } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("philosophy.title") };
}

export default async function PhilosophyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("philosophy");
  const source = await getPhilosophy(locale);
  if (!source) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 md:px-10 py-24 md:py-32">
      <header className="mb-16">
        <div className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-4">
          {t("title")}
        </div>
      </header>
      <div className="font-serif text-lg md:text-xl leading-[1.8]">
        <MDXRemote source={source} components={mdxComponents} />
      </div>
    </article>
  );
}
