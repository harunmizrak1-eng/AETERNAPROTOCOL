// Orijinallik kanıtı katmanı: parti (batch) kayıtları, analiz sertifikaları
// ve distribütörlük belgesi.
//
// NEDEN AYRI DOSYA: lib/products.ts zphcstore.com API'sinden üretilir ve
// elle düzenlenmez (bkz. AGENTS.md → VERİ AKIŞI). Parti numarası ve COA
// kaynağın API'sinde yoktur; bizim elimizde olan veridir. Bu yüzden ürün
// slug'ına göre anahtarlanan, elle tutulan ayrı bir katman.
//
// TEK KURAL: buraya yalnızca gerçekten elimizde belgesi olan parti girilir.
// Uydurma parti numarası veya var olmayan bir COA bağlantısı, sahte ürüne
// karşı kurduğumuz güvenin tamamını yok eder. Kaydı olmayan ürün için sayfa
// parti bloğunu hiç render etmez — boş bırakmak serbesttir, uydurmak değil.

export interface BatchRecord {
  /** Kutu üzerinde yazan parti numarası, birebir kopyalanır. */
  batch: string
  /** Analiz sertifikası: public/ altındaki dosya yolu veya harici URL.
   *  Belge elimizde yoksa alan boş bırakılır, bağlantı üretilmez. */
  coaUrl?: string
  /** Belgede yazan analiz tarihi. Bugünün tarihinden türetilmez. */
  coaDate?: string
  /** Analiz yöntemi, belgede yazdığı gibi (ör. "HPLC saflık"). */
  method?: string
  /** Raporlanan sonuç, belgede yazdığı gibi (ör. "%99,1"). Yorum eklenmez. */
  result?: string
}

/** Ürün slug'ı → o üründe elimizde belgesi bulunan partiler.
 *  Belgeler geldikçe doldurulur. */
export const batchRecords: Record<string, BatchRecord[]> = {}

export const getBatchRecords = (slug: string): BatchRecord[] =>
  batchRecords[slug] ?? []

/** Distribütörlük belgesinin görseli/PDF'i.
 *  Belge dosyası siteye eklenene kadar null kalır; null olduğunda sayfa
 *  yalnızca metinsel beyanı gösterir, olmayan bir belgeye bağlantı vermez. */
export const distributorCertificate: { href: string; label: string } | null =
  null

/** Üreticinin resmi doğrulama servisi. Tek kaynak: hem doğrulama sayfası
 *  hem ürün sayfaları buradan okur. */
export const validationUrl = "https://validation.zphc.com"
