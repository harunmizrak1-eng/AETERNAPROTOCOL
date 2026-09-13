import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { CalculatorCta } from "@/components/calculator-cta"
import { siteName, siteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Liyofilize Peptit Sulandırma Rehberi",
  description:
    "Bakteriyostatik su nedir, steril sudan farkı ne, flakona ne kadar su eklenir ve sulandırma adım adım nasıl yapılır. Yöntem anlatımı, doz önerisi yok.",
  alternates: { canonical: "/sulandirma-rehberi" },
  openGraph: {
    title: "Liyofilize Peptit Sulandırma Rehberi",
    description:
      "Bakteriyostatik su, sulandırma hacmi, adım adım yöntem ve saklama koşulları.",
    url: "/sulandirma-rehberi",
  },
}

/* Bu sayfa bilinçli olarak doz vermez. Türkçede bu konuda dolaşan içeriğin
 * çoğu ya forum kırıntısı ya da yabancı metinlerin makine çevirisi; boşluk
 * dozda değil yöntemde. Yöntem anlatmak ürün etiketinden okunabilen ve
 * eczacılık pratiğinde yerleşik bilgi, doz önermek ise değil. */

const faq = [
  {
    q: "Flakona kaç mL su eklemeliyim?",
    a: "Tek bir doğru miktar yoktur. Su miktarı flakondaki toplam maddeyi değiştirmez, yalnızca çözeltinin yoğunluğunu belirler: az su koyarsanız aynı doz için şırıngada daha küçük, çok su koyarsanız daha büyük bir çizgiye denk gelirsiniz. Pratikte skalada rahat okunan bir çizgiye denk gelen hacim seçilir. Çok küçük çekimler okuma hatasına, flakonu taşıracak kadar çok su ise ikinci flakona geçmeye yol açar.",
  },
  {
    q: "Liyofilize toz buzdolabında mı saklanır?",
    a: "Sulandırılmamış liyofilize toz, kısa taşıma süreleri boyunca oda sıcaklığına dayanacak biçimde üretilir; uzun süreli saklamada serin, kuru ve ışık almayan bir yer tercih edilir. Asıl hassas olan sulandırılmış hâlidir. Kesin koşul için kutu etiketini esas alın.",
  },
  {
    q: "Flakonu çalkalayabilir miyim?",
    a: "Hayır. Peptitler uzun zincirli moleküllerdir ve sert çalkalama köpük ile birlikte mekanik yıpranma oluşturur. Su flakon çeperinden yavaşça akıtılır, sonra flakon avuç içinde nazikçe çevrilerek tozun kendiliğinden çözünmesi beklenir.",
  },
  {
    q: "Sulandırma suyu kutudan çıkıyor mu?",
    a: "Bazı ürünlerde çıkıyor. Kit olarak satılan setlerde ve çift hazneli kartuşlu kalemlerde çözücü kutunun içindedir; adında yalnızca flakon geçen ürünlerde suyu ayrıca temin etmek gerekir. Hangi üründe ne çıktığı ürün sayfasının içerik bölümünde yazıyor.",
  },
]

const steps = [
  {
    t: "Flakonları ve şırıngayı hazırlayın",
    d: "Peptit flakonu, bakteriyostatik su flakonu, bir insülin şırıngası ve alkollü mendil. Elleri yıkayın. Sulandırma öncesi flakonu buzdolabından çıkarıp oda sıcaklığına gelmesini beklemek, soğuk çözücünün tozu yavaş çözmesini önler.",
  },
  {
    t: "İki tıpayı da silin",
    d: "Hem peptit hem su flakonunun kauçuk tıpasını alkollü mendille silin ve kurumasını bekleyin. Tıpa temiz görünse de üzerinde hava kaynaklı kalıntı bulunur; iğne o kalıntıyı içeri taşır.",
  },
  {
    t: "Suyu şırıngaya çekin",
    d: "Hesapladığınız hacmi su flakonundan şırıngaya çekin. Şırıngadaki hava kabarcıklarını, iğne yukarı bakarken gövdeye hafifçe vurup pistonu ileri iterek çıkarın. Kabarcık kalırsa çektiğiniz hacim gördüğünüzden az olur.",
  },
  {
    t: "Suyu çepere akıtın",
    d: "İğneyi peptit flakonunun tıpasından geçirin ve suyu doğrudan tozun üstüne değil, flakonun iç çeperine doğru yavaşça akıtın. Doğrudan püskürtmek tozu havalandırır ve çözünmeyi zorlaştırır.",
  },
  {
    t: "Çevirin, beklemeyi öğrenin",
    d: "Flakonu avuç içinde yavaşça çevirin. Toz çoğu zaman saniyeler içinde çözünür; inatçı kalanlar için flakonu birkaç dakika dik bırakmak yeterlidir. Çalkalamayın, ısıtmayın.",
  },
  {
    t: "Berraklığı kontrol edin ve etiketleyin",
    d: "Çözelti berrak ve parçacıksız olmalı. Flakonun üzerine sulandırma tarihini ve eklediğiniz su miktarını yazın; iki hafta sonra kaç mL koyduğunuzu hatırlamak mümkün olmuyor ve o sayı olmadan çekilecek üniteyi yeniden hesaplayamazsınız.",
  },
]

