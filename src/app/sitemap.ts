import type { MetadataRoute } from "next";
import { absoluteUrl } from "../config/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Trailing slashes match next.config `trailingSlash: true`
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/solutions/", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about/", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact/", changeFrequency: "monthly", priority: 0.7 },
    { path: "/technology/", changeFrequency: "monthly", priority: 0.7 },
    { path: "/case-studies/", changeFrequency: "monthly", priority: 0.7 },
    { path: "/news/", changeFrequency: "weekly", priority: 0.7 },
    { path: "/store/", changeFrequency: "monthly", priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
