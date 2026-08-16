import Link from "next/link"
import Image from "next/image"
import { products, goalOrder } from "@/lib/products"

/** Goal-based category grid for the homepage. This is the main navigation
 * into the catalogue: a visitor who doesn't know compound names browses by
 * what they're after. Each card carries a live product count and a
 * representative product image, both derived from the generated catalogue so
 * they can never drift out of sync with it. */

// Which product's photo represents each goal. Falls back to the first
// product in the goal if the named slug is gone after a catalogue refresh.
const COVER: Record<string, string> = {
  "Kilo Kaybı": "retatrutide-10mg-5x2mg-zphc-2",
  "Toparlanma & Doku Onarımı": "bpc157-25mg-5x5mg-zphc",
  "Büyüme Hormonu": "zptrop-100iu-zphc",
  "Anti-Aging & Cilt": "ghk-cu-50mg-zphc",
  Longevity: "nad-plus-2500mg-zphc",
  Diğer: "melanotan-2-10mg-bacteriostatic-water-zphc",
}

const BLURB: Record<string, string> = {
  "Kilo Kaybı": "Semaglutid, tirzepatid, retatrutid ve yağ yakım peptidleri",
  "Toparlanma & Doku Onarımı": "Tendon, bağ ve kas onarımı",
  "Büyüme Hormonu": "Büyüme hormonu ve salgılanmasını artıran peptidler",
  "Anti-Aging & Cilt": "Kolajen sentezi ve cilt yenilenmesi",
  Longevity: "Hücresel enerji ve yaşlanma karşıtı bileşikler",
  Diğer: "Hormon desteği, bronzlaşma ve diğerleri",
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
    <section className="border-t border-hairline bg-surface px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Kategoriler
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Bileşik adı bilmenize gerek yok. Ne için aradığınızı seçin.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ goal, count, image }) => (
            <li key={goal}>
              <Link
                href={`/urunler?kategori=${encodeURIComponent(goal)}`}
                className="group flex h-full items-center gap-5 rounded-lg border border-hairline bg-background p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
              >
                {image && (
                  <div className="shrink-0 rounded-lg bg-surface p-3">
                    <Image
                      src={image}
                      alt=""
                      width={160}
                      height={160}
                      className="h-24 w-24 object-contain mix-blend-multiply"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-gold">
                    {goal}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {BLURB[goal]}
                  </p>
                  <p className="mt-2.5 text-sm font-semibold text-gold">
                    {count} ürün →
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
