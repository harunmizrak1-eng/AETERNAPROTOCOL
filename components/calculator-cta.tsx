import Link from "next/link"

/** Doz hesaplayıcıya yönlendiren ortak kutu.
 *
 * Hesaplayıcı sitedeki tek etkileşimli araç ve şu an yalnızca menüden, ürün
 * sayfalarından ve Reta sayfasından erişiliyordu. Aynı kutu kütüphane ve konu
 * sayfalarına da konularak aracın önüne gelen trafik artırılıyor.
 *
 * href doğrudan verilir: ürün sayfası "#urun=<ürün>", kütüphane ve konu
 * sayfaları "#bilesik=<bileşik>" kullanır, hesaplayıcı ikisini de açılışta
 * okuyup alanları doldurur. */
export function CalculatorCta({
  href,
  title,
  description,
  cta,
}: {
  href: string
  title: string
  description: string
  cta: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold/25 bg-gold/[0.04] p-5">
      <div className="min-w-0">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-flex min-h-11 shrink-0 items-center rounded-lg bg-gold px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {cta} →
      </Link>
    </div>
  )
}
