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
      className={`rounded-sm border px-4 py-2 text-[0.65rem] uppercase tracking-eyebrow transition-colors duration-300 ${
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

  const filtered = useMemo(
    () =>
      peptides.filter(
        (p) =>
          (category === "Tümü" || p.category === category) &&
          (tier === "Tümü" || p.tier === tier),
      ),
    [category, tier],
  )

  return (
    <>
      <section className="px-6 pb-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <FilterPill key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterPill>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TIER_FILTERS.map((t) => (
              <FilterPill key={t.value} active={tier === t.value} onClick={() => setTier(t.value)}>
                {t.label}
              </FilterPill>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 sm:pb-36 md:px-10">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Bu filtrelerle eşleşen bileşik yok. Farklı bir kombinasyon deneyin.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  href={`/peptidler/${p.slug}`}
                  className={`group flex flex-col rounded-sm border bg-surface p-8 transition-colors duration-500 hover:border-gold/60 ${tierBorderVar[p.tier]}`}
                >
                  <h2 className="font-serif text-2xl font-light tracking-wide text-foreground">
                    {p.name}
                  </h2>

                  <p className="mt-2 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
                    {p.category}
                  </p>

                  <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.short}
                  </p>

                  <div className="mt-8 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`font-mono text-xs ${tierColorVar[p.tier]}`}
                      >
                        {tierDots[p.tier]}
                      </span>
                      <span
                        className={`text-[0.65rem] uppercase tracking-eyebrow ${tierColorVar[p.tier]}`}
                      >
                        {tierLabel[p.tier]}
                      </span>
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-eyebrow text-foreground/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      İncele →
                    </span>
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
