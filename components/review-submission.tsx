"use client"

import { useMemo, useState } from "react"
import { products } from "@/lib/catalog"
import { whatsappLink } from "@/lib/contact"

export function ReviewSubmission() {
  const [name, setName] = useState("")
  const [product, setProduct] = useState("")
  const [review, setReview] = useState("")
  const [consent, setConsent] = useState(false)

  const message = useMemo(
    () =>
      [
        "Merhaba, zphctr.com müşteri yorumu gönderiyorum.",
        `İsim / baş harf: ${name.trim()}`,
        `Ürün: ${product}`,
        `Yorum: ${review.trim()}`,
        "Bu yorumun, seçtiğim isim ve ürün bilgisiyle zphctr.com üzerinde yayımlanmasına izin veriyorum.",
      ].join("\n"),
    [name, product, review],
  )

  const ready = name.trim().length >= 2 && product && review.trim().length >= 20 && consent

  return (
    <form className="w-full min-w-0 rounded-2xl border border-hairline bg-background p-5 shadow-[0_18px_60px_rgba(0,49,76,0.08)] sm:p-7" onSubmit={(event) => event.preventDefault()}>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold">
          İsim veya baş harfler
          <input value={name} onChange={(event) => setName(event.target.value)} maxLength={40} className="min-h-11 min-w-0 w-full rounded-lg border border-hairline bg-white px-3 font-normal outline-none focus:border-gold" placeholder="Örn. H.M." />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Satın aldığınız ürün
          <select value={product} onChange={(event) => setProduct(event.target.value)} className="min-h-11 min-w-0 w-full rounded-lg border border-hairline bg-white px-3 font-normal outline-none focus:border-gold">
            <option value="">Ürün seçin</option>
            {products.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}
          </select>
        </label>
      </div>
      <label className="mt-4 grid gap-1.5 text-sm font-semibold">
        Deneyiminiz
        <textarea value={review} onChange={(event) => setReview(event.target.value)} minLength={20} maxLength={500} rows={4} className="min-w-0 w-full rounded-lg border border-hairline bg-white p-3 font-normal leading-6 outline-none focus:border-gold" placeholder="Ürün, paketleme, teslimat ve iletişim deneyiminizi yazın." />
      </label>
      <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-muted-foreground">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--gold)]" />
        Yorumumun seçtiğim isim ve ürün bilgisiyle yayımlanmasına izin veriyorum. Telefon numaram yayımlanmaz.
      </label>
      <a href={ready ? whatsappLink(message) : undefined} target={ready ? "_blank" : undefined} rel="noopener noreferrer" aria-disabled={!ready} className={`mt-5 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-bold text-white transition ${ready ? "bg-whatsapp hover:opacity-90" : "cursor-not-allowed bg-slate-300"}`}>
        Yorumu WhatsApp’tan gönder
      </a>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">Gönderimler kontrol edilir; yalnızca gerçek siparişle eşleşen ve yayın izni bulunan yorumlar eklenir.</p>
    </form>
  )
}
