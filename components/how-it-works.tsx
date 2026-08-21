import { WhatsappCta } from "@/components/whatsapp-cta"

/** Bir sepeti ve fiyatı olmayan bir mağazada, ziyaretçinin en büyük tereddüdü
 * "buraya tıklarsam ne olacak?" sorusudur. Bu bölüm süreci üç adımda
 * gösterip son CTA'dan hemen önce bu tereddüdü ortadan kaldırır. */
const STEPS = [
  {
    n: "01",
    title: "Ürünü seçin",
    text: "Kataloğa bakın, istediğiniz ürünü bulun.",
  },
  {
    n: "02",
    title: "WhatsApp'tan sorun",
    text: "Fiyat sorun düğmesine basın. Ürünün adı mesaja hazır gelir, siz sadece gönderin. Fiyatı ve stok durumunu hemen yazıyoruz.",
  },
  {
    n: "03",
    title: "Ertesi gün teslim alın",
    text: "Siparişinizi aynı gün kargoya veriyoruz, ertesi gün elinizde oluyor. Kargo ücreti almıyoruz.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-b border-hairline px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Sipariş nasıl veriliyor
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-px bg-hairline sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col bg-background p-6">
              <span
                aria-hidden="true"
                className="font-mono text-xs text-muted-foreground"
              >
                {s.n}
              </span>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <WhatsappCta label="WhatsApp’tan yazın" />
        </div>
      </div>
    </section>
  )
}
