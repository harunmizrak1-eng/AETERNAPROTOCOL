import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { InternationalSeoPage } from "@/components/international-seo-page"
import { homeLanguageAlternates, isSeoLocale, localeUi, seoLocales } from "@/lib/international-seo"

export function generateStaticParams() {
  return seoLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isSeoLocale(locale)) return {}
  const ui = localeUi[locale]
  return {
    title: ui.hubTitle,
    description: ui.hubDescription,
    alternates: { canonical: `/${locale}`, languages: homeLanguageAlternates() },
    openGraph: { title: ui.hubTitle, description: ui.hubDescription, url: `/${locale}` },
  }
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isSeoLocale(locale)) notFound()
  return <InternationalSeoPage locale={locale} />
}
