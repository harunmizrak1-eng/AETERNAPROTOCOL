import Link from "next/link"
import { getApprovedReviews } from "@/lib/review-store"
import { ReviewCards } from "@/components/review-cards"

export async function ProductReviews({ productSlug, productName }: { productSlug: string; productName: string }) {
  const reviews = await getApprovedReviews(productSlug, 6)
  return <section className="mt-12 border-t border-hairline pt-10" aria-labelledby="product-reviews-title">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Doğrulanmış deneyimler</p><h2 id="product-reviews-title" className="mt-2 text-2xl font-bold tracking-tight text-foreground">{productName} yorumları</h2></div>
      <Link href={`/yorum?urun=${encodeURIComponent(productSlug)}`} className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold/40 px-5 text-sm font-bold text-gold hover:bg-gold hover:text-white">Bu ürüne yorum yap →</Link>
    </div>
    <ReviewCards reviews={reviews} />
  </section>
}
