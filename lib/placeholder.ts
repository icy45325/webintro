import fs from "node:fs/promises";
import path from "node:path";

const cache = new Map<string, string | undefined>();

/**
 * Returns a base64 blurDataURL for raster images; undefined for SVG or missing files.
 * Called at build time from content loaders.
 */
export async function getBlurDataURL(publicPath: string): Promise<string | undefined> {
  if (!publicPath) return undefined;
  if (publicPath.endsWith(".svg")) return undefined;
  if (cache.has(publicPath)) return cache.get(publicPath);

  const absolute = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  try {
    const buffer = await fs.readFile(absolute);
    const { getPlaiceholder } = await import("plaiceholder");
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    cache.set(publicPath, base64);
    return base64;
  } catch {
    cache.set(publicPath, undefined);
    return undefined;
  }
}
