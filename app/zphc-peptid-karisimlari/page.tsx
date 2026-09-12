import type { Metadata } from "next"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"

export const metadata: Metadata = {
  title: "ZPHC Peptid Karışımları Türkiye | Ürün Karşılaştırma",
  description: "Glow Pro, Ultra Rehab, Super Slim, Wellness ve Mega Mass ZPHC karışımlarını bileşim ve toplam içerik açısından karşılaştırın.",
  alternates: { canonical: "/zphc-peptid-karisimlari", languages: topicLanguageAlternates("blends") },
  openGraph: { title: "ZPHC Peptid Karışımları Türkiye", description: "Aktif ZPHC karışımlarını bileşim ve toplam içeriğe göre ayırın.", url: "/zphc-peptid-karisimlari" },
}

export default function ZphcBlendsPage() {
  return <SeoProductLanding
    eyebrow="ZPHC Karışımlar Türkiye"
    title="ZPHC hazır karışımlarını formülüne göre ayırın"
    intro="Karışımlar aynı ürünün farklı boyları değildir. Glow Pro, Ultra Rehab, Super Slim, Wellness ve Mega Mass farklı bileşim ve toplam içeriklerle listelenir."
    canonicalPath="/zphc-peptid-karisimlari"
    slugs={["glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc", "ultra-rehab-mix-50mg-5x10mg-zphc", "super-slim-mix-55mg-5x11mg-zphc", "wellness-mix-25mg-5x5mg-zphc", "mega-mass-mix-10mg-5x10mg-zphc"]}
    libraryHref="/peptidler"
    libraryLabel="Bileşik kütüphanesi"
    bullets={["Bileşim karşılaştırması", "Fiyat için iletişim", "Türkiye stoğu"]}
    faq={[
      {
        q: "Karışımlardaki bileşenler ayrı ayrı da satılıyor mu?",
        a: "Evet, çoğu bileşen tek başına da kataloğumuzda var. Karışımı almadan önce her bileşiğin kendi bilgi kaydını okumak isterseniz kütüphaneden ayrı ayrı inceleyebilirsiniz.",
      },
      {
        q: "Beş karışım hangi amaç grubuna ayrılıyor?",
        a: "Glow Pro ve Ultra Rehab toparlanma kategorisinde, Super Slim kilo kaybı kategorisinde, Wellness ve Mega Mass büyüme hormonu destekleyici kategorisindedir. Bu bir kullanım önerisi değil, ürünlerin sitedeki kategori sınıflandırmasıdır.",
      },
      {
        q: "Karışımı kendim mi hazırlıyorum, hazır mı geliyor?",
        a: "Karışımlar liyofilize toz halinde gelir ve kullanmadan önce bakteriyostatik suyla sulandırılması gerekir. Hazır kalem formatında satılan karışım bu sayfada yoktur.",
      },
      {
        q: "Elimdeki kutunun orijinal olduğunu nasıl anlarım?",
        a: "Kutunun arkasındaki gümüş bandı kazıyıp çıkan kodu validation.zphc.com adresine girin. Sorgu doğrudan üreticinin sisteminde yapılır, sonucu biz üretmeyiz.",
      },
    ]}
    resources={[
      { href: "/peptidler", eyebrow: "Bileşik kütüphanesi", title: "İçerikleri ayrı ayrı inceleyin", description: "Karışım adından önce her bileşiğin bağımsız bilgi kaydını ve kaynaklarını okuyun." },
      { href: "/journal/doku-onarimi-bpc157-tb500", eyebrow: "Journal", title: "BPC-157 ve TB-500 karşılaştırması", description: "Sık birlikte anılan iki bileşiğin araştırma ayrımını inceleyin." },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", eyebrow: "Doğrulama rehberi", title: "Her kutuyu üreticide doğrulayın", description: "Kutu kodunun ZPHC üretici sisteminde nasıl kontrol edildiğini görün." },
    ]}
  />
}
