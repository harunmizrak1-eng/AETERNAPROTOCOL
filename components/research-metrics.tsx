import Link from "next/link"
import { peptides } from "@/lib/peptides"
import { products } from "@/lib/products"

const METRICS = [
  { value: "90+", label: "Biyobelirteç" },
  { value: "Kod", label: "Orijinallik Doğrulaması" },
]

export function ResearchMetrics() {
  return (
    <section className="border-y border-hairline bg-card px-6 py-8 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 sm:grid-cols-4">
        <Link href="/urunler" className="text-center transition-opacity hover:opacity-70">
          <p className="text-2xl font-semibold text-foreground sm:text-3xl">
            {products.length}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Ürün
          </p>
        </Link>
        <Link href="/peptidler" className="text-center transition-opacity hover:opacity-70">
          <p className="text-2xl font-semibold text-foreground sm:text-3xl">
            {peptides.length}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Bileşik
          </p>
        </Link>
        {METRICS.map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-2xl font-semibold text-foreground sm:text-3xl">
              {m.value}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
