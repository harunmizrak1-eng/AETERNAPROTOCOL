import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { tierLabel, tierDots, tierColorVar } from "@/lib/peptides"
import { lastContentReview } from "@/lib/site"

const description =
  "ÆTERNA'nın kanıt seviyesi sistemini nasıl kurduğu, protokolleri nasıl incelediği, neyi önermediği ve çıkar çatışmalarını nasıl ele aldığı ile editorial standartlarımız."

export const metadata: Metadata = {
  title: "Metodoloji",
  description,
  alternates: {
    canonical: "/metodoloji",
  },
  openGraph: {
    title: "Metodoloji · ÆTERNA",
    description,
    url: "/metodoloji",
  },
}

const TIER_ROWS = (["proven", "theoretical", "preclinical"] as const).map(
  (t) => ({ tier: t, label: tierLabel[t], dots: tierDots[t] }),
)

const DONT_RECOMMEND = [
  "Kanıt seviyesi ne olursa olsun, mekanizması bağımsız olarak karakterize edilemeyen bileşikleri. (Örnek: kütüphanemizde bir zamanlar yer alan P-21, güvenilir şekilde tanımlayamadığımız için çıkarıldı.)",
  "Yalnızca sosyal medya popülaritesine dayanan, literatür desteği olmayan bileşikleri.",
  "Risk profilinin makul kanıt seviyesini geçtiği, güvenlik verisi ciddi şekilde eksik olan bileşikleri.",
  "Herhangi bir protokolü, bireysel değerlendirme ve biyobelirteç okuması yapılmadan.",
]

export default function MethodologyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Metodoloji
              </p>
            </div>
            <h1 className="mt-10 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              Kanıtı nasıl değerlendiriyoruz.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Bu sayfa, kütüphanemizdeki her sınıflandırmanın arkasındaki
              süreci açıklar. Amaç güven telkin etmek değil, güvenin nereden
              geldiğini göstermektir.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto flex max-w-2xl flex-col gap-16">
            <div>
              <h2 className="font-serif text-xl font-light tracking-wide text-foreground">
                Kanıt nasıl sınıflandırılır
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Her bileşik üç kademeden birine yerleştirilir. Bu ayrım
                popülerlik, fiyat veya pazarlama anlatısından bağımsızdır;
                yalnızca insan verisinin varlığına ve kalitesine bakar.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {TIER_ROWS.map((row) => (
                  <div
                    key={row.tier}
                    className="rounded-sm border border-hairline bg-surface p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-sm ${tierColorVar[row.tier]}`}
                        aria-hidden="true"
                      >
                        {row.dots}
                      </span>
                      <span
                        className={`text-[0.7rem] uppercase tracking-eyebrow ${tierColorVar[row.tier]}`}
                      >
                        {row.label}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {row.tier === "proven" &&
                        "En az bir randomize kontrollü insan çalışması veya sistematik derleme/meta-analiz mevcut. PMID, DOI ve varsa ClinicalTrials.gov kaydı bileşik sayfasında gösterilir."}
                      {row.tier === "theoretical" &&
                        "Mekanizma hücre kültürü, hayvan modeli veya sınırlı/kontrolsüz insan verisiyle iyi tanımlanmış, ancak bağımsız, geniş ölçekli bir insan RCT'si yok."}
                      {row.tier === "preclinical" &&
                        "Kanıt büyük ölçüde hayvan çalışmalarına veya erken laboratuvar verisine dayanıyor. İnsan verisi yok veya neredeyse yok."}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Bir kaynak eklediğimizde, gerçekten var olan ve doğrulanabilir
                bir PMID/DOI kullanırız.{" "}
                <Link
                  href="/peptidler"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Peptid Kütüphanesi
                </Link>
                'ndeki "Klinik Kanıt" bileşiklerinin sayfalarında bu kaynaklar
                görünür durumdadır. Bulamadığımız yerde kaynak uydurmayız;
                bileşik bir alt kademede kalır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-light tracking-wide text-foreground">
                Protokoller nasıl incelenir
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Yeni literatür düzenli aralıklarla taranır ve mevcut
                sınıflandırmalar bu taramaya göre güncellenir. Güncelleme
                otomatik bir tarih damgası değil, elle yapılan bir incelemenin
                sonucudur. Bu yüzden sitede gördüğünüz "son inceleme"
                tarihleri gerçek bir gözden geçirmeyi temsil eder.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-light tracking-wide text-foreground">
                Neyi önermiyoruz
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {DONT_RECOMMEND.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 flex-shrink-0 bg-gold/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-light tracking-wide text-foreground">
                Çıkar çatışması beyanı
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                ÆTERNA hem protokol danışmanlığı hem de tedarik yönlendirmesi
                sunar. Bu, bir bileşiği önerme kararımızın ticari bir tarafı
                da olduğu anlamına gelir. Bunu gizlemek yerine açıkça
                belirtiyoruz. Kanıt sınıflandırması bu ticari ilişkiden
                etkilenmez: preklinik bir bileşik, iş modelimize ne kadar
                uygun olursa olsun preklinik olarak kalır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-light tracking-wide text-foreground">
                Güncelleme ve inceleme politikası
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                İçerik, yeni klinik veri yayınlandığında veya bir
                sınıflandırmanın artık doğru olmadığı belirlendiğinde
                güncellenir, pazarlama takvimine göre değil. Bir hata
                fark edildiğinde, sessizce düzeltmek yerine neyin
                değiştiğini kayıt altına alırız.
              </p>
              <p className="mt-6 text-[0.7rem] font-light leading-relaxed text-muted-foreground">
                Son inceleme: {lastContentReview}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
