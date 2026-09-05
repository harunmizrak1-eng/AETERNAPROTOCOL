import Link from "next/link"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export function SeoProductLanding({
  eyebrow,
  title,
  intro,
  slugs,
  libraryHref,
  libraryLabel,
  bullets,
}: {
  eyebrow: string
  title: string
  intro: string
  slugs: string[]
  libraryHref: string
  libraryLabel: string
  bullets: string[]
}) {
  const shown = slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="border-b border-hairline bg-surface px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              {bullets.map((bullet) => (
                <span key={bullet} className="rounded-full border border-gold/20 bg-background px-3 py-2 text-foreground">{bullet}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Mevcut ürünler</h2>
                <p className="mt-2 text-sm text-muted-foreground">Form ve toplam miktar farklarını kartlarda karşılaştırın.</p>
              </div>
              <Link href={libraryHref} className="text-sm font-bold text-gold hover:underline">{libraryLabel} →</Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {shown.map((product) => (
                <li key={product.slug}><ProductCard product={product} /></li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
