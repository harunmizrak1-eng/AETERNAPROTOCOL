import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"

const description =
  "ZPHC Türkiye iade ve değişim koşulları: hasarlı veya eksik gelen siparişler aynı gün bildirildiğinde telafi edilir."

export const metadata: Metadata = {
  title: "İade & Değişim",
  description,
  alternates: { canonical: "/iade" },
  openGraph: {
    title: "İade & Değişim · ZPHC Türkiye",
    description,
    url: "/iade",
  },
}

export default function IadePage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-gold">İade &amp; Değişim</p>
            <h1 className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Hasarlı veya eksik ürünü telafi ediyoruz
            </h1>

            <div className="mt-10 border border-hairline bg-muted/30 p-6">
              <p className="text-sm font-semibold text-foreground">
                Aynı gün bildirin
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Siparişinizde hasar veya eksik varsa, teslim aldığınız gün
                içinde WhatsApp&apos;tan bize yazın. Bu süre içinde bildirilen
                sorunları telafi ediyoruz.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto flex max-w-2xl flex-col gap-12">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Hasarlı veya eksik ürün
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Kutu ezilmiş, flakon kırılmış ya da sipariş ettiğiniz ürünlerden
                biri eksik geldiyse aynı gün içinde bize bildirin. Bu durumlarda
                ürünü yeniliyor veya bedelini iade ediyoruz; hangisini
                tercih ettiğinizi siz seçersiniz.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Bildirimi hızlandırmak için paketi açarken fotoğraf çekmeniz
                işimizi kolaylaştırır: kargo kutusunun dış hâli, ürün kutusu ve
                varsa hasarlı kısım.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                İade ve değişim
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                İade ve değişim taleplerinizi WhatsApp üzerinden iletebilir,
                durumu birlikte değerlendirebiliriz. Ürünün açılmamış ve
                doğrulama kodunun kazınmamış olması süreci hızlandırır: kodu
                kazınmış bir kutu üreticinin sisteminde &quot;kullanılmış&quot;
                görüneceği için yeniden satılamaz.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Cayma hakkı
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Mesafeli Sözleşmeler Yönetmeliği kapsamındaki cayma hakkınız
                saklıdır. Ancak sağlık ve hijyen açısından iadesi uygun olmayan,
                ambalajı açılmış ürünlerde bu hak mevzuat gereği
                kullanılamayabilir. Bu yüzden ürünü teslim alır almaz kontrol
                etmenizi, açmadan önce bir tereddüdünüz varsa bize yazmanızı
                öneriyoruz.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Yanlış saklamadan doğan durumlar
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Ürünler liyofilize toz halinde gönderilir ve bu formda soğutma
                gerektirmez. Sulandırdıktan sonra çözeltinin 2–8 °C&apos;de
                buzdolabında saklanması, dondurulmaması ve ışıktan korunması
                gerekir. Sulandırma sonrası yanlış saklamadan kaynaklanan
                bozulmalar telafi kapsamı dışındadır. Ürüne özel saklama ve
                stabilite bilgisi her ürünün kendi sayfasında yazılıdır.
              </p>
              <Link
                href="/kargo"
                className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
              >
                Kargo ve saklama koşulları →
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 text-center md:px-10">
          <p className="mx-auto max-w-lg text-pretty text-lg font-medium leading-relaxed text-foreground">
            Siparişinizde bir sorun mu var? Hemen yazın.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsappCta product="siparişimde sorun var" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
