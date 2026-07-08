import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/final-cta"
import {
  peptides,
  tierLabel,
  tierColorVar,
  tierBorderVar,
  tierDots,
} from "@/lib/peptides"

export const metadata: Metadata = {
  title: "Peptid Kütüphanesi",
  description:
    "Peptidler hakkında kısa, kanıt seviyesine göre sınıflandırılmış bilgi. Metabolik, doku onarımı, longevity ve kognitif bileşikler.",
  alternates: {
    canonical: "/peptidler",
  },
}

export default function PeptidlerPage() {
  return (
    <>
      <Nav />
      <main className="bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Kütüphane
              </p>
            </div>

            <h1 className="mt-10 max-w-3xl text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-6xl">
              Peptid Kütüphanesi
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Her bileşik, kanıt seviyesine göre sınıflandırılmıştır. Bu ayrım,
              markanın temel ilkesidir: kanıtlanmış olanı spekülatif olandan
              asla ayırmadan sunmayız.
            </p>

            {/* Evidence Score legend */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {(["proven", "theoretical", "preclinical"] as const).map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`font-mono text-xs ${tierColorVar[t]}`}
                  >
                    {tierDots[t]}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
                    {tierLabel[t]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Peptide grid */}
        <section className="px-6 pb-28 sm:pb-36 md:px-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {peptides.map((p) => (
              <article
                key={p.name}
                className={`group flex flex-col border bg-surface p-8 transition-colors duration-500 hover:border-gold/50 ${tierBorderVar[p.tier]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-2xl font-light tracking-wide text-foreground">
                    {p.name}
                  </h2>
                </div>

                <p className="mt-2 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground/70">
                  {p.category}
                </p>

                <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.short}
                </p>

                <div className="mt-8 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`font-mono text-xs ${tierColorVar[p.tier]}`}
                  >
                    {tierDots[p.tier]}
                  </span>
                  <span
                    className={`text-[0.65rem] uppercase tracking-eyebrow ${tierColorVar[p.tier]}`}
                  >
                    {tierLabel[p.tier]}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA back to consulting */}
        <section className="px-6 pb-28 text-center sm:pb-36">
          <p className="mx-auto max-w-lg text-pretty font-serif text-2xl font-light italic leading-relaxed text-foreground/90 sm:text-3xl">
            Hangi bileşiğin sizin için doğru olduğunu birlikte belirleriz.
          </p>
          <Link
            href="/#danismanlik"
            className="mt-10 inline-block rounded-sm border border-gold/60 px-10 py-4 text-xs uppercase tracking-eyebrow font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            Danışmanlığı İncele
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
