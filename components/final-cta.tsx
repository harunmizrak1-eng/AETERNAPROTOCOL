import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"

export function FinalCta() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="max-w-3xl text-balance font-serif text-4xl font-light leading-[1.15] tracking-wide text-foreground sm:text-6xl md:text-7xl">
        Orijinal ürün, doğrulanabilir kaynak.
      </h2>

      <p className="mt-8 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
        Fiyat, stok durumu ve tedarik koşulları için doğrudan yazın.
      </p>

      <div aria-hidden="true" className="mt-10 h-px w-16 bg-gold/60" />

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <WhatsappCta label="Fiyat ve Stok Sor" />
        <Link
          href="/urunler"
          className="rounded-sm border border-gold/60 px-10 py-4 text-xs uppercase tracking-eyebrow font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
        >
          Ürün Kataloğu
        </Link>
      </div>
    </section>
  )
}
