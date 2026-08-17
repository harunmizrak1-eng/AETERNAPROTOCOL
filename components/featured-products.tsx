import Link from "next/link"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

/** Homepage catalogue teaser. Picks a fixed, hand-chosen set rather than
 * "first six" so the row stays representative (repair, GLP-1, HGH, longevity)
 * even as the generated catalogue is refreshed. Any slug that disappears from
 * the source is simply skipped, so a catalogue update can never break the
 * homepage. */
const FEATURED = [
  "bpc157-25mg-5x5mg-zphc",
  "tb500-25mg-5x5mg-zphc",
  "retatrutide-10mg-5x2mg-zphc-2",
  "semaglutide-5mg-kit-zphc",
  "zptrop-100iu-zphc",
  "ghk-cu-50mg-zphc",
  "tirzepatide-30mg-aq-pen-zphc",
  "ipamorelin-25mg-5x5mg-zphc",
]

export function FeaturedProducts() {
  const items = FEATURED.map((slug) =>
    products.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  // Fall back to the head of the catalogue if the curated slugs have all
  // drifted, so the section never renders empty.
  const shown = items.length > 0 ? items : products.slice(0, 8)

  return (
    <section className="border-b border-hairline px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Öne çıkan ürünler
          </h2>
          <Link
            href="/urunler"
            className="text-sm font-semibold text-gold transition-opacity hover:opacity-70"
          >
            Tüm ürünler ({products.length}) →
          </Link>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {shown.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
