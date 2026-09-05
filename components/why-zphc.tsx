import Link from "next/link"
import { peptides } from "@/lib/peptides"
import { products } from "@/lib/catalog"

const PILLARS = [
  {
    title: "ZPHC Türkiye Resmi Distribütörü",
    line: "Zhengzhou Pharmaceutical'ın peptid ve büyüme hormonu ürünlerini Türkiye'ye biz getiriyoruz. Siparişiniz doğrudan bizim depomuzdan çıkıyor. Arada başka bir satıcı yok.",
    link: { href: "/urunler", label: "Ürün kataloğu" },
  },
  {
    title: "Orijinalliği kendiniz doğrulayın",
    line: "Her kutuda gümüş bir bant var. Kazıyınca altından o ürüne özel bir kod çıkıyor. Kodu validation.zphc.com adresine girdiğinizde cevabı doğrudan üreticiden alıyorsunuz. Yani bize güvenmek zorunda değilsiniz, kendiniz bakıyorsunuz.",
    link: { href: "/dogrulama", label: "Nasıl doğrulanır" },
  },
  {
    title: "Her ürünün bilimsel arka planı var",
    line: `Sattığımız ${peptides.length} bileşiğin her biri için ne işe yaradığını, kanıt seviyesini ve varsa yayımlanmış çalışmaları yazdık. Üreticinin kendi iddialarını da ayrı bir başlıkta veriyoruz, karıştırmıyoruz.`,
    link: { href: "/metodoloji", label: "Nasıl değerlendiriyoruz" },
  },
]

export function WhyZphc() {
  return (
    <section className="border-b border-hairline px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
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
              <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2.5 flex-1 text-base leading-relaxed text-muted-foreground">
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
