import Link from "next/link"
import { products, goalOrder } from "@/lib/products"
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
        <h2 className="border-b border-hairline pb-2 text-sm font-bold tracking-tight text-foreground">
          Kategoriler
        </h2>
        <ul className="mt-1">
          <li>
            <Link
              href="/urunler"
              aria-current={!active ? "page" : undefined}
              className={`flex items-center justify-between border-b border-hairline py-2.5 text-sm transition-colors hover:text-gold ${
                !active
                  ? "font-semibold text-gold"
                  : "text-muted-foreground"
              }`}
            >
              Tüm ürünler
              <span className="text-xs text-muted-foreground">
                {products.length}
              </span>
            </Link>
          </li>
          {groups.map(({ goal, count }) => (
            <li key={goal}>
              <Link
                href={`/urunler?kategori=${encodeURIComponent(goal)}`}
                aria-current={active === goal ? "page" : undefined}
                className={`flex items-center justify-between gap-2 border-b border-hairline py-2.5 text-sm transition-colors hover:text-gold ${
                  active === goal
                    ? "font-semibold text-gold"
                    : "text-muted-foreground"
                }`}
              >
                <span className="min-w-0">{goal}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 border border-hairline bg-surface p-4">
        <h2 className="text-sm font-bold tracking-tight text-foreground">
          Orijinallik doğrulama
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Her ZPHC kutusunda gümüş kaplamanın altında benzersiz bir kod var.
          Kodu üreticinin kendi sisteminde sorgulayın.
        </p>
        <Link
          href="/dogrulama"
          className="mt-3 inline-block text-xs font-semibold text-gold hover:underline"
        >
          Nasıl doğrulanır →
        </Link>
      </div>

      <div className="mt-6 border border-hairline p-4">
        <h2 className="text-sm font-bold tracking-tight text-foreground">
          Bileşik kütüphanesi
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {peptides.length} bileşiğin etki mekanizması ve kanıt seviyesi,
          literatür referanslarıyla birlikte.
        </p>
        <Link
          href="/peptidler"
          className="mt-3 inline-block text-xs font-semibold text-gold hover:underline"
        >
          Kütüphaneyi açın →
        </Link>
      </div>
    </aside>
  )
}
