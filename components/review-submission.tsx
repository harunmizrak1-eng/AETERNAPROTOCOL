"use client"

import { useState } from "react"
import { products } from "@/lib/catalog"

export function ReviewSubmission({ defaultProductSlug = "" }: { defaultProductSlug?: string }) {
  const [displayName, setDisplayName] = useState("")
  const [productSlug, setProductSlug] = useState(defaultProductSlug)
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState("")
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<"idle" | "sending" | "done">("idle")
  const [error, setError] = useState("")

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("sending")
    setError("")
    const form = new FormData(event.currentTarget)
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, productSlug, rating, body, consent, website: form.get("website") }),
    })
    const result = (await response.json().catch(() => ({}))) as { error?: string }
    if (!response.ok) {
      setError(result.error ?? "Yorum gönderilemedi.")
      setState("idle")
      return
    }
    setState("done")
  }

  if (state === "done") return <div role="status" className="rounded-2xl border border-tier-proven/30 bg-tier-proven/5 p-6 text-sm font-semibold text-tier-proven">Yorumunuz alındı. Kontrol edildikten sonra yayımlanacak.</div>

  return <form className="w-full min-w-0 rounded-2xl border border-hairline bg-background p-5 shadow-[0_18px_60px_rgba(0,49,76,0.08)] sm:p-7" onSubmit={submit}>
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <div className="grid min-w-0 gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-semibold">İsim veya baş harfler<input required minLength={2} maxLength={40} value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="min-h-11 min-w-0 w-full rounded-lg border border-hairline bg-white px-3 font-normal outline-none focus:border-gold" placeholder="Örn. H.M." /></label>
      <label className="grid gap-1.5 text-sm font-semibold">Satın aldığınız ürün<select value={productSlug} onChange={(event) => setProductSlug(event.target.value)} className="min-h-11 min-w-0 w-full rounded-lg border border-hairline bg-white px-3 font-normal outline-none focus:border-gold"><option value="">Genel alışveriş deneyimi</option>{products.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
    </div>
    <fieldset className="mt-4"><legend className="text-sm font-semibold">Puanınız</legend><div className="mt-2 flex gap-2" aria-label="1 ile 5 yıldız arasında puan">{[1,2,3,4,5].map((value) => <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} yıldız`} aria-pressed={rating === value} className={`text-2xl ${value <= rating ? "text-gold" : "text-slate-300"}`}>★</button>)}</div></fieldset>
    <label className="mt-4 grid gap-1.5 text-sm font-semibold">Deneyiminiz<textarea required minLength={20} maxLength={700} rows={5} value={body} onChange={(event) => setBody(event.target.value)} className="min-w-0 w-full rounded-lg border border-hairline bg-white p-3 font-normal leading-6 outline-none focus:border-gold" placeholder="Ürün, paketleme, teslimat ve iletişim deneyiminizi yazın." /></label>
    <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-muted-foreground"><input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--gold)]" />İsim/baş harf, ürün, puan ve yorumumun zphctr.com üzerinde yayımlanmasına izin veriyorum.</label>
    {error && <p role="alert" className="mt-4 text-sm font-semibold text-[#c83f3f]">{error}</p>}
    <button disabled={state === "sending"} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60">{state === "sending" ? "Gönderiliyor…" : "Yorumu onaya gönder"}</button>
    <p className="mt-3 text-xs leading-5 text-muted-foreground">Yorum doğrudan siteye gönderilir; WhatsApp açılmaz. Her gönderim yayımlanmadan önce kontrol edilir.</p>
  </form>
}
