"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { products } from "@/lib/catalog"
import { localeUi, localizedProductForm, type SeoLocale } from "@/lib/international-seo"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"
import { instagramHandle, instagramUrl, whatsappLink } from "@/lib/contact"

export function LocalizedCatalog({ locale }: { locale: SeoLocale }) {
  const ui = localeUi[locale]
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale)
    if (!normalized) return products
    return products.filter((product) => `${product.name} ${product.peptideSlug ?? ""} ${product.specs.map((item) => item.value).join(" ")}`.toLocaleLowerCase(locale).includes(normalized))
  }, [locale, query])

  return (
    <div lang={locale} dir={ui.dir} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 px-6 py-4 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/"><Image src="/brand/zphc-logo.png" alt="ZPHC" width={250} height={42} className="h-8 w-auto" priority /></Link>
          <div className="flex items-center gap-3 text-xs font-bold">
            <Link href={`/${locale}`}>{ui.languageName}</Link>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">{instagramHandle}</a>
          </div>
        </div>
      </header>
      <main id="main-content">
        <section className="border-b border-hairline bg-surface px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{ui.eyebrow}</p>
            <h1 className="mt-2 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{ui.catalogueTitle}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{ui.catalogueDescription}</p>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ui.searchHint} className="mt-7 min-h-12 w-full max-w-xl rounded-full border border-hairline bg-white px-5 text-sm outline-none focus:border-gold" />
          </div>
        </section>
        <section className="px-4 py-8 sm:px-6 md:px-10 md:py-12">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 text-sm font-semibold text-muted-foreground">{filtered.length} {ui.products.toLocaleLowerCase(locale)}</p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((product) => {
                const price = getProductPrice(product.slug)
                return <li key={product.slug}>
                  <Link href={`/urunler/${product.slug}`} className="group flex h-full flex-col rounded-2xl border border-hairline bg-white p-3 shadow-[0_8px_28px_rgba(0,49,76,0.05)] transition hover:-translate-y-0.5 hover:border-gold/40">
                    {product.image && <div className="rounded-xl bg-surface p-2"><Image src={product.image} alt={product.name} width={360} height={360} className="aspect-square w-full object-contain" /></div>}
                    <p className="mt-3 text-[0.65rem] font-bold uppercase tracking-wide text-gold">{localizedProductForm(locale, product)}</p>
                    <h2 className="mt-1 text-sm font-bold leading-snug">{product.name}</h2>
                    <p className="mt-auto border-t border-hairline pt-3 text-base font-extrabold">{price ? formatProductPrice(price) : ui.priceOnRequest}</p>
                    <span className="mt-2 text-xs font-bold text-gold">{ui.viewProduct} →</span>
                  </Link>
                </li>
              })}
            </ul>
          </div>
        </section>
      </main>
      <footer className="border-t border-hairline bg-surface px-6 py-8 text-center text-xs leading-6 text-muted-foreground">
        <p>{ui.officialDomain}</p>
        <p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a> · <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {instagramHandle}</a></p>
        <p className="mt-2">{ui.researchOnly}</p>
      </footer>
    </div>
  )
}
