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
    ...seoLocales.map((locale) => `/${locale}/products`),
    ...seoLocales.flatMap((locale) => seoTopicIds.map((topicId) => localizedTopicPath(locale, topicId))),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: storefrontUpdatedAt,
  }))

  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/journal/${a.slug}`,
    lastModified: new Date(a.date),
  }))

  const peptideRoutes = peptides.map((p) => ({
    url: `${siteUrl}/peptidler/${p.slug}`,
    lastModified: libraryUpdatedAt,
  }))

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/urunler/${p.slug}`,
    lastModified: storefrontUpdatedAt,
    images: p.image ? [`${siteUrl}${p.image}`] : undefined,
  }))

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...peptideRoutes,
    ...productRoutes,
  ]
}
