import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/products"

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
    <section className="border-t border-hairline px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Öne çıkan ürünler
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Katalogdan bir seçki.
            </p>
          </div>

          <Link
            href="/urunler"
            className="rounded-md border border-gold px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Tüm ürünleri gör ({products.length})
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/urunler/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
              >
                {product.image && (
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
                  <p className="mt-3 text-sm font-semibold text-gold">
                    Fiyat sor →
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
