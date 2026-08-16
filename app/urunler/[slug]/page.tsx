import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products, getProduct, categoryLabels } from "@/lib/products"
import { getPeptide, tierLabel, tierColorVar, tierDots } from "@/lib/peptides"
import { citations } from "@/lib/citations"

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

  const description = `${product.name} — ürün bilgisi, içerik ve stok durumu için iletişime geçin.`

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

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-32">
        <article className="px-6 pb-28 md:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <Link
                href="/urunler"
                className="text-[0.65rem] uppercase tracking-eyebrow text-gold transition-opacity hover:opacity-70"
              >
                {categoryLabels[product.category]}
              </Link>
            </div>

            <h1 className="mt-10 text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
              {product.name}
            </h1>

            {product.sku && (
              <p className="mt-4 font-mono text-[0.7rem] text-muted-foreground">
                SKU: {product.sku}
              </p>
            )}

            {product.image && (
              // Remote host isn't configured for next/image optimisation, so
              // this stays a plain img with explicit dimensions.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                loading="lazy"
                className="mt-10 w-full rounded-sm border border-hairline bg-muted/30 object-contain"
              />
            )}

            {/* Price slot. Deliberately empty until real pricing is supplied;
                the enquiry button carries the action in the meantime. */}
            <div className="mt-10 flex flex-col gap-4 border-y border-hairline py-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-serif text-2xl font-light text-foreground">
                {product.price ?? (
                  <span className="text-muted-foreground">
                    Fiyat için iletişime geçin
                  </span>
                )}
              </p>
              <WhatsappCta product={product.name} label="Fiyat Sor" />
            </div>

            {technical.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Ürün Bilgisi
                </h2>
                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {technical.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground sm:w-44 sm:shrink-0">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-light leading-relaxed text-foreground/90">
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
              <div className="mt-12 rounded-sm border border-hairline bg-muted/20 p-6 sm:p-8">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
                  Üretici Beyanı
                </h2>
                <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground">
                  Aşağıdaki ifadeler üreticinin (ZPHC) kendi ürün
                  açıklamasından alınmıştır. Bağımsız olarak doğrulanmamıştır
                  ve bu sayfadaki kanıt seviyesi değerlendirmesiyle
                  çelişebilir.
                </p>

                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {claims.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground sm:w-44 sm:shrink-0">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-light leading-relaxed text-foreground/75">
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
                    className="flex gap-3 text-sm font-light leading-relaxed text-foreground/80"
                  >
                    <span aria-hidden="true" className="text-gold/70">
                      —
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
                    className={`font-mono text-xs ${tierColorVar[peptide.tier]}`}
                  >
                    {tierDots[peptide.tier]}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
                    {tierLabel[peptide.tier]}
                  </span>
                </div>

                <h2 className="mt-8 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Etki Mekanizması
                </h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-foreground/85">
                  {peptide.mechanism}
                </p>

                {peptide.primaryOutcomes.length > 0 && (
                  <>
                    <h2 className="mt-10 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                      Birincil Sonuçlar
                    </h2>
                    <ul className="mt-4 space-y-2">
                      {peptide.primaryOutcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-3 text-sm font-light leading-relaxed text-foreground/85"
                        >
                          <span aria-hidden="true" className="text-gold/70">
                            —
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {citationList && citationList.length > 0 && (
                  <p className="mt-8 text-xs font-light leading-relaxed text-muted-foreground">
                    Bu bileşik için {citationList.length} doğrulanmış literatür
                    referansı mevcut.
                  </p>
                )}

                <Link
                  href={`/peptidler/${peptide.slug}`}
                  className="mt-8 inline-block font-serif text-lg font-light italic text-foreground/90 transition-colors hover:text-gold"
                >
                  Kütüphanedeki tam kaydı görüntüle →
                </Link>
              </div>
            )}

            <p className="mt-12 border-t border-hairline pt-8 text-xs font-light leading-relaxed text-muted-foreground">
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
