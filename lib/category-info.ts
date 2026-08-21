/** Kategori sayfalarının açıklama metinleri.
 *
 * /urunler?kategori=X sayfasında yalnızca ürün ızgarası vardı. Kataloğa
 * ilk kez bakan biri "bu başlıkta neden bu kadar çok ürün var, hangisi
 * neye göre farklı" sorusuna cevap bulamıyordu. Bu metinler kategoriyi
 * bir cümleyle tanıtıyor ve içindeki bileşiklerin birbirinden nasıl
 * ayrıldığını söylüyor.
 *
 * SEO tarafında da karşılığı var: kategori sayfaları şu an tamamen
 * ürün adlarından oluşuyor, arama motorunun okuyacağı özgün metin yok.
 *
 * KURAL: Doz, kullanım şekli veya "şunu tercih edin" yönlendirmesi yok.
 * Etkinlik ifadeleri kanıt düzeyini yansıtan fiillerle veriliyor.
 */
export const categoryInfo: Record<
  string,
  { title: string; body: string }
> = {
  "Kilo Kaybı": {
    title: "Kilo kaybı ürünleri",
    body: "Bu başlıktaki moleküller iştah ve tokluk hissini düzenleyen hormon yolakları üzerinden çalışıyor. Semaglutide ve tirzepatide dünyada onaylı ilaçların etken maddeleri; retatrutide ise üç reseptöre birden etki eden daha yeni bir molekül ve faz 3 çalışmalarında bu grubun en yüksek sonuçlarını verdi. Aynı bileşiğin farklı miligramlı kutuları var; ürün sayfalarındaki boyut tablosundan karşılaştırabilirsiniz.",
  },
  "Toparlanma & Doku Onarımı": {
    title: "Toparlanma ve doku onarımı",
    body: "Tendon, bağ ve kas dokusunun onarımı üzerine araştırılan peptidler. BPC-157 ve TB-500 bu başlığın en bilinen iki bileşiği; ikisi de hayvan çalışmalarında olumlu sonuçlar verdi, geniş insan çalışması henüz yok. Katalogda ikisini bir arada içeren karışım ürünler de bulunuyor.",
  },
  "Büyüme Hormonu": {
    title: "İnsan büyüme hormonu",
    body: "ZPHC'nin ZPtrop serisi ve Spectrum Pharma ürünleri bu başlıkta. Ürünler IU (ünite) cinsinden ölçülüyor ve üç farklı sunumu var: sulandırılması gereken liyofilize flakonlar, kullanıma hazır karışım flakonlar ve kalem kartuşları. Hangi sunumun size uygun olduğu kullanım kolaylığıyla ilgili; ürün sayfalarındaki boyut tablosu ünite başına karşılaştırma yapmanızı sağlıyor.",
  },
  "Cilt & Yaşlanma Karşıtı": {
    title: "Cilt ve yaşlanma karşıtı",
    body: "Kolajen üretimi, cilt yenilenmesi ve doku kalitesi üzerine çalışılan bileşikler. GHK-Cu bu başlığın en yaygın molekülü; kozmetik ürünlerde de kullanılıyor. Glutatyon ise antioksidan olarak cilt tonu ve karaciğer fonksiyonu araştırmalarında geçiyor.",
  },
  "Uzun Yaşam": {
    title: "Uzun yaşam ürünleri",
    body: "Hücresel enerji üretimi ve yaşlanma süreçleri üzerine araştırılan moleküller. NAD+ ve NMN bu alandaki en çok konuşulan bileşikler. Bu başlıktaki araştırmaların çoğu erken aşamada; kanıt seviyelerini her ürünün kendi sayfasında açıkça belirtiyoruz.",
  },
  Bilişsel: {
    title: "Bilişsel ürünler",
    body: "Odaklanma, hafıza ve zihinsel performans üzerine çalışılan peptidler. Bu başlıktaki bileşiklerin önemli bir kısmı Rusya kaynaklı araştırmalara dayanıyor ve bağımsız doğrulaması sınırlı. Kanıt kademelerini olduğu gibi gösteriyoruz.",
  },
  Diğer: {
    title: "Diğer ürünler",
    body: "Yukarıdaki başlıkların dışında kalan ürünler. Bakteriyostatik su, çok kullanımlık kalemler ve tekil bileşikler bu grupta yer alıyor.",
  },
}

export function getCategoryInfo(goal?: string) {
  return goal ? categoryInfo[goal] : undefined
}
