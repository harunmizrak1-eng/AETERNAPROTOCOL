import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PeptideCta } from "@/components/peptide-cta"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { DoseLadderChart } from "@/components/dose-ladder-chart"
import { AccumulationCalculator } from "@/components/accumulation-calculator"
import {
  peptides,
  getPeptide,
  tierLabel,
  tierColorVar,
  tierDots,
  tierDosingDisclaimer,
  categoryGoalMap,
} from "@/lib/peptides"
import { getArticle } from "@/lib/articles"
import { citations } from "@/lib/citations"
import { lastContentReview } from "@/lib/site"

/** Extracts a display unit from a dose step's amount string (e.g. "2mg" ->
 * "mg", "%0.5" -> "%") so the calculator's input field can be labeled
 * correctly without a separate unit field on every dosing step. */
function extractDoseUnit(amount: string): string {
  const match = amount.match(/[a-zA-Z%µ]+$/)
  return match ? match[0] : ""
}

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
  const citationList = citations[peptide.slug]

  const halfLifeHours = peptide.molecular?.halfLifeHours
  const lastDoseStep = peptide.dosing?.[peptide.dosing.length - 1]

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

            {peptide.molecular && (
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-6 sm:grid-cols-4">
                {peptide.molecular.weight && (
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
                      Moleküler Ağırlık
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground/90">
                      {peptide.molecular.weight}
                    </p>
                  </div>
                )}
                {peptide.molecular.halfLife && (
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
                      Yarı Ömür
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground/90">
                      {peptide.molecular.halfLife}
                    </p>
                  </div>
                )}
                {peptide.molecular.chain && (
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
                      Zincir
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground/90">
                      {peptide.molecular.chain}
                    </p>
                  </div>
                )}
                {peptide.molecular.sequence && (
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
                      Dizi
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground/90">
                      {peptide.molecular.sequence}
                    </p>
                  </div>
                )}
              </div>
            )}

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
                  raporlanmıştır, genel kanıt kademesinden bağımsız olarak.
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

            {peptide.dosing && peptide.dosing.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Dozaj Protokolü
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  {tierDosingDisclaimer[peptide.tier]}
                </p>
                {peptide.dosingNote && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {peptide.dosingNote}
                  </p>
                )}
                <div className="mt-6">
                  <DoseLadderChart steps={peptide.dosing} />
                </div>
              </div>
            )}

            {peptide.reconstitutionSteps && peptide.reconstitutionSteps.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Hazırlama Adımları
                </h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {peptide.reconstitutionSteps.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="font-mono text-xs text-gold/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {peptide.secondaryDosing && peptide.secondaryDosing.steps.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Dozaj Protokolü — {peptide.secondaryDosing.routeLabel}
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  {tierDosingDisclaimer[peptide.tier]}
                </p>
                {peptide.secondaryDosing.note && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {peptide.secondaryDosing.note}
                  </p>
                )}
                <div className="mt-6">
                  <DoseLadderChart steps={peptide.secondaryDosing.steps} />
                </div>
              </div>
            )}

            {halfLifeHours && lastDoseStep && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Birikim Hesaplayıcı
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  {peptide.molecular?.halfLife
                    ? `Yarı ömür (${peptide.molecular.halfLife}) baz alınarak hesaplanan matematiksel bir model.`
                    : "Yarı ömür baz alınarak hesaplanan matematiksel bir model."}{" "}
                  Gerçek vücuttaki birikim; emilim hızı, bireysel metabolizma
                  ve enjeksiyon yoluna göre değişir — bu bir tıbbi tavsiye
                  değildir, yalnızca standart çoklu doz farmakokinetiğinin
                  görselleştirmesidir.
                </p>
                <div className="mt-6">
                  <AccumulationCalculator
                    halfLifeHours={halfLifeHours}
                    defaultDose={lastDoseStep.amountValue}
                    defaultDoseUnit={extractDoseUnit(lastDoseStep.amount)}
                    defaultIntervalHours={24}
                  />
                </div>
              </div>
            )}

            {peptide.expectedTimeline && peptide.expectedTimeline.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Beklenen Sonuçlar (Bildirilen Zaman Çizelgesi)
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  Kaynak literatür/topluluk raporlarına dayanan, bireysel yanıtın
                  büyük ölçüde değişebildiği bir zaman çizelgesidir — bir garanti
                  değildir.
                </p>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[380px] border-collapse text-sm">
                    <caption className="sr-only">
                      {peptide.name} beklenen sonuç zaman çizelgesi
                    </caption>
                    <tbody>
                      {peptide.expectedTimeline.map((point) => (
                        <tr key={point.period} className="border-b border-hairline last:border-b-0">
                          <th scope="row" className="py-3 pr-4 text-left font-mono text-xs uppercase tracking-eyebrow text-gold/80">
                            {point.period}
                          </th>
                          <td className="py-3 text-muted-foreground">{point.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {peptide.qualityIndicators && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Kalite Kontrol İşaretleri
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  Yalnızca fiziksel bir ürün olarak temin edilen bileşikler için
                  geçerlidir; klinik etkinliğin göstergesi değildir.
                </p>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-eyebrow text-tier-proven">
                      İyi İşaretler
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {peptide.qualityIndicators.good.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-eyebrow text-tier-preclinical">
                      Kötü İşaretler
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {peptide.qualityIndicators.bad.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {peptide.warnings && peptide.warnings.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Uyarılar ve Kontrendikasyonlar
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {peptide.warnings.map((warning) => (
                    <li
                      key={warning}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 flex-shrink-0 bg-tier-preclinical/70"
                      />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {peptide.sideEffects && peptide.sideEffects.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Yan Etkiler
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {peptide.sideEffects.map((effect) => (
                    <li
                      key={effect}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 flex-shrink-0 bg-gold/60"
                      />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {peptide.interactions && peptide.interactions.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  Bilinen Etkileşimler
                </h2>
                <div className="mt-4 flex flex-col gap-5">
                  {peptide.interactions.map((interaction) => {
                    const linked = getPeptide(
                      interaction.compound
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                    )
                    return (
                      <div key={interaction.compound}>
                        {linked ? (
                          <Link
                            href={`/peptidler/${linked.slug}`}
                            className="text-sm font-medium text-foreground/90 transition-colors hover:text-gold"
                          >
                            {interaction.compound}
                          </Link>
                        ) : (
                          <p className="text-sm font-medium text-foreground/90">
                            {interaction.compound}
                          </p>
                        )}
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {interaction.note}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {citationList && citationList.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-10">
                <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
                  {citationList.length > 1 ? "Kaynaklar" : "Kaynak"}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {citationList.map((citation) => (
                    <div
                      key={citation.pmid}
                      className="rounded-sm border border-hairline bg-surface p-6"
                    >
                      <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
                        {citation.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {citation.authors}, <em className="font-serif italic">{citation.journal}</em>, {citation.year}
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
                  ))}
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

            <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-10 sm:flex-row sm:flex-wrap sm:items-center">
              <WhatsappCta product={peptide.name} />
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
