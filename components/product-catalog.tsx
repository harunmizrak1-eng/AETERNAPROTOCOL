"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

const ALL = "Tümü"
const PARAM = "kategori"
const QUERY_PARAM = "q"

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

  const shown = useMemo(() => {
    const byGoal =
      active === ALL
        ? products
        : products.filter((p) => p.goals.includes(active))
    const q = fold(query.trim())
    if (!q) return byGoal
    return byGoal.filter((p) =>
      // peptideSlug bileşiğin tam adını taşıyor ("retatrutide",
      // "tirzepatide"). Katalogdaki adlar kutunun üstündeki kısaltmayı
      // kullanıyor ("Reta ZPHC 60 mg") ama müşteri tam adı aratıyor;
      // slug'ı arama metnine katmak ikisini de bulunur yapıyor.
      fold(
        `${p.name} ${p.sku ?? ""} ${p.peptideSlug ?? ""} ${p.goals.join(" ")}`,
      ).includes(q),
    )
  }, [active, query])

  return (
    <>
      {/* Kategori seçimi artık kenar çubuğunda (ShopSidebar) — burada
          tekrar edilmiyor. Kalan tek denetim ızgara içi arama. */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base text-muted-foreground">
          <span className="font-semibold text-foreground">{shown.length}</span>{" "}
          ürün
          {active !== ALL && ` · ${active}`}
          {query.trim() && ` · “${query.trim()}” araması`}
        </p>

        <div className="relative w-full sm:w-64">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün veya kod ara"
            aria-label="Ürün ara"
            className="w-full rounded-full border border-input bg-background py-2 pl-10 pr-4 text-sm text-foreground outline-none transition-colors focus:border-gold"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="mt-12 border border-hairline bg-card p-10 text-center text-base text-muted-foreground">
          Aramanızla eşleşen ürün bulunamadı.
        </p>
      ) : (
        // Filtrelenmiş/aranan ürün sayısı sabit değil; "seam" ızgarası
        // (gap-px bg-hairline) sütun sayısına tam bölünmeyen durumlarda son
        // sıradaki boş hücreyi gri renkle görünür bırakır. ProductCard
        // kendi kenarlığını taşıyor, burada şeffaf boşluk yeterli.
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
