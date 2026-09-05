/** Kullanıcının sağladığı güncel Türkiye satış fiyatları.
 *
 * Ürün kataloğu üreticiden otomatik üretildiği için fiyatları generated
 * lib/products.ts dosyasına yazmıyoruz. Böylece katalog yenilendiğinde
 * Türkiye fiyatları kaybolmaz. */
export const productPrices: Record<string, number> = {
  "bpc157-25mg-5x5mg-zphc": 11_000,
  "ghk-cu-60mg-with-bacteriostatic-water-zphc": 6_000,
  "ghk-cu-200mg-zphc": 12_000,
  "double-burn-mix-5mg-5x5mg-zphc": 9_000,
  "ghrp-6-25mg-5x5mg-zphc": 10_000,
  "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc": 8_000,
  "ultra-rehab-mix-50mg-5x10mg-zphc": 13_000,
  "hgh-fragment-176-191-50mg-5x10mg-zphc": 9_000,
  "super-slim-mix-55mg-5x11mg-zphc": 13_000,
  "retatrutide-20mg-5x4mg-zphc": 12_000,
  "retatrutide-40mg-5x8mg-zphc": 16_000,
  "retatrutide-60mg-5x12mg-zphc": 19_000,
  "retatrutide-30mg-aq-pen-zphc": 19_000,
  "igf1-lr3-1mg-5x0p2mg-zphc": 10_500,
  "mots-c-20mg-with-bacteriostatic-water-zphc": 12_000,
  "mega-mass-mix-10mg-5x10mg-zphc": 10_000,
  "nad-plus-2500mg-zphc": 13_000,
  "reta-zphc-120-mg-5-vials-x-24-mg": 26_000,
  "tb500-25mg-5x5mg-zphc": 9_000,
  "wellness-mix-25mg-5x5mg-zphc": 12_000,
  "zptrop-hgh-100iu-aq-vial-zphc": 9_000,
}

export const featuredProductSlugs = [
  "retatrutide-20mg-5x4mg-zphc",
  "retatrutide-30mg-aq-pen-zphc",
  "bpc157-25mg-5x5mg-zphc",
  "ghk-cu-60mg-with-bacteriostatic-water-zphc",
  "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc",
  "hgh-fragment-176-191-50mg-5x10mg-zphc",
  "tb500-25mg-5x5mg-zphc",
  "zptrop-hgh-100iu-aq-vial-zphc",
]

const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
})

export function getProductPrice(slug: string) {
  return productPrices[slug]
}

export function formatProductPrice(price: number) {
  return priceFormatter.format(price)
}
