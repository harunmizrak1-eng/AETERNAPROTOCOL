import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { LongevityScoreForm } from "@/components/longevity-score-form"

export const metadata: Metadata = {
  title: "Longevity Skoru",
  description:
    "Altı yaşam tarzı boyutuna dayanan, şeffaf ve basit ağırlıklı ortalamayla hesaplanan longevity skoru. Tıbbi teşhis yerine geçmez.",
  alternates: {
    canonical: "/longevity-skoru",
  },
  openGraph: {
    title: "Longevity Skoru",
    description:
      "Altı yaşam tarzı boyutuna dayanan, şeffaf ve basit ağırlıklı ortalamayla hesaplanan longevity skoru. Tıbbi teşhis yerine geçmez.",
    url: "/longevity-skoru",
  },
}

export default function LongevityScorePage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Longevity Skoru
              </p>
            </div>

            <h1 className="mt-10 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              Mevcut yörüngeniz nedir?
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Altı kısa soru. Şeffaf bir hesaplama. Bu araç sizi bir sayıya
              indirgemez; yalnızca nerede durduğunuza dair kaba bir referans
              noktası verir.
            </p>
          </div>
        </section>

        <section className="px-6 pb-28 sm:pb-36 md:px-10">
          <div className="mx-auto max-w-2xl">
            <LongevityScoreForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
