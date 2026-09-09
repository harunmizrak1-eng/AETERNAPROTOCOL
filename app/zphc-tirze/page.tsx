import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC Tirze Türkiye | Ürünler satıştan kaldırıldı",
  description: "ZPHC Tirze ürünleri Türkiye kataloğundan kaldırılmıştır.",
  alternates: { canonical: "/zphc-tirze", languages: topicLanguageAlternates("tirzepatide") },
  openGraph: { title: "ZPHC Tirze Türkiye | Ürünler satıştan kaldırıldı", description: "ZPHC Tirze ürünleri Türkiye kataloğundan kaldırılmıştır.", url: "/zphc-tirze" },
}

export default function ZphcTirzePage() {
  return <SeoProductLanding
    eyebrow="ZPHC Tirze Türkiye"
    title="Tirze ürünleri artık katalogda yer almıyor"
    intro="Tirze ürünleri Türkiye mağaza kataloğundan kaldırılmıştır. Aktif ürünleri görmek için güncel kataloğa dönün."
    slugs={[]}
    libraryHref="/peptidler/tirzepatide"
    libraryLabel="Tirzepatide bilgi kaydı"
    bullets={["Ürün grubu kaldırıldı", "Güncel katalog", "Üretici koduyla doğrulama"]}
    resources={[
      { href: "/peptidler/tirzepatide", eyebrow: "Bileşik kütüphanesi", title: "Tirzepatide bilgi kaydı", description: "Bileşiğin araştırma kaydını, kanıt seviyesini ve kaynaklarını inceleyin." },
      { href: "/journal/yag-kaybi-protokol-mantigi", eyebrow: "Journal", title: "Araştırma protokollerinde karar mantığı", description: "Ürün isminden bağımsız olarak araştırma tasarımı çerçevesini okuyun." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "ZPHC orijinalliği nasıl doğrulanır?", description: "Kutu üzerindeki kodu üreticinin doğrulama ekranında kontrol edin." },
    ]}
  />
}
