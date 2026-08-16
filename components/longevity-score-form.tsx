"use client"

import { useState } from "react"
import { scoreDimensions, computeScore } from "@/lib/longevity-score"
import { useAssessment } from "@/components/assessment"

export function LongevityScoreForm() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const { open } = useAssessment()

  const allAnswered = scoreDimensions.every((d) => answers[d.id] !== undefined)
  const answeredCount = scoreDimensions.filter(
    (d) => answers[d.id] !== undefined,
  ).length
  const score = computeScore(answers)

  return (
    <div>
      <p className="text-xs tracking-normal text-muted-foreground font-medium">
        {answeredCount} / {scoreDimensions.length}
      </p>

      <div className="mt-6 flex flex-col gap-10">
        {scoreDimensions.map((d) => (
          <div key={d.id}>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {d.question}
            </h2>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {d.options.map((opt) => {
                const selected = answers[d.id] === opt.value
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setAnswers((a) => ({ ...a, [d.id]: opt.value }))
                    }}
                    aria-pressed={selected}
                    className={`rounded-sm border px-6 py-3 text-left text-sm leading-relaxed transition-colors duration-300 sm:text-center ${
                      selected
                        ? "border-gold bg-gold/10 text-foreground"
                        : "border-hairline text-foreground/80 hover:border-gold/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={!allAnswered}
        onClick={() => setSubmitted(true)}
        className="mt-14 rounded-sm border border-gold/60 px-10 py-4 text-xs font-medium font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
      >
        Skoru Hesapla
      </button>

      {submitted && (
        <div className="mt-16 border-t border-hairline pt-14">
          <p className="text-xs tracking-normal text-gold font-medium">
            Longevity Skorunuz
          </p>
          <p className="mt-4 font-mono text-7xl text-foreground sm:text-8xl">
            {score}
            <span className="text-2xl text-muted-foreground sm:text-3xl">
              {" "}
              / 100
            </span>
          </p>

          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Bu skor, altı yaşam tarzı boyutunun basit ve eşit ağırlıklı
            ortalamasıdır. Her boyut 0-100 arası puanlanır ve altısının
            aritmetik ortalaması alınır. Herhangi bir gizli algoritma veya
            klinik model kullanılmaz.
          </p>

          <p className="mt-6 max-w-lg text-balance text-lg italic leading-relaxed text-foreground/90">
            Bu bir tahmindir; tıbbi teşhis veya öngörü değildir.
          </p>

          <button
            type="button"
            onClick={() => open()}
            className="mt-10 rounded-sm border border-hairline px-8 py-3.5 text-xs font-semibold font-medium text-foreground/80 transition-colors duration-300 hover:border-gold/60 hover:bg-gold hover:text-primary-foreground"
          >
            Sonucu Bir Uzmanla Değerlendir
          </button>
        </div>
      )}
    </div>
  )
}
