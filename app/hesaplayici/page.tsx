import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { DoseCalculator } from "@/components/dose-calculator"

export const metadata: Metadata = {
  title: "Peptit Doz ve Sulandırma Hesaplayıcı",
  description:
    "Flakon içeriği ve bakteriyostatik su miktarına göre şırıngada çekilecek üniteyi, konsantrasyonu ve flakon başına doz sayısını hesaplayın.",
  alternates: { canonical: "/hesaplayici" },
  openGraph: {
    title: "Peptit Doz ve Sulandırma Hesaplayıcı",
    description:
      "Şırıngada çekilecek üniteyi ve konsantrasyonu hesaplayın.",
    url: "/hesaplayici",
  },
}

export default function HesaplayiciPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-4 pb-16 pt-2 sm:px-6 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Peptit doz hesaplayıcı
            </h1>
            <div className="mt-6">
              <DoseCalculator />
            </div>

            {/* Hesaplayıcı "kaç ünite" sorusunu çözüyor ama "hangi su, nasıl
                sulandırılır" sorusu açıkta kalıyordu. */}
            <Link
              href="/sulandirma-rehberi"
              className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-gold/40"
            >
              <span className="min-w-0">
                <span className="block text-base font-bold text-foreground">
                  Flakonu ilk kez mi sulandıracaksınız?
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  Hangi su kullanılır, ne kadar eklenir, hangi sırayla yapılır.
                  Adım adım yöntem rehberi.
                </span>
              </span>
              <span className="shrink-0 text-sm font-bold text-gold">Rehberi aç →</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
