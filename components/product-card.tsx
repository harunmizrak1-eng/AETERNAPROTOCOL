import Image from "next/image"
import Link from "next/link"
import { CompareButton } from "@/components/product-compare"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { categoryLabels, type Product } from "@/lib/products"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"

export function getProductForm(product: Product) {
  if (product.category === "aksesuar") return "Aksesuar"
  if (/hazır karışım|aq pen/i.test(product.name)) return "Hazır kalem"
  if (/çift hazne|dual|kartuş/i.test(product.name)) return "Çift hazne / kartuş"
  return "Flakon seti"
}

export function ProductCard({ product }: { product: Product }) {
  const price = getProductPrice(product.slug)

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-background p-3 text-left shadow-[0_8px_30px_rgba(13,27,42,0.04)] transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_14px_40px_rgba(0,114,188,0.10)] sm:p-4">
      <Link href={`/urunler/${product.slug}`} className="block">
        {product.image && (
          <div className="rounded-xl bg-surface p-2 sm:p-3">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              sizes="(max-width: 639px) 44vw, (max-width: 1023px) 33vw, 25vw"
              className="aspect-square w-full object-contain"
            />
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-gold/8 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-gold sm:text-[0.68rem]">
            {categoryLabels[product.category]}
          </span>
          <span className="rounded-full bg-surface px-2 py-1 text-[0.6rem] font-semibold text-muted-foreground sm:text-[0.68rem]">
            {getProductForm(product)}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-3 min-h-[3.8rem] text-sm font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold sm:min-h-[3rem] sm:text-base">
          {product.name}
        </h3>
      </Link>

      <div className="mt-auto pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-3">
          <p className="text-sm font-extrabold text-foreground sm:text-base">
            {price ? formatProductPrice(price) : "Fiyat için yazın"}
          </p>
          <StockBadge inStock={product.inStock} />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <WhatsappCta
            product={product.name}
            label="Fiyat sor"
            size="compact"
            source="product_card"
          />
          <CompareButton slug={product.slug} name={product.name} />
        </div>
      </div>
    </article>
  )
}

export function StockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-[0.65rem] font-semibold sm:text-xs ${
        inStock
          ? "bg-tier-proven/10 text-tier-proven"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {inStock ? "Stokta" : "Tükendi"}
    </span>
  )
}
