"use client"

import { useMemo } from "react"
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

/** Catalogue grid with a goal filter. The active filter lives in the URL
 * (?kategori=...) rather than component state so a category card on the
 * homepage can link straight into a filtered view, and so a filtered
 * catalogue is shareable and survives the back button. */
export function ProductCatalog() {
  const router = useRouter()
  const params = useSearchParams()
  const active = params.get(PARAM) ?? ALL

  // Only offer goals that actually have products behind them, so the filter
  // never shows a tab that leads to an empty grid.
  const goals = useMemo(() => {
    const present = new Set(products.flatMap((p) => p.goals))
    return [ALL, ...goalOrder.filter((g) => present.has(g))]
  }, [])

  const shown = useMemo(
    () =>
      active === ALL
        ? products
        : products.filter((p) => p.goals.includes(active)),
    [active],
  )

  function select(goal: string) {
    router.replace(
      goal === ALL ? "/urunler" : `/urunler?${PARAM}=${encodeURIComponent(goal)}`,
      { scroll: false },
    )
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {goals.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => select(g)}
            aria-pressed={active === g}
            className={`rounded-md border px-4 py-2.5 text-sm transition-colors ${
              active === g
                ? "border-gold bg-gold font-medium text-primary-foreground"
                : "border-hairline text-muted-foreground hover:border-gold/60 hover:text-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{shown.length} ürün</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <li>
      <Link
        href={`/urunler/${product.slug}`}
        className="group flex h-full flex-col rounded-md border border-hairline bg-card p-4 transition-colors hover:border-gold/60 hover:bg-muted/60"
      >
        {product.image && (
          <Image
            src={product.image}
            alt=""
            width={400}
            height={400}
            className="aspect-square w-full rounded-sm bg-background object-contain"
          />
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          {categoryLabels[product.category]}
        </p>
        <h3 className="mt-1 flex-1 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        {product.sku && (
          <p className="mt-2 font-mono text-[0.7rem] text-muted-foreground">
            {product.sku}
          </p>
        )}
        <p className="mt-3 text-xs font-medium text-gold">
          {product.price ?? "Fiyat sor"} →
        </p>
      </Link>
    </li>
  )
}
