
export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "ZPHC Türkiye nedir?",
    answer:
      "ZPHC (Zhengzhou Pharmaceutical Co. Ltd) peptid ve insan büyüme hormonu hattının resmi Türkiye distribütörüyüz. Ürün kataloğunu, orijinallik doğrulamasını ve tedarik koşullarını tek yerde topluyoruz. Klinik veya danışmanlık hizmeti vermiyoruz.",
  },
  {
    question: "Ürünler ne amaçla sunuluyor?",
    answer:
      "Katalogdaki ürünler üretici tarafından laboratuvar ve araştırma materyali olarak sunulur; insan kullanımı için tasarlanmamıştır. Bu çerçeveyi olduğu gibi aktarıyoruz; ürün sayfalarındaki 'yalnızca araştırma amaçlı' ibaresi üreticinin kendi beyanıdır.",
  },
  {
    question: "Sitede neden fiyat görünmüyor?",
    answer:
      "Fiyat ve stok durumu ürüne, miktara ve tedarik koşullarına göre değişiyor. Bu yüzden liste fiyatı yayımlamak yerine doğrudan iletişimi tercih ediyoruz. Her ürün sayfasındaki WhatsApp butonu, ilgilendiğiniz ürünün adını mesaja otomatik taşır.",
  },
  {
    question: "Kargo ne kadar sürüyor, ücreti var mı?",
    answer:
      "Anlaşmalı olduğumuz Yurtiçi Kargo ile gönderiyoruz ve siparişler ertesi gün teslim ediliyor. Kargo ücreti almıyoruz, tüm siparişlerde ücretsiz. Ödemeniz ulaştığı gün kargoya veriyoruz.",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Havale/EFT ve kredi kartı kabul ediyoruz. Ödeme siparişten önce alınır; kapıda ödeme seçeneğimiz bulunmuyor.",
  },
  {
    question: "Ürünler soğuk zincirle mi geliyor? Nasıl saklamalıyım?",
    answer:
      "Ürünler liyofilize, yani dondurularak kurutulmuş toz halinde gönderilir; bu formda taşıma sırasında soğutma gerektirmez, kargoda bozulmaz. Buzdolabı ihtiyacı sulandırdıktan sonra başlar: hazırlanan çözelti 2–8 °C'de buzdolabında saklanmalı, dondurulmamalı ve ışıktan korunmalıdır. Her ürünün kendi sayfasında o ürüne ait saklama ve stabilite süresi yazılıdır.",
  },
  {
    question: "Hasarlı veya eksik ürün gelirse ne oluyor?",
    answer:
      "Teslim aldığınız gün içinde WhatsApp'tan bize bildirin; ürünü yeniliyor veya bedelini iade ediyoruz, tercihi siz yapıyorsunuz. Paketi açarken fotoğraf çekmeniz süreci hızlandırır.",
  },
  {
    question: "Ürünün orijinal olduğunu nasıl anlarım?",
    answer:
      "ZPHC her kutuya, gümüş bir kaplamanın altına benzersiz bir doğrulama kodu basar. Kaplamayı kazıyıp altındaki kodu üreticinin resmi doğrulama sistemine (validation.zphc.com) girerek kontrol edebilirsiniz. Sorgulama üreticinin sunucusunda yapılır, sonucu biz üretmiyoruz. Adım adım anlatım Doğrulama sayfamızda.",
  },
  {
    question: "Kanıt seviyesi sistemi ne anlama geliyor?",
    answer:
      "Kütüphanedeki her bileşiği üç kademeye ayırıyoruz: Klinik Kanıt (randomize insan çalışmaları mevcut), Mekanistik/Teorik (mekanizma iyi tanımlı ama geniş insan verisi yok) ve Preklinik (kanıt büyük ölçüde hayvan çalışmalarına dayalı). Bu ayrımı popülerlik, satış hacmi veya üreticinin pazarlama metninden tamamen bağımsız tutuyoruz.",
  },
  {
    question: "Ürün sayfasındaki 'Üretici Beyanı' bölümü nedir?",
    answer:
      "Üreticinin kendi ürün açıklamasından alınan etkinlik, doz ve yan etki ifadeleridir. Bağımsız olarak doğrulanmamıştır ve bizim kanıt seviyesi değerlendirmemizle çelişebilir. Örneğin BPC-157'nin üretici açıklaması hızlı doku onarımından söz eder; kütüphanedeki kaydımız ise bu bileşiği Teorik kademede tutar, çünkü insan çalışması yoktur. İkisini de göstermeyi, birini gizlemeye tercih ediyoruz.",
  },
  {
    question: "Sitedeki kaynaklar gerçek mi?",
    answer:
      "Evet. Klinik Kanıt kademesindeki bileşiklerin sayfalarında gösterilen her PMID, DOI ve ClinicalTrials numarası gerçek ve doğrulanabilir kaynaklardan alınmıştır. Bir bileşik için doğrulanabilir kaynak yoksa, o bileşiğe uydurma referans eklemek yerine daha alt bir kanıt kademesinde tutulur.",
  },
  {
    question: "Toplu alım ve tedarik koşulları nedir?",
    answer:
      "Toplu alım ve süreklilik gösteren siparişlerde koşullar ürüne ve miktara göre değişiyor. WhatsApp üzerinden yazın, ihtiyacınıza göre konuşalım.",
  },
  {
    question: "Bu bir tıbbi tavsiye mi?",
    answer:
      "Hayır. Sitedeki hiçbir içerik ve değerlendirme tıbbi tavsiye, teşhis veya tedavi yerine geçmez. Sağlık kararlarınız için hekiminize danışın.",
  },
  {
    question: "Verilerim nasıl korunuyor?",
    answer:
      "İletişim sırasında paylaştığınız bilgiler KVKK kapsamında işlenir, gizli tutulur ve pazarlama amacıyla üçüncü taraflarla paylaşılmaz. Sitede sunucu tarafında form kaydı tutulmaz; talepler doğrudan WhatsApp üzerinden iletilir. Veri talepleriniz için WhatsApp hattımızdan yazabilir, detaylar için Gizlilik & KVKK sayfamıza bakabilirsiniz.",
  },
]
