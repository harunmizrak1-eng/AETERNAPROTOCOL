import Link from "next/link"
import { products } from "@/lib/catalog"
import { ProductCard } from "@/components/product-card"

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

      {/* Bağlı ürün sayısı bileşiğe göre değişir (1'den fazla düzine boyuta
          kadar); sabit sütunlu "seam" ızgarası (gap-px bg-hairline) tam
          bölünmeyen sayılarda boş hücreyi gri renkle görünür bırakır.
          ProductCard kendi kenarlığını zaten taşıyor; burada yalnızca
          boşluklu (şeffaf) bir grid yeterli. */}
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
