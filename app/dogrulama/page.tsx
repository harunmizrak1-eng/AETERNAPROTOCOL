import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"

export const metadata: Metadata = {
  title: "Orijinallik Doğrulama",
  description:
    "ZPHC ürünlerindeki kazı-kazan kodu ile orijinallik doğrulaması. Kutunuzdaki kodu üreticinin resmi doğrulama sistemine girerek ürünün gerçekliğini kontrol edin.",
  alternates: { canonical: "/dogrulama" },
  openGraph: {
    title: "Orijinallik Doğrulama",
    description:
      "ZPHC ürünlerindeki kazı-kazan kodu ile orijinallik doğrulaması.",
    url: "/dogrulama",
  },
}

const STEPS = [
  {
    n: "01",
    title: "Kodu bulun",
    body: "Kazı-kazan etiketi ZPHC kutusunun arka yüzündedir. Etiket zedelenmiş, önceden kazınmış veya hiç yoksa ürünü kullanmayın — bize bildirin.",
  },
  {
    n: "02",
    title: "Yüzeyi kazıyın",
    body: "Gümüş tabakayı bir madeni paranın kenarıyla nazikçe kazıyın. Altındaki benzersiz doğrulama kodu görünür hâle gelir.",
  },
  {
    n: "03",
    title: "Üreticinin sistemine girin",
    body: "Kodu ZPHC'nin resmi doğrulama sayfasına girin. Doğrulama üreticinin kendi sunucusunda yapılır; sonucu biz üretmeyiz.",
  },
  {
    n: "04",
    title: "Sonucu okuyun",
    body: "İlk sorguda ürün orijinal olarak görünmelidir. Kod daha önce sorgulanmış görünüyorsa ve ürünü yeni aldıysanız, bu bir uyarı işaretidir.",
  },
]

export default function DogrulamaPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Orijinallik
              </p>
            </div>

            <h1 className="mt-10 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              Ürününüzün Gerçek Olduğunu Doğrulayın
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              ZPHC her kutuya benzersiz bir kazı-kazan kodu basar. Bu kod,
              ürünün üreticinin kendi üretim hattından çıktığını gösteren tek
              kanıttır. Doğrulama üreticinin sunucusunda yapılır — sonucu biz
              üretmiyoruz, yalnızca yönlendiriyoruz.
            </p>

            <div className="mt-10">
              <a
                href="https://zphcstore.com/zphc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-sm bg-gold px-8 py-3.5 text-[0.65rem] uppercase tracking-eyebrow font-medium text-primary-foreground transition-colors duration-300 hover:bg-gold/85"
              >
                ZPHC Doğrulama Sayfasına Git →
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
              Nasıl Yapılır
            </h2>

            <ol className="mt-8 space-y-10">
              {STEPS.map((step) => (
                <li key={step.n} className="flex gap-6">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.7rem] text-gold/70"
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-light tracking-wide text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 pb-28 md:px-10 sm:pb-36">
          <div className="mx-auto max-w-3xl rounded-sm border border-hairline bg-muted/30 p-8 sm:p-10">
            <h2 className="text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
              Doğrulama Başarısız Olduysa
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-foreground/85">
              Kod tanınmıyorsa, daha önce sorgulanmış görünüyorsa veya etiket
              zedelenmişse ürünü kullanmayın. Kutunun ve etiketin fotoğrafıyla
              birlikte bize ulaşın — nereden temin edildiğini birlikte
              inceleyelim.
            </p>
            <p className="mt-4 text-xs font-light leading-relaxed text-muted-foreground">
              Sahte ürün yalnızca etkisiz olmakla kalmaz; içeriği ve sterilitesi
              bilinmediği için gerçek bir sağlık riskidir.
            </p>
            <div className="mt-8">
              <WhatsappCta
                product="doğrulama sonucu"
                label="Doğrulama İçin Yazın"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
