"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

/** Başlıktaki ürün araması.
 *
 * zphcstore.com'un başlığında logonun hemen altında bir arama kutusu var
 * (WooCommerce ürün araması, "Search…" placeholder'ı ve sağda ikon butonu).
 * Bizde arama yalnızca /urunler sayfasının içinde duruyordu; ana sayfaya
 * gelen ziyaretçi aradığını yazacak bir yer bulamıyordu. Bu bileşen o
 * boşluğu kapatır ve sorguyu /urunler?q=... adresine taşır.
 */
export function HeaderSearch() {
  const router = useRouter()
  const [value, setValue] = useState("")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    router.push(q ? `/urunler?q=${encodeURIComponent(q)}` : "/urunler")
  }

  return (
    <form role="search" onSubmit={submit} className="flex w-full">
      <label htmlFor="header-search" className="sr-only">
        Ürün ara
      </label>
      <input
        id="header-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ürün ara…"
        className="min-w-0 flex-1 rounded-l-full border border-r-0 border-input bg-background px-4 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold"
      />
      <button
        type="submit"
        aria-label="Ara"
        className="shrink-0 rounded-r-full border border-gold bg-gold px-4 py-2 text-primary-foreground transition-colors hover:bg-gold/90"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  )
}
