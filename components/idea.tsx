const STATEMENTS = [
  {
    headline: "Sağlık rastlantı değildir. Tasarlanır.",
    line: "Her protokol, ölçülebilir biyolojik verilere dayanarak tek bir kişi için inşa edilir.",
  },
  {
    headline: "Mesele disiplin değil. Doğru sinyaller.",
    line: "Vücut doğru sinyalleri aldığında, zorladığınız değişim kendiliğinden başlar.",
  },
]

export function Idea() {
  return (
    <section className="px-6 py-28 sm:py-40">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-20 text-center sm:gap-28">
        {STATEMENTS.map((s) => (
          <div key={s.headline} className="flex flex-col items-center">
            <h2 className="text-balance font-serif text-4xl font-light leading-[1.15] tracking-wide text-foreground sm:text-5xl md:text-6xl">
              {s.headline}
            </h2>
            <div aria-hidden="true" className="mt-8 h-px w-12 bg-gold/50" />
            <p className="mt-8 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              {s.line}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
