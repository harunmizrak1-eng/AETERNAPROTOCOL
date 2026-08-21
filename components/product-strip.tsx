"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

/** Dönen ürün şeridi.
 *
 * zphcstore.com'un ana sayfasında "Best Selling products", "Best Selling
 * HGH" gibi kayan ürün şeritleri var; buradaki de aynı işi görüyor:
 * ziyaretçiyi kategori kategori gezdirmeden doğrudan en çok satan ürüne
 * yönlendirmek.
 *
 * Listeler elle seçilir (bkz. lib/strips.ts) çünkü sitede satış verisi
 * tutulmuyor; hangi ürünün çok sattığını yalnızca satıcı bilir.
 *
 * Kaydırma yerel scroll-snap ile yapılıyor: mobilde parmakla kaydırma
 * kendiliğinden çalışıyor, klavyeyle de erişilebilir kalıyor. Otomatik
 * dönüş; fareyle üzerine gelince, bir kart odaklanınca ve kullanıcı elle
 * kaydırırken durur — insan müdahale ettiğinde şerit onu zorlamaz.
 */
const AUTO_ADVANCE_MS = 3500

export function ProductStrip({
  title,
  slugs,
  href = "/urunler",
  linkLabel,
}: {
  title: string
  /** Gösterilecek ürünler, istenen sırayla. Katalogdan düşen slug sessizce
   * atlanır; böylece katalog güncellemesi ana sayfayı bozamaz. */
  slugs: string[]
  href?: string
  linkLabel?: string
}) {
  const shown = slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const trackRef = useRef<HTMLUListElement>(null)
  const [paused, setPaused] = useState(false)

  /** Bir kart genişliği kadar kaydırır; sona gelindiyse başa döner. */
  const advance = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    const card = track.firstElementChild as HTMLElement | null
    if (!card) return

    // Kart genişliği + aradaki boşluk: iki kartın sol kenarları arasındaki
    // fark, boşluğu ayrıca hesaplamaya gerek bırakmıyor.
    const second = card.nextElementSibling as HTMLElement | null
    const step = second ? second.offsetLeft - card.offsetLeft : card.offsetWidth

    const atEnd =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    const atStart = track.scrollLeft <= 4

    if (direction === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" })
      return
    }
    if (direction === -1 && atStart) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" })
      return
    }
    track.scrollBy({ left: step * direction, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (paused) return

    // Hareket azaltma tercihi açıksa şerit kendiliğinden dönmez; kullanıcı
    // oklarla veya parmakla yine gezebilir.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduced.matches) return

    const id = window.setInterval(() => advance(1), AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, advance])

  return (
    <section
      className="border-b border-hairline px-6 py-10 md:px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            {title}
          </h2>

          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="text-sm font-semibold text-gold transition-opacity hover:opacity-70"
            >
              {linkLabel ?? `Tümü (${products.length})`} →
            </Link>
            <div className="flex gap-1.5">
              <ArrowButton label="Öncekiler" onClick={() => advance(-1)} back />
              <ArrowButton label="Sonrakiler" onClick={() => advance(1)} />
            </div>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
        >
          {shown.map((product) => (
            <li
              key={product.slug}
              className="w-[calc(50%-0.5rem)] shrink-0 snap-start sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ArrowButton({
  label,
  onClick,
  back,
}: {
  label: string
  onClick: () => void
  back?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:border-gold hover:text-gold"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 ${back ? "rotate-180" : ""}`}
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  )
}
