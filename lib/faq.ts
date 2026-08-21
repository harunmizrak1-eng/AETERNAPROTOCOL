
export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "ZPHC Türkiye nedir?",
    answer:
      "Zhengzhou Pharmaceutical (ZPHC) markasının peptid ve büyüme hormonu ürünlerini Türkiye'ye getiren resmi distribütörüz. Klinik değiliz, danışmanlık da vermiyoruz; sadece ürün satıyoruz.",
  },
  {
    question: "Ürünler ne amaçla sunuluyor?",
    answer:
      "Katalogdaki ürünler üretici tarafından laboratuvar ve araştırma materyali olarak sunulur; insan kullanımı için tasarlanmamıştır. Bu çerçeveyi olduğu gibi aktarıyoruz; ürün sayfalarındaki 'yalnızca araştırma amaçlı' ibaresi üreticinin kendi beyanıdır.",
  },
  {
    question: "Sitede neden fiyat görünmüyor?",
    answer:
      "Fiyat ve stok sık değişiyor. Eski bir listeyi sitede tutmaktansa sorduğunuzda o günkü fiyatı söylemeyi tercih ediyoruz. Ürün sayfasındaki WhatsApp düğmesine bastığınızda ürünün adı mesaja hazır geliyor.",
  },
  {
    question: "Kargo ne kadar sürüyor, ücreti var mı?",
    answer:
      "Yurtiçi Kargo ile gönderiyoruz, ertesi gün elinizde oluyor. Kargo ücreti almıyoruz. Ödemeniz geldiği gün kargoya veriyoruz.",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Havale, EFT ve kredi kartı kabul ediyoruz. Ödemeyi siparişten önce alıyoruz, kapıda ödeme yapmıyoruz.",
  },
  {
    question: "Ürünler soğuk zincirle mi geliyor? Nasıl saklamalıyım?",
    answer:
      "Ürünler toz halinde geliyor, bu haldeyken soğutma gerekmiyor ve kargoda bozulmuyor. Buzdolabı sulandırdıktan sonra gerekiyor: çözeltiyi 2-8 °C'de saklayın, dondurmayın, ışıktan koruyun. Hangi üründe ne kadar dayandığı o ürünün sayfasında yazıyor.",
  },
  {
    question: "Hasarlı veya eksik ürün gelirse ne oluyor?",
    answer:
      "Teslim aldığınız gün WhatsApp'tan yazın. Ürünü yeniden gönderiyoruz ya da parasını iade ediyoruz, kararı siz veriyorsunuz. Paketi açarken fotoğraf çekerseniz işimiz kolaylaşır.",
  },
  {
    question: "Ürünün orijinal olduğunu nasıl anlarım?",
    answer:
      "Her kutuda gümüş bir bant var. Kazıyınca altından o ürüne özel bir kod çıkıyor. Kodu validation.zphc.com adresine girdiğinizde cevabı doğrudan üreticiden alıyorsunuz, sorgu bizim sitemizde yapılmıyor. Adım adım anlatımı Doğrulama sayfasında bulabilirsiniz.",
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
      "Toplu alımda koşullar ürüne ve miktara göre değişiyor. WhatsApp'tan yazın, ihtiyacınıza göre konuşalım.",
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
