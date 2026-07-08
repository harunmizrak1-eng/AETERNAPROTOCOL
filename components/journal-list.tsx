"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
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
            className={`rounded-sm border px-4 py-2 text-[0.65rem] uppercase tracking-eyebrow transition-colors duration-300 ${
              active === c
                ? "border-gold/60 text-gold"
                : "border-hairline text-muted-foreground hover:border-gold/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-col">
        {filtered.map((a, i) => (
          <Reveal key={a.slug} delay={i * 80}>
            <Link
              href={`/journal/${a.slug}`}
              className="group flex flex-col border-t border-hairline py-10 transition-colors last:border-b hover:border-gold/40"
            >
              <div className="flex items-center gap-4">
                <span className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                  {a.category}
                </span>
                <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground/50">
                  {a.readMinutes} dk okuma
                </span>
              </div>
              <h2 className="mt-4 font-serif text-2xl font-light tracking-wide text-foreground transition-colors group-hover:text-gold sm:text-3xl">
                {a.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {a.excerpt}
              </p>
              <span className="mt-6 text-[0.65rem] uppercase tracking-eyebrow text-foreground/70 transition-opacity group-hover:opacity-70">
                Oku →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  )
}
