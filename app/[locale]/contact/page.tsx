import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("contact.title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tSite = await getTranslations("site");

  const rows = [
    {
      label: t("emailLabel"),
      value: "hello@nanfeng.studio",
      href: "mailto:hello@nanfeng.studio",
    },
    {
      label: t("addressLabel"),
      value: locale === "zh" ? "上海市 · 徐汇区 衡山路 88 号" : "88 Hengshan Rd, Xuhui, Shanghai",
    },
    { label: t("wechatLabel"), value: "nanfeng-studio" },
    {
      label: t("instagramLabel"),
      value: "@nanfeng.studio",
      href: "https://instagram.com/nanfeng.studio",
    },
  ];

  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
      <header className="mb-16">
        <div className="text-[11px] tracking-[0.3em] uppercase text-ink/50 mb-4">
          {tSite("studio")}
        </div>
        <h1 className="font-serif text-5xl md:text-7xl">{t("title")}</h1>
        <p className="mt-6 text-ink/70 max-w-xl">{t("subtitle")}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7 space-y-8">
          <a
            href="mailto:hello@nanfeng.studio"
            className="block font-serif text-4xl md:text-6xl hover:text-accent transition-colors"
          >
            hello@nanfeng.studio ↗
          </a>

          <dl className="border-t border-ink/20 mt-12">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[140px_1fr] gap-4 border-b border-ink/10 py-4"
              >
                <dt className="text-[11px] tracking-[0.2em] uppercase text-ink/50 pt-1">
                  {row.label}
                </dt>
                <dd>
                  {row.href ? (
                    <a href={row.href} className="underline decoration-ink/30 hover:decoration-ink underline-offset-4">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <div className="aspect-square border border-ink/15 bg-bg flex items-center justify-center">
            <div className="text-center text-[11px] tracking-[0.2em] uppercase text-ink/40">
              {t("wechatLabel")} QR
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
