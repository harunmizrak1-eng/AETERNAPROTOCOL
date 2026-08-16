import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ResearchMetrics } from "@/components/research-metrics"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyZphc } from "@/components/why-zphc"
import { Categories } from "@/components/categories"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

/* Distribütör ana sayfası: katalog → neden biz → odak alanları → iletişim.
 *
 * Danışmanlık dönemine ait dört bölüm buradan kaldırıldı:
 * Offerings ve Process (danışmanlık paketleri ve başvuru akışı — artık
 * satılan bir hizmet değil), Idea (danışmanlık felsefesi) ve Trust (kurgusal
 * danışan yorumları — bir ürün kataloğunda bunlar sahte müşteri yorumu
 * anlamına gelirdi). Bileşenler silinmedi, yalnızca ana sayfadan çıkarıldı.
 */
export default function Page() {
  return (
    <main id="main-content" className="bg-background">
      <Nav />
      <Hero />
      <ResearchMetrics />
      <Reveal>
        <FeaturedProducts />
      </Reveal>
      <Reveal>
        <WhyZphc />
      </Reveal>
      <Reveal>
        <Categories />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
      <Footer />
    </main>
  )
}
