import type { Product } from "@/lib/products"
import { parseSize } from "@/lib/product-size"

export interface FaqItem {
  q: string
  a: string
}

/* Ürün sayfalarındaki sorular elle yazılmaz, ürünün kendi verisinden
 * türetilir. Katalog yeniden oluşturulduğunda sorular da kendiliğinden
 * güncellenir ve hiçbir ürün için uydurma bir sayı yazılmaz: bir bilgi
 * addan veya alanlardan okunamıyorsa o soru hiç eklenmez.
 *
 * Kaynaklar: ürün adındaki miktar ve sunum bilgisi, kategori, kargo
 * sayfasındaki koşullar ve doğrulama sayfasındaki kod yöntemi. */

/** Ad içindeki "5 flakon × 4 mg" kalıbından flakon başına miktar. */
function perVialAmount(name: string): number | null {
  const match = name.match(/[×x]\s*(\d+(?:[.,]\d+)?)\s*(mg|iu)\b/i)
  if (!match) return null
  const n = Number(match[1].replace(",", "."))
  return Number.isFinite(n) && n > 0 ? n : null
}

function isPen(name: string): boolean {
  return /\bpen\b|kalem|kartuş/i.test(name)
}

/** Kutudan sulandırma sıvısı da çıkıyor mu? */
function hasDiluent(name: string): boolean {
  return /bakteriyostatik su|steril su|diluent|çözücü/i.test(name)
}

/** Soru metinlerinde kullanılacak kısa ad: parantez içi sunum bilgisi ve
 * marka adı çıkarılır, "Reta ZPHC 20 mg (5 flakon × 4 mg)" yerine
 * "Reta 20 mg" yazılır. */
function shortName(name: string): string {
  return name
    .replace(/\([^)]*\)/g, " ")
    /* Sunum bilgisi her zaman parantez içinde değil: "Ultra Rehab Mix ZPHC
     * 50 mg (...) 5 flakon × 10 mg" gibi adlarda sona serbest yazılmış. */
    .replace(/\d+\s*flakon\s*[×x]\s*[\d.,]+\s*(mg|iu)\b/gi, " ")
    .replace(/\bZPHC\b/gi, " ")
    .replace(/\s+[-–]\s+/g, " ")
    .replace(/\s*[-–]\s*$/, "")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function fmt(n: number): string {
  return n.toLocaleString("tr-TR", { maximumFractionDigits: 2 })
}

export function productFaq(product: Product): FaqItem[] {
  const size = parseSize(product.name)
  const perVial = perVialAmount(product.name)
  const label = shortName(product.name)
  const unit = size?.unit ?? "mg"
  const pen = isPen(product.name)
  const diluent = hasDiluent(product.name)
  const items: FaqItem[] = []

  /* 1. Kutu içeriği. Flakon sayısı yalnızca toplam ile flakon başına
   * miktarın ikisi de okunabildiğinde yazılır; tahmin edilmez. */
  if (size) {
    let answer: string
    if (perVial && perVial < size.amount) {
      const count = Math.round(size.amount / perVial)
      answer = `Kutuda ${count} flakon var, her birinde ${fmt(perVial)} ${unit}; toplam ${fmt(size.amount)} ${unit}. Sulandırma hesabı tek flakon üzerinden yapılır, kutu toplamı üzerinden değil.`
    } else if (pen) {
      answer = `Kutudan ${fmt(size.amount)} ${unit} içeren tek bir kalem çıkıyor.`
    } else {
      answer = `Kutuda toplam ${fmt(size.amount)} ${unit} ürün var.`
    }
    if (diluent) {
      answer += " Sulandırma sıvısı da kutunun içinden çıkıyor, ayrıca almanız gerekmiyor."
    }
    items.push({ q: `${label} kutusundan ne çıkıyor?`, a: answer })
  }

  /* 2. Sulandırma. Tek doğru su miktarı yoktur; bu yüzden bir sayı
   * verilmez, hesaplayıcıya yönlendirilir. Kaleme ve HGH'ye eklenmez:
   * kalem hazır karışımdır, HGH IU ile ölçülür. */
  if (!pen && product.category === "peptid" && size?.unit === "mg") {
    const vial = perVial && perVial < size.amount ? perVial : size.amount
    items.push({
      q: `${label} kaç mL suyla sulandırılır?`,
      a: `Tek bir doğru miktar yok. Eklediğiniz su yalnızca çözeltinin yoğunluğunu değiştirir: aynı doz için az suda daha az, çok suda daha çok ünite çekersiniz, flakondaki toplam ${fmt(vial)} mg değişmez. Pratikte şırınga skalasında rahat okunan bir çizgiye denk gelen hacim seçilir. Hesaplayıcıya flakon miktarını ve suyu girip kaç ünite çekeceğinizi görebilirsiniz.`,
    })
  }

  /* 3. Doğrulama. Yöntem doğrulama sayfasındaki anlatımla birebir aynı. */
  items.push({
    q: `${label} orijinal mi, nasıl doğrularım?`,
    a: "Kutunun arka yüzünde üzerinde gümüş bir kaplama bulunur. Kaplamayı kazıyınca altından harf, rakam ve özel karakterlerden oluşan doğrulama kodu çıkar. Bu kodu üreticinin kendi doğrulama ekranına girerek ürünü kontrol edebilirsiniz. Gümüş bant size ulaştığında kazınmış durumdaysa kod daha önce kullanılmış demektir, ürünü kabul etmeyin.",
  })

  /* 4. Kargo. Değerler kargo sayfasındaki tablodan gelir. */
  items.push({
    q: `${label} siparişi ne zaman elime geçer?`,
    a: "Anlaşmalı olduğumuz Yurtiçi Kargo ile ertesi gün teslim ediliyor. Kargo ücreti alınmıyor, tüm siparişlerde ücretsiz. Ödeme havale, EFT veya kredi kartı ile ön ödemeli yapılıyor.",
  })

  /* 5. Fiyat. Rakam yazılmaz; sorunun kendisi aramada karşılık buluyor,
   * cevap da yanıt hızını söylüyor. */
  items.push({
    q: `${label} fiyatı ne kadar?`,
    a: "Güncel fiyatı ve stok durumunu WhatsApp hattımızdan sorabilirsiniz, mesai saatlerinde genellikle dakikalar içinde dönüş yapıyoruz. Fiyatlar kutu boyuna ve forma göre değiştiği için hangi ürünü sorduğunuzu yazmanız yeterli.",
  })

  return items
}
