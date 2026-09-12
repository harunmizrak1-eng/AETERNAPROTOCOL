import type { Metadata } from "next"
import Link from "next/link"
import { SeoProductLanding } from "@/components/seo-product-landing"
import { topicLanguageAlternates } from "@/lib/international-seo"
import { products } from "@/lib/catalog"
import { getProductForm } from "@/components/product-card"
import { parseSize } from "@/lib/product-size"

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
  const retaProducts = RETA_PRODUCTS
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))

  return (
    <SeoProductLanding
      eyebrow="ZPHC Reta Türkiye"
      title="ZPHC Reta ürünleri arasındaki farkı görün"
      intro="Aktif ZPHC Reta ürünlerini toplam içerik ve ambalaj biçimine göre karşılaştırın. Her ürünün kutu kaydı ve doğrulama adımı ayrı gösterilir."
      canonicalPath="/zphc-reta"
      slugs={RETA_PRODUCTS}
      libraryHref="/peptidler/retatrutide"
      libraryLabel="Retatrutide bilgi kaydı"
      bullets={["Türkiye stoğu", "Üretici doğrulama kodu", "Ücretsiz kargo"]}
      faq={[
        {
          q: "ZPHC Reta fiyatı ne kadar?",
          a: "Sitede fiyat listelemiyoruz; güncel fiyat ve stok bilgisini WhatsApp hattımızdan teyit edebilirsiniz. Ürünün adını seçtiğinizde mesaj otomatik hazırlanır.",
        },
        {
          q: "Reta ile retatrutide aynı şey mi?",
          a: "Evet. Reta, kutunun üzerindeki kısa isim; retatrutide ise bileşiğin asıl adı. İki adı da arama motorunda görebilirsiniz, ikisi de aynı ürünü işaret eder.",
        },
        {
          q: "20 mg, 40 mg, 60 mg ve 120 mg arasındaki fark nedir?",
          a: "Bunlar kutudaki toplam retatrutide miktarını belirtir. Flakon setlerinde ayrıca flakon sayısı ve flakon başına içerik ürün adında gösterilir. Bu sayılar doz önerisi değildir.",
        },
        {
          q: "Flakon seti mi, hazır kalem mi, çift hazneli kartuş mu almalıyım?",
          a: "Bunlar farklı ambalaj ve hazırlama biçimleridir; birbirinin yerine geçen doz seçenekleri gibi değerlendirilmemelidir. Ürün sayfasındaki kutu bilgisini okuyun, karar için sağlık profesyoneline danışın.",
        },
        {
          q: "Elimdeki kutunun orijinal olduğunu nasıl anlarım?",
          a: "Kutunun arkasındaki gümüş bandı kazıyıp çıkan kodu validation.zphc.com adresine girin. Sorgu doğrudan üreticinin sisteminde yapılır, sonucu biz üretmeyiz.",
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
          title: "Retatrutide nedir? Bugünkü araştırma durumu",
          description: "Yayımlanmış Faz 2 verisini ve devam eden Faz 3 programını birbirinden ayıran güncel özet.",
        },
        {
          href: "/journal/zphc-orijinal-mi-nasil-anlarim",
          eyebrow: "Doğrulama rehberi",
          title: "ZPHC orijinalliği nasıl doğrulanır?",
          description: "Kutu üzerindeki kodun üretici doğrulama ekranında nasıl kontrol edildiğini görün.",
        },
      ]}
    >
      <section className="border-t border-hairline px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-gold">Reta karşılaştırma</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Aynı isim, farklı kutular</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Toplam miktar ile flakon başına miktarı karıştırmamak için ürünleri tek tabloda topladık.</p>
          </div>
          <div className="mt-7 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-[#07334f] text-white"><tr><th className="px-5 py-4">Ürün</th><th className="px-5 py-4">Toplam içerik</th><th className="px-5 py-4">Ambalaj</th><th className="px-5 py-4">Kutu sunumu</th><th className="px-5 py-4"><span className="sr-only">Bağlantı</span></th></tr></thead>
              <tbody className="divide-y divide-hairline">
                {retaProducts.map((product) => {
                  const size = parseSize(product.name)
                  return <tr key={product.slug} className="bg-white"><th scope="row" className="px-5 py-4 font-bold text-foreground">{product.name}</th><td className="px-5 py-4 font-bold text-gold">{size ? `${size.amount} ${size.unit}` : "Kutu kaydında"}</td><td className="px-5 py-4 text-muted-foreground">{getProductForm(product)}</td><td className="px-5 py-4 text-muted-foreground">{size?.presentation ?? "Ürün sayfasında"}</td><td className="px-5 py-4"><Link href={`/urunler/${product.slug}`} className="font-bold text-gold hover:underline">İncele →</Link></td></tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-[#07334f] px-6 py-12 text-white md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#7dd0ff]">Araştırma durumu</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Retatrutide hâlâ araştırma aşamasında</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">TRIUMPH-1 Faz 3 çalışması tamamlandı ve üst düzey sonuçlar açıklandı. Ancak daha geniş geliştirme programı sürüyor; retatrutide onaylı bir tedavi gibi sunulmamalıdır.</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold"><a href="https://clinicaltrials.gov/study/NCT05929066" target="_blank" rel="noopener noreferrer" className="text-[#7dd0ff] hover:underline">TRIUMPH-1 kaydı →</a><a href="https://pubmed.ncbi.nlm.nih.gov/37366315/" target="_blank" rel="noopener noreferrer" className="text-[#7dd0ff] hover:underline">Faz 2 yayını →</a></div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-3">
            <div className="bg-[#0b3d5b] p-5"><p className="text-xs font-bold text-[#7dd0ff]">Flakon seti</p><p className="mt-2 text-sm leading-6 text-white/65">Kutudaki toplam içerik ve flakon başına miktar birlikte okunur.</p></div>
            <div className="bg-[#0b3d5b] p-5"><p className="text-xs font-bold text-[#7dd0ff]">Hazır kalem</p><p className="mt-2 text-sm leading-6 text-white/65">Ambalaj biçimi farklıdır; flakon hesabıyla aynı kabul edilmez.</p></div>
            <div className="bg-[#0b3d5b] p-5"><p className="text-xs font-bold text-[#7dd0ff]">Çift hazne</p><p className="mt-2 text-sm leading-6 text-white/65">Kartuş sunumu ürün sayfasındaki kendi kutu kaydıyla değerlendirilir.</p></div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3">
            <div className="bg-white p-6"><span className="text-xs font-bold text-gold">01</span><h3 className="mt-3 text-lg font-bold">Kutuyu eşleştirin</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Ürün adı, toplam içerik ve ambalaj biçimi katalog kaydıyla aynı olmalı.</p></div>
            <div className="bg-white p-6"><span className="text-xs font-bold text-gold">02</span><h3 className="mt-3 text-lg font-bold">Güvenlik kodunu açın</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Gümüş alanı yalnızca kutu elinize ulaştıktan sonra kazıyın.</p></div>
            <div className="bg-white p-6"><span className="text-xs font-bold text-gold">03</span><h3 className="mt-3 text-lg font-bold">Üreticide doğrulayın</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Kodu doğrudan validation.zphc.com üzerinde kontrol edin.</p><Link href="/dogrulama" className="mt-3 inline-block text-sm font-bold text-gold">Adımları görün →</Link></div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface p-6"><div><h3 className="text-lg font-bold">Flakon hesabı mı yapacaksınız?</h3><p className="mt-1 text-sm text-muted-foreground">Aktif ürünü seçin; flakon miktarı otomatik gelsin.</p></div><Link href="/hesaplayici#urun=retatrutide-20mg-5x4mg-zphc" className="inline-flex min-h-11 items-center rounded-lg bg-gold px-5 text-sm font-bold text-white">Reta ile hesapla →</Link></div>
        </div>
      </section>
    </SeoProductLanding>
  )
}
