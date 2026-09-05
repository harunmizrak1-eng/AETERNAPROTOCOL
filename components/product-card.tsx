import Link from "next/link"
import Image from "next/image"
import { categoryLabels, type Product } from "@/lib/products"
import { whatsappLink } from "@/lib/contact"
import { TrackedOutboundLink } from "@/components/tracked-outbound-link"

/** Tek, paylaşılan ürün kartı. Katalog, çok satan şeritleri ve ilgili
 * ürünler bölümlerinin hepsi bunu kullanır.
 *
 * Düzen zphcstore.com'un gerçek WooCommerce kart yapısını izliyor: görsel
 * doğrudan beyaz zeminde, kategori etiketi başlığın üstünde küçük ve soluk,
 * içerik ortalanmış.
 *
 * YAPI NOTU: Kart eskiden baştan sona tek bir <Link>'ti. WhatsApp düğmesi
 * eklenince bu bozuldu, çünkü bir bağlantının içine başka bir bağlantı
 * konulamaz (geçersiz HTML, ekran okuyucularda ve tıklamada sorun çıkarır).
 * Kart artık bir <div>; görsel ve başlık ürün sayfasına giden bağlantı,
 * WhatsApp düğmesi ise onun dışında ayrı bir bağlantı.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex h-full gap-4 border border-hairline bg-background p-4 text-left transition-colors hover:border-gold/50 sm:flex-col sm:p-5 sm:text-center">
      <Link
        href={`/urunler/${product.slug}`}
        className="flex shrink-0 items-center sm:w-full sm:flex-1 sm:flex-col"
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
            sizes="(max-width: 639px) 112px, (max-width: 1023px) 33vw, 25vw"
            className="h-28 w-28 object-contain sm:aspect-square sm:h-auto sm:w-full"
          />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col sm:items-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground sm:mt-4 sm:text-[0.7rem]">
          {categoryLabels[product.category]}
        </p>
        <Link href={`/urunler/${product.slug}`} className="block">
          <h3 className="mt-1.5 text-sm font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:justify-center">
          <span className="text-sm font-bold text-foreground sm:text-base">
            {product.price ?? "Fiyat sorun"}
          </span>
          <StockBadge inStock={product.inStock} />
        </div>

        <TrackedOutboundLink
          href={whatsappLink(
            `Merhaba, ${product.name} için fiyat ve stok bilgisi alabilir miyim?`,
          )}
          eventName="WhatsApp Click"
          properties={{ source: "product_card", product: product.slug }}
          ariaLabel={`${product.name} için WhatsApp'tan fiyat ve stok sorun`}
          className="mt-auto inline-flex min-h-10 items-center justify-center rounded-full bg-[#25D366] px-4 text-xs font-bold text-white transition-colors hover:bg-[#1eb855] sm:mt-4 sm:w-full sm:text-sm"
        >
          Fiyat ve stok sorun
        </TrackedOutboundLink>
      </div>
    </div>
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
