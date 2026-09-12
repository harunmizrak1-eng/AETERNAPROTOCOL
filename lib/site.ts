// Canonical production domain. NEXT_PUBLIC_SITE_URL can override it (e.g. for
// preview deployments); otherwise every canonical, sitemap entry and OG url
// resolves against the real domain below.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zphctr.com"

export const siteName = "ZPHC Türkiye"

export const siteTagline = "ZPHC Türkiye Ürün Kataloğu"

export const siteDescription =
  "ZPHC Türkiye ürün kataloğu; peptid ve araştırma ürünleri için güncel ürün bilgileri, orijinallik doğrulaması ve literatür referanslı bileşik kütüphanesi sunar."

// Editorial review date for the site's evidence-classification claims.
// Update by hand when the literature review is actually redone; never
// derive this from the current date.
export const lastContentReview = "Eylül 2026"
