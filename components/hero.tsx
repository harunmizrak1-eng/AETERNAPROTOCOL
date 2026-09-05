import Link from "next/link"
import { products } from "@/lib/products"

const TRUST_POINTS = [
  "Resmi distribütör",
  "Üreticiden doğrulama",
  "Türkiye deposu",
  "Ücretsiz kargo",
]

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-hairline bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-10 md:py-16 lg:gap-16 lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            ZPHC Türkiye Resmi Distribütörü
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Orijinalliği üreticinin kendi sisteminden doğrulayın.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            ZPHC peptid ve büyüme hormonu ürünleri Türkiye depomuzdan
            gönderilir. Her kutudaki benzersiz kodun sonucunu doğrudan
            üreticinin doğrulama sisteminde görebilirsiniz.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/urunler"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 text-sm font-bold text-primary-foreground transition-colors hover:bg-gold/85"
            >
              {products.length} ürünü inceleyin
            </Link>
            <Link
              href="/dogrulama"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold/50 bg-background px-7 text-sm font-bold text-gold transition-colors hover:border-gold hover:bg-gold/5"
            >
              Orijinallik nasıl doğrulanır?
            </Link>
          </div>
        </div>

        <div className="border border-gold/20 bg-background p-6 shadow-[0_20px_60px_rgba(0,49,76,0.08)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
            Üç adımda kontrol
          </p>
          <ol className="mt-6 space-y-5">
            {[
              "Kutudaki gümüş doğrulama alanını bulun.",
              "Kaplamayı kazıyıp benzersiz kodu alın.",
              "Kodu ZPHC'nin kendi sisteminde sorgulayın.",
            ].map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <Link
            href="/dogrulama"
            className="mt-7 inline-flex text-sm font-bold text-gold transition-opacity hover:opacity-70"
          >
            Doğrulama rehberini açın →
          </Link>
        </div>
      </div>

      <div className="border-t border-hairline bg-background">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4 md:px-10">
          {TRUST_POINTS.map((point) => (
            <li
              key={point}
              className="flex min-h-14 items-center justify-center gap-2 border-hairline px-3 text-center text-xs font-semibold text-foreground odd:border-r md:border-r md:last:border-r-0"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0 fill-gold"
              >
                <path fillRule="evenodd" d="M10 1.5 3 4.6v5.1c0 4.4 3 8.4 7 9.3 4-.9 7-4.9 7-9.3V4.6L10 1.5Zm3.6 6.4-4.2 4.2a.75.75 0 0 1-1.06 0L6.4 10.15a.75.75 0 1 1 1.06-1.06l1.42 1.42 3.67-3.67a.75.75 0 1 1 1.06 1.06Z" clipRule="evenodd" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
