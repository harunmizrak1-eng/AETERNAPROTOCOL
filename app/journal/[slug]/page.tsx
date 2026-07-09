import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { articles, getArticle } from "@/lib/articles"
import { siteUrl, siteName } from "@/lib/site"

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: "Journal" }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/journal/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      url: `${siteUrl}/journal/${article.slug}`,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const relatedByCategory = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            dateModified: article.date,
            author: {
              "@type": "Organization",
              name: siteName,
            },
            publisher: {
              "@type": "Organization",
              name: siteName,
            },
            mainEntityOfPage: `${siteUrl}/journal/${article.slug}`,
          }),
        }}
      />
      <Nav />
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <article className="px-6 pb-24 md:px-10">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/journal"
              className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Journal
            </Link>

            <div className="mt-10 flex items-center gap-4">
              <span className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                {article.category}
              </span>
              <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
                {article.readMinutes} dk okuma
              </span>
            </div>

            <h1 className="mt-6 text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              {article.title}
            </h1>

            <div className="mt-12 flex flex-col gap-6">
              {article.body.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-foreground/85"
                >
                  {para}
                </p>
              ))}
            </div>

            {article.relatedLinks && article.relatedLinks.length > 0 && (
              <div className="mt-16 border-t border-hairline pt-8">
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  İlgili
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  {article.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-gold"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedByCategory.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-8">
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  {article.category} · İlgili Yazılar
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  {relatedByCategory.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/journal/${a.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-gold"
                    >
                      {a.title} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 border-t border-hairline pt-8">
              <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
                Bu yazı bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez.
                Herhangi bir protokole başlamadan önce bir hekime danışın.
              </p>
            </div>
          </div>
        </article>

        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
