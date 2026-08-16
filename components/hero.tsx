import Link from "next/link"
import Image from "next/image"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products } from "@/lib/products"
import { lastContentReview } from "@/lib/site"

/* Mağaza hero'su: solda söz, sağda ürün. Önceki hâli beyaz zeminde
 * ortalanmış metinden ibaretti ve 624px boyunca hiçbir görsel taşımıyordu;
 * sayfaya girenin ilk gördüğü şey boşluktu. Koyu lacivert bant aynı zamanda
 * baştan sona beyaz akan sayfaya ağırlık veriyor. */

const HERO_URUNLER = [
  "retatrutide-30mg-aq-pen-zphc",
  "zptrop-100iu-zphc",
  "bpc157-25mg-5x5mg-zphc",
]

export function Hero() {
  const gorseller = HERO_URUNLER.map((slug) =>
    products.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p?.image))

  return (
    <section className="relative overflow-hidden bg-[#00314c] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,114,188,0.55),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold tracking-wide text-white/70">
            ZPHC TÜRKİYE
          </p>

          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Peptid ve büyüme hormonu ürünlerinde{" "}
            <span className="text-[#7cc4f2]">yetkili distribütör</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
            Zhengzhou Pharmaceutical&apos;in Türkiye distribütörüyüz. Kutudaki
            kodla ürününüzün orijinal olduğunu üreticinin kendi sitesinden
            doğrulayın.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/urunler"
              className="rounded-md bg-white px-8 py-3.5 text-center text-sm font-semibold text-[#00314c] transition-colors hover:bg-white/90"
            >
              {products.length} ürünü incele
            </Link>
            <WhatsappCta label="Fiyat sor" variant="hero" />
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
            {[
              ["Orijinallik", "Kutuda doğrulama kodu"],
              ["Sevkiyat", "Soğuk zincire uygun"],
              ["Kayıt", "Literatür referanslı"],
            ].map(([baslik, deger]) => (
              <div key={baslik}>
                <dt className="text-xs text-white/55">{baslik}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">
                  {deger}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Ürün kompozisyonu: hero'nun sağ yarısını dolduran tek görsel öğe.
            Fotoğraflar beyaz fon üzerine kesilmiş olduğu için açık renkli
            kartlara oturtuluyor, koyu zeminde doğrudan durmuyorlar. */}
        <ul className="grid grid-cols-2 gap-4 lg:gap-5">
          {gorseller.map((urun, i) => (
            <li
              key={urun.slug}
              className={i === 0 ? "col-span-2" : undefined}
            >
              <Link
                href={`/urunler/${urun.slug}`}
                className="group block overflow-hidden rounded-xl bg-white/95 p-4 shadow-lg ring-1 ring-white/20 transition-transform duration-200 hover:-translate-y-1"
              >
                <Image
                  src={urun.image!}
                  alt={urun.name}
                  width={600}
                  height={400}
                  priority={i === 0}
                  className={`w-full scale-110 object-contain mix-blend-multiply ${
                    i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative border-t border-white/10 px-6 py-3 text-center text-xs text-white/45 md:px-10">
        İçerik son güncelleme: {lastContentReview}
      </p>
    </section>
  )
}
