import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://go-ai.one";

/** Paths with trailing slash to match next.config `trailingSlash: true`. */
export function pagePath(path: string): string {
  if (path === "/" || path === "") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function absoluteUrl(path: string): string {
  const p = pagePath(path);
  return p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}

/** Page metadata with a self-referencing canonical (does not inherit homepage). */
export function pageMetadata({
  title,
  description,
  path,
  robots,
}: {
  title: string;
  description: string;
  path: string;
  robots?: Metadata["robots"];
}): Metadata {
  const canonical = pagePath(path);
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    ...(robots ? { robots } : {}),
  };
}
