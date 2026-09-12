import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC BPC-157 Türkiye | 25 mg ve Karışımlar",
  description: "BPC-157 ZPHC 25 mg ve BPC-157 içeren ZPHC karışımlarını ürün formu ve kutu içeriğine göre karşılaştırın. Türkiye stoğunu görün; fiyat bilgisini doğrudan sorun.",
  alternates: { canonical: "/zphc-bpc-157", languages: topicLanguageAlternates("bpc157") },
  openGraph: {
    title: "ZPHC BPC-157 Türkiye | Ürün Seçenekleri",
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
      canonicalPath="/zphc-bpc-157"
      slugs={BPC_PRODUCTS}
      libraryHref="/peptidler/bpc-157"
      libraryLabel="BPC-157 bilgi kaydı"
      bullets={["Fiyat için iletişim", "Türkiye stoğu", "Üretici koduyla doğrulama"]}
      faq={[
        {
          q: "BPC-157 25 mg ile Ultra Rehab Mix veya Glow Pro Mix arasındaki fark ne?",
          a: "BPC-157 25 mg setinde tek bileşen vardır. Ultra Rehab Mix aynı miktarda TB-500 de içerir, Glow Pro Mix ise buna GHK-Cu ekler. Üçü farklı bileşim, farklı toplam içeriktir; birbirinin yerine geçmez.",
        },
        {
          q: "25 mg tek flakonda mı geliyor, yoksa 5 flakon halinde mi?",
          a: "5 flakon halinde gelir, her flakon 5 mg'dır, toplamı 25 mg eder. Kutu üzerinde bu bilgi açıkça yazar.",
        },
        {
          q: "BPC-157 ile TB-500 aynı şey mi?",
          a: "Hayır, ikisi farklı bileşiktir ve genelde birlikte anıldığı için karıştırılır. Aradaki mekanistik farkı ayrı bir yazıda karşılaştırdık, aşağıdan okuyabilirsiniz.",
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
