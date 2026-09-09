import type { Metadata } from "next"
import { Suspense } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { ProductCatalog } from "@/components/product-catalog"
import { ShopSidebar } from "@/components/shop-sidebar"
import { getCategoryInfo } from "@/lib/category-info"
import { products } from "@/lib/catalog"
import { siteUrl } from "@/lib/site"

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

export default async function UrunlerPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>
}) {
  // searchParams okumak rotayı dinamik yapar. Bu bilinçli: katalog daha önce
  // statikti ve filtre client tarafında olduğu için sunucu HTML'i bomboş
  // çıkıyordu — arama motoru da ilk boyama da ürünsüz bir sayfa görüyordu.
  const { kategori } = await searchParams
  const info = getCategoryInfo(kategori)
  const catalogueJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: info?.title ?? "ZPHC Türkiye ürün kataloğu",
    url: `${siteUrl}/urunler`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${siteUrl}/urunler/${product.slug}`,
      })),
    },
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueJsonLd).replace(/</g, "\\u003c") }} />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-8 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4">
            {/* Başlık ve açıklama kategoriye göre değişiyor. Kategori
                sayfalarında daha önce sadece ürün ızgarası vardı; ne arama
                motoruna ne de ilk kez bakan müşteriye o başlığın ne olduğunu
                anlatan tek satır yoktu. */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {info?.title ?? "Doğru ürünü daha hızlı bulun"}
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {info?.body ??
                  "Önce aradığınız alanı, sonra ürün formunu seçin. Benzer görünen ürünlerin farkını karşılaştırma aracıyla yan yana görün."}
              </p>
            </div>
            <div className="hidden sm:block">
              <WhatsappCta label="Fiyat ve stok için yazın" />
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          {/* Mağaza düzeni: solda kategori kenar çubuğu, sağda ızgara —
              zphcstore.com'un mağaza sayfasındaki yerleşimin aynısı.
              Dar ekranda kenar çubuğu ızgaranın üstüne iner. */}
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:gap-10">
            <ShopSidebar active={kategori} />
            <div className="min-w-0 flex-1">
              <Suspense fallback={null}>
                <ProductCatalog initialGoal={kategori} />
              </Suspense>
            </div>
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
