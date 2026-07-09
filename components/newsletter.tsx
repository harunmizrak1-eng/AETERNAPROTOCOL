import Link from "next/link"
import { instagramUrl } from "@/lib/contact"

// Note: an email newsletter was intentionally removed until a real provider
// is wired up. A form that silently captures nothing is worse than none in a
// trust-first brand, so this points to the channels that actually publish.
export function Newsletter() {
  return (
    <section className="border-t border-hairline px-6 py-24 md:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Longevity Notları
          </p>
          <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
        </div>

        <h2 className="mt-8 text-balance font-serif text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
          Süreci takip edin.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Yeni araştırmalar, bileşik notları ve protokol içgörüleri Journal'da,
          haftalık ritimde ve yalnızca değerli olduğunda yayımlanır. Sürecin
          içinden içerik ise Instagram'da paylaşılır.
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/journal"
            className="w-full rounded-sm border border-gold/60 px-8 py-3.5 text-center text-[0.65rem] uppercase tracking-eyebrow font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground sm:w-auto"
          >
            Journal'ı İncele
          </Link>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-sm border border-hairline px-8 py-3.5 text-center text-[0.65rem] uppercase tracking-eyebrow font-medium text-foreground/80 transition-colors duration-300 hover:border-gold/60 hover:bg-gold hover:text-primary-foreground sm:w-auto"
          >
            Instagram'da Takip Et
          </a>
        </div>
      </div>
    </section>
  )
}
