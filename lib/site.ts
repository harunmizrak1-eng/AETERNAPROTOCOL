// Set NEXT_PUBLIC_SITE_URL in production to the real domain — this fallback
// is only for local/preview builds so metadataBase always resolves.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aeternaprotocol.com"

export const siteName = "ÆTERNA"

export const siteDescription =
  "Seçili bireyler için kanıta dayalı, kişiye özel biyolojik optimizasyon protokolleri tasarlayan özel bir longevity enstitüsü."

// Editorial review date for the site's evidence-classification claims.
// Update by hand when the literature review is actually redone — never
// derive this from the current date.
export const lastContentReview = "Temmuz 2026"
