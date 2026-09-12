"use client"

import { useMemo, useRef, useState } from "react"
import {
  peptides,
  tierDosingDisclaimer,
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
  /** Piston sürüklenirken yuvarlanacak ünite adımı. Büyük şırıngada yarım
   * ünite okunamadığı için orada tam üniteye yuvarlanır. */
  snapStep: number
}

const SYRINGES: Syringe[] = [
  { id: "u100-03", label: "0,3 mL", maxUnits: 30, unitsPerMl: 100, labelStep: 5, minorStep: 1, snapStep: 0.5 },
  { id: "u100-05", label: "0,5 mL", maxUnits: 50, unitsPerMl: 100, labelStep: 10, minorStep: 2, snapStep: 0.5 },
  { id: "u100-10", label: "1 mL", maxUnits: 100, unitsPerMl: 100, labelStep: 20, minorStep: 5, snapStep: 1 },
  { id: "u40-10", label: "1 mL · U-40", maxUnits: 40, unitsPerMl: 40, labelStep: 10, minorStep: 2, snapStep: 0.5 },
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
  maxUnits,
  snapStep,
  onScrub,
}: {
  fillPct: number
  ticks: Tick[]
  badge: string | null
  maxUnits: number
  snapStep: number
  /** Verildiğinde gövde sürüklenebilir olur ve bırakılan üniteyi bildirir. */
  onScrub?: (units: number) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  /* Sürükleme bayrağı hem ref hem durum olarak tutulur. Ref senkron
   * güncellendiği için pointerdown ile aynı tik içinde gelen pointermove
   * olayları kaçmaz; durum yalnızca imleç ve geçiş süresi için gerekli. */
  const draggingRef = useRef(false)
  const [dragging, setDragging] = useState(false)
  const barrelRight = BARREL_X + BARREL_W
  const stopperX = BARREL_X + fillPct * BARREL_W
  const thumbX = barrelRight + 12 + fillPct * BARREL_W * PLUNGER_TRAVEL
  const midY = BARREL_Y + BARREL_H / 2
  const badgeW = badge ? Math.max(64, badge.length * 6.2 + 18) : 0
  const badgeX = Math.min(
    VB_W - badgeW / 2 - 2,
    Math.max(badgeW / 2 + 2, stopperX),
  )
  /* Sürükleme sırasında geçiş kapatılır: her pointermove olayında yeniden
   * başlayan 650ms'lik animasyon parmağın gerisinde kalıyordu. */
  const ease = dragging ? "0ms" : "650ms cubic-bezier(0.22, 0.61, 0.36, 1)"

  function unitsAt(clientX: number): number | null {
    const svg = svgRef.current
    if (!svg) return null
    const r = svg.getBoundingClientRect()
    if (r.width === 0) return null
    const x = ((clientX - r.left) / r.width) * VB_W
    const frac = Math.max(0, Math.min(1, (x - BARREL_X) / BARREL_W))
    return Math.round((frac * maxUnits) / snapStep) * snapStep
  }

  function emit(clientX: number) {
    if (!onScrub) return
    const u = unitsAt(clientX)
    if (u !== null) onScrub(u)
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="mt-6 w-full sm:mt-8"
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
          style={{ width: fillPct * BARREL_W, transition: `width ${ease}` }}
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
      <g style={{ transition: `transform ${ease}` }}>
        <rect
          x={stopperX}
          y={midY - 4}
          width={Math.max(0, thumbX - stopperX)}
          height="8"
          fill="rgba(255,255,255,0.2)"
          style={{ transition: `x ${ease}, width ${ease}` }}
        />
        <rect
          x={stopperX}
          y={midY - 0.7}
          width={Math.max(0, thumbX - stopperX)}
          height="1.4"
          fill="rgba(255,255,255,0.3)"
          style={{ transition: `x ${ease}, width ${ease}` }}
        />
        <rect
          x={thumbX}
          y={BARREL_Y - 12}
          width="7"
          height={BARREL_H + 24}
          rx="2.5"
          fill="rgba(255,255,255,0.34)"
          style={{ transition: `x ${ease}` }}
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
          style={{ transition: `d ${ease}` }}
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

      {/* Sürükleme katmanı. Görünmez, gövdenin tamamını kaplar ve en üstte
          durur; parmak ya da fare gövdenin herhangi bir yerine bastığında
          o noktanın ünite karşılığı yukarı bildirilir. touchAction none
          olmasa sürüklerken sayfa kayıyor. */}
      {onScrub && (
        <rect
          x={BARREL_X}
          y={BARREL_Y - 14}
          width={BARREL_W}
          height={BARREL_H + 28}
          fill="transparent"
          style={{ touchAction: "none", cursor: dragging ? "grabbing" : "grab" }}
          onPointerDown={(e) => {
            /* Değer önce yazılır: setPointerCapture bazı durumlarda
             * InvalidPointerId atıyor ve sonrası hiç çalışmıyordu. */
            emit(e.clientX)
            draggingRef.current = true
            setDragging(true)
            try {
              e.currentTarget.setPointerCapture(e.pointerId)
            } catch {
              /* Yakalama olmadan da sürükleme çalışır, yalnızca parmak
               * gövdenin dışına çıkarsa olay akışı kesilir. */
            }
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) emit(e.clientX)
          }}
          onPointerUp={(e) => {
            draggingRef.current = false
            setDragging(false)
            try {
              e.currentTarget.releasePointerCapture(e.pointerId)
            } catch {
              /* Yakalanmamışsa bırakılacak bir şey de yok. */
            }
          }}
          onPointerCancel={() => {
            draggingRef.current = false
            setDragging(false)
          }}
        />
      )}

      {/* Çekilecek yerin işareti */}
      {badge && (
        <g style={{ transition: `transform ${ease}` }}>
          <line
            x1={stopperX}
            x2={stopperX}
            y1="18"
            y2={BARREL_Y}
            stroke="#0072bc"
            strokeWidth="1.2"
            style={{ transition: `x1 ${ease}, x2 ${ease}` }}
          />
          <rect
            x={badgeX - badgeW / 2}
            y="2"
            width={badgeW}
            height="17"
            rx="8.5"
            fill="#0072bc"
            style={{ transition: `x ${ease}` }}
          />
          <text
            x={badgeX}
            y="14.2"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#ffffff"
            style={{ transition: `x ${ease}` }}
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

/** Hazır seçim düğmesi. Yazı yazmadan tek dokunuşla değer girmek için. */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-lg border px-1 text-sm font-semibold tabular-nums transition-colors ${
        active
          ? "border-gold bg-gold text-primary-foreground"
          : "border-hairline bg-background text-foreground hover:border-gold hover:text-gold"
      }`}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="min-w-0">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </h3>
      <div className="mt-2.5">{children}</div>
    </section>
  )
}

const VIAL_PRESETS = [5, 10, 12, 20, 50, 60]
const DOSE_PRESETS_MG = [0.25, 0.5, 1, 2, 4, 8]
const DOSE_PRESETS_MCG = [100, 250, 500, 1000]
/** Sulandırma ipucunu ararken denenen hacimler. */
const WATER_CANDIDATES = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5]

export function DoseCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("mg")
  const [entries, setEntries] = useState<VialEntry[]>([newEntry()])
  const [referenceId, setReferenceId] = useState("")
  const [waterMl, setWaterMl] = useState("")
  const [doseAmount, setDoseAmount] = useState("")
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg")
  const [syringeId, setSyringeId] = useState(SYRINGES[2].id)
  /* Sürükleme keşfedilebilir değil, bir kez kullanılana kadar ipucu durur. */
  const [scrubbed, setScrubbed] = useState(false)

  const syringe = SYRINGES.find((s) => s.id === syringeId) ?? SYRINGES[2]
  const unitLabel = unitSystem === "mg" ? "mg" : "IU"

  const reference = entries.find((e) => e.id === referenceId) ?? entries[0]
  const referencePeptide = CALCULABLE_PEPTIDES.find((p) => p.slug === reference?.slug)

  const water = parseNum(waterMl)
  const doseRaw = parseNum(doseAmount)
  const dose =
    doseRaw !== null && unitSystem === "mg" && doseUnit === "mcg"
      ? doseRaw / 1000
      : doseRaw

  const referenceAmount = parseNum(reference?.amount ?? "")
  const totalAmount = entries.reduce((sum, e) => sum + (parseNum(e.amount) ?? 0), 0)

  /* Hesap her zaman işaretli bileşiğin konsantrasyonundan yürür. Karışımda
   * toplam miligram üzerinden doz almak yanlış olurdu. */
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
  /* İki ünitenin altındaki çekimlerde şırınga skalası okunamayacak kadar
   * sıkışır; ölçüm hatası dozun kendisiyle kıyaslanabilir hale gelir. */
  const tooSmall = units !== null && units > 0 && units < 2

  /** Dozu tam sayı üniteye getiren bir sulandırma hacmi var mı? Mevcut
   * ayar zaten okunaklı bir sayı veriyorsa ipucu gösterilmez. */
  const waterHint = useMemo(() => {
    if (referenceAmount === null || dose === null || dose <= 0) return null
    const current = units
    const isClean = (u: number) => Math.abs(u - Math.round(u)) < 0.02 && u >= 5
    if (current !== null && isClean(current)) return null
    const options = WATER_CANDIDATES.map((w) => {
      const u = (dose / (referenceAmount / w)) * syringe.unitsPerMl
      return { w, u }
    }).filter((o) => isClean(o.u) && o.u <= syringe.maxUnits)
    if (options.length === 0) return null
    options.sort((a, b) => Math.abs(a.u - 20) - Math.abs(b.u - 20))
    return options[0]
  }, [referenceAmount, dose, units, syringe])

  const ticks = useMemo(() => {
    const out: Tick[] = []
    for (let u = 0; u <= syringe.maxUnits; u += syringe.minorStep) {
      const major = u % syringe.labelStep === 0
      out.push({ at: u / syringe.maxUnits, major, label: major ? u : undefined })
    }
    return out
  }, [syringe])

  function updateEntry(id: string, patch: Partial<VialEntry>) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  /** Şırınga sürüklendiğinde ters yönde çalışır: bırakılan ünite, mevcut
   * konsantrasyondan hedef doza çevrilip doz alanına yazılır. Konsantrasyon
   * bilinmiyorsa (flakon ya da su girilmemişse) sürükleme bir şey yapmaz. */
  function handleScrub(u: number) {
    if (refConcentration === null || refConcentration <= 0) return
    setScrubbed(true)
    const inBase = (u / syringe.unitsPerMl) * refConcentration
    const shown = unitSystem === "mg" && doseUnit === "mcg" ? inBase * 1000 : inBase
    const rounded =
      unitSystem === "mg" && doseUnit === "mg"
        ? Number(shown.toPrecision(4))
        : Number(shown.toFixed(1))
    setDoseAmount(String(rounded))
  }

  function removeEntry(id: string) {
    setEntries((prev) => (prev.length === 1 ? prev : prev.filter((e) => e.id !== id)))
    if (referenceId === id) setReferenceId("")
  }


  const dosePresets = unitSystem === "IU" ? [2, 4, 6, 8] : doseUnit === "mcg" ? DOSE_PRESETS_MCG : DOSE_PRESETS_MG

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-background shadow-[0_1px_2px_rgba(13,27,42,0.04),0_16px_48px_-16px_rgba(13,27,42,0.18)]">
      <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/60 to-transparent" />

      {/* Şırınga ve sonuç */}
      <div className="bg-[#0d1b2a] px-4 pb-7 pt-6 sm:px-10 sm:pb-9 sm:pt-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45 sm:text-[11px] sm:tracking-[0.18em]">
              {syringe.label} · U-{syringe.unitsPerMl}
            </p>
            <p className="shrink-0 text-[10px] font-medium tabular-nums text-white/45 sm:text-[11px]">
              skala 0–{syringe.maxUnits}
            </p>
          </div>

          <SyringeDrawing
            fillPct={fillPct}
            ticks={ticks}
            badge={units !== null ? `${fmt(units, 2)} ünite` : null}
            maxUnits={syringe.maxUnits}
            snapStep={syringe.snapStep}
            onScrub={refConcentration !== null ? handleScrub : undefined}
          />

          <div className="mt-7 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
              Şırıngayı şuraya çekin
            </p>
            <p className="mt-1.5 text-5xl font-bold tabular-nums tracking-tight text-white sm:text-6xl">
              {units !== null ? fmt(units, 2) : "—"}
              <span className="ml-2 text-xl font-semibold text-white/55 sm:text-2xl">
                ünite
              </span>
            </p>
            <p className="mt-1.5 text-xs text-white/50 sm:text-sm">
              {drawMl !== null && dose !== null
                ? `${fmt(dose, 4)} ${unitLabel} doz için · ${fmt(drawMl, 3)} mL`
                : "Aşağıdaki üç değeri seçin"}
            </p>
            {refConcentration !== null && !scrubbed && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70">
                <span aria-hidden="true">↔</span> Pistonu sürükleyin
              </p>
            )}
          </div>

          {overflow && (
            <p className="mt-5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-xs leading-relaxed text-amber-200">
              Bu doz {syringe.label} şırıngaya sığmıyor. Daha büyük şırınga seçin
              ya da flakonu daha az suyla sulandırın.
            </p>
          )}
          {!overflow && tooSmall && (
            <p className="mt-5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-xs leading-relaxed text-amber-200">
              {fmt(units ?? 0, 2)} ünite, skalada okunamayacak kadar küçük. Daha
              fazla su ekleyerek çizgiyi büyütebilirsiniz.
            </p>
          )}
        </div>
      </div>

      {/* Üç değer */}
      <div className="grid grid-cols-3 gap-px border-b border-hairline bg-hairline">
        {[
          {
            k: "Konsantrasyon",
            v: refConcentration !== null ? `${fmt(refConcentration, 3)}` : "—",
            u: `${unitLabel}/mL`,
          },
          {
            k: "1 ünitede",
            v:
              perUnitAmount !== null
                ? unitSystem === "mg"
                  ? fmt(perUnitAmount * 1000, 1)
                  : fmt(perUnitAmount, 3)
                : "—",
            u: unitSystem === "mg" ? "mcg" : "IU",
          },
          {
            k: "Flakon başına",
            v: dosesPerVial ? `${Math.floor(dosesPerVial)}` : "—",
            u: "doz",
          },
        ].map((c) => (
          <div key={c.k} className="bg-surface px-3 py-4 text-center sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {c.k}
            </p>
            <p className="mt-1 text-base font-bold tabular-nums text-foreground sm:text-lg">
              {c.v}
            </p>
            <p className="text-[11px] text-muted-foreground">{c.u}</p>
          </div>
        ))}
      </div>

      {/* Girişler */}
      <div className="space-y-7 p-5 sm:p-8">
        <Field label="Şırınga">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SYRINGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSyringeId(s.id)}
                className={`min-h-14 rounded-lg border px-2 text-center transition-colors ${
                  s.id === syringeId
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-hairline text-foreground hover:border-gold hover:text-gold"
                }`}
              >
                <span className="block text-sm font-bold">{s.label}</span>
                <span className="mt-0.5 block text-[11px] opacity-70">
                  {s.maxUnits} ü · U-{s.unitsPerMl}
                </span>
              </button>
            ))}
          </div>
        </Field>

        <Field label={unitSystem === "mg" ? "Flakondaki peptid" : "Flakondaki HGH"}>
          <div className="mb-2.5 inline-flex rounded-lg border border-hairline p-0.5">
            {(["mg", "IU"] as UnitSystem[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnitSystem(u)}
                className={`min-h-9 rounded px-3.5 text-xs font-semibold transition-colors ${
                  unitSystem === u
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {u === "mg" ? "Peptid · mg" : "HGH · IU"}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {entries.map((entry, i) => {
              const isRef = entry.id === reference?.id
              const many = entries.length > 1
              return (
                <div
                  key={entry.id}
                  className={`min-w-0 rounded-xl border p-3.5 transition-colors ${
                    isRef && many ? "border-gold/60 bg-gold/[0.04]" : "border-hairline"
                  }`}
                >
                  {many && (
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {i + 1}. bileşik
                      </span>
                      {isRef ? (
                        <span className="rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-bold text-gold">
                          Doz buna göre
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setReferenceId(entry.id)}
                          className="text-[11px] font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-gold hover:underline"
                        >
                          Hedefi buna çevir
                        </button>
                      )}
                    </div>
                  )}

                  <select
                    value={entry.slug}
                    onChange={(e) => {
                      const found = CALCULABLE_PEPTIDES.find((x) => x.slug === e.target.value)
                      updateEntry(entry.id, {
                        slug: e.target.value,
                        name: found ? found.name : entry.name,
                      })
                    }}
                    aria-label="Bileşik"
                    className="min-h-12 w-full rounded-lg border border-hairline bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
                  >
                    <option value="">Bileşik seçin (isteğe bağlı)</option>
                    {CALCULABLE_PEPTIDES.map((pp) => (
                      <option key={pp.slug} value={pp.slug}>
                        {pp.name}
                      </option>
                    ))}
                  </select>

                  <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {VIAL_PRESETS.map((v) => (
                      <Chip
                        key={v}
                        active={entry.amount === String(v)}
                        onClick={() => updateEntry(entry.id, { amount: String(v) })}
                      >
                        {v}
                      </Chip>
                    ))}
                  </div>

                  <div className="mt-2 flex items-stretch gap-2">
                    <div className="relative flex min-w-0 flex-1">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={entry.amount}
                        onChange={(e) => updateEntry(entry.id, { amount: e.target.value })}
                        placeholder="Diğer"
                        aria-label={`Flakondaki miktar (${unitLabel})`}
                        className="min-h-12 w-full min-w-0 rounded-lg border border-hairline bg-background pl-3.5 pr-12 text-sm tabular-nums text-foreground outline-none transition-colors focus:border-gold"
                      />
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                        {unitLabel}
                      </span>
                    </div>
                    {many && (
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        aria-label="Bu bileşiği kaldır"
                        className="min-h-12 shrink-0 rounded-lg border border-hairline px-4 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                      >
                        Kaldır
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setEntries((prev) => [...prev, newEntry()])}
            className="mt-2.5 inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-dashed border-hairline px-4 text-xs font-semibold text-muted-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <span aria-hidden="true">+</span> Karışım için peptid ekle
          </button>
        </Field>

        <Field label="Bakteriyostatik su">
          <div className="grid grid-cols-4 gap-2">
            {WATER_PRESETS_ML.map((v) => (
              <Chip
                key={v}
                active={waterMl === String(v)}
                onClick={() => setWaterMl(String(v))}
              >
                {v} mL
              </Chip>
            ))}
          </div>
          <div className="relative mt-2 flex">
            <input
              type="text"
              inputMode="decimal"
              value={waterMl}
              onChange={(e) => setWaterMl(e.target.value)}
              placeholder="Diğer"
              aria-label="Sulandırma suyu (mL)"
              className="min-h-12 w-full min-w-0 rounded-lg border border-hairline bg-background pl-3.5 pr-12 text-sm tabular-nums text-foreground outline-none transition-colors focus:border-gold"
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
              mL
            </span>
          </div>
        </Field>

        <Field
          label={
            entries.length > 1 && reference?.name
              ? `Hedef doz · ${reference.name}`
              : "Hedef doz"
          }
        >
          {unitSystem === "mg" && (
            <div className="mb-2.5 inline-flex rounded-lg border border-hairline p-0.5">
              {(["mg", "mcg"] as DoseUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setDoseUnit(u)}
                  className={`min-h-9 rounded px-4 text-xs font-semibold transition-colors ${
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
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {dosePresets.map((v) => (
              <Chip
                key={v}
                active={doseAmount === String(v)}
                onClick={() => setDoseAmount(String(v))}
              >
                {fmt(v, 3)}
              </Chip>
            ))}
          </div>
          <div className="relative mt-2 flex">
            <input
              type="text"
              inputMode="decimal"
              value={doseAmount}
              onChange={(e) => setDoseAmount(e.target.value)}
              placeholder="Diğer"
              aria-label="Hedef doz"
              className="min-h-12 w-full min-w-0 rounded-lg border border-hairline bg-background pl-3.5 pr-14 text-sm tabular-nums text-foreground outline-none transition-colors focus:border-gold"
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
              {unitSystem === "mg" ? doseUnit : "IU"}
            </span>
          </div>
        </Field>

        {waterHint && (
          <button
            type="button"
            onClick={() => setWaterMl(String(waterHint.w))}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/[0.05] px-4 py-3 text-left transition-colors hover:bg-gold/10"
          >
            <span className="min-w-0 text-xs leading-relaxed text-foreground">
              <span className="font-semibold">{fmt(waterHint.w, 2)} mL</span> su
              eklersen bu doz tam{" "}
              <span className="font-semibold">{Math.round(waterHint.u)} ünite</span>{" "}
              çizgisine denk gelir, skalada okuması kolay olur.
            </span>
            <span className="shrink-0 text-[11px] font-bold text-gold">Uygula</span>
          </button>
        )}

        {entries.length > 1 && drawMl !== null && water !== null && (
          <div className="rounded-xl border border-hairline bg-surface p-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Bu hacimde ne var
            </h3>
            <ul className="mt-2 divide-y divide-hairline">
              {entries.map((e) => {
                const amt = parseNum(e.amount)
                if (amt === null) return null
                const inDraw = (amt / water) * drawMl
                return (
                  <li key={e.id} className="flex justify-between gap-3 py-2 text-sm">
                    <span className="min-w-0 truncate text-muted-foreground">
                      {e.name || "Bileşik"}
                    </span>
                    <span className="shrink-0 font-bold tabular-nums text-foreground">
                      {unitSystem === "mg" ? `${fmt(inDraw, 3)} mg` : `${fmt(inDraw, 2)} IU`}
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Flakonda toplam {fmt(totalAmount, 3)} {unitLabel} var.
            </p>
          </div>
        )}

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {referencePeptide
            ? tierDosingDisclaimer[referencePeptide.tier]
            : "Matematiksel bir dönüşümdür, tıbbi tavsiye değildir. Flakon içeriğini ürün etiketinden doğrulayın."}
        </p>
      </div>
    </div>
  )
}
