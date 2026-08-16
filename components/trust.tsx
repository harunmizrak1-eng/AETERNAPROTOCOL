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
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="text-sm font-semibold text-gold">Güven</p>

          <h2 className="mt-10 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Sessizce kazanılmış bir itibar.
          </h2>

          <div className="mt-14 flex gap-16">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-5xl text-foreground sm:text-6xl">
                  {s.value}
                </p>
                <p className="mt-3 text-[0.7rem] tracking-normal text-muted-foreground font-medium">
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
              className="rounded-lg border border-hairline shadow-sm bg-surface p-8 transition-colors duration-500 hover:border-gold/60"
            >
              <blockquote className="text-xl italic leading-relaxed text-foreground/90">
                {`“${q.quote}”`}
              </blockquote>
              <figcaption className="mt-6 text-xs tracking-normal text-gold font-medium">
                {q.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
