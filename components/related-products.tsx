import Link from "next/link"
import Image from "next/image"
import { products, type Product } from "@/lib/products"

/** Bir bileşiğin satılan ürünleri.
 *
 * Kütüphanedeki 48 bileşik kaydı sitenin en değerli içeriğiydi ama hiçbiri
 * kataloğa bağlanmıyordu: BPC-157'yi okuyup ikna olan ziyaretçi ürünü
 * bulamıyordu. Bu bileşen o boşluğu kapatır ve ürün sayfasında da "aynı
 * bileşiğin diğer boyutları" olarak yeniden kullanılır.
 */
export function RelatedProducts({
  peptideSlug,
  excludeSlug,
  title = "Bu bileşiğin ürünleri",
  emptyNote,
}: {
  peptideSlug: string
  /** Ürün sayfasında kendini listelememesi için. */
  excludeSlug?: string
  title?: string
  emptyNote?: string
}) {
  const items = products.filter(
    (p) => p.peptideSlug === peptideSlug && p.slug !== excludeSlug,
  )

  if (items.length === 0) {
    return emptyNote ? (
      <p className="mt-4 text-sm text-muted-foreground">{emptyNote}</p>
    ) : null
  }

  return (
    <div className="mt-12 border-t border-hairline pt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <Link
          href="/urunler"
          className="text-sm font-semibold text-gold transition-opacity hover:opacity-70"
        >
          Tüm katalog →
        </Link>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <RelatedCard key={product.slug} product={product} />
        ))}
      </ul>
    </div>
  )
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <li>
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
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gold">
              {product.price ?? "Fiyat sor"}
            </span>
            <StockBadge inStock={product.inStock} />
          </div>
        </div>
      </Link>
    </li>
  )
}

export function StockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[0.7rem] font-medium ${
        inStock
          ? "bg-tier-proven/10 text-tier-proven"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {inStock ? "Stokta" : "Tükendi"}
    </span>
  )
}
