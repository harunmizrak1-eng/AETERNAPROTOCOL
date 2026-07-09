import { contactEmail } from "@/lib/contact"

export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "ÆTERNA bir klinik mi, takviye mağazası mı?",
    answer:
      "Hiçbiri. ÆTERNA, seçili sayıda birey için kanıta dayalı, kişiye özel biyolojik optimizasyon protokolleri tasarlayan özel bir longevity danışmanlığıdır. Ürün satışı değil, süreç tasarımı ve yönlendirme sunar.",
  },
  {
    question: "Kanıt seviyesi sistemi ne anlama geliyor?",
    answer:
      "Her bileşiği üç kademeye ayırıyoruz: Klinik Kanıt (randomize insan çalışmaları mevcut), Mekanistik/Teorik (mekanizma iyi tanımlı ama geniş insan verisi yok) ve Preklinik (kanıt büyük ölçüde hayvan çalışmalarına dayalı). Bu ayrımı popülerlik veya pazarlamadan tamamen bağımsız tutuyoruz. Detaylar metodoloji sayfamızda.",
  },
  {
    question: "Sitedeki kaynaklar gerçek mi?",
    answer:
      "Evet. Klinik Kanıt kademesindeki bileşiklerin sayfalarında gösterilen her PMID, DOI ve ClinicalTrials numarası gerçek ve doğrulanabilir kaynaklardan alınmıştır. Bir bileşik için doğrulanabilir kaynak yoksa, o bileşiğe uydurma referans eklemek yerine daha alt bir kanıt kademesinde tutulur.",
  },
  {
    question: "Vaka analizleri gerçek hastalara mı ait?",
    answer:
      "Hayır. Vaka analizleri, gerçek hasta verisi kullanmamak amacıyla, literatürdeki gözlenen etki büyüklükleriyle tutarlı olacak şekilde hazırlanmış eğitim amaçlı kurgusal örneklerdir. Her vakanın altında bu açıkça belirtilir.",
  },
  {
    question: "Süreç nasıl işliyor?",
    answer:
      "Kısa bir ön değerlendirmeyle başlar. Sonuca göre size uygun danışmanlık seviyesi önerilir; ardından gizli bir görüşme, biyolojik profil çıkarımı ve kişiye özel protokol tasarımı gelir. Süreç boyunca birebir takip esastır.",
  },
  {
    question: "Bu bir tıbbi tavsiye mi?",
    answer:
      "Hayır. Sitedeki hiçbir içerik ve değerlendirme tıbbi tavsiye, teşhis veya tedavi yerine geçmez. Herhangi bir protokole başlamadan önce bir hekime danışılmalıdır.",
  },
  {
    question: "Verilerim nasıl korunuyor?",
    answer: `Paylaştığınız sağlık verileri KVKK kapsamında özel nitelikli kişisel veri olarak işlenir, gizli tutulur ve pazarlama amacıyla üçüncü taraflarla paylaşılmaz. Veri talepleriniz için ${contactEmail} adresine yazabilir, detaylar için Gizlilik & KVKK sayfamıza bakabilirsiniz.`,
  },
]
