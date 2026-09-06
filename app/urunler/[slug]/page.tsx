import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products, getProduct, categoryLabels } from "@/lib/catalog"
import { getPeptide, tierLabel, tierColorVar, tierDots } from "@/lib/peptides"
import { citations } from "@/lib/citations"
import { siteUrl } from "@/lib/site"
import { RelatedProducts } from "@/components/related-products"
import { SizeComparison } from "@/components/size-comparison"
import { StockBadge } from "@/components/product-card"
import { getPlainSummary } from "@/lib/plain-summaries"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"
import { ProductPurchaseBar } from "@/components/product-purchase-bar"
import { ProductReviews } from "@/components/product-reviews"
import { getApprovedReviews } from "@/lib/review-store"

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

  /* Katalogdaki adlar kutunun üstündeki kısaltmayı kullanıyor ("Reta ZPHC
   * 60 mg", "Tirze ZPHC 50 mg"). Müşteri ise arama motoruna bileşiğin tam
   * adını yazıyor: "retatrutide", "tirzepatide". Ad kutuyla eşleşsin diye
   * değiştirilmiyor, ama tam ad başlığa ekleniyor ki arama sonuçlarında
   * bulunabilsin. */
  const peptide = product.peptideSlug
    ? getPeptide(product.peptideSlug)
    : undefined

  const fullName =
    peptide && !product.name.toLowerCase().includes(peptide.name.toLowerCase())
      ? `${product.name} (${peptide.name})`
      : product.name

  /* Önceki açıklama 75 ürünün hepsinde aynıydı ("ürün bilgisi, içerik ve
   * stok durumu için iletişime geçin"). Arama motoru için değersiz, üstelik
   * tıklamaya da davet etmiyordu. Artık her ürün kendi bileşiğinin sade
   * özetini ve gerçek teslimat bilgisini taşıyor. */
  const summary = getPlainSummary(product.peptideSlug) ?? peptide?.short
  const description = summary
    ? `${product.name}. ${summary} Ertesi gün kargo, kargo ücreti yok.`.slice(
        0,
        300,
      )
    : `${product.name}. ZPHC resmi distribütöründen. Ertesi gün kargo, kargo ücreti yok.`

  return {
    title: fullName,
    description,
    alternates: { canonical: `/urunler/${product.slug}` },
    openGraph: {
      title: fullName,
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

  const plainSummary =
    getPlainSummary(product.peptideSlug) ?? peptide?.short

  const technical = product.specs.filter((s) => s.kind === "spec")
  const claims = product.specs.filter((s) => s.kind === "claim")
  const productPrice = getProductPrice(product.slug)
  const reviews = await getApprovedReviews(product.slug, 100)
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0

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
      price: productPrice,
    },
    aggregateRating: reviews.length
      ? {
          "@type": "AggregateRating",
          ratingValue: averageRating.toFixed(1),
          reviewCount: reviews.length,
        }
      : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content" className="bg-background">
        <article className="px-6 pb-28 md:px-10">
          <div className="mx-auto max-w-7xl">
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

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
              <div className="relative overflow-hidden rounded-3xl border border-hairline bg-[radial-gradient(circle_at_50%_30%,#ffffff_0%,#eef6fa_72%)] p-5 sm:p-10">
                <span className="absolute left-5 top-5 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-xs font-bold text-gold shadow-sm backdrop-blur">Orijinal ZPHC</span>
                {product.image && (
                  <Image src={product.image} alt={product.name} width={1000} height={1000} priority sizes="(max-width: 1023px) 90vw, 48vw" className={`mx-auto aspect-square w-full max-w-xl ${product.slug === "ghk-cu-200mg-zphc" ? "object-cover" : "object-contain"}`} />
                )}
              </div>

              <div className="lg:pt-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{categoryLabels[product.category]} · Türkiye stoğu</p>
                <h1 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{product.name}</h1>

                <a href="#yorumlar" className="mt-4 inline-flex flex-wrap items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70">
                  <span className="tracking-[0.12em] text-gold" aria-label={reviews.length ? `${averageRating.toFixed(1)} yıldız` : "Henüz puan yok"}>{reviews.length ? "★".repeat(Math.round(averageRating)) : "☆☆☆☆☆"}<span className="text-slate-200">{reviews.length ? "★".repeat(5 - Math.round(averageRating)) : ""}</span></span>
                  <span className="text-foreground">{reviews.length ? `${averageRating.toFixed(1)} · ${reviews.length} yorum` : "Henüz yorum yok"}</span>
                  <span className="text-gold">Yorumları görün →</span>
                </a>

                {plainSummary && <p className="mt-6 text-base leading-7 text-foreground/75 sm:text-lg">{plainSummary}</p>}

                <div className="mt-7 rounded-2xl border border-hairline bg-white p-5 shadow-[0_18px_45px_rgba(0,49,76,0.08)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{productPrice ? formatProductPrice(productPrice) : product.price ?? <span className="text-xl font-semibold text-muted-foreground">Fiyat için yazın</span>}</p>
                    <StockBadge inStock={product.inStock} />
                  </div>
                  <div className="mt-5 [&_a]:w-full [&_a]:min-h-12 [&_a]:text-base">
                    <WhatsappCta product={product.name} label={productPrice ? "WhatsApp’tan sipariş ver" : "WhatsApp’tan fiyat sorun"} message={productPrice ? `Merhaba, ${product.name} ürününü ${formatProductPrice(productPrice)} fiyatıyla sipariş vermek istiyorum. Stok durumunu teyit eder misiniz?` : undefined} />
                  </div>
                  <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">Ürün adı ve fiyat mesaja otomatik eklenir. Sipariş resmî WhatsApp hattında teyit edilir.</p>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#eef8f2] px-4 py-3 text-sm text-foreground"><span aria-hidden="true" className="text-lg text-tier-proven">✓</span><p><strong>Ücretsiz, ertesi gün kargo.</strong> Yurtiçi Kargo ile gönderilir. <Link href="/kargo" className="font-semibold text-gold hover:underline">Koşulları görün</Link></p></div>
                {product.sku && <p className="mt-4 font-mono text-[0.7rem] text-muted-foreground">Ürün kodu: {product.sku}</p>}
              </div>
            </div>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
              <li className="bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">01 · Doğrulama</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Kutudaki kodu üreticinin sisteminde kendiniz kontrol edin.</p><Link href="/dogrulama" className="mt-3 inline-block text-xs font-bold text-gold">Nasıl doğrulanır? →</Link></li>
              <li className="bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">02 · Gönderim</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Türkiye stoğundan, ücretsiz ve takip edilebilir kargo.</p><Link href="/kargo" className="mt-3 inline-block text-xs font-bold text-gold">Kargo bilgisi →</Link></li>
              <li className="bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">03 · Destek</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Sipariş öncesi ve sonrasında aynı resmî WhatsApp hattı.</p><span className="mt-3 inline-block text-xs font-bold text-tier-proven">Çevrim içi destek</span></li>
            </ul>

            <ProductReviews productSlug={product.slug} productName={product.name} reviews={reviews.slice(0, 6)} reviewCount={reviews.length} averageRating={averageRating} />

            {technical.length > 0 && (
              <div className="mt-12 rounded-2xl border border-hairline bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Ürün bilgisi
                </h2>
                <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
                  {technical.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 bg-white p-4"
                    >
                      <dt className="text-xs font-bold uppercase tracking-[0.1em] text-gold">
                        {spec.label}
                      </dt>
                      <dd className="mt-2 text-sm leading-6 text-muted-foreground">
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
              <details className="group mt-5 rounded-2xl border border-hairline bg-muted/20 p-6 sm:p-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4"><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-gold">Ayrıntılı bilgi</span><span className="mt-1 block text-xl font-bold tracking-tight text-foreground">Üretici beyanları</span></span><span aria-hidden="true" className="text-2xl text-gold transition group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-sm text-muted-foreground">Bu bölüm ZPHC&apos;nin kendi ürün açıklamasından aktarılmıştır.</p>
                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {claims.map((spec) => <div key={spec.label} className="py-4 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-6"><dt className="text-sm font-semibold text-foreground">{spec.label}</dt><dd className="mt-1 text-sm leading-6 text-muted-foreground sm:mt-0">{spec.value}</dd></div>)}
                </dl>
              </details>
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
              <details className="group mt-5 rounded-2xl border border-hairline bg-white p-6 sm:p-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4"><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-gold">Kaynaklı içerik</span><span className="mt-1 block text-xl font-bold tracking-tight text-foreground">Bilimsel arka plan</span></span><span aria-hidden="true" className="text-2xl text-gold transition group-open:rotate-45">+</span></summary>
                <div className="mt-6 flex items-center gap-3">
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
              </details>
            )}

            <SizeComparison product={product} />

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
      <ProductPurchaseBar
        slug={product.slug}
        name={product.name}
        inStock={product.inStock}
      />
      <Footer />
    </>
  )
}
