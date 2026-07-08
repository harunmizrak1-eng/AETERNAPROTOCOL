import { tierLabel, tierColorVar, tierDots } from "@/lib/peptides"
import { caseStudyDisclaimer, type CaseStudy } from "@/lib/case-studies"
import { BiomarkerSparkline } from "@/components/case-studies/biomarker-sparkline"

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="flex flex-col rounded-sm border border-hairline bg-surface p-8">
      <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground/70">
        Anonim Profil · {study.title}
      </p>

      <h3 className="mt-3 font-serif text-2xl font-light tracking-wide text-foreground">
        {study.title}
      </h3>
      <p className="mt-1 text-[0.7rem] uppercase tracking-eyebrow text-gold/90">
        {study.focus}
      </p>

      <p className="mt-4 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground/70">
        {study.profileLine} · {study.duration}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {study.goal}
      </p>

      <p className="mt-3 font-mono text-xs text-muted-foreground/70">
        Doz: {study.dosage}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6rem] uppercase tracking-eyebrow">
        <span className={`font-mono ${tierColorVar[study.tier]}`} aria-hidden="true">
          {tierDots[study.tier]}
        </span>
        <span className={tierColorVar[study.tier]}>{tierLabel[study.tier]}</span>
        <span className="text-muted-foreground/60">· {study.evidenceNote}</span>
        <span className="text-muted-foreground/60">
          · {study.papersReviewed} makale incelendi
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[440px] border-collapse font-mono text-xs">
          <caption className="sr-only">
            {study.title} biyobelirteç değişim tablosu
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              <th
                scope="col"
                className="py-2 pr-4 text-left uppercase tracking-eyebrow text-muted-foreground/70"
              >
                Belirteç
              </th>
              <th
                scope="col"
                className="py-2 pr-4 text-left uppercase tracking-eyebrow text-muted-foreground/70"
              >
                Başlangıç
              </th>
              <th
                scope="col"
                className="py-2 pr-4 text-left uppercase tracking-eyebrow text-muted-foreground/70"
              >
                Sonuç
              </th>
              <th
                scope="col"
                className="py-2 text-left uppercase tracking-eyebrow text-muted-foreground/70"
              >
                Değişim
              </th>
            </tr>
          </thead>
          <tbody>
            {study.biomarkers.map((b) => (
              <tr key={b.label} className="border-b border-hairline last:border-b-0">
                <th scope="row" className="py-2 pr-4 text-left font-normal text-foreground">
                  {b.label}
                </th>
                <td className="py-2 pr-4 text-muted-foreground/80">{b.baseline}</td>
                <td className="py-2 pr-4 text-foreground">{b.final}</td>
                <td className="py-2 text-gold">
                  <div className="flex items-center gap-2">
                    <BiomarkerSparkline direction={b.direction} />
                    <span>{b.change}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[0.65rem] font-light leading-relaxed text-muted-foreground/50">
        {caseStudyDisclaimer}
      </p>
    </article>
  )
}
