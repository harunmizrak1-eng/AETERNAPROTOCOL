import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC Tirze Türkiye | Tirzepatide Ürünleri ve Fiyatları",
  description: "Aktif ZPHC Tirze ürünlerini 30 mg hazır kalem ve 150 mg flakon seti formatlarında karşılaştırın; güncel fiyat ve doğrulama bilgilerini görün.",
  alternates: { canonical: "/zphc-tirze", languages: topicLanguageAlternates("tirzepatide") },
  openGraph: { title: "ZPHC Tirze Türkiye | Tirzepatide Ürünleri", description: "Aktif ZPHC Tirze formatları, fiyatlar ve doğrulama.", url: "/zphc-tirze" },
}

export default function ZphcTirzePage() {
  return <SeoProductLanding
    eyebrow="ZPHC Tirze Türkiye"
    title="ZPHC Tirze ürünlerini formuna göre karşılaştırın"
    intro="Aktif katalogdaki Tirze ürünleri hazır kalem ve flakon seti olarak farklı sunumlara ve toplam miktarlara sahiptir. Satıştan kaldırılan formatlar bu karşılaştırmaya dahil edilmez."
    slugs={["tirzepatide-zphc-150-mg-5-vials-x-30-mg", "tirzepatide-30mg-aq-pen-zphc"]}
    libraryHref="/peptidler/tirzepatide"
    libraryLabel="Tirzepatide bilgi kaydı"
    bullets={["Güncel fiyat", "Aktif katalog", "Üretici koduyla doğrulama"]}
    resources={[
      { href: "/peptidler/tirzepatide", eyebrow: "Bileşik kütüphanesi", title: "Tirzepatide bilgi kaydı", description: "Bileşiğin araştırma kaydını, kanıt seviyesini ve kaynaklarını inceleyin." },
      { href: "/journal/yag-kaybi-protokol-mantigi", eyebrow: "Journal", title: "Araştırma protokollerinde karar mantığı", description: "Ürün isminden bağımsız olarak araştırma tasarımı çerçevesini okuyun." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "ZPHC orijinalliği nasıl doğrulanır?", description: "Kutu üzerindeki kodu üreticinin doğrulama ekranında kontrol edin." },
    ]}
  />
}
