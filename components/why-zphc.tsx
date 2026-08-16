import Link from "next/link"
import { peptides } from "@/lib/peptides"
import { products } from "@/lib/products"

const PILLARS = [
  {
    title: "Orijinalliği kendiniz doğrulayın",
    line: "ZPHC her kutuya, gümüş kaplamanın altına benzersiz bir kod basıyor. Kodu üreticinin kendi sitesinde (validation.zphc.com) sorguluyorsunuz; sonucu biz üretmiyoruz. Sahte ürünü ayıran tek şey bu.",
    link: { href: "/dogrulama", label: "Nasıl doğrulanır" },
  },
  {
    title: "Her ürünün bilimsel kaydı var",
    line: `Her ürün, ${peptides.length} bileşiklik kütüphanemizdeki kaydına bağlı. Üreticinin pazarlama metnini kendi kanıt değerlendirmemizden ayrı gösteriyoruz.`,
    link: { href: "/metodoloji", label: "Metodolojimizi inceleyin" },
  },
  {
    title: "Aradan kimse geçmiyor",
    line: "ZPHC'nin peptid ve büyüme hormonu ürünleri için Türkiye distribütörüyüz. Ürünler soğuk zincire uygun şekilde, doğrudan bizden çıkıyor.",
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
          Üç noktada net olalım.
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
