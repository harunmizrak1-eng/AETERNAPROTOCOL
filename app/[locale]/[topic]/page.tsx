import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { InternationalSeoPage } from "@/components/international-seo-page"
import {
  getLocalizedTopic,
  isSeoLocale,
  localizedTopicPath,
  seoLocales,
  seoTopicIds,
  topicLanguageAlternates,
  topicTranslations,
} from "@/lib/international-seo"

export function generateStaticParams() {
  return seoLocales.flatMap((locale) =>
    seoTopicIds.map((topicId) => ({ locale, topic: topicTranslations[locale][topicId].slug })),
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; topic: string }> }): Promise<Metadata> {
  const { locale, topic } = await params
  if (!isSeoLocale(locale)) return {}
  const item = getLocalizedTopic(locale, topic)
  if (!item) return {}
  const path = localizedTopicPath(locale, item.id)
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: path, languages: topicLanguageAlternates(item.id) },
    openGraph: { title: item.title, description: item.description, url: path },
  }
}

export default async function LocalizedTopicPage({ params }: { params: Promise<{ locale: string; topic: string }> }) {
  const { locale, topic } = await params
  if (!isSeoLocale(locale)) notFound()
  const item = getLocalizedTopic(locale, topic)
  if (!item) notFound()
  return <InternationalSeoPage locale={locale} topicId={item.id} />
}
