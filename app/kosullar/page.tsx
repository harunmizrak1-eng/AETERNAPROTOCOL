import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

const description =
  "ZPHC Türkiye kullanım koşulları: yaş sınırı, içeriğin bilgilendirme amacı, sorumluluk sınırları ve sipariş süreci."

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description,
  alternates: { canonical: "/kosullar" },
  openGraph: {
    title: "Kullanım Koşulları · ZPHC Türkiye",
    description,
    url: "/kosullar",
  },
}

/* zphcstore.com'un altbilgisindeki koşul metni ("you confirm that you are 21
 * years or older", "content is published only with informational reasons",
 * "must be advised with your doctor") Türkiye'ye uyarlandı.
 *
 * Bilerek değiştirilenler: yaş sınırı 21 değil 18 (Türkiye'de reşitlik yaşı),
 * para birimi USD değil TL, ve "şirket hiçbir sorumluluk kabul etmez" gibi
 * mutlak sorumsuzluk ifadesi kullanılmadı — Türk tüketici hukukunda satıcının
 * ayıplı maldan doğan sorumluluğu sözleşmeyle tamamen kaldırılamaz, öyle bir
 * madde hem geçersiz olur hem güven zedeler. */
const SECTIONS = [
  {
    h: "Yaş sınırı",
    p: "Bu siteyi kullanarak 18 yaşından büyük olduğunuzu beyan etmiş olursunuz. 18 yaşından küçükseniz siteyi kullanmayın ve sipariş vermeyin.",
  },
  {
    h: "İçeriğin amacı",
    p: "Sitedeki tüm içerik yalnızca bilgilendirme amaçlıdır. Hiçbir bölüm tıbbi tavsiye, teşhis veya tedavi önerisi değildir ve hekim muayenesinin yerine geçmez. Teşhis, kullanım şekli ve doz belirleme yalnızca hekiminizle görüşülerek yapılmalıdır.",
  },
  {
    h: "Ürünlerin sunum çerçevesi",
    p: "Katalogdaki ürünler üretici tarafından laboratuvar ve araştırma materyali olarak sunulur; insan kullanımı için tasarlanmamıştır. Bu çerçeveyi olduğu gibi aktarıyoruz. Ürün sayfalarındaki 'yalnızca araştırma amaçlı' ibaresi üreticinin kendi beyanıdır.",
  },
  {
    h: "Üretici beyanları",
    p: "Ürün sayfalarında yer alan etkinlik ve doz ifadeleri üreticinin (ZPHC) kendi ürün açıklamasından alınmıştır. Bu ifadeler bağımsız olarak doğrulanmamıştır ve sitedeki kanıt seviyesi değerlendirmemizle çelişebilir. İkisini ayrı bölümlerde göstermemizin sebebi budur.",
  },
  {
    h: "Fiyat ve stok",
    p: "Sitede liste fiyatı yayımlanmaz. Fiyatlar Türk Lirası üzerinden, sipariş anında WhatsApp üzerinden bildirilir ve piyasa koşullarına göre değişebilir. Stok bilgisi de aynı şekilde sipariş anında teyit edilir.",
  },
  {
    h: "Sipariş ve iletişim",
    p: "Sitede sepet veya çevrim içi ödeme bulunmuyor. Tüm siparişler WhatsApp üzerinden, karşılıklı teyitle ilerler. Resmi hattımız dışında bir numaradan gelen 'ZPHC Türkiye' mesajlarına itibar etmeyin.",
  },
  {
    h: "Sorumluluk",
    p: "Sitedeki bilgilerin güncel ve doğru olması için özen gösteriyoruz; buna rağmen içerikte hata bulunabilir. Ürünlerin hekim önerisi olmadan kullanılmasından doğan sonuçlardan sorumlu değiliz. Ayıplı maldan doğan yasal sorumluluğumuz ise Tüketicinin Korunması Hakkında Kanun kapsamında saklıdır.",
  },
  {
    h: "Değişiklikler",
    p: "Bu koşullar zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır.",
  },
]

export default function KosullarPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-28 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-gold">
              Kullanım Koşulları
            </p>
            <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Koşullar
            </h1>

            <div className="mt-10 border border-hairline bg-muted/30 p-6">
              <p className="text-sm font-semibold text-foreground">
                18 yaş sınırı
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Bu siteyi kullanarak 18 yaşından büyük olduğunuzu ve içeriğin
                yalnızca bilgilendirme amacı taşıdığını kabul etmiş olursunuz.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-10">
              {SECTIONS.map((s) => (
                <div key={s.h}>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {s.h}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {s.p}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-14 border-t border-hairline pt-8 text-sm leading-relaxed text-muted-foreground">
              Kişisel verilerinizin nasıl işlendiği için{" "}
              <Link
                href="/gizlilik"
                className="text-gold underline-offset-4 hover:underline"
              >
                Gizlilik &amp; KVKK
              </Link>{" "}
              sayfasına bakın.
            </p>

            <p className="mt-8 text-[0.7rem] leading-relaxed text-muted-foreground">
              Bu metin bilgilendirme amaçlı bir taslaktır. Yürürlüğe girmeden
              önce bir hukuk danışmanı tarafından gözden geçirilmelidir.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
