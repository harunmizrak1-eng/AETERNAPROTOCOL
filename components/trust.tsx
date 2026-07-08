const STATS = [
  { value: "50+", label: "Profil" },
  { value: "10", label: "Yıl Deneyim" },
  { value: "6", label: "Protokol Kategorisi" },
]

const QUOTES = [
  {
    quote:
      "İlk kez biyolojimin nasıl çalıştığını anladım. On altı haftalık süreçte enerjim ve uyku düzenim belirgin şekilde değişti.",
    label: "Kadın · 39 · Metabolik Protokol",
  },
  {
    quote:
      "Yıllardır geçmeyen omuz problemim, on iki haftalık protokolle büyük ölçüde toparlandı.",
    label: "Erkek · 34 · Doku Onarımı Protokolü",
  },
  {
    quote:
      "Beklediğim şey bir takviye değildi. Bir sistemdi. Fark, birkaç ay içinde netleşti.",
    label: "Kadın · 53 · Longevity Protokolü",
  },
]

export function Trust() {
  return (
    <section className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
            <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
              Güven
            </p>
          </div>

          <h2 className="mt-10 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
            Sessiz bir itibar üzerine kurulu.
          </h2>

          <div className="mt-14 flex gap-16">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-5xl font-light text-foreground sm:text-6xl">
                  {s.value}
                </p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {QUOTES.map((q) => (
            <figure
              key={q.label}
              className="rounded-sm border border-hairline bg-surface p-8 transition-colors duration-500 hover:border-gold/60"
            >
              <blockquote className="font-serif text-xl font-light italic leading-relaxed text-foreground/90">
                {`“${q.quote}”`}
              </blockquote>
              <figcaption className="mt-6 text-[0.65rem] uppercase tracking-eyebrow text-gold">
                {q.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
