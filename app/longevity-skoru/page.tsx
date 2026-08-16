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
      <main id="main-content" className="bg-background pt-28">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-gold">Longevity Skoru</p>

            <h1 className="mt-10 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Mevcut yörüngeniz nedir?
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Altı kısa soru. Şeffaf bir hesaplama. Bu araç sizi bir sayıya
              indirgemez; yalnızca nerede durduğunuza dair kaba bir referans
              noktası verir.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-2xl">
            <LongevityScoreForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
