import Image from "next/image"
import Link from "next/link"

import { navLinks, siteName, siteTagline, whatsappDisplay, whatsappLink } from "@/lib/site"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="bg-zphc-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs">
          <span>{siteTagline}</span>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            WhatsApp {whatsappDisplay}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/zphc-logo.png"
            alt={siteName}
            width={250}
            height={42}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label="Ana menü">
          <ul className="flex items-center gap-1 text-sm sm:gap-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded px-2 py-1.5 font-medium text-ink hover:text-zphc-blue"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface-alt">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-sm font-bold text-zphc-navy">{siteName}</p>
          <p className="mt-2 text-sm text-ink-soft">{siteTagline}</p>
        </div>

        <div>
          <p className="text-xs font-bold tracking-eyebrow text-ink-soft uppercase">
            Menü
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink hover:text-zphc-blue">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold tracking-eyebrow text-ink-soft uppercase">
            İletişim
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-zphc-blue hover:underline"
          >
            {whatsappDisplay}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-ink-soft">
          Bu sitedeki ürün bilgileri üreticinin resmi ürün verisinden alınmıştır
          ve yalnızca bilgilendirme amaçlıdır. Hiçbir içerik tıbbi tavsiye
          niteliği taşımaz, teşhis veya tedavi amacıyla kullanılamaz. Sipariş
          bu site üzerinden tamamlanmaz.
        </p>
      </div>
    </footer>
  )
}
