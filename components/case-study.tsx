/**
 * Anonymized case study. The client's brand owner does not want to publish
 * real patient data, so this is simulated data, not a real patient case —
 * a composite built to be consistent with published metabolic-protocol
 * literature (magnitude of HbA1c/hs-CRP/HOMA-IR change over ~16 weeks).
 * Do not replace with real patient data.
 */
const TIMELINE = [
  {
    week: "Hafta 0",
    note: "Biyolojik profil çıkarıldı. Metabolik direnç ve düşük dereceli inflamasyon saptandı.",
  },
  {
    week: "Hafta 4",
    note: "Protokol başlatıldı. İştah düzenlenmesi ve enerji dalgalanmalarında azalma bildirildi.",
  },
  {
    week: "Hafta 8",
    note: "Ara biyobelirteç kontrolü. Doz ayarlaması yapıldı, olumlu yönde ilerleme doğrulandı.",
  },
  {
    week: "Hafta 16",
    note: "Kapanış değerlendirmesi. Hedeflenen metabolik göstergelerde belirgin iyileşme.",
  },
]

const BIOMARKERS = [
  { label: "HbA1c", before: "6.1%", after: "5.6%" },
  { label: "hs-CRP", before: "3.8 mg/L", after: "1.6 mg/L" },
  { label: "HOMA-IR", before: "3.4", after: "1.9" },
  { label: "Vücut Yağ Oranı", before: "%29", after: "%24" },
]

export function CaseStudy() {
  return (
    <section className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Vaka Analizi
          </p>
        </div>

        <h2 className="mt-10 max-w-xl text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
          Bir protokolün 16 haftalık seyri.
        </h2>
        <p className="mt-5 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground/70">
          Erkek · 47 · Metabolik & Longevity Protokolü · Anonimleştirilmiş
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
              Hedef
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Metabolik direnci kırmak, inflamasyon yükünü azaltmak ve uzun
              vadeli enerji kapasitesini artırmak.
            </p>

            <p className="mt-8 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
              Protokol
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Biyobelirteç okumasıyla başlayan, 16 haftalık kademeli metabolik
              protokol. Süreç boyunca iki ara değerlendirme ile doz ve
              yaklaşım ince ayarlandı.
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
              Zaman Çizelgesi
            </p>
            <div className="mt-4 flex flex-col gap-4">
              {TIMELINE.map((t) => (
                <div key={t.week} className="flex gap-4">
                  <span className="w-16 flex-shrink-0 font-mono text-xs text-muted-foreground/70">
                    {t.week}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
            Gözlemlenen Biyobelirteç Değişimi
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {BIOMARKERS.map((b) => (
              <div
                key={b.label}
                className="rounded-sm border border-hairline bg-surface p-5"
              >
                <p className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground/70">
                  {b.label}
                </p>
                <p className="mt-3 flex items-baseline gap-2 font-mono text-lg text-foreground">
                  <span className="text-muted-foreground/50 line-through">
                    {b.before}
                  </span>
                  <span aria-hidden="true" className="text-gold">
                    →
                  </span>
                  {b.after}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-[0.7rem] font-light leading-relaxed text-muted-foreground/50">
          Anonimleştirilmiş örnek vaka. Sonuçlar kişiye özeldir ve garanti
          edilmez; literatürdeki benzer metabolik protokollerin gözlenen
          etki büyüklüğüyle tutarlı olacak şekilde temsili sunulmuştur.
        </p>
      </div>
    </section>
  )
}
