"use client"

import { useMemo, useState } from "react"
import {
  peptides,
  tierDosingDisclaimer,
  tierLabel,
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

/* Şırınga çizimi SVG kullanıcı birimiyle ölçülür; viewBox 620x104. Telefonda
 * çizim küçüldüğü için skala rakamları okunmaz hale geliyor, bu yüzden kesin
 * değerler her zaman çizimin altındaki sayı şeridinde de yazıyor.
 *
 * Gerçekte piston tamamen çekildiğinde kol bir gövde boyu dışarı çıkar; o
 * kadar yer ayırmak gövdeyi yarıya düşürüp skalayı okunmaz yapıyordu. Kol
 * hareketi PLUNGER_TRAVEL ile kısaltıldı. Ölçüm gövdeden okunduğu için bu
 * kısaltma sonucu etkilemiyor. */
const VB_W = 620
const VB_H = 104
const BARREL_X = 92
const BARREL_W = 340
const BARREL_Y = 30
const BARREL_H = 52
const PLUNGER_TRAVEL = 0.48

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

interface Tick {
  at: number
  major: boolean
  label?: number
}

/** İnsülin şırıngasının ölçekli çizimi: çelik iğne ve eğik uç, konik göbek,
 * saydam gövde, kauçuk tıkaç, piston kolu ve başparmak desteği. Sıvı ile
 * tıkaç doza göre hareket eder, çekilecek yer gövdenin üstünde işaretlenir. */
function SyringeDrawing({
  fillPct,
  ticks,
  badge,
}: {
  fillPct: number
  ticks: Tick[]
  badge: string | null
}) {
  const barrelRight = BARREL_X + BARREL_W
  const stopperX = BARREL_X + fillPct * BARREL_W
  const thumbX = barrelRight + 12 + fillPct * BARREL_W * PLUNGER_TRAVEL
  const midY = BARREL_Y + BARREL_H / 2
  const badgeW = badge ? Math.max(64, badge.length * 6.2 + 18) : 0
  const badgeX = Math.min(
    VB_W - badgeW / 2 - 2,
    Math.max(badgeW / 2 + 2, stopperX),
  )
  const ease = "cubic-bezier(0.22, 0.61, 0.36, 1)"

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="mt-8 w-full"
      role="img"
      aria-label={badge ? `Şırıngada ${badge} işaretli` : "Boş insülin şırıngası"}
    >
      <defs>
        <linearGradient id="dc-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbe4ee" />
          <stop offset="45%" stopColor="#93a5b8" />
          <stop offset="100%" stopColor="#4e5d6e" />
        </linearGradient>
        <linearGradient id="dc-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4aa6e0" />
          <stop offset="55%" stopColor="#0072bc" />
          <stop offset="100%" stopColor="#005a96" />
        </linearGradient>
        <linearGradient id="dc-stopper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b6a7c" />
          <stop offset="50%" stopColor="#2b3846" />
          <stop offset="100%" stopColor="#18222d" />
        </linearGradient>
        <clipPath id="dc-barrel-clip">
          <rect
            x={BARREL_X}
            y={BARREL_Y}
            width={BARREL_W}
            height={BARREL_H}
            rx="3"
          />
        </clipPath>
      </defs>

      {/* İğne: eğik uç ve çelik gövde */}
      <path d="M4 45.4 L16 43.6 L16 48.4 L4 48.4 Z" fill="url(#dc-steel)" />
      <rect x="14" y="44.2" width="58" height="4" fill="url(#dc-steel)" />
      {/* Göbek: iğneden gövdeye açılan koni */}
      <path
        d="M70 39 L88 33 L88 59 L70 53 Z"
        fill="rgba(255,255,255,0.22)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
      />
      <rect x="86" y="34" width="8" height="24" rx="1.5" fill="rgba(255,255,255,0.28)" />

      {/* Gövde */}
      <rect
        x={BARREL_X}
        y={BARREL_Y}
        width={BARREL_W}
        height={BARREL_H}
        rx="3"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
      />

      <g clipPath="url(#dc-barrel-clip)">
        {/* Sıvı */}
        <rect
          x={BARREL_X}
          y={BARREL_Y}
          height={BARREL_H}
          fill="url(#dc-liquid)"
          style={{ width: fillPct * BARREL_W, transition: `width 650ms ${ease}` }}
        />
        {/* Cam parlaması */}
        <rect
          x={BARREL_X}
          y={BARREL_Y + 4}
          width={BARREL_W}
          height="7"
          fill="rgba(255,255,255,0.13)"
        />
        {/* Skala çizgileri */}
        {ticks.map((t) => (
          <line
            key={t.at}
            x1={BARREL_X + t.at * BARREL_W}
            x2={BARREL_X + t.at * BARREL_W}
            y1={BARREL_Y}
            y2={BARREL_Y + (t.major ? 11 : 6)}
            stroke={t.major ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.3)"}
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Arka tutamak kanatları */}
      <rect
        x={barrelRight}
        y={BARREL_Y - 9}
        width="7"
        height={BARREL_H + 18}
        rx="2"
        fill="rgba(255,255,255,0.26)"
      />

      {/* Piston kolu ve başparmak desteği */}
      <g style={{ transition: `transform 650ms ${ease}` }}>
        <rect
          x={stopperX}
          y={midY - 4}
          width={Math.max(0, thumbX - stopperX)}
          height="8"
          fill="rgba(255,255,255,0.2)"
          style={{ transition: `x 650ms ${ease}, width 650ms ${ease}` }}
        />
        <rect
          x={stopperX}
          y={midY - 0.7}
          width={Math.max(0, thumbX - stopperX)}
          height="1.4"
          fill="rgba(255,255,255,0.3)"
          style={{ transition: `x 650ms ${ease}, width 650ms ${ease}` }}
        />
        <rect
          x={thumbX}
          y={BARREL_Y - 12}
          width="7"
          height={BARREL_H + 24}
          rx="2.5"
          fill="rgba(255,255,255,0.34)"
          style={{ transition: `x 650ms ${ease}` }}
        />
      </g>

      {/* Kauçuk tıkaç. Konik ucu iğne tarafına bakar ve ucun bittiği nokta
          doz çizgisiyle aynı yerdedir: sıvı tam orada biter, okunacak değer
          de orasıdır. */}
      <g clipPath="url(#dc-barrel-clip)">
        <path
          d={`M${stopperX} ${midY} L${stopperX + 5} ${BARREL_Y + 1} L${stopperX + 15} ${BARREL_Y + 1} L${stopperX + 15} ${BARREL_Y + BARREL_H - 1} L${stopperX + 5} ${BARREL_Y + BARREL_H - 1} Z`}
          fill="url(#dc-stopper)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
          style={{ transition: `d 650ms ${ease}` }}
        />
      </g>

      {/* Skala rakamları */}
      {ticks
        .filter((t) => t.label !== undefined)
        .map((t) => (
          <text
            key={`n${t.at}`}
            x={BARREL_X + t.at * BARREL_W}
            y={BARREL_Y + BARREL_H + 14}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="500"
            fill="rgba(255,255,255,0.5)"
          >
            {t.label}
          </text>
        ))}

      {/* Çekilecek yerin işareti */}
      {badge && (
        <g style={{ transition: `transform 650ms ${ease}` }}>
          <line
            x1={stopperX}
            x2={stopperX}
            y1="18"
            y2={BARREL_Y}
            stroke="#0072bc"
            strokeWidth="1.2"
            style={{ transition: `x1 650ms ${ease}, x2 650ms ${ease}` }}
          />
          <rect
            x={badgeX - badgeW / 2}
            y="2"
            width={badgeW}
            height="17"
            rx="8.5"
            fill="#0072bc"
            style={{ transition: `x 650ms ${ease}` }}
          />
          <text
            x={badgeX}
            y="14.2"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#ffffff"
            style={{ transition: `x 650ms ${ease}` }}
          >
            {badge}
          </text>
        </g>
      )}
    </svg>
  )
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

          <SyringeDrawing
            fillPct={fillPct}
            ticks={ticks}
            badge={units !== null ? `${fmt(units, 2)} ünite` : null}
          />

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
            <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
              0,3 · 0,5 · 1 mL şırıngaların üçü de U-100'dür, yani her birinde
              1 mL 100 üniteye bölünmüştür. Aralarında geçiş yapınca ünite sayısı
              değişmez, yalnızca skala değişir ve çizgi farklı yere denk gelir.
              Küçük dozu okumak için küçük şırınga seçin. Ünite sayısı yalnızca
              U-40'a geçince değişir, çünkü onda 1 mL 40 üniteye bölünür.
            </p>
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

