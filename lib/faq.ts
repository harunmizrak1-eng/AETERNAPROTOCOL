import { contactEmail } from "@/lib/contact"

export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "ZPHC Türkiye nedir?",
    answer:
      "ZPHC (Zhengzhou Pharmaceutical Co. Ltd) peptid ve insan büyüme hormonu hattının Türkiye distribütörüyüz. Ürün kataloğunu, orijinallik doğrulamasını ve tedarik koşullarını tek yerde topluyoruz. Klinik veya danışmanlık hizmeti vermiyoruz.",
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
    question: "Ürünün orijinal olduğunu nasıl anlarım?",
    answer:
      "ZPHC her kutuya benzersiz bir doğrulama kodu basar. Kutunun arkasındaki gümüş tabakayı kazıyıp altındaki kodu üreticinin resmi sistemine girerek kontrol edebilirsiniz. Sorgulama üreticinin sunucusunda yapılır, sonucu biz üretmiyoruz. Adım adım anlatım Doğrulama sayfamızda.",
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
    question: "Bayilik başvurusu nasıl yapılır?",
    answer:
      "Bayilik sayfasındaki formu doldurmanız yeterli. Kurumsal kimlik, faaliyet alanı, öngörülen hacim ve soğuk zincir kapasitesi sorulur. Vergi numarası olan işletmelerle çalışıyoruz; şahıs başvuruları değerlendirilmez.",
  },
  {
    question: "Bu bir tıbbi tavsiye mi?",
    answer:
      "Hayır. Sitedeki hiçbir içerik ve değerlendirme tıbbi tavsiye, teşhis veya tedavi yerine geçmez. Sağlık kararlarınız için hekiminize danışın.",
  },
  {
    question: "Verilerim nasıl korunuyor?",
    answer: `Bayilik başvurusu ve iletişim sırasında paylaştığınız bilgiler KVKK kapsamında işlenir, gizli tutulur ve pazarlama amacıyla üçüncü taraflarla paylaşılmaz. Sitede sunucu tarafında form kaydı tutulmaz; başvurular doğrudan WhatsApp üzerinden iletilir. Veri talepleriniz için ${contactEmail} adresine yazabilir, detaylar için Gizlilik & KVKK sayfamıza bakabilirsiniz.`,
  },
]
