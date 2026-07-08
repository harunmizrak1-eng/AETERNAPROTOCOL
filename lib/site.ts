// Set NEXT_PUBLIC_SITE_URL in production to the real domain — this fallback
// is only for local/preview builds so metadataBase always resolves.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aeternaprotocol.com"

export const siteName = "ÆTERNA"

export const siteDescription =
  "Seçili bireyler için kanıta dayalı, kişiye özel biyolojik optimizasyon protokolleri tasarlayan özel bir longevity enstitüsü."
