import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"

/* Öncekinde tam ekran koyu gradient bant ve büyük vaat cümlesi vardı —
 * generic bir "SaaS landing page" kapanışı. Bir e-ticaret sitesinin
 * kapanışı bir vaat değil, bir eylemdir: fiyat sor. */
export function FinalCta() {
  return (
    <section className="border-b border-hairline bg-surface px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <p className="text-lg font-bold text-foreground">
          Fiyat ve stok için WhatsApp’tan yazın.
        </p>
        <div className="flex flex-wrap gap-3">
          <WhatsappCta label="Fiyat sorun" />
          <Link
            href="/urunler"
            className="rounded-full border border-hairline px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-gold/60 hover:text-gold"
          >
            Ürün kataloğu
          </Link>
        </div>
      </div>
    </section>
  )
}
