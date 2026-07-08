import { caseStudies } from "@/lib/case-studies"
import { CaseStudyCard } from "@/components/case-studies/case-study-card"

export function CaseStudies() {
  return (
    <section className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Vaka Analizleri
          </p>
        </div>

        <h2 className="mt-10 max-w-2xl text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
          Dört protokolün seyri.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Metabolik, doku onarımı, cinsel sağlık ve kognitif alanlardan birer
          örnek — her biri literatürle tutarlı büyüklükte, editorial olarak
          hazırlanmış vaka analizi.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  )
}
