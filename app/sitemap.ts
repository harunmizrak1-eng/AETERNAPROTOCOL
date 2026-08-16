import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { articles } from "@/lib/articles"
import { peptides } from "@/lib/peptides"
import { biomarkers } from "@/lib/biomarkers"
import { protocols } from "@/lib/protocols"
import { products } from "@/lib/products"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/urunler",
    "/dogrulama",
    "/bayilik",
    "/peptidler",
    "/journal",
    "/longevity-skoru",
    "/metodoloji",
    "/biyobelirtecler",
    "/sss",
    "/gizlilik",
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

  const biomarkerRoutes = biomarkers.map((b) => ({
    url: `${siteUrl}/biyobelirtecler/${b.slug}`,
    lastModified: new Date(),
  }))

  const protocolRoutes = protocols.map((p) => ({
    url: `${siteUrl}/protokoller/${p.slug}`,
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
    ...biomarkerRoutes,
    ...protocolRoutes,
    ...productRoutes,
  ]
}
