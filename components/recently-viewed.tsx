"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { track } from "@vercel/analytics"
import { formatProductPrice } from "@/lib/product-prices"

type RecentProduct = { slug: string; name: string; image?: string; price?: number }
const storageKey = "zphctr-recent-v1"

export function RecentlyViewed({ product }: { product: RecentProduct }) {
  const [items, setItems] = useState<RecentProduct[]>([])
  useEffect(() => {
    let previous: RecentProduct[] = []
    try { previous = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as RecentProduct[] } catch { localStorage.removeItem(storageKey) }
    setItems(previous.filter((item) => item.slug !== product.slug).slice(0, 5))
    localStorage.setItem(storageKey, JSON.stringify([product, ...previous.filter((item) => item.slug !== product.slug)].slice(0, 6)))
    track("Product Viewed", { product: product.slug })
  }, [product])

  if (!items.length) return null
  return <section className="mt-10 border-t border-hairline pt-8" aria-labelledby="recent-title"><h2 id="recent-title" className="text-xl font-bold tracking-tight">Son görüntüledikleriniz</h2><ul className="-mx-6 mt-5 flex snap-x gap-3 overflow-x-auto px-6 pb-3 sm:mx-0 sm:px-0">{items.map((item) => <li key={item.slug} className="w-44 shrink-0 snap-start"><Link href={`/urunler/${item.slug}`} className="block rounded-2xl border border-hairline bg-white p-3 transition hover:border-gold/50"><div className="rounded-xl bg-surface p-2">{item.image && <Image src={item.image} alt="" width={180} height={180} className="aspect-square w-full object-contain" />}</div><p className="mt-2 line-clamp-2 min-h-10 text-sm font-bold leading-5">{item.name}</p><p className="mt-2 text-sm font-extrabold text-gold">{item.price ? formatProductPrice(item.price) : "Fiyat için yazın"}</p></Link></li>)}</ul></section>
}
