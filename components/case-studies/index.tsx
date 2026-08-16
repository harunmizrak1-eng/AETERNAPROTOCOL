import { caseStudies } from "@/lib/case-studies"
import { CaseStudyCard } from "@/components/case-studies/case-study-card"

export function CaseStudies() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-gold">Vaka Analizleri</p>

        <h2 className="mt-10 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Dört protokolün seyri.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Metabolik, doku onarımı, cinsel sağlık ve kognitif alanlardan birer
          örnek. Her biri, öğretici amaçla hazırlanmış ve literatürdeki
          gözlenen etki büyüklükleriyle tutarlı kurgusal bir vakadır.
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
