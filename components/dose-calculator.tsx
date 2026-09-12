"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  peptides,
  tierDosingDisclaimer,
  tierLabel,
  type DoseStep,
} from "@/lib/peptides"

type UnitSystem = "mg" | "IU"
type DoseUnit = "mg" | "mcg"

interface VialEntry {
  id: string
  /** Kütüphaneden seçilmişse slug, elle yazılmışsa boş. */
  slug: string
  name: string
  amount: string
}

interface Syringe {
  id: string
  label: string
  /** Şırınga gövdesindeki toplam ünite (skala sonu). */
  maxUnits: number
  /** 1 mL kaç üniteye bölünmüş: U-100 için 100, U-40 için 40. */
  unitsPerMl: number
  /** Skalada rakam yazılacak aralık. */
  labelStep: number
  /** Küçük çizgi aralığı. */
  minorStep: number
}

const SYRINGES: Syringe[] = [
  { id: "u100-03", label: "0,3 mL", maxUnits: 30, unitsPerMl: 100, labelStep: 5, minorStep: 1 },
  { id: "u100-05", label: "0,5 mL", maxUnits: 50, unitsPerMl: 100, labelStep: 10, minorStep: 2 },
  { id: "u100-10", label: "1 mL", maxUnits: 100, unitsPerMl: 100, labelStep: 20, minorStep: 5 },
  { id: "u40-10", label: "1 mL · U-40", maxUnits: 40, unitsPerMl: 40, labelStep: 10, minorStep: 2 },
]

const CALCULABLE_PEPTIDES = peptides.filter((p) => p.dosing && p.dosing.length > 0)

const WATER_PRESETS_ML = [1, 2, 3, 5]

/* Şırınga çiziminin yatay yerleşimi, kapsayıcı genişliğinin yüzdesi olarak.
 * Gerçekte piston tamamen çekildiğinde kol bir gövde boyu dışarı çıkar; o
 * kadar yer ayırmak gövdeyi yarı yarıya küçültüp skalayı okunmaz hale
 * getiriyordu. Kol hareketi PLUNGER_TRAVEL ile kısaltıldı: yüksek dozda kol
 * olması gerekenden kısa görünür, buna karşılık skala her dozda okunur
 * kalıyor. Ölçüm gövdeden okunduğu için bu kısaltma sonucu etkilemiyor. */
const NEEDLE_END = 6
const HUB_END = 10
const BARREL_LEFT = 10
const BARREL_WIDTH = 52
const PLUNGER_TRAVEL = 0.5

function parseNum(value: string): number | null {
  const n = Number(value.replace(",", "."))
  return Number.isFinite(n) && n > 0 ? n : null
}

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}

let entryCounter = 0
function newEntry(): VialEntry {
  entryCounter += 1
  return { id: `e${entryCounter}`, slug: "", name: "", amount: "" }
}

