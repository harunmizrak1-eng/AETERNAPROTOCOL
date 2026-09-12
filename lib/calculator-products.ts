import type { Product } from "@/lib/catalog"

export interface CalculatorProduct {
  slug: string
  name: string
  amount: number
  unit: "mg" | "IU"
}

const UNSUITABLE_FORMAT = /\b(mix|pen|kalem|kartuş|cartridge|hazır karışım)\b/i

function readAmount(text: string) {
  const patterns = [
    /\d+\s*(?:flakon|vials?)\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*(mg|iu)\b/i,
    /\d+\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*(mg|iu)\s*(?:flakon|vials?)\b/i,
    /1\s*(?:flakon|vial)\s*(\d+(?:[.,]\d+)?)\s*(mg|iu)\b/i,
    /1\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*(mg|iu)\s*(?:flakon|vial)\b/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (!match) continue
    const amount = Number(match[1].replace(",", "."))
    if (Number.isFinite(amount) && amount > 0) {
      return { amount, unit: match[2].toLowerCase() === "iu" ? "IU" as const : "mg" as const }
    }
  }

  return null
}

/** Only source-explicit, single-compound, reconstitutable catalogue items. */
export function toCalculatorProduct(product: Product): CalculatorProduct | null {
  if (!product.peptideSlug || product.category === "aksesuar" || UNSUITABLE_FORMAT.test(product.name)) return null

  const sourceText = [
    product.name,
    ...product.specs.filter((spec) => spec.kind === "spec").map((spec) => `${spec.label}: ${spec.value}`),
  ].join(" · ")
  const parsed = readAmount(sourceText)
  if (!parsed) return null

  return { slug: product.slug, name: product.name, amount: parsed.amount, unit: parsed.unit }
}

export function getCalculatorProducts(products: Product[]) {
  return products
    .map(toCalculatorProduct)
    .filter((product): product is CalculatorProduct => product !== null)
    .sort((a, b) => a.name.localeCompare(b.name, "tr"))
}
