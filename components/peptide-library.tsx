"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  peptides,
  categories,
  tierLabel,
  tierColorVar,
  tierBorderVar,
  tierDots,
  type EvidenceTier,
} from "@/lib/peptides"
import { getPlainSummary } from "@/lib/plain-summaries"

const TIER_FILTERS: { value: EvidenceTier | "Tümü"; label: string }[] = [
  { value: "Tümü", label: "Tümü" },
  { value: "proven", label: tierLabel.proven },
  { value: "theoretical", label: tierLabel.theoretical },
  { value: "preclinical", label: tierLabel.preclinical },
]

function FilterPill({
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
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
        active
          ? "border-gold/60 text-gold"
          : "border-hairline text-muted-foreground hover:border-gold/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

export function PeptideLibrary() {
  const [category, setCategory] = useState<string>("Tümü")
  const [tier, setTier] = useState<EvidenceTier | "Tümü">("Tümü")
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () =>
      peptides.filter((p) => {
        const term = query.trim().toLocaleLowerCase("tr-TR")
        return (category === "Tümü" || p.category === category) &&
          (tier === "Tümü" || p.tier === tier) &&
          (!term || `${p.name} ${p.category} ${getPlainSummary(p.slug) ?? p.short}`.toLocaleLowerCase("tr-TR").includes(term))
      }),
    [category, tier, query],
  )

  return (
    <>
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border-b border-hairline pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Kütüphanede ara</p><p className="mt-2 text-sm text-muted-foreground">{filtered.length} bileşik gösteriliyor.</p></div>
            <label className="block w-full lg:max-w-sm"><span className="sr-only">Bileşik ara</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Örn. BPC-157, cilt, metabolizma…" className="min-h-11 w-full rounded-full border border-hairline bg-white px-5 text-sm outline-none transition focus:border-gold" /></label>
          </div>
          <div className="scrollbar-none mt-5 flex gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <FilterPill key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterPill>
            ))}
          </div>
          <div className="scrollbar-none mt-2 flex gap-2 overflow-x-auto pb-2">
            {TIER_FILTERS.map((t) => (
              <FilterPill key={t.value} active={tier === t.value} onClick={() => setTier(t.value)}>
                {t.label}
              </FilterPill>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Bu filtrelerle eşleşen bileşik yok. Farklı bir kombinasyon deneyin.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, index) => (
                <Link
                  key={p.slug}
                  href={`/peptidler/${p.slug}`}
                  className={`group flex min-h-72 flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_12px_36px_rgba(0,49,76,0.05)] transition hover:-translate-y-0.5 hover:border-gold/50 ${tierBorderVar[p.tier]}`}
                >
                  <div className="flex items-center justify-between border-b border-hairline bg-surface/70 px-5 py-3"><span className="text-xs font-semibold text-muted-foreground">{p.category}</span><span className="font-mono text-[0.65rem] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span></div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-gold">{p.name}</h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{getPlainSummary(p.slug) ?? p.short}</p>
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`font-mono text-xs ${tierColorVar[p.tier]}`}
                      >
                        {tierDots[p.tier]}
                      </span>
                      <span
                        className={`text-xs font-semibold ${tierColorVar[p.tier]}`}
                      >
                        {tierLabel[p.tier]}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gold">
                      İncele →
                    </span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
