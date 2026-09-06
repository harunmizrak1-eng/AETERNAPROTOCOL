import type { PublicReview } from "@/lib/review-store"

export function ReviewCards({ reviews }: { reviews: PublicReview[] }) {
  if (!reviews.length) return <p className="mt-4 text-sm leading-6 text-muted-foreground">Onaylı müşteri yorumları burada yayımlanacak.</p>
  return <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {reviews.map((review) => <li key={review.id} className="rounded-xl border border-hairline bg-background p-5">
      <p className="text-sm tracking-[0.18em] text-gold" aria-label={`${review.rating} yıldız`}>{"★".repeat(review.rating)}<span className="text-slate-200">{"★".repeat(5 - review.rating)}</span></p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">“{review.body}”</p>
      <p className="mt-4 text-sm font-bold text-foreground">{review.display_name}</p>
      {review.product_name && <p className="mt-0.5 text-xs text-muted-foreground">{review.product_name}</p>}
      <time className="mt-2 block text-xs text-muted-foreground" dateTime={review.created_at}>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(new Date(review.created_at))}</time>
    </li>)}
  </ul>
}
