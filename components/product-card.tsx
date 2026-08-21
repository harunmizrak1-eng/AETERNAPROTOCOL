import Link from "next/link"
import Image from "next/image"
import { categoryLabels, type Product } from "@/lib/products"
import { whatsappLink } from "@/lib/contact"

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
    <div className="group flex h-full flex-col border border-hairline bg-background p-5 text-center transition-colors hover:border-gold/50">
      <Link
        href={`/urunler/${product.slug}`}
        className="flex flex-1 flex-col items-center"
      >
        {/* mix-blend-multiply bilerek YOK. Beyaz pikselleri saydamlaştırdığı
            için, kutusu beyaz olan ZPHC ürünleri (AICAR, AOD 9604, BPC-157...)
            beyaz kart zemininde tamamen kayboluyor ve kart boş görünüyordu.
            Gerçek zphcstore.com da görselleri hiçbir karışım kipi
            uygulamadan, olduğu gibi basıyor. */}
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

      {/* Doğrudan WhatsApp'a giden düğme. Önceden müşterinin fiyat sorması
          için önce ürün sayfasına girmesi gerekiyordu; bu fazladan bir adım
          ve her adımda insan kaybediliyor. Mesaj ürünün adını taşıyor. */}
      <a
        href={whatsappLink(
          `Merhaba, ${product.name} için fiyat ve stok bilgisi alabilir miyim?`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${product.name} için WhatsApp'tan fiyat sorun`}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1eb855]"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
        WhatsApp
      </a>
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
