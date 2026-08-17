import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { contactEmail } from "@/lib/contact"

export const metadata: Metadata = {
  title: "Gizlilik & KVKK",
  description:
    "Kişisel verilerin korunması ve gizlilik politikası.",
  alternates: {
    canonical: "/gizlilik",
  },
  openGraph: {
    title: "Gizlilik & KVKK",
    description:
      "Kişisel verilerin korunması ve gizlilik politikası.",
    url: "/gizlilik",
  },
}

const SECTIONS = [
  {
    h: "Hangi verileri topluyoruz",
    p: "Site üzerinden herhangi bir form doldurmuyorsunuz; iletişim, WhatsApp veya e-posta üzerinden siz başlattığınızda kurulur. Bu görüşmede paylaştığınız ad, telefon ve sipariş bilgileri WhatsApp/e-posta sağlayıcısında kalır, sitemizin veritabanına kaydedilmez. Ayrıca ziyaret istatistikleri için anonim, kişiyi tanımlamayan kullanım verisi toplanır.",
  },
  {
    h: "Neden işliyoruz",
    p: "İletişime geçtiğinizde paylaştığınız bilgiler yalnızca ürün ve stok sorunuza yanıt vermek için kullanılır. Ziyaret istatistikleri siteyi iyileştirmek amacıyla toplanır. Verileriniz pazarlama amacıyla üçüncü taraflarla paylaşılmaz.",
  },
  {
    h: "Nasıl saklanıyor",
    p: "WhatsApp veya e-posta üzerinden yazışmalarınız ilgili platformun kendi güvenlik ve saklama politikasına tabidir; site tarafımızca ayrıca bir müşteri veritabanında tutulmaz.",
  },
  {
    h: "Haklarınız",
    p: `KVKK kapsamında verilerinize erişme, düzeltme, silme ve işlemeyi durdurma haklarına sahipsiniz. Talepleriniz için ${contactEmail} adresine yazabilirsiniz.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <section className="px-6 pb-28 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-gold">Gizlilik & KVKK</p>
            <h1 className="mt-10 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Verileriniz
            </h1>

            <div className="mt-14 flex flex-col gap-12">
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

            <p className="mt-16 border-t border-hairline pt-8 text-[0.7rem] leading-relaxed text-muted-foreground">
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
