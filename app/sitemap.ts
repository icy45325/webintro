import type { MetadataRoute } from "next";
import { getAllWorks } from "@/lib/content";
import { locales } from "@/lib/i18n";

const BASE = "https://nanfeng.studio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    for (const slug of ["", "works", "philosophy", "cv", "contact"]) {
      entries.push({
        url: `${BASE}/${locale}${slug ? `/${slug}` : ""}`,
        lastModified: now,
      });
    }
    const works = await getAllWorks(locale);
    for (const w of works) {
      entries.push({
        url: `${BASE}/${locale}/works/${w.slug}`,
        lastModified: now,
      });
    }
  }

  return entries;
}
