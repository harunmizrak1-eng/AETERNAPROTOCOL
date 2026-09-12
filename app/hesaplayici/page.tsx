import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { DoseCalculator } from "@/components/dose-calculator"

export const metadata: Metadata = {
  title: "Doz ve Sulandırma Hesaplayıcı",
  description:
    "Flakon içeriği ve sulandırma suyuna göre konsantrasyon, şırıngada çekilecek ünite ve flakon başına doz sayısını hesaplayın.",
  alternates: { canonical: "/hesaplayici" },
  openGraph: {
    title: "Doz ve Sulandırma Hesaplayıcı",
    description:
      "Flakon içeriği ve sulandırma suyuna göre konsantrasyon ve şırınga ünitesi hesaplayın.",
    url: "/hesaplayici",
  },
}

const STEPS = [
  {
    n: "01",
    title: "Flakon içeriğini girin",
    body: "Kutunun veya flakonun üzerinde yazan toplam peptid (mg) ya da HGH (IU) miktarını girin. Bir kitte birden fazla flakon varsa, tek bir flakonun içeriğini kullanın.",
  },
  {
    n: "02",
    title: "Sulandırma suyunu ekleyin",
    body: "Flakona eklediğiniz veya eklemeyi düşündüğünüz bakteriyostatik/steril su miktarını mL cinsinden girin. Hesaplayıcı bu ikisinden konsantrasyonu (mg/mL veya IU/mL) çıkarır.",
  },
  {
    n: "03",
    title: "Hedef dozu ve şırınga tipini seçin",
    body: "Çekmek istediğiniz dozu ve kullandığınız şırınga tipini (U-100 veya U-40 insülin şırıngası) seçin. Sonuç, şırınga üzerinde çekmeniz gereken ünite ve mL olarak anında görünür.",
  },
]

export default function HesaplayiciPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-10 md:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold text-gold">Araç</p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Doz ve sulandırma hesaplayıcı
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Flakon içeriğini ve eklediğiniz sulandırma suyunu girin;
              konsantrasyonu, hedef doz için şırıngada çekmeniz gereken
              üniteyi ve flakonun kaç doza yeteceğini hesaplayın. Kütüphanede
              dozlama basamağı bulunan bileşikleri seçerek o basamakları tek
              tıkla hedef doz alanına doldurabilirsiniz.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl border-t border-hairline pt-10">
            <DoseCalculator />
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-xl font-bold tracking-tight text-foreground">
              Nasıl çalışır
            </h2>
            <ol className="mt-8 space-y-10">
              {STEPS.map((step) => (
                <li key={step.n} className="flex gap-6">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.7rem] text-gold/70"
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-3xl border border-hairline bg-muted/30 p-8 sm:p-10">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Bu araç yalnızca matematiksel bir dönüşüm yapar, tıbbi tavsiye
              vermez. Flakon içeriğini ürün etiketinden doğrulayın; kişisel doz
              seçimi bir klinisyenle belirlenmelidir.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
