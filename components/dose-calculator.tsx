"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { CalculatorProduct } from "@/lib/calculator-products"

type DoseUnit = "mg" | "mcg" | "IU"
type Syringe = { id: string; label: string; maxUnits: number; unitsPerMl: number }

const SYRINGES: Syringe[] = [
  { id: "u100-03", label: "U-100 · 0,3 mL", maxUnits: 30, unitsPerMl: 100 },
  { id: "u100-05", label: "U-100 · 0,5 mL", maxUnits: 50, unitsPerMl: 100 },
  { id: "u100-10", label: "U-100 · 1 mL", maxUnits: 100, unitsPerMl: 100 },
  { id: "u40-10", label: "U-40 · 1 mL", maxUnits: 40, unitsPerMl: 40 },
]

function parsePositive(value: string) {
  const parsed = Number(value.replace(",", "."))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function format(value: number, digits = 2) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: digits })
}

function SyringeScale({ units, syringe }: { units: number; syringe: Syringe }) {
  const fill = Math.min(100, Math.max(0, (units / syringe.maxUnits) * 100))
  return (
    <div className="rounded-xl border border-white/15 bg-white/[0.06] p-4">
      <div className="flex items-center justify-between text-[11px] font-semibold text-white/55">
        <span>0</span><span>{syringe.maxUnits / 2}</span><span>{syringe.maxUnits} ünite</span>
      </div>
      <div className="relative mt-2 h-12 overflow-hidden rounded-md border border-white/25 bg-white/10">
        <div className="absolute inset-y-0 left-0 bg-[#38a7e3]/75 transition-[width] duration-300" style={{ width: `${fill}%` }} />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(10%-1px),rgba(255,255,255,.28)_calc(10%-1px),rgba(255,255,255,.28)_10%)]" />
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,.9)] transition-[left] duration-300" style={{ left: `calc(${fill}% - 1px)` }} />
      </div>
    </div>
  )
}

