import { reviews } from "@/lib/reviews"
import { ReviewSubmission } from "@/components/review-submission"

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
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Doğrulanmış alışverişler</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Gerçek müşteri deneyimleri</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Yorumları başka sitelerden kopyalamıyoruz. Her gönderiyi sipariş kaydıyla eşleştiriyor, yalnızca müşterinin açıkça yayın izni verdiği metinleri gösteriyoruz.</p>
          {reviews.length > 0 ? <ul className="mt-7 grid gap-4">
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
          </ul> : <div className="mt-7 rounded-xl border border-dashed border-gold/30 bg-background p-5 text-sm leading-6 text-muted-foreground">İlk doğrulanmış yorumlar moderasyon sonrası burada yayımlanacak. Sahte yıldız, uydurma isim veya başka mağazadan alınmış yorum göstermiyoruz.</div>}
        </div>
        <div>
          <h3 className="mb-3 text-lg font-bold text-foreground">Alışverişinizi değerlendirin</h3>
          <ReviewSubmission />
        </div>
      </div>
    </section>
  )
}
