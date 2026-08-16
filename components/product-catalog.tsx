"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  products,
  goalOrder,
  categoryLabels,
  type Product,
} from "@/lib/products"

const ALL = "Tümü"

export function ProductCatalog() {
  const [goal, setGoal] = useState(ALL)

  // Only offer goals that actually have products behind them, so the filter
  // never shows a tab that leads to an empty grid.
  const goals = useMemo(() => {
    const present = new Set(products.flatMap((p) => p.goals))
    return [ALL, ...goalOrder.filter((g) => present.has(g))]
  }, [])

  const shown = useMemo(
    () =>
      goal === ALL ? products : products.filter((p) => p.goals.includes(goal)),
    [goal],
  )

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {goals.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGoal(g)}
            aria-pressed={goal === g}
            className={`rounded-sm border px-4 py-2.5 text-xs font-light transition-colors ${
              goal === g
                ? "border-gold bg-gold text-primary-foreground"
                : "border-hairline text-muted-foreground hover:border-gold/60 hover:text-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
        {shown.length} ürün
      </p>

      <ul className="mt-10 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <li className="bg-background">
      <Link
        href={`/urunler/${product.slug}`}
        className="group flex h-full flex-col justify-between gap-6 p-8 transition-colors hover:bg-muted/40"
      >
        <div>
          {product.image && (
            <Image
              src={product.image}
              alt=""
              width={300}
              height={300}
              className="mb-6 aspect-square w-full rounded-sm bg-muted/30 object-contain"
            />
          )}
          <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
            {categoryLabels[product.category]}
          </p>
          <h3 className="mt-3 font-sans text-base font-medium leading-snug text-foreground transition-colors group-hover:text-gold">
            {product.name}
          </h3>
          {product.sku && (
            <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
              {product.sku}
            </p>
          )}
        </div>

        <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors group-hover:text-gold">
          {product.price ?? "Fiyat için iletişime geçin"} →
        </span>
      </Link>
    </li>
  )
}
