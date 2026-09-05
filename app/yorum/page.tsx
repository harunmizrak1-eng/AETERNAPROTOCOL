import type { Metadata } from "next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ReviewSubmission } from "@/components/review-submission"

export const metadata: Metadata = {
  title: "Müşteri Yorumu Bırak",
  description: "ZPHC Türkiye alışveriş deneyiminizi, yayın izninizle birlikte güvenli biçimde gönderin.",
  alternates: { canonical: "/yorum" },
}

export default function ReviewPage() {
  return <>
    <Nav />
    <main id="main-content" className="bg-surface px-4 py-10 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-2xl min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Doğrulanmış alışverişler</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Deneyiminizi paylaşın</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Gönderiminiz önce sipariş kaydıyla eşleştirilir. Telefon numaranız yayımlanmaz; yalnızca izin verdiğiniz isim, ürün ve yorum gösterilir.</p>
        <div className="mt-8 min-w-0"><ReviewSubmission /></div>
      </div>
    </main>
    <Footer />
  </>
}
