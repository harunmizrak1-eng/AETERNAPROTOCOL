import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocalizedCatalog } from "@/components/localized-catalog"
import { isSeoLocale, localeUi, seoLocales } from "@/lib/international-seo"

export function generateStaticParams() {
  return seoLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isSeoLocale(locale)) return {}
  const ui = localeUi[locale]
  return {
    title: ui.catalogueTitle,
    description: ui.catalogueDescription,
    alternates: {
      canonical: `/${locale}/products`,
      languages: { en: "/en/products", es: "/es/products", ar: "/ar/products", "tr-TR": "/urunler", "x-default": "/urunler" },
    },
    openGraph: { title: ui.catalogueTitle, description: ui.catalogueDescription, url: `/${locale}/products` },
  }
}

export default async function LocalizedProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isSeoLocale(locale)) notFound()
  return <LocalizedCatalog locale={locale} />
}
