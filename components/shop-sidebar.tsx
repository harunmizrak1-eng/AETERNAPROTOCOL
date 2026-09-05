import Link from "next/link"
import { products, goalOrder } from "@/lib/catalog"
import { peptides } from "@/lib/peptides"

/** Mağaza kenar çubuğu.
 *
 * zphcstore.com'un mağaza sayfalarında solda dikey bir kategori listesi
 * duruyor: her satır bir ürün kategorisi, tıklayınca o kategoriye gidiyor.
 * Aynı yapı burada kendi kategorilerimizle kuruldu; yanına ürün sayıları
 * eklendi ki ziyaretçi hangi başlıkta ne kadar ürün olduğunu listeye
 * girmeden görebilsin.
 *
 * Sunucu bileşeni: veriden okunur, katalog güncellendiğinde kendiliğinden
 * güncellenir, elle liste tutulmaz.
 */
export function ShopSidebar({ active }: { active?: string }) {
  const groups = goalOrder
    .map((goal) => ({
      goal,
      count: products.filter((p) => p.goals.includes(goal)).length,
    }))
    .filter((g) => g.count > 0)

  return (
    <aside className="w-full lg:w-56 lg:shrink-0">
      <nav aria-label="Ürün kategorileri">
        <h2 className="text-sm font-bold tracking-tight text-foreground lg:border-b lg:border-hairline lg:pb-2 lg:text-base">
          1 · Ne arıyorsunuz?
        </h2>
        <ul className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-2 lg:mt-1 lg:block lg:overflow-visible lg:pb-0">
          <li className="shrink-0">
            <Link
              href="/urunler"
              aria-current={!active ? "page" : undefined}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm whitespace-nowrap transition-colors hover:border-gold hover:text-gold lg:justify-between lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-hairline lg:px-0 lg:py-3 lg:text-base ${
                !active
                  ? "border-gold bg-gold/5 font-semibold text-gold"
                  : "border-hairline text-muted-foreground"
              }`}
            >
              Tüm ürünler
              <span className="text-sm text-muted-foreground">
                {products.length}
              </span>
            </Link>
          </li>
          {groups.map(({ goal, count }) => (
            <li key={goal} className="shrink-0">
              <Link
                href={`/urunler?kategori=${encodeURIComponent(goal)}`}
                aria-current={active === goal ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm whitespace-nowrap transition-colors hover:border-gold hover:text-gold lg:justify-between lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-hairline lg:px-0 lg:py-3 lg:text-base ${
                  active === goal
                    ? "border-gold bg-gold/5 font-semibold text-gold"
                    : "border-hairline text-muted-foreground"
                }`}
              >
                <span className="min-w-0">{goal}</span>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Kargo bilgisi satın alma kararını doğrudan etkiliyor. Masaüstünde
          kenar çubuğunda kalır; mobilde ürün ızgarasını aşağı itmemesi için
          alt sayfalara bırakılır. */}
      <div className="mt-8 hidden border border-gold/40 bg-gold/5 p-4 lg:block">
        <p className="text-base font-bold text-foreground">Ertesi gün teslim</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Yurtiçi Kargo ile gönderiyoruz, <strong>kargo ücreti almıyoruz</strong>.
          Ürünler toz halinde geliyor, kargoda bozulmaz.
        </p>
        <Link
          href="/kargo"
          className="mt-3 inline-block text-sm font-semibold text-gold hover:underline"
        >
          Kargo koşulları →
        </Link>
      </div>

      <div className="mt-6 hidden border border-hairline bg-surface p-4 lg:block">
        <h2 className="text-base font-bold tracking-tight text-foreground">
          Orijinallik doğrulama
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Her kutuda gümüş bandın altında bir kod var. Kazıyıp üreticinin
          sitesinde sorgulayabilirsiniz.
        </p>
        <Link
          href="/dogrulama"
          className="mt-3 inline-block text-sm font-semibold text-gold hover:underline"
        >
          Nasıl doğrulanır →
        </Link>
      </div>

      <div className="mt-6 hidden border border-hairline p-4 lg:block">
        <h2 className="text-base font-bold tracking-tight text-foreground">
          Bileşik kütüphanesi
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {peptides.length} bileşiğin ne işe yaradığı, kanıt seviyesi ve
          kaynakları.
        </p>
        <Link
          href="/peptidler"
          className="mt-3 inline-block text-sm font-semibold text-gold hover:underline"
        >
          Kütüphaneyi açın →
        </Link>
      </div>
    </aside>
  )
}