export function DoseCalculator({ products }: { products: CalculatorProduct[] }) {
  const [productSlug, setProductSlug] = useState("")
  const [waterMl, setWaterMl] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg")
  const [syringeId, setSyringeId] = useState("u100-10")
  const [copied, setCopied] = useState(false)

  const product = products.find((item) => item.slug === productSlug)
  const syringe = SYRINGES.find((item) => item.id === syringeId) ?? SYRINGES[2]
  const water = parsePositive(waterMl)
  const targetRaw = parsePositive(targetAmount)
  const target = targetRaw === null ? null : product?.unit === "mg" && doseUnit === "mcg" ? targetRaw / 1000 : targetRaw

  const result = useMemo(() => {
    if (!product || !water || !target) return null
    const concentration = product.amount / water
    const drawMl = target / concentration
    const units = drawMl * syringe.unitsPerMl
    return {
      concentration,
      drawMl,
      units,
      dosesPerVial: product.amount / target,
      overflow: units > syringe.maxUnits,
      tooSmall: units < 2,
    }
  }, [product, syringe, target, water])

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1))
    const slug = hash.get("urun")
    if (slug && products.some((item) => item.slug === slug)) setProductSlug(slug)
    if (hash.get("su")) setWaterMl(hash.get("su") ?? "")
    if (hash.get("miktar")) setTargetAmount(hash.get("miktar") ?? "")
    const unit = hash.get("birim")
    if (unit === "mg" || unit === "mcg" || unit === "IU") setDoseUnit(unit)
  }, [products])

  useEffect(() => {
    if (!productSlug && !waterMl && !targetAmount) return
    const hash = new URLSearchParams()
    if (productSlug) hash.set("urun", productSlug)
    if (waterMl) hash.set("su", waterMl)
    if (targetAmount) hash.set("miktar", targetAmount)
    hash.set("birim", doseUnit)
    window.history.replaceState(null, "", `${window.location.pathname}#${hash.toString()}`)
  }, [doseUnit, productSlug, targetAmount, waterMl])

  function chooseProduct(slug: string) {
    setProductSlug(slug)
    const next = products.find((item) => item.slug === slug)
    if (next) setDoseUnit(next.unit)
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <div className="grid overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_18px_60px_-30px_rgba(0,49,76,.35)] lg:grid-cols-[1.08fr_.92fr]">
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-start justify-between gap-4 border-b border-hairline pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-gold">Üç bilgi yeterli</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">Değerleri kutunuzdan girin</h2>
            </div>
            <span className="rounded-md bg-surface px-3 py-2 text-xs font-semibold text-muted-foreground">Matematiksel araç</span>
          </div>

          <div className="space-y-7">
            <label className="block">
              <span className="flex items-center gap-3 text-sm font-bold text-foreground"><b className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs text-white">1</b> Ürünü seçin</span>
              <select value={productSlug} onChange={(event) => chooseProduct(event.target.value)} className="mt-3 min-h-14 w-full rounded-lg border border-input bg-white px-4 text-sm font-semibold outline-none focus:border-gold">
                <option value="">Aktif katalogdan ürün seçin</option>
                {products.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              {product && <span className="mt-2 block text-xs text-muted-foreground">Flakon içeriği: <strong className="text-foreground">{format(product.amount, 3)} {product.unit}</strong> · ürün kaydından otomatik alındı</span>}
            </label>

            <label className="block">
              <span className="flex items-center gap-3 text-sm font-bold text-foreground"><b className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs text-white">2</b> Eklenen su</span>
              <div className="relative mt-3">
                <input value={waterMl} onChange={(event) => setWaterMl(event.target.value)} inputMode="decimal" placeholder="Örn. 2" aria-label="Eklenen su miktarı" className="min-h-14 w-full rounded-lg border border-input bg-white px-4 pr-16 text-base font-semibold tabular-nums outline-none focus:border-gold" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">mL</span>
              </div>
            </label>

            <label className="block">
              <span className="flex items-center gap-3 text-sm font-bold text-foreground"><b className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs text-white">3</b> Size belirtilen miktar</span>
              <div className="mt-3 flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <input value={targetAmount} onChange={(event) => setTargetAmount(event.target.value)} inputMode="decimal" placeholder="Miktarı yazın" aria-label="Size belirtilen miktar" className="min-h-14 w-full rounded-lg border border-input bg-white px-4 pr-16 text-base font-semibold tabular-nums outline-none focus:border-gold" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">{doseUnit}</span>
                </div>
                {product?.unit === "mg" && <div className="flex rounded-lg border border-input p-1">{(["mg", "mcg"] as DoseUnit[]).map((unit) => <button key={unit} type="button" onClick={() => setDoseUnit(unit)} className={`min-w-14 rounded-md px-2 text-xs font-bold ${doseUnit === unit ? "bg-gold text-white" : "text-muted-foreground"}`}>{unit}</button>)}</div>}
              </div>
              <span className="mt-2 block text-xs leading-5 text-muted-foreground">Araç miktar önermez; yalnızca sizin girdiğiniz değeri şırınga ünitesine çevirir.</span>
            </label>
          </div>

          <details className="mt-8 border-t border-hairline pt-5">
            <summary className="cursor-pointer text-sm font-bold text-gold">Gelişmiş şırınga seçimi</summary>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{SYRINGES.map((item) => <button key={item.id} type="button" onClick={() => setSyringeId(item.id)} className={`min-h-12 rounded-lg border px-2 text-xs font-bold ${syringeId === item.id ? "border-gold bg-gold/10 text-gold" : "border-hairline text-muted-foreground"}`}>{item.label}</button>)}</div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">U-40 ve U-100 aynı ölçek değildir. Elinizdeki şırınganın üzerindeki işareti kontrol edin.</p>
          </details>
        </div>

        <aside id="detayli-sonuc" className="scroll-mt-4 bg-[#07334f] p-5 text-white sm:p-8 lg:sticky lg:top-4 lg:self-start lg:p-10" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-white/55">Sonuç</p>
          {!result ? (
            <div className="mt-8 min-h-56 border-t border-white/15 pt-8">
              <p className="text-4xl font-bold">—</p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">Ürün, su ve size belirtilen miktarı girince sonuç burada görünecek.</p>
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-5xl font-bold tracking-tight tabular-nums">{format(result.units)} <span className="text-xl text-white/55">ünite</span></p>
              <p className="mt-2 text-sm text-white/60">{format(result.drawMl, 3)} mL · {syringe.label}</p>
              <div className="mt-7"><SyringeScale units={result.units} syringe={syringe} /></div>
              {(result.overflow || result.tooSmall) && <p className="mt-4 rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-xs leading-5 text-amber-100">{result.overflow ? "Hesaplanan hacim seçili şırınganın kapasitesini aşıyor." : "Sonuç 2 ünitenin altında; küçük ölçeklerde okuma hatası büyüyebilir."}</p>}
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/15">
                <div className="bg-[#0b3d5b] p-4"><dt className="text-[11px] text-white/50">Konsantrasyon</dt><dd className="mt-1 font-bold tabular-nums">{format(result.concentration, 3)} {product?.unit}/mL</dd></div>
                <div className="bg-[#0b3d5b] p-4"><dt className="text-[11px] text-white/50">Flakon başına</dt><dd className="mt-1 font-bold tabular-nums">{format(result.dosesPerVial, 1)} işlem</dd></div>
              </dl>
              <button type="button" onClick={copyLink} className="mt-5 min-h-11 w-full rounded-lg border border-white/25 px-4 text-sm font-bold hover:bg-white/10">{copied ? "Bağlantı kopyalandı" : "Bu hesabın bağlantısını kopyala"}</button>
            </div>
          )}
          {product && <Link href={`/urunler/${product.slug}`} className="mt-6 inline-flex text-sm font-bold text-[#7dd0ff] hover:underline">Ürün sayfasını aç →</Link>}
          <p className="mt-8 border-t border-white/15 pt-5 text-[11px] leading-5 text-white/50">Bu ekran tıbbi doz belirlemez. Sonucu kullanmadan önce ürün etiketi ve şırınga ölçeği bağımsız olarak kontrol edilmelidir.</p>
        </aside>
      </div>

      {result && <div className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-xl bg-[#07334f] px-4 py-3 text-white shadow-2xl lg:hidden"><div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/50">Çekilecek miktar</p><p className="mt-0.5 text-lg font-bold tabular-nums">{format(result.units)} ünite</p></div><a href="#detayli-sonuc" className="text-xs font-bold text-[#7dd0ff]">Detay →</a></div>}
    </>
  )
}
