import { reviews } from "@/lib/reviews"
import Link from "next/link"

/** Müşteri yorumları bölümü.
 *
 * lib/reviews.ts boş olduğu sürece hiçbir şey render etmez — sahte veya
 * "yer tutucu" yorum göstermektense bölümün hiç görünmemesi tercih edildi.
 * Gerçek yorumlar eklendiği anda ana sayfada kendiliğinden belirir.
 *
 * Yıldız/puan ortalaması bilerek yok: elimizde doğrulanabilir bir puanlama
 * sistemi (toplama, saklama, sayma) olmadan "5 üzerinden 4.9" yazmak
 * uydurma bir sayı olurdu.
 */
export function Reviews() {
  return (
    <section className="border-b border-hairline bg-surface px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-w-0 gap-6 rounded-2xl border border-hairline bg-background p-6 shadow-[0_14px_45px_rgba(0,49,76,0.06)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Doğrulanmış alışverişler</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Gerçek müşteri deneyimleri</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Yorumları başka sitelerden kopyalamıyoruz. Her gönderiyi sipariş kaydıyla eşleştiriyor, yalnızca müşterinin açıkça yayın izni verdiği metinleri gösteriyoruz.</p>
          {reviews.length > 0 ? <ul className="mt-7 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
            <li
              key={`${r.name}-${r.text.slice(0, 24)}`}
              className="flex flex-col border border-hairline p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                “{r.text}”
              </p>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {r.name}
              </p>
              {r.product && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {r.product}
                </p>
              )}
              {r.date && <time className="mt-2 text-xs text-muted-foreground" dateTime={r.date}>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(new Date(r.date))}</time>}
            </li>
            ))}
          </ul> : <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Yorumlar siparişle eşleştirildikten ve yayın izni alındıktan sonra burada gösterilir.</p>}
        </div>
        <Link href="/yorum" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-gold/40 px-5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-white">Yorum bırak →</Link>
        </div>
      </div>
    </section>
  )
}
