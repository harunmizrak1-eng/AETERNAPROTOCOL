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
