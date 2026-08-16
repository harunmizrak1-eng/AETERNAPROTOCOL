// Tek kaynak: iletişim kanalları ve site sabitleri. WhatsApp numarası,
// e-posta ve Telegram referansları yalnızca buradan gelir; hiçbir bileşen
// kendi içine numara gömmez.

export const siteName = "ZPHC Türkiye"
export const siteTagline = "Yetkili peptid ve HGH distribütörü"
export const siteDescription =
  "ZPHC peptid ve insan büyüme hormonu ürünlerinin Türkiye kataloğu. " +
  "Resmi ürün verisi, PubMed referanslı bileşik bilgisi ve scratch kod " +
  "doğrulama."

/** Ülke kodu dahil, yalnızca rakam. wa.me bu formatı bekler. */
export const whatsappNumber = "905359184587"

/** İnsana gösterilen biçim. */
export const whatsappDisplay = "+90 535 918 45 87"

/** Ön dolgulu mesajla wa.me bağlantısı üretir. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Ürün sayfalarındaki bilgi-talebi mesajı. Sipariş değil, bilgi talebi. */
export function productEnquiry(productName: string): string {
  return `Merhaba, ${productName} hakkında bilgi almak istiyorum.`
}

export const officialSite = "https://zphcstore.com"

/** ZPHC'nin resmi scratch kod doğrulama servisinin adresi.
 *
 * BOŞ BIRAKILDI. zphcstore.com üzerinde doğrulama servisine ait bir bağlantı
 * yayımlanmıyor; tahmini bir adres yazmak kullanıcıyı sahte bir doğrulama
 * sayfasına yönlendirme riski taşır. Resmi adres öğrenildiğinde buraya
 * yazılır, /dogrulama sayfası bağlantıyı otomatik gösterir. */
export const verifyUrl: string | null = null

export const navLinks = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/dogrulama", label: "Doğrulama" },
  { href: "/bayilik", label: "Bayilik" },
  { href: "/iletisim", label: "İletişim" },
] as const
