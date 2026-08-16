import type { Metadata } from "next"

import { BayilikForm } from "@/components/bayilik-form"

export const metadata: Metadata = {
  title: "Bayilik Başvurusu",
  description:
    "ZPHC Türkiye bayilik ve yetkili alıcı başvurusu. Başvuru koşulları ve " +
    "başvuru formu.",
}

const criteria = [
  "Faaliyet gösterdiğiniz alanı belgeleyebiliyor olmanız",
  "Düzenli ve öngörülebilir bir sipariş hacmi",
  "Ürünlerin uygun koşullarda (2-8 °C soğuk zincir) saklanabilmesi",
  "Orijinallik doğrulamasının müşteriye aktarılması",
]

export default function BayilikPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zphc-navy">Bayilik Başvurusu</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        ZPHC peptid ve HGH hattı için yetkili alıcı ve bayilik başvurularını
        değerlendiriyoruz. Başvurunuzu iletin, koşulları ve fiyat listesini
        sizinle paylaşalım.
      </p>

      <section className="mt-8 rounded-lg border border-line p-5">
        <h2 className="text-sm font-bold uppercase tracking-eyebrow text-ink-soft">
          Aradığımız koşullar
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-ink">
          {criteria.map((c) => (
            <li key={c} className="flex gap-2">
              <span className="text-zphc-blue">·</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <h2 className="mt-10 text-lg font-bold text-zphc-navy">Başvuru formu</h2>
      <BayilikForm />
    </div>
  )
}
