import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PeptideLibrary } from "@/components/peptide-library"
import { peptides, tierLabel, tierColorVar, tierDots } from "@/lib/peptides"

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
        <section className="border-b border-hairline bg-[linear-gradient(135deg,#ffffff_0%,#eef7fc_100%)] px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Peptid Kütüphanesi</p>
              <h1 className="mt-3 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                İsmi değil, kanıtı okuyun.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                {peptides.length} bileşiği ne amaçla araştırıldığına ve eldeki insan verisine göre ayırdık. Abartılı vaat yok; bildiğimizi ve henüz bilmediğimizi açıkça yazıyoruz.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
              {(["proven", "theoretical", "preclinical"] as const).map((t) => (
                <div key={t} className="bg-white p-5">
                  <span aria-hidden="true" className={`font-mono text-xs ${tierColorVar[t]}`}>{tierDots[t]}</span>
                  <h2 className={`mt-3 font-sans text-base font-bold ${tierColorVar[t]}`}>{tierLabel[t]}</h2>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{t === "proven" ? "Kontrollü insan çalışmaları var." : t === "theoretical" ? "Mekanizma biliniyor, insan verisi sınırlı." : "Veri çoğunlukla laboratuvar ve hayvan çalışmalarından."}</p>
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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/urunler" className="inline-flex rounded-full bg-gold px-8 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-gold/90">Ürün kataloğu</Link>
            <Link href="/journal" className="inline-flex rounded-full border border-hairline bg-white px-8 py-3 text-base font-bold text-foreground transition-colors hover:border-gold hover:text-gold">Rehberleri okuyun</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
