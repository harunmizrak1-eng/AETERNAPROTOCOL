import type { Metadata } from "next"
import { Suspense } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { ProductCatalog } from "@/components/product-catalog"

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "ZPHC peptid ve büyüme hormonu ürünleri. Kilo kaybı, toparlanma, büyüme hormonu ve cilt başlıklarına göre filtreleyin.",
  alternates: {
    canonical: "/urunler",
  },
  openGraph: {
    title: "Ürünler",
    description:
      "ZPHC peptid ve büyüme hormonu ürünleri. Kilo kaybı, toparlanma, büyüme hormonu ve cilt başlıklarına göre filtreleyin.",
    url: "/urunler",
  },
}

export default function UrunlerPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-28">
        <section className="px-6 pb-8 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ürünler
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
                ZPHC peptid ve büyüme hormonu ürünlerinin tamamı.
              </p>
            </div>
            <WhatsappCta label="Fiyat ve stok için yazın" />
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
