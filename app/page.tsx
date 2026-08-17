import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ResearchMetrics } from "@/components/research-metrics"
import { ProductCategories } from "@/components/product-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyZphc } from "@/components/why-zphc"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"

/* Mağaza ana sayfası: hero → güven sayıları → kategoriler → öne çıkan
 * ürünler → neden biz → iletişim.
 *
 * Kategoriler ürünlerden önce geliyor: ziyaretçinin ilk sorusu "ne
 * arıyorum" değil, "burada ne var". Katalogla ilk temas kategori kartları.
 *
 * Danışmanlık dönemine ait bölümler (Offerings, Process, Idea, Trust) ve
 * eski Categories bileşeni ana sayfadan çıkarıldı; sonuncusu tıklanamayan,
 * yalnızca peptid adı listeleyen bir metin bloğuydu ve kataloğa
 * bağlanmıyordu. Yerini ProductCategories aldı.
 *
 * pt-[69px]: Nav position:fixed, ~69px yüksekliğinde. Diğer her sayfanın
 * <main>'i pt-28 taşıyor; burası unutulmuştu ve Hero'nun ilk render'da
 * nav'ın arkasında kalmasına (görünmez/çakışık render) yol açmıştı. Değer
 * ölçülerek verildi (Nav'ın gerçek yüksekliği); Nav'ın kendi boyutu
 * değişirse burası da güncellenmeli.
 */
export default function Page() {
  return (
    <main id="main-content" className="bg-background pt-[69px]">
      <Nav />
      <Hero />
      <ResearchMetrics />
      <ProductCategories />
      <FeaturedProducts />
      <WhyZphc />
      <FinalCta />
      <Footer />
    </main>
  )
}
