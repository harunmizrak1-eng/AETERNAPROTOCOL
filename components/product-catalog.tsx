"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { products } from "@/lib/catalog"
import { ProductCard, getProductForm } from "@/components/product-card"
import { featuredProductSlugs } from "@/lib/product-prices"

const ALL = "Tümü"
const PARAM = "kategori"
const QUERY_PARAM = "q"
const FORM_OPTIONS = ["Tümü", "Flakon seti", "Hazır kalem", "Çift hazne / kartuş", "Aksesuar"]

/** Normalises Turkish text for search: case-folds and strips diacritics so
 * "buyume" finds "büyüme" and "IGF" finds "ıgf". Turkish dotted/dotless i
 * needs explicit handling — toLowerCase() alone maps I to i, not ı. */
function fold(s: string) {
  return s
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
}

/** Catalogue grid with search and a goal filter. The active filter lives in
 * the URL (?kategori=...) so a category card on the homepage can link
 * straight into a filtered view, and a filtered catalogue stays shareable. */
export function ProductCatalog({ initialGoal }: { initialGoal?: string }) {
  const params = useSearchParams()
  // initialGoal sunucudan gelir ve ilk render'da kullanılır; useSearchParams
  // client tarafında geri/ileri tuşuyla gelen değişimi yakalar.
  const active = params.get(PARAM) ?? initialGoal ?? ALL
  // Başlıktaki arama kutusu /urunler?q=... adresine gönderiyor; buradaki
  // ilk değer o parametreden okunur, sonrasını kullanıcının yazdığı
  // yerel state yönetir.
  const [query, setQuery] = useState(params.get(QUERY_PARAM) ?? "")
  const [form, setForm] = useState(ALL)
  const [showAll, setShowAll] = useState(false)

  const shown = useMemo(() => {
    const byGoal =
      active === ALL
        ? products
        : products.filter((p) => p.goals.includes(active))
    const q = fold(query.trim())
    const byForm =
      form === ALL ? byGoal : byGoal.filter((p) => getProductForm(p) === form)
    if (!q) return byForm
    return byForm.filter((p) =>
      // peptideSlug bileşiğin tam adını taşıyor ("retatrutide",
      // "tirzepatide"). Katalogdaki adlar kutunun üstündeki kısaltmayı
      // kullanıyor ("Reta ZPHC 60 mg") ama müşteri tam adı aratıyor;
      // slug'ı arama metnine katmak ikisini de bulunur yapıyor.
      fold(
        `${p.name} ${p.sku ?? ""} ${p.peptideSlug ?? ""} ${p.goals.join(" ")}`,
      ).includes(q),
    )
  }, [active, query, form])

  const guided = active !== ALL || query.trim().length > 0 || form !== ALL
  const featured = featuredProductSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
  const visible = guided || showAll ? shown : featured

  return (
    <>
      <div className="rounded-2xl border border-hairline bg-surface p-4 sm:p-5">
        <p className="text-sm font-bold text-foreground">2 · Ürün formunu seçin</p>
        <div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1">
          {FORM_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setForm(option)}
              aria-pressed={form === option}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                form === option
                  ? "border-gold bg-gold text-white"
                  : "border-hairline bg-background text-muted-foreground hover:border-gold/50 hover:text-gold"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <label htmlFor="catalog-search" className="mt-4 block text-sm font-bold text-foreground">
          3 · Bileşik veya ürün adı
        </label>
        <div className="relative mt-2 w-full">
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Örn. BPC-157, Reta veya GHK-Cu"
            className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors focus:border-gold"
          />
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-base text-muted-foreground">
          <span className="font-semibold text-foreground">{visible.length}</span>{" "}
          {guided || showAll ? "ürün" : "öne çıkan ürün"}
          {active !== ALL && ` · ${active}`}
          {query.trim() && ` · “${query.trim()}” araması`}
        </p>

        {!guided && !showAll && (
          <button type="button" onClick={() => setShowAll(true)} className="text-sm font-bold text-gold hover:underline">
            Tüm {products.length} ürünü göster →
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 border border-hairline bg-card p-10 text-center text-base text-muted-foreground">
          Aramanızla eşleşen ürün bulunamadı.
        </p>
      ) : (
        // Filtrelenmiş/aranan ürün sayısı sabit değil; "seam" ızgarası
        // (gap-px bg-hairline) sütun sayısına tam bölünmeyen durumlarda son
        // sıradaki boş hücreyi gri renkle görünür bırakır. ProductCard
        // kendi kenarlığını taşıyor, burada şeffaf boşluk yeterli.
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

    </>
  )
}
