import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { articles } from "@/lib/articles"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/peptidler",
    "/journal",
    "/longevity-skoru",
    "/gizlilik",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }))

  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/journal/${a.slug}`,
    lastModified: new Date(a.date),
  }))

  return [...staticRoutes, ...articleRoutes]
}
