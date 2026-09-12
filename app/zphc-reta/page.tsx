import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC Reta Türkiye | Retatrutide Ürünleri",
  description: "ZPHC Reta ürünlerini 20 mg, 40 mg, 60 mg, 120 mg ve 30 mg hazır kalem seçenekleriyle karşılaştırın. Türkiye stoğunu görün; fiyat ve stok bilgisini doğrudan sorun.",
  alternates: { canonical: "/zphc-reta", languages: topicLanguageAlternates("retatrutide") },
  openGraph: {
    title: "ZPHC Reta Türkiye | Retatrutide Ürünleri",
    description: "ZPHC Reta ürünleri, stok bilgisi, ürün formatları ve üretici koduyla doğrulama.",
    url: "/zphc-reta",
  },
}

const RETA_PRODUCTS = [
  "retatrutide-20mg-5x4mg-zphc",
  "retatrutide-40mg-5x8mg-zphc",
  "retatrutide-60mg-5x12mg-zphc",
  "reta-zphc-120-mg-5-vials-x-24-mg",
  "retatrutide-30mg-aq-pen-zphc",
  "reta-60mg-dual-cartridge-sterile-water-zphc",
]

export default function ZphcRetaPage() {
  return (
    <SeoProductLanding
      eyebrow="ZPHC Reta Türkiye"
      title="ZPHC Reta ürünleri arasındaki farkı görün"
      intro="Reta adıyla listelenen ZPHC retatrutide ürünleri; toplam miktar, flakon seti, hazır kalem ve çift hazneli kartuş seçenekleriyle birbirinden ayrılır. Bu sayfa mevcut ürünleri tek yerde karşılaştırmanız için hazırlanmıştır."
      canonicalPath="/zphc-reta"
      slugs={RETA_PRODUCTS}
      libraryHref="/peptidler/retatrutide"
      libraryLabel="Retatrutide bilgi kaydı"
      bullets={["Türkiye stoğu", "Üretici doğrulama kodu", "Ücretsiz kargo"]}
      faq={[
        {
          q: "Reta ile retatrutide aynı şey mi?",
          a: "Evet. Reta, kutunun üzerindeki kısa isim; retatrutide ise bileşiğin asıl adı. İki adı da arama motorunda görebilirsiniz, ikisi de aynı ürünü işaret eder.",
        },
        {
          q: "20 mg, 40 mg, 60 mg ve 120 mg arasındaki fark nedir?",
          a: "Fark yalnızca kutudaki toplam miktar ve flakon sayısıdır; içerik aynı bileşiktir. Hangi toplam miktarın size uygun olduğuna dair bir öneri vermiyoruz, bu seçim kullanım sıklığınıza bağlıdır.",
        },
        {
          q: "Flakon seti mi, hazır kalem mi, çift hazneli kartuş mu almalıyım?",
          a: "Flakon seti liyofilize haldedir ve kullanmadan önce sulandırma gerektirir. Hazır kalem ve çift hazneli kartuş ise önceden karıştırılmış gelir, ek işlem istemez. Tercih tamamen kullanım kolaylığı meselesidir.",
        },
        {
          q: "Elimdeki kutunun orijinal olduğunu nasıl anlarım?",
          a: "Kutunun arkasındaki gümüş bandı kazıyıp çıkan kodu validation.zphc.com adresine girin. Sorgu doğrudan üreticinin sisteminde yapılır, sonucu biz üretmeyiz.",
        },
        {
          q: "Stokta olmayan bir toplam miktar ne zaman gelir?",
          a: "Stok durumu ürün kartında görünür. Aradığınız toplam miktar o an listede yoksa WhatsApp'tan sorabilirsiniz, yeni parti geldiğinde ilk size haber veririz.",
        },
      ]}
      resources={[
        {
          href: "/peptidler/retatrutide",
          eyebrow: "Bileşik kütüphanesi",
          title: "Retatrutide bilgi kaydı",
          description: "Bileşiğin mekanizmasını, kanıt seviyesini ve kaynaklarını tek kayıtta inceleyin.",
        },
        {
          href: "/journal/retatrutide-nedir",
          eyebrow: "Journal",
          title: "Retatrutide neden farklı bir nesil?",
          description: "Üçlü agonist yaklaşımını ve mevcut araştırma çerçevesini sade biçimde okuyun.",
        },
        {
          href: "/journal/zphc-orijinal-mi-nasil-anlarim",
          eyebrow: "Doğrulama rehberi",
          title: "ZPHC orijinalliği nasıl doğrulanır?",
          description: "Kutu üzerindeki kodun üretici doğrulama ekranında nasıl kontrol edildiğini görün.",
        },
      ]}
    />
  )
}
