"use client"

import Link from "next/link"
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "zphc-compare-products"
const MAX_PRODUCTS = 3

type CompareContextValue = {
  slugs: string[]
  toggle: (slug: string) => void
  clear: () => void
}

const CompareContext = createContext<CompareContextValue | null>(null)

export function ProductCompareProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
      if (Array.isArray(stored)) {
        setSlugs(stored.filter((slug): slug is string => typeof slug === "string").slice(0, MAX_PRODUCTS))
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
  }, [slugs])

  const value = useMemo<CompareContextValue>(
    () => ({
      slugs,
      toggle(slug) {
        setSlugs((current) => {
          if (current.includes(slug)) return current.filter((item) => item !== slug)
          if (current.length >= MAX_PRODUCTS) return current
          return [...current, slug]
        })
      },
      clear() {
        setSlugs([])
      },
    }),
    [slugs],
  )

  return (
    <CompareContext.Provider value={value}>
      {children}
      <CompareTray />
    </CompareContext.Provider>
  )
}

function useCompare() {
  const context = useContext(CompareContext)
  if (!context) throw new Error("ProductCompareProvider bulunamadı")
  return context
}

export function CompareButton({ slug, name }: { slug: string; name: string }) {
  const { slugs, toggle } = useCompare()
  const selected = slugs.includes(slug)
  const disabled = !selected && slugs.length >= MAX_PRODUCTS

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${name} ürününü karşılaştırmaya ${selected ? "kaldır" : "ekle"}`}
      disabled={disabled}
      onClick={() => toggle(slug)}
      className={`inline-flex min-h-9 items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? "border-gold bg-gold/10 text-gold"
          : "border-hairline text-muted-foreground hover:border-gold/50 hover:text-gold"
      }`}
    >
      {selected ? "Seçildi" : "Karşılaştır"}
    </button>
  )
}

function CompareTray() {
  const { slugs, clear } = useCompare()
  if (slugs.length === 0) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-gold/20 bg-foreground px-4 py-3 text-background shadow-2xl sm:bottom-6">
      <div>
        <p className="text-sm font-bold">{slugs.length} ürün seçildi</p>
        <button
          type="button"
          onClick={clear}
          className="mt-0.5 text-xs text-background/65 hover:text-background"
        >
          Seçimi temizle
        </button>
      </div>
      <Link
        href={`/karsilastir?urunler=${slugs.join(",")}`}
        className="rounded-full bg-background px-4 py-2 text-xs font-bold text-foreground"
      >
        Karşılaştır →
      </Link>
    </div>
  )
}
