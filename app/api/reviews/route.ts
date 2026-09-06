import { NextResponse } from "next/server"
import { getProduct } from "@/lib/catalog"

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) return NextResponse.json({ error: "Yorum sistemi henüz etkin değil." }, { status: 503 })
  let input: Record<string, unknown>
  try { input = await request.json() } catch { return NextResponse.json({ error: "Geçersiz gönderim." }, { status: 400 }) }
  if (input.website) return NextResponse.json({ ok: true })
  const displayName = String(input.displayName ?? "").trim()
  const body = String(input.body ?? "").trim()
  const productSlug = String(input.productSlug ?? "").trim()
  const rating = Number(input.rating)
  const consent = input.consent === true
  const product = productSlug ? getProduct(productSlug) : undefined
  if (displayName.length < 2 || displayName.length > 40) return NextResponse.json({ error: "İsim 2–40 karakter olmalı." }, { status: 400 })
  if (body.length < 20 || body.length > 700) return NextResponse.json({ error: "Yorum 20–700 karakter olmalı." }, { status: 400 })
  if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !consent) return NextResponse.json({ error: "Puan ve yayın izni gerekli." }, { status: 400 })
  if (productSlug && !product) return NextResponse.json({ error: "Seçilen ürün bulunamadı." }, { status: 400 })
  const response = await fetch(`${url}/rest/v1/reviews`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ display_name: displayName, body, rating, product_slug: product?.slug ?? null, product_name: product?.name ?? null }),
  })
  if (!response.ok) return NextResponse.json({ error: "Yorum kaydedilemedi. Lütfen tekrar deneyin." }, { status: 502 })
  return NextResponse.json({ ok: true })
}
