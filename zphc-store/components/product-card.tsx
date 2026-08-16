import Image from "next/image"
import Link from "next/link"

import type { Product } from "@/lib/products"

/** Katalog kartı. Teknik alanlar yalnızca doluysa render edilir — kaynakta
 * olmayan bir doz burada da görünmez. */
export function ProductCard({ product }: { product: Product }) {
  const cover = product.images?.[0]

  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square bg-surface-alt">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        {product.brand !== "ZPHC" ? (
          <span className="absolute left-2 top-2 rounded bg-zphc-navy px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white">
            {product.brand}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-bold leading-snug text-ink group-hover:text-zphc-blue">
          {product.name}
        </h3>

        <dl className="mt-auto space-y-0.5 text-xs text-ink-soft">
          {product.strengthPerVial ? (
            <div className="flex gap-1.5">
              <dt className="font-semibold">Flakon başına:</dt>
              <dd>{product.strengthPerVial}</dd>
            </div>
          ) : null}
          {product.vialCount ? (
            <div className="flex gap-1.5">
              <dt className="font-semibold">Kutu:</dt>
              <dd>{product.vialCount} adet</dd>
            </div>
          ) : null}
          {product.form ? <p>{product.form}</p> : null}
        </dl>
      </div>
    </Link>
  )
}
