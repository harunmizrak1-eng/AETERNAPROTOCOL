import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC GHK-Cu Türkiye | 60 mg ve 200 mg",
  description: "ZPHC GHK-Cu 60 mg ve 200 mg ürünlerini ve GHK-Cu içeren Glow Pro karışımını form ve toplam içeriğe göre karşılaştırın; fiyat bilgisini doğrudan sorun.",
  alternates: { canonical: "/zphc-ghk-cu", languages: topicLanguageAlternates("ghkcu") },
  openGraph: { title: "ZPHC GHK-Cu Türkiye | Ürün Seçenekleri", description: "ZPHC GHK-Cu 60 mg, 200 mg ve Glow Pro seçenekleri.", url: "/zphc-ghk-cu" },
}

export default function ZphcGhkCuPage() {
  return <SeoProductLanding
    eyebrow="ZPHC GHK-Cu Türkiye"
    title="ZPHC GHK-Cu ürünlerini karşılaştırın"
    intro="Tek bileşenli GHK-Cu ürünleri 60 mg ve 200 mg toplam içerikle sunulur; Glow Pro ise farklı bileşenleri bir araya getiren ayrı bir karışımdır. Formül ve kutu içeriği farklarını tek ekranda görün."
    canonicalPath="/zphc-ghk-cu"
    slugs={["ghk-cu-60mg-with-bacteriostatic-water-zphc", "ghk-cu-200mg-zphc", "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc"]}
    libraryHref="/peptidler/ghk-cu"
    libraryLabel="GHK-Cu bilgi kaydı"
    bullets={["Fiyat için iletişim", "Türkiye stoğu", "Üretici koduyla doğrulama"]}
    faq={[
      {
        q: "ZPHC GHK-Cu fiyatı ne kadar?",
        a: "Sitede fiyat listelemiyoruz; güncel fiyat ve stok bilgisini WhatsApp hattımızdan teyit edebilirsiniz. Ürünün adını seçtiğinizde mesaj otomatik hazırlanır.",
      },
      {
        q: "60 mg kit ile 200 mg flakon arasındaki fark nedir?",
        a: "60 mg kit, sulandırma için bakteriyostatik su flakonunu da içerir. 200 mg ise tek bir flakondur, su ayrıca temin edilir. İçerik aynı bileşiktir, fark yalnızca kutu içeriği ve toplam miktardır.",
      },
      {
        q: "Glow Pro Mix ile tek bileşenli GHK-Cu farkı ne?",
        a: "Tek bileşenli üründe yalnızca GHK-Cu vardır. Glow Pro Mix ise aynı flakonda BPC-157 ve TB-500'ü de barındıran ayrı bir karışımdır, birbirinin yerine geçmez.",
      },
      {
        q: "Elimdeki kutunun orijinal olduğunu nasıl anlarım?",
        a: "Kutunun arkasındaki gümüş bandı kazıyıp çıkan kodu validation.zphc.com adresine girin. Sorgu doğrudan üreticinin sisteminde yapılır, sonucu biz üretmeyiz.",
      },
      {
        q: "Kargo ve stok bilgisini nasıl öğrenirim?",
        a: "Stok durumu ürün kartında görünür. Sipariş ve fiyat bilgisi için WhatsApp'tan yazabilirsiniz, aynı gün kargoya veriyoruz.",
      },
    ]}
    resources={[
      { href: "/peptidler/ghk-cu", eyebrow: "Bileşik kütüphanesi", title: "GHK-Cu bilgi kaydı", description: "Bileşiğin araştırma çerçevesini, kanıt seviyesini ve kaynaklarını inceleyin." },
      { href: "/journal/cilt-icin-icten-yaklasim", eyebrow: "Journal", title: "Cilt araştırmalarında içten yaklaşım", description: "Cilt ve yaşlanma araştırmalarındaki temel kavramları sade biçimde okuyun." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "ZPHC orijinalliği nasıl doğrulanır?", description: "Kutu kodunun üretici ekranında nasıl kontrol edildiğini görün." },
    ]}
  />
}
