import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import {
  categoryLabels,
  categoryOrder,
  productsByCategory,
} from "@/lib/products"

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "ZPHC peptid ve insan büyüme hormonu ürün kataloğu. Ürün bilgisi ve stok durumu için doğrudan iletişime geçin.",
  alternates: {
    canonical: "/urunler",
  },
  openGraph: {
    title: "Ürünler",
    description:
      "ZPHC peptid ve insan büyüme hormonu ürün kataloğu. Ürün bilgisi ve stok durumu için doğrudan iletişime geçin.",
    url: "/urunler",
  },
}

export default function UrunlerPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Katalog
              </p>
            </div>

            <h1 className="mt-10 max-w-3xl text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-6xl">
              Ürünler
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Peptid ve insan büyüme hormonu hattı. Her ürün, kütüphanedeki
              bileşik kaydına bağlıdır — mekanizma, kanıt seviyesi ve
              literatür referansları ürün sayfasından görülebilir.
            </p>

            <div className="mt-10">
              <WhatsappCta label="Fiyat ve Stok İçin Yazın" />
            </div>
          </div>
        </section>

        {categoryOrder.map((category) => {
          const items = productsByCategory(category)
          if (items.length === 0) return null

          return (
            <section key={category} className="px-6 pb-16 md:px-10">
              <div className="mx-auto max-w-6xl">
                <h2 className="border-b border-hairline pb-4 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  {categoryLabels[category]}
                </h2>

                <ul className="mt-8 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <li key={product.slug} className="bg-background">
                      <Link
                        href={`/urunler/${product.slug}`}
                        className="group flex h-full flex-col justify-between gap-6 p-8 transition-colors hover:bg-muted/40"
                      >
                        <div>
                          {product.image && (
                            <Image
                              src={product.image}
                              alt=""
                              width={300}
                              height={300}
                              className="mb-6 aspect-square w-full rounded-sm bg-muted/30 object-contain"
                            />
                          )}
                          <h3 className="font-serif text-lg font-light leading-snug tracking-wide text-foreground transition-colors group-hover:text-gold">
                            {product.name}
                          </h3>
                          {product.sku && (
                            <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
                              {product.sku}
                            </p>
                          )}
                        </div>

                        <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors group-hover:text-gold">
                          {product.price ?? "Fiyat için iletişime geçin"} →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}

        <section className="px-6 pb-28 text-center sm:pb-36">
          <p className="mx-auto max-w-lg text-pretty font-serif text-2xl font-light italic leading-relaxed text-foreground/90 sm:text-3xl">
            Stok durumu ve tedarik koşulları için doğrudan yazın.
          </p>
          <div className="mt-10 flex justify-center">
            <WhatsappCta />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
