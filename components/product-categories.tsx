import Link from "next/link"
import Image from "next/image"
import { products, goalOrder } from "@/lib/products"

/** Amaç bazlı kategori kutucukları. zphcstore.com'un anasayfasındaki dört
 * kategori kutucuğuyla aynı kalıp: görsel, isim, tek bir "İncele" butonu —
 * pazarlama metni yok. Bir e-ticaret sitesinin ilk katmanı bu olmalı,
 * metin yoğun bir tanıtım bloğu değil. */

const COVER: Record<string, string> = {
  "Kilo Kaybı": "retatrutide-60mg-5x12mg-zphc",
  "Toparlanma & Doku Onarımı": "bpc157-25mg-5x5mg-zphc",
  "Büyüme Hormonu": "zptrop-hgh-200iu-2x100iu-zphc",
  "Cilt & Yaşlanma Karşıtı": "ghk-cu-60mg-with-bacteriostatic-water-zphc",
  "Uzun Yaşam": "nad-plus-2500mg-zphc",
  Diğer: "melanotan-2-30mg-aq-pen-zphc",
}

export function ProductCategories() {
  const groups = goalOrder
    .map((goal) => {
      const items = products.filter((p) => p.goals.includes(goal))
      const cover =
        items.find((p) => p.slug === COVER[goal]) ??
        items.find((p) => p.image) ??
        items[0]
      return { goal, count: items.length, image: cover?.image }
    })
    .filter((g) => g.count > 0)

  return (
    <section className="border-b border-hairline px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <ul className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-6">
          {groups.map(({ goal, count, image }) => (
            <li key={goal} className="bg-background">
              <Link
                href={`/urunler?kategori=${encodeURIComponent(goal)}`}
                className="group flex h-full flex-col items-center gap-3 p-6 text-center transition-colors hover:bg-surface"
              >
                {image && (
                  <Image
                    src={image}
                    alt=""
                    width={140}
                    height={140}
                    className="h-20 w-20 object-contain"
                  />
                )}
                <div>
                  <h3 className="text-sm font-semibold leading-snug text-foreground">
                    {goal}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {count} ürün
                  </p>
                </div>
                <span className="mt-1 rounded-full border border-gold px-4 py-1 text-xs font-semibold text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                  İncele
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
