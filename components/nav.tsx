import Link from "next/link"

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-serif text-lg tracking-wordmark text-foreground transition-opacity hover:opacity-70"
        >
          ÆTERNA
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/#kategoriler"
            className="hidden text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Odak Alanları
          </Link>
          <Link
            href="/peptidler"
            className="text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground"
          >
            Peptid Kütüphanesi
          </Link>
          <Link
            href="/journal"
            className="hidden text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Journal
          </Link>
          <Link
            href="/longevity-skoru"
            className="hidden text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground lg:inline"
          >
            Longevity Skoru
          </Link>
          <Link
            href="/#danismanlik"
            className="hidden text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Danışmanlık
          </Link>
        </div>
      </nav>
    </header>
  )
}
