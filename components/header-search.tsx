"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { track } from "@vercel/analytics"
import { products } from "@/lib/catalog"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"

const synonyms: Record<string, string> = {
  reta: "retatrutide", retatrutid: "retatrutide", bpc: "bpc157", onarım: "bpc157 tb500 rehab", cilt: "ghk cu glow", bakır: "ghk cu", zayıflama: "retatrutide fragment slim burn", kilo: "retatrutide fragment slim burn", büyüme: "hgh zptrop", kalem: "pen aq", enerji: "mots c nad", kas: "igf mass ghrp",
}

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ")
}

export function HeaderSearch() {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const query = normalize(value.trim())
  const suggestions = useMemo(() => {
    if (query.length < 2) return []
    const expanded = `${query} ${Object.entries(synonyms).filter(([key]) => query.includes(normalize(key))).map(([, terms]) => terms).join(" ")}`
    const terms = expanded.split(/\s+/).filter(Boolean)
    return products.map((product) => {
      const haystack = normalize(`${product.name} ${product.slug} ${product.goals.join(" ")}`)
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0)
      return { product, score }
    }).filter((row) => row.score > 0).sort((a, b) => b.score - a.score).slice(0, 6)
  }, [query])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    track("Search Submitted", { query: q.slice(0, 80) })
    router.push(q ? `/urunler?q=${encodeURIComponent(q)}` : "/urunler")
    setFocused(false)
  }

  return <div className="relative"><form role="search" onSubmit={submit} className="flex w-full">
    <label htmlFor="header-search" className="sr-only">Ürün ara</label>
    <input id="header-search" type="search" autoComplete="off" value={value} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)} onChange={(e) => setValue(e.target.value)} placeholder="Ürün veya hedef ara: Reta, BPC-157, cilt…" aria-autocomplete="list" aria-controls="search-suggestions" className="min-w-0 flex-1 rounded-l-full border border-r-0 border-input bg-background px-4 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold" />
    <button type="submit" aria-label="Ara" className="shrink-0 rounded-r-full border border-gold bg-gold px-4 py-2 text-primary-foreground transition-colors hover:bg-gold/90"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" strokeLinecap="round"/></svg></button>
  </form>
  {focused && query.length >= 2 && <div id="search-suggestions" role="listbox" className="absolute inset-x-0 top-full z-[70] mt-2 overflow-hidden rounded-2xl border border-hairline bg-white p-2 shadow-2xl">{suggestions.length ? <ul>{suggestions.map(({ product }) => { const price = getProductPrice(product.slug); return <li key={product.slug}><Link href={`/urunler/${product.slug}`} onClick={() => track("Search Suggestion Click", { product: product.slug, query: value.slice(0, 80) })} className="grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-xl p-2 transition hover:bg-surface"><div className="rounded-lg bg-surface p-1">{product.image && <Image src={product.image} alt="" width={48} height={48} className="aspect-square object-contain" />}</div><span className="line-clamp-2 text-sm font-bold">{product.name}</span><span className="hidden text-sm font-extrabold text-gold sm:block">{price ? formatProductPrice(price) : "Fiyat sor"}</span></Link></li>})}</ul> : <div className="p-4 text-sm text-muted-foreground">Bu ifadeyle eşleşen ürün bulamadık. Tüm katalogda aramak için Enter’a basın.</div>}</div>}
  </div>
}
