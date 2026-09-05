import {
  categoryLabels,
  categoryOrder,
  goalOrder,
  products as generatedProducts,
  type Product,
  type ProductCategory,
  type ProductSpec,
} from "@/lib/products"

/** Türkiye mağazasında satıştan kaldırılan ürünler.
 *
 * Üretici kataloğu yeniden oluşturulduğunda bu ürünlerin geri gelmemesi için
 * filtre generated dosyanın dışında tutulur. */
export const excludedProductSlugs = new Set([
  "aicar-250mg-total-5x50mg-zphc",
  "ghrp-2-25mg-5x5mg-zphc-2",
  "hp-hcg-5000iu-vial-zphc",
  "ll-37-zphc-25mg-kit",
  "semaglutide-zphc-50-mg-5-vials-x-10-mg",
  "semaglutide-6mg-aq-pen-zphc",
  "tirze-zphc-75-mg-dual-cartridge-pen",
  "tirzepatide-37p5mg-5x7p5mg-zphc",
  "zptrop-144iu-2x72iu-two-chamber-cartridges-zphc",
  "zphc-zptrop-72iu-dual-chamber-pen",
  "zptrop-hgh-36iu-aq-pen-zphc",
  "zptropin-hgh-320iu-zphc",
  "zptrop-hgh-200iu-2x100iu-zphc",
])

/** Mağaza sahibi tarafından sağlanan, üretici API kataloğunda bulunmayan ürün. */
const ownerProducts: Product[] = [
  {
    slug: "ghk-cu-200mg-zphc",
    name: "GHK-Cu ZPHC 200 mg (1 × 200 mg flakon)",
    category: "peptid",
    peptideSlug: "ghk-cu",
    image: "/products/ghk-cu-200mg-zphc.png",
    goals: ["Cilt & Yaşlanma Karşıtı"],
    inStock: true,
    specs: [
      { label: "Etkin Madde", value: "GHK-Cu", kind: "spec" },
      { label: "Toplam İçerik", value: "200 mg", kind: "spec" },
      { label: "Kit İçeriği", value: "1 × 200 mg flakon", kind: "spec" },
      { label: "Kullanım Amacı", value: "Yalnızca araştırma amaçlı", kind: "spec" },
    ],
    notes: [],
  },
]

export const products: Product[] = [
  ...generatedProducts.filter((product) => !excludedProductSlugs.has(product.slug)),
  ...ownerProducts,
]

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function productsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category)
}

export { categoryLabels, categoryOrder, goalOrder }
export type { Product, ProductCategory, ProductSpec }
