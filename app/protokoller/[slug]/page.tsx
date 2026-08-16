import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PeptideCta } from "@/components/peptide-cta"
import { protocols, getProtocol } from "@/lib/protocols"
import { getPeptide, tierLabel, tierColorVar, tierDots } from "@/lib/peptides"
import { getArticle } from "@/lib/articles"
import { caseStudies } from "@/lib/case-studies"
import { lastContentReview } from "@/lib/site"

export function generateStaticParams() {
  return protocols.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const protocol = getProtocol(slug)
  if (!protocol) return { title: "Protokoller" }
  return {
    title: protocol.name,
    description: protocol.summary,
    alternates: { canonical: `/protokoller/${protocol.slug}` },
    openGraph: {
      title: protocol.name,
      description: protocol.summary,
      url: `/protokoller/${protocol.slug}`,
    },
  }
}

export default async function ProtocolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const protocol = getProtocol(slug)
  if (!protocol) notFound()

  const peptides = protocol.peptideSlugs
    .map((s) => getPeptide(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const caseStudy = protocol.caseStudySlug
    ? caseStudies.find((c) => c.slug === protocol.caseStudySlug)
    : undefined
  const articles = protocol.relatedArticleSlugs
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))

  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <article className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/#danismanlik"
              className="text-xs tracking-normal text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              ← Danışmanlık
            </Link>

            <p className="mt-10 text-xs tracking-normal text-muted-foreground font-medium">
              {protocol.tagline}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
              {protocol.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-normal font-medium">
              <span className={`font-mono ${tierColorVar[protocol.tier]}`} aria-hidden="true">
                {tierDots[protocol.tier]}
              </span>
              <span className={tierColorVar[protocol.tier]}>
                {tierLabel[protocol.tier]}
              </span>
            </div>

            <p className="mt-8 text-base leading-relaxed text-foreground/85">
              {protocol.summary}
            </p>

            <div className="mt-6 rounded-lg border border-hairline shadow-sm bg-surface p-6">
              <p className="text-xs tracking-normal text-gold/90 font-medium">
                Kanıt Notu
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {protocol.tierNote}{" "}
                <Link
                  href="/metodoloji"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Metodolojimiz
                </Link>
              </p>
            </div>

            <div className="mt-10 border-t border-hairline pt-10">
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                İçerdiği Bileşikler
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {peptides.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/peptidler/${p.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-hairline shadow-sm bg-surface p-5 transition-colors hover:border-gold/60"
                  >
                    <div>
                      <p className="text-lg tracking-wide text-foreground">
                        {p.name}
                      </p>
                      <p className="mt-1 text-xs tracking-normal text-muted-foreground font-medium">
                        {p.category}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-xs ${tierColorVar[p.tier]}`}
                      aria-hidden="true"
                    >
                      {tierDots[p.tier]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {caseStudy && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  İlgili Vaka Analizi
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Bu protokolün {caseStudy.duration} boyunca izlenen
                  anonimleştirilmiş bir örneği anasayfadaki vaka analizleri
                  bölümünde yer alır.
                </p>
              </div>
            )}

            {articles.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  İlgili Yazılar
                </h2>
                <div className="mt-4 flex flex-col gap-2">
                  {articles.map((a) => (
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

            <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-10 sm:flex-row sm:items-center">
              <PeptideCta
                goal={protocol.goal}
                label="Bu Protokol İçin Değerlendirme Başlat"
              />
              <p className="text-[0.65rem] leading-relaxed text-muted-foreground">
                Son inceleme: {lastContentReview}
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
