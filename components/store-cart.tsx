"use client"

import Image from "next/image"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { track } from "@vercel/analytics"
import { formatProductPrice } from "@/lib/product-prices"
import { whatsappLink } from "@/lib/contact"

export type CartProduct = {
  slug: string
  name: string
  image?: string
  price: number
}

type CartItem = CartProduct & { quantity: number }

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  open: boolean
  setOpen: (open: boolean) => void
  add: (product: CartProduct, quantity?: number) => void
  change: (slug: string, quantity: number) => void
  remove: (slug: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = "zphctr-cart-v1"

export function StoreCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setItems(JSON.parse(saved) as CartItem[])
    } catch {
      localStorage.removeItem(storageKey)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, ready])

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    open,
    setOpen(next) {
      setOpen(next)
      if (next) track("Cart Opened")
    },
    add(product, quantity = 1) {
      setItems((current) => {
        const existing = current.find((item) => item.slug === product.slug)
        if (existing) return current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item)
        return [...current, { ...product, quantity }]
      })
      setOpen(true)
      track("Add To Cart", { product: product.slug, quantity, price: product.price })
    },
    change(slug, quantity) {
      if (quantity < 1) return
      setItems((current) => current.map((item) => item.slug === slug ? { ...item, quantity } : item))
      track("Cart Quantity Changed", { product: slug, quantity })
    },
    remove(slug) {
      setItems((current) => current.filter((item) => item.slug !== slug))
    },
  }), [items, open, ready])

  return <CartContext.Provider value={value}>{children}<CartDrawer /></CartContext.Provider>
}

function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error("Store cart must be used inside StoreCartProvider")
  return value
}

export function CartButton({ compact = false }: { compact?: boolean }) {
  const { count, setOpen } = useCart()
  return <button type="button" onClick={() => setOpen(true)} aria-label={`Sepeti aç, ${count} ürün`} className="relative inline-flex min-h-10 items-center gap-2 rounded-full border border-hairline bg-white px-3 text-sm font-bold text-foreground transition hover:border-gold/50">
    <CartIcon />
    {!compact && <span>Sepet</span>}
    {count > 0 && <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-white">{count}</span>}
  </button>
}

export function AddToCartButton({ product, label = "Sepete ekle", className = "" }: { product: CartProduct; label?: string; className?: string }) {
  const { add } = useCart()
  return <button type="button" onClick={() => add(product)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-white transition hover:bg-gold/90 ${className}`}>
    <CartIcon /> {label}
  </button>
}

export function ProductBuyActions({ product, inStock }: { product: CartProduct; inStock: boolean }) {
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)
  return <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
    <div className="flex min-h-12 items-center justify-between rounded-full border border-hairline bg-white px-2" aria-label="Adet seçimi">
      <button type="button" className="h-9 w-9 rounded-full text-xl text-muted-foreground hover:bg-surface" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Adedi azalt">−</button>
      <span className="min-w-8 text-center text-sm font-bold">{quantity}</span>
      <button type="button" className="h-9 w-9 rounded-full text-xl text-muted-foreground hover:bg-surface" onClick={() => setQuantity((q) => Math.min(20, q + 1))} aria-label="Adedi artır">+</button>
    </div>
    <button type="button" disabled={!inStock} onClick={() => add(product, quantity)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-base font-bold text-white transition hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50"><CartIcon /> {inStock ? "Sepete ekle" : "Stokta yok"}</button>
  </div>
}

function CartDrawer() {
  const { items, count, total, open, setOpen, change, remove } = useCart()
  const message = [
    "Merhaba, aşağıdaki ürünleri sipariş vermek istiyorum:",
    "",
    ...items.map((item) => `• ${item.quantity} × ${item.name} — ${formatProductPrice(item.price * item.quantity)}`),
    "",
    `Toplam: ${formatProductPrice(total)}`,
    "Stok durumunu ve teslimat bilgisini teyit eder misiniz?",
  ].join("\n")

  return <>
    {open && <button type="button" aria-label="Sepeti kapat" onClick={() => setOpen(false)} className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-[2px]" />}
    <aside aria-label="Sipariş sepeti" aria-hidden={!open} className={`fixed inset-y-0 right-0 z-[80] flex w-[min(92vw,420px)] flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-hairline px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">WhatsApp sepeti</p><h2 className="mt-1 text-xl font-bold">{count ? `${count} ürün` : "Sepetiniz boş"}</h2></div><button type="button" onClick={() => setOpen(false)} className="h-10 w-10 rounded-full border border-hairline text-xl" aria-label="Sepeti kapat">×</button></div>
      <div className="flex-1 overflow-y-auto p-5">
        {!items.length ? <p className="rounded-xl bg-surface p-5 text-sm leading-6 text-muted-foreground">Fiyatı görünen ürünleri sepete ekleyin. Siparişiniz tek bir mesaj halinde resmî WhatsApp hattımıza iletilir.</p> : <ul className="space-y-4">{items.map((item) => <li key={item.slug} className="grid grid-cols-[64px_1fr] gap-3 rounded-xl border border-hairline p-3">
          <div className="rounded-lg bg-surface p-1">{item.image && <Image src={item.image} alt="" width={64} height={64} className="aspect-square object-contain" />}</div>
          <div className="min-w-0"><p className="line-clamp-2 text-sm font-bold leading-5">{item.name}</p><p className="mt-1 text-sm font-extrabold text-gold">{formatProductPrice(item.price * item.quantity)}</p><div className="mt-2 flex items-center justify-between"><div className="flex items-center rounded-full border border-hairline"><button type="button" onClick={() => change(item.slug, item.quantity - 1)} className="h-8 w-8" aria-label="Azalt">−</button><span className="w-7 text-center text-xs font-bold">{item.quantity}</span><button type="button" onClick={() => change(item.slug, item.quantity + 1)} className="h-8 w-8" aria-label="Artır">+</button></div><button type="button" onClick={() => remove(item.slug)} className="text-xs font-semibold text-muted-foreground hover:text-red-600">Kaldır</button></div></div>
        </li>)}</ul>}
      </div>
      {items.length > 0 && <div className="border-t border-hairline bg-surface/60 p-5"><div className="mb-4 flex items-center justify-between"><span className="text-sm font-semibold text-muted-foreground">Toplam</span><strong className="text-2xl">{formatProductPrice(total)}</strong></div><a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => track("WhatsApp Cart Checkout", { item_count: count, total })} className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#25D366] px-5 text-base font-bold text-white">WhatsApp’tan tamamla →</a><p className="mt-3 text-center text-xs leading-5 text-muted-foreground">Ödeme WhatsApp içinde yapılmaz; sipariş ve stok bilgisi resmî hatta teyit edilir.</p></div>}
    </aside>
  </>
}

function CartIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
}
