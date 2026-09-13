/* İçerik tarihleri tek yerden yönetilir: hem site haritasındaki
 * lastModified hem sayfalardaki dateModified buradan okur. İkisinin
 * ayrışması Google'a çelişkili sinyal verir.
 *
 * Bu tarihler bir dağıtım zamanı değildir. Her build'de `new Date()`
 * kullanmak, değişmemiş 130 sayfayı sürekli güncellenmiş gibi gösterirdi;
 * gerçekte değişmeyen içeriğe taze tarih basmak Google'ın istenmeyen
 * içerik kurallarında açıkça sayılan bir davranış ve yaptırımı sitenin
 * tarih sinyallerinin tamamen yok sayılması oluyor. Bu yüzden değer elle
 * ilerletilir: içerik gerçekten değiştiğinde.
 *
 * Kopya siteye karşı işe yarayan şey de zaten bu: klon 31 Ağustos'ta
 * donmuş durumda, biz gerçekten yazdıkça tarih kendiliğinden öne geçiyor.
 * Sahte tarih basmaya gerek yok. */

/** Sitenin yayına giriş tarihi. Organization.foundingDate ile aynı. */
export const sitePublishedAt = "2026-08-21"

/** Katalog ve ürün sayfalarının son gerçek güncellemesi.
 * 2026-09-13: ürün sayfalarına SSS blokları eklendi, yazım düzeltildi. */
export const storefrontUpdatedAt = "2026-09-13"

/** Bileşik kütüphanesinin son gerçek güncellemesi.
 * 2026-09-13: hesaplayıcı bağlantıları ve yazım düzeltmesi. */
export const libraryUpdatedAt = "2026-09-13"

/** Sayfanın kendi kimliğini ve tarihlerini taşıyan schema.org düğümü.
 *
 * Kopyalanmış bir sayfada bu düğüm de kopyalanır ve içindeki url bizim
 * adresimizi gösterir; canonical ile birlikte içeriğin kaynağını iki ayrı
 * yerden işaret eder. */
export function webPageNode({
  url,
  name,
  description,
  siteUrl,
  published = sitePublishedAt,
  modified,
}: {
  url: string
  name: string
  description?: string
  siteUrl: string
  published?: string
  modified: string
}) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: "tr-TR",
    datePublished: published,
    dateModified: modified,
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
  }
}
