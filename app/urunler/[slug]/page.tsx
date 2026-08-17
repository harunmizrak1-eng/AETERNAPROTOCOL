import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products, getProduct, categoryLabels } from "@/lib/products"
import { getPeptide, tierLabel, tierColorVar, tierDots } from "@/lib/peptides"
import { citations } from "@/lib/citations"
import { siteUrl } from "@/lib/site"
import { RelatedProducts } from "@/components/related-products"
import { StockBadge } from "@/components/product-card"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}

  const description = `${product.name} ürün bilgisi, içerik ve stok durumu için iletişime geçin.`

  return {
    title: product.name,
    description,
    alternates: { canonical: `/urunler/${product.slug}` },
    openGraph: {
      title: product.name,
      description,
      url: `/urunler/${product.slug}`,
      images: product.image ? [product.image] : undefined,
    },
  }
}

export default async function UrunPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  // Linked encyclopedia entry, when this product maps to one. It supplies the
  // scientific half of the page (mechanism, evidence tier, citations) so the
  // product record itself only carries commercial/presentation data.
  const peptide = product.peptideSlug
    ? getPeptide(product.peptideSlug)
    : undefined
  const citationList = peptide ? citations[peptide.slug] : undefined

  const technical = product.specs.filter((s) => s.kind === "spec")
  const claims = product.specs.filter((s) => s.kind === "claim")

  // schema.org Product: arama sonuçlarında görsel, stok ve marka görünsün.
  // Fiyat yayımlanmadığı için offers yalnızca stok durumu taşır; uydurma
  // fiyat vermek yerine alanı hiç eklemiyoruz.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: { "@type": "Brand", name: "ZPHC" },
    image: product.image ? [`${siteUrl}${product.image}`] : undefined,
    description: peptide?.short ?? product.name,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/urunler/${product.slug}`,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "TRY",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content" className="bg-background pt-28">
        <article className="px-6 pb-28 md:px-10">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Konum" className="text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Ana sayfa
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/urunler"
                    className="transition-colors hover:text-foreground"
                  >
                    Ürünler
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-foreground">
                  {categoryLabels[product.category]}
                </li>
              </ol>
            </nav>

            <h1 className="mt-6 text-balance text-3xl font-bold leading-snug tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            {product.sku && (
              <p className="mt-4 font-mono text-sm text-muted-foreground">
                SKU: {product.sku}
              </p>
            )}

            {product.image && (
              <div className="mt-8 border border-hairline bg-surface p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  priority
                  className="mx-auto w-full max-w-lg object-contain mix-blend-multiply"
                />
              </div>
            )}

            {/* Price slot. Deliberately empty until real pricing is supplied;
                the enquiry button carries the action in the meantime. */}
            <div className="mt-10 flex flex-col gap-4 border-y border-hairline py-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-foreground">
                  {product.price ?? (
                    <span className="text-xl font-semibold text-muted-foreground">
                      Fiyat için yazın
                    </span>
                  )}
                </p>
                <StockBadge inStock={product.inStock} />
              </div>
              <WhatsappCta product={product.name} label="Fiyat Sor" />
            </div>

            {technical.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Ürün bilgisi
                </h2>
                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {technical.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-sm font-semibold text-foreground sm:w-48 sm:shrink-0">
                        {spec.label}
                      </dt>
                      <dd className="text-base leading-relaxed text-muted-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Manufacturer claims are kept visually distinct from verified
                product data: they are ZPHC's own marketing copy and can
                overstate what the evidence supports. The tier badge below,
                drawn from the library, is the site's own assessment. */}
            {claims.length > 0 && (
              <div className="mt-12 border border-hairline bg-muted/20 p-6 sm:p-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Üretici beyanı
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  ZPHC&apos;nin kendi ürün açıklamasından.
                </p>
                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {claims.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-sm font-semibold text-foreground sm:w-48 sm:shrink-0">
                        {spec.label}
                      </dt>
                      <dd className="text-base leading-relaxed text-muted-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.notes.length > 0 && (
              <ul className="mt-10 space-y-2">
                {product.notes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden="true" className="text-gold/70">
                      ·
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            )}

            {peptide && (
              <div className="mt-12 border-t border-hairline pt-10">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`font-mono text-sm ${tierColorVar[peptide.tier]}`}
                  >
                    {tierDots[peptide.tier]}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {tierLabel[peptide.tier]}
                  </span>
                </div>

                <h2 className="mt-8 text-xl font-bold tracking-tight text-foreground">
                  Etki mekanizması
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {peptide.mechanism}
                </p>

                {peptide.primaryOutcomes.length > 0 && (
                  <>
                    <h2 className="mt-10 text-xl font-bold tracking-tight text-foreground">
                      Birincil sonuçlar
                    </h2>
                    <ul className="mt-4 space-y-2">
                      {peptide.primaryOutcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                        >
                          <span aria-hidden="true" className="text-gold/70">
                            ·
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {citationList && citationList.length > 0 && (
                  <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                    Bu bileşik için {citationList.length} doğrulanmış literatür
                    referansı mevcut.
                  </p>
                )}

                <Link
                  href={`/peptidler/${peptide.slug}`}
                  className="mt-8 inline-block text-base font-semibold text-gold transition-opacity hover:opacity-70"
                >
                  Bileşiğin tam kaydını gör →
                </Link>
              </div>
            )}

            {product.peptideSlug && (
              <RelatedProducts
                peptideSlug={product.peptideSlug}
                excludeSlug={product.slug}
                title="Aynı bileşiğin diğer ürünleri"
              />
            )}

            <p className="mt-12 border-t border-hairline pt-8 text-sm leading-relaxed text-muted-foreground">
              Bu ürünler laboratuvar ve araştırma materyali olarak sunulur;
              insan kullanımı için tasarlanmamıştır. Sağlık kararlarınız için
              hekiminize danışın.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
