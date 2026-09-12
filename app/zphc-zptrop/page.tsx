import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC ZPtrop HGH 100 IU Türkiye | Ürün Bilgisi",
  description: "Aktif ZPHC ZPtrop HGH 100 IU hazır flakon ürününü, Türkiye stok bilgisini ve üretici koduyla doğrulama adımlarını inceleyin.",
  alternates: { canonical: "/zphc-zptrop", languages: topicLanguageAlternates("zptrop") },
  openGraph: { title: "ZPHC ZPtrop HGH 100 IU Türkiye", description: "Aktif ZPtrop 100 IU ürün kaydı, stok bilgisi ve doğrulama.", url: "/zphc-zptrop" },
}

export default function ZphcZptropPage() {
  return <SeoProductLanding
    eyebrow="ZPHC ZPtrop Türkiye"
    title="Aktif ZPHC ZPtrop ürününü inceleyin"
    intro="Türkiye kataloğunda aktif olan ZPtrop HGH 100 IU hazır flakon burada listelenir. Satıştan kaldırılan eski ZPtrop formatları, müşterinin güncel stoğu yanlış yorumlamaması için bu sayfaya dahil edilmez."
    canonicalPath="/zphc-zptrop"
    slugs={["zptrop-hgh-100iu-aq-vial-zphc"]}
    libraryHref="/peptidler/hgh"
    libraryLabel="HGH bilgi kaydı"
    bullets={["100 IU", "Fiyat için iletişim", "Üretici koduyla doğrulama"]}
    faq={[
      {
        q: "Neden tek bir ZPtrop ürünü listeleniyor?",
        a: "Katalogda daha önce satılan bazı ZPtrop formatları artık stoklanmıyor. Eski bir formatı görüp güncel stoğu yanlış yorumlamayasınız diye yalnızca aktif ürün burada gösterilir.",
      },
      {
        q: "Hazır karışım flakon ne demek, kendim mi hazırlıyorum?",
        a: "Hayır. Bu ürün önceden karıştırılmış gelir, liyofilize toz sulandırma işlemi gerektirmez.",
      },
      {
        q: "100 IU ne anlama gelir?",
        a: "IU, HGH ürünlerinde kullanılan etkinlik birimidir, miligram değildir. Etiketlerde neden bu birimin kullanıldığını ayrı bir yazıda açıkladık, aşağıdan okuyabilirsiniz.",
      },
      {
        q: "Elimdeki kutunun orijinal olduğunu nasıl anlarım?",
        a: "Kutunun arkasındaki gümüş bandı kazıyıp çıkan kodu validation.zphc.com adresine girin. Sorgu doğrudan üreticinin sisteminde yapılır, sonucu biz üretmeyiz.",
      },
    ]}
    resources={[
      { href: "/peptidler/hgh", eyebrow: "Bileşik kütüphanesi", title: "HGH bilgi kaydı", description: "Literatür çerçevesini ve kaynak sınıflandırmasını ürün sayfasından bağımsız inceleyin." },
      { href: "/journal/hgh-iu-ne-demek", eyebrow: "Journal", title: "HGH ürünlerinde IU ne demek?", description: "Etiketlerdeki IU ifadesini ve ürün formatlarını anlamaya yönelik rehberi okuyun." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "ZPHC orijinalliği nasıl doğrulanır?", description: "Benzersiz kutu kodunu üretici sisteminde kontrol edin." },
    ]}
  />
}
