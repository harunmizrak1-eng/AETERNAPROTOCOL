import Link from "next/link"
import { getApprovedReviews } from "@/lib/review-store"
import { ReviewCards } from "@/components/review-cards"

export async function Reviews() {
  const reviews = await getApprovedReviews(undefined, 6)
  return <section className="border-b border-hairline bg-surface px-6 py-12 md:px-10 md:py-16">
    <div className="mx-auto max-w-7xl rounded-2xl border border-hairline bg-background p-6 shadow-[0_14px_45px_rgba(0,49,76,0.06)] sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Müşteri yorumları</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ürünleri kullananlar ne diyor?</h2></div>
        <Link href="/yorum" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-gold/40 px-5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-white">Yorum bırak →</Link>
      </div>
      <ReviewCards reviews={reviews} />
    </div>
  </section>
}
