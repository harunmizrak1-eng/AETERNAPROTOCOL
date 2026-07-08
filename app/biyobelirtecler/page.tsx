import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { biomarkers } from "@/lib/biomarkers"

const description =
  "ApoB, HbA1c, hs-CRP, HOMA-IR, HRV ve daha fazlası — vaka analizlerinde ve protokollerde kullanılan biyobelirteçlerin kısa, editorial sözlüğü."

export const metadata: Metadata = {
  title: "Biyobelirteç Sözlüğü",
  description,
  alternates: {
    canonical: "/biyobelirtecler",
  },
  openGraph: {
    title: "Biyobelirteç Sözlüğü — ÆTERNA",
    description,
    url: "/biyobelirtecler",
  },
}

export default function BiomarkersPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Sözlük
              </p>
            </div>
            <h1 className="mt-10 max-w-3xl text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-6xl">
              Biyobelirteç Sözlüğü
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Vaka analizlerinde ve protokol sayfalarında geçen her belirteç
              burada açıklanır — ne ölçtüğü, neden önemli olduğu ve nasıl
              yorumlanması gerektiği.
            </p>
          </div>
        </section>

        <section className="px-6 pb-28 sm:pb-36 md:px-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {biomarkers.map((b) => (
              <Link
                key={b.slug}
                href={`/biyobelirtecler/${b.slug}`}
                className="group flex flex-col rounded-sm border border-hairline bg-surface p-8 transition-colors duration-500 hover:border-gold/60"
              >
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground/70">
                  {b.category}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-light tracking-wide text-foreground">
                  {b.shortName}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {b.what}
                </p>
                <span className="mt-6 text-[0.65rem] uppercase tracking-eyebrow text-foreground/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  İncele →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
