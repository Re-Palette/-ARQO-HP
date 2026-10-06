import type { MetadataRoute } from "next";
import { news, services, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/about", 0.8),
    page("/service", 0.8),
    ...services.map((s) => page(`/service/${s.slug}`, 0.7)),
    page("/news", 0.7, "weekly"),
    ...news.map((n) => ({ ...page(`/news/${n.slug}`, 0.5, "yearly"), lastModified: new Date(n.date) })),
    page("/contact", 0.6),
    page("/privacy", 0.2, "yearly"),
  ];
}
