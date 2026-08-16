import type { Metadata } from "next"
import Link from "next/link"

import { WhatsappCta } from "@/components/whatsapp-cta"
import { officialSite, whatsappDisplay, whatsappLink } from "@/lib/site"

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "ZPHC Türkiye distribütörü iletişim bilgileri. Ürün, fiyat ve stok " +
    "sorularınız için WhatsApp.",
}

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zphc-navy">İletişim</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Ürün, fiyat, stok ve kargo sorularınız için en hızlı kanal WhatsApp.
        Mesajınızda ilgilendiğiniz ürünün adını belirtirseniz daha hızlı
        dönebiliriz.
      </p>

      <section className="mt-8 rounded-lg border border-line p-6">
        <h2 className="text-sm font-bold uppercase tracking-eyebrow text-ink-soft">
          WhatsApp
        </h2>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-2xl font-bold text-zphc-blue hover:underline"
        >
          {whatsappDisplay}
        </a>
        <WhatsappCta className="mt-5" />
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card
          title="Bayilik başvurusu"
          body="Yetkili alıcı ve bayilik koşulları için başvuru formunu doldurun."
          href="/bayilik"
          cta="Başvuru formu"
        />
        <Card
          title="Ürün doğrulama"
          body="Kutunuzdaki kazı-kazan kodu ile orijinallik sorgusu yapın."
          href="/dogrulama"
          cta="Doğrulama adımları"
        />
      </section>

      <p className="mt-8 text-xs leading-relaxed text-ink-soft">
        Üreticinin resmi sitesi:{" "}
        <a
          href={officialSite}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zphc-blue hover:underline"
        >
          zphcstore.com
        </a>
        . Sipariş bu site üzerinden tamamlanmaz; talepler WhatsApp üzerinden
        ilerler.
      </p>
    </div>
  )
}

function Card({
  title,
  body,
  href,
  cta,
}: {
  title: string
  body: string
  href: string
  cta: string
}) {
  return (
    <div className="flex flex-col rounded-lg border border-line p-5">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-soft">{body}</p>
      <Link
        href={href}
        className="mt-4 text-sm font-semibold text-zphc-blue hover:underline"
      >
        {cta} →
      </Link>
    </div>
  )
}
