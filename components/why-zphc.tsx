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
    <section className="border-t border-hairline px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Neden ZPHC Türkiye
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Bu sistemi güvenilir kılan üç şey.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-md border border-hairline bg-card p-6"
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.line}
              </p>
              {p.link && (
                <Link
                  href={p.link.href}
                  className="mt-5 text-sm font-medium text-gold transition-opacity hover:opacity-70"
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
