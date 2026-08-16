import type { Metadata } from "next"
import Link from "next/link"

import { ProductCard } from "@/components/product-card"
import {
  categoryLabels,
  categoryOrder,
  products,
  productsByCategory,
} from "@/lib/products"

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "ZPHC peptid ve insan büyüme hormonu kataloğu — kategori kategori, " +
    "resmi ürün verisiyle.",
}

export default function UrunlerPage() {
  const activeCategories = categoryOrder.filter(
    (c) => productsByCategory(c).length > 0,
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-zphc-navy">Ürün Kataloğu</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {products.length} ürün, {activeCategories.length} kategori. Flakon
          başına miktar, kutu içeriği ve sunum formu üreticinin resmi ürün
          verisinden birebir alınmıştır. Kaynakta bulunmayan hiçbir teknik
          değer tahmin edilerek doldurulmamıştır.
        </p>
      </header>

      <nav aria-label="Kategoriler" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {activeCategories.map((c) => (
            <li key={c}>
              <a
                href={`#${c}`}
                className="inline-block rounded border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-zphc-blue hover:text-zphc-blue"
              >
                {categoryLabels[c]} ({productsByCategory(c).length})
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {activeCategories.map((c) => (
        <section key={c} id={c} className="mt-12 scroll-mt-28">
          <h2 className="border-b border-line pb-2 text-xl font-bold text-zphc-navy">
            {categoryLabels[c]}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {productsByCategory(c).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-12 text-xs text-ink-soft">
        Aradığınız ürünü bulamadıysanız{" "}
        <Link href="/iletisim" className="font-semibold text-zphc-blue hover:underline">
          bize ulaşın
        </Link>
        .
      </p>
    </div>
  )
}
