export interface Article {
  slug: string
  title: string
  category: string
  excerpt: string
  readMinutes: number
  date: string
  /** paragraphs — kept simple, no CMS yet */
  body: string[]
}

export const articles: Article[] = [
  {
    slug: "retatrutide-nedir",
    title: "Retatrutide neden farklı bir nesil?",
    category: "Metabolik",
    excerpt:
      "Üçlü reseptör mekanizması, kilo kaybının ötesinde ne anlama geliyor ve neden önceki GLP-1 moleküllerinden ayrışıyor.",
    readMinutes: 4,
    date: "2026-06-20",
    body: [
      "Retatrutide, tek bir molekülle üç ayrı reseptöre etki eden ilk metabolik bileşiklerden biri. GLP-1, GIP ve glukagon yollarını aynı anda hedefliyor. Bu, iştah kontrolünün ötesinde bir şey anlamına geliyor.",
      "Önceki nesil moleküller tek ya da çift reseptör üzerinden çalışıyordu. Glukagon yolunun devreye girmesi, yağ metabolizmasını ve enerji harcamasını doğrudan etkiliyor. Faz 3 çalışmalarında görülen sonuçların yüksekliği buradan geliyor.",
      "Ancak bir molekülün güçlü olması, herkes için doğru olduğu anlamına gelmez. Doz, süre ve bireysel metabolik profil belirleyici. Bu yüzden protokol her zaman kişiye özel kurulur, referans bir tablodan alınmaz.",
      "Kanıt seviyesi net: retatrutide klinik veriyle desteklenen bir molekül. Bu, kütüphanemizde onu spekülatif bileşiklerden ayıran şey.",
    ],
  },
  {
    slug: "kanit-seviyesi-neden-onemli",
    title: "Kanıt seviyesi neden her şeyin merkezinde?",
    category: "Yaklaşım",
    excerpt:
      "Bir peptidin popüler olması, işe yaradığı anlamına gelmez. Kanıtlanmış, teorik ve preklinik ayrımı neden bu kadar önemli.",
    readMinutes: 3,
    date: "2026-06-12",
    body: [
      "Peptid dünyasının en büyük sorunu, popülerlik ile kanıtın karıştırılması. Bir bileşik sosyal medyada ne kadar konuşulursa konuşulsun, arkasındaki veri seviyesi değişmez.",
      "Üç kademe kullanıyoruz. Klinik kanıt: insan çalışmalarıyla desteklenen moleküller. Mekanistik: mekanizması iyi tanımlı ama geniş insan verisi olmayan bileşikler. Preklinik: kanıtı büyük ölçüde hayvan çalışmalarına dayanan, deneysel seviyedekiler.",
      "Bu ayrımı asla bulandırmayız. Preklinik bir bileşiği klinik kanıtlıymış gibi sunmak, en yaygın ve en tehlikeli yanıltma. Bizim işimiz tam tersini yapmak.",
      "Şeffaflık burada bir pazarlama sözü değil. Hangi bileşiğin nerede durduğunu bilmek, doğru kararın ilk şartı.",
    ],
  },
  {
    slug: "healthspan-vs-lifespan",
    title: "Uzun yaşamak mı, iyi yaşamak mı?",
    category: "Longevity",
    excerpt:
      "Longevity'nin asıl ölçüsü ömür değil healthspan. Sağlıklı ve fonksiyonel geçen yılların neden daha önemli olduğu.",
    readMinutes: 3,
    date: "2026-06-04",
    body: [
      "Longevity denince akla uzun yaşamak geliyor. Oysa asıl mesele bu değil. Ortalama insan, ömrünün son yıllarının önemli bir kısmını düşük sağlıkla geçiriyor.",
      "Healthspan, kişinin güçlü, fonksiyonel ve bağımsız kaldığı süre. Amaç, toplam yaşı büyütmek değil, bu sağlıklı pencereyi olabildiğince uzatmak.",
      "Bu bakış her şeyi değiştirir. Hedef 90 yaşına ulaşmak değil, o yaşa dinç ulaşmak. Protokoller de bu mantıkla kurulur: bugünü değil, on yıl sonrasını düşünerek.",
    ],
  },
]

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug)
