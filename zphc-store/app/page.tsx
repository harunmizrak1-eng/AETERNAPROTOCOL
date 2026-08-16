import Link from "next/link"

import { ProductCard } from "@/components/product-card"
import { WhatsappCta } from "@/components/whatsapp-cta"
import {
  categoryLabels,
  categoryOrder,
  products,
  productsByCategory,
} from "@/lib/products"

export default function HomePage() {
  const activeCategories = categoryOrder.filter(
    (c) => productsByCategory(c).length > 0,
  )
  const featured = products.filter((p) => p.peptideSlug).slice(0, 8)

  return (
    <>
      <section className="bg-zphc-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-bold uppercase tracking-eyebrow text-zphc-blue-light">
            ZPHC Türkiye
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            Peptid ve insan büyüme hormonu kataloğu
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
            Zhengzhou Pharmaceutical peptid ve HGH hattının Türkiye kataloğu.
            Her ürün sayfası üreticinin resmi verisini, bileşiğin etki
            mekanizmasını ve PubMed doğrulamalı literatür referanslarını bir
            arada sunar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/urunler"
              className="inline-flex items-center rounded bg-white px-6 py-3 text-sm font-semibold text-zphc-navy hover:bg-white/90"
            >
              Kataloğu incele
            </Link>
            <WhatsappCta variant="primary" />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
          <Feature
            title="Resmi ürün verisi"
            body="Flakon başına miktar, kutu içeriği ve form üreticinin kendi verisinden birebir alınır. Kaynakta olmayan değer tahmin edilmez, sayfada hiç gösterilmez."
          />
          <Feature
            title="PubMed referanslı"
            body="Bileşiklerin mekanizma ve kanıt bilgisi, PMID/DOI/NCT numarasıyla doğrulanabilir literatüre bağlanır."
          />
          <Feature
            title="Scratch kod doğrulama"
            body="Her ZPHC kutusundaki kazı-kazan kodu ile ürün orijinalliğini doğrulayın."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-zphc-navy">Kategoriler</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {activeCategories.map((c) => (
            <li key={c}>
              <Link
                href={`/urunler#${c}`}
                className="flex h-full flex-col justify-between rounded-lg border border-line p-4 transition-colors hover:border-zphc-blue"
              >
                <span className="text-sm font-bold text-ink">
                  {categoryLabels[c]}
                </span>
                <span className="mt-2 text-xs text-ink-soft">
                  {productsByCategory(c).length} ürün
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {featured.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-zphc-navy">Öne çıkanlar</h2>
            <Link
              href="/urunler"
              className="text-sm font-semibold text-zphc-blue hover:underline"
            >
              Tümü →
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-zphc-navy">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}
