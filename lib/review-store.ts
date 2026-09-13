export type PublicReview = {
  id: string
  product_slug: string | null
  product_name: string | null
  display_name: string
  rating: number
  body: string
  created_at: string
}

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  return url && key ? { url, key } : null
}

export async function getApprovedReviews(productSlug?: string, limit = 6): Promise<PublicReview[]> {
  const current = config()
  if (!current) return []
  const params = new URLSearchParams({ select: "id,product_slug,product_name,display_name,rating,body,created_at", status: "eq.approved", order: "created_at.desc", limit: String(limit) })
  if (productSlug) params.set("product_slug", `eq.${productSlug}`)
  try {
    /* cache: "no-store" bu isteği kullanan her rotayı tamamen dinamik
     * yapıyordu: ana sayfa ve bütün ürün sayfaları her ziyarette sunucuda
     * yeniden üretiliyor, Vercel ve Cloudflare önbelleği hiç devreye
     * girmiyordu (x-vercel-cache: MISS, cache-control: no-store). Ölçüm:
     * ürün sayfasında TTFB 1,10 sn, önbelleğe giren kütüphane sayfasında
     * 0,26 sn. Yorumların saniyesi saniyesine taze olması gerekmiyor;
     * beş dakikalık yenileme ile rotalar yeniden önbelleğe girebiliyor. */
    const response = await fetch(`${current.url}/rest/v1/reviews?${params}`, { headers: { apikey: current.key, Authorization: `Bearer ${current.key}` }, next: { revalidate: 300 } })
    return response.ok ? (await response.json()) as PublicReview[] : []
  } catch {
    return []
  }
}
