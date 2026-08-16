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
]

export function FeaturedProducts() {
  const items = FEATURED.map((slug) =>
    products.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  // Fall back to the head of the catalogue if the curated slugs have all
  // drifted, so the section never renders empty.
  const shown = items.length > 0 ? items : products.slice(0, 6)

  return (
    <section className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Katalogdan
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
            Peptid ve insan büyüme hormonu hattı.
          </h2>
          <Link
            href="/urunler"
            className="shrink-0 text-[0.65rem] uppercase tracking-eyebrow text-gold transition-opacity hover:opacity-70"
          >
            Tüm ürünler →
          </Link>
        </div>

        <ul className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((product) => (
            <li key={product.slug} className="bg-background">
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
                  <h3 className="font-serif text-lg font-light leading-snug tracking-wide text-foreground transition-colors group-hover:text-gold">
                    {product.name}
                  </h3>
                </div>
                <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors group-hover:text-gold">
                  İncele →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
