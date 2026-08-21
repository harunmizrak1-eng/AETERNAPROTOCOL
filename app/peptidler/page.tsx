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

        {/* Buradaki bölüm eski danışmanlık dönemine aitti: "Hangi bileşiğin
            sizin için doğru olduğunu birlikte belirleriz" diyip artık var
            olmayan /#danismanlik bağlantısına gidiyordu. Site danışmanlık
            vermediğini açıkça yazarken bu doğrudan çelişkiydi ve bağlantı
            da kırıktı. Yerine kataloğa yönlendiren bir kapanış kondu. */}
        <section className="px-6 pb-28 text-center sm:pb-36">
          <p className="mx-auto max-w-xl text-pretty text-xl leading-relaxed text-foreground sm:text-2xl">
            Kütüphanedeki bileşiklerin satılan ürünlerini katalogda
            bulabilirsiniz.
          </p>
          <Link
            href="/urunler"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-gold/90"
          >
            Ürün kataloğu
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
