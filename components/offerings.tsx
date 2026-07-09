"use client"

import Link from "next/link"
import { useAssessment } from "@/components/assessment"

const TIERS = [
  {
    tier: "I",
    name: "Değerlendirme",
    positioning: "Başlangıç",
    line: "Mevcut durumunuzu okuyoruz. Hedeflerinizi netleştirmek ve doğru yönü belirlemek için attığımız ilk adım.",
    includes: ["Gizli ön görüşme", "Hedef ve geçmiş analizi", "Yön önerisi"],
    featured: false,
  },
  {
    tier: "II",
    name: "Kişisel Protokol",
    positioning: "En çok tercih edilen",
    line: "Biyolojik verilerinize göre tasarlanan, aşamalı ve ölçülebilir eksiksiz bir protokol. Süreç boyunca birebir yönlendirme dahildir.",
    includes: [
      "Kan değeri & biyobelirteç okuması",
      "Kişiye özel protokol tasarımı",
      "Ürün erişimi ve tedarik yönlendirmesi",
      "Süreç boyunca birebir takip",
    ],
    featured: true,
  },
  {
    tier: "III",
    name: "Sürekli Optimizasyon",
    positioning: "Elit",
    line: "Uzun vadeli, sürekli geri bildirimle ilerleyen bir danışmanlık. Düzenli değerlendirme ve ince ayarlarla protokol zamanla sizinle birlikte gelişir.",
    includes: [
      "Sınırsız protokol revizyonu",
      "Periyodik biyobelirteç takibi",
      "Öncelikli erişim",
      "Uzun vadeli longevity stratejisi",
    ],
    featured: false,
  },
]

const PACKAGES = [
  {
    slug: "metabolik-reset",
    name: "Metabolik Reset",
    line: "Yağ kaybı ve iştah kontrolü için yapılandırılmış giriş protokolü.",
  },
  {
    slug: "recovery-stack",
    name: "Recovery Stack",
    line: "Doku onarımı ve toparlanma odaklı, sporcular için hazırlanmış kombinasyon.",
  },
  {
    slug: "longevity-foundation",
    name: "Longevity Foundation",
    line: "Hücresel sağlık ve sağlıklı yaşlanma için uzun vadeli temel protokol.",
  },
]

export function Offerings() {
  const { open } = useAssessment()

  return (
    <section id="danismanlik" className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Danışmanlık
          </p>
        </div>

        <h2 className="mt-10 max-w-2xl text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
          Her seviyede, aynı hassasiyet.
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          Seçici çalışıyoruz. Sizin için doğru başlangıç noktasını görüşmede
          birlikte belirliyoruz.
        </p>

        {/* Consulting tiers */}
        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={`group relative flex flex-col rounded-sm border bg-surface p-8 transition-colors duration-500 sm:p-10 ${
                t.featured
                  ? "border-gold/60"
                  : "border-hairline hover:border-gold/40"
              }`}
            >
              {t.featured && (
                <span className="absolute right-0 top-0 bg-gold px-3 py-1 text-[0.6rem] uppercase tracking-eyebrow text-primary-foreground">
                  {t.positioning}
                </span>
              )}

              <div className="flex items-baseline gap-4">
                <span className="font-serif text-3xl font-light text-gold">
                  {t.tier}
                </span>
                {!t.featured && (
                  <span className="text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
                    {t.positioning}
                  </span>
                )}
              </div>

              <h3 className="mt-6 font-serif text-2xl font-light tracking-wide text-foreground sm:text-[1.7rem]">
                {t.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t.line}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {t.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 flex-shrink-0 bg-gold/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <button
                  type="button"
                  onClick={() =>
                    open({ tier: t.tier as "I" | "II" | "III" })
                  }
                  className={`inline-block rounded-sm border px-7 py-3 text-[0.65rem] uppercase tracking-eyebrow font-medium transition-colors duration-300 hover:bg-gold hover:text-primary-foreground ${
                    t.featured
                      ? "border-gold/60 text-gold"
                      : "border-hairline text-foreground/80 hover:border-gold/60"
                  }`}
                >
                  Başvuru Yap
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Protocol packages */}
        <div className="mt-24 flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Hazır Protokoller
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PACKAGES.map((p) => (
            <Link
              key={p.name}
              href={`/protokoller/${p.slug}`}
              className="group flex flex-col rounded-sm border border-hairline bg-surface p-8 transition-colors duration-500 hover:border-gold/60"
            >
              <h3 className="font-serif text-xl font-light tracking-wide text-foreground">
                {p.name}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.line}
              </p>
              <span className="mt-8 text-[0.65rem] uppercase tracking-eyebrow font-medium text-gold transition-opacity duration-300 group-hover:opacity-70">
                Protokolü İncele →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
