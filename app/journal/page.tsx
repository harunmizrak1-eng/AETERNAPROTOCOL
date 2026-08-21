import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { JournalList } from "@/components/journal-list"
import { articles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Peptidler, longevity ve biohacking üzerine kanıt temelli Türkçe yazılar.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "Journal",
    description:
      "Peptidler, longevity ve biohacking üzerine kanıt temelli Türkçe yazılar.",
    url: "/journal",
  },
}

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative z-10 bg-background">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold text-gold">Journal</p>
            <h1 className="mt-10 max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
              Yazılar
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Peptidler, longevity ve biohacking üzerine kanıt temelli notlar.
              Trend değil, mekanizma ve veri. Haftalık ritimde, yalnızca
              söylemeye değer bir şey olduğunda yayımlanır.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-4xl">
            <JournalList articles={articles} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
