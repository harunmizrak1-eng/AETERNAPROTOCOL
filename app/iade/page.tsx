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
                WhatsApp&apos;tan bize yazın. Aynı gün bildirilen sorunları
                telafi ediyoruz.
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
                Kutu ezilmiş, flakon kırılmış veya sipariş ettiğiniz ürünlerden
                biri eksik geldiyse aynı gün bize yazın. Ürünü yeniden
                gönderiyoruz ya da parasını iade ediyoruz. Hangisini
                istediğinize siz karar veriyorsunuz.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Paketi açarken birkaç fotoğraf çekerseniz işimiz kolaylaşır:
                kargo kutusunun dışı, ürün kutusu ve hasarlı kısım.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                İade ve değişim
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                İade veya değişim istiyorsanız WhatsApp&apos;tan yazın, birlikte
                bakalım. Ürün açılmamışsa ve gümüş bant kazınmamışsa işlem
                daha kolay oluyor. Kazınmış bir kod üreticinin sisteminde
                kullanılmış görünüyor, o kutuyu bir daha satamıyoruz.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Cayma hakkı
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Mesafeli Sözleşmeler Yönetmeliği&apos;nden doğan cayma hakkınız
                saklı. Ancak sağlık ve hijyen gerekçesiyle, ambalajı açılmış
                ürünlerde bu hak mevzuat gereği kullanılamıyor. Bu yüzden ürünü
                teslim alır almaz kontrol edin. Açmadan önce aklınıza takılan
                bir şey varsa bize yazın.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Yanlış saklamadan doğan durumlar
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Ürünler toz halinde gidiyor, bu haldeyken soğutma gerekmiyor.
                Sulandırdıktan sonra çözeltiyi 2-8 °C&apos;de buzdolabında
                saklamanız, dondurmamanız ve ışıktan korumanız gerekiyor.
                Sulandırdıktan sonra yanlış saklamadan kaynaklanan bozulmaları
                telafi edemiyoruz. Hangi üründe ne kadar dayandığı, o ürünün
                kendi sayfasında yazıyor.
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
