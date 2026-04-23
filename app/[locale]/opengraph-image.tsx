import { getTranslations } from "next-intl/server";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Nanfeng Architects";

export default async function OG({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale });
  return renderOgImage({
    title: t("site.studio"),
    subtitle: t("site.tagline"),
  });
}
