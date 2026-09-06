import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { JournalList } from "@/components/journal-list"
import { articles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "ZPHC Bilgi Merkezi",
  description:
    "ZPHC ürün doğrulama, peptid araştırmaları, ürün formatları ve laboratuvar saklama koşulları üzerine kaynaklı Türkçe rehberler.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "ZPHC Bilgi Merkezi",
    description:
      "ZPHC ürün doğrulama, peptid araştırmaları, ürün formatları ve laboratuvar saklama koşulları üzerine kaynaklı Türkçe rehberler.",
    url: "/journal",
  },
}

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background">
        <section className="border-b border-hairline bg-[linear-gradient(135deg,#eef7fc_0%,#ffffff_62%)] px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">ZPHC Bilgi Merkezi</p>
              <h1 className="mt-3 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                Aklınızdaki sorudan başlayın.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Kutudaki kod nasıl kontrol edilir, iki ürün arasındaki fark nedir, saklama neden önemlidir? Kısa cevapları öne, ayrıntıyı isteyen için kaynakları sona koyduk.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { n: "01", title: "Ürün gerçek mi?", text: "Kutu kodunu doğru yerde kontrol edin.", href: "/journal/zphc-orijinal-mi-nasil-anlarim" },
                { n: "02", title: "Reta nedir?", text: "Üçlü mekanizmayı sade biçimde okuyun.", href: "/journal/retatrutide-nedir" },
                { n: "03", title: "Nasıl saklanır?", text: "Toz, su ve soğuk zincir farkını görün.", href: "/journal/bakteriyostatik-su-nedir" },
              ].map((item) => (
                <Link key={item.n} href={item.href} className="group bg-white p-5 transition-colors hover:bg-[#f7fbfe]">
                  <span className="font-mono text-[0.68rem] text-gold/70">{item.n}</span>
                  <h2 className="mt-3 font-sans text-base font-bold tracking-tight text-foreground group-hover:text-gold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  <span className="mt-4 inline-block text-xs font-bold text-gold">Okuyun →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <JournalList articles={articles} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
