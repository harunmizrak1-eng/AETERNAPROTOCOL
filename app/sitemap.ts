import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { articles } from "@/lib/articles"
import { peptides } from "@/lib/peptides"
import { products } from "@/lib/catalog"
import { localizedTopicPath, seoLocales, seoTopicIds } from "@/lib/international-seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/urunler",
    "/dogrulama",
    "/peptidler",
    "/journal",
    "/metodoloji",
    "/sss",
    "/hakkimizda",
    "/kargo",
    "/iade",
    "/kosullar",
    "/gizlilik",
    "/zphc-reta",
    "/zphc-bpc-157",
    "/zphc-ghk-cu",
    "/zphc-zptrop",
    "/zphc-peptid-karisimlari",
    "/zphc-tirze",
    ...seoLocales.map((locale) => `/${locale}`),
    ...seoLocales.flatMap((locale) => seoTopicIds.map((topicId) => localizedTopicPath(locale, topicId))),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }))

  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/journal/${a.slug}`,
    lastModified: new Date(a.date),
  }))

  const peptideRoutes = peptides.map((p) => ({
    url: `${siteUrl}/peptidler/${p.slug}`,
    lastModified: new Date(),
  }))

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/urunler/${p.slug}`,
    lastModified: new Date(),
  }))

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...peptideRoutes,
    ...productRoutes,
  ]
}
