"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { siteName } from "@/lib/site"

const LINKS = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/peptidler", label: "Kütüphane" },
  { href: "/dogrulama", label: "Doğrulama" },
  { href: "/bayilik", label: "Bayilik" },
  { href: "/journal", label: "Journal" },
  { href: "/metodoloji", label: "Metodoloji" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="transition-opacity hover:opacity-70"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/zphc-logo.png"
            alt={siteName}
            width={250}
            height={42}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground ${
                link.label === "Journal" || link.label === "Metodoloji"
                  ? "hidden lg:inline"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
          {open ? "Kapat" : "Menü"}
        </button>
      </nav>

      <div
        id="mobile-nav-panel"
        className={`overflow-hidden border-t border-hairline transition-[max-height] duration-300 ease-in-out sm:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {LINKS.map((link) => (
            <li key={link.label} className="border-b border-hairline last:border-b-0">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
