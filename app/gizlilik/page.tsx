import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Gizlilik & KVKK",
  description:
    "Kişisel verilerin korunması, sağlık verisi işleme ve gizlilik politikası.",
  alternates: {
    canonical: "/gizlilik",
  },
  openGraph: {
    title: "Gizlilik & KVKK",
    description:
      "Kişisel verilerin korunması, sağlık verisi işleme ve gizlilik politikası.",
    url: "/gizlilik",
  },
}

const SECTIONS = [
  {
    h: "Hangi verileri topluyoruz",
    p: "İletişim bilgileriniz (ad, e-posta, telefon) ve süreç kapsamında paylaştığınız sağlık verileri (kan değerleri, biyobelirteçler, geçmiş bilgisi). Sağlık verileri, KVKK kapsamında özel nitelikli kişisel veri sayılır ve yalnızca açık rızanızla işlenir.",
  },
  {
    h: "Neden işliyoruz",
    p: "Verileriniz yalnızca size özel danışmanlık ve protokol tasarımı için kullanılır. Pazarlama amacıyla üçüncü taraflarla paylaşılmaz.",
  },
  {
    h: "Nasıl saklanıyor",
    p: "Sağlık verileriniz gizli tutulur ve erişim sınırlıdır. Dilediğiniz zaman verilerinizin silinmesini talep edebilirsiniz.",
  },
  {
    h: "Haklarınız",
    p: "KVKK kapsamında verilerinize erişme, düzeltme, silme ve işlemeyi durdurma haklarına sahipsiniz. Talepleriniz için iletişim kanallarımızı kullanabilirsiniz.",
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <section className="px-6 pb-28 md:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Gizlilik & KVKK
              </p>
            </div>
            <h1 className="mt-10 font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              Verileriniz
            </h1>

            <div className="mt-14 flex flex-col gap-12">
              {SECTIONS.map((s) => (
                <div key={s.h}>
                  <h2 className="font-serif text-xl font-light tracking-wide text-foreground">
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
