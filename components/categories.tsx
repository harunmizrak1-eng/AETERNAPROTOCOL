"use client"

import { categoryCards as CARDS } from "@/lib/categories"
import { useAssessment } from "@/components/assessment"

export function Categories() {
  const { open } = useAssessment()

  return (
    <section id="kategoriler" className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Odak Alanları
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col border border-hairline bg-surface p-8 transition-colors duration-500 hover:border-gold/60 sm:p-10"
            >
              <h3 className="font-serif text-2xl font-light tracking-wide text-foreground sm:text-[1.7rem]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {card.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                {card.peptides.map((p) => (
                  <span
                    key={p}
                    className="text-[0.75rem] uppercase tracking-[0.15em] text-muted-foreground/75 transition-colors duration-500 group-hover:text-foreground/90"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <button
                  type="button"
                  onClick={() => open({ goal: card.title })}
                  className="inline-block border border-hairline px-7 py-3 text-[0.65rem] uppercase tracking-eyebrow font-medium text-foreground/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:border-gold/60 hover:bg-gold hover:text-primary-foreground"
                >
                  Protokol Talep Et
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
