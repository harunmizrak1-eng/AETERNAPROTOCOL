import { peptides, type Peptide } from "@/lib/peptides"
import { products } from "@/lib/catalog"
import { parseSize } from "@/lib/product-size"

export type DoseUnit = "mg" | "mcg"

export interface Syringe {
  id: string
  label: string
  /** Şırınga gövdesindeki toplam ünite (skala sonu). */
  maxUnits: number
  /** Skalada rakam yazılacak aralık. */
  labelStep: number
  /** Küçük çizgi aralığı. */
  minorStep: number
  /** Piston sürüklenirken yuvarlanacak ünite adımı. */
  snapStep: number
}

/* Hesaplayıcı yalnızca U-100 üzerinden çalışır: Türkiye'de eczanede satılan
 * insülin şırıngalarının tamamı U-100'dür ve peptit sulandırma tarifleri de
 * bu skalaya göre yazılır. U-40 seçeneği tek kazancı olmadan yanlış skalada
 * okuma riski getiriyordu. */
export const UNITS_PER_ML = 100

export const SYRINGES: Syringe[] = [
  { id: "u100-03", label: "0,3 mL", maxUnits: 30, labelStep: 5, minorStep: 1, snapStep: 0.5 },
  { id: "u100-05", label: "0,5 mL", maxUnits: 50, labelStep: 10, minorStep: 2, snapStep: 0.5 },
  { id: "u100-10", label: "1 mL", maxUnits: 100, labelStep: 20, minorStep: 5, snapStep: 1 },
]

export const DEFAULT_SYRINGE_ID = "u100-10"

/* Kütüphanedeki 43 bileşiğin çoğu şu an satılan hiçbir ürüne karşılık
 * gelmiyor (Tesamorelin, Semax, PT-141 gibi — kütüphanede var, kataloğumuzda
 * satılmıyor). Onları listelemek hem seçim listesini şişiriyor hem "aldığım
 * ürün bu değil" hatasına açık kapı bırakıyor. Süzme katalogdan canlı
 * türetiliyor, elle güncellenen bir liste değil; katalog değiştikçe bu liste
 * de otomatik değişir.
 *
 * Ölçüt yalnızca "satılıyor mu" — kütüphanede doz merdiveni bulunması
 * aranmaz. Retatrutide gibi araştırma aşamasındaki moleküllerde merdiveni
 * bilerek yayımlamıyoruz; hesaplayıcı da doz önermiyor, kullanıcının yazdığı
 * dozu hacme çeviriyor. Merdiveni şart koşmak ana ürünü listeden düşürüyordu. */
const soldPeptideSlugs = new Set(
  products.map((p) => p.peptideSlug).filter((s): s is string => Boolean(s)),
)

/* Büyüme hormonu IU ile dozlanır, mg ile değil; ayrıca kendi kartuş ve
 * kalemleriyle gelir, sulandırma mantığı peptit flakonuyla aynı değil. Aynı
 * ekranda iki birim sistemi tutmak kullanıcıyı yanlış skalaya itiyordu. */
const HIDDEN_PEPTIDE_SLUGS = new Set(["hgh"])

export const CALCULABLE_PEPTIDES: Peptide[] = peptides.filter(
  (p) => soldPeptideSlugs.has(p.slug) && !HIDDEN_PEPTIDE_SLUGS.has(p.slug),
)

/** Ürün adından flakon başına düşen mg değerini okur.
 *
 * Ad iki sayı taşıyabilir: "Reta ZPHC 120 mg (5 flakon × 24 mg)" — 120 kutunun
 * tamamı, 24 tek flakon. Sulandırma tek flakona yapıldığı için parantez içi
 * öncelikli; yoksa addaki tek miktar zaten flakonun kendisidir. */
function vialMg(name: string): number | null {
  const perVial = name.match(/[×x]\s*(\d+(?:[.,]\d+)?)\s*mg/i)
  if (perVial) {
    const n = Number(perVial[1].replace(",", "."))
    return Number.isFinite(n) && n > 0 ? n : null
  }
  const size = parseSize(name)
  return size && size.unit === "mg" ? size.amount : null
}

/** Bileşik seçilince hazır miktar düğmeleri gerçekten sattığımız flakon
 * boylarına dönüşür. Genel bir 5/10/20 listesi kullanıcıyı elindeki kutuda
 * bulunmayan bir sayıya yönlendiriyordu. */
export const VIAL_AMOUNTS_BY_PEPTIDE: Record<string, number[]> = (() => {
  const out: Record<string, number[]> = {}
  for (const product of products) {
    if (!product.peptideSlug) continue
    const mg = vialMg(product.name)
    if (mg === null) continue
    const list = out[product.peptideSlug] ?? (out[product.peptideSlug] = [])
    if (!list.includes(mg)) list.push(mg)
  }
  for (const slug of Object.keys(out)) {
    out[slug] = out[slug].sort((a, b) => a - b).slice(0, 6)
  }
  return out
})()

/** Ürün sayfasındaki "Bu ürünle hesapla" bağlantısı /hesaplayici#urun=<slug>
 * adresine gidiyor ve flakon miktarının hazır gelmesini vaat ediyor. Bu tablo
 * o slug'ı hesaplayıcının anladığı iki değere çevirir. */
export const PRESET_BY_PRODUCT_SLUG: Record<
  string,
  { peptideSlug: string; mg: number }
> = (() => {
  const out: Record<string, { peptideSlug: string; mg: number }> = {}
  for (const product of products) {
    if (!product.peptideSlug) continue
    const mg = vialMg(product.name)
    if (mg === null) continue
    out[product.slug] = { peptideSlug: product.peptideSlug, mg }
  }
  return out
})()

/** Bileşik seçilmediğinde gösterilen genel boylar. */
export const VIAL_PRESETS = [5, 10, 20, 30, 50, 60]
export const WATER_PRESETS_ML = [1, 2, 3, 5]
export const DOSE_PRESETS_MG = [0.25, 0.5, 1, 2, 4, 8]
export const DOSE_PRESETS_MCG = [100, 250, 500, 1000]
/** Sulandırma ipucunu ararken denenen hacimler. */
export const WATER_CANDIDATES = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5]

export function parseNum(value: string): number | null {
  const n = Number(value.replace(",", "."))
  return Number.isFinite(n) && n > 0 ? n : null
}

export function fmt(n: number, digits = 2): string {
  return n.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}
