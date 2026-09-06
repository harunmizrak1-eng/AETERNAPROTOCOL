import Link from "next/link"
import { getApprovedReviews } from "@/lib/review-store"
import { ReviewCards } from "@/components/review-cards"

export async function Reviews() {
  const reviews = await getApprovedReviews(undefined, 6)
  return <section className="border-b border-hairline bg-white px-6 py-12 md:px-10 md:py-16">
    <div className="mx-auto max-w-7xl border-l-4 border-gold bg-[#f4f8fb] p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Müşteri defteri · 03</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Yorumu sahibinden okuyun.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Başka sitelerden alıntı yok. Buraya bırakılan yorum, ürün adı ve tarihiyle görünür.</p></div>
        <Link href="/yorum" className="inline-flex min-h-11 shrink-0 items-center justify-center border border-gold px-5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-white">Yorum bırak →</Link>
      </div>
      <ReviewCards reviews={reviews} />
    </div>
  </section>
}
