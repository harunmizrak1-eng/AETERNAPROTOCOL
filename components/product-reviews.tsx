import Link from "next/link"
import type { PublicReview } from "@/lib/review-store"
import { ReviewCards } from "@/components/review-cards"

export function ProductReviews({ productSlug, productName, reviews, reviewCount, averageRating }: { productSlug: string; productName: string; reviews: PublicReview[]; reviewCount: number; averageRating: number }) {
  const roundedRating = Math.round(averageRating)
  return <section id="yorumlar" className="scroll-mt-24 mt-8 overflow-hidden rounded-2xl border border-hairline bg-[#f7fbfe]" aria-labelledby="product-reviews-title">
    <div className="grid gap-5 border-b border-hairline p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8">
      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-white shadow-sm"><span className="text-2xl font-extrabold text-foreground">{reviewCount ? averageRating.toFixed(1) : "—"}</span><span className="text-xs tracking-[0.08em] text-gold">{reviewCount ? <>{"★".repeat(roundedRating)}<span className="text-slate-200">{"★".repeat(5 - roundedRating)}</span></> : "☆☆☆☆☆"}</span></div>
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Müşteri yorumları</p><h2 id="product-reviews-title" className="mt-2 text-2xl font-bold tracking-tight text-foreground">{reviewCount ? `${reviewCount} müşteri deneyimi` : "İlk yorumu siz bırakın"}</h2><p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{productName}</p></div>
      <Link href={`/yorum?urun=${encodeURIComponent(productSlug)}`} className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-bold text-white transition hover:opacity-90">Yorum yap →</Link>
    </div>
    <div className="p-6 sm:p-8"><ReviewCards reviews={reviews} /></div>
  </section>
}
