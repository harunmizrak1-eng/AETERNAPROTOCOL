"use client"

import { useMemo, useState } from "react"

interface AccumulationCalculatorProps {
  /** Representative half-life in hours - fixed per compound. */
  halfLifeHours: number
  /** Sensible starting values, derived from the compound's own maintenance
   * dosing step so the default curve isn't arbitrary. */
  defaultDose: number
  defaultDoseUnit: string
  defaultIntervalHours: number
}

const INTERVAL_PRESETS = [
  { label: "Günde 2 kez", hours: 12 },
  { label: "Günde 1 kez", hours: 24 },
  { label: "2 günde 1 kez", hours: 48 },
  { label: "Haftada 2 kez", hours: 84 },
  { label: "Haftada 1 kez", hours: 168 },
]

/** One-compartment repeated-dose superposition: each dose decays
 * exponentially from the moment it's given, and concentrations from all
 * doses so far simply add up. This is the same math behind any standard
 * multiple-dosing accumulation curve - not specific to any one compound. */
function buildCurve(halfLifeHours: number, dose: number, intervalHours: number) {
  const k = Math.log(2) / halfLifeHours
  const totalHours = Math.min(Math.max(intervalHours * 12, halfLifeHours * 8), 24 * 60)
  const stepHours = totalHours / 240
  const points: { t: number; c: number }[] = []
  for (let i = 0; i <= 240; i++) {
    const t = i * stepHours
    let c = 0
    for (let doseTime = 0; doseTime <= t; doseTime += intervalHours) {
      c += dose * Math.exp(-k * (t - doseTime))
    }
    points.push({ t, c })
  }
  const ssPeak = dose / (1 - Math.exp(-k * intervalHours))
  const ssTrough = ssPeak * Math.exp(-k * intervalHours)
  const peak = Math.max(...points.map((p) => p.c))
  const trough = points.length > 1 ? Math.min(...points.slice(1).map((p) => p.c)) : 0
  return { points, totalHours, peak, trough, ssPeak, ssTrough }
}

function formatAmount(value: number, unit: string) {
  if (value >= 100) return `${value.toFixed(0)}${unit}`
  if (value >= 10) return `${value.toFixed(1)}${unit}`
  return `${value.toFixed(2)}${unit}`
}

function formatDuration(hours: number) {
  if (hours < 24) return `${hours.toFixed(0)} sa`
  return `${(hours / 24).toFixed(0)} gün`
}

export function AccumulationCalculator({
  halfLifeHours,
  defaultDose,
  defaultDoseUnit,
  defaultIntervalHours,
}: AccumulationCalculatorProps) {
  const [dose, setDose] = useState(defaultDose)
  const [intervalHours, setIntervalHours] = useState(defaultIntervalHours)

  const curve = useMemo(
    () => buildCurve(halfLifeHours, dose, intervalHours),
    [halfLifeHours, dose, intervalHours]
  )

  const width = 640
  const height = 220
  const padLeft = 8
  const padBottom = 24
  const maxC = curve.ssPeak * 1.1 || 1
  const path = curve.points
    .map((p, i) => {
      const x = padLeft + (p.t / curve.totalHours) * (width - padLeft * 2)
      const y = height - padBottom - (p.c / maxC) * (height - padBottom - 10)
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

  return (
    <div>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs tracking-normal text-muted-foreground font-medium">
            Doz ({defaultDoseUnit})
          </span>
          <input
            type="number"
            min={0}
            step={defaultDose >= 10 ? 1 : 0.05}
            value={dose}
            onChange={(e) => setDose(Math.max(0, Number(e.target.value) || 0))}
            className="w-28 border-b border-hairline bg-transparent px-1 py-1 font-mono text-sm text-foreground focus:border-gold focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs tracking-normal text-muted-foreground font-medium">
            Sıklık
          </span>
          <select
            value={intervalHours}
            onChange={(e) => setIntervalHours(Number(e.target.value))}
            className="w-40 border-b border-hairline bg-transparent px-1 py-1 font-mono text-sm text-foreground focus:border-gold focus:outline-none"
          >
            {INTERVAL_PRESETS.map((p) => (
              <option key={p.hours} value={p.hours} className="bg-surface">
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          role="img"
          aria-label="Birikim eğrisi grafiği"
          className="min-w-[480px]"
        >
          <line
            x1={padLeft}
            y1={height - padBottom}
            x2={width - padLeft}
            y2={height - padBottom}
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          <path d={path} fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.85" />
          <text x={padLeft} y={height - 6} className="fill-muted-foreground" fontSize="9" fontFamily="var(--font-mono)">
            0
          </text>
          <text
            x={width - padLeft}
            y={height - 6}
            textAnchor="end"
            className="fill-muted-foreground"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            {formatDuration(curve.totalHours)}
          </text>
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        <div>
          <p className="text-xs tracking-normal text-muted-foreground font-medium">En yüksek</p>
          <p className="mt-1 font-mono text-sm text-foreground/90">
            {formatAmount(curve.peak, defaultDoseUnit)}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-normal text-muted-foreground font-medium">En düşük</p>
          <p className="mt-1 font-mono text-sm text-foreground/90">
            {formatAmount(curve.trough, defaultDoseUnit)}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-normal text-gold/80 font-medium">Kararlı durumda en yüksek</p>
          <p className="mt-1 font-mono text-sm text-foreground/90">
            {formatAmount(curve.ssPeak, defaultDoseUnit)}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-normal text-gold/80 font-medium">Kararlı durumda en düşük</p>
          <p className="mt-1 font-mono text-sm text-foreground/90">
            {formatAmount(curve.ssTrough, defaultDoseUnit)}
          </p>
        </div>
      </div>
    </div>
  )
}
