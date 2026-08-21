import Link from "next/link"
import { products } from "@/lib/products"

/* zphcstore.com'un gerçek anasayfası koyu gradient'li bir "SaaS hero"
 * taşımıyor: beyaz zemin, üstte kısa bir uyarı/duyuru şeridi, altında
 * doğrudan kategori kutucukları. Buradaki şerit o dilin karşılığı —
 * marka vaadi yazan büyük başlık yerine, doğrulama uyarısını taşıyan
 * kısa ve düz bir bant. */
export function Hero() {
  return (
    <section className="border-b border-hairline bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-10">
        <p className="text-base text-foreground">
          <strong className="font-bold">ZPHC Türkiye Resmi Distribütörü.</strong>{" "}
          Aldığınız ürünün kodunu{" "}
          <Link
            href="/dogrulama"
            className="font-semibold text-gold underline underline-offset-2 hover:no-underline"
          >
            validation.zphc.com
          </Link>{" "}
          adresinden kendiniz doğrulayabilirsiniz.
        </p>
        <Link
          href="/urunler"
          className="shrink-0 rounded-full bg-gold px-6 py-2.5 text-base font-bold text-primary-foreground transition-colors hover:bg-gold/90"
        >
          {products.length} ürünü inceleyin
        </Link>
      </div>
    </section>
  )
}
