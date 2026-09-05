import Link from "next/link"
import Image from "next/image"
import { categoryLabels, type Product } from "@/lib/products"

/** Tek, paylaşılan ürün kartı. Katalog, çok satan şeritleri ve ilgili
 * ürünler bölümlerinin hepsi bunu kullanır.
 *
 * Düzen zphcstore.com'un gerçek WooCommerce kart yapısını izliyor: görsel
 * doğrudan beyaz zeminde, kategori etiketi başlığın üstünde küçük ve soluk,
 * içerik ortalanmış.
 *
 * Mobil katalogda kartın tamamı ürün detayına gider. Satış aksiyonu detay
 * sayfasında kalır; böylece her kartta tekrarlanan CTA ızgarayı boğmaz.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex h-full flex-col border border-hairline bg-background p-3 text-left transition-colors hover:border-gold/50 sm:p-5 sm:text-center">
      <Link
        href={`/urunler/${product.slug}`}
        className="flex w-full flex-1 flex-col"
      >
        {/* mix-blend-multiply bilerek YOK. Beyaz pikselleri saydamlaştırdığı
            için, kutusu beyaz olan ZPHC ürünleri (AICAR, AOD 9604, BPC-157...)
            beyaz kart zemininde tamamen kayboluyor ve kart boş görünüyordu.
            Gerçek zphcstore.com da görselleri hiçbir karışım kipi
            uygulamadan, olduğu gibi basıyor. */}
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            sizes="(max-width: 639px) 44vw, (max-width: 1023px) 33vw, 25vw"
            className="aspect-square w-full object-contain"
          />
        )}
        <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-wide text-muted-foreground sm:mt-4 sm:text-[0.7rem]">
          {categoryLabels[product.category]}
        </p>
        <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold sm:mt-1.5 sm:text-base">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-3 sm:justify-center sm:gap-2">
          <span className="text-xs font-bold text-foreground sm:text-base">
            {product.price ?? "Fiyat sorun"}
          </span>
          <StockBadge inStock={product.inStock} />
        </div>
        <span className="mt-auto pt-3 text-xs font-semibold text-gold sm:pt-4 sm:text-sm">
          Ürünü incele →
        </span>
      </Link>
    </div>
  )
}

export function StockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span
      className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold sm:px-2 sm:text-xs ${
        inStock
          ? "bg-tier-proven/10 text-tier-proven"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {inStock ? "Stokta" : "Tükendi"}
    </span>
  )
}
