/** Ana sayfadaki "çok satan" şeritlerinin içeriği.
 *
 * Sitede satış verisi tutulmuyor; hangi ürünün çok sattığını yalnızca
 * satıcı bilir. Bu yüzden listeler burada elle tutuluyor ve tek yerden
 * güncelleniyor — ürün sırasını değiştirmek için bileşenlere dokunmaya
 * gerek yok.
 *
 * Slug'lar lib/products.ts ile eşleşmeli. Katalogdan düşen bir slug şeritte
 * sessizce atlanır, sayfa bozulmaz.
 */
export interface Strip {
  title: string
  slugs: string[]
  /** "Tümü" bağlantısının gideceği yer. */
  href?: string
  linkLabel?: string
}

/** Genel çok satanlar — sayfanın en üstündeki şerit. */
export const bestSellers: Strip = {
  title: "Çok satanlar",
  slugs: [
    "retatrutide-60mg-5x12mg-zphc",
    "ghk-cu-50mg-zphc",
    "bpc157-25mg-5x5mg-zphc",
    "tb500-25mg-5x5mg-zphc",
    "zptrop-100iu-zphc",
    "semaglutide-5mg-kit-zphc",
    "tirzepatide-30mg-aq-pen-zphc",
    "ipamorelin-25mg-5x5mg-zphc",
  ],
}

/** Çok satan büyüme hormonu ürünleri. */
export const bestSellingHgh: Strip = {
  title: "Çok satan büyüme hormonu",
  slugs: [
    "zptrop-100iu-zphc",
    "zptrop-hgh-200iu-2x100iu-zphc",
    "zphc-zptrop-72iu-dual-chamber-pen",
    "zptrop-hgh-36iu-aq-pen-zphc",
    "zptrop-hgh-160iu-zphc",
    "zptropin-hgh-320iu-zphc",
    "zptrop-hgh-80iu-zphc-bacteriostatic-water",
    "zptrop-144iu-2x72iu-two-chamber-cartridges-zphc",
  ],
  href: "/urunler?kategori=B%C3%BCy%C3%BCme%20Hormonu",
  linkLabel: "Tüm büyüme hormonu",
}

/** Çok satan kilo kaybı / metabolik ürünler. */
export const bestSellingFatLoss: Strip = {
  title: "Çok satan kilo kaybı ürünleri",
  slugs: [
    "retatrutide-60mg-5x12mg-zphc",
    "semaglutide-5mg-kit-zphc",
    "tirzepatide-30mg-aq-pen-zphc",
    "retatrutide-10mg-5x2mg-zphc-2",
    "semaglutide-20mg-5x4mg-zphc",
    "tirzepatide-50mg-5x10mg-zphc",
    "retatrutide-20mg-5x4mg-zphc",
    "cagrilintide-25mg-zphc",
  ],
  href: "/urunler?kategori=Kilo%20Kayb%C4%B1",
  linkLabel: "Tüm kilo kaybı ürünleri",
}

/** ZPHC'nin hazır karışım ürünleri.
 *
 * Bunlar bizim oluşturduğumuz paketler değil, üreticinin tek flakonda
 * birden fazla bileşik sunduğu kendi ürünleri (Ultra Rehab Mix = BPC-157 +
 * TB-500 gibi). "Hangisini almalıyım" diye takılan ziyaretçi için doğrudan
 * cevap oluyorlar: kombinasyon kararı zaten verilmiş halde geliyor.
 */
export const readyMixes: Strip = {
  title: "Hazır karışımlar",
  slugs: [
    "zphc-ultra-rehab-mix-20mg-bpc157-tb500",
    "ultra-rehab-mix-50mg-5x10mg-zphc",
    "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc",
    "wellness-mix-25mg-5x5mg-zphc",
    "super-slim-mix-275mg-5x55mg-zphc",
    "super-slim-mix-55mg-5x11mg-zphc",
    "double-burn-mix-5mg-5x5mg-zphc",
    "mega-mass-mix-10mg-5x10mg-zphc",
  ],
  linkLabel: "Tüm ürünler",
}
