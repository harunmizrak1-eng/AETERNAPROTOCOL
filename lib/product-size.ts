import type { Product } from "@/lib/products"

/** Ürün adından toplam miktarı ve birimini okur.
 *
 * Katalogdaki adlar iki birim taşıyor: peptidler mg ("Reta ZPHC 20 mg
 * (5 flakon × 4 mg)"), büyüme hormonu ise IU ("ZPtrop HGH ZPHC 100 IU").
 * İlk geçen sayı her zaman toplam miktardır; parantez içindeki ikinci sayı
 * flakon başına düşen miktardır.
 *
 * Miktar okunamazsa null döner — ürün karşılaştırma tablosuna hiç
 * girmez. Uydurma bir değer üretmektense satırı atlamak doğru davranış.
 */
export interface ParsedSize {
  amount: number
  unit: "mg" | "IU"
  /** Adın parantez içindeki sunum bilgisi, varsa: "5 flakon × 4 mg". */
  presentation?: string
}

export function parseSize(name: string): ParsedSize | null {
  const match = name.match(/(\d+(?:[.,]\d+)?)\s*(mg|iu)\b/i)
  if (!match) return null

  const amount = Number(match[1].replace(",", "."))
  if (!Number.isFinite(amount) || amount <= 0) return null

  const unit = match[2].toLowerCase() === "iu" ? "IU" : "mg"

  const paren = name.match(/\(([^)]+)\)/)
  return { amount, unit, presentation: paren?.[1] }
}

/** Karışım ürünü mü? ("Ultra Rehab Mix", "Glow Pro Mix", "Wellness Mix"...)
 *
 * Karışımlar birden fazla bileşik içerir ve kütüphanede tek bir bileşiğe
 * bağlanır. "60 mg Glow Pro Mix" 60 mg BPC-157 değildir — içinde TB-500 ve
 * GHK-Cu de vardır. Boyut karşılaştırmasında bunları saf ürünlerle aynı
 * sütunda sıralamak yanıltıcı olur, o yüzden tablodan çıkarılırlar. */
export function isMix(product: Product): boolean {
  return /\bmix\b/i.test(product.name)
}

/** Bir ürünle karşılaştırılabilir boyutlar: aynı bileşik, aynı birim,
 * karışım olmayan ve miktarı okunabilen ürünler; miktara göre sıralı. */
export function comparableSizes(product: Product, all: Product[]) {
  const own = parseSize(product.name)
  if (!own || !product.peptideSlug || isMix(product)) return []

  return all
    .filter((p) => p.peptideSlug === product.peptideSlug && !isMix(p))
    .map((p) => ({ product: p, size: parseSize(p.name) }))
    .filter(
      (row): row is { product: Product; size: ParsedSize } =>
        row.size !== null && row.size.unit === own.unit,
    )
    .sort((a, b) => a.size.amount - b.size.amount)
}
