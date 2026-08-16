"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  products,
  goalOrder,
  categoryLabels,
  type Product,
} from "@/lib/products"

const ALL = "Tümü"
const PARAM = "kategori"

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
  const router = useRouter()
  const params = useSearchParams()
  // initialGoal sunucudan gelir ve ilk render'da kullanılır; useSearchParams
  // client tarafında geri/ileri tuşuyla gelen değişimi yakalar.
  const active = params.get(PARAM) ?? initialGoal ?? ALL
  const [query, setQuery] = useState("")

  // Only offer goals that actually have products behind them, so the filter
  // never shows a tab that leads to an empty grid.
  const goals = useMemo(() => {
    const present = new Set(products.flatMap((p) => p.goals))
    return [ALL, ...goalOrder.filter((g) => present.has(g))]
  }, [])

  const shown = useMemo(() => {
    const byGoal =
      active === ALL
        ? products
        : products.filter((p) => p.goals.includes(active))
    const q = fold(query.trim())
    if (!q) return byGoal
    return byGoal.filter((p) =>
      fold(`${p.name} ${p.sku ?? ""} ${p.goals.join(" ")}`).includes(q),
    )
  }, [active, query])

  function select(goal: string) {
    router.replace(
      goal === ALL
        ? "/urunler"
        : `/urunler?${PARAM}=${encodeURIComponent(goal)}`,
      { scroll: false },
    )
  }

  return (
    <>
      {/* Filter bar sticks under the fixed header so category and search stay
          reachable while scrolling a 70-plus item grid. */}
      <div className="sticky top-[73px] z-30 -mx-6 border-b border-hairline bg-background/95 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {goals.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => select(g)}
                aria-pressed={active === g}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active === g
                    ? "border-gold bg-gold font-semibold text-primary-foreground"
                    : "border-hairline text-muted-foreground hover:border-gold/60 hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
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
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {shown.length} ürün
        {query.trim() && ` · “${query.trim()}” için sonuçlar`}
      </p>

      {shown.length === 0 ? (
        <p className="mt-12 rounded-lg border border-hairline bg-card p-10 text-center text-base text-muted-foreground">
          Aramanızla eşleşen ürün bulunamadı.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>
      )}
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <li>
      <Link
        href={`/urunler/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
      >
        {product.image && (
          // Tinted panel behind the photo: ZPHC product shots are cut out on
          // white, so on a white card they float with no grounding.
          <div className="bg-surface p-3">
            <Image
              src={product.image}
              alt=""
              width={400}
              height={400}
              className="aspect-[5/4] w-full object-contain mix-blend-multiply"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="flex-1 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-gold">
            {product.name}
          </h3>
          <div className="mt-3 flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold text-gold">
              {product.price ?? "Fiyat sor"}
            </span>
            {product.sku && (
              <span className="font-mono text-[0.7rem] text-muted-foreground">
                {product.sku}
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}
