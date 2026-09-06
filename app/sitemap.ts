import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { articles } from "@/lib/articles"
import { peptides } from "@/lib/peptides"
import { products } from "@/lib/catalog"
import { localizedTopicPath, seoLocales, seoTopicIds } from "@/lib/international-seo"

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified bir dağıtım zamanı değildir. Her build'de `new Date()`
  // kullanmak değişmeyen 140 URL'yi Google'a sürekli güncellenmiş gibi
  // gösterirdi. İçerik gerçekten değiştiğinde bu tarih elle ilerletilir.
  const storefrontUpdatedAt = new Date("2026-09-06T00:00:00+03:00")
  const libraryUpdatedAt = new Date("2026-08-28T00:00:00+03:00")

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
    // Form, legal and origin-record routes remain reachable from the site but
    // are not useful search landing pages. Keeping them out of the sitemap
    // leaves crawl capacity for products, categories and editorial pages.
    "/zphc-reta",
    "/zphc-bpc-157",
    "/zphc-ghk-cu",
    "/zphc-zptrop",
    "/zphc-peptid-karisimlari",
    "/zphc-tirze",
    ...seoLocales.map((locale) => `/${locale}`),
    ...seoLocales.map((locale) => `/${locale}/products`),
    ...seoLocales.flatMap((locale) => seoTopicIds.map((topicId) => localizedTopicPath(locale, topicId))),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: storefrontUpdatedAt,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/urunler" ? 0.9 : 0.7,
  }))

  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/journal/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const peptideRoutes = peptides.map((p) => ({
    url: `${siteUrl}/peptidler/${p.slug}`,
    lastModified: libraryUpdatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/urunler/${p.slug}`,
    lastModified: storefrontUpdatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: p.image ? [`${siteUrl}${p.image}`] : undefined,
  }))

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...peptideRoutes,
    ...productRoutes,
  ]
}
