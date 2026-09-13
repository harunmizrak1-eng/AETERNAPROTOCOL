"use client"

import { useMemo, useState } from "react"
import { SyringeDrawing, type Tick } from "./syringe-drawing"
import { Chip, Field, PeptidePicker, UnitInput } from "./ui"
import {
  CALCULABLE_PEPTIDES,
  DEFAULT_SYRINGE_ID,
  DOSE_PRESETS_MCG,
  DOSE_PRESETS_MG,
  SYRINGES,
  UNITS_PER_ML,
  VIAL_AMOUNTS_BY_PEPTIDE,
  VIAL_PRESETS,
  WATER_CANDIDATES,
  WATER_PRESETS_ML,
  fmt,
  newEntry,
  parseNum,
  type DoseUnit,
  type VialEntry,
} from "./data"

/** Bileşik seçiliyse gerçekten sattığımız flakon boyları, değilse genel liste. */
function vialOptions(slug: string): number[] {
  const sold = slug ? VIAL_AMOUNTS_BY_PEPTIDE[slug] : undefined
  return sold && sold.length > 0 ? sold : VIAL_PRESETS
}

export function DoseCalculator() {
  const [entries, setEntries] = useState<VialEntry[]>([newEntry()])
  const [referenceId, setReferenceId] = useState("")
  const [waterMl, setWaterMl] = useState("")
  const [doseAmount, setDoseAmount] = useState("")
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg")
  const [syringeId, setSyringeId] = useState(DEFAULT_SYRINGE_ID)
  /* Sürükleme keşfedilebilir değil, bir kez kullanılana kadar ipucu durur. */
  const [scrubbed, setScrubbed] = useState(false)

  const syringe = SYRINGES.find((s) => s.id === syringeId) ?? SYRINGES[2]
  const reference = entries.find((e) => e.id === referenceId) ?? entries[0]

  const water = parseNum(waterMl)
  const doseRaw = parseNum(doseAmount)
  const dose = doseRaw !== null && doseUnit === "mcg" ? doseRaw / 1000 : doseRaw

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
  const units = drawMl !== null ? drawMl * UNITS_PER_ML : null
  const dosesPerVial =
    referenceAmount !== null && dose !== null && dose > 0
      ? referenceAmount / dose
      : null
  const perUnitAmount = refConcentration !== null ? refConcentration / UNITS_PER_ML : null

  const fillPct =
    units !== null ? Math.max(0, Math.min(1, units / syringe.maxUnits)) : 0
  const overflow = units !== null && units > syringe.maxUnits
  /* İki ünitenin altındaki çekimlerde skala okunamayacak kadar sıkışır. */
  const tooSmall = units !== null && units > 0 && units < 2

  /** Dozu tam sayı üniteye getiren bir sulandırma hacmi var mı? */
  const waterHint = useMemo(() => {
    if (referenceAmount === null || dose === null || dose <= 0) return null
    const isClean = (u: number) => Math.abs(u - Math.round(u)) < 0.02 && u >= 5
    if (units !== null && isClean(units)) return null
    const options = WATER_CANDIDATES.map((w) => ({
      w,
      u: (dose / (referenceAmount / w)) * UNITS_PER_ML,
    })).filter((o) => isClean(o.u) && o.u <= syringe.maxUnits)
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

  /** Bileşik değişince eldeki miktar çoğu zaman artık geçersizdir (60 mg Reta
   * seçiliyken BPC-157'ye geçilirse 60 mg diye bir kutu yok). Yeni bileşiğin
   * boyları arasında değilse temizlenir, tek boy varsa doğrudan yazılır. */
  function selectPeptide(id: string, slug: string, name: string) {
    const entry = entries.find((e) => e.id === id)
    const options = vialOptions(slug)
    const current = parseNum(entry?.amount ?? "")
    const amount =
      options.length === 1
        ? String(options[0])
        : current !== null && options.includes(current)
          ? (entry?.amount ?? "")
          : ""
    updateEntry(id, { slug, name, amount })
  }

  function removeEntry(id: string) {
    setEntries((prev) => (prev.length === 1 ? prev : prev.filter((e) => e.id !== id)))
    if (referenceId === id) setReferenceId("")
  }

  /** Şırınga sürüklendiğinde ters yönde çalışır: bırakılan ünite, mevcut
   * konsantrasyondan hedef doza çevrilip doz alanına yazılır. */
  function handleScrub(u: number) {
    if (refConcentration === null || refConcentration <= 0) return
    setScrubbed(true)
    const inMg = (u / UNITS_PER_ML) * refConcentration
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
        <Field
          label="Bileşik"
          hint={`${CALCULABLE_PEPTIDES.length} bileşik`}
        >
          <div className="space-y-3">
            {entries.map((entry, i) => {
              const isRef = entry.id === reference?.id
              const many = entries.length > 1
              const options = vialOptions(entry.slug)
              return (
                <div
                  key={entry.id}
                  className={`min-w-0 rounded-xl border p-3.5 transition-colors ${
                    isRef && many ? "border-gold/60 bg-gold/[0.04]" : "border-hairline"
                  }`}
                >
                  {many && (
                    <div className="mb-3 flex items-center justify-between gap-2">
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

                  <PeptidePicker
                    options={CALCULABLE_PEPTIDES}
                    value={entry.slug}
                    onSelect={(slug, name) => selectPeptide(entry.id, slug, name)}
                  />

                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {entry.slug ? "Satılan flakon boyları" : "Flakondaki miktar"}
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {options.map((v) => (
                      <Chip
                        key={v}
                        active={entry.amount === String(v)}
                        onClick={() => updateEntry(entry.id, { amount: String(v) })}
                      >
                        {fmt(v, 2)}
                      </Chip>
                    ))}
                  </div>

                  <div className="mt-2 flex items-stretch gap-2">
                    <div className="min-w-0 flex-1">
                      <UnitInput
                        value={entry.amount}
                        onChange={(v) => updateEntry(entry.id, { amount: v })}
                        placeholder="Diğer"
                        ariaLabel="Flakondaki miktar (mg)"
                        unit="mg"
                      />
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
            className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-dashed border-hairline px-4 text-xs font-semibold text-muted-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <span aria-hidden="true">+</span> Karışım için peptit ekle
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

        <Field
          label={
            entries.length > 1 && reference?.name
              ? `Hedef doz · ${reference.name}`
              : "Hedef doz"
          }
        >
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
                      {fmt(inDraw, 3)} mg
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Flakonda toplam {fmt(totalAmount, 3)} mg var.
            </p>
          </div>
        )}

        {/* Yan değerler. Sonuç değil, sonucu doğrulamaya yarayan sayılar. */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
          {[
            {
              k: "Konsantrasyon",
              v: refConcentration !== null ? fmt(refConcentration, 3) : "—",
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
              onScrub={refConcentration !== null ? handleScrub : undefined}
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
          ) : refConcentration !== null && !scrubbed ? (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-[11px] font-semibold text-gold">
              <span aria-hidden="true">↔</span> Pistonu sürükleyerek de ayarlayın
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
