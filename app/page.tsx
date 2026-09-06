import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ProductCategories } from "@/components/product-categories"
import { ProductStrip } from "@/components/product-strip"
import { bestSellers } from "@/lib/strips"
import { Reviews } from "@/components/reviews"
import { Footer } from "@/components/footer"

/* Mağaza ana sayfası: hero → çok satanlar → kategoriler
 * → neden biz → sipariş adımları → iletişim.
 *
 * Kategoriler ürünlerden önce geliyor: ziyaretçinin ilk sorusu "ne
 * arıyorum" değil, "burada ne var". Katalogla ilk temas kategori kartları.
 *
 * Danışmanlık dönemine ait bölümler (Offerings, Process, Idea, Trust) ve
 * eski Categories bileşeni ana sayfadan çıkarıldı; sonuncusu tıklanamayan,
 * yalnızca peptid adı listeleyen bir metin bloğuydu ve kataloğa
 * bağlanmıyordu. Yerini ProductCategories aldı.
 *
 * Telafi dolgusu (pt-*) yok: Nav artık position:fixed değil, normal akışta
 * duruyor ve kendi yerini kaplıyor. Nav'ın yüksekliği değiştiğinde hiçbir
 * sayfada elle ayar gerekmiyor.
 */
export default function Page() {
  return (
    <main id="main-content" className="bg-background">
      <Nav />
      <Hero />
      <ProductStrip {...bestSellers} title="En çok incelenen ürünler" />
      <ProductCategories />
      <Reviews />
      <Footer />
    </main>
  )
}
