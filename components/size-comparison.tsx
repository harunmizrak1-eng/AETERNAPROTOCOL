import Link from "next/link"
import { products, type Product } from "@/lib/products"
import { comparableSizes } from "@/lib/product-size"
import { StockBadge } from "@/components/product-card"

/** Aynı bileşiğin boyutlarını yan yana gösteren tablo.
 *
 * Katalogda bir bileşiğin çok sayıda boyutu var (Retatrutide için 8,
 * Tirzepatide için 5). Ziyaretçi hangisini alacağına karar veremeden
 * WhatsApp'tan yazıyor; bu tablo kararı sayfada verebilmesini sağlıyor.
 *
 * Tabloda BİLEREK yer almayanlar:
 * - Doz önerisi, "kaç haftaya yeter" gibi hesaplar. Bunlar kişiye ve
 *   protokole göre değişir; uydurulmuş bir kullanım süresi vermek hem
 *   yanıltıcı hem tehlikeli olur.
 * - Karışım ürünler (Glow Pro Mix vb.). "60 mg Glow Pro Mix" 60 mg
 *   BPC-157 değildir; saf ürünlerle aynı sütunda sıralamak yanıltırdı.
 * - Fiyat. Sitede fiyat yayımlanmıyor, birim fiyat karşılaştırması
 *   yapılamıyor.
 *
 * Yalnızca ürün adından okunabilen gerçek veri gösteriliyor: toplam
 * miktar, sunum biçimi ve stok durumu.
 */
export function SizeComparison({ product }: { product: Product }) {
  const rows = comparableSizes(product, products)

  // Tek boyut varsa karşılaştıracak bir şey yok.
  if (rows.length < 2) return null

  return (
    <div className="mt-12 border-t border-hairline pt-10">
      <h2 className="text-xl font-bold tracking-tight text-foreground">
        Boyut karşılaştırması
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Aynı üründen katalogda bulunan diğer boyutlar. Hangisini almanız
        gerektiğinden emin değilseniz WhatsApp&apos;tan sorun.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <caption className="sr-only">
            {product.name} ve aynı bileşiğin diğer boyutları
          </caption>
          <thead>
            <tr className="border-b border-hairline text-left">
              <th scope="col" className="py-2 pr-4 font-semibold text-foreground">
                Toplam
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold text-foreground">
                Sunum
              </th>
              <th scope="col" className="py-2 font-semibold text-foreground">
                Durum
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ product: p, size }) => {
              const current = p.slug === product.slug
              return (
                <tr
                  key={p.slug}
                  className={`border-b border-hairline last:border-b-0 ${
                    current ? "bg-surface" : ""
                  }`}
                >
                  <td className="py-3 pr-4 font-mono font-semibold text-foreground">
                    {size.amount} {size.unit}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {current ? (
                      <span className="font-semibold text-foreground">
                        {size.presentation ?? p.name}{" "}
                        <span className="font-normal text-muted-foreground">
                          (bu sayfa)
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={`/urunler/${p.slug}`}
                        className="text-gold underline-offset-4 hover:underline"
                      >
                        {size.presentation ?? p.name}
                      </Link>
                    )}
                  </td>
                  <td className="py-3">
                    <StockBadge inStock={p.inStock} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
