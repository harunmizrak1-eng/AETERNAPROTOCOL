import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/final-cta"
import { Newsletter } from "@/components/newsletter"
import { articles, getArticle } from "@/lib/articles"

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
  if (!article) return { title: "Journal — ÆTERNA" }
  return {
    title: `${article.title} — ÆTERNA`,
    description: article.excerpt,
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

  return (
    <>
      <Nav />
      <main className="relative z-10 bg-background pt-32">
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
              <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground/50">
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
                  className="text-base font-light leading-relaxed text-foreground/85"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-16 border-t border-hairline pt-8">
              <p className="text-[0.7rem] font-light leading-relaxed text-muted-foreground/60">
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
