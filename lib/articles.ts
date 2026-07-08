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
  {
    slug: "doku-onarimi-bpc157-tb500",
    title: "Doku onarımında iki peptidin birlikte çalışması",
    category: "Doku Onarımı",
    excerpt:
      "BPC-157 ve TB-500 farklı mekanizmalarla aynı hedefe gidiyor: doku rejenerasyonu. İkisini birlikte kullanmanın mantığı nedir?",
    readMinutes: 4,
    date: "2026-07-01",
    body: [
      "BPC-157 anjiyogenezi, yani yeni damar oluşumunu desteklediği düşünülen bir molekül. TB-500 ise hücre göçünü kolaylaştırarak dokunun kendini onarma hızını artırdığı öne sürülen bir fragman.",
      "İki molekülün farklı mekanizmalarla aynı sürece katkı sağlaması, birlikte kullanımın arkasındaki mantık. Biri damarlanmayı, diğeri hücresel göçü destekliyor — teorik olarak tamamlayıcı bir çift.",
      "Ancak burada dürüst olmak gerekiyor: bu kombinasyonun insan verisi büyük ölçüde anekdotal. Mekanizma güçlü, kontrollü klinik çalışma yok. Kütüphanemizde bu ikili 'Mekanistik / Teorik' kademesinde sınıflandırılıyor, 'Klinik Kanıt' değil.",
      "Bu ayrımı bulanıklaştırmadan sunmak, sporcu ve aktif bireylerle çalışırken en çok önem verdiğimiz nokta. Doğru beklenti, doğru sonucun ilk şartı.",
    ],
  },
  {
    slug: "kognitif-protokoller-semax-selank",
    title: "Kognitif protokollerde Rusya kaynaklı iki molekül",
    category: "Kognitif",
    excerpt:
      "Semax ve Selank, Rusya'da onlarca yıldır klinik kullanımda ama batı literatüründe hâlâ az tanınıyor. Aradaki fark neden önemli?",
    readMinutes: 3,
    date: "2026-06-25",
    body: [
      "Semax ve Selank, ACTH ve tuftsin türevi iki nöropeptid. İkisi de Rusya'da resmi klinik kullanımda; batıda ise büyük ölçüde araştırma aşamasında kalmış moleküller.",
      "Semax'ın BDNF ve dopaminerjik sinyali desteklediği, Selank'ın ise sedasyon yaratmadan anksiyolitik etki gösterdiği düşünülüyor. Mekanizmaları makul ve tutarlı, ancak kontrollü randomize çalışmaların çoğu Rusça literatürde ve batı standartlarında tekrarlanmamış.",
      "Bu, molekülleri geçersiz kılmıyor — sadece kanıt seviyesini 'Mekanistik / Teorik' kademesinde tutuyor. Kognitif protokollerde bu şeffaflık, özellikle yüksek performans beklentisi olan bireyler için kritik: beklenti gerçek kanıt seviyesiyle uyumlu olmalı.",
    ],
  },
  {
    slug: "yag-kaybi-protokol-mantigi",
    title: "Yağ kaybı protokolünün mantığı",
    category: "Metabolik",
    excerpt:
      "Tek bir molekül değil, birbirini tamamlayan bir sistem: iştah, enerji harcaması ve karaciğer yağlanması neden birlikte ele alınmalı.",
    readMinutes: 4,
    date: "2026-05-15",
    body: [
      "Yağ kaybı protokolleri genellikle tek bir molekülün etrafında kurulur. Oysa metabolik direnç, tek bir yolun değil, birkaç sistemin birlikte bozulmasının sonucu.",
      "GLP-1, GIP ve glukagon reseptörlerini hedef alan yeni nesil moleküller, iştah baskılanmasının ötesinde enerji harcamasını ve karaciğer yağlanmasını da etkiliyor. Bu, neden bazı protokollerin daha kalıcı sonuç verdiğini açıklıyor.",
      "Ancak molekül seçimi işin yarısı. Doz titrasyonu, biyobelirteç takibi ve bireysel metabolik profil, sonucu molekül kadar belirliyor.",
      "Bu yüzden bir protokolü 'iyi' yapan şey, hangi molekülü kullandığı değil, o molekülün doğru kişide doğru şekilde uygulanıp uygulanmadığıdır.",
    ],
  },
  {
    slug: "cilt-icin-icten-yaklasim",
    title: "Cilt için içten yaklaşım",
    category: "Anti-Aging",
    excerpt:
      "Topikal ürünlerin sınırı cildin yüzeyinde biter. GHK-Cu gibi moleküller, yenilenmeyi hücresel düzeyde tetiklemeyi hedefliyor.",
    readMinutes: 3,
    date: "2026-05-02",
    body: [
      "Cilt bakımının çoğu, yüzeyde kalan bir müdahale. Nemlendirme, koruma, düzeltme — hepsi gerekli ama hücresel yenilenme hızını değiştirmiyor.",
      "GHK-Cu gibi bakır bağlı peptidler, kolajen ve elastin sentezini doğrudan uyararak farklı bir katmanda çalışıyor. RCT'lerle desteklenen az sayıda estetik molekülden biri olması, onu kütüphanemizde 'Klinik Kanıt' kademesine taşıyor.",
      "Ancak tek başına bir molekül, bir protokol değildir. Doz, uygulama şekli (topikal veya enjekte edilebilir) ve bireyin başlangıç noktası, sonucu belirleyen asıl değişkenler.",
      "Anti-aging'i bir ürün seçimi değil, sürdürülebilir bir sistem olarak kurmak — yaklaşımımızın temel farkı burada.",
    ],
  },
  {
    slug: "performans-toparlanma-penceresi",
    title: "Toparlanma, performansın görünmeyen yarısı",
    category: "Performans",
    excerpt:
      "Antrenman adaptasyonunun çoğu, antrenman sırasında değil toparlanma penceresinde gerçekleşir. Protokoller bu pencereyi nasıl hedefler?",
    readMinutes: 3,
    date: "2026-04-18",
    body: [
      "Performans konuşulduğunda akla genelde antrenman şiddeti gelir. Oysa adaptasyonun büyük kısmı, antrenman sonrası toparlanma penceresinde gerçekleşir.",
      "CJC-1295 ve Ipamorelin gibi kombinasyonlar, büyüme hormonu salınımını fizyolojik atım paternine yakın bir şekilde uyararak bu pencereyi desteklediği düşünülüyor. Mekanizma iyi tanımlı, ama uzun dönem randomize veri sınırlı — bu yüzden 'Mekanistik / Teorik' kademesinde yer alıyor.",
      "Toparlanma odaklı bir protokol kurarken asıl soru molekül değil: uyku kalitesi, yük yönetimi ve biyobelirteç takibi olmadan hiçbir molekül tek başına yeterli değil.",
      "Performans protokollerimiz bu yüzden her zaman çok boyutlu kurulur — tek değişkenli değil.",
    ],
  },
  {
    slug: "hucresel-saglik-uzun-vade",
    title: "Hücresel sağlık, uzun vadeli bir proje",
    category: "Longevity",
    excerpt:
      "Longevity molekülleri hızlı sonuç vaat etmiyor. Mitokondriyal fonksiyon ve hücresel enerji üzerine kurulu, sabır isteyen bir yaklaşım.",
    readMinutes: 4,
    date: "2026-04-05",
    body: [
      "Longevity alanındaki moleküllerin çoğu, hızlı ve görünür bir etki vaat etmiyor. Hedef aldıkları şey — mitokondriyal fonksiyon, hücresel enerji metabolizması — yıllar içinde birikimli olarak fark yaratan bir katman.",
      "SS-31 gibi mitokondri koruyucu moleküller klinik olarak test edilirken, NAD+ öncülleri ve MOTS-c gibi bileşikler hâlâ insan verisinin olgunlaştığı bir aşamada. Kanıt seviyesi bu yüzden molekülden moleküle büyük farklılık gösteriyor.",
      "Bu alanda en büyük risk, sabırsızlık. Preklinik bir bileşiği klinik kanıtlıymış gibi sunmak, longevity pazarlamasının en yaygın hatası — biz bu ayrımı hiç bulandırmıyoruz.",
      "Uzun vadeli bir stratejide, bugünün küçük ve doğrulanabilir kazanımları, yarının büyük iddialarından daha değerlidir.",
    ],
  },
]

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug)
