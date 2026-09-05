import Link from "next/link"
import Image from "next/image"
import { products, goalOrder } from "@/lib/catalog"

/** Amaç bazlı geniş kategori kartları. Altı dar sütun ürünleri ve başlıkları
 * sıkıştırdığı için masaüstünde üç, telefonda tek sütun kullanılır. */

const COVER: Record<string, string> = {
  "Kilo Kaybı": "retatrutide-60mg-5x12mg-zphc",
  "Toparlanma & Doku Onarımı": "bpc157-25mg-5x5mg-zphc",
  "Büyüme Hormonu": "zptrop-hgh-100iu-aq-vial-zphc",
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
    <section className="border-b border-hairline bg-surface px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Ürününüzü bulun</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">İhtiyacınıza göre keşfedin</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Tüm kataloğu taramak yerine ilgili ürün grubundan başlayın.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-semibold">
            <Link href="/zphc-reta" className="rounded-full border border-gold/30 bg-background px-4 py-2 text-gold transition-colors hover:bg-gold hover:text-white">ZPHC Reta</Link>
            <Link href="/zphc-bpc-157" className="rounded-full border border-gold/30 bg-background px-4 py-2 text-gold transition-colors hover:bg-gold hover:text-white">ZPHC BPC-157</Link>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ goal, count, image }) => (
            <li key={goal}>
              <Link
                href={`/urunler?kategori=${encodeURIComponent(goal)}`}
                className="group flex h-full min-h-36 items-center gap-5 rounded-2xl border border-hairline bg-background p-5 shadow-[0_10px_30px_rgba(13,27,42,0.04)] transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(0,114,188,0.08)]"
              >
                {image && (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-surface p-2 sm:h-28 sm:w-28">
                    <Image
                      src={image}
                      alt=""
                      width={160}
                      height={160}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{count} ürün</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
                    {goal}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-gold">
                    Ürünleri incele <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
