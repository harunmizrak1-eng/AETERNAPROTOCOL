import { StockBadge } from "@/components/product-card"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"

export function ProductPurchaseBar({
  slug,
  name,
  inStock,
}: {
  slug: string
  name: string
  inStock: boolean
}) {
  const price = getProductPrice(slug)

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-background/95 px-4 py-3 shadow-[0_-12px_40px_rgba(13,27,42,0.12)] backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-muted-foreground">{name}</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm font-extrabold text-foreground">
              {price ? formatProductPrice(price) : "Fiyat için yazın"}
            </p>
            <StockBadge inStock={inStock} />
          </div>
        </div>
        <WhatsappCta
          product={name}
          label="WhatsApp’tan sor"
          size="compact"
          source="product_sticky_bar"
        />
      </div>
    </div>
  )
}
