"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Article } from "@/lib/articles"

const FEATURED_SLUG = "zphc-orijinal-mi-nasil-anlarim"

function articleDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

export function JournalList({ articles }: { articles: Article[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)))
    return ["Tümü", ...unique]
  }, [articles])

  const [active, setActive] = useState("Tümü")
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () => articles.filter((article) => {
      const inCategory = active === "Tümü" || article.category === active
      const term = query.trim().toLocaleLowerCase("tr-TR")
      const inSearch = !term || `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase("tr-TR").includes(term)
      return inCategory && inSearch
    }),
    [articles, active, query],
  )

  const featured = active === "Tümü" && !query.trim()
    ? articles.find((article) => article.slug === FEATURED_SLUG)
    : undefined
  const list = featured ? filtered.filter((article) => article.slug !== featured.slug) : filtered

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-hairline pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Tüm rehberler</p>
          <p className="mt-2 text-sm text-muted-foreground">{articles.length} yazı · Aradığınız konuyu seçin ya da yazın.</p>
        </div>
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Rehberlerde ara</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Örn. doğrulama, Reta, saklama…" className="min-h-11 w-full rounded-full border border-hairline bg-white px-5 pr-12 text-sm outline-none transition focus:border-gold" />
          <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gold">⌕</span>
        </label>
      </div>

      <div className="scrollbar-none -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-2">
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setActive(c)} aria-pressed={active === c} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active === c ? "border-gold bg-gold text-white" : "border-hairline bg-white text-muted-foreground hover:border-gold/40 hover:text-foreground"}`}>
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link href={`/journal/${featured.slug}`} className="group mt-7 grid overflow-hidden rounded-2xl border border-[#b9dced] bg-[#eef7fc] shadow-[0_18px_50px_rgba(0,49,76,0.08)] transition hover:-translate-y-0.5 hover:border-gold/50 md:grid-cols-[1fr_0.58fr]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 text-xs font-semibold"><span className="rounded-full bg-gold px-3 py-1.5 text-white">Önce bunu okuyun</span><span className="text-muted-foreground">{featured.readMinutes} dk</span></div>
            <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-gold sm:text-4xl">{featured.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-block text-sm font-bold text-gold">Doğrulama rehberini açın →</span>
          </div>
          <div className="relative hidden min-h-64 overflow-hidden border-l border-[#b9dced] md:block">
            <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full border-[28px] border-white/70" />
            <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/80 bg-white/80 p-5 backdrop-blur">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-gold">3 kontrol</p>
              <p className="mt-2 text-sm font-bold text-foreground">Mühür · Gümüş bant · Üretici kodu</p>
            </div>
          </div>
        </Link>
      )}

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-hairline bg-surface p-8 text-center">
          <p className="font-bold text-foreground">Bu aramayla eşleşen bir yazı bulamadık.</p>
          <button type="button" onClick={() => { setQuery(""); setActive("Tümü") }} className="mt-3 text-sm font-bold text-gold">Tüm yazıları göster</button>
        </div>
      ) : <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => (
          <Link
            key={a.slug}
            href={`/journal/${a.slug}`}
            className="group flex min-h-72 flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_12px_36px_rgba(0,49,76,0.05)] transition hover:-translate-y-0.5 hover:border-gold/40"
          >
            <div className="flex items-center justify-between border-b border-hairline bg-surface/70 px-5 py-3 text-xs font-semibold"><span className="text-gold">{a.category}</span><span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span></div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-xs text-muted-foreground">{articleDate(a.date)} · {a.readMinutes} dk</p>
              <h2 className="mt-3 font-sans text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold">{a.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{a.excerpt}</p>
              <span className="mt-auto pt-6 text-sm font-bold text-gold">Yazıyı açın →</span>
            </div>
          </Link>
        ))}
      </div>}
    </>
  )
}
