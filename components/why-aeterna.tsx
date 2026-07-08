import { peptides } from "@/lib/peptides"

const PILLARS = [
  {
    title: "Kanıta Dayalı",
    line: `Her protokol, kanıt seviyesine göre sınıflandırılmış ${peptides.length}+ bileşiğin literatür taramasına dayanır. Klinik, mekanistik ve preklinik ayrımı hiçbir zaman bulanıklaştırılmaz.`,
  },
  {
    title: "Kişiye Özel",
    line: "Standart protokol yok. Ön değerlendirme sürecinden çıkan biyolojik profile ve hedefe göre, her danışan için ayrı bir yol haritası kurulur.",
  },
  {
    title: "Seçici ve Gizli",
    line: "Her başvuru değerlendirilir. Kabul edilen profiller için tam gizlilik, birebir takip ve öncelikli erişim esastır.",
  },
]

export function WhyAeterna() {
  return (
    <section className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Neden ÆTERNA
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-sm border border-hairline bg-surface p-8"
            >
              <h2 className="font-serif text-2xl font-light tracking-wide text-foreground">
                {p.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
