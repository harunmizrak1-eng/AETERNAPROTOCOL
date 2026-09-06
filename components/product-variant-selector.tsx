"use client"

import Link from "next/link"
import { track } from "@vercel/analytics"
import { formatProductPrice } from "@/lib/product-prices"

export type ProductVariant = { slug: string; label: string; price?: number; active: boolean; inStock: boolean }

export function ProductVariantSelector({ variants }: { variants: ProductVariant[] }) {
  if (variants.length < 2) return null
  return <div className="mt-6"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-foreground">Boyut seçin</p><span className="text-xs text-muted-foreground">{variants.length} seçenek</span></div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{variants.map((variant) => <Link key={variant.slug} href={`/urunler/${variant.slug}`} onClick={() => track("Variant Selected", { product: variant.slug })} aria-current={variant.active ? "page" : undefined} className={`rounded-xl border p-3 transition ${variant.active ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-hairline bg-white hover:border-gold/50"}`}><span className="block text-sm font-extrabold text-foreground">{variant.label}</span><span className="mt-1 block text-xs font-semibold text-muted-foreground">{variant.price ? formatProductPrice(variant.price) : "Fiyat için yazın"}</span><span className={`mt-1 block text-[10px] font-semibold ${variant.inStock ? "text-tier-proven" : "text-muted-foreground"}`}>{variant.active ? "Seçili · " : ""}{variant.inStock ? "Stokta" : "Tükendi"}</span></Link>)}</div></div>
}