const mistakes = [
  "Kutu toplamını tek flakon sanmak. \"5 flakon × 4 mg\" yazan bir kutuda flakon başına 4 mg vardır, 20 mg değil. Hesap her zaman tek flakon üzerinden yürür.",
  "Şırıngayı yanlış skalada okumak. Türkiye'de satılan insülin şırıngaları U-100'dür, yani 1 mL yüz üniteye bölünmüştür. Yabancı kaynaklarda geçen U-40 skalası farklı bir bölmedir ve aynı çizgi farklı hacim anlamına gelir.",
  "Çok az su ile çok küçük çekim yapmak. İki ünitenin altındaki çekimler skalada okunamayacak kadar sıkışıktır; aynı dozu daha fazla suyla daha okunur bir çizgiye taşımak mümkündür.",
  "Sulandırma tarihini yazmamak. Çözeltinin ne zaman hazırlandığı ve içine kaç mL su konduğu bilinmiyorsa ne süre ne de doz hesabı yapılabilir.",
  "Kabarcıklı şırıngayı ölçüm sanmak. Gövdede kalan hava, okunan çizginin altındaki gerçek sıvı hacmini düşürür.",
]

export default function SulandirmaRehberiPage() {
  const pageUrl = `${siteUrl}/sulandirma-rehberi`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Liyofilize Peptit Sulandırma Rehberi",
        description:
          "Bakteriyostatik su, sulandırma hacmi, adım adım yöntem ve saklama koşulları.",
        url: pageUrl,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        name: "Liyofilize peptit flakonu nasıl sulandırılır",
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.t,
          text: step.d,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sulandırma rehberi",
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="border-b border-hairline bg-surface px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Yöntem rehberi
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Liyofilize peptit sulandırma rehberi
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Flakondaki beyaz toz, suyu çekilmiş hâldeki peptittir. Kullanıma
              hazır hâle gelmesi için sıvıyla buluşturulması gerekir ve bu
              işlemin kendine ait birkaç kuralı vardır. Bu sayfa o kuralları
              anlatır: hangi su, ne kadar, hangi sırayla. Doz önerisi içermez.
            </p>
          </div>
        </section>

        <section className="px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-3xl">
            {/* Bakteriyostatik suyun ne olduğu, benzil alkol ve 28 gün konusu
                /journal/bakteriyostatik-su-nedir yazısında zaten anlatılıyor.
                Burada tekrar etmek iki sayfayı aynı soru için yarıştırırdı;
                bu bölüm yalnızca seçimi söyleyip oraya yönlendiriyor. */}
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Hangi su kullanılır
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Bir flakon tek seferde bitmeyecekse bakteriyostatik su kullanılır;
              içindeki koruyucu, tıpadan her iğne girişinde içeri kaçabilecek
              bakterinin çoğalmasını durdurur. Tek seferde bitecekse koruyucusuz
              steril su da iş görür. Musluk suyu, içme suyu, kontakt lens
              solüsyonu ya da serum fizyolojik bu işin çözücüsü değildir;
              hiçbiri enjeksiyonluk kalitede üretilmez.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              İkisinin farkı, benzil alkolün ne yaptığı ve sık sorulan 28 gün
              meselesi ayrı bir yazıda anlatılıyor:{" "}
              <Link
                href="/journal/bakteriyostatik-su-nedir"
                className="font-semibold text-gold hover:underline"
              >
                Bakteriyostatik su nedir, neden normal su olmuyor?
              </Link>
            </p>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Ne kadar su eklenir
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Bu sorunun tek bir doğru cevabı yok, çünkü su miktarı flakonun
              içindeki toplam maddeyi değiştirmiyor. 10 mg'lık bir flakona 1 mL
              koyarsanız çözelti mililitrede 10 mg, 2 mL koyarsanız mililitrede
              5 mg olur. Aynı dozu iki durumda da alırsınız; değişen tek şey,
              o dozun şırınga skalasında hangi çizgiye denk geldiğidir.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Dolayısıyla hacim, matematiksel bir zorunluluk değil okunabilirlik
              tercihidir. Yoğun bir çözeltide doz iki üç üniteye sıkışır ve
              skalada ayırt edilemez; fazla seyreltilmiş bir çözeltide ise tek
              doz şırıngaya sığmayabilir. İkisinin arasında, doz tam ya da tama
              yakın bir çizgiye denk geldiğinde okuma hatası en aza iner.
            </p>
            <div className="mt-6">
              <CalculatorCta
                href="/hesaplayici"
                title="Hangi hacim hangi çizgiye denk geliyor?"
                description="Flakon miktarını ve suyu girin; hesaplayıcı şırıngada kaç ünite çekeceğinizi gösterir ve dozu tam çizgiye getiren bir su miktarı varsa onu önerir."
                cta="Hesaplayıcıyı aç"
              />
            </div>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Adım adım sulandırma
            </h2>
            <ol className="mt-6 space-y-6">
              {steps.map((step, i) => (
                <li key={step.t} className="flex gap-4">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold tabular-nums text-gold">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-foreground">{step.t}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-muted-foreground">
                      {step.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sık yapılan hatalar
            </h2>
            <ul className="mt-6 space-y-4">
              {mistakes.map((m) => (
                <li
                  key={m}
                  className="flex gap-3 text-sm leading-7 text-muted-foreground"
                >
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {m}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sık sorulanlar
            </h2>
            <dl className="mt-6 divide-y divide-hairline">
              {faq.map((item) => (
                <div key={item.q} className="py-5 first:pt-0">
                  <dt className="text-base font-bold text-foreground">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 border-t border-hairline pt-8">
              <p className="text-sm leading-7 text-muted-foreground">
                Bu sayfa yöntem anlatır, doz önermez. Bileşiklerin araştırma
                kayıtları için{" "}
                <Link href="/peptidler" className="font-semibold text-gold hover:underline">
                  bileşik kütüphanesine
                </Link>
                , ürünün kutusunda ne çıktığı için{" "}
                <Link href="/urunler" className="font-semibold text-gold hover:underline">
                  ürün sayfalarına
                </Link>{" "}
                bakabilirsiniz. Ürünler laboratuvar ve araştırma materyali
                olarak sunulur; insan kullanımı için tasarlanmamıştır.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
