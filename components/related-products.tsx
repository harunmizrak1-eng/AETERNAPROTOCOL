import Link from "next/link"
import { products } from "@/lib/catalog"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"

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
  compact = false,
}: {
  peptideSlug: string
  /** Ürün sayfasında kendini listelememesi için. */
  excludeSlug?: string
  title?: string
  emptyNote?: string
  compact?: boolean
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

      {/* Bağlı ürün sayısı bileşiğe göre değişir (1'den fazla düzine boyuta
          kadar); sabit sütunlu "seam" ızgarası (gap-px bg-hairline) tam
          bölünmeyen sayılarda boş hücreyi gri renkle görünür bırakır.
          ProductCard kendi kenarlığını zaten taşıyor; burada yalnızca
          boşluklu (şeffaf) bir grid yeterli. */}
      {compact ? <ul className="-mx-6 mt-6 flex snap-x gap-3 overflow-x-auto px-6 pb-3 sm:mx-0 sm:px-0">
        {items.slice(0, 8).map((product) => {
          const price = getProductPrice(product.slug)
          return <li key={product.slug} className="w-48 shrink-0 snap-start"><Link href={`/urunler/${product.slug}`} className="block rounded-2xl border border-hairline bg-white p-3 transition hover:border-gold/50"><div className="rounded-xl bg-surface p-2">{product.image && <Image src={product.image} alt="" width={200} height={200} className="aspect-square w-full object-contain" />}</div><p className="mt-3 line-clamp-2 min-h-10 text-sm font-bold leading-5">{product.name}</p><p className="mt-2 text-sm font-extrabold text-gold">{price ? formatProductPrice(price) : "Fiyat için yazın"}</p></Link></li>
        })}
      </ul> : <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((product) => <li key={product.slug}><ProductCard product={product} /></li>)}
      </ul>}
    </div>
  )
}
