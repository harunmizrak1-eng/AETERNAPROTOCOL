import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { DealerForm } from "@/components/dealer-form"

export const metadata: Metadata = {
  title: "Bayilik Başvurusu",
  description:
    "ZPHC Türkiye bayilik ve yetkili alıcı başvurusu. Eczane, klinik, laboratuvar ve alt bayiler için tedarik koşulları.",
  alternates: { canonical: "/bayilik" },
  openGraph: {
    title: "Bayilik Başvurusu",
    description: "ZPHC Türkiye bayilik ve yetkili alıcı başvurusu.",
    url: "/bayilik",
  },
}

const CRITERIA = [
  {
    title: "Kurumsal kimlik",
    body: "Vergi numarası ve faaliyet belgesi olan bir işletme. Şahıs başvuruları değerlendirilmez.",
  },
  {
    title: "Uygun faaliyet alanı",
    body: "Eczane, klinik, araştırma laboratuvarı, spor hekimliği merkezi veya bu alanlara tedarik yapan bir dağıtıcı.",
  },
  {
    title: "Soğuk zincir kapasitesi",
    body: "2–8 °C saklama ve sevkiyat imkânı. Peptid ve somatropin ürünleri sıcaklık hassasiyeti yüksek ürünlerdir.",
  },
  {
    title: "Düzenli hacim",
    body: "Süreklilik gösteren sipariş hacmi. Tek seferlik alımlar bayilik kapsamına girmez.",
  },
]

export default function BayilikPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                İş Ortaklığı
              </p>
            </div>

            <h1 className="mt-10 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              Bayilik Başvurusu
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              ZPHC peptid ve insan büyüme hormonu hattının Türkiye
              distribütörüyüz. Kurumsal alıcılar ve alt bayiler için tedarik
              koşullarını, fiyat listesini ve stok görünürlüğünü başvuru
              sonrasında paylaşıyoruz.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
              Aradığımız Nitelikler
            </h2>

            <div className="mt-8 grid gap-px bg-hairline sm:grid-cols-2">
              {CRITERIA.map((c) => (
                <div key={c.title} className="bg-background p-8">
                  <h3 className="font-serif text-lg font-light tracking-wide text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-28 md:px-10 sm:pb-36">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
              Başvuru Formu
            </h2>
            <DealerForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
