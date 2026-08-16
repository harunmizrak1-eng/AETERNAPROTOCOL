import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { WhatsappCta } from "@/components/whatsapp-cta"
import { citations } from "@/lib/citations"
import { getPeptide, tierLabel } from "@/lib/peptides"
import { getProduct, products, variantsOf } from "@/lib/products"

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
  return {
    title: product.name,
    description: product.description?.[0] ?? product.compound,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  // Ansiklopedi kaydı: tekil ürünlerde peptideSlug, karma ürünlerde her
  // bileşen. Kaydı olmayan bileşikler sessizce atlanır.
  const linked = [
    ...(product.peptideSlug ? [product.peptideSlug] : []),
    ...(product.componentSlugs ?? []),
  ]
  const compounds = linked
    .map((s) => getPeptide(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const variants = variantsOf(product)
  const cover = product.images?.[0]
  const extra = product.images?.slice(1) ?? []

  // Teknik satırlar — yalnızca kaynakta değeri olanlar.
  const specs: { label: string; value: string }[] = []
  if (product.activeIngredient)
    specs.push({ label: "Etkin madde", value: product.activeIngredient })
  if (product.strengthPerVial)
    specs.push({ label: "Flakon başına miktar", value: product.strengthPerVial })
  if (product.vialCount)
    specs.push({ label: "Kutu içeriği", value: `${product.vialCount} flakon / kartuş` })
  if (product.totalAmount)
    specs.push({ label: "Kutudaki toplam", value: product.totalAmount })
  if (product.form) specs.push({ label: "Form", value: product.form })
  if (product.brand) specs.push({ label: "Üretici", value: product.brand })
  if (product.sku) specs.push({ label: "Ürün kodu", value: product.sku })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="İz" className="text-xs text-ink-soft">
        <Link href="/urunler" className="hover:text-zphc-blue">
          Ürünler
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{product.compound}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-line bg-surface-alt">
            {cover ? (
              <Image
                src={cover}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
                className="object-contain p-5"
              />
            ) : null}
          </div>
          {extra.length > 0 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {extra.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded border border-line bg-surface-alt"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="12vw"
                    className="object-contain p-1.5"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h1 className="text-2xl font-bold leading-snug text-zphc-navy">
            {product.name}
          </h1>

          {specs.length > 0 ? (
            <dl className="mt-5 divide-y divide-line border-y border-line text-sm">
              {specs.map((s) => (
                <div key={s.label} className="flex gap-4 py-2.5">
                  <dt className="w-44 shrink-0 font-semibold text-ink-soft">
                    {s.label}
                  </dt>
                  <dd className="text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {product.composition ? (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-eyebrow text-ink-soft">
                Flakon başına bileşim
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-ink">
                {product.composition.map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6">
            <WhatsappCta product={product.name} className="w-full sm:w-auto" />
            <p className="mt-2.5 text-xs text-ink-soft">
              Sipariş bu site üzerinden tamamlanmaz. Fiyat ve stok bilgisi için
              WhatsApp üzerinden bilgi talebi gönderin.
            </p>
          </div>
        </div>
      </div>

      {product.description ? (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-zphc-navy">
            Resmi ürün açıklaması
          </h2>
          <p className="mt-1 text-xs text-ink-soft">
            Üreticinin yayımladığı açıklama, kaynaktaki haliyle aktarılmıştır.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink">
            {product.description.map((line, i) => (
              <li key={i} className="border-l-2 border-line pl-3">
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {compounds.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-zphc-navy">
            Bileşik bilgisi ve literatür
          </h2>
          <p className="mt-1 text-xs text-ink-soft">
            Aşağıdaki mekanizma ve kanıt bilgisi ürün pazarlamasından değil,
            bileşik ansiklopedisinden gelir.
          </p>

          <div className="mt-5 space-y-6">
            {compounds.map((c) => {
              const refs = citations[c.slug] ?? []
              return (
                <article
                  key={c.slug}
                  className="rounded-lg border border-line p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-ink">{c.name}</h3>
                    <span className="rounded bg-surface-alt px-2 py-0.5 text-xs font-semibold text-ink-soft">
                      {tierLabel[c.tier]}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    {c.mechanism}
                  </p>

                  {c.primaryOutcomes.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {c.primaryOutcomes.map((o) => (
                        <li
                          key={o}
                          className="rounded bg-surface-alt px-2 py-1 text-xs text-ink-soft"
                        >
                          {o}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {c.molecular?.weight || c.molecular?.halfLife ? (
                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-xs text-ink-soft">
                      {c.molecular.weight ? (
                        <div className="flex gap-1.5">
                          <dt className="font-semibold">Molekül ağırlığı:</dt>
                          <dd>{c.molecular.weight}</dd>
                        </div>
                      ) : null}
                      {c.molecular.halfLife ? (
                        <div className="flex gap-1.5">
                          <dt className="font-semibold">Yarı ömür:</dt>
                          <dd>{c.molecular.halfLife}</dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : null}

                  {refs.length > 0 ? (
                    <div className="mt-5 border-t border-line pt-4">
                      <h4 className="text-xs font-bold uppercase tracking-eyebrow text-ink-soft">
                        Literatür referansları
                      </h4>
                      <ul className="mt-3 space-y-3">
                        {refs.map((r) => (
                          <li key={r.pmid} className="text-xs leading-relaxed">
                            <p className="font-semibold text-ink">
                              {r.label} — {r.authors}
                            </p>
                            <p className="text-ink-soft">
                              {r.journal}, {r.year}. {r.note}
                            </p>
                            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                              <a
                                href={`https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-zphc-blue hover:underline"
                              >
                                PMID {r.pmid}
                              </a>
                              <a
                                href={`https://doi.org/${r.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-zphc-blue hover:underline"
                              >
                                DOI {r.doi}
                              </a>
                              {r.nct ? (
                                <a
                                  href={`https://clinicaltrials.gov/study/${r.nct}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-zphc-blue hover:underline"
                                >
                                  {r.nct}
                                </a>
                              ) : null}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {c.sideEffects && c.sideEffects.length > 0 ? (
                    <div className="mt-5 border-t border-line pt-4">
                      <h4 className="text-xs font-bold uppercase tracking-eyebrow text-danger">
                        Bildirilen yan etkiler
                      </h4>
                      <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                        {c.sideEffects.map((s) => (
                          <li key={s}>· {s}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      {variants.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-zphc-navy">
            {product.compound} — diğer sunumlar
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {variants.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/urunler/${v.slug}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm hover:text-zphc-blue"
                >
                  <span className="font-medium">{v.name}</span>
                  {v.strengthPerVial ? (
                    <span className="text-xs text-ink-soft">
                      flakon başına {v.strengthPerVial}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-12 rounded border border-line bg-surface-alt p-4 text-xs leading-relaxed text-ink-soft">
        Bu sayfadaki bilgiler yalnızca bilgilendirme amaçlıdır ve tıbbi tavsiye
        yerine geçmez. Ürünlerin kullanımı hekim gözetimi gerektirir. Sayfada
        görünmeyen bir teknik alan, üreticinin resmi verisinde bulunmadığı için
        bilinçli olarak boş bırakılmıştır.
      </p>
    </div>
  )
}
