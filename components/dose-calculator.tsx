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
type SyringeType = "U100" | "U40"

const SYRINGE_UNITS_PER_ML: Record<SyringeType, number> = {
  U100: 100,
  U40: 40,
}

/* Yalnızca dosing dizisi olan bileşikler listelenir — hızlı doldurma
 * çipleri için gösterilecek gerçek bir basamak yoksa dropdown'a
 * eklenmiyor. Seçim isteğe bağlı kalır, hesap makinesi manuel girişle de
 * tam çalışır. */
const CALCULABLE_PEPTIDES = peptides.filter(
  (p) => p.dosing && p.dosing.length > 0,
)

const WATER_PRESETS_ML = [1, 2, 3, 5]
const VIAL_PRESETS_MG = [2, 5, 10, 20, 25, 50, 60]
const VIAL_PRESETS_IU = [30, 50, 100, 150, 200]

function parseNum(value: string): number | null {
  const n = Number(value.replace(",", "."))
  return Number.isFinite(n) && n > 0 ? n : null
}

function formatNum(n: number, digits = 2): string {
  return n.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}

export function DoseCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("mg")
  const [peptideSlug, setPeptideSlug] = useState<string>("")
  const [vialContent, setVialContent] = useState<string>("")
  const [waterMl, setWaterMl] = useState<string>("")
  const [doseAmount, setDoseAmount] = useState<string>("")
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg")
  const [syringe, setSyringe] = useState<SyringeType>("U100")
  const [copied, setCopied] = useState(false)

  const selectedPeptide = useMemo(
    () => CALCULABLE_PEPTIDES.find((p) => p.slug === peptideSlug),
    [peptideSlug],
  )

  const vial = parseNum(vialContent)
  const water = parseNum(waterMl)
  const doseRaw = parseNum(doseAmount)

  /* Tüm hesap tek birime (mg sisteminde mg, IU sisteminde IU) indirgenir;
   * mcg yalnızca giriş/gösterim kolaylığı, formülün kendisi değişmiyor. */
  const dose =
    doseRaw !== null && unitSystem === "mg" && doseUnit === "mcg"
      ? doseRaw / 1000
      : doseRaw

  const concentration = vial !== null && water !== null ? vial / water : null
  const doseVolumeMl =
    concentration !== null && concentration > 0 && dose !== null
      ? dose / concentration
      : null
  const units =
    doseVolumeMl !== null ? doseVolumeMl * SYRINGE_UNITS_PER_ML[syringe] : null
  const dosesPerVial =
    vial !== null && dose !== null && dose > 0 ? vial / dose : null

  const unitLabel = unitSystem === "mg" ? "mg" : "IU"

  function fillFromStep(step: DoseStep) {
    setDoseUnit("mg")
    setUnitSystem("mg")
    setDoseAmount(String(step.amountValue))
  }

  function resultText(): string {
    if (units === null || doseVolumeMl === null) return ""
    return [
      selectedPeptide ? `${selectedPeptide.name} hesaplaması` : "Sulandırma hesaplaması",
      `Flakon içeriği: ${vial} ${unitLabel}`,
      `Sulandırma suyu: ${water} mL`,
      `Konsantrasyon: ${formatNum(concentration ?? 0, 3)} ${unitLabel}/mL`,
      `Hedef doz: ${doseAmount} ${doseUnit}`,
      `Çekilecek hacim: ${formatNum(doseVolumeMl, 3)} mL`,
      `Şırınga (${syringe}): ${formatNum(units, 1)} ünite`,
      dosesPerVial ? `Flakon başına yaklaşık doz: ${Math.floor(dosesPerVial)}` : null,
    ]
      .filter(Boolean)
      .join("\n")
  }

  async function handleCopy() {
    const text = resultText()
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Panoya erişim engellenmişse (izin yok, http bağlam vb.) sessizce
       * yoksay — buton "Kopyala" yazısında kalır, işlevin geri kalanı
       * etkilenmez. */
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      {/* Sol: girişler */}
      <div className="space-y-8">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Bileşik (isteğe bağlı, hızlı doldurma için)
          </label>
          <select
            value={peptideSlug}
            onChange={(e) => {
              setPeptideSlug(e.target.value)
            }}
            className="mt-2 w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
          >
            <option value="">Manuel giriş</option>
            {CALCULABLE_PEPTIDES.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>

          {selectedPeptide?.dosing && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedPeptide.dosing.map((step) => (
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
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Birim sistemi
            </label>
          </div>
          <div className="mt-2 inline-flex rounded-sm border border-hairline p-1">
            {(["mg", "IU"] as UnitSystem[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnitSystem(u)}
                className={`rounded-sm px-4 py-1.5 text-xs font-semibold transition-colors ${
                  unitSystem === u
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {u === "mg" ? "Peptid (mg)" : "HGH (IU)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Flakon içeriği ({unitLabel})
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={vialContent}
              onChange={(e) => setVialContent(e.target.value)}
              placeholder={unitSystem === "mg" ? "örn. 25" : "örn. 100"}
              className="mt-2 w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(unitSystem === "mg" ? VIAL_PRESETS_MG : VIAL_PRESETS_IU).map(
                (v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVialContent(String(v))}
                    className="rounded-full border border-hairline px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    {v}
                  </button>
                ),
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sulandırma suyu (mL)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={waterMl}
              onChange={(e) => setWaterMl(e.target.value)}
              placeholder="örn. 2"
              className="mt-2 w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
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
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Hedef doz
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={doseAmount}
                onChange={(e) => setDoseAmount(e.target.value)}
                placeholder={unitSystem === "mg" ? "örn. 0.5" : "örn. 4"}
                className="w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
              />
              {unitSystem === "mg" && (
                <div className="inline-flex shrink-0 rounded-sm border border-hairline p-1">
                  {(["mg", "mcg"] as DoseUnit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setDoseUnit(u)}
                      className={`rounded-sm px-3 py-1.5 text-xs font-semibold transition-colors ${
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

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Şırınga tipi
            </label>
            <div className="mt-2 inline-flex rounded-sm border border-hairline p-1">
              {(["U100", "U40"] as SyringeType[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSyringe(s)}
                  className={`rounded-sm px-4 py-1.5 text-xs font-semibold transition-colors ${
                    syringe === s
                      ? "bg-gold text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "U100" ? "U-100 (100 ü/mL)" : "U-40 (40 ü/mL)"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sağ: sonuç paneli */}
      <div className="border border-hairline bg-muted/30 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Sonuç
        </p>

        {units !== null && doseVolumeMl !== null ? (
          <>
            <div className="mt-4">
              <p className="text-5xl font-bold tracking-tight text-foreground">
                {formatNum(units, 1)}
                <span className="ml-2 text-lg font-semibold text-muted-foreground">
                  ünite
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {syringe} şırıngada · {formatNum(doseVolumeMl, 3)} mL
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-6">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Konsantrasyon
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {concentration !== null ? formatNum(concentration, 3) : "—"}{" "}
                  {unitLabel}/mL
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Flakon başına doz
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {dosesPerVial ? `≈ ${Math.floor(dosesPerVial)} doz` : "—"}
                </p>
              </div>
            </div>

            {/* Şırınga göstergesi: 100 (veya 40) ünitelik skalada çekilecek
                miktarın görsel karşılığı. */}
            <div className="mt-6">
              <div className="relative h-8 w-full overflow-hidden rounded-sm border border-hairline bg-background">
                <div
                  className="h-full bg-gold/70 transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (units / SYRINGE_UNITS_PER_ML[syringe]) * 100,
                    )}%`,
                  }}
                />
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((tick) => (
                  <div
                    key={tick}
                    aria-hidden="true"
                    className="absolute top-0 h-full w-px bg-hairline"
                    style={{ left: `${tick}%` }}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>0</span>
                <span>{SYRINGE_UNITS_PER_ML[syringe] / 2}</span>
                <span>{SYRINGE_UNITS_PER_ML[syringe]} ü</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-6 w-full rounded-sm border border-hairline py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {copied ? "Kopyalandı" : "Sonucu kopyala"}
            </button>
          </>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Flakon içeriği, sulandırma suyu ve hedef dozu girin, sonuç burada
            görünecek.
          </p>
        )}

        <div className="mt-6 border-t border-hairline pt-6 text-xs leading-relaxed text-muted-foreground">
          {selectedPeptide ? (
            <>
              <span className="font-semibold text-foreground">
                {tierLabel[selectedPeptide.tier]}:
              </span>{" "}
              {tierDosingDisclaimer[selectedPeptide.tier]}
            </>
          ) : (
            "Bu hesaplama yalnızca matematiksel bir sulandırma dönüşümüdür, tıbbi tavsiye değildir. Flakon içeriğini her zaman ürün etiketinden doğrulayın."
          )}
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
