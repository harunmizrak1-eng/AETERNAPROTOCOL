import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { getProductForm } from "@/components/product-card"
import { products } from "@/lib/catalog"
import {
  localeUi,
  localizedTopicPath,
  seoLocales,
  seoTopicIds,
  topicProducts,
  topicTranslations,
  type SeoLocale,
  type SeoTopicId,
} from "@/lib/international-seo"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"
import { siteName, siteUrl } from "@/lib/site"

const localeLabels = { tr: "Türkçe", en: "English", es: "Español", ar: "العربية" }

export function InternationalSeoPage({
  locale,
  topicId,
}: {
  locale: SeoLocale
  topicId?: SeoTopicId
}) {
  const ui = localeUi[locale]
  const topic = topicId ? topicTranslations[locale][topicId] : undefined
  const shownProducts = topicId
    ? topicProducts[topicId]
        .map((slug) => products.find((product) => product.slug === slug))
        .filter((product): product is NonNullable<typeof product> => Boolean(product))
    : []

  const jsonLd = topic
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: topic.title,
        description: topic.description,
        url: `${siteUrl}${localizedTopicPath(locale, topicId!)}`,
        inLanguage: locale,
        isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: shownProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: `${siteUrl}/urunler/${product.slug}`,
          })),
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: ui.hubTitle,
        description: ui.hubDescription,
        url: `${siteUrl}/${locale}`,
        inLanguage: locale,
        isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
      }

  return (
    <div lang={locale} dir={ui.dir} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-hairline bg-background px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href={`/${locale}`} aria-label={ui.hubTitle}>
            <Image src="/brand/zphc-logo.png" alt="ZPHC" width={250} height={42} className="h-8 w-auto" priority />
          </Link>
          <nav aria-label="Language" className="flex flex-wrap gap-2 text-xs font-semibold">
            <Link href="/" className="rounded-full border border-hairline px-3 py-1.5 hover:border-gold/50">{localeLabels.tr}</Link>
            {seoLocales.map((language) => (
              <Link
                key={language}
                href={`/${language}`}
                hrefLang={language}
                className={`rounded-full border px-3 py-1.5 ${language === locale ? "border-gold bg-gold/10 text-gold" : "border-hairline hover:border-gold/50"}`}
              >
                {localeLabels[language]}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b border-hairline bg-surface px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{ui.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {topic?.title ?? ui.hubTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {topic?.intro ?? ui.hubIntro}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-gold/25 bg-background px-3 py-2 text-sm font-semibold">{ui.officialDomain}</span>
              <span className="rounded-full border border-gold/25 bg-background px-3 py-2 text-sm font-semibold">validation.zphc.com</span>
            </div>
          </div>
        </section>

        {topic ? (
          <section className="px-6 py-12 md:px-10 md:py-16">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold">{ui.products}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{ui.currentSelection}</p>
              <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {shownProducts.map((product) => {
                  const price = getProductPrice(product.slug)
                  return (
                    <li key={product.slug}>
                      <Link href={`/urunler/${product.slug}`} className="group flex h-full flex-col rounded-2xl border border-hairline bg-background p-3 shadow-[0_8px_30px_rgba(13,27,42,0.04)] transition hover:-translate-y-0.5 hover:border-gold/40 sm:p-4">
                        {product.image && (
                          <div className="rounded-xl bg-surface p-2">
                            <Image src={product.image} alt={product.name} width={400} height={400} className="aspect-square w-full object-contain" />
                          </div>
                        )}
                        <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-wide text-gold">{getProductForm(product)}</p>
                        <h3 className="mt-1 text-sm font-bold leading-snug sm:text-base">{product.name}</h3>
                        <div className="mt-auto pt-4">
                          <p className="border-t border-hairline pt-3 text-base font-extrabold">{price ? formatProductPrice(price) : ui.priceOnRequest}</p>
                          <span className="mt-3 inline-flex text-sm font-bold text-gold">{ui.viewProduct} →</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        ) : null}

        <section className={`${topic ? "border-t" : ""} border-hairline px-6 py-12 md:px-10 md:py-16`}>
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold">{ui.browseTopics}</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {seoTopicIds.map((id) => {
                const item = topicTranslations[locale][id]
                return (
                  <Link key={id} href={localizedTopicPath(locale, id)} className="group rounded-2xl border border-hairline bg-surface p-5 transition hover:-translate-y-0.5 hover:border-gold/40">
                    <h3 className="text-xl font-bold group-hover:text-gold">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    <span className="mt-4 inline-flex text-sm font-bold text-gold">{ui.viewProduct} →</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-hairline bg-surface px-6 py-12 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-bold">{ui.verificationTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{ui.verificationBody}</p>
            </div>
            <a href="https://validation.zphc.com" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex rounded-full bg-gold px-5 py-3 text-sm font-bold text-white transition hover:opacity-90">
              {ui.verify} ↗
            </a>
          </div>
        </section>
        <p className="mx-auto max-w-4xl px-6 py-8 text-center text-xs leading-5 text-muted-foreground">{ui.researchOnly}</p>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  )
}
