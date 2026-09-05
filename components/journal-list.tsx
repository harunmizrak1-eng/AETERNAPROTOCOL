"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Article } from "@/lib/articles"

export function JournalList({ articles }: { articles: Article[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)))
    return ["Tümü", ...unique]
  }, [articles])

  const [active, setActive] = useState("Tümü")

  const filtered = useMemo(
    () =>
      active === "Tümü"
        ? articles
        : articles.filter((a) => a.category === active),
    [articles, active],
  )

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
              active === c
                ? "border-gold/60 text-gold"
                : "border-hairline text-muted-foreground hover:border-gold/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a, i) => (
          <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className={`group flex min-h-72 flex-col rounded-2xl border border-hairline bg-white p-6 shadow-[0_12px_36px_rgba(0,49,76,0.05)] transition hover:-translate-y-0.5 hover:border-gold/40 ${i === 0 ? "sm:col-span-2 lg:grid lg:grid-cols-[1fr_auto] lg:gap-8" : ""}`}
            >
              <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs tracking-normal text-gold font-medium">
                  {a.category}
                </span>
                <span className="text-xs tracking-normal text-muted-foreground font-medium">
                  {a.readMinutes} dk okuma
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-gold sm:text-3xl">
                {a.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {a.excerpt}
              </p>
              <span className="mt-auto pt-6 text-sm tracking-normal text-gold transition-opacity group-hover:opacity-70 font-bold">
                Oku →
              </span>
              </div>
              {i === 0 && <div className="mt-6 hidden min-w-36 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#0072bc,#00314c)] px-6 text-center text-sm font-bold text-white lg:flex">Öne çıkan rehber</div>}
            </Link>
        ))}
      </div>
    </>
  )
}
