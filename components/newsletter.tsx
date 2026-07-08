"use client"

import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit() {
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Geçerli bir e-posta girin.")
      return
    }
    setError("")
    // TODO: wire to a real provider (Resend / Mailchimp / Supabase).
    // For now this only captures locally so the UI is complete.
    setSubmitted(true)
  }

  return (
    <section className="border-t border-hairline px-6 py-24 md:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Longevity Notları
          </p>
          <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
        </div>

        <h2 className="mt-8 text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
          İlk bilenlerden olun.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
          Yeni araştırmalar, bileşik notları ve protokol içgörüleri. Ara sıra,
          sadece değerli olduğunda.
        </p>

        {submitted ? (
          <p className="mt-10 font-serif text-xl font-light italic text-gold">
            Kaydınız alındı.
          </p>
        ) : (
          <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="flex-1 border border-hairline bg-surface px-5 py-3.5 text-sm font-light text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold/60"
            />
            <button
              onClick={handleSubmit}
              className="border border-gold/60 px-8 py-3.5 text-[0.65rem] uppercase tracking-eyebrow text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
            >
              Katıl
            </button>
          </div>
        )}
        {error && (
          <p className="mt-3 text-xs font-light text-[#c2614f]">{error}</p>
        )}
      </div>
    </section>
  )
}
