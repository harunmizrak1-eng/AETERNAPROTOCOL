// ZPHC Türkiye ürün kataloğu.
//
// ÖNEMLİ — bu dosyadaki teknik alanlar (strength, presentation, description)
// yalnızca resmi ZPHC ürün verisinden doldurulur. Bir flakonun kaç mg etkin
// madde taşıdığı tahmin edilemez: yanlış bir doz değeri ürün sayfasında
// doğrudan hasta güvenliği sorunudur. Verisi elde olmayan alan boş bırakılır
// ve sayfa o alanı hiç render etmez. Asla "muhtemelen böyledir" diye
// doldurma.
//
// Fiyat alanı da bilinçli olarak boştur; site üzerinde tamamlanan bir sipariş
// akışı yok, talepler WhatsApp üzerinden ilerliyor.

export type ProductCategory = "peptid" | "hgh"

export const categoryLabels: Record<ProductCategory, string> = {
  peptid: "Peptidler",
  hgh: "İnsan Büyüme Hormonu",
}

export const categoryOrder: ProductCategory[] = ["peptid", "hgh"]

export interface Product {
  slug: string
  /** Katalogda görünen ZPHC ürün adı. */
  name: string
  /** Etkin madde (INN veya yaygın bileşik adı). */
  activeIngredient: string
  category: ProductCategory
  /** Flakon/ampul başına etkin madde miktarı, ör. "5 mg". Resmi veriden. */
  strength?: string
  /** Kutu içeriği, ör. "1 flakon + 1 çözücü ampul". Resmi veriden. */
  presentation?: string
  /** Sunum formu. */
  form?: string
  /** Resmi ZPHC ürün açıklaması. */
  description?: string
  /** lib/peptides.ts içindeki ansiklopedi kaydının slug'ı. Doluysa ürün
   * sayfası mekanizma, kanıt seviyesi ve PubMed referanslarını oradan çeker. */
  peptideSlug?: string
  /** Şimdilik boş. Doldurulduğunda ürün sayfasında görünür. */
  price?: string
}

export const products: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    activeIngredient: "BPC-157 (Body Protection Compound-157)",
    category: "peptid",
    peptideSlug: "bpc-157",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    activeIngredient: "Timozin Beta-4 fragmanı (TB-500)",
    category: "peptid",
    peptideSlug: "tb-500",
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    activeIngredient: "CJC-1295 (DAC)",
    category: "peptid",
    peptideSlug: "cjc-1295-dac",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    activeIngredient: "Ipamorelin",
    category: "peptid",
    peptideSlug: "ipamorelin",
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    activeIngredient: "IGF-1 Long R3",
    category: "peptid",
    peptideSlug: "igf-1-lr3",
  },
  {
    slug: "melanotan-2",
    name: "Melanotan 2",
    activeIngredient: "Melanotan II",
    category: "peptid",
  },
  {
    slug: "hcg",
    name: "HCG",
    activeIngredient: "İnsan koryonik gonadotropini",
    category: "peptid",
  },
  {
    slug: "hgh-somatropin",
    name: "HGH (Somatropin)",
    activeIngredient: "Somatropin (rekombinant insan büyüme hormonu)",
    category: "hgh",
    peptideSlug: "hgh",
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function productsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}
