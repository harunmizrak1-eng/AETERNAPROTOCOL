"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { siteName } from "@/lib/site"
import { HeaderSearch } from "@/components/header-search"

/* Şeritte dönen uyarılar. Hepsi doğrulanabilir, gerçek bilgi: taklit
 * ürünlere karşı üreticinin kendi doğrulama sistemi, tek resmi sipariş
 * kanalımız ve resmi distribütörlük. Uydurma bir "sahte site" adı
 * vermiyoruz — zphcstore.com kendi taklitçilerini ismen teşhir ediyor,
 * ama bizim adımıza öyle bir tespit yapılmadı. */
const TICKER_MESSAGES = [
  "Sahte satıcılara dikkat. Siparişinizi sadece bizim WhatsApp hattımızdan verin.",
  "Resmî Türkiye alan adımız zphctr.com — benzer alan adları bize ait değildir.",
  "Aldığınız her kutunun kodunu validation.zphc.com adresinden doğrulayın.",
  "ZPHC Türkiye resmi distribütörüyüz. Ürünler doğrudan depomuzdan çıkıyor.",
]

const LINKS = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/peptidler", label: "Kütüphane" },
  { href: "/dogrulama", label: "Doğrulama" },
  { href: "/journal", label: "Journal" },
  { href: "/metodoloji", label: "Metodoloji" },
]

const LANGUAGE_LINKS = [
  { href: "/", label: "TR", name: "Türkçe" },
  { href: "/en", label: "EN", name: "English" },
  { href: "/es", label: "ES", name: "Español" },
  { href: "/ar", label: "AR", name: "العربية" },
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
    /* Not: Bu başlık bilerek position:fixed DEĞİL. Sabitken yüksekliği her
     * değiştiğinde (rozet, uyarı şeridi, arama satırı) her sayfanın <main>
     * dolgusunu elle güncellemek gerekiyordu ve bu üç kez içerik-nav
     * çakışmasına yol açtı. Normal akışta durunca kendi yerini kapladığı
     * için hiçbir sayfada telafi dolgusu gerekmiyor; kalıcı çözüm bu. */
    <header className="relative z-50 border-b border-hairline bg-background">
      {/* Kayan uyarı şeridi. Metin iki kez basılır — animasyon birinci
          kopyayı tam genişliği kadar kaydırdığında ikincisi yerine geçer,
          böylece döngü dikişsiz görünür. */}
      <div className="ticker-mask overflow-hidden bg-[#ff5454] py-1.5 text-[11px] font-medium text-white sm:text-xs">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="ticker-item" aria-hidden={copy === 1}>
              {TICKER_MESSAGES.map((msg) => (
                <span key={msg} className="mx-6 inline-flex items-center gap-1.5">
                  <span aria-hidden="true">⚠</span>
                  {msg}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-hairline bg-surface/70 px-4 py-2 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-end">
          <nav aria-label="Dil seçimi" className="flex shrink-0 items-center gap-1">
            {LANGUAGE_LINKS.map((language) => (
              <Link key={language.label} href={language.href} hrefLang={language.label.toLowerCase()} lang={language.label.toLowerCase()} title={language.name} aria-label={language.name} className={`inline-flex min-h-8 min-w-8 items-center justify-center rounded-full border px-2 text-[11px] font-bold transition-colors ${language.label === "TR" ? "border-gold/50 bg-gold/10 text-gold" : "border-hairline bg-background text-muted-foreground hover:border-gold/50 hover:text-gold"}`}>
                {language.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-70"
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
          <span className="hidden shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold min-[380px]:inline-flex">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-2.5 w-2.5"
            >
              <path
                fillRule="evenodd"
                d="M10 1.5 3 4.6v5.1c0 4.4 3 8.4 7 9.3 4-.9 7-4.9 7-9.3V4.6L10 1.5Zm3.6 6.4-4.2 4.2a.75.75 0 0 1-1.06 0L6.4 10.15a.75.75 0 1 1 1.06-1.06l1.42 1.42 3.67-3.67a.75.75 0 1 1 1.06 1.06Z"
                clipRule="evenodd"
              />
            </svg>
            Resmi Distribütör
          </span>
        </div>

        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
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
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
          {open ? "Kapat" : "Menü"}
        </button>
      </nav>

      {/* Arama satırı: gerçek sitede logonun altında duran ürün araması. */}
      <div className="border-t border-hairline px-6 py-2.5 md:px-10">
        <div className="mx-auto max-w-6xl">
          <HeaderSearch />
        </div>
      </div>

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
                className="flex min-h-[44px] items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
