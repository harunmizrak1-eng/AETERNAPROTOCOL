const STEPS = [
  {
    numeral: "I",
    title: "Değerlendirme",
    line: "Hedeflerinizi, geçmişinizi ve mevcut durumunuzu gizli bir görüşmeyle anlıyoruz.",
  },
  {
    numeral: "II",
    title: "Biyolojik Profil",
    line: "Kan değerleri ve biyobelirteçler üzerinden kişisel bir biyolojik harita çıkarıyoruz.",
  },
  {
    numeral: "III",
    title: "Optimizasyon Stratejisi",
    line: "Size özel, aşamalı ve ölçülebilir bir protokol tasarlıyoruz.",
  },
  {
    numeral: "IV",
    title: "Sürekli Takip",
    line: "Düzenli değerlendirmelerle protokolü zaman içinde ince ayarlıyoruz.",
  },
]

export function Process() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-gold">Süreç</p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <article
              key={step.numeral}
              className="group relative overflow-hidden rounded-lg border border-hairline shadow-sm bg-surface px-8 py-12"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] leading-none text-foreground/[0.04]"
              >
                {step.numeral}
              </span>

              <div className="relative">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-0 bg-gold transition-all duration-500 group-hover:w-12"
                />
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {step.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
