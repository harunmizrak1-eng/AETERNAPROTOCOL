import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC Peptid Karışımları Türkiye | Ürün ve Fiyat Karşılaştırma",
  description: "Glow Pro, Ultra Rehab, Double Burn, Super Slim, Wellness ve Mega Mass ZPHC karışımlarını bileşim, toplam içerik ve fiyat açısından karşılaştırın.",
  alternates: { canonical: "/zphc-peptid-karisimlari", languages: topicLanguageAlternates("blends") },
  openGraph: { title: "ZPHC Peptid Karışımları Türkiye", description: "Aktif ZPHC karışımlarını bileşim ve toplam içeriğe göre ayırın.", url: "/zphc-peptid-karisimlari" },
}

export default function ZphcBlendsPage() {
  return <SeoProductLanding
    eyebrow="ZPHC Karışımlar Türkiye"
    title="ZPHC hazır karışımlarını formülüne göre ayırın"
    intro="Karışımlar aynı ürünün farklı boyları değildir. Glow Pro, Ultra Rehab, Double Burn, Super Slim, Wellness ve Mega Mass farklı bileşim ve toplam içeriklerle listelenir."
    slugs={["double-burn-mix-5mg-5x5mg-zphc", "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc", "ultra-rehab-mix-50mg-5x10mg-zphc", "super-slim-mix-55mg-5x11mg-zphc", "wellness-mix-25mg-5x5mg-zphc", "mega-mass-mix-10mg-5x10mg-zphc"]}
    libraryHref="/peptidler"
    libraryLabel="Bileşik kütüphanesi"
    bullets={["Bileşim karşılaştırması", "Güncel fiyat", "Türkiye stoğu"]}
    resources={[
      { href: "/peptidler", eyebrow: "Bileşik kütüphanesi", title: "İçerikleri ayrı ayrı inceleyin", description: "Karışım adından önce her bileşiğin bağımsız bilgi kaydını ve kaynaklarını okuyun." },
      { href: "/journal/doku-onarimi-bpc157-tb500", eyebrow: "Journal", title: "BPC-157 ve TB-500 karşılaştırması", description: "Sık birlikte anılan iki bileşiğin araştırma ayrımını inceleyin." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "Her kutuyu üreticide doğrulayın", description: "Kutu kodunun ZPHC üretici sisteminde nasıl kontrol edildiğini görün." },
    ]}
  />
}
