import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC BPC-157 Türkiye | 25 mg BPC-157 Fiyatı",
  description: "BPC-157 ZPHC 25 mg ve BPC-157 içeren ZPHC karışımlarını fiyat, ürün formu ve kutu içeriğine göre karşılaştırın. Türkiye stoğu ve üretici doğrulaması.",
  alternates: { canonical: "/zphc-bpc-157", languages: topicLanguageAlternates("bpc157") },
  openGraph: {
    title: "ZPHC BPC-157 Türkiye | Ürünler ve Fiyatlar",
    description: "ZPHC BPC-157 25 mg ve BPC-157 içeren ürünleri karşılaştırın.",
    url: "/zphc-bpc-157",
  },
}

const BPC_PRODUCTS = [
  "bpc157-25mg-5x5mg-zphc",
  "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc",
  "ultra-rehab-mix-50mg-5x10mg-zphc",
]

export default function ZphcBpcPage() {
  return (
    <SeoProductLanding
      eyebrow="ZPHC BPC-157 Türkiye"
      title="ZPHC BPC-157 ürünlerini karşılaştırın"
      intro="Katalogda tek bileşenli BPC-157 25 mg setinin yanında BPC-157 içeren Glow Pro Mix ve Ultra Rehab Mix bulunur. Ürünlerin bileşimi ve kutu içeriği aynı değildir; farkları bu sayfada açık biçimde görebilirsiniz."
      slugs={BPC_PRODUCTS}
      libraryHref="/peptidler/bpc-157"
      libraryLabel="BPC-157 bilgi kaydı"
      bullets={["Güncel fiyat", "Türkiye stoğu", "Üretici koduyla doğrulama"]}
      resources={[
        {
          href: "/peptidler/bpc-157",
          eyebrow: "Bileşik kütüphanesi",
          title: "BPC-157 bilgi kaydı",
          description: "Bileşiğin kanıt seviyesini, kaynaklarını ve ürünlerden bağımsız değerlendirmesini okuyun.",
        },
        {
          href: "/journal/doku-onarimi-bpc157-tb500",
          eyebrow: "Journal",
          title: "BPC-157 ve TB-500 neden birlikte anılıyor?",
          description: "İki bileşiğin mekanistik ayrımını ve kanıt sınırlarını karşılaştırmalı inceleyin.",
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
