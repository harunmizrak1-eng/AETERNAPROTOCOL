"use client"

import { useAssessment } from "@/components/assessment"

export function FinalCta() {
  const { open } = useAssessment()

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="max-w-3xl text-balance font-serif text-4xl font-light leading-[1.15] tracking-wide text-foreground sm:text-6xl md:text-7xl">
        Daha iyi biyoloji tesadüf değildir.
      </h2>

      <div aria-hidden="true" className="mt-10 h-px w-16 bg-gold/60" />

      <button
        type="button"
        onClick={() => open()}
        className="mt-12 rounded-sm border border-gold/60 px-10 py-4 text-xs uppercase tracking-eyebrow font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
      >
        Özel Görüşme Talep Et
      </button>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-serif text-lg tracking-wordmark text-foreground">
            ÆTERNA
          </p>
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
            Özel Biyolojik Optimizasyon · Türkiye
          </p>
          <div className="flex gap-6">
            <a
              href="/gizlilik"
              className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground"
            >
              Gizlilik & KVKK
            </a>
            <a
              href="/#danismanlik"
              className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground"
            >
              İletişim
            </a>
          </div>
        </div>

        <div className="border-t border-hairline pt-8">
          <p className="mx-auto max-w-3xl text-center text-[0.7rem] leading-relaxed text-muted-foreground/60">
            Bu sitedeki içerik yalnızca bilgilendirme amaçlıdır ve tıbbi tavsiye
            yerine geçmez. Hiçbir ifade hastalık teşhis, tedavi veya önleme
            iddiası taşımaz. Herhangi bir protokole başlamadan önce bir hekime
            danışın. Paylaştığınız sağlık verileri gizli tutulur; işleme
            koşulları için Gizlilik &amp; KVKK metnini inceleyin.
          </p>
        </div>
      </div>
    </footer>
  )
}
