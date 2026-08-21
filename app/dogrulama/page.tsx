import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"

export const metadata: Metadata = {
  title: "Orijinallik Doğrulama",
  description:
    "ZPHC ürünlerindeki doğrulama kodu ile orijinallik kontrolü. Kutunuzdaki kodu üreticinin resmi sistemine girerek ürünün gerçekliğini teyit edin.",
  alternates: { canonical: "/dogrulama" },
  openGraph: {
    title: "Orijinallik Doğrulama",
    description:
      "ZPHC ürünlerindeki doğrulama kodu ile orijinallik kontrolü.",
    url: "/dogrulama",
  },
}

/* Adımlar üreticinin kendi prosedürünü (validation.zphc.com) birebir
   izler. Sırayı veya içeriği kendimizden değiştirmiyoruz: yanlış anlatılan
   bir doğrulama adımı, sahte ürünün orijinal sanılmasına yol açar. */
const STEPS = [
  {
    n: "01",
    title: "Ambalajı açmadan inceleyin",
    body: "Kutu sağlam olmalı ve hiçbir mühür kırılmamış olmalı. ZPHC ambalajı kurcalamaya karşı korumalı teknolojiyle mühürlenir; açılmış veya zedelenmiş bir kutu tek başına uyarı işaretidir.",
  },
  {
    n: "02",
    title: "Holografik bandı çıkarın",
    body: "Soyulabilir holografik bandı çıkarın. Bu bant ürüne göre bulunmayabilir. Soyulduğunda geri döndürülemez bir iz bırakır; kurcalamaya karşı koruma bu şekilde çalışır.",
  },
  {
    n: "03",
    title: "Gümüş bandı kazıyın",
    body: "Ürünün arka yüzünde düz bir gümüş bant veya üzerinde “Scratch Coating For Validation Code” yazan bir alan bulunur. Bu kaplamayı nazikçe kazıyın. Altındaki doğrulama kodu harf, rakam ve özel karakterlerden oluşur; “8@MNZ8X@8DW” biçimindedir.",
  },
  {
    n: "04",
    title: "Kodu sisteme girin",
    body: "Kodu validation.zphc.com adresindeki forma girip “Check” düğmesine basın. Sorgulama üreticinin kendi sunucusunda yapılır; sonucu biz üretmiyoruz.",
  },
]

export default function DogrulamaPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold text-gold">Orijinallik</p>

            <h1 className="mt-10 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Ürününüzün Gerçek Olduğunu Doğrulayın
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              ZPHC her kutuya, gümüş bir kaplamanın altına benzersiz bir
              doğrulama kodu basar. Bu kod, ürünün üreticinin kendi üretim
              hattından çıktığını gösteren tek kanıttır. Sorgulama
              üreticinin resmi sistemi olan validation.zphc.com üzerinde
              yapılır; sonucu biz üretmiyoruz, yalnızca yönlendiriyoruz.
            </p>

            <div className="mt-10">
              <a
                href="https://validation.zphc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-sm bg-gold px-8 py-3.5 text-xs tracking-normal font-medium text-primary-foreground transition-colors duration-300 hover:bg-gold/85"
              >
                validation.zphc.com Adresine Git
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-foreground text-xl font-bold tracking-tight">
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
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-3xl border border-hairline bg-muted/30 p-8 sm:p-10">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              Doğrulama Başarısız Olduysa
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              Kod tanınmıyorsa, daha önce sorgulanmış görünüyorsa, mühür
              kırıksa veya gümüş bant önceden kazınmışsa ürünü kullanmayın.
              Kutunun ve etiketin fotoğrafıyla birlikte bize ulaşın, nereden
              temin edildiğini birlikte inceleyelim.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Sahte ürün yalnızca etkisiz olmakla kalmaz; içeriği ve sterilitesi
              bilinmediği için gerçek bir sağlık riskidir.
            </p>
            <div className="mt-8">
              <WhatsappCta
                label="Doğrulama için yazın"
                message="Merhaba, aldığım ürünün doğrulama sonucuyla ilgili bir sorun var. Yardımcı olabilir misiniz?"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
