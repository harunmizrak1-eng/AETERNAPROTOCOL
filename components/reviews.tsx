import { reviews } from "@/lib/reviews"

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
  if (reviews.length === 0) return null

  return (
    <section className="border-b border-hairline px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Müşteri yorumları
        </h2>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
