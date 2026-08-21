import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ResearchMetrics } from "@/components/research-metrics"
import { ProductCategories } from "@/components/product-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyZphc } from "@/components/why-zphc"
import { HowItWorks } from "@/components/how-it-works"
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
 * pt-[96px]: Nav position:fixed, kırmızı uyarı şeridi + logo satırıyla
 * birlikte ~96px yüksekliğinde. Diğer her sayfanın <main>'i pt-28/pt-32
 * taşıyor (Nav'ın gerçek yüksekliğinden daha fazla, güvenli pay bırakır);
 * burası tek istisna, unutulup Hero'nun nav'ın arkasında kalmasına yol
 * açmıştı. Değer ölçülerek verildi; Nav'ın kendi boyutu değişirse burası
 * da güncellenmeli.
 */
export default function Page() {
  return (
    <main id="main-content" className="bg-background pt-[96px]">
      <Nav />
      <Hero />
      <ResearchMetrics />
      <ProductCategories />
      <FeaturedProducts />
      <WhyZphc />
      <HowItWorks />
      <FinalCta />
      <Footer />
    </main>
  )
}
