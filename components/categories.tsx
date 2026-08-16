"use client"

import { categoryCards as CARDS } from "@/lib/categories"
import { useAssessment } from "@/components/assessment"

export function Categories() {
  const { open } = useAssessment()

  return (
    <section id="kategoriler" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-gold">Odak Alanları</p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col rounded-lg border border-hairline shadow-sm bg-surface p-8 transition-colors duration-500 hover:border-gold/60 sm:p-10"
            >
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {card.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                {card.peptides.map((p) => (
                  <span
                    key={p}
                    className="text-[0.75rem] tracking-[0.15em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground/90"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <button
                  type="button"
                  onClick={() => open({ goal: card.title })}
                  className="inline-block rounded-sm border border-hairline px-7 py-3 text-xs font-semibold font-medium text-foreground/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:border-gold/60 hover:bg-gold hover:text-primary-foreground"
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
