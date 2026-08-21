import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"

const description =
  "ZPHC Türkiye kargo ve teslimat koşulları: anlaşmalı Yurtiçi Kargo ile ertesi gün teslimat, kargo ücreti yok, ödeme seçenekleri ve saklama bilgisi."

export const metadata: Metadata = {
  title: "Kargo & Teslimat",
  description,
  alternates: { canonical: "/kargo" },
  openGraph: {
    title: "Kargo & Teslimat · ZPHC Türkiye",
    description,
    url: "/kargo",
  },
}

const FACTS = [
  { k: "Kargo firması", v: "Yurtiçi Kargo (anlaşmalı)" },
  { k: "Teslim süresi", v: "Ertesi gün" },
  { k: "Kargo ücreti", v: "Yok — tüm siparişlerde ücretsiz" },
  { k: "Ödeme", v: "Havale/EFT veya kredi kartı, ön ödemeli" },
]

export default function KargoPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-gold">Kargo &amp; Teslimat</p>
            <h1 className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Ertesi gün teslim, kargo ücreti yok
            </h1>

            <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                >
                  <dt className="text-sm font-semibold text-foreground sm:w-44 sm:shrink-0">
                    {f.k}
                  </dt>
                  <dd className="text-base text-muted-foreground">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto flex max-w-2xl flex-col gap-12">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Sipariş nasıl ilerliyor
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Sitede sepet ve çevrim içi ödeme yok. İstediğiniz ürünü
                WhatsApp&apos;tan sorarsınız, güncel fiyatı ve stok durumunu
                iletiriz. Ödemeniz ulaştıktan sonra sipariş aynı gün kargoya
                verilir ve ertesi gün adresinizde olur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Ödeme seçenekleri
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Havale/EFT ve kredi kartı kabul ediyoruz. Ödeme siparişten önce
                alınır; kapıda ödeme seçeneğimiz yoktur.
              </p>
            </div>

            {/* Bu bölüm bilinçli olarak burada: müşterinin en sık sorduğu şey
                "yolda bozulur mu" oluyor. Ürünler liyofilize (dondurularak
                kurutulmuş) toz halinde gönderildiği için taşımada soğuk zincir
                gerekmiyor; buzdolabı ihtiyacı sulandırmadan SONRA başlıyor.
                Bu ayrım net yazılmazsa müşteri ya gereksiz endişeleniyor ya da
                sulandırdıktan sonra yanlış saklıyor. */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Soğuk zincir gerekiyor mu?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Hayır. Ürünler liyofilize, yani dondurularak kurutulmuş toz
                halinde gönderilir; bu formda taşıma sırasında soğutma
                gerektirmez. Kutuyu aldığınızda oda sıcaklığında, ışıktan uzak
                bir yerde tutabilirsiniz.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Buzdolabı ihtiyacı <strong>sulandırdıktan sonra</strong>{" "}
                başlar: hazırlanan çözelti 2–8 °C&apos;de buzdolabında
                saklanmalı, dondurulmamalı ve ışıktan korunmalıdır. Her ürünün
                kendi sayfasında o ürüne ait saklama ve stabilite bilgisi
                yazılıdır.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Teslimatta ne kontrol etmelisiniz
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  "Paketin dışında ezilme, yırtılma veya açılma izi var mı.",
                  "Kutu sayısı ve ürünler sipariş ettiğinizle aynı mı.",
                  "Kutudaki gümüş kaplamanın altındaki doğrulama kodu daha önce kazınmamış olmalı.",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden="true" className="text-gold/70">
                      ·
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Bir sorun görürseniz{" "}
                <Link
                  href="/iade"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  aynı gün bize bildirin
                </Link>
                ; telafi ediyoruz. Kodun doğrulanması için{" "}
                <Link
                  href="/dogrulama"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Doğrulama
                </Link>{" "}
                sayfasına bakın.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 text-center md:px-10">
          <p className="mx-auto max-w-lg text-pretty text-lg font-medium leading-relaxed text-foreground">
            Kargo veya sipariş hakkında sorunuz mu var?
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsappCta />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
