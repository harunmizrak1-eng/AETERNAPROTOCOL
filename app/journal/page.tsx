import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/final-cta"
import { Reveal } from "@/components/reveal"
import { articles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Journal — ÆTERNA",
  description:
    "Peptidler, longevity ve biohacking üzerine kanıt temelli Türkçe yazılar.",
}

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Journal
              </p>
            </div>
            <h1 className="mt-10 max-w-2xl text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-6xl">
              Yazılar
            </h1>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
              Peptidler, longevity ve biohacking üzerine kanıt temelli notlar.
              Trend değil, mekanizma ve veri.
            </p>
          </div>
        </section>

        <section className="px-6 pb-28 sm:pb-36 md:px-10">
          <div className="mx-auto flex max-w-4xl flex-col">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  href={`/journal/${a.slug}`}
                  className="group flex flex-col border-t border-hairline py-10 transition-colors last:border-b hover:border-gold/40"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                      {a.category}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground/50">
                      {a.readMinutes} dk okuma
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-light tracking-wide text-foreground transition-colors group-hover:text-gold sm:text-3xl">
                    {a.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                    {a.excerpt}
                  </p>
                  <span className="mt-6 text-[0.65rem] uppercase tracking-eyebrow text-foreground/70 transition-opacity group-hover:opacity-70">
                    Oku →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
