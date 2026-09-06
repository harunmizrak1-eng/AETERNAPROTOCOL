import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { instagramHandle, instagramUrl } from "@/lib/contact"

export const metadata: Metadata = {
  title: "Resmî Kanallar ve İçerik Kaynağı",
  description: "ZPHC Türkiye'nin resmî alan adı, sosyal medya hesabı, doğrulama bağlantısı ve içerik sahipliği kaydı.",
  alternates: { canonical: "/orijin" },
}

const originRows = [
  { label: "Ürün doğrulama", href: "https://validation.zphc.com", text: "validation.zphc.com", external: true },
  { label: "Makine kaydı", href: "/.well-known/zphctr-origin", text: "/.well-known/zphctr-origin" },
  { label: "İçerik parmak izi", href: "/zphctr-content-manifest.json", text: "SHA-256 kanıt manifesti" },
]

export default function OriginPage() {
  return <><Nav /><main id="main-content" className="bg-surface px-6 py-12 md:px-10 md:py-20">
    <article className="mx-auto max-w-3xl rounded-2xl border border-hairline bg-background p-6 shadow-[0_18px_60px_rgba(0,49,76,0.07)] sm:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Alan adı ve yayıncı kaydı</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">ZPHC Türkiye resmî kanalları</h1>
      <p className="mt-5 leading-7 text-muted-foreground">Türkiye için kullandığımız resmî alan adı <strong className="text-foreground">zphctr.com</strong>, resmî Instagram hesabımız <a href={instagramUrl} className="font-semibold text-gold">{instagramHandle}</a> adresidir. Benzer alan adları ve kopyalanmış içerikler bize ait değildir.</p>
      <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
        {originRows.map((row) => <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr]"><dt className="font-bold">{row.label}</dt><dd><a href={row.href} target={row.external ? "_blank" : undefined} rel={row.external ? "noopener noreferrer" : undefined} className="break-all text-gold">{row.text}</a></dd></div>)}
        <div className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr]"><dt className="font-bold">İçerik geçmişi</dt><dd className="text-muted-foreground">Yayın tarihleri ve değişiklik geçmişi Git kayıtlarıyla saklanır.</dd></div>
      </dl>
      <p className="mt-8 text-sm leading-6 text-muted-foreground">Bir kopya site görürseniz ekran görüntüsü, tam URL, tarih ve arama sonucunu kaydedin. Bu kayıtlar barındırma şirketi, alan adı kayıt kuruluşu ve arama motoru şikâyetlerinde kaynak kanıtı olarak kullanılır.</p>
    </article>
  </main><Footer /></>
}