export function DoseCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("mg")
  const [entries, setEntries] = useState<VialEntry[]>([newEntry()])
  const [referenceId, setReferenceId] = useState<string>("")
  const [waterMl, setWaterMl] = useState("")
  const [doseAmount, setDoseAmount] = useState("")
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg")
  const [syringeId, setSyringeId] = useState(SYRINGES[2].id)
  const [copied, setCopied] = useState(false)

  const syringe = SYRINGES.find((s) => s.id === syringeId) ?? SYRINGES[2]
  const unitLabel = unitSystem === "mg" ? "mg" : "IU"

  const reference =
    entries.find((e) => e.id === referenceId) ?? entries[0] ?? newEntry()
  const referencePeptide = CALCULABLE_PEPTIDES.find((p) => p.slug === reference.slug)

  const water = parseNum(waterMl)
  const doseRaw = parseNum(doseAmount)
  const dose =
    doseRaw !== null && unitSystem === "mg" && doseUnit === "mcg"
      ? doseRaw / 1000
      : doseRaw

  const referenceAmount = parseNum(reference.amount)
  const totalAmount = entries.reduce((sum, e) => sum + (parseNum(e.amount) ?? 0), 0)

  /* Hesap her zaman referans bileşiğin konsantrasyonu üzerinden yürür.
   * Karışımlarda toplam miligram üzerinden doz almak yanlış olur: kullanıcı
   * "500 mcg BPC" der, karışımdaki TB-500 o hacimde ne kadar geliyorsa
   * ayrıca gösterilir. */
  const refConcentration =
    referenceAmount !== null && water !== null ? referenceAmount / water : null
  const drawMl =
    refConcentration !== null && refConcentration > 0 && dose !== null
      ? dose / refConcentration
      : null
  const units = drawMl !== null ? drawMl * syringe.unitsPerMl : null
  const dosesPerVial =
    referenceAmount !== null && dose !== null && dose > 0
      ? referenceAmount / dose
      : null
  const perUnitAmount =
    refConcentration !== null ? refConcentration / syringe.unitsPerMl : null

  const fillPct =
    units !== null ? Math.max(0, Math.min(1, units / syringe.maxUnits)) : 0
  const overflow = units !== null && units > syringe.maxUnits

  const ticks = useMemo(() => {
    const out: { at: number; major: boolean; label?: number }[] = []
    for (let u = 0; u <= syringe.maxUnits; u += syringe.minorStep) {
      const major = u % syringe.labelStep === 0
      out.push({ at: u / syringe.maxUnits, major, label: major ? u : undefined })
    }
    return out
  }, [syringe])

  function updateEntry(id: string, patch: Partial<VialEntry>) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function addEntry() {
    setEntries((prev) => [...prev, newEntry()])
  }

  function removeEntry(id: string) {
    setEntries((prev) => (prev.length === 1 ? prev : prev.filter((e) => e.id !== id)))
    if (referenceId === id) setReferenceId("")
  }

  function fillFromStep(step: DoseStep) {
    setUnitSystem("mg")
    setDoseUnit("mg")
    setDoseAmount(String(step.amountValue))
  }

  async function handleCopy() {
    if (units === null || drawMl === null) return
    const lines = [
      "ZPHC Türkiye sulandırma hesabı",
      `Sulandırma suyu: ${fmt(water ?? 0, 2)} mL`,
      ...entries
        .filter((e) => parseNum(e.amount) !== null)
        .map(
          (e) =>
            `${e.name || "Bileşik"}: ${fmt(parseNum(e.amount) ?? 0, 3)} ${unitLabel}` +
            (e.id === reference.id ? " (hedef)" : ""),
        ),
      `Konsantrasyon: ${fmt(refConcentration ?? 0, 3)} ${unitLabel}/mL`,
      `Hedef doz: ${doseAmount} ${unitSystem === "mg" ? doseUnit : "IU"}`,
      `Çekilecek: ${fmt(units, 2)} ünite (${fmt(drawMl, 3)} mL)`,
      `Şırınga: ${syringe.label} (${syringe.unitsPerMl} ü/mL)`,
    ]
    try {
      await navigator.clipboard.writeText(lines.join("\n"))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Pano erişimi engellenmişse sessizce geç; sonuç ekranda duruyor. */
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-background shadow-[0_1px_2px_rgba(13,27,42,0.04),0_12px_40px_-12px_rgba(13,27,42,0.16)]">
      <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/60 to-transparent" />

      {/* Şırınga paneli */}
      <div className="bg-[#0d1b2a] px-5 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              {syringe.label} insülin şırıngası · {syringe.unitsPerMl} ünite/mL
            </p>
            {units !== null && (
              <p className="text-[11px] font-medium text-white/45">
                skala sonu {syringe.maxUnits} ünite
              </p>
            )}
          </div>

          <div className="relative mt-12 h-28 w-full">
            {/* İğne */}
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-white/25 to-white/50"
              style={{ left: 0, width: `${NEEDLE_END}%` }}
            />
            {/* Göbek */}
            <div
              className="absolute top-1/2 h-7 -translate-y-1/2 rounded-[3px] bg-white/25"
              style={{ left: `${NEEDLE_END}%`, width: `${HUB_END - NEEDLE_END}%` }}
            />

            {/* Piston kolu, tıkacın arkasına bağlı olarak kayar */}
            <div
              className="absolute top-1/2 h-3 -translate-y-1/2 rounded-r-[3px] bg-white/20 transition-[left] duration-700 ease-out"
              style={{
                left: `${BARREL_LEFT + fillPct * BARREL_WIDTH * PLUNGER_TRAVEL}%`,
                width: `${BARREL_WIDTH}%`,
              }}
            />
            {/* Başparmak desteği */}
            <div
              className="absolute top-1/2 h-16 w-2 -translate-y-1/2 rounded-[3px] bg-white/30 transition-[left] duration-700 ease-out"
              style={{
                left: `${BARREL_LEFT + BARREL_WIDTH + fillPct * BARREL_WIDTH * PLUNGER_TRAVEL}%`,
              }}
            />

            {/* Gövde */}
            <div
              className="absolute top-1/2 h-16 -translate-y-1/2 overflow-hidden rounded-[4px] border border-white/20 bg-white/[0.06]"
              style={{ left: `${BARREL_LEFT}%`, width: `${BARREL_WIDTH}%` }}
            >
              {/* Sıvı */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/70 to-gold transition-[width] duration-700 ease-out"
                style={{ width: `${fillPct * 100}%` }}
              />
              {/* Skala çizgileri */}
              {ticks.map((t) => (
                <div
                  key={t.at}
                  aria-hidden="true"
                  className={`absolute top-0 w-px ${t.major ? "h-4 bg-white/55" : "h-2 bg-white/25"}`}
                  style={{ left: `${t.at * 100}%` }}
                />
              ))}
              {/* Tıkaç */}
              <div
                className="absolute inset-y-0 w-1.5 -translate-x-1/2 bg-white/85 transition-[left] duration-700 ease-out"
                style={{ left: `${fillPct * 100}%` }}
              />
            </div>

            {/* Skala rakamları */}
            {ticks
              .filter((t) => t.label !== undefined)
              .map((t) => (
                <span
                  key={`l${t.at}`}
                  aria-hidden="true"
                  className="absolute top-[calc(50%+2.4rem)] -translate-x-1/2 text-[9px] font-medium tabular-nums text-white/40 sm:text-[10px]"
                  style={{ left: `${BARREL_LEFT + t.at * BARREL_WIDTH}%` }}
                >
                  {t.label}
                </span>
              ))}

            {/* Çekilecek yerin işareti */}
            {units !== null && (
              <div
                className="absolute bottom-[calc(50%+2rem)] top-0 transition-[left] duration-700 ease-out"
                style={{ left: `${BARREL_LEFT + fillPct * BARREL_WIDTH}%` }}
              >
                <div className="absolute bottom-0 left-0 top-6 w-px -translate-x-1/2 bg-gold/70" />
                <div className="absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold tabular-nums text-white shadow-lg">
                  {fmt(units, 2)} ünite
                </div>
              </div>
            )}
          </div>

          {overflow && (
            <p className="mt-6 rounded-sm border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-xs leading-relaxed text-amber-200">
              Bu doz {syringe.label} şırıngaya sığmıyor: {fmt(units ?? 0, 2)} ünite
              gerekiyor, skala {syringe.maxUnits} ünitede bitiyor. Daha büyük bir
              şırınga seçin ya da flakonu daha az suyla sulandırın.
            </p>
          )}

          {units === null && (
            <p className="mt-6 text-xs leading-relaxed text-white/45">
              Flakondaki peptid miktarını, sulandırma suyunu ve hedef dozu girin;
              çekmeniz gereken yer şırınga üzerinde işaretlenecek.
            </p>
          )}
        </div>
      </div>

      {/* Sonuç şeridi */}
      <div className="grid grid-cols-2 divide-x divide-hairline border-b border-hairline bg-surface sm:grid-cols-4">
        {[
          {
            k: "Çekilecek hacim",
            v: drawMl !== null ? `${fmt(drawMl, 3)} mL` : "—",
          },
          {
            k: "Konsantrasyon",
            v: refConcentration !== null ? `${fmt(refConcentration, 3)} ${unitLabel}/mL` : "—",
          },
          {
            k: "1 ünitede",
            v:
              perUnitAmount !== null
                ? unitSystem === "mg"
                  ? `${fmt(perUnitAmount, 4)} mg · ${fmt(perUnitAmount * 1000, 1)} mcg`
                  : `${fmt(perUnitAmount, 3)} IU`
                : "—",
          },
          {
            k: "Flakon başına doz",
            v: dosesPerVial ? `≈ ${Math.floor(dosesPerVial)} doz` : "—",
          },
        ].map((cell) => (
          <div key={cell.k} className="px-4 py-4 sm:px-5 sm:py-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {cell.k}
            </p>
            <p className="mt-1.5 text-sm font-bold tabular-nums text-foreground sm:text-base">
              {cell.v}
            </p>
          </div>
        ))}
      </div>

      {/* Girişler */}
      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="space-y-7">
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Flakondaki peptidler
              </label>
              <div className="inline-flex rounded-sm border border-hairline p-0.5">
                {(["mg", "IU"] as UnitSystem[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnitSystem(u)}
                    className={`rounded-sm px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      unitSystem === u
                        ? "bg-gold text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {u === "mg" ? "mg" : "IU"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              {entries.map((entry) => {
                const isRef = entry.id === reference.id
                return (
                  <div
                    key={entry.id}
                    className={`rounded-sm border p-3 transition-colors ${
                      isRef && entries.length > 1
                        ? "border-gold/50 bg-gold/[0.04]"
                        : "border-hairline"
                    }`}
                  >
                    <div className="flex gap-2">
                      <select
                        value={entry.slug}
                        onChange={(e) => {
                          const p = CALCULABLE_PEPTIDES.find((x) => x.slug === e.target.value)
                          updateEntry(entry.id, {
                            slug: e.target.value,
                            name: p ? p.name : entry.name,
                          })
                        }}
                        className="min-w-0 flex-1 rounded-sm border border-hairline bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
                      >
                        <option value="">Bileşik seçin</option>
                        {CALCULABLE_PEPTIDES.map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={entry.amount}
                        onChange={(e) => updateEntry(entry.id, { amount: e.target.value })}
                        placeholder={unitSystem === "mg" ? "mg" : "IU"}
                        aria-label={`Miktar (${unitLabel})`}
                        className="w-20 shrink-0 rounded-sm border border-hairline bg-background px-3 py-2.5 text-sm tabular-nums text-foreground outline-none transition-colors focus:border-gold"
                      />
                      {entries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEntry(entry.id)}
                          aria-label="Bu bileşiği kaldır"
                          className="shrink-0 rounded-sm border border-hairline px-2.5 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                        >
                          ×
                        </button>
                      )}
                    </div>

                    {entries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setReferenceId(entry.id)}
                        className={`mt-2 text-[11px] font-medium transition-colors ${
                          isRef ? "text-gold" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {isRef ? "Hedef doz buna göre hesaplanıyor" : "Hedefi buna çevir"}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={addEntry}
              className="mt-3 inline-flex items-center gap-1.5 rounded-sm border border-dashed border-hairline px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <span aria-hidden="true">+</span> Peptid ekle
            </button>
            {entries.length > 1 && (
              <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
                Karışım flakonu: toplam {fmt(totalAmount, 3)} {unitLabel}. Hesap,
                işaretli bileşiğin konsantrasyonuna göre yapılır; aynı hacimde
                diğerlerinden ne geldiği aşağıda listelenir.
              </p>
            )}
          </div>

          {referencePeptide?.dosing && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {referencePeptide.name} için kütüphanedeki basamaklar
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {referencePeptide.dosing.map((step) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => fillFromStep(step)}
                    className="rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    {step.label}: {step.amount}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sulandırma suyu (mL)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={waterMl}
                onChange={(e) => setWaterMl(e.target.value)}
                placeholder="örn. 3"
                className="mt-2 w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm tabular-nums text-foreground outline-none transition-colors focus:border-gold"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {WATER_PRESETS_ML.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setWaterMl(String(v))}
                    className="rounded-full border border-hairline px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    {v} mL
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Hedef doz
                {entries.length > 1 && reference.name ? ` · ${reference.name}` : ""}
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={doseAmount}
                  onChange={(e) => setDoseAmount(e.target.value)}
                  placeholder={unitSystem === "mg" ? "örn. 0,5" : "örn. 4"}
                  className="w-full min-w-0 rounded-sm border border-hairline bg-background px-4 py-3 text-sm tabular-nums text-foreground outline-none transition-colors focus:border-gold"
                />
                {unitSystem === "mg" && (
                  <div className="inline-flex shrink-0 rounded-sm border border-hairline p-1">
                    {(["mg", "mcg"] as DoseUnit[]).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setDoseUnit(u)}
                        className={`rounded-sm px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                          doseUnit === u
                            ? "bg-gold text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Şırınga
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {SYRINGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSyringeId(s.id)}
                  className={`rounded-sm border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    s.id === syringeId
                      ? "border-gold bg-gold text-primary-foreground"
                      : "border-hairline text-muted-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  {s.label}
                  <span className="ml-1.5 font-normal opacity-70">{s.maxUnits} ü</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Özet sütunu */}
        <div className="space-y-5 rounded-xl border border-hairline bg-surface p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Çekilecek miktar
            </p>
            <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-foreground">
              {units !== null ? fmt(units, 2) : "—"}
              <span className="ml-2 text-base font-semibold text-muted-foreground">
                ünite
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {drawMl !== null
                ? `${fmt(drawMl, 3)} mL · ${syringe.label} şırıngada`
                : "Değerleri girin"}
            </p>
          </div>

          {entries.length > 1 && drawMl !== null && (
            <div className="border-t border-hairline pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Bu hacimde ne var
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {entries.map((e) => {
                  const amt = parseNum(e.amount)
                  if (amt === null || water === null) return null
                  const inDraw = (amt / water) * drawMl
                  return (
                    <li key={e.id} className="flex justify-between gap-3 text-xs">
                      <span className="min-w-0 truncate text-muted-foreground">
                        {e.name || "Bileşik"}
                      </span>
                      <span className="shrink-0 font-semibold tabular-nums text-foreground">
                        {unitSystem === "mg"
                          ? `${fmt(inDraw, 3)} mg`
                          : `${fmt(inDraw, 2)} IU`}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={units === null}
            className="w-full rounded-sm border border-hairline bg-background py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "Kopyalandı" : "Sonucu kopyala"}
          </button>

          <p className="border-t border-hairline pt-5 text-[11px] leading-relaxed text-muted-foreground">
            {referencePeptide ? (
              <>
                <span className="font-semibold text-foreground">
                  {tierLabel[referencePeptide.tier]}:
                </span>{" "}
                {tierDosingDisclaimer[referencePeptide.tier]}
              </>
            ) : (
              "Bu hesaplama yalnızca matematiksel bir sulandırma dönüşümüdür, tıbbi tavsiye değildir. Flakon içeriğini her zaman ürün etiketinden doğrulayın."
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export function CalculablePeptideLinks() {
  if (CALCULABLE_PEPTIDES.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {CALCULABLE_PEPTIDES.map((p) => (
        <Link
          key={p.slug}
          href={`/peptidler/${p.slug}`}
          className="rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
        >
          {p.name}
        </Link>
      ))}
    </div>
  )
}
