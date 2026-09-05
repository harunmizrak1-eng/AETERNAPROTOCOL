// Canonical production domain. NEXT_PUBLIC_SITE_URL can override it (e.g. for
// preview deployments); otherwise every canonical, sitemap entry and OG url
// resolves against the real domain below.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zphctr.com"

export const siteName = "ZPHC Türkiye"

export const siteTagline = "ZPHC Türkiye Resmi Distribütörü"

export const siteDescription =
  "ZPHC Türkiye; ZPHC Pharma (Zhengzhou Pharmaceutical) peptid ve insan büyüme hormonu ürünlerinin resmi distribütörüdür. Orijinallik doğrulaması, güncel ürün kataloğu ve literatür referanslı bileşik kütüphanesi."

// Editorial review date for the site's evidence-classification claims.
// Update by hand when the literature review is actually redone; never
// derive this from the current date.
export const lastContentReview = "Ağustos 2026"
