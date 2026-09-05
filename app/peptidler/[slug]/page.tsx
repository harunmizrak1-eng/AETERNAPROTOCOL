import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { RelatedProducts } from "@/components/related-products"
import { DoseLadderChart } from "@/components/dose-ladder-chart"
import { AccumulationCalculator } from "@/components/accumulation-calculator"
import {
  peptides,
  getPeptide,
  tierLabel,
  tierColorVar,
  tierDots,
  tierDosingDisclaimer,
} from "@/lib/peptides"
import { getArticle } from "@/lib/articles"
import { citations } from "@/lib/citations"

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

const searchTitleOverrides: Record<string, string> = {
  ipamorelin: "ZPHC Ipamorelin Türkiye | Peptid Bilgi Kaydı",
  tesamorelin: "ZPHC Tesamorelin Türkiye | Araştırma ve Kaynaklar",
  semaglutide: "ZPHC Semaglutide Türkiye | Peptid Bilgi Kaydı",
  hgh: "ZPHC HGH Türkiye | Büyüme Hormonu Bilgi Kaydı",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) return { title: "Peptid kütüphanesi" }
  const title = searchTitleOverrides[peptide.slug] ?? peptide.name
  return {
    title,
    description: `${peptide.name} için ZPHC Türkiye bilgi kaydı: araştırma çerçevesi, kanıt seviyesi ve kaynaklar. ${peptide.short}`.slice(0, 300),
    alternates: {
      canonical: `/peptidler/${peptide.slug}`,
    },
    openGraph: {
      title,
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
  const citationList = citations[peptide.slug]

  const halfLifeHours = peptide.molecular?.halfLifeHours
  const lastDoseStep = peptide.dosing?.[peptide.dosing.length - 1]

  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background">
        <article className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/peptidler"
              className="text-xs tracking-normal text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              ← Peptid kütüphanesi
            </Link>

            <p className="mt-10 text-xs tracking-normal text-muted-foreground font-medium">
              {peptide.category}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
              {peptide.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-normal font-medium">
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
                    <p className="text-xs tracking-normal text-muted-foreground font-medium">
                      Moleküler ağırlık
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground/90">
                      {peptide.molecular.weight}
                    </p>
                  </div>
                )}
                {peptide.molecular.halfLife && (
                  <div>
                    <p className="text-xs tracking-normal text-muted-foreground font-medium">
                      Yarı ömür
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground/90">
                      {peptide.molecular.halfLife}
                    </p>
                  </div>
                )}
                {peptide.molecular.chain && (
                  <div>
                    <p className="text-xs tracking-normal text-muted-foreground font-medium">
                      Zincir
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground/90">
                      {peptide.molecular.chain}
                    </p>
                  </div>
                )}
                {peptide.molecular.sequence && (
                  <div className="col-span-2 sm:col-span-4">
                    <p className="text-xs tracking-normal text-muted-foreground font-medium">
                      Dizi
                    </p>
                    <p className="mt-1 break-all font-mono text-sm text-foreground/90">
                      {peptide.molecular.sequence}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-14 border-t border-hairline pt-10">
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                Mekanizma
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {peptide.mechanism}
              </p>
            </div>

            <div className="mt-10 border-t border-hairline pt-10">
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                Birincil sonuçlar
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Kanıt matrisi
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
                            <span className="tracking-normal font-medium">
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Dozaj protokolü
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Hazırlama adımları
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Dozaj protokolü, {peptide.secondaryDosing.routeLabel}
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Birikim hesaplayıcı
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  {peptide.molecular?.halfLife
                    ? `Yarı ömür (${peptide.molecular.halfLife}) baz alınarak hesaplanan matematiksel bir model.`
                    : "Yarı ömür baz alınarak hesaplanan matematiksel bir model."}{" "}
                  Gerçek vücuttaki birikim; emilim hızı, bireysel metabolizma
                  ve enjeksiyon yoluna göre değişir, bu bir tıbbi tavsiye
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Beklenen sonuçlar (bildirilen zaman çizelgesi)
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  Kaynak literatür/topluluk raporlarına dayanan, bireysel yanıtın
                  büyük ölçüde değişebildiği bir zaman çizelgesidir, bir garanti
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
                          <th scope="row" className="py-3 pr-4 text-left font-mono text-xs tracking-normal text-gold/80">
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Kalite kontrol işaretleri
                </h2>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                  Yalnızca fiziksel bir ürün olarak temin edilen bileşikler için
                  geçerlidir; klinik etkinliğin göstergesi değildir.
                </p>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-xs tracking-normal text-tier-proven font-medium">
                      İyi işaretler
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
                    <p className="text-xs tracking-normal text-tier-preclinical font-medium">
                      Kötü işaretler
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Uyarılar ve kontrendikasyonlar
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  Bilinen etkileşimler
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  {citationList.length > 1 ? "Kaynaklar" : "Kaynak"}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {citationList.map((citation) => (
                    <div
                      key={citation.pmid}
                      className="border border-hairline bg-surface p-6"
                    >
                      <p className="text-xs tracking-normal text-muted-foreground font-medium">
                        {citation.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {citation.authors}, <em className="italic">{citation.journal}</em>, {citation.year}
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
                <h2 className="text-foreground text-xl font-bold tracking-tight">
                  İlgili Journal yazısı
                </h2>
                <Link
                  href={`/journal/${relatedArticle.slug}`}
                  className="mt-4 inline-block text-lg italic text-foreground/90 transition-colors hover:text-gold"
                >
                  {relatedArticle.title} →
                </Link>
              </div>
            )}

            <RelatedProducts
              peptideSlug={peptide.slug}
              emptyNote="Bu bileşik için şu an katalogda ürün bulunmuyor."
            />

            <div className="mt-10 flex flex-wrap gap-4 border-t border-hairline pt-10">
              <WhatsappCta product={peptide.name} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
