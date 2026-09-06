"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Article } from "@/lib/articles"

const FEATURED_SLUG = "zphc-orijinal-mi-nasil-anlarim"
const COVER_TONES = ["bg-[#071727] text-white", "bg-[#dff1f9] text-[#071727]", "bg-[#e9e5dc] text-[#071727]", "bg-[#006fab] text-white"]

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
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Örn. doğrulama, Reta, saklama…" className="min-h-11 w-full border border-hairline bg-white px-5 pr-12 text-sm outline-none transition focus:border-gold" />
          <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gold">⌕</span>
        </label>
      </div>

      <div className="scrollbar-none -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-2">
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setActive(c)} aria-pressed={active === c} className={`shrink-0 border px-4 py-2 text-sm font-semibold transition-colors ${active === c ? "border-gold bg-gold text-white" : "border-hairline bg-white text-muted-foreground hover:border-gold/40 hover:text-foreground"}`}>
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link href={`/journal/${featured.slug}`} className="group mt-7 grid overflow-hidden border border-[#b9dced] bg-[#eef7fc] shadow-[12px_12px_0_#d8eaf3] transition hover:-translate-y-0.5 hover:border-gold/50 md:grid-cols-[1fr_0.48fr]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 text-xs font-semibold"><span className="border-l-2 border-gold pl-2 font-bold uppercase tracking-[0.13em] text-gold">Kapak dosyası</span><span className="text-muted-foreground">{featured.readMinutes} dk</span></div>
            <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-gold sm:text-4xl">{featured.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-block text-sm font-bold text-gold">Doğrulama rehberini açın →</span>
          </div>
          <div className="relative hidden min-h-64 overflow-hidden border-l border-[#b9dced] bg-[#071727] p-8 text-white md:flex md:flex-col md:justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-sky-300">ZPHC / DOSYA</p><p className="text-[7rem] font-black leading-none text-white/10">01</p><p className="border-t border-white/20 pt-4 text-sm font-bold">Mühür<br />Gümüş bant<br />Üretici kodu</p>
          </div>
        </Link>
      )}

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-hairline bg-surface p-8 text-center">
          <p className="font-bold text-foreground">Bu aramayla eşleşen bir yazı bulamadık.</p>
          <button type="button" onClick={() => { setQuery(""); setActive("Tümü") }} className="mt-3 text-sm font-bold text-gold">Tüm yazıları göster</button>
        </div>
      ) : <div className="mt-9 grid border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => (
          <Link
            key={a.slug}
            href={`/journal/${a.slug}`}
            className="group flex min-h-[22rem] flex-col overflow-hidden border-b border-r border-hairline bg-white transition hover:bg-[#fafdff]"
          >
            <div className={`relative flex h-32 items-end justify-between overflow-hidden p-5 ${COVER_TONES[i % COVER_TONES.length]}`}><span className="relative z-10 text-xs font-bold uppercase tracking-[0.18em]">{a.category}</span><span className="absolute -right-1 -top-5 font-mono text-[7rem] font-black leading-none opacity-10">{String(i + 1).padStart(2, "0")}</span><span className="relative z-10 font-mono text-xs opacity-60">ZPHC/J</span></div>
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
