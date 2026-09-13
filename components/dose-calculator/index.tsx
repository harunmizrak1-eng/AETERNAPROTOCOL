"use client"

import { useEffect, useMemo, useState } from "react"
import { SyringeDrawing, type Tick } from "./syringe-drawing"
import { Chip, Field, PeptidePicker, UnitInput } from "./ui"
import {
  CALCULABLE_PEPTIDES,
  DEFAULT_SYRINGE_ID,
  DOSE_PRESETS_MCG,
  DOSE_PRESETS_MG,
  PRESET_BY_PRODUCT_SLUG,
  SYRINGES,
  UNITS_PER_ML,
  VIAL_AMOUNTS_BY_PEPTIDE,
  VIAL_PRESETS,
  WATER_CANDIDATES,
  WATER_PRESETS_ML,
  fmt,
  parseNum,
  type DoseUnit,
} from "./data"

/** Bileşik seçiliyse gerçekten sattığımız flakon boyları, değilse genel liste. */
function vialOptions(slug: string): number[] {
  const sold = slug ? VIAL_AMOUNTS_BY_PEPTIDE[slug] : undefined
  return sold && sold.length > 0 ? sold : VIAL_PRESETS
}

export function DoseCalculator() {
  const [slug, setSlug] = useState("")
  const [amount, setAmount] = useState("")
  const [waterMl, setWaterMl] = useState("")
  const [doseAmount, setDoseAmount] = useState("")
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg")
  const [syringeId, setSyringeId] = useState(DEFAULT_SYRINGE_ID)
  /* Sürükleme keşfedilebilir değil, bir kez kullanılana kadar ipucu durur. */
  const [scrubbed, setScrubbed] = useState(false)

  const syringe = SYRINGES.find((s) => s.id === syringeId) ?? SYRINGES[2]
  const options = vialOptions(slug)

  /* Ürün sayfasından "Bu ürünle hesapla" ile gelindiğinde adres
   * /hesaplayici#urun=<ürün-slug> oluyor ve o bağlantı flakon miktarının
   * hazır geleceğini söylüyor. Adres çubuğu sunucuda okunamadığı için
   * doldurma istemcide, ilk boyamadan sonra yapılır. Bileşik kütüphanede
   * listelenmiyorsa (HGH) yalnızca miktar yazılır, seçim boş kalır. */
  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash
      const product = hash.match(/urun=([^&]+)/)
      if (product) {
        const preset = PRESET_BY_PRODUCT_SLUG[decodeURIComponent(product[1])]
        if (preset) {
          const listed = CALCULABLE_PEPTIDES.some((p) => p.slug === preset.peptideSlug)
          setSlug(listed ? preset.peptideSlug : "")
          setAmount(String(preset.mg))
          return
        }
      }
      /* Kütüphane ve konu sayfaları tek bir ürüne değil bileşiğe bağlanır;
       * orada flakon boyu belli olmadığı için yalnızca seçim yapılır. */
      const compound = hash.match(/bilesik=([^&]+)/)
      if (compound) {
        const wanted = decodeURIComponent(compound[1])
        if (CALCULABLE_PEPTIDES.some((p) => p.slug === wanted)) setSlug(wanted)
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [])

  const water = parseNum(waterMl)
  const doseRaw = parseNum(doseAmount)
  const dose = doseRaw !== null && doseUnit === "mcg" ? doseRaw / 1000 : doseRaw
  const vialAmount = parseNum(amount)

  const concentration =
    vialAmount !== null && water !== null ? vialAmount / water : null
  const drawMl =
    concentration !== null && concentration > 0 && dose !== null
      ? dose / concentration
      : null
  const units = drawMl !== null ? drawMl * UNITS_PER_ML : null
  const dosesPerVial =
    vialAmount !== null && dose !== null && dose > 0 ? vialAmount / dose : null
  const perUnitAmount = concentration !== null ? concentration / UNITS_PER_ML : null

  const fillPct =
    units !== null ? Math.max(0, Math.min(1, units / syringe.maxUnits)) : 0
  const overflow = units !== null && units > syringe.maxUnits
  /* İki ünitenin altındaki çekimlerde skala okunamayacak kadar sıkışır. */
  const tooSmall = units !== null && units > 0 && units < 2

  /** Dozu tam sayı üniteye getiren bir sulandırma hacmi var mı? */
  const waterHint = useMemo(() => {
    if (vialAmount === null || dose === null || dose <= 0) return null
    const isClean = (u: number) => Math.abs(u - Math.round(u)) < 0.02 && u >= 5
    if (units !== null && isClean(units)) return null
    const candidates = WATER_CANDIDATES.map((w) => ({
      w,
      u: (dose / (vialAmount / w)) * UNITS_PER_ML,
    })).filter((o) => isClean(o.u) && o.u <= syringe.maxUnits)
    if (candidates.length === 0) return null
    candidates.sort((a, b) => Math.abs(a.u - 20) - Math.abs(b.u - 20))
    return candidates[0]
  }, [vialAmount, dose, units, syringe])

  const ticks = useMemo(() => {
    const out: Tick[] = []
    for (let u = 0; u <= syringe.maxUnits; u += syringe.minorStep) {
      const major = u % syringe.labelStep === 0
      out.push({ at: u / syringe.maxUnits, major, label: major ? u : undefined })
    }
    return out
  }, [syringe])

  /** Bileşik değişince eldeki miktar çoğu zaman artık geçersizdir (60 mg Reta
   * seçiliyken BPC-157'ye geçilirse 60 mg diye bir kutu yok). Yeni bileşiğin
   * boyları arasında değilse temizlenir, tek boy varsa doğrudan yazılır. */
  function selectPeptide(nextSlug: string) {
    const next = vialOptions(nextSlug)
    const current = parseNum(amount)
    setSlug(nextSlug)
    if (next.length === 1) setAmount(String(next[0]))
    else if (current === null || !next.includes(current)) setAmount("")
  }

  /** Şırınga sürüklendiğinde ters yönde çalışır: bırakılan ünite, mevcut
   * konsantrasyondan hedef doza çevrilip doz alanına yazılır. */
  function handleScrub(u: number) {
    if (concentration === null || concentration <= 0) return
    setScrubbed(true)
    const inMg = (u / UNITS_PER_ML) * concentration
    const shown = doseUnit === "mcg" ? inMg * 1000 : inMg
    setDoseAmount(
      String(doseUnit === "mg" ? Number(shown.toPrecision(4)) : Number(shown.toFixed(1))),
    )
  }

  const dosePresets = doseUnit === "mcg" ? DOSE_PRESETS_MCG : DOSE_PRESETS_MG

  /* Dışta overflow-hidden YOK: yapışkan sonuç paneli, overflow'u gizli bir
   * atanın içinde kalırsa o ata kaydırma kabı sayılır ve panel hiç yapışmaz.
   * Köşeler bu yüzden ilk ve son çocuğa ayrı yuvarlatılıyor. */
  return (
    <div className="rounded-2xl border border-hairline bg-background shadow-[0_1px_2px_rgba(13,27,42,0.04),0_16px_48px_-16px_rgba(13,27,42,0.12)]">
      <div className="space-y-8 rounded-t-2xl bg-background p-5 sm:p-8">
        <Field label="Bileşik" hint={`${CALCULABLE_PEPTIDES.length} bileşik`}>
          <PeptidePicker
            options={CALCULABLE_PEPTIDES}
            value={slug}
            onSelect={selectPeptide}
          />
        </Field>

        <Field label={slug ? "Satılan flakon boyları" : "Flakondaki miktar"}>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {options.map((v) => (
              <Chip
                key={v}
                active={amount === String(v)}
                onClick={() => setAmount(String(v))}
              >
                {fmt(v, 2)}
              </Chip>
            ))}
          </div>
          <div className="mt-2">
            <UnitInput
              value={amount}
              onChange={setAmount}
              placeholder="Diğer"
              ariaLabel="Flakondaki miktar (mg)"
              unit="mg"
            />
          </div>
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
          <div className="mt-2">
            <UnitInput
              value={waterMl}
              onChange={setWaterMl}
              placeholder="Diğer"
              ariaLabel="Sulandırma suyu (mL)"
              unit="mL"
            />
          </div>
        </Field>

        <Field label="Hedef doz">
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
          <div className="mt-2">
            <UnitInput
              value={doseAmount}
              onChange={setDoseAmount}
              placeholder="Diğer"
              ariaLabel="Hedef doz"
              unit={doseUnit}
            />
          </div>
        </Field>

        <Field label="Şırınga" hint="Tümü U-100 · 1 mL = 100 ünite">
          <div className="grid grid-cols-3 gap-2">
            {SYRINGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSyringeId(s.id)}
                className={`min-h-14 rounded-lg border px-2 text-center transition-colors ${
                  s.id === syringe.id
                    ? "border-gold bg-gold/[0.07] text-gold ring-1 ring-gold"
                    : "border-hairline text-foreground hover:border-gold hover:text-gold"
                }`}
              >
                <span className="block text-sm font-bold">{s.label}</span>
                <span className="mt-0.5 block text-[11px] opacity-70">
                  {s.maxUnits} ünite
                </span>
              </button>
            ))}
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

        {/* Yan değerler. Sonuç değil, sonucu doğrulamaya yarayan sayılar. */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
          {[
            {
              k: "Konsantrasyon",
              v: concentration !== null ? fmt(concentration, 3) : "—",
              u: "mg/mL",
            },
            {
              k: "1 ünitede",
              v: perUnitAmount !== null ? fmt(perUnitAmount * 1000, 1) : "—",
              u: "mcg",
            },
            {
              k: "Flakon başına",
              v: dosesPerVial ? String(Math.floor(dosesPerVial)) : "—",
              u: "doz",
            },
          ].map((c) => (
            <div key={c.k} className="bg-surface px-2 py-4 text-center sm:px-5">
              {/* Telefonda "Konsantrasyon" hücreye sığmayıp kırpılıyordu:
                  harf aralığı ve punto yalnızca dar ekranda küçültülür. */}
              <p className="text-[9px] font-semibold uppercase leading-tight text-muted-foreground sm:text-[10px] sm:tracking-wide">
                {c.k}
              </p>
              <p className="mt-1 text-base font-bold tabular-nums text-foreground sm:text-lg">
                {c.v}
              </p>
              <p className="text-[11px] text-muted-foreground">{c.u}</p>
            </div>
          ))}
        </div>

        {/* Kanıt seviyesine bağlı uyarı metni burada kullanılmaz: o cümleler
            kütüphanedeki doz merdiveninin altında durmak için yazıldı ve
            "proven" varyantı onaylı kullanım ima ediyor. Retatrutide
            kütüphanede proven işaretli ama onaylı bir endikasyonu yok;
            hesaplayıcı da doz önermediği için tek nötr cümle doğrusu. */}
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Matematiksel bir dönüşümdür, tıbbi tavsiye değildir. Flakon içeriğini
          ürün etiketinden doğrulayın.
        </p>
      </div>

      {/* Sonuç ve şırınga, kartın altında yapışkan bir panelde. Alanları
          doldururken sonuç ekrandan çıkmasın diye burada asılı kalır; kartın
          sonuna gelindiğinde kendi yerine oturur. */}
      <div className="sticky bottom-0 z-20 rounded-b-2xl border-t border-hairline bg-background/95 px-4 pb-4 pt-3 backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:px-8 sm:pb-5">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Şırıngayı şuraya çekin
              </p>
              <p className="mt-0.5 text-3xl font-bold leading-none tabular-nums tracking-tight text-foreground sm:text-4xl">
                {units !== null ? fmt(units, 2) : "—"}
                <span className="ml-1.5 text-sm font-semibold text-muted-foreground">
                  ünite
                </span>
              </p>
            </div>
            <p className="shrink-0 text-right text-xs tabular-nums leading-5 text-muted-foreground">
              {drawMl !== null && dose !== null ? (
                <>
                  {fmt(drawMl, 3)} mL
                  <br />
                  {syringe.label} · U-100
                </>
              ) : (
                <>
                  Değerleri seçin
                  <br />
                  {syringe.label} · U-100
                </>
              )}
            </p>
          </div>

          <div className="mt-3">
            <SyringeDrawing
              fillPct={fillPct}
              ticks={ticks}
              badge={units !== null ? `${fmt(units, 2)} ünite` : null}
              maxUnits={syringe.maxUnits}
              snapStep={syringe.snapStep}
              onScrub={concentration !== null ? handleScrub : undefined}
            />
          </div>

          {overflow ? (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
              Bu doz {syringe.label} şırıngaya sığmıyor. Daha büyük şırınga seçin
              ya da flakonu daha az suyla sulandırın.
            </p>
          ) : tooSmall ? (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
              {fmt(units ?? 0, 2)} ünite, skalada okunamayacak kadar küçük. Daha
              fazla su ekleyerek çizgiyi büyütebilirsiniz.
            </p>
          ) : concentration !== null && !scrubbed ? (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-[11px] font-semibold text-gold">
              <span aria-hidden="true">↔</span> Pistonu sürükleyerek de ayarlayın
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
