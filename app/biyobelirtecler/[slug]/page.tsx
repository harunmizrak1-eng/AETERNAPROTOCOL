import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { biomarkers, getBiomarker } from "@/lib/biomarkers"
import { getPeptide } from "@/lib/peptides"
import { caseStudies } from "@/lib/case-studies"

export function generateStaticParams() {
  return biomarkers.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const biomarker = getBiomarker(slug)
  if (!biomarker) return { title: "Biyobelirteç Sözlüğü" }
  return {
    title: biomarker.shortName,
    description: biomarker.what,
    alternates: {
      canonical: `/biyobelirtecler/${biomarker.slug}`,
    },
    openGraph: {
      title: biomarker.shortName,
      description: biomarker.what,
      url: `/biyobelirtecler/${biomarker.slug}`,
    },
  }
}

export default async function BiomarkerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const biomarker = getBiomarker(slug)
  if (!biomarker) notFound()

  const relatedPeptides = biomarker.relatedPeptideSlugs
    .map((s) => getPeptide(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const relatedCaseStudy = biomarker.relatedCaseStudySlug
    ? caseStudies.find((c) => c.slug === biomarker.relatedCaseStudySlug)
    : undefined

  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <article className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/biyobelirtecler"
              className="text-xs tracking-normal text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              ← Biyobelirteç Sözlüğü
            </Link>

            <p className="mt-10 text-xs tracking-normal text-muted-foreground font-medium">
              {biomarker.category}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
              {biomarker.name}
            </h1>

            <div className="mt-14 border-t border-hairline pt-10">
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                Ne Ölçer
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {biomarker.what}
              </p>
            </div>

            <div className="mt-10 border-t border-hairline pt-10">
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                Neden Önemli
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {biomarker.why}
              </p>
            </div>

            <div className="mt-10 border-t border-hairline pt-10">
              <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
                {biomarker.note}
              </p>
            </div>

            {(relatedPeptides.length > 0 || relatedCaseStudy) && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  İlgili
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {relatedCaseStudy && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Vaka analizi: bu belirteç{" "}
                      <span className="text-foreground/90">
                        {relatedCaseStudy.title}
                      </span>{" "}
                      protokolünde izlenmiştir.
                    </p>
                  )}
                  {relatedPeptides.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {relatedPeptides.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/peptidler/${p.slug}`}
                          className="rounded-lg border border-hairline shadow-sm px-4 py-2 text-xs tracking-normal text-muted-foreground transition-colors hover:border-gold/60 hover:text-foreground font-medium"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
