/** Gerçek müşteri yorumları.
 *
 * ÖNEMLİ KURAL: Bu listeye yalnızca gerçekten alınmış, müşterinin
 * paylaşılmasına izin verdiği yorumlar eklenir. Uydurma yorum, başka bir
 * satıcının yorumunun kopyası veya "örnek" amaçlı doldurulmuş metin
 * yazılmaz.
 *
 * Sebep basit: zphcstore.com'un sitesindeki yorumlar (Sam, Mark, Pat Card,
 * Adrian) o mağazanın ABD'deki kendi müşterilerine ait — kendi kargo
 * sürelerinden ve "John" adlı temsilcilerinden bahsediyorlar. Onları buraya
 * kopyalamak sahte referans olurdu; hem Ticari Reklam ve Haksız Ticari
 * Uygulamalar Yönetmeliği'ne aykırı, hem de fark edildiğinde sitenin tüm
 * güvenilirliğini bitirir. Aynı sebeple eroids.com'daki "163 yorum" rozeti
 * de kullanılmadı: o puan zphcstore.com'a ait, bize değil.
 *
 * Liste boşken yorum bölümü hiç render edilmez — boş görünmek, sahte
 * görünmekten iyidir.
 */
export interface Review {
  /** Müşterinin adı veya izin verdiği şekliyle baş harfleri. */
  name: string
  /** Yorum metni, müşterinin kendi ifadesiyle. */
  text: string
  /** Varsa satın alınan ürün — yoruma bağlam katar. */
  product?: string
  /** ISO tarih (YYYY-MM-DD). */
  date?: string
}

export const reviews: Review[] = []
