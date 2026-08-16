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
  "Kilo Kaybı": "GLP-1 agonistleri ve lipolitik peptidler",
  "Toparlanma & Doku Onarımı": "Tendon, bağ ve kas onarımı",
  "Büyüme Hormonu": "Somatropin ve GH salgılatıcılar",
  "Anti-Aging & Cilt": "Kolajen sentezi ve cilt yenilenmesi",
  Longevity: "Hücresel enerji ve yaşlanma yolakları",
  Diğer: "Hormon desteği ve diğer bileşikler",
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
    <section className="border-t border-hairline px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Kategoriler
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Aradığınız bileşiğin adını bilmenize gerek yok. Hedefinize göre
          seçin.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ goal, count, image }) => (
            <li key={goal}>
              <Link
                href={`/urunler?kategori=${encodeURIComponent(goal)}`}
                className="group flex h-full items-center gap-5 rounded-md border border-hairline bg-card p-5 transition-colors hover:border-gold/60 hover:bg-muted/60"
              >
                {image && (
                  <Image
                    src={image}
                    alt=""
                    width={160}
                    height={160}
                    className="h-20 w-20 shrink-0 rounded-sm bg-background object-contain"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-gold">
                    {goal}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {BLURB[goal]}
                  </p>
                  <p className="mt-2 text-xs font-medium text-gold">
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
