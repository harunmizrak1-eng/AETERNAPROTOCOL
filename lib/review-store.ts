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
    const response = await fetch(`${current.url}/rest/v1/reviews?${params}`, { headers: { apikey: current.key, Authorization: `Bearer ${current.key}` }, cache: "no-store" })
    return response.ok ? (await response.json()) as PublicReview[] : []
  } catch {
    return []
  }
}
