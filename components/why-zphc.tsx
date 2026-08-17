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
    title: "Aracısız tedarik",
    line: "ZPHC'nin peptid ve büyüme hormonu ürünleri için Türkiye distribütörüyüz. Ürünler soğuk zincire uygun şekilde doğrudan bizden çıkıyor, arada başka bir satıcı yok.",
    link: { href: "/urunler", label: "Ürün kataloğu" },
  },
]

export function WhyZphc() {
  return (
    <section className="border-b border-hairline px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Neden ZPHC Türkiye
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-px bg-hairline sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="flex flex-col bg-background p-6">
              <span
                aria-hidden="true"
                className="font-mono text-xs text-muted-foreground"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.line}
              </p>
              {p.link && (
                <Link
                  href={p.link.href}
                  className="mt-4 text-sm font-medium text-gold transition-opacity hover:opacity-70"
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
