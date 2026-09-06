"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { PublicReview } from "@/lib/review-store"
import { ReviewCards } from "@/components/review-cards"

export function ProductReviews({ productSlug, productName, reviews, reviewCount, averageRating }: { productSlug: string; productName: string; reviews: PublicReview[]; reviewCount: number; averageRating: number }) {
  const [filter, setFilter] = useState<number | null>(null)
  const roundedRating = Math.round(averageRating)
  const distribution = useMemo(() => [5, 4, 3, 2, 1].map((rating) => ({ rating, count: reviews.filter((review) => review.rating === rating).length })), [reviews])
  const visible = filter ? reviews.filter((review) => review.rating === filter) : reviews
  return <section id="yorumlar" className="scroll-mt-24 mt-8 overflow-hidden rounded-2xl border border-hairline bg-[#f7fbfe]" aria-labelledby="product-reviews-title">
    <div className="grid gap-5 border-b border-hairline p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8">
      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-white shadow-sm"><span className="text-2xl font-extrabold text-foreground">{reviewCount ? averageRating.toFixed(1) : "—"}</span><span className="text-xs tracking-[0.08em] text-gold">{reviewCount ? <>{"★".repeat(roundedRating)}<span className="text-slate-200">{"★".repeat(5 - roundedRating)}</span></> : "☆☆☆☆☆"}</span></div>
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Müşteri yorumları</p><h2 id="product-reviews-title" className="mt-2 text-2xl font-bold tracking-tight text-foreground">{reviewCount ? `${reviewCount} müşteri deneyimi` : "İlk yorumu siz bırakın"}</h2><p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{productName}</p></div>
      <Link href={`/yorum?urun=${encodeURIComponent(productSlug)}`} className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-bold text-white transition hover:opacity-90">Yorum yap →</Link>
    </div>
    {reviewCount > 0 && <div className="grid gap-6 border-b border-hairline bg-white/70 p-6 sm:grid-cols-[240px_1fr] sm:p-8"><div className="space-y-2">{distribution.map(({ rating, count }) => { const percent = reviewCount ? Math.round((count / reviewCount) * 100) : 0; return <button type="button" key={rating} onClick={() => setFilter(filter === rating ? null : rating)} className={`grid w-full grid-cols-[38px_1fr_34px] items-center gap-2 rounded-lg px-2 py-1 text-xs transition ${filter === rating ? "bg-gold/10" : "hover:bg-surface"}`}><span className="font-bold">{rating} ★</span><span className="h-1.5 overflow-hidden rounded-full bg-slate-200"><span className="block h-full rounded-full bg-gold" style={{ width: `${percent}%` }} /></span><span className="text-right text-muted-foreground">{count}</span></button>})}</div><div><p className="text-sm font-bold text-foreground">Gerçek müşteri deneyimleri</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Yorumlar ürün adı ve tarih ile yayımlanır. “Doğrulanmış” etiketi yalnızca sipariş kaydı eşleştirilebildiğinde gösterilecektir.</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => setFilter(null)} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${filter === null ? "border-gold bg-gold text-white" : "border-hairline bg-white"}`}>Tümü</button>{distribution.filter((item) => item.count).map((item) => <button type="button" key={item.rating} onClick={() => setFilter(item.rating)} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${filter === item.rating ? "border-gold bg-gold text-white" : "border-hairline bg-white"}`}>{item.rating} yıldız</button>)}</div></div></div>}
    <div className="p-6 sm:p-8"><ReviewCards reviews={visible} /></div>
  </section>
}
