import Link from "next/link"
import { peptides } from "@/lib/peptides"
import { products } from "@/lib/products"

const METRICS = [
  { value: "90+", label: "Biyobelirteç" },
  { value: "Kod", label: "Orijinallik Doğrulaması" },
]

export function ResearchMetrics() {
  return (
    <section className="border-y border-hairline px-6 py-10 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 sm:grid-cols-4">
        <Link href="/urunler" className="text-center transition-opacity hover:opacity-70">
          <p className="font-mono text-2xl text-foreground sm:text-3xl">
            {products.length}
          </p>
          <p className="mt-2 text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
            Ürün
          </p>
        </Link>
        <Link href="/peptidler" className="text-center transition-opacity hover:opacity-70">
          <p className="font-mono text-2xl text-foreground sm:text-3xl">
            {peptides.length}
          </p>
          <p className="mt-2 text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
            Bileşik
          </p>
        </Link>
        {METRICS.map((m) => (
          <div key={m.label} className="text-center">
            <p className="font-mono text-2xl text-foreground sm:text-3xl">
              {m.value}
            </p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
