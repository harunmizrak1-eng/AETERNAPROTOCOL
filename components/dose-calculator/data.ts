import { peptides, type Peptide } from "@/lib/peptides"
import { products } from "@/lib/catalog"

export type UnitSystem = "mg" | "IU"
export type DoseUnit = "mg" | "mcg"
export type SyringeKind = "U100" | "U40"

export interface VialEntry {
  id: string
  /** Kütüphaneden seçilmişse slug, elle yazılmışsa boş. */
  slug: string
  name: string
  amount: string
}

export interface Syringe {
  id: string
  label: string
  kind: SyringeKind
  /** Şırınga gövdesindeki toplam ünite (skala sonu). */
  maxUnits: number
  /** 1 mL kaç üniteye bölünmüş: U-100 için 100, U-40 için 40. */
  unitsPerMl: number
  /** Skalada rakam yazılacak aralık. */
  labelStep: number
  /** Küçük çizgi aralığı. */
  minorStep: number
  /** Piston sürüklenirken yuvarlanacak ünite adımı. */
  snapStep: number
}

/* Boy (0,3/0,5/1 mL) ve tip (U-100/U-40) iki ayrı seçimdir, tek düğme
 * sırasında birleştirilince ("1 mL", "1 mL · U-40" yan yana) hangi
 * boyutun hangi tipe ait olduğu karışıyordu. Arayüzde önce tip seçilir,
 * yalnızca U-100 seçiliyken boy sorulur; U-40 pratikte tek boyda satılır. */
export const SYRINGES: Syringe[] = [
  { id: "u100-03", label: "0,3 mL", kind: "U100", maxUnits: 30, unitsPerMl: 100, labelStep: 5, minorStep: 1, snapStep: 0.5 },
  { id: "u100-05", label: "0,5 mL", kind: "U100", maxUnits: 50, unitsPerMl: 100, labelStep: 10, minorStep: 2, snapStep: 0.5 },
  { id: "u100-10", label: "1 mL", kind: "U100", maxUnits: 100, unitsPerMl: 100, labelStep: 20, minorStep: 5, snapStep: 1 },
  { id: "u40-10", label: "1 mL", kind: "U40", maxUnits: 40, unitsPerMl: 40, labelStep: 10, minorStep: 2, snapStep: 0.5 },
]

export const DEFAULT_SYRINGE_ID = "u100-10"

/* Kütüphanede dozlama basamağı olan 43 bileşiğin ~28'i şu an satılan hiçbir
 * ürüne karşılık gelmiyor (Tesamorelin, Semax, PT-141 gibi — kütüphanede var,
 * kataloğumuzda satılmıyor). Onları listelemek hem seçim listesini şişiriyor
 * hem "aldığım ürün bu değil" hatasına açık kapı bırakıyor. Süzme katalogdan
 * canlı türetiliyor, elle güncellenen bir liste değil; katalog değiştikçe bu
 * liste de otomatik değişir. */
const soldPeptideSlugs = new Set(
  products.map((p) => p.peptideSlug).filter((s): s is string => Boolean(s)),
)

export const CALCULABLE_PEPTIDES: Peptide[] = peptides.filter(
  (p) => p.dosing && p.dosing.length > 0 && soldPeptideSlugs.has(p.slug),
)

export const WATER_PRESETS_ML = [1, 2, 3, 5]
export const VIAL_PRESETS = [5, 10, 12, 20, 50, 60]
export const DOSE_PRESETS_MG = [0.25, 0.5, 1, 2, 4, 8]
export const DOSE_PRESETS_MCG = [100, 250, 500, 1000]
export const DOSE_PRESETS_IU = [2, 4, 6, 8]
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

let entryCounter = 0
export function newEntry(): VialEntry {
  entryCounter += 1
  return { id: `e${entryCounter}`, slug: "", name: "", amount: "" }
}
