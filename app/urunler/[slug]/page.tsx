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

  const description =
    product.description ??
    `${product.name} — ${product.activeIngredient}. Ürün bilgisi ve stok durumu için iletişime geçin.`

  return {
    title: product.name,
    description,
    alternates: { canonical: `/urunler/${product.slug}` },
    openGraph: {
      title: product.name,
      description,
      url: `/urunler/${product.slug}`,
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
  // product record itself only has to carry commercial/presentation data.
  const peptide = product.peptideSlug ? getPeptide(product.peptideSlug) : undefined
  const citationList = peptide ? citations[peptide.slug] : undefined

  // Only render the spec table when at least one field was actually supplied
  // from official data; a table of empty rows is worse than no table.
  const specs = [
    { label: "Etkin Madde", value: product.activeIngredient },
    { label: "Miktar", value: product.strength },
    { label: "Sunum", value: product.presentation },
    { label: "Form", value: product.form },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value))

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

            <h1 className="mt-10 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description ?? product.activeIngredient}
            </p>

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

            {specs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Ürün Bilgisi
                </h2>
                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground sm:w-40 sm:shrink-0">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-light text-foreground/90">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
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
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
