import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC ZPtrop HGH 100 IU Türkiye | Güncel Fiyat",
  description: "Aktif ZPHC ZPtrop HGH 100 IU hazır flakon ürününü, güncel Türkiye fiyatını ve üretici koduyla doğrulama adımlarını inceleyin.",
  alternates: { canonical: "/zphc-zptrop", languages: topicLanguageAlternates("zptrop") },
  openGraph: { title: "ZPHC ZPtrop HGH 100 IU Türkiye", description: "Aktif ZPtrop 100 IU ürün kaydı, fiyat ve doğrulama.", url: "/zphc-zptrop" },
}

export default function ZphcZptropPage() {
  return <SeoProductLanding
    eyebrow="ZPHC ZPtrop Türkiye"
    title="Aktif ZPHC ZPtrop ürününü inceleyin"
    intro="Türkiye kataloğunda aktif olan ZPtrop HGH 100 IU hazır flakon burada listelenir. Satıştan kaldırılan eski ZPtrop formatları, müşterinin güncel stoğu yanlış yorumlamaması için bu sayfaya dahil edilmez."
    slugs={["zptrop-hgh-100iu-aq-vial-zphc"]}
    libraryHref="/peptidler/hgh"
    libraryLabel="HGH bilgi kaydı"
    bullets={["100 IU", "Güncel fiyat", "Üretici koduyla doğrulama"]}
    resources={[
      { href: "/peptidler/hgh", eyebrow: "Bileşik kütüphanesi", title: "HGH bilgi kaydı", description: "Literatür çerçevesini ve kaynak sınıflandırmasını ürün sayfasından bağımsız inceleyin." },
      { href: "/journal/hgh-iu-ne-demek", eyebrow: "Journal", title: "HGH ürünlerinde IU ne demek?", description: "Etiketlerdeki IU ifadesini ve ürün formatlarını anlamaya yönelik rehberi okuyun." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "ZPHC orijinalliği nasıl doğrulanır?", description: "Benzersiz kutu kodunu üretici sisteminde kontrol edin." },
    ]}
  />
}
