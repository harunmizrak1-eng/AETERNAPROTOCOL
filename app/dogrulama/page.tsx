import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { validationUrl } from "@/lib/verification"

export const metadata: Metadata = {
  title: "Orijinallik Doğrulama",
  description:
    "ZPHC ürünlerindeki doğrulama kodu ile orijinallik kontrolü. Kutunuzdaki kodu üreticinin resmi sistemine girerek ürünün gerçekliğini teyit edin; sahte ürünü ayırt etme ve doğrulama tutmazsa izlenecek adımlar.",
  alternates: { canonical: "/dogrulama" },
  openGraph: {
    title: "Orijinallik Doğrulama",
    description:
      "ZPHC ürünlerindeki doğrulama kodu ile orijinallik kontrolü ve sahte ürünü ayırt etme rehberi.",
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

/* Bu bölüm bilinçli olarak markadan bağımsız yazıldı: liyofilize bir
   peptid flakonunda gözle görülebilen genel işaretler. ZPHC'ye özgü ayırt
   edici detay uydurmuyoruz — üreticinin yayımlamadığı bir güvenlik özelliği
   varmış gibi anlatmak, alıcıyı yanlış bir güvene sokar. Kesin test tek:
   yukarıdaki kod sorgusu. */
const PHYSICAL_CHECKS = [
  {
    title: "Parti numarası ve son kullanma tarihi",
    body: "Kutunun üzerindeki parti numarası ile flakon etiketindeki numara birbirini tutmalı. Tarih ve parti bilgisi basılı olmalı; sonradan yapıştırılmış etiket, silinmiş ya da üzerine yazılmış alan uyarı işaretidir.",
  },
  {
    title: "Baskı ve etiket kalitesi",
    body: "Bulanık baskı, hizasız yazı, eğri yapıştırılmış etiket, yazım hataları. Tek başına kanıt değil ama birden fazlası bir aradaysa dikkat edin.",
  },
  {
    title: "Kazıma alanı",
    body: "Gümüş kaplama siz kazımadan önce kazınmış, çizilmiş veya üzeri kapatılmışsa ürünü kabul etmeyin. Kod bir kez sorgulandıktan sonra sistemde iz bırakır; önceden kazınmış bir alan, kodun sizden önce kullanıldığı anlamına gelebilir.",
  },
  {
    title: "Flakon kapağı ve mühür",
    body: "Alüminyum kapak flakona sıkı ve düzgün oturmuş olmalı; gevşek, eğri ya da elle çevrilebilen bir kapak sterilite açısından tek başına yeterli bir ret sebebidir.",
  },
  {
    title: "İçeriğin görünümü",
    body: "Liyofilize peptid, flakonun dibinde kuru ve beyaz bir tabaka ya da kek halinde durur. Sararma, ıslak veya erimiş görünüm, flakon çeperine yapışmış kalıntı; genellikle soğuk zincirin kırıldığına işaret eder.",
  },
  {
    title: "“Flakon boş görünüyor”",
    body: "Bu tek başına sahtelik göstergesi değildir. Birkaç miligramlık liyofilize toz gözle neredeyse görünmez, özellikle flakonun cidarına dağılmışsa. Yanlış alarm vermemek için bunu da yazıyoruz.",
  },
]

/* Ürünün kendisi kadar, nereden alındığı da belirleyici. Buradaki maddeler
   kanal davranışını tarif eder; hiçbir satıcıyı isimle işaret etmez ve
   etmemeli. */
const CHANNEL_FLAGS = [
  "Satıcının kim olduğu belli değil: ticaret unvanı, adresi ve iletişim bilgisi hiçbir yerde yazmıyor.",
  "Satış yalnızca özel mesaj üzerinden yürüyor; sipariş, fatura veya yazılı kayıt bırakılmıyor.",
  "Fiyat piyasanın belirgin biçimde altında. Soğuk zincir, gümrük ve orijinal ambalajın bir maliyeti vardır; o maliyetin altındaki fiyatın bir açıklaması olmalı.",
  "Doğrulama kodu sorulduğunda konu değişiyor: “o sistem artık çalışmıyor”, “bu partide kod yok”, “kodu biz sorgularız” gibi cevaplar geliyor.",
  "Elindeki ürünün fotoğrafını göndermiyor; yalnızca üreticinin kataloğundan alınmış görselleri paylaşıyor.",
  "Sevkiyatın nasıl yapılacağı, soğuk zincirin nasıl korunacağı sorulduğunda net bir cevap yok.",
]

const AFTER_FAILURE = [
  {
    n: "01",
    title: "Kullanmayın",
    body: "İçeriği ve sterilitesi bilinmeyen bir ürün, etkisiz olmaktan çok daha ciddi bir risktir. Şüphe varsa kullanım orada durur.",
  },
  {
    n: "02",
    title: "Kutuyu ve flakonu saklayın",
    body: "Ambalajı atmayın. Kutu, etiket, holografik bant ve flakon; sonraki her adımın tek kanıtıdır.",
  },
  {
    n: "03",
    title: "Fotoğraflayın",
    body: "Kutunun ön ve arka yüzü, parti numarasının okunduğu alan, kazınmış kod bölgesi, flakon etiketi ve doğrulama sonucunun ekran görüntüsü.",
  },
  {
    n: "04",
    title: "Satıcıya yazılı bildirin",
    body: "Talebi sipariş kaydı üzerinden ve yazılı olarak iletin. Sözlü görüşme sonraki adımlarda kanıt oluşturmaz.",
  },
  {
    n: "05",
    title: "Üreticiye bildirin",
    body: "Sahte ürün, markanın kendisine karşı işlenmiş bir ihlaldir; üretici bu bildirimleri takip eder. Elinizdeki kayıtları ZPHC'ye iletmenize yardımcı olabiliriz.",
  },
  {
    n: "06",
    title: "Resmî kanallara bildirin",
    body: "Türkiye'de sahte tıbbi ürün şüphesi TİTCK'nın (titck.gov.tr) ihbar kanalına, satışın ticari yönü ise cimer.gov.tr üzerinden ilgili kuruma bildirilebilir.",
  },
]

const FAQ = [
  {
    q: "Doğrulama kodu “daha önce sorgulanmış” görünüyor, bu ne anlama gelir?",
    a: "Kod, gümüş kaplamanın altında kapalı gelir ve ilk sorgulamada sistemde iz bırakır. Siz kazımadan önce sorgulanmış görünen bir kod, kutunun sizden önce açıldığını ya da kodun kopyalandığını gösterebilir. Her iki durumda da ürünü kullanmayın ve satıcıya yazılı olarak bildirin.",
  },
  {
    q: "Kod doğrulandı ama ürün bana şüpheli geldi. Ne yapmalıyım?",
    a: "Kod sorgusu üreticinin doğrulama sistemidir, sterilite veya soğuk zincir garantisi değil. Flakonun içeriği sararmış, ıslak ya da erimiş görünüyorsa; kapak gevşekse; ürün taşıma sırasında sıcakta kalmışsa kod tutsa bile kullanmayın. Kutu ve flakon fotoğraflarıyla bize ulaşın.",
  },
  {
    q: "Aynı ürünü piyasada çok daha ucuza gördüm, neden?",
    a: "Orijinal ürünün maliyeti üretim fiyatından ibaret değil: soğuk zincir, ithalat ve orijinal ambalaj maliyet üretir. Piyasanın belirgin altındaki bir fiyatın açıklanabilir bir sebebi olmalıdır. Fiyat farkı tek başına sahtelik kanıtı değildir; ancak satıcının kimliği belirsizse ve doğrulama kodu sorulduğunda net cevap alınamıyorsa birlikte değerlendirilmelidir.",
  },
  {
    q: "Doğrulama sonucunu siz mi üretiyorsunuz?",
    a: "Hayır. Sorgulama validation.zphc.com üzerinde, üreticinin kendi sunucusunda yapılır. Biz yalnızca prosedürü anlatıyor ve sizi o adrese yönlendiriyoruz. Sonucu kendi sitemizde üretmiyor, aracı bir ekran koymuyoruz — bunu yapmak, doğrulamanın bağımsızlığını ortadan kaldırırdı.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export default function DogrulamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main id="main-content" className="bg-background pt-28">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold text-gold">Orijinallik</p>

            <h1 className="mt-10 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Ürününüzün Gerçek Olduğunu Doğrulayın
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              ZPHC her kutuya, gümüş bir kaplamanın altına benzersiz bir
              doğrulama kodu basar. Bu kod, ürünün üreticinin kendi üretim
              hattından çıktığını gösteren tek kanıttır. Sorgulama üreticinin
              resmi sistemi olan validation.zphc.com üzerinde yapılır; sonucu
              biz üretmiyoruz, yalnızca yönlendiriyoruz.
            </p>

            <div className="mt-10">
              <a
                href={validationUrl}
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

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-foreground text-xl font-bold tracking-tight">
              Kutuyu Elinize Aldığınızda
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Aşağıdakiler gözle yapılabilen ön kontrollerdir. Hiçbiri tek
              başına kesin sonuç vermez ve kod sorgusunun yerine geçmez;
              amaçları, kodu sorgulamadan önce dikkatinizi çekmesi gereken
              işaretleri toplamaktır.
            </p>

            <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
              {PHYSICAL_CHECKS.map((check) => (
                <div key={check.title} className="py-5">
                  <dt className="text-base font-semibold tracking-tight text-foreground">
                    {check.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {check.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-foreground text-xl font-bold tracking-tight">
              Satın Almadan Önce: Kanalın Kendisi
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Sahte ürünle karşılaşmanın en büyük belirleyicisi ürünün kendisi
              değil, satın alındığı kanal. Aşağıdaki maddeler belirli bir
              satıcıyı işaret etmez; genel olarak dikkat edilmesi gereken
              davranışları tarif eder.
            </p>

            <ul className="mt-8 space-y-4">
              {CHANNEL_FLAGS.map((flag) => (
                <li
                  key={flag}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden="true" className="text-gold/70">
                    ·
                  </span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-foreground text-xl font-bold tracking-tight">
              Doğrulama Başarısız Olduysa
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Kod tanınmıyorsa, daha önce sorgulanmış görünüyorsa, mühür kırıksa
              veya gümüş bant önceden kazınmışsa sırasıyla şunları yapın.
            </p>

            <ol className="mt-8 space-y-8">
              {AFTER_FAILURE.map((step) => (
                <li key={step.n} className="flex gap-6">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.7rem] text-gold/70"
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 border border-hairline bg-muted/30 p-8 sm:p-10">
              <p className="text-sm leading-relaxed text-foreground/85">
                Ürünü bizden almamış olsanız bile kutunun ve etiketin
                fotoğrafıyla ulaşabilirsiniz. Nereden temin edildiğini birlikte
                inceleyip, elinizdeki kaydı üreticiye iletmeniz konusunda
                yardımcı oluruz.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Sahte ürün yalnızca etkisiz olmakla kalmaz; içeriği ve
                sterilitesi bilinmediği için gerçek bir sağlık riskidir.
              </p>
              <div className="mt-8">
                <WhatsappCta
                  product="doğrulama sonucu"
                  label="Doğrulama İçin Yazın"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="border-b border-hairline pb-4 text-foreground text-xl font-bold tracking-tight">
              Sık Sorulanlar
            </h2>

            <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="text-base font-semibold tracking-tight text-foreground">
                    {item.q}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
