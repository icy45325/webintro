import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { getWorkBySlug } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Project";

export default async function OG({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const doc = await getWorkBySlug(params.slug, params.locale);
  if (!doc) {
    return renderOgImage({ title: "Nanfeng Architects" });
  }
  return renderOgImage({
    title: doc.meta.title,
    subtitle: `${doc.meta.year} · ${doc.meta.location}`,
    tag: doc.meta.category.toUpperCase(),
  });
}
