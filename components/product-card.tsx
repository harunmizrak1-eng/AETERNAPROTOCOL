import Link from "next/link"
import Image from "next/image"
import { categoryLabels, type Product } from "@/lib/products"

/** Tek, paylaşılan ürün kartı. Katalog, öne çıkanlar ve ilgili ürünler
 * bölümlerinin üçü de bunu kullanır — önceden neredeyse aynı JSX üç yerde
 * tekrarlanıyordu.
 *
 * Düzen zphcstore.com'un gerçek WooCommerce kart yapısını izliyor: görsel
 * doğrudan beyaz zeminde, kategori etiketi başlığın üstünde küçük ve soluk,
 * içerik ortalanmış. Öncekinde sol hizalı, gölgeli, hover'da yükselen
 * "SaaS kartı" görünümü vardı; bu bir ilaç distribütörü sitesine değil,
 * bir başlangıç şirketi açılış sayfasına ait bir dil.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="group flex h-full flex-col items-center border border-hairline bg-background p-5 text-center transition-colors hover:border-gold/50"
    >
      {/* mix-blend-multiply bilerek YOK. Beyaz pikselleri saydamlaştırdığı
          için, kutusu beyaz olan ZPHC ürünleri (AICAR, AOD 9604, BPC-157...)
          beyaz kart zemininde tamamen kayboluyor ve kart boş görünüyordu.
          Gerçek zphcstore.com da görselleri hiçbir karışım kipi uygulamadan,
          olduğu gibi basıyor. */}
      {product.image && (
        <Image
          src={product.image}
          alt=""
          width={400}
          height={400}
          className="aspect-square w-full object-contain"
        />
      )}

      <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {categoryLabels[product.category]}
      </p>
      <h3 className="mt-1.5 text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold">
        {product.name}
      </h3>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-base font-bold text-foreground">
          {product.price ?? "Fiyat sorun"}
        </span>
        <StockBadge inStock={product.inStock} />
      </div>
    </Link>
  )
}

export function StockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
        inStock
          ? "bg-tier-proven/10 text-tier-proven"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {inStock ? "Stokta" : "Tükendi"}
    </span>
  )
}
