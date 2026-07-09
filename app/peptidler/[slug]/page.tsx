import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PeptideCta } from "@/components/peptide-cta"
import {
  peptides,
  getPeptide,
  tierLabel,
  tierColorVar,
  tierDots,
  categoryGoalMap,
} from "@/lib/peptides"
import { getArticle } from "@/lib/articles"
import { citations } from "@/lib/citations"
import { lastContentReview } from "@/lib/site"

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) return { title: "Peptid Kütüphanesi" }
  return {
    title: peptide.name,
    description: peptide.short,
    alternates: {
      canonical: `/peptidler/${peptide.slug}`,
    },
    openGraph: {
      title: peptide.name,
      description: peptide.short,
      url: `/peptidler/${peptide.slug}`,
    },
  }
}

export default async function PeptideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) notFound()

  const relatedArticle = peptide.relatedArticleSlug
    ? getArticle(peptide.relatedArticleSlug)
    : undefined
  const goal = categoryGoalMap[peptide.category]
  const citation = citations[peptide.slug]

  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <article className="px-6 pb-28 sm:pb-36 md:px-10">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/peptidler"
              className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Peptid Kütüphanesi
            </Link>

            <p className="mt-10 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
              {peptide.category}
            </p>
            <h1 className="mt-3 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-6xl">
              {peptide.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.65rem] uppercase tracking-eyebrow">
              <span
                className={`font-mono ${tierColorVar[peptide.tier]}`}
                aria-hidden="true"
              >
                {tierDots[peptide.tier]}
              </span>
              <span className={tierColorVar[peptide.tier]}>
                {tierLabel[peptide.tier]}
              </span>
              <span className="text-muted-foreground">
                · {peptide.clinicalStatus}
              </span>
            </div>

            <p className="mt-8 text-base leading-relaxed text-foreground/85">
              {peptide.short}
            </p>

            <div className="mt-14 border-t border-hairline pt-10">
              <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                Mekanizma
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {peptide.mechanism}
              </p>
            </div>

            <div className="mt-10 border-t border-hairline pt-10">
              <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                Birincil Sonuç Göstergeleri
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {peptide.primaryOutcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 flex-shrink-0 bg-gold/60"
                    />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            {peptide.evidenceMatrix && peptide.evidenceMatrix.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Kanıt Matrisi
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  Aşağıdaki her sonuç, kaynak bölümündeki çalışmada doğrudan
                  raporlanmıştır — genel kanıt kademesinden bağımsız olarak.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[380px] border-collapse font-mono text-xs">
                    <caption className="sr-only">
                      {peptide.name} sonuç bazlı kanıt matrisi
                    </caption>
                    <tbody>
                      {peptide.evidenceMatrix.map((row) => (
                        <tr key={row.outcome} className="border-b border-hairline last:border-b-0">
                          <th scope="row" className="py-3 pr-4 text-left font-normal text-foreground">
                            {row.outcome}
                          </th>
                          <td className={`py-3 text-right ${tierColorVar[row.tier]}`}>
                            {tierDots[row.tier]}{" "}
                            <span className="uppercase tracking-eyebrow">
                              {tierLabel[row.tier]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {citation && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Kaynak
                </h2>
                <div className="mt-4 rounded-sm border border-hairline bg-surface p-6">
                  <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
                    {citation.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {citation.authors} — <em className="font-serif italic">{citation.journal}</em>, {citation.year}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {citation.note}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold transition-opacity hover:opacity-70"
                    >
                      PubMed PMID: {citation.pmid} →
                    </a>
                    <a
                      href={`https://doi.org/${citation.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold transition-opacity hover:opacity-70"
                    >
                      DOI: {citation.doi} →
                    </a>
                    {citation.nct && (
                      <a
                        href={`https://clinicaltrials.gov/study/${citation.nct}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold transition-opacity hover:opacity-70"
                      >
                        ClinicalTrials: {citation.nct} →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {relatedArticle && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  İlgili Journal Yazısı
                </h2>
                <Link
                  href={`/journal/${relatedArticle.slug}`}
                  className="mt-4 inline-block font-serif text-lg font-light italic text-foreground/90 transition-colors hover:text-gold"
                >
                  {relatedArticle.title} →
                </Link>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-10 sm:flex-row sm:items-center">
              <PeptideCta goal={goal} />
              <p className="text-[0.65rem] font-light leading-relaxed text-muted-foreground">
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
