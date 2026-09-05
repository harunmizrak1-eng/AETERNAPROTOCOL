import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"

export const metadata: Metadata = {
  title: "ZPHC Reta Türkiye | Retatrutide Ürünleri ve Fiyatları",
  description: "ZPHC Reta ürünlerini 20 mg, 40 mg, 60 mg, 120 mg ve 30 mg hazır kalem seçenekleriyle karşılaştırın. Türkiye stoğu, üretici doğrulama kodu ve güncel fiyatlar.",
  alternates: { canonical: "/zphc-reta" },
  openGraph: {
    title: "ZPHC Reta Türkiye | Retatrutide Ürünleri",
    description: "ZPHC Reta ürünleri, güncel fiyatlar, stok bilgisi ve ürün formatları.",
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
      slugs={RETA_PRODUCTS}
      libraryHref="/peptidler/retatrutide"
      libraryLabel="Retatrutide bilgi kaydı"
      bullets={["Türkiye stoğu", "Üretici doğrulama kodu", "Ücretsiz kargo"]}
    />
  )
}
