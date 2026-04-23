import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";
import { getBlurDataURL } from "./placeholder";

export type WorkCategory = "built" | "concept" | "research";
export type WorkVisibility = "public" | "preview" | "nda";

export interface Collaborator {
  name: string;
  role?: string;
}

export interface WorkMeta {
  slug: string;
  locale: Locale;
  title: string;
  year: number;
  location: string;
  category: WorkCategory;
  program?: string;
  area?: number | string;
  client?: string;
  status?: string;
  visibility: WorkVisibility;
  role?: string;
  collaborators?: Collaborator[];
  photographer?: string;
  brief?: string;
  cover: string;
  coverBlur?: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
}

export interface WorkDoc {
  meta: WorkMeta;
  content: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");
const WORKS_ROOT = path.join(CONTENT_ROOT, "works");

async function safeReadDir(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

async function readWorkFile(slug: string, locale: Locale): Promise<WorkDoc | null> {
  const filePath = path.join(WORKS_ROOT, slug, `index.${locale}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const meta: WorkMeta = {
      slug,
      locale,
      title: String(data.title ?? slug),
      year: Number(data.year ?? new Date().getFullYear()),
      location: String(data.location ?? ""),
      category: (data.category ?? "built") as WorkCategory,
      program: data.program,
      area: data.area,
      client: data.client,
      status: data.status,
      visibility: (data.visibility ?? "public") as WorkVisibility,
      role: data.role,
      collaborators: data.collaborators,
      photographer: data.photographer,
      brief: data.brief,
      cover: data.cover ?? "",
      gallery: data.gallery ?? [],
      featured: Boolean(data.featured),
      order: data.order,
    };
    meta.coverBlur = await getBlurDataURL(meta.cover);
    return { meta, content };
  } catch {
    return null;
  }
}

export interface GetAllWorksOptions {
  includeNda?: boolean;
}

export async function getAllWorks(
  locale: Locale,
  opts: GetAllWorksOptions = {},
): Promise<WorkMeta[]> {
  const { includeNda = false } = opts;
  const slugs = (await safeReadDir(WORKS_ROOT)).filter((s) => !s.startsWith("."));
  const docs = await Promise.all(slugs.map((slug) => readWorkFile(slug, locale)));
  return docs
    .filter((d): d is WorkDoc => d !== null)
    .map((d) => d.meta)
    .filter((m) => includeNda || m.visibility !== "nda")
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      return b.year - a.year;
    });
}

export async function getWorkBySlug(slug: string, locale: Locale): Promise<WorkDoc | null> {
  const doc = await readWorkFile(slug, locale);
  if (!doc) return null;
  if (doc.meta.visibility === "nda") return null;
  return doc;
}

export async function getFeaturedWorks(locale: Locale, limit = 6): Promise<WorkMeta[]> {
  const all = await getAllWorks(locale);
  const featured = all.filter((w) => w.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export async function getAdjacentWorks(
  slug: string,
  locale: Locale,
): Promise<{ prev: WorkMeta | null; next: WorkMeta | null }> {
  const all = await getAllWorks(locale);
  const idx = all.findIndex((w) => w.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

async function readMarkdown(relPath: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(CONTENT_ROOT, relPath), "utf8");
  } catch {
    return null;
  }
}

export async function getPhilosophy(locale: Locale): Promise<string | null> {
  return readMarkdown(path.join("philosophy", `${locale}.mdx`));
}

export async function getCV(locale: Locale): Promise<string | null> {
  return readMarkdown(path.join("cv", `${locale}.mdx`));
}
