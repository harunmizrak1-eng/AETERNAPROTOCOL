export interface Article {
  slug: string
  title: string
  category: string
  excerpt: string
  readMinutes: number
  date: string
  /** paragraphs, kept simple, no CMS yet */
  body: string[]
  relatedLinks?: { href: string; label: string }[]
}

export const articles: Article[] = [
  {
    slug: "bakteriyostatik-su-nedir",
    title: "Bakteriyostatik su nedir, neden normal su olmuyor?",
    category: "Kullanım",
    excerpt:
      "İçindeki benzil alkol ne işe yarıyor, neden 28 gün deniyor ve steril su ile arasındaki fark ne.",
    readMinutes: 4,
    date: "2026-08-21",
    body: [
      "Liyofilize peptidler toz halinde gelir ve kullanılabilmesi için sıvıyla buluşturulması gerekir. Bu iş için normal içme suyu ya da musluk suyu kullanılmaz. Standart çözücü bakteriyostatik sudur.",
      "Bakteriyostatik su, içine yüzde 0,9 oranında benzil alkol eklenmiş steril sudur. Benzil alkolün görevi bakteri üremesini engellemektir. Bu sayede flakona birden fazla kez iğne girse bile içerik kısa sürede kontamine olmaz.",
      "Steril su ile arasındaki fark tam olarak budur. Steril su da temizdir ama koruyucu içermez; bir kez iğne girdikten sonra içine bakteri karışma ihtimali başlar. Bakteriyostatik suyun koruyucusu, flakonun günler boyunca kullanılabilmesini sağlar.",
      "Sık sorulan 28 gün meselesi de buradan geliyor. Benzil alkolün koruyucu etkisi sınırsız değil. Üreticiler, flakona ilk iğne girdikten sonra yaklaşık 28 günlük bir kullanım penceresi bildirir. Bu süre bir garanti değil, koruyucunun makul şekilde iş gördüğü aralıktır.",
      "Sulandırılmış flakon buzdolabında, 2 ile 8 derece arasında saklanır. Dondurulmaz ve ışıktan korunur. Katalogdaki her ürünün kendi sayfasında, o ürüne ait sulandırma oranı ve saklama bilgisi üreticinin verdiği şekliyle yazılıdır.",
      "Bir uyarı: çözelti bulanıklaştıysa, içinde parçacık göründüyse veya rengi değiştiyse kullanılmaz. Süre dolmamış olsa bile bu geçerlidir.",
    ],
    relatedLinks: [
      { href: "/urunler", label: "Ürün kataloğu" },
      { href: "/sss", label: "Sık sorulan sorular" },
    ],
  },
  {
    slug: "liyofilize-ne-demek",
    title: "Liyofilize ne demek, ürün neden toz halinde geliyor?",
    category: "Kullanım",
    excerpt:
      "Dondurarak kurutma nedir, peptidler neden bu şekilde saklanıyor ve kargoda bozulup bozulmadığı sorusunun cevabı.",
    readMinutes: 3,
    date: "2026-08-20",
    body: [
      "Kutuyu açtığınızda flakonun içinde sıvı değil, beyaz bir toz veya ince bir tabaka görürsünüz. Bu liyofilizasyon, yani dondurarak kurutma işleminin sonucudur.",
      "İşlem şöyle çalışır: madde önce dondurulur, sonra vakum altında içindeki su buza dönüşmeden doğrudan buhara geçirilir. Geriye susuz, kuru bir yapı kalır. Peptidler suyun içinde zamanla bozulur; suyu almak onları çok daha uzun süre stabil tutar.",
      "Pratikte en çok sorulan soru bununla ilgili: kargoda bozulur mu? Toz halindeyken peptid oda sıcaklığında taşınmaya dayanıklıdır. Soğuk zincir ihtiyacı sulandırdıktan sonra başlar. Biz de bu yüzden ürünleri normal kargoyla gönderiyoruz ve ertesi gün teslim ediyoruz.",
      "Kutuyu aldığınızda, sulandırana kadar oda sıcaklığında ve güneş görmeyen bir yerde tutmanız yeterlidir. Buzdolabına koymanız gereken an, suyla buluşturduğunuz andır.",
      "Tozun görüntüsü ürüne göre değişebilir. Bazı flakonlarda düzgün beyaz bir tabaka, bazılarında dağılmış ince toz görürsünüz. İkisi de normaldir. Anormal olan, tozun sararmış veya topaklanmış görünmesidir.",
    ],
    relatedLinks: [
      { href: "/kargo", label: "Kargo ve teslimat koşulları" },
      { href: "/urunler", label: "Ürün kataloğu" },
    ],
  },
  {
    slug: "hgh-iu-ne-demek",
    title: "Büyüme hormonunda IU ne demek, kutular nasıl karşılaştırılır?",
    category: "Büyüme Hormonu",
    excerpt:
      "16 IU ile 320 IU arasındaki fark, kalem ile flakon arasındaki fark ve hangi sunumun ne anlama geldiği.",
    readMinutes: 4,
    date: "2026-08-19",
    body: [
      "Peptidler miligram (mg) ile ölçülür ama büyüme hormonunda IU denen bir birim görürsünüz. IU, uluslararası ünite anlamına gelir ve maddenin ağırlığını değil biyolojik etkinliğini ifade eder. Bu yüzden büyüme hormonu kutularını mg ile değil IU ile karşılaştırmak gerekir.",
      "Katalogda 16 IU'dan 320 IU'ya kadar farklı kutular var. Aradaki fark toplam üniteden ibaret. Yani 200 IU'luk bir kutu, 100 IU'luk kutunun iki katı içerik taşır. Ürün sayfalarındaki boyut karşılaştırma tablosu aynı ürünün tüm kutularını üniteye göre sıralar, oradan bakabilirsiniz.",
      "İkinci fark sunum biçiminde. Üç tür var. Liyofilize flakon, toz halinde gelir ve kullanmadan önce sulandırmanız gerekir. Hazır karışım flakon, sulandırılmış olarak gelir. Kalem kartuşu ise doz ayarlı bir kalemin içine takılan hazır kartuştur.",
      "Bu üçü arasındaki seçim etkinlikle değil kullanım kolaylığıyla ilgilidir. Liyofilize flakon en uzun raf ömrüne sahiptir çünkü henüz suyla buluşmamıştır. Hazır karışım ve kalem daha pratiktir ama sulandırılmış olduğu için soğuk saklama gerektirir.",
      "Kutuların üzerinde ZPtrop, ZPtrop AQ gibi isimler görürsünüz. AQ ibaresi aqueous, yani sulu demektir ve o ürünün hazır karışım olduğunu gösterir.",
      "Hangi kutunun size uygun olduğu kullanım planınıza bağlıdır ve bu site bir protokol önerisi vermez. Emin olamadığınız noktada WhatsApp'tan sorabilirsiniz.",
    ],
    relatedLinks: [
      { href: "/urunler?kategori=B%C3%BCy%C3%BCme%20Hormonu", label: "Büyüme hormonu ürünleri" },
      { href: "/peptidler/hgh", label: "Büyüme hormonu bileşik kaydı" },
    ],
  },
  {
    slug: "zphc-orijinal-mi-nasil-anlarim",
    title: "Elimdeki ZPHC ürünü orijinal mi, nasıl anlarım?",
    category: "Doğrulama",
    excerpt:
      "Kutudaki doğrulama kodu neyi kanıtlar, neyi kanıtlamaz. Koda bakmadan önce fark edebileceğiniz işaretler ve sonuç olumsuz çıkarsa ne yapmalısınız.",
    readMinutes: 5,
    date: "2026-08-21",
    body: [
      "Bu soru forumlarda sürekli soruluyor ve haklı bir soru. ZPHC bilinen bir marka olduğu için taklidi de yapılıyor. İyi haber şu: ZPHC ürünlerinde orijinalliği satıcıya güvenmeden, doğrudan üreticiye sorarak kontrol edebileceğiniz bir sistem var.",
      "Her ZPHC kutusunda gümüş bir kaplama bulunur. Kazıdığınızda altından harf, rakam ve özel karakterlerden oluşan bir kod çıkar. Bu kodu validation.zphc.com adresine girdiğinizde sorgu üreticinin kendi sunucusunda yapılır. Cevabı size satıcı değil, ZPHC verir. Aradaki fark önemli: bir satıcının orijinal demesiyle üreticinin onaylaması aynı şey değildir.",
      "Kodu girdiğinizde alabileceğiniz üç sonuç var. Kod tanınır ve ilk kez sorgulanmışsa ürün orijinaldir. Kod hiç tanınmıyorsa ürün ZPHC üretimi değildir. Kod tanınıyor ama daha önce sorgulanmış görünüyorsa dikkatli olun: ya sizden önce biri kontrol etmiştir, ya da orijinal bir kutunun kodu kopyalanıp taklit ürüne basılmıştır.",
      "Koda bakmadan önce de fark edebileceğiniz şeyler var. Kutunun mühürü kırılmış veya açılıp kapatılmış görünüyorsa, gümüş bant siz kazımadan önce kazınmışsa, baskı kalitesi düşükse veya yazı fontları tuhaf duruyorsa kodu sorgulamaya bile gerek kalmadan şüphelenmelisiniz. Gümüş bandın önceden kazınmış olması özellikle kötü bir işaret, çünkü kodu başkası zaten görmüş demektir.",
      "Şunu da açıkça söylemek gerekir: doğrulama kodu ambalajın gerçekliğini kanıtlar, flakonun içindekini kanıtlamaz. Orijinal bir kutunun içeriği sonradan değiştirilmiş olabilir. Kod sorgusu bu ihtimali ortadan kaldırmaz. Bu yüzden kodun yanında ürünü nereden aldığınız da önemlidir. Tedarik zinciri ne kadar kısaysa, arada müdahale ihtimali o kadar azalır.",
      "Sonuç olumsuz çıkarsa ürünü kullanmayın. Aldığınız yere durumu bildirin ve elinizdeki kutunun fotoğraflarını saklayın. Sorgu ekranının görüntüsünü de alın; iade veya şikayet sürecinde işinize yarar.",
    ],
    relatedLinks: [
      { href: "/dogrulama", label: "Adım adım doğrulama anlatımı" },
      { href: "/urunler", label: "Ürün kataloğu" },
    ],
  },
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
    category: "Uzun Yaşam",
    excerpt:
      "Uzun yaşamanın asıl ölçüsü kaç yıl yaşadığınız değil, kaç yılı sağlıkla geçirdiğiniz. Bunun neden daha önemli olduğu.",
    readMinutes: 3,
    date: "2026-06-04",
    body: [
      "Uzun yaşam denince akla ömür uzunluğu geliyor. Oysa asıl mesele bu değil. Ortalama insan, ömrünün son yıllarının önemli bir kısmını düşük sağlıkla geçiriyor.",
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
      "İki molekülün farklı mekanizmalarla aynı sürece katkı sağlaması, birlikte kullanımın arkasındaki mantık. Biri damarlanmayı, diğeri hücresel göçü destekliyor. Teorik olarak tamamlayıcı bir çift.",
      "Ancak burada dürüst olmak gerekiyor: bu kombinasyonun insan verisi büyük ölçüde anekdotal. Mekanizma güçlü, kontrollü klinik çalışma yok. Kütüphanemizde bu ikili 'Mekanistik / Teorik' kademesinde sınıflandırılıyor, 'Klinik Kanıt' değil.",
      "Bu ayrımı bulanıklaştırmadan sunmak, sporcu ve aktif bireylerle çalışırken en çok önem verdiğimiz nokta. Doğru beklenti, doğru sonucun ilk şartı.",
    ],
  },
  {
    slug: "kognitif-protokoller-semax-selank",
    title: "Kognitif protokollerde Rusya kaynaklı iki molekül",
    category: "Bilişsel",
    excerpt:
      "Semax ve Selank, Rusya'da onlarca yıldır klinik kullanımda ama batı literatüründe hâlâ az tanınıyor. Aradaki fark neden önemli?",
    readMinutes: 3,
    date: "2026-06-25",
    body: [
      "Semax ve Selank, ACTH ve tuftsin türevi iki nöropeptid. İkisi de Rusya'da resmi klinik kullanımda; batıda ise büyük ölçüde araştırma aşamasında kalmış moleküller.",
      "Semax'ın BDNF ve dopaminerjik sinyali desteklediği, Selank'ın ise sedasyon yaratmadan anksiyolitik etki gösterdiği düşünülüyor. Mekanizmaları makul ve tutarlı, ancak kontrollü randomize çalışmaların çoğu Rusça literatürde ve batı standartlarında tekrarlanmamış.",
      "Bu, molekülleri geçersiz kılmaz. Yalnızca kanıt seviyelerini 'Mekanistik / Teorik' kademesinde tutar. Kognitif protokollerde bu şeffaflık, özellikle yüksek performans beklentisi olan bireyler için kritik: beklenti gerçek kanıt seviyesiyle uyumlu olmalı.",
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
    category: "Cilt & Yaşlanma",
    excerpt:
      "Topikal ürünlerin sınırı cildin yüzeyinde biter. GHK-Cu gibi moleküller, yenilenmeyi hücresel düzeyde tetiklemeyi hedefliyor.",
    readMinutes: 3,
    date: "2026-05-02",
    body: [
      "Cilt bakımının çoğu, yüzeyde kalan bir müdahale. Nemlendirme, koruma, düzeltme. Hepsi gerekli ama hücresel yenilenme hızını değiştirmiyor.",
      "GHK-Cu gibi bakır bağlı peptidler, kolajen ve elastin sentezini doğrudan uyararak farklı bir katmanda çalışıyor. RCT'lerle desteklenen az sayıda estetik molekülden biri olması, onu kütüphanemizde 'Klinik Kanıt' kademesine taşıyor.",
      "Ancak tek başına bir molekül, bir protokol değildir. Doz, uygulama şekli (topikal veya enjekte edilebilir) ve bireyin başlangıç noktası, sonucu belirleyen asıl değişkenler.",
      "Anti-aging'i bir ürün seçimi değil, sürdürülebilir bir sistem olarak kurmak. Yaklaşımımızın temel farkı burada.",
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
      "CJC-1295 ve Ipamorelin gibi kombinasyonlar, büyüme hormonu salınımını fizyolojik atım paternine yakın bir şekilde uyararak bu pencereyi desteklediği düşünülüyor. Mekanizma iyi tanımlı, ama uzun dönem randomize veri sınırlı. Bu yüzden 'Mekanistik / Teorik' kademesinde yer alıyor.",
      "Toparlanma odaklı bir protokol kurarken asıl soru molekül değil: uyku kalitesi, yük yönetimi ve biyobelirteç takibi olmadan hiçbir molekül tek başına yeterli değil.",
      "Performans protokollerimiz bu yüzden her zaman çok boyutlu kurulur, tek değişkenli değil.",
    ],
  },
  {
    slug: "hucresel-saglik-uzun-vade",
    title: "Hücresel sağlık, uzun vadeli bir proje",
    category: "Uzun Yaşam",
    excerpt:
      "Bu alandaki moleküller hızlı sonuç vaat etmiyor. Mitokondriyal fonksiyon ve hücresel enerji üzerine kurulu, sabır isteyen bir yaklaşım.",
    readMinutes: 4,
    date: "2026-04-05",
    body: [
      "Uzun yaşam alanındaki moleküllerin çoğu hızlı ve görünür bir etki vaat etmiyor. Hedef aldıkları şey, yani mitokondriyal fonksiyon ve hücresel enerji metabolizması, yıllar içinde birikimli olarak fark yaratan bir katman.",
      "SS-31 gibi mitokondri koruyucu moleküller klinik olarak test edilirken, NAD+ öncülleri ve MOTS-c gibi bileşikler hâlâ insan verisinin olgunlaştığı bir aşamada. Kanıt seviyesi bu yüzden molekülden moleküle büyük farklılık gösteriyor.",
      "Bu alanda en büyük risk, sabırsızlık. Preklinik bir bileşiği klinik kanıtlıymış gibi sunmak, longevity pazarlamasının en yaygın hatası. Biz bu ayrımı hiç bulandırmıyoruz.",
      "Uzun vadeli bir stratejide, bugünün küçük ve doğrulanabilir kazanımları, yarının büyük iddialarından daha değerlidir.",
    ],
  },
  {
    slug: "kaynak-politikamiz-neden-onemli",
    title: "Neden bazı bileşiklerin kaynağı var, bazılarının yok?",
    category: "Yaklaşım",
    excerpt:
      "Kütüphanemizdeki her PMID gerçek ve doğrulanabilir. Bir bileşiğin kaynağı yoksa, bu, aramadığımız değil, bulamadığımız anlamına gelir.",
    readMinutes: 3,
    date: "2026-07-08",
    body: [
      "Kısa süre önce GHK-Cu'yu kütüphanemizde 'Klinik Kanıt' kademesinden 'Mekanistik / Teorik' kademesine indirdik. Neden? Çünkü bağımsız bir insan RCT'si aradık ve bulamadık. Mekanizma hücre kültürü ve hayvan modellerinde iyi tanımlı ama bu, klinik kanıtla aynı şey değil.",
      "Kaynak eklerken PMID ve DOI numaralarını gerçek veritabanlarından çekiyoruz. Bir bileşik için doğrulanabilir bir kaynak yoksa, sayfasında kaynak bölümü hiç görünmez. Uydurma bir referans eklenmez.",
      "Bu bazı okuyucular için garip görünebilir: neden Retatrutide'nin sayfasında PMID ve DOI var da BPC-157'de yok? Cevap basit: biri randomize kontrollü bir insan çalışmasıyla test edildi, diğeri henüz edilmedi. İkisi de değerli olabilir; ama ikisi aynı cümleyle anlatılamaz.",
      "Bu sürecin tamamını metodoloji sayfamızda açıkladık. Amacımız güven telkin etmek değil, güvenin nereden geldiğini göstermek.",
    ],
    relatedLinks: [
      { href: "/metodoloji", label: "Metodoloji: Kanıtı nasıl değerlendiriyoruz" },
      { href: "/peptidler/ghk-cu", label: "GHK-Cu bileşik sayfası" },
    ],
  },
  {
    slug: "apob-ldl-den-neden-daha-iyi",
    title: "ApoB, LDL-kolesterolden neden daha iyi bir gösterge?",
    category: "Biyobelirteç",
    excerpt:
      "Standart lipit paneli aterojenik parçacık sayısını kaçırabilir. ApoB'nin metabolik protokollerde neden ayrı bir belirteç olarak izlendiği.",
    readMinutes: 3,
    date: "2026-07-01",
    body: [
      "LDL-kolesterol, aslında kandaki LDL parçacıklarının içindeki kolesterol miktarını ölçer, parçacık sayısını değil. Bazı bireylerde LDL-kolesterol normal görünürken parçacık sayısı yüksek olabilir; bu duruma bazen 'gizli risk' deniyor.",
      "ApoB, her aterojenik parçacığın yüzeyinde tam olarak bir kopya bulunan bir protein olduğu için, parçacık sayısını doğrudan verir. Bu yüzden kardiyovasküler risk değerlendirmesinde LDL-kolesterole göre daha isabetli kabul ediliyor.",
      "Metabolik protokollerimizde ApoB'yi bu yüzden ayrı bir belirteç olarak izliyoruz; özellikle Retatrutide, Semaglutide ve Tirzepatide gibi molekülleri kullanan danışanlarda, kilo kaybının ötesinde kardiyometabolik riskin nasıl değiştiğini görmek için.",
      "Biyobelirteç sözlüğümüzde ApoB'yi bu bağlamda detaylandırdık.",
    ],
    relatedLinks: [
      { href: "/peptidler/retatrutide", label: "Retatrutide bileşik sayfası" },
    ],
  },
  {
    slug: "tesamorelin-viseral-yag-meta-analiz",
    title: "Tesamorelin: viseral yağ için en çok kanıtlanan büyüme hormonu analoğu",
    category: "Büyüme Hormonu",
    excerpt:
      "Beş randomize kontrollü çalışmanın meta-analizi, tesamorelinin vücut kompozisyonu üzerindeki etkilerini net şekilde ortaya koyuyor.",
    readMinutes: 3,
    date: "2026-06-15",
    body: [
      "HIV ilişkili lipodistrofi endikasyonunda FDA onaylı olan tesamorelin, büyüme hormonu ekseni içindeki en sağlam insan verisine sahip moleküllerden biri.",
      "Yakın zamanda yayınlanan bir meta-analiz, beş randomize kontrollü çalışmayı bir araya getirerek viseral yağ dokusu, karaciğer yağ oranı ve yağsız vücut kütlesi üzerindeki etkileri özetliyor.",
      "Sonuçlar tutarlı: viseral yağ dokusunda ve karaciğer yağ oranında anlamlı azalma, yağsız kütlede artış, üstelik glikoz metabolizmasını bozmadan.",
      "Bu, kütüphanemizde tesamorelini 'Klinik Kanıt' kademesine yerleştirmemizin nedeni. Sonuç bazlı kanıt matrisini bileşik sayfasında görebilirsiniz.",
    ],
    relatedLinks: [
      { href: "/peptidler/tesamorelin", label: "Tesamorelin bileşik sayfası" },
    ],
  },
  {
    slug: "gh-salgilaticilar-ipamorelin-sermorelin",
    title: "Büyüme hormonu salgılatıcıları: Ipamorelin ve Sermorelin farkı",
    category: "Büyüme Hormonu",
    excerpt:
      "İkisi de doğal büyüme hormonu salınımını uyarır ama farklı reseptörler üzerinden. Aradaki mekanik fark neden önemli?",
    readMinutes: 3,
    date: "2026-07-15",
    body: [
      "Büyüme hormonu ekseniyle çalışan iki farklı yaklaşım var: GHRH analogları ve ghrelin reseptör agonistleri. Sermorelin birincisine, Ipamorelin ikincisine örnek.",
      "Sermorelin, GHRH'nin aktif fragmanı olarak hipofizin kendi salınım ritmini korur. Ipamorelin ise ghrelin reseptörü üzerinden çalışır ve seçiciliğiyle öne çıkar. Kortizol ve prolaktini belirgin etkilemeden büyüme hormonu salınımını uyardığı öne sürülür.",
      "Bu iki yol tamamlayıcı olduğu için, pratikte bir GHRH analoğu ile bir ghrelin agonistinin birlikte kullanımı sık görülür (ör. CJC-1295 + Ipamorelin). Amaç, iki farklı sinyali aynı anda vererek daha fizyolojik bir salınım paterni oluşturmak.",
      "Her ikisi de kütüphanemizde 'Mekanistik / Teorik' kademesinde: mekanizma iyi tanımlı, ancak uzun dönem geniş kontrollü insan verisi sınırlı. Bu ayrımı, beklentiyi doğru kurmak için net tutuyoruz.",
    ],
    relatedLinks: [
      { href: "/peptidler/ipamorelin", label: "Ipamorelin bileşik sayfası" },
      { href: "/peptidler/sermorelin", label: "Sermorelin bileşik sayfası" },
    ],
  },
  {
    slug: "preklinik-ne-anlama-gelir",
    title: "'Preklinik' bir bileşik ne anlama gelir, ne anlama gelmez?",
    category: "Yaklaşım",
    excerpt:
      "Thymosin Beta-4 gibi moleküller hayvan modellerinde umut verici. Ama 'preklinik' etiketi, tam olarak neyi söyler ve neyi söylemez?",
    readMinutes: 3,
    date: "2026-07-22",
    body: [
      "Bir bileşiği 'preklinik' olarak etiketlediğimizde, kanıtın büyük ölçüde hücre kültürü ve hayvan çalışmalarına dayandığını, kontrollü insan verisinin ya hiç olmadığını ya da neredeyse hiç olmadığını kastediyoruz.",
      "Bu, molekülün 'işe yaramadığı' anlamına gelmez. Thymosin Beta-4'ün hayvan modellerinde doku onarımı üzerindeki etkileri gerçek ve tekrarlanabilir. Ama hayvan modelinden insana geçiş, biyolojinin en zorlu adımlarından biridir. Birçok umut verici molekül bu geçişte beklentiyi karşılayamaz.",
      "Bu yüzden preklinik bileşikleri, klinik kanıtlı olanlarla aynı cümlede sunmayız. İkisi de değerli olabilir; ama biri 'insanda gösterildi', diğeri 'henüz gösterilmedi' der. Bu farkı bulanıklaştırmak, sektörün en yaygın yanıltmasıdır.",
      "Kütüphanemizdeki her etiketin arkasındaki mantığı metodoloji sayfamızda ayrıntılandırdık.",
    ],
    relatedLinks: [
      { href: "/metodoloji", label: "Metodoloji: Kanıtı nasıl değerlendiriyoruz" },
      { href: "/peptidler/thymosin-beta-4", label: "Thymosin Beta-4 bileşik sayfası" },
    ],
  },
  {
    slug: "uyku-mimarisi-ve-toparlanma",
    title: "Uyku mimarisi: toparlanmanın görünmeyen altyapısı",
    category: "Uzun Yaşam",
    excerpt:
      "Derin uyku ve REM oranları, toparlanmanın ham süreden daha belirleyici bileşenleri. Neden uyku 'süresi' tek başına yeterli bir ölçüt değil?",
    readMinutes: 3,
    date: "2026-07-29",
    body: [
      "Uyku çoğu zaman tek bir sayıyla konuşulur: kaç saat. Oysa toparlanma açısından asıl belirleyici olan, o saatlerin nasıl dağıldığı: derin (yavaş dalga) uyku ve REM oranları.",
      "Derin uyku, fiziksel toparlanma ve hormonal düzenlenmeyle; REM ise bilişsel konsolidasyon ve duygusal işlemlemeyle ilişkilendirilir. İkisinin de baskılandığı bir gece, süre olarak 'yeterli' görünse bile fonksiyonel olarak yetersiz olabilir.",
      "Bu yüzden takip ettiğimiz belirteçler arasında toplam süre kadar uyku mimarisi ve HRV gibi otonom toparlanma sinyalleri de yer alır. DSIP gibi uykuyla ilişkilendirilen bileşiklerse hâlâ erken araştırma aşamasında. Mekanizma ilgi çekici ama insan verisi sınırlı ve tutarsız.",
      "Toparlanmayı bir sayıya değil, bir yapıya bakarak değerlendirmek. Yaklaşımımızın temel farklarından biri bu.",
    ],
    relatedLinks: [
      { href: "/peptidler/dsip", label: "DSIP bileşik sayfası" },
    ],
  },
]

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug)
