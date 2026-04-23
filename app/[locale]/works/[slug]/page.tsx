import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWorks, getAdjacentWorks, getWorkBySlug } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n";
import { MetaPanel } from "@/components/meta-panel";
import { mdxComponents } from "@/components/mdx-components";

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    const works = await getAllWorks(locale, { includeNda: false });
    for (const w of works) params.push({ locale, slug: w.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const doc = await getWorkBySlug(slug, locale);
  if (!doc) return {};
  return {
    title: doc.meta.title,
    description: doc.meta.brief ?? doc.meta.location,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/works/${slug}`]),
      ),
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const doc = await getWorkBySlug(slug, locale);
  if (!doc) notFound();

  const t = await getTranslations("workDetail");
  const { prev, next } = await getAdjacentWorks(slug, locale);
  const isPreview = doc.meta.visibility === "preview";

  return (
    <article>
      {/* COVER */}
      {doc.meta.cover ? (
        <div className="relative w-full aspect-[3/2] md:aspect-[16/9] bg-ink/5">
          <Image
            src={doc.meta.cover}
            alt={doc.meta.title}
            fill
            sizes="100vw"
            placeholder={doc.meta.coverBlur ? "blur" : "empty"}
            blurDataURL={doc.meta.coverBlur}
            priority
            className="object-cover"
          />
        </div>
      ) : null}

      {/* HEADER */}
      <header className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 mb-8">
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight">{doc.meta.title}</h1>
          <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-ink/50">
            {doc.meta.year} · {doc.meta.location}
          </div>
        </div>
        {doc.meta.brief ? (
          <p className="font-serif text-2xl md:text-3xl leading-[1.5] max-w-3xl text-ink/85">
            {doc.meta.brief}
          </p>
        ) : null}
      </header>

      {/* BODY */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pb-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-8">
          {isPreview ? (
            <div className="border border-ink/20 bg-ink/5 px-6 py-8 font-serif text-lg text-ink/70">
              {t("previewNotice")}
            </div>
          ) : (
            <div className="prose-like">
              <MDXRemote source={doc.content} components={mdxComponents} />
            </div>
          )}
        </div>
        <div className="md:col-span-4">
          <MetaPanel work={doc.meta} />
        </div>
      </div>

      {/* PREV / NEXT */}
      <nav className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 border-t border-ink/10 grid grid-cols-2 gap-6">
        <div>
          {prev ? (
            <Link href={`/${locale}/works/${prev.slug}`} className="group block">
              <div className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-2">
                ← {t("previous")}
              </div>
              <div className="font-serif text-xl md:text-2xl group-hover:text-accent">
                {prev.title}
              </div>
            </Link>
          ) : null}
        </div>
        <div className="text-right">
          {next ? (
            <Link href={`/${locale}/works/${next.slug}`} className="group block">
              <div className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-2">
                {t("next")} →
              </div>
              <div className="font-serif text-xl md:text-2xl group-hover:text-accent">
                {next.title}
              </div>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
