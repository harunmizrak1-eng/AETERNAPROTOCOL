import type { Metadata } from "next"
import { Suspense } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { ProductCatalog } from "@/components/product-catalog"

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "ZPHC peptid ve insan büyüme hormonu ürün kataloğu. Kilo kaybı, toparlanma, büyüme hormonu ve anti-aging başlıklarına göre filtreleyin.",
  alternates: {
    canonical: "/urunler",
  },
  openGraph: {
    title: "Ürünler",
    description:
      "ZPHC peptid ve insan büyüme hormonu ürün kataloğu. Kilo kaybı, toparlanma, büyüme hormonu ve anti-aging başlıklarına göre filtreleyin.",
    url: "/urunler",
  },
}

export default function UrunlerPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-28">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Katalog
              </p>
            </div>

            <h1 className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Ürünler
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Peptid ve insan büyüme hormonu hattı. Her ürün, kütüphanedeki
              bileşik kaydına bağlıdır; mekanizma, kanıt seviyesi ve literatür
              referansları ürün sayfasından görülebilir.
            </p>

            <div className="mt-8">
              <WhatsappCta label="Fiyat ve stok için yazın" />
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-6xl">
            {/* useSearchParams needs a Suspense boundary on a static route. */}
            <Suspense fallback={null}>
              <ProductCatalog />
            </Suspense>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-20 text-center">
          <p className="mx-auto max-w-lg text-pretty text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            Stok durumu ve tedarik koşulları için doğrudan yazın.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsappCta />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
