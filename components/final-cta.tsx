import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"

export function FinalCta() {
  return (
    <section className="border-t border-hairline px-6 py-24 text-center">
      <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        Orijinal ürün, doğrulanabilir kaynak.
      </h2>

      <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
        Fiyat, stok durumu ve tedarik koşulları için doğrudan yazın.
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <WhatsappCta label="Fiyat ve Stok Sor" />
        <Link
          href="/urunler"
          className="rounded-md border border-gold px-8 py-3.5 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
        >
          Ürün kataloğu
        </Link>
      </div>
    </section>
  )
}
