import Link from "next/link"
import { peptides } from "@/lib/peptides"
import { products, goalOrder } from "@/lib/products"

/* Sayılar veriden okunur, elle yazılmaz; katalog büyüdüğünde kendiliğinden
 * güncellenir. Longevity sitesinden kalan "90+ Biyobelirteç" ve "Kod"
 * metrikleri kaldırıldı: ilki bir peptid alıcısı için anlamsızdı, ikincisi
 * zaten sayı değildi. */
export function ResearchMetrics() {
  const categoryCount = goalOrder.filter((g) =>
    products.some((p) => p.goals.includes(g)),
  ).length

  const metrics = [
    { href: "/urunler", value: products.length, label: "Ürün" },
    { href: "/urunler", value: categoryCount, label: "Kategori" },
    { href: "/peptidler", value: peptides.length, label: "Bileşik kaydı" },
  ]

  return (
    <section className="border-y border-hairline bg-card px-6 py-8 md:px-10">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-y-6">
        {metrics.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="text-center transition-opacity hover:opacity-70"
          >
            <p className="text-2xl font-semibold text-foreground sm:text-3xl">
              {m.value}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">{m.label}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
