// Canonical production domain. NEXT_PUBLIC_SITE_URL can override it (e.g. for
// preview deployments); otherwise every canonical, sitemap entry and OG url
// resolves against the real domain below.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aeternaprotocol.net"

export const siteName = "ÆTERNA"

export const siteDescription =
  "Seçili bireyler için kanıta dayalı, kişiye özel biyolojik optimizasyon protokolleri tasarlayan özel bir longevity enstitüsü."

// Editorial review date for the site's evidence-classification claims.
// Update by hand when the literature review is actually redone; never
// derive this from the current date.
export const lastContentReview = "Temmuz 2026"
