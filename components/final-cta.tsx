import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#00314c] px-6 py-20 text-center text-white">
      <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        Aldığınız ürünün orijinal olduğunu kendiniz doğrulayın.
      </h2>

      <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/75">
        Fiyat ve stok için bize yazın, hemen dönüş yapalım.
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <WhatsappCta label="Fiyat ve stok sor" variant="hero" />
        <Link
          href="/urunler"
          className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-[#00314c] transition-colors hover:bg-white/90"
        >
          Ürün kataloğu
        </Link>
      </div>
    </section>
  )
}
