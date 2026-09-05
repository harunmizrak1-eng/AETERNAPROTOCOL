import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC GHK-Cu Türkiye | 60 mg ve 200 mg Fiyatları",
  description: "ZPHC GHK-Cu 60 mg ve 200 mg ürünlerini ve GHK-Cu içeren Glow Pro karışımını fiyat, form ve toplam içeriğe göre karşılaştırın.",
  alternates: { canonical: "/zphc-ghk-cu", languages: topicLanguageAlternates("ghkcu") },
  openGraph: { title: "ZPHC GHK-Cu Türkiye | Ürünler ve Fiyatlar", description: "ZPHC GHK-Cu 60 mg, 200 mg ve Glow Pro seçenekleri.", url: "/zphc-ghk-cu" },
}

export default function ZphcGhkCuPage() {
  return <SeoProductLanding
    eyebrow="ZPHC GHK-Cu Türkiye"
    title="ZPHC GHK-Cu ürünlerini karşılaştırın"
    intro="Tek bileşenli GHK-Cu ürünleri 60 mg ve 200 mg toplam içerikle sunulur; Glow Pro ise farklı bileşenleri bir araya getiren ayrı bir karışımdır. Formül ve kutu içeriği farklarını tek ekranda görün."
    slugs={["ghk-cu-60mg-with-bacteriostatic-water-zphc", "ghk-cu-200mg-zphc", "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc"]}
    libraryHref="/peptidler/ghk-cu"
    libraryLabel="GHK-Cu bilgi kaydı"
    bullets={["Güncel fiyat", "Türkiye stoğu", "Üretici koduyla doğrulama"]}
    resources={[
      { href: "/peptidler/ghk-cu", eyebrow: "Bileşik kütüphanesi", title: "GHK-Cu bilgi kaydı", description: "Bileşiğin araştırma çerçevesini, kanıt seviyesini ve kaynaklarını inceleyin." },
      { href: "/journal/cilt-icin-icten-yaklasim", eyebrow: "Journal", title: "Cilt araştırmalarında içten yaklaşım", description: "Cilt ve yaşlanma araştırmalarındaki temel kavramları sade biçimde okuyun." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "ZPHC orijinalliği nasıl doğrulanır?", description: "Kutu kodunun üretici ekranında nasıl kontrol edildiğini görün." },
    ]}
  />
}
