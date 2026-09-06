import Image from "next/image"
import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products } from "@/lib/catalog"

const TRUST_POINTS = [
  { icon: "✓", title: "Orijinallik kontrolü", detail: "Üretici koduyla doğrulayın", href: "/dogrulama" },
  { icon: "▣", title: "Türkiye stoğu", detail: "Ürünler yerel depodan çıkar" },
  { icon: "→", title: "Ücretsiz kargo", detail: "Hızlı ve takip edilebilir", href: "/kargo" },
]

const FEATURED_SLUGS = [
  "retatrutide-60mg-5x12mg-zphc",
  "bpc157-25mg-5x5mg-zphc",
  "zptrop-hgh-100iu-aq-vial-zphc",
]

export function Hero() {
  const featured = FEATURED_SLUGS.map((slug) =>
    products.find((product) => product.slug === slug),
  ).filter((product) => product?.image)

  return (
    <section className="overflow-hidden border-b border-hairline bg-[linear-gradient(135deg,var(--surface),var(--background))]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-9 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-10 md:py-12 lg:gap-14 lg:py-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            ZPHC Türkiye
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            Kutuyu görün.<br />Kodu doğrulayın.<br />Sonra karar verin.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Orijinal ZPHC ürünleri, Türkiye stoğu ve üreticinin kendi doğrulama sistemi. Fiyat, stok ve gönderim bilgisi ürün sayfasında.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/urunler"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-gold/85"
            >
              Mağazaya gir →
            </Link>
            <WhatsappCta
              label="WhatsApp’tan yazın"
              size="compact"
              source="home_hero"
            />
          </div>
        </div>

        <div className="relative min-h-64 sm:min-h-72">
          <div className="absolute inset-x-0 bottom-0 top-8 rounded-[2rem] bg-gold/8" />
          <div className="relative grid grid-cols-3 items-end gap-2 px-2 pt-2 sm:gap-4 sm:px-6">
            {featured.map((product, index) => (
              <Link
                key={product!.slug}
                href={`/urunler/${product!.slug}`}
                className={`group relative overflow-hidden rounded-2xl border border-hairline bg-background p-2 shadow-[0_18px_45px_rgba(0,49,76,0.10)] transition-transform hover:-translate-y-1 sm:p-3 ${
                  index === 1 ? "mb-8" : ""
                }`}
              >
                <Image
                  src={product!.image!}
                  alt={product!.name}
                  width={320}
                  height={320}
                  sizes="(max-width: 767px) 28vw, 14vw"
                  className="aspect-square w-full object-contain"
                />
                <span className="mt-1 block truncate text-center text-[0.65rem] font-semibold text-foreground sm:text-xs">
                  {product!.name}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/dogrulama"
            className="relative mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-background px-4 py-2 text-xs font-bold text-gold shadow-sm transition-opacity hover:opacity-70"
          >
            Üretici koduyla doğrulama →
          </Link>
        </div>
      </div>

      <div className="border-t border-hairline bg-background px-6 py-5 md:px-10">
        <ul className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <li
              key={point.title}
              className="relative flex min-h-20 items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 transition-colors hover:border-gold/35"
            >
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-lg font-bold text-gold">{point.icon}</span>
              <div><strong className="block text-sm text-foreground">{point.title}</strong><span className="mt-0.5 block text-xs text-muted-foreground">{point.detail}</span></div>
              {point.href && <Link href={point.href} aria-label={point.title} className="absolute inset-0" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
