import type { Metadata } from "next"
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
        <section className="border-b border-hairline bg-[linear-gradient(135deg,var(--surface),var(--background))] px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">ZPHC Bilgi Merkezi</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
              Ürünü seçmeden önce doğru bilgiyi okuyun.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              ZPHC doğrulama, ürün formatları, araştırma bileşikleri ve saklama koşulları için sade, kaynaklı rehberler. Her yazı ilgili ürün veya kütüphane kaydına bağlanır.
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full border border-gold/25 bg-white px-3 py-2">Kaynaklı içerik</span>
              <span className="rounded-full border border-gold/25 bg-white px-3 py-2">Ürün doğrulama rehberleri</span>
              <span className="rounded-full border border-gold/25 bg-white px-3 py-2">Reklamdan ayrı editoryal alan</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <JournalList articles={articles} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
