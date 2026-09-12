import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { DoseCalculator } from "@/components/dose-calculator"
import { products } from "@/lib/catalog"
import { getCalculatorProducts } from "@/lib/calculator-products"

export const metadata: Metadata = {
  title: "Peptid Doz ve Sulandırma Hesaplayıcı",
  description:
    "Flakon içeriği ve bakteriyostatik su miktarına göre şırıngada çekilecek üniteyi, konsantrasyonu ve flakon başına doz sayısını hesaplayın.",
  alternates: { canonical: "/hesaplayici" },
  openGraph: {
    title: "Peptid Doz ve Sulandırma Hesaplayıcı",
    description:
      "Şırıngada çekilecek üniteyi ve konsantrasyonu hesaplayın.",
    url: "/hesaplayici",
  },
}

export default function HesaplayiciPage() {
  const calculatorProducts = getCalculatorProducts(products)
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-4 pb-20 pt-3 sm:px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Peptid doz hesaplayıcı
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Aktif ZPHC ürününü seçin; kutu içeriği otomatik gelsin. Su ve size belirtilen miktarı girerek şırınga karşılığını hesaplayın.</p>
            <div className="mt-7">
              <DoseCalculator products={calculatorProducts} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
