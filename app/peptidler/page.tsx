import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PeptideLibrary } from "@/components/peptide-library"
import { tierLabel, tierColorVar, tierDots } from "@/lib/peptides"

export const metadata: Metadata = {
  title: "Peptid Kütüphanesi",
  description:
    "Peptidler hakkında kısa, kanıt seviyesine göre sınıflandırılmış bilgi. Metabolik, doku onarımı, longevity ve kognitif bileşikler.",
  alternates: {
    canonical: "/peptidler",
  },
  openGraph: {
    title: "Peptid Kütüphanesi",
    description:
      "Peptidler hakkında kısa, kanıt seviyesine göre sınıflandırılmış bilgi. Metabolik, doku onarımı, longevity ve kognitif bileşikler.",
    url: "/peptidler",
  },
}

export default function PeptidlerPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold text-gold">Kütüphane</p>

            <h1 className="mt-10 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
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
                  <span className="text-xs tracking-normal text-muted-foreground font-medium">
                    {tierLabel[t]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PeptideLibrary />

        {/* CTA back to consulting */}
        <section className="px-6 pb-28 text-center sm:pb-36">
          <p className="mx-auto max-w-lg text-pretty text-2xl italic leading-relaxed text-foreground/90 sm:text-3xl">
            Hangi bileşiğin sizin için doğru olduğunu birlikte belirleriz.
          </p>
          <Link
            href="/#danismanlik"
            className="mt-10 inline-block rounded-sm border border-gold/60 px-10 py-4 text-xs tracking-normal font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            Danışmanlığı İncele
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
