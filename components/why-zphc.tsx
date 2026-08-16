import Link from "next/link"
import { peptides } from "@/lib/peptides"
import { products } from "@/lib/products"

const PILLARS = [
  {
    title: "Doğrulanabilir Orijinallik",
    line: "ZPHC her kutuya, gümüş kaplamanın altına benzersiz bir doğrulama kodu basar. Sorgulama üreticinin resmi sistemi validation.zphc.com üzerinde yapılır; sonucu biz üretmiyoruz, yalnızca yönlendiriyoruz. Sahte ürünü ayıran tek şey bu koddur.",
    link: { href: "/dogrulama", label: "Nasıl doğrulanır" },
  },
  {
    title: "Literatüre Bağlı Katalog",
    line: `${products.length} ürünün her biri, kanıt seviyesine göre sınıflandırılmış ${peptides.length} bileşiklik kütüphaneye bağlıdır. Üreticinin pazarlama metnini kendi değerlendirmemizden ayrı gösteriyoruz.`,
    link: { href: "/metodoloji", label: "Metodolojimizi inceleyin" },
  },
  {
    title: "Doğrudan Tedarik",
    line: "Üreticinin peptid ve insan büyüme hormonu hattı için Türkiye distribütörüyüz. Soğuk zincir koşullarına uygun sevkiyat ve doğrudan tedarik.",
    link: { href: "/urunler", label: "Ürün kataloğu" },
  },
]

export function WhyZphc() {
  return (
    <section className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Neden ZPHC Türkiye
          </p>
        </div>

        <h2 className="mt-10 max-w-2xl text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
          Bu sistemi güvenilir kılan şey.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-sm border border-hairline bg-surface p-8"
            >
              <h3 className="font-serif text-2xl font-light tracking-wide text-foreground">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.line}
              </p>
              {p.link && (
                <Link
                  href={p.link.href}
                  className="mt-6 text-[0.65rem] uppercase tracking-eyebrow font-medium text-gold transition-opacity hover:opacity-70"
                >
                  {p.link.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
