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
  sources?: { label: string; href: string }[]
}

export const articles: Article[] = [
  {
    slug: "bakteriyostatik-su-nedir",
    title: "Bakteriyostatik su nedir, neden normal su olmuyor?",
    category: "Kullanım",
    excerpt:
      "İçindeki benzil alkol ne işe yarıyor, neden 28 gün deniyor ve steril su ile arasındaki fark ne.",
    readMinutes: 7,
    date: "2026-09-13",
    body: [
      "Liyofilize peptitler toz halinde gelir ve kullanılabilmesi için sıvıyla buluşturulması gerekir. Bu iş için musluk suyu, içme suyu, kontakt lens solüsyonu veya evde bulunan başka bir sıvı kullanılmaz. Hiçbiri enjeksiyonluk kalitede üretilmez; enjeksiyonluk kalite, suyun yalnızca temiz olmasını değil, partikülsüz, pirojensiz ve kontrollü koşullarda ambalajlanmış olmasını anlatır. Standart çözücü bakteriyostatik sudur.",
      "Bakteriyostatik su, içine ağırlıkça yaklaşık yüzde 0,9 oranında benzil alkol eklenmiş enjeksiyonluk sudur. Benzil alkol burada bir etken madde değil, koruyucudur. Görevi bakteriyi öldürmek değil, üremesini durdurmaktır; adı da buradan gelir. Bakteriyostatik, bakteriyi hareketsiz bırakan anlamına gelir, bakterisit yani öldürücü değildir. Bu ayrım pratikte şu demek: koruyucu, tıpadan içeri kaçan az sayıda mikroorganizmanın çoğalmasını engeller, ama kirlenmiş bir flakonu temizlemez.",
      "Steril su ile arasındaki fark tam olarak bu koruyucudur. Steril su da enjeksiyonluk kalitededir ve içinde mikroorganizma yoktur, ama koruyucu içermez. Tıpadan ilk iğne girdiği anda içine bakteri karışma ihtimali başlar ve onu durduracak bir şey yoktur. Bu yüzden steril su tek kullanımlık sayılır. Kural basit: flakon tek seferde bitecekse steril su da iş görür, birden fazla kez iğne girecekse bakteriyostatik su kullanılır.",
      "Sık sorulan 28 gün meselesi de buradan geliyor. Benzil alkolün koruyucu etkisi sınırsız değildir ve zamanla azalır. Çok kullanımlı flakonlar için yerleşik eczacılık pratiği, tıpaya ilk giriş yapıldıktan sonra yaklaşık dört haftalık bir kullanım penceresi kabul etmektir. Bu bir garanti değil, koruyucunun makul biçimde iş gördüğü kabul edilen aralıktır. Kutunun kendi etiketinde bir süre yazıyorsa esas olan odur, internette dolaşan genel sayı değil.",
      "Sürenin başlangıcı da sık karıştırılıyor. Sayaç, suyu satın aldığınız gün değil, flakona ilk iğne girdiği gün başlar. Kapalı duran bir bakteriyostatik su flakonunun kendi son kullanma tarihi vardır ve o ayrı bir şeydir.",
      "Ne kadar su ekleneceği sorusunun tek bir doğru cevabı yoktur ve bu, insanların en çok takıldığı noktadır. Eklenen su flakondaki toplam maddeyi değiştirmez, yalnızca çözeltinin yoğunluğunu belirler. Aynı miktar için az suda küçük, çok suda büyük bir hacim çekersiniz. Seçim bu yüzden matematiksel bir zorunluluk değil, şırınga skalasında rahat okunabilen bir çizgiye denk gelme tercihidir. Sitedeki hesaplayıcı tam olarak bunu gösterir: flakon miktarını ve suyu girdiğinizde kaç ünite çekileceğini hesaplar ve okuması kolay bir çizgiye denk gelen bir su miktarı varsa onu önerir.",
      "Sulandırılmış flakon buzdolabında, 2 ile 8 santigrat derece arasında saklanır. Dondurulmaz; donma ve çözülme döngüsü peptit yapısını yıpratır. Işıktan korunur ve kapağı her kullanımdan sonra silinir. Sulandırılmamış toz için bu kadar hassas bir koşul gerekmez, kuru ve serin bir yer yeterlidir. Asıl hassas olan hâl, suyla buluştuktan sonrasıdır.",
      "Bir uyarı: çözelti bulanıklaştıysa, içinde parçacık belirdiyse veya rengi değiştiyse kullanılmaz. Süre dolmamış olsa bile bu geçerlidir. Berraklık, gözle yapılabilecek tek kontroldür ve bedavadır.",
      "Son olarak bir satın alma notu: her ürün suyuyla birlikte gelmez. Kit olarak satılan setlerde ve çift hazneli kartuşlu kalemlerde çözücü kutunun içindedir; adında yalnızca flakon geçen ürünlerde suyu ayrıca temin etmek gerekir. Hangi üründe ne çıktığı ürün sayfasının içerik bölümünde yazılıdır.",
    ],
    relatedLinks: [
      { href: "/sulandirma-rehberi", label: "Sulandırma rehberi" },
      { href: "/hesaplayici", label: "Doz hesaplayıcı" },
      { href: "/urunler", label: "Ürün kataloğu" },
    ],
  },
  {
    slug: "liyofilize-ne-demek",
    title: "Liyofilize ne demek, ürün neden toz halinde geliyor?",
    category: "Kullanım",
    excerpt:
      "Dondurarak kurutma nedir, peptitler neden bu şekilde saklanıyor ve kargoda bozulup bozulmadığı sorusunun cevabı.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Kutuyu açtığınızda flakonun içinde sıvı değil, beyaz bir toz, ince bir tabaka ya da flakonun dibine yapışmış gibi duran bir pul görürsünüz. Bu liyofilizasyon, yani dondurarak kurutma işleminin sonucudur ve bir kusur değil, üretim biçimidir.",
      "İşlem üç aşamalıdır. Madde önce çözelti halinde iken dondurulur. Ardından vakum altında basınç düşürülür ve buz, sıvı hale hiç geçmeden doğrudan buhara dönüşür; bu geçişe süblimleşme denir. Son aşamada kalan bağlı nem de uzaklaştırılır. Geriye gözenekli, süngerimsi, neredeyse susuz bir yapı kalır.",
      "Neden bu zahmete giriliyor? Çünkü peptitler suyun içinde stabil değildir. Su, peptit zincirindeki bağların kimyasal olarak parçalanmasına ortam hazırlar; sıcaklık arttıkça bu hızlanır. Suyu almak, reaksiyonun ihtiyaç duyduğu ortamı ortadan kaldırır. Aynı molekül sulu halde haftalarla ölçülen bir raf ömrüne sahipken toz halinde aylarca, uygun koşulda daha uzun süre bozulmadan durabilir.",
      "Gözenekli yapının ikinci bir faydası var: su eklendiğinde toz saniyeler içinde çözünür. Sulandırma sırasında suyu doğrudan tozun üstüne püskürtmek yerine flakonun iç çeperine akıtmanın nedeni de budur; doğrudan püskürtmek bu gözenekli yapıyı dağıtır ve çözünmeyi zorlaştırır.",
      "Pratikte en çok sorulan soru kargoyla ilgili: yolda bozulur mu? Toz halindeyken peptit oda sıcaklığındaki kısa taşıma sürelerine dayanacak biçimde üretilir. Soğuk zincir ihtiyacı sulandırdıktan sonra başlar. Ürünler bu yüzden normal kargoyla gönderilir ve ertesi gün teslim edilir.",
      "Kutu elinize geçtiğinde, sulandırana kadar kuru, serin ve güneş görmeyen bir yerde tutmanız yeterlidir. Buzdolabına koymanız gereken an, suyla buluşturduğunuz andır. Kullanılmayacak flakonları şimdiden sulandırmanın hiçbir faydası yoktur, tersine raf ömrünü kısaltır: ihtiyaç duyulan flakon sulandırılır, kalanlar toz halinde bekletilir.",
      "Tozun görüntüsü ürüne göre değişir. Bazı flakonlarda düzgün, disk gibi duran beyaz bir tabaka, bazılarında dağılmış ince toz görürsünüz. Tabakanın çatlamış ya da flakonun kenarına kaymış olması da normaldir; taşıma sırasındaki titreşim bunu yapar ve çözünmeyi etkilemez.",
      "Anormal olan başka şeyler vardır: tozun sararmış olması, topaklanıp sert bir kütleye dönüşmesi, flakonun içinde nem izi bulunması ya da kauçuk tıpanın içe doğru çökmek yerine dışarı kabarmış olması. Liyofilize flakonlar genellikle vakum altında kapatılır, bu yüzden tıpanın hafif içe çekik durması beklenir. Dışa kabarma, vakumun kaybolduğunu ve flakonun sızdırmış olabileceğini gösterir.",
    ],
    relatedLinks: [
      { href: "/sulandirma-rehberi", label: "Adım adım sulandırma rehberi" },
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
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Peptitler miligram ile ölçülür ama büyüme hormonunda IU denen bir birim görürsünüz. IU, uluslararası ünite anlamına gelir ve maddenin ağırlığını değil biyolojik etkinliğini ifade eder. Bu ayrım, birimin neden var olduğunu da açıklıyor: biyolojik ürünlerin etkinliği yalnızca ağırlıklarına bakılarak karşılaştırılamadığı için, referans bir standart karşısında ölçülen etkinliğe göre tanımlanmış ortak bir birim geliştirilmiştir.",
      "Pratikte en çok karıştırılan nokta, mg ile IU arasında evrensel bir çeviri katsayısı aramak. Böyle bir katsayı genel olarak yoktur; her biyolojik madde için IU tanımı ayrı ayrı belirlenir. Bu yüzden bir büyüme hormonu kutusunu bir peptit kutusuyla aynı tabloda karşılaştırmaya çalışmak anlamsızdır. Büyüme hormonu kutuları kendi aralarında, IU üzerinden kıyaslanır.",
      "Katalogda farklı toplam üniteye sahip kutular bulunur ve aradaki fark yalnızca toplam içeriktir. 200 IU'luk bir kutu, 100 IU'luk kutunun iki katı içerik taşır. Ürün sayfalarındaki boyut karşılaştırma tablosu aynı ürünün tüm kutularını üniteye göre sıralar; hangi kutunun hangisine karşılık geldiğini oradan tek bakışta görebilirsiniz.",
      "İkinci fark sunum biçiminde ve bu, fiyat kadar kullanım deneyimini de belirler. Üç tür vardır. Liyofilize flakon toz halinde gelir ve kullanmadan önce sulandırılması gerekir. Hazır karışım flakon sulandırılmış olarak gelir, kutudan çıktığı gibi kullanılır. Kalem kartuşu ise doz ayarlı bir kalemin içine takılan hazır kartuştur.",
      "Bu üçü arasındaki seçim etkinlikle değil kullanım kolaylığı ve saklama koşullarıyla ilgilidir. Liyofilize flakon en uzun raf ömrüne sahiptir, çünkü henüz suyla buluşmamıştır; taşınması da en toleranslı olanıdır. Hazır karışım ve kalem daha pratiktir ama sulandırılmış olduğu için baştan sona soğuk saklama ister ve raf ömrü daha kısadır. Seyahat edecek biri için bu fark önemli olabilir.",
      "Kutuların üzerinde ZPtrop, ZPtrop AQ gibi isimler görürsünüz. AQ ibaresi aqueous, yani sulu demektir ve o ürünün hazır karışım olduğunu gösterir. Adında AQ geçmeyen bir ZPtrop kutusu liyofilize, yani toz formdadır. Bu tek harflik fark, kutuyu aldığınızda sulandırma yapıp yapmayacağınızı belirler.",
      "Üçüncü bir ayrım da ambalaj yapısında. Çift hazneli kartuşlarda bir haznede toz, diğerinde çözücü bulunur ve ikisi kullanımdan hemen önce, kalemin kendi mekanizmasıyla birleştirilir. Bu yapı liyofilize ürünün uzun raf ömrünü hazır kalemin pratikliğiyle birleştirmeyi amaçlar; ayrı bir su flakonu almanıza gerek kalmaz.",
      "Kutu üzerindeki IU değeri bir kullanım önerisi değildir, kutunun içinde ne kadar ürün bulunduğunu söyler. Hangi kutunun size uygun olduğu kullanım planınıza bağlıdır ve bu site bir protokol önerisi vermez. Kutular arasındaki teknik farkı anlamadığınız bir noktada WhatsApp hattından sorabilirsiniz.",
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
    readMinutes: 7,
    date: "2026-09-13",
    body: [
      "Bu soru forumlarda sürekli soruluyor ve haklı bir soru. ZPHC bilinen bir marka olduğu için taklidi de yapılıyor. İyi haber şu: ZPHC ürünlerinde orijinalliği satıcıya güvenmeden, doğrudan üreticiye sorarak kontrol edebileceğiniz bir sistem var.",
      "Her ZPHC kutusunda gümüş bir kaplama bulunur. Kazıdığınızda altından harf, rakam ve özel karakterlerden oluşan bir kod çıkar. Bu kodu validation.zphc.com adresine girdiğinizde sorgu üreticinin kendi sunucusunda yapılır. Cevabı size satıcı değil, ZPHC verir. Aradaki fark önemli: bir satıcının orijinal demesiyle üreticinin onaylaması aynı şey değildir.",
      "Kodu girdiğinizde alabileceğiniz üç sonuç var. Kod tanınır ve ilk kez sorgulanmışsa ürün orijinaldir. Kod hiç tanınmıyorsa ürün ZPHC üretimi değildir. Kod tanınıyor ama daha önce sorgulanmış görünüyorsa dikkatli olun: ya sizden önce biri kontrol etmiştir, ya da orijinal bir kutunun kodu kopyalanıp taklit ürüne basılmıştır.",
      "Koda bakmadan önce de fark edebileceğiniz şeyler var. Kutunun mühürü kırılmış veya açılıp kapatılmış görünüyorsa, gümüş bant siz kazımadan önce kazınmışsa, baskı kalitesi düşükse veya yazı fontları tuhaf duruyorsa kodu sorgulamaya bile gerek kalmadan şüphelenmelisiniz. Gümüş bandın önceden kazınmış olması özellikle kötü bir işaret, çünkü kodu başkası zaten görmüş demektir.",
      "Şunu da açıkça söylemek gerekir: doğrulama kodu ambalajın gerçekliğini kanıtlar, flakonun içindekini kanıtlamaz. Orijinal bir kutunun içeriği sonradan değiştirilmiş olabilir. Kod sorgusu bu ihtimali ortadan kaldırmaz. Bu yüzden kodun yanında ürünü nereden aldığınız da önemlidir. Tedarik zinciri ne kadar kısaysa, arada müdahale ihtimali o kadar azalır.",
      "Kodu kazımadan önce yapılacak bir şey daha var: kutuyu kargo görevlisi yanınızdayken açın ve kazımayı o an yapmayın, önce ambalajı inceleyin. Gümüş bant kazınmış görünüyorsa ürünü teslim almadan geri çevirebilirsiniz. Bant kazındıktan sonra iade süreci her zaman daha tartışmalı hale gelir, çünkü karşı taraf kodun sizin tarafınızdan kullanıldığını öne sürebilir.",
      "Sık sorulan bir soru da şu: aynı kutuyu ikinci kez sorgularsam ne olur? Sistem kodun daha önce sorgulandığını gösterir. Bu, kendi kutunuzu iki kez kontrol ettiğinizde de olur, yani ikinci sorgu tek başına kötü bir işaret değildir. Kötü işaret, kutuyu ilk kez siz açtığınız halde sistemin kodu daha önce sorgulanmış göstermesidir.",
      "Sonuç olumsuz çıkarsa ürünü kullanmayın. Aldığınız yere durumu bildirin ve elinizdeki kutunun fotoğraflarını saklayın: kutunun altı ve üstü, seri numarasının okunduğu yüz, kazınmış bant ve flakonun kendisi. Sorgu ekranının görüntüsünü de alın. Bu görseller iade veya şikayet sürecinde tek elle tutulur kanıtınızdır ve sonradan üretilemezler.",
      "Son bir uyarı, belki de en önemlisi: doğrulama kodu ambalajın gerçekliğini gösterir, ürünün nereden geldiğini göstermez. Resmî olmayan bir kanaldan alınan, doğrulaması geçen bir kutu bile elden ele dolaşmış olabilir. Bu yüzden kod sorgusu satıcı seçimini gereksiz kılmaz, onu tamamlar.",
    ],
    relatedLinks: [
      { href: "/dogrulama", label: "Adım adım doğrulama anlatımı" },
      { href: "/urunler", label: "Ürün kataloğu" },
    ],
  },
  {
    slug: "retatrutide-nedir",
    title: "Retatrutide nedir? Bugünkü araştırma durumu",
    category: "Metabolik",
    excerpt:
      "Üçlü reseptör mekanizması, yayımlanmış Faz 2 verisi ve devam eden Faz 3 programı hakkında net bir durum özeti.",
    readMinutes: 8,
    date: "2026-09-13",
    body: [
      "Retatrutide, GIP, GLP-1 ve glukagon reseptörlerini aynı molekülde hedefleyen deneysel bir üçlü agonist. Onu semaglutide ve tirzepatide gibi daha tanınmış isimlerden ayıran temel nokta bu üçüncü, glukagon bileşeni. Mekanizma ilgi çekici; asıl önemli olan ise hangi verinin yayımlandığı ve hangisinin henüz yalnızca şirket açıklaması düzeyinde kaldığı.",
      "Hakemli en önemli yayın 2023 tarihli Faz 2 çalışması. Çalışmaya obezitesi veya fazla kilosuna eşlik eden bir sağlık sorunu bulunan, diyabeti olmayan 338 yetişkin katıldı. Kırk sekiz haftalık sonuçlarda vücut ağırlığındaki değişim doz gruplarına göre farklılaştı. En sık bildirilen istenmeyen etkiler gastrointestinaldi ve kalp hızında doza bağlı artış görüldü.",
      "Faz 3 tarafında TRIUMPH-1 kaydı Nisan 2026'da tamamlandı. Lilly Mayıs 2026'da olumlu üst düzey sonuçlar açıkladı. Bu açıklama önemli, fakat bir basın duyurusu hakemli tam makalenin yerini tutmaz. Ayrıca retatrutide geliştirme programındaki başka çalışmalar devam ediyor.",
      "Bu yüzden en doğru ifade şu: retatrutide insan çalışmalarında güçlü sonuçlar üretmiş, Faz 3 verileri açıklanmaya başlamış, ancak hâlâ araştırma aşamasında olan bir molekül. Onaylı bir ürün veya kesinleşmiş bir tedavi gibi anlatmak doğru değil.",
      "Mekanizmanın neden ilgi çektiğini anlamak için üç reseptörün ne yaptığına bakmak gerekiyor. GLP-1 yolu tokluk sinyalini ve mide boşalma hızını etkiler; semaglutide gibi moleküllerin bilinen etkisi büyük ölçüde buradan gelir. GIP yolu insülin salınımı ve yağ dokusu metabolizmasıyla ilişkilendirilir; tirzepatide bu ikisini birleştirir. Glukagon yolu ise farklı bir yerden girer: enerji harcaması ve karaciğerdeki yağ metabolizması üzerinde etkili olduğu düşünülür. Retatrutide'yi ayıran, iştahı azaltmanın yanında harcanan enerjiyi de hedeflemeyi amaçlayan bu üçüncü bileşendir.",
      "Buradaki teorik gerekçe makul olsa da, üç yolu aynı anda hedeflemenin beraberinde getirdiği bir bedel de var. Faz 2 çalışmasında bildirilen istenmeyen etkilerin çoğu gastrointestinal sistemle ilgiliydi ve kalp hızında doza bağlı bir artış gözlendi. Bu, molekülün zayıf olduğunu değil, etkisinin bedelsiz olmadığını gösterir; araştırma aşamasında olmasının bir nedeni de bu dengenin uzun vadede nasıl seyrettiğinin henüz bilinmemesidir.",
      "Basın açıklaması ile hakemli yayın arasındaki farkı da netleştirmek gerekiyor, çünkü bu ayrım internette sürekli siliniyor. Bir şirket üst düzey sonuç açıkladığında elinizde tek bir özet sayı olur: genellikle ortalama etki ve olumlu bir cümle. Hakemli makale yayımlandığında ise yöntem, katılımcı özellikleri, çalışmayı bırakma oranları, alt grup sonuçları ve istenmeyen etkilerin tam dökümü görünür hale gelir. İkincisi olmadan bir molekül hakkında kesin konuşmak mümkün değildir.",
      "ZPHC kataloğundaki 20, 30, 40, 60 ve 120 mg ifadeleri klinik doz basamakları değildir. Bunlar kutudaki toplam içeriği ve ambalaj biçimini anlatır. Bu karışıklık sık yaşanıyor: kutunun üzerindeki büyük sayıyı bir kullanım miktarı sanmak, en yaygın okuma hatası. Ürün karşılaştırırken toplam miktar, flakon başına miktar ve kalem ya da kartuş formu ayrı ayrı okunmalıdır.",
      "Özetle durum şu: mekanizması açık, insan çalışmalarında güçlü sonuçlar üretmiş, Faz 3 programı sonuç vermeye başlamış, ancak onaylı bir ürün olmayan bir molekül. Bu cümledeki her parça önemli ve hiçbiri diğerinin yerine geçmiyor.",
    ],
    relatedLinks: [
      { href: "/zphc-reta", label: "ZPHC Reta ürün ve kutu karşılaştırması" },
      { href: "/peptidler/retatrutide", label: "Retatrutide kütüphane kaydı" },
      { href: "/journal/reta-kutu-uzerindeki-mg-ne-demek", label: "Reta kutusundaki mg ifadeleri" },
    ],
    sources: [
      { label: "NEJM / PubMed, Faz 2 çalışması (PMID 37366315)", href: "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
      { label: "ClinicalTrials.gov, TRIUMPH-1 (NCT05929066)", href: "https://clinicaltrials.gov/study/NCT05929066" },
      { label: "Eli Lilly, TRIUMPH-1 üst düzey sonuçları, 21 Mayıs 2026", href: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss" },
    ],
  },
  {
    slug: "reta-kutu-uzerindeki-mg-ne-demek",
    title: "Reta kutusundaki 20, 40, 60 ve 120 mg neyi gösterir?",
    category: "Ürün Rehberi",
    excerpt: "Toplam kutu içeriği ile flakon başına miktar aynı şey değil. ZPHC Reta adlarını doğru okumak için kısa rehber.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Bir Reta kutusunda iki ayrı sayı görebilirsiniz. Örneğin “20 mg” kutunun toplam içeriğini, “5 flakon × 4 mg” ise bu toplamın kutuya nasıl dağıldığını anlatır. İki ifade aynı ürüne aittir; biri toplamı, diğeri sunumu söyler.",
      "Aynı mantık 40, 60 ve 120 mg flakon setlerinde de geçerli. Büyük sayı tek bir flakondaki miktar anlamına gelmeyebilir. Ürün adındaki parantezi okumadan yalnızca ön yüzdeki toplam sayıya bakmak bu yüzden yanıltıcıdır.",
      "30 mg hazır kalem ve 60 mg çift hazneli kartuş ise farklı ambalaj biçimleridir. Bunları flakon setleriyle yalnızca toplam mg üzerinden kıyaslamak doğru bir karşılaştırma vermez. Ambalaj türü, hazırlanma biçimi ve kutu kaydı birlikte görülmelidir.",
      "Bu ayrımın neden pratik bir önemi var? Çünkü sulandırma hesabı her zaman tek flakon üzerinden yürür. 120 mg'lık bir kutuya 3 mL su eklemek diye bir şey yoktur; suyu tek bir flakona eklersiniz ve o flakonda 24 mg vardır. Kutu toplamını flakon miktarı sanmak, hesaplamayı beş kat şaşırtır. Sitedeki hesaplayıcıda bileşik seçtiğinizde hazır gelen miktarların kutu toplamı değil flakon başına değerler olmasının sebebi de budur.",
      "Kutu adlarını okurken işe yarayan basit bir kural var: parantez içindeki sayı sizi ilgilendiren sayıdır, parantez dışındaki ise kutunun tamamını anlatır. Parantez yoksa ve ürün bir kalem ya da kartuşsa, addaki tek sayı zaten o tek birimin içeriğidir.",
      "Aynı toplam mg değerine sahip iki kutu da aynı ürün değildir. 60 mg'lık bir flakon seti ile 60 mg'lık çift hazneli bir kalem kutusu, toplam içerik olarak eşittir ama biri beş ayrı flakona bölünmüş liyofilize toz, diğeri tek bir hazır kalemdir. Saklama koşulu, sulandırma ihtiyacı ve kullanım pratiği tamamen farklıdır. Yalnızca mg üzerinden yapılan bir fiyat karşılaştırması bu farkı görmez.",
      "Sitemizdeki mg değerleri bir kullanım önerisi değildir. Katalog sayfasının görevi kutuları birbirinden ayırmak; hangi miktarın kullanılacağını belirlemek değil. Hesaplayıcı da aynı nedenle hazır miktar önermiyor, yalnızca kullanıcının girdiği değeri matematiksel olarak çeviriyor.",
    ],
    relatedLinks: [
      { href: "/zphc-reta", label: "Tüm ZPHC Reta kutularını karşılaştırın" },
      { href: "/hesaplayici", label: "Flakon hesaplayıcı" },
      { href: "/dogrulama", label: "Kutu kodu nasıl doğrulanır?" },
    ],
  },
  {
    slug: "reta-pen-flakon-cift-hazne-farki",
    title: "Reta pen, flakon ve çift hazneli kartuş arasındaki fark",
    category: "Ürün Rehberi",
    excerpt: "Üç ambalaj biçiminin adları birbirine benziyor; kutuyu karşılaştırırken bakılması gereken noktalar farklı.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Flakon setinde ürün, kutu üzerindeki sunum bilgisiyle birlikte listelenir: toplam içerik, flakon sayısı ve flakon başına miktar. Bu üç bilgi katalog kaydında aynı satırda görünmelidir.",
      "Hazır kalem ayrı bir ürün formudur. Adındaki toplam mg değeri, flakon sayısına bölünen bir kutu gibi okunmaz. Çift hazneli kartuş da kendi ambalaj yapısına sahiptir; yalnızca “kalem” kelimesine bakarak hazır kalemle aynı sayılmamalıdır.",
      "Karşılaştırmanın en güvenli yolu ürün adını, görselini ve kutu üzerindeki güvenlik kodunu birlikte kontrol etmektir. Güvenlik kodu validation.zphc.com üzerinde sorgulanır; sonuç satıcının değil üreticinin sisteminden gelir.",
      "Üç formu yan yana koyduğumuzda pratik farklar şöyle beliriyor. Flakon seti en uzun raf ömrüne sahiptir, çünkü içerik toz halinde bekler ve ancak kullanılacak flakon sulandırılır; kalan flakonlar hiç açılmamış olarak durur. Karşılığında her seferinde sulandırma işlemi yapmanız, ayrıca bakteriyostatik su bulundurmanız ve şırıngada çekilecek üniteyi hesaplamanız gerekir.",
      "Hazır kalem, sulandırma adımını tamamen ortadan kaldırır. Kutudan çıkar, doz ayarı kalemin kendi mekanizmasıyla yapılır. Karşılığında içerik en baştan sulu haldedir, yani satın alındığı andan itibaren soğuk saklama ister ve raf ömrü flakona göre kısadır. Seyahat, yaz sıcağı ve buzdolabı erişimi bu formda gerçek bir kısıt haline gelir.",
      "Çift hazneli kartuş ikisinin ortasında durur. Bir haznede liyofilize toz, diğerinde steril su bulunur ve ikisi kullanımdan hemen önce, kalemin kendi mekanizmasıyla birleştirilir. Toz, aktivasyon anına kadar suyla temas etmez; bu yüzden raf ömrü hazır kalemden uzundur. Ayrıca çözücü kutunun içinden çıkar, ayrıca su almanıza gerek kalmaz. Bu form, flakonun stabilitesini kalemin pratikliğiyle birleştirme amacını taşır.",
      "Adlardaki bir tuzağa dikkat etmek gerekiyor: her iki kalem formunun adında da kalem kelimesi geçer. Ayrımı yapan kelime, adın devamındaki hazır karışım veya çift hazneli ifadesidir. Yalnızca kalem kelimesine bakarak iki ürünü aynı saymak, satın aldıktan sonra fark edilen bir hata oluyor.",
      "Karşılaştırmanın en güvenli yolu ürün adını, görselini ve kutu üzerindeki güvenlik kodunu birlikte kontrol etmektir. Güvenlik kodu üreticinin kendi doğrulama ekranında sorgulanır; sonuç satıcının değil üreticinin sisteminden gelir.",
      "Ambalaj farkı kullanım kararı değildir. Bu sayfa teknik kutu ayrımını açıklar. Sağlıkla ilgili kararlar ve miktar belirleme bir internet kataloğundan alınmamalıdır.",
    ],
    relatedLinks: [
      { href: "/zphc-reta", label: "Reta ürün karşılaştırması" },
      { href: "/journal/zphc-orijinal-mi-nasil-anlarim", label: "ZPHC kutusu nasıl doğrulanır?" },
      { href: "/urunler", label: "Aktif ürün kataloğu" },
    ],
  },
  {
    slug: "kanit-seviyesi-neden-onemli",
    title: "Kanıt seviyesi neden her şeyin merkezinde?",
    category: "Yaklaşım",
    excerpt:
      "Bir peptidin popüler olması, işe yaradığı anlamına gelmez. Kanıtlanmış, teorik ve preklinik ayrımı neden bu kadar önemli.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Peptit dünyasının en büyük sorunu, popülerlik ile kanıtın karıştırılması. Bir bileşik sosyal medyada ne kadar konuşulursa konuşulsun, arkasındaki veri seviyesi değişmez.",
      "Üç kademe kullanıyoruz. Klinik kanıt: insan çalışmalarıyla desteklenen moleküller. Mekanistik: mekanizması iyi tanımlı ama geniş insan verisi olmayan bileşikler. Preklinik: kanıtı büyük ölçüde hayvan çalışmalarına dayanan, deneysel seviyedekiler.",
      "Bu ayrımı asla bulandırmayız. Preklinik bir bileşiği klinik kanıtlıymış gibi sunmak, en yaygın ve en tehlikeli yanıltma. Bizim işimiz tam tersini yapmak.",
      "Üç kademe arasındaki mesafe sanıldığından büyük. Hayvan modelinde çalışan bir molekülün insanda da çalışma olasılığı, sektörde konuşulduğu kadar yüksek değil. İlaç geliştirmede prekliniği geçen adayların çoğu insan çalışmalarında beklentiyi karşılayamaz. Bu bir başarısızlık hikâyesi değil, sürecin nasıl işlediğinin tanımı: preklinik aşama zaten elemek için vardır.",
      "Neden bu kadar sık yanlış anlaşılıyor? Çünkü kanıtın dili ile pazarlamanın dili birbirine çok benziyor. Bir hayvan çalışmasında görülen etki, cümlenin başına uygun bir sıfat eklendiğinde insanda kanıtlanmış gibi okunabiliyor. Sık kullanılan iki kalıp var: bir molekülün hangi mekanizmayla çalıştığını anlatmak ile o mekanizmanın insanda işe yaradığını göstermek. Birincisi kolaydır ve genellikle doğrudur; ikincisi pahalıdır ve çoğu zaman yapılmamıştır.",
      "Okurken işe yarayan birkaç soru var. Çalışma insanda mı yapılmış, hayvanda mı? Karşılaştırma grubu var mı, yoksa yalnızca kullananların sonuçları mı bildirilmiş? Katılımcı sayısı kaç? Sonuç hakemli bir dergide mi yayımlanmış, yoksa bir ürün sayfasında mı duruyor? Bu dört sorunun cevabı, bir iddianın hangi kademede olduğunu neredeyse her zaman belli eder.",
      "Kütüphanedeki her bileşiğin kaydında bu kademe açıkça yazılıdır ve kademe, ürünün satılıp satılmadığından bağımsızdır. Kataloğumuzda bulunan bir bileşiğin preklinik olarak etiketlenmesi bir çelişki değil, bilerek yapılan bir tercihtir: satışa sunulan şeyin ne olduğunu ve ne olmadığını aynı yerde yazmak.",
      "Şeffaflık burada bir pazarlama sözü değil. Hangi bileşiğin nerede durduğunu bilmek, doğru kararın ilk şartı.",
    ],    relatedLinks: [
      { href: "/metodoloji", label: "Metodoloji: kanıt nasıl değerlendiriliyor" },
      { href: "/peptidler", label: "Bileşik kütüphanesi" },
      { href: "/journal/preklinik-ne-anlama-gelir", label: "Preklinik ne anlama gelir?" },
    ],
  },
  {
    slug: "healthspan-vs-lifespan",
    title: "Uzun yaşamak mı, iyi yaşamak mı?",
    category: "Uzun Yaşam",
    excerpt:
      "Uzun yaşamanın asıl ölçüsü kaç yıl yaşadığınız değil, kaç yılı sağlıkla geçirdiğiniz. Bunun neden daha önemli olduğu.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Uzun yaşam denince akla ömür uzunluğu geliyor. Oysa asıl mesele bu değil. Ortalama insan, ömrünün son yıllarının önemli bir kısmını düşük sağlıkla geçiriyor.",
      "Healthspan, kişinin güçlü, fonksiyonel ve bağımsız kaldığı süre. Amaç, toplam yaşı büyütmek değil, bu sağlıklı pencereyi olabildiğince uzatmak.",
      "Aradaki fark rakamlarla bakıldığında daha somut hale geliyor. Ortalama yaşam süresi son yüzyılda belirgin biçimde uzadı, ama bu uzamanın tamamı sağlıklı yıllara eklenmedi. Kazanılan yılların bir kısmı, kronik hastalıkla ve azalan bağımsızlıkla geçen yıllar oldu. Sağlık politikası literatüründe bu farka sağlıklı yaşam açığı deniyor.",
      "Healthspan kavramı bu açığı kapatmayı hedefler. Ölçüsü de farklıdır: kaç yıl yaşadığınız değil, kaç yıl boyunca merdiven çıkabildiğiniz, kendi alışverişinizi yapabildiğiniz, bir ilaç listesine bağlı olmadan gününüzü geçirebildiğiniz. Fonksiyon, burada ömürden daha bilgilendirici bir ölçüt.",
      "Bu bakış öncelikleri değiştirir. Tek bir molekülün ya da takviyenin ömrü uzatıp uzatmadığı sorusu, insanda test edilmesi neredeyse imkânsız bir sorudur; bir yaşam boyu sürmesi gerekir. Buna karşılık kas kütlesi, kavrama gücü, yürüme hızı, uyku yapısı ve metabolik belirteçler kısa sürede ölçülebilir ve fonksiyonel yaşlanmayla ilişkileri iyi çalışılmıştır. Ölçülebilir olan, ölçülemeyenden daha kullanışlıdır.",
      "Bu alandaki en yaygın satış cümlesi de tam buradan besleniyor: ömrü uzattığı söylenen bir molekülün böyle bir iddiayı insanda kanıtlaması pratikte mümkün olmadığı için, iddia hiçbir zaman yanlışlanamaz. Yanlışlanamayan bir iddia güçlü değil, boş bir iddiadır.",
      "Bu bakış her şeyi değiştirir. Hedef 90 yaşına ulaşmak değil, o yaşa dinç ulaşmak. Bu da uzun vadeli ve ölçülebilir bir mesele; tek bir ürünün çözeceği bir şey değil.",
    ],    relatedLinks: [
      { href: "/journal/hucresel-saglik-uzun-vade", label: "Hücresel sağlık, uzun vadeli bir konu" },
      { href: "/peptidler", label: "Bileşik kütüphanesi" },
    ],
  },
  {
    slug: "doku-onarimi-bpc157-tb500",
    title: "Doku onarımında iki peptidin birlikte çalışması",
    category: "Doku Onarımı",
    excerpt:
      "BPC-157 ve TB-500 farklı mekanizmalarla aynı hedefe gidiyor: doku rejenerasyonu. İkisini birlikte kullanmanın mantığı nedir?",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "BPC-157 anjiyogenezi, yani yeni damar oluşumunu desteklediği düşünülen bir molekül. TB-500 ise hücre göçünü kolaylaştırarak dokunun kendini onarma hızını artırdığı öne sürülen bir fragman.",
      "İki molekülün farklı mekanizmalarla aynı sürece katkı sağlaması, birlikte kullanımın arkasındaki mantık. Biri damarlanmayı, diğeri hücresel göçü destekliyor. Teorik olarak tamamlayıcı bir çift.",
      "Ancak burada dürüst olmak gerekiyor: bu kombinasyonun insan verisi büyük ölçüde anekdotal. Mekanizma güçlü, kontrollü klinik çalışma yok. Kütüphanemizde bu ikili 'Mekanistik / Teorik' kademesinde sınıflandırılıyor, 'Klinik Kanıt' değil.",
      "Kanıtın nereden geldiğine yakından bakmak gerekiyor. BPC-157 üzerine yayımlanmış literatürün büyük kısmı sıçan modellerinde yapılmış çalışmalardan oluşuyor: tendon, kas, bağırsak ve sinir dokusunda iyileşme hızına dair tekrarlanabilir sonuçlar var. Bu sonuçlar gerçek ve tek bir laboratuvarla sınırlı değil. Eksik olan, insanda yapılmış kontrollü çalışma.",
      "TB-500 tarafında durum daha da erken. Molekül, timosin beta-4 adlı doğal proteinin bir fragmanı olarak tanımlanıyor ve hücre göçüyle ilişkilendirilen bölgeyi taşıdığı öne sürülüyor. Kütüphanede TB-500 preklinik kademesinde duruyor; yani insan verisi neredeyse hiç yok.",
      "İkisini birlikte kullanma fikrinin kaynağı da bu mekanizma tamamlayıcılığı. Ancak burada bir mantık atlaması var ve fark edilmesi gerekiyor: iki molekülün ayrı ayrı makul mekanizmalara sahip olması, birlikte kullanıldıklarında toplamdan fazlasını verecekleri anlamına gelmez. Kombinasyonun kendisi ayrı bir iddiadır ve ayrıca test edilmesi gerekir. Bu test yapılmamıştır.",
      "Kütüphanede BPC-157 mekanistik, TB-500 preklinik kademesinde sınıflandırılıyor; ikisi de klinik kanıt kademesinde değil. Karışım ürünlerinin katalogda bulunması bu tabloyu değiştirmez. Bir ürünün satılıyor olması, arkasındaki kanıt seviyesini yükseltmez.",
      "Bu ayrımı bulanıklaştırmadan sunmak, bu alanda yazılan metinlerin çoğunda atlanan kısım. Doğru beklenti, doğru kararın ilk şartı.",
    ],    relatedLinks: [
      { href: "/zphc-bpc-157", label: "ZPHC BPC-157 ürünleri" },
      { href: "/peptidler/bpc-157", label: "BPC-157 bileşik kaydı" },
      { href: "/peptidler/tb-500", label: "TB-500 bileşik kaydı" },
    ],
  },
  {
    slug: "kognitif-protokoller-semax-selank",
    title: "Kognitif protokollerde Rusya kaynaklı iki molekül",
    category: "Bilişsel",
    excerpt:
      "Semax ve Selank, Rusya'da onlarca yıldır klinik kullanımda ama batı literatüründe hâlâ az tanınıyor. Aradaki fark neden önemli?",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Semax ve Selank, ACTH ve tuftsin türevi iki nöropeptit. İkisi de Rusya'da resmi klinik kullanımda; batıda ise büyük ölçüde araştırma aşamasında kalmış moleküller.",
      "Semax'ın BDNF ve dopaminerjik sinyali desteklediği, Selank'ın ise sedasyon yaratmadan anksiyolitik etki gösterdiği düşünülüyor. Mekanizmaları makul ve tutarlı, ancak kontrollü randomize çalışmaların çoğu Rusça literatürde ve batı standartlarında tekrarlanmamış.",
      "Buradaki asıl mesele, iki farklı düzenleyici geleneğin aynı molekül hakkında farklı sonuçlara varmış olması. Rusya'da bir molekülün ruhsatlanmış olması, o ülkenin kendi değerlendirme sürecinden geçtiği anlamına gelir. Bunu yok saymak da, batı onayıyla eşitlemek de yanlış olur. Aradaki fark genellikle metodolojik: çalışma büyüklükleri, körleme yöntemi, sonlanım noktalarının tanımı ve verinin bağımsız erişime açık olup olmaması.",
      "Pratikte bu şu anlama geliyor: mevcut çalışmaların çoğu Rusça yayımlanmış, batı literatüründe bağımsız olarak tekrarlanmamış ve uluslararası meta-analizlere girecek biçimde raporlanmamış durumda. Dil engeli tek başına bir kusur değil, ama dışarıdan doğrulanamayan bir veri kümesi, doğrulanmış sayılamaz.",
      "İkinci bir nokta da uygulama biçimi. Her iki molekül de Rusya'da burun spreyi olarak kullanılıyor. İnternette dolaşan kullanım anlatılarının bir kısmı farklı uygulama yollarına dayanıyor ve farklı bir uygulama yolu, farklı bir emilim ve farklı bir etki profili demek. Bir molekül hakkında yapılmış çalışmanın sonuçları, o çalışmadaki uygulama biçimi için geçerlidir.",
      "Bu, molekülleri geçersiz kılmaz. Yalnızca kütüphanedeki kanıt kademelerini mekanistik seviyede tutar: mekanizma tanımlı, bağımsız insan verisi sınırlı. Bilişsel etki beklentisi olan biri için bu ayrım özellikle önemli, çünkü bu alandaki öznel değerlendirme plaseboya en açık alanlardan biridir.",
    ],    relatedLinks: [
      { href: "/peptidler/semax", label: "Semax bileşik kaydı" },
      { href: "/peptidler/selank", label: "Selank bileşik kaydı" },
      { href: "/metodoloji", label: "Kanıt nasıl değerlendiriliyor" },
    ],
  },
  {
    slug: "yag-kaybi-protokol-mantigi",
    title: "Yağ kaybı protokolünün mantığı",
    category: "Metabolik",
    excerpt:
      "Tek bir molekül değil, birbirini tamamlayan bir sistem: iştah, enerji harcaması ve karaciğer yağlanması neden birlikte ele alınmalı.",
    readMinutes: 7,
    date: "2026-09-13",
    body: [
      "Yağ kaybı protokolleri genellikle tek bir molekülün etrafında kurulur. Oysa metabolik direnç, tek bir yolun değil, birkaç sistemin birlikte bozulmasının sonucu.",
      "GLP-1, GIP ve glukagon reseptörlerini hedef alan yeni nesil moleküller, iştah baskılanmasının ötesinde enerji harcamasını ve karaciğer yağlanmasını da etkiliyor. Bu, neden bazı protokollerin daha kalıcı sonuç verdiğini açıklıyor.",
      "Üç yolun ne yaptığını ayırmak, neden farklı moleküllerin farklı sonuç verdiğini de açıklıyor. GLP-1 tarafı tokluk sinyalini ve mide boşalma hızını etkiler; alınan kaloriyi azaltır. GIP tarafı insülin yanıtı ve yağ dokusu metabolizmasıyla ilişkilendirilir. Glukagon tarafı ise denklemin diğer ucuna, yani harcanan enerjiye ve karaciğerdeki yağ metabolizmasına dokunur. Yalnızca iştahı baskılayan bir yaklaşımın, harcama tarafına hiç dokunmadığını görmek işin özeti.",
      "Bu noktada sıkça atlanan bir gerçek var: kilo kaybının bir kısmı her zaman yağsız dokudan gelir. Kalori açığı büyüdükçe bu pay artar. Bu yüzden tartıdaki sayı tek başına iyi bir başarı ölçüsü değildir; aynı kilo kaybı, korunan kas kütlesiyle birlikte geldiğinde bambaşka bir sonuçtur. Vücut kompozisyonu, tartıdan daha bilgilendiricidir.",
      "Bir diğer sık atlanan konu, bırakma sonrası. Bu moleküllerin çalışma verilerinde tekrar eden bir bulgu var: molekül bırakıldığında kaybedilen kilonun önemli bir kısmı geri geliyor. Bu, molekülün işe yaramadığı anlamına gelmez; etkinin kullanım süresine bağlı olduğu anlamına gelir. Kalıcı sonucun, moleküle eşlik eden beslenme ve hareket alışkanlığıyla ilişkili olması bu yüzden sürekli tekrarlanıyor.",
      "İstenmeyen etkiler de tablonun parçası. Bu sınıfta en sık bildirilen etkiler gastrointestinal: bulantı, kusma, ishal. Çoğu hafif ve orta düzeyde bildiriliyor ama çalışmayı bırakma nedenlerinin başında da bunlar geliyor. Bir molekülü değerlendirirken yalnızca etki büyüklüğüne bakmak, denklemin yarısını görmektir.",
      "Bu sayfa bir kullanım planı önermiyor ve öneremez. Amacı, bu moleküller hakkında okurken hangi soruların sorulması gerektiğini göstermek: etki nereden geliyor, ne kadar sürüyor, bedeli ne, bırakıldığında ne oluyor.",
    ],    relatedLinks: [
      { href: "/zphc-reta", label: "ZPHC Reta ürünleri" },
      { href: "/peptidler/retatrutide", label: "Retatrutide bileşik kaydı" },
      { href: "/journal/apob-ldl-den-neden-daha-iyi", label: "ApoB neden daha iyi bir gösterge?" },
    ],
  },
  {
    slug: "cilt-icin-icten-yaklasim",
    title: "Cilt için içten yaklaşım",
    category: "Cilt & Yaşlanma",
    excerpt:
      "Topikal ürünlerin sınırı cildin yüzeyinde biter. GHK-Cu gibi moleküller, yenilenmeyi hücresel düzeyde tetiklemeyi hedefliyor.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Cilt bakımının çoğu, yüzeyde kalan bir müdahale. Nemlendirme, koruma, düzeltme. Hepsi gerekli ama hücresel yenilenme hızını değiştirmiyor.",
      "GHK-Cu gibi bakır bağlı peptitler farklı bir katmanı hedefler. GHK, insan plazmasında doğal olarak bulunan üç aminoasitlik bir dizidir ve bakır iyonunu bağlama özelliğiyle tanımlanır. Kandaki düzeyinin yaşla birlikte azaldığı bildirilmiştir. Laboratuvar çalışmalarında kolajen sentezi ve doku yeniden yapılanmasıyla ilişkili yolakları etkilediği gösterilmiştir.",
      "Burada dürüst olmak gerekiyor ve bu sayfa daha önce bu konuda fazla iddialı bir cümle taşıyordu. GHK-Cu kütüphanede klinik kanıt kademesinde değil, mekanistik kademede duruyor. Nedeni açık: mevcut literatürün ağırlığı hücre kültürü çalışmaları ve derlemelerden oluşuyor, bağımsız ve yeterli büyüklükte randomize insan çalışması bulunamadı. Molekülün sınıflandırması aradığımızı bulamadığımız için düşürüldü, bu karar kaynak politikası yazısında ayrıca anlatılıyor.",
      "Cilt konusunda beklentiyi doğru kurmanın ikinci şartı, sonucun ölçülebilir olması. Bu alanda öznel değerlendirme yanıltıcıdır: ışık, açı, nem ve ruh hali, aynı cildi bir haftada bambaşka gösterebilir. Aynı koşullarda, aynı mesafeden, aynı ışıkta çekilmiş fotoğraf, bu alandaki en ucuz ve en dürüst ölçüm aracıdır.",
      "Uygulama biçimi de sonucu belirleyen bir değişken. Topikal ve enjekte edilebilir formlar aynı molekülü taşısa da emilim ve dokuya ulaşım açısından aynı şey değildir; bir formda yapılmış çalışmanın sonuçları diğerine doğrudan aktarılamaz.",
      "Özetle: mekanizma ilgi çekici, laboratuvar verisi tutarlı, insan verisi ise iddiayı taşıyacak kadar güçlü değil. Bu üç cümlenin üçünü birden söylemek, yalnızca ilkini söylemekten daha faydalı.",
    ],    relatedLinks: [
      { href: "/zphc-ghk-cu", label: "ZPHC GHK-Cu ürünleri" },
      { href: "/peptidler/ghk-cu", label: "GHK-Cu bileşik kaydı" },
      { href: "/journal/kaynak-politikamiz-neden-onemli", label: "GHK-Cu neden kademe düşürüldü?" },
    ],
  },
  {
    slug: "performans-toparlanma-penceresi",
    title: "Toparlanma, performansın görünmeyen yarısı",
    category: "Performans",
    excerpt:
      "Antrenman adaptasyonunun çoğu, antrenman sırasında değil toparlanma penceresinde gerçekleşir. Protokoller bu pencereyi nasıl hedefler?",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Performans konuşulduğunda akla genelde antrenman şiddeti gelir. Oysa adaptasyonun büyük kısmı, antrenman sonrası toparlanma penceresinde gerçekleşir.",
      "CJC-1295 ve Ipamorelin gibi kombinasyonlar, büyüme hormonu salınımını fizyolojik atım paternine yakın bir şekilde uyararak bu pencereyi desteklediği düşünülüyor. Mekanizma iyi tanımlı, ama uzun dönem randomize veri sınırlı. Bu yüzden 'Mekanistik / Teorik' kademesinde yer alıyor.",
      "Toparlanma penceresinde ne olduğuna bakmak, neden bu kadar belirleyici olduğunu da açıklıyor. Antrenman sırasında kas dokusunda mikro hasar oluşur ve enerji depoları boşalır; asıl onarım, protein sentezinin arttığı sonraki saatlerde ve günlerde gerçekleşir. Bu sürecin üç girdisi var ve hiçbiri molekül değil: yeterli protein alımı, yeterli toplam kalori ve yeterli uyku. Bu üçü eksikken eklenen hiçbir şey farkı kapatmaz.",
      "Uyku burada özel bir yer tutuyor, çünkü büyüme hormonu salınımının en belirgin atımları derin uyku evresinde gerçekleşir. Uykunun kısaldığı veya bölündüğü bir dönemde, hormonal toparlanmanın en verimli penceresi zaten kaçırılmış olur.",
      "Bu sınıftaki moleküller, hipofizin kendi salınımını uyarmayı hedefledikleri için genellikle fizyolojik atım paternini taklit etme iddiası taşır. Mekanizma tanımlı; ancak kütüphanedeki kanıt kademeleri mekanistik seviyede kalıyor, çünkü uzun dönemli ve geniş katılımlı kontrollü insan verisi sınırlı.",
      "Aşırı yüklenmenin de kendine ait bir tablosu var ve moleküllerle çözülmez: dinlenme nabzının yükselmesi, kalp hızı değişkenliğinin düşmesi, uykunun bozulması, isteksizlik ve performansın gerilemesi. Bu tablo göründüğünde ihtiyaç duyulan şey bir bileşik değil, azaltılmış yük ve uyku.",
      "Toparlanma konusunda okurken sorulacak soru şu: bu molekülün etkisi, aynı dönemde düzelen uykudan ve artan protein alımından ayrıştırılabilmiş mi? Ayrıştırılamadığı durumda, gözlenen iyileşmeyi moleküle yazmak için bir gerekçe yok demektir.",
    ],    relatedLinks: [
      { href: "/peptidler/ipamorelin", label: "Ipamorelin bileşik kaydı" },
      { href: "/journal/uyku-mimarisi-ve-toparlanma", label: "Uyku mimarisi ve toparlanma" },
    ],
  },
  {
    slug: "hucresel-saglik-uzun-vade",
    title: "Hücresel sağlık, uzun vadeli bir proje",
    category: "Uzun Yaşam",
    excerpt:
      "Bu alandaki moleküller hızlı sonuç vaat etmiyor. Mitokondriyal fonksiyon ve hücresel enerji üzerine kurulu, sabır isteyen bir yaklaşım.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Uzun yaşam alanındaki moleküllerin çoğu hızlı ve görünür bir etki vaat etmiyor. Hedef aldıkları şey, yani mitokondriyal fonksiyon ve hücresel enerji metabolizması, yıllar içinde birikimli olarak fark yaratan bir katman.",
      "SS-31 gibi mitokondri koruyucu moleküller klinik olarak test edilirken, NAD+ öncülleri ve MOTS-c gibi bileşikler hâlâ insan verisinin olgunlaştığı bir aşamada. Kanıt seviyesi bu yüzden molekülden moleküle büyük farklılık gösteriyor.",
      "Bu alanda en büyük risk, sabırsızlık. Preklinik bir bileşiği klinik kanıtlıymış gibi sunmak, longevity pazarlamasının en yaygın hatası. Biz bu ayrımı hiç bulandırmıyoruz.",
      "Bu alandaki iddiaların neden bu kadar zor doğrulandığını anlamak için ölçüm sorununa bakmak gerekiyor. Bir molekülün yaşlanma hızını değiştirdiğini insanda göstermek, onlarca yıl sürecek bir çalışma gerektirir ve böyle bir çalışma pratikte kurulmaz. Bu yüzden araştırmalar vekil ölçütlerle yürür: mitokondriyal fonksiyon göstergeleri, hücresel enerji üretimi, çeşitli kan belirteçleri. Vekil bir ölçütte iyileşme görmek, uzun vadede fayda olacağının garantisi değildir; yalnızca umut vericidir.",
      "Kanıt seviyesi bu alanda molekülden moleküle çok değişiyor ve aynı cümlede anılmaları yanıltıcı oluyor. Kütüphanede NAD+ öncülleri mekanistik kademede, MOTS-c ve Epithalon ise preklinik kademede duruyor. Preklinik, insan verisinin neredeyse hiç olmadığı anlamına geliyor; bu, molekülün değersiz olduğunu değil, hakkında konuşurken kullanılacak dilin farklı olması gerektiğini söylüyor.",
      "İkinci bir karışıklık kaynağı, hücre kültüründe ve kısa ömürlü canlılarda elde edilen sonuçların insana taşınması. Bir bileşiğin bir solucanın ömrünü uzatması gerçek bir bulgudur ve genellikle tekrarlanabilir. Ama bu canlıların biyolojisi ile insanınki arasındaki mesafe, sonucun doğrudan aktarılmasına izin vermez. Bu alanda satılan iddiaların önemli bir kısmı tam olarak bu mesafenin görmezden gelinmesiyle üretiliyor.",
      "Bu alanda en büyük risk sabırsızlık. Preklinik bir bileşiği klinik kanıtlıymış gibi sunmak, bu pazarlamanın en yaygın hatası ve kütüphanede bu ayrım bilerek hiç bulandırılmıyor.",
      "Uzun vadeli bir yaklaşımda, bugünün küçük ve doğrulanabilir kazanımları, yarının büyük iddialarından daha değerlidir.",
    ],    relatedLinks: [
      { href: "/peptidler/nad-nmn", label: "NAD+ / NMN bileşik kaydı" },
      { href: "/peptidler/mots-c", label: "MOTS-c bileşik kaydı" },
      { href: "/peptidler/epithalon", label: "Epithalon bileşik kaydı" },
    ],
  },
  {
    slug: "kaynak-politikamiz-neden-onemli",
    title: "Neden bazı bileşiklerin kaynağı var, bazılarının yok?",
    category: "Yaklaşım",
    excerpt:
      "Kütüphanemizdeki her PMID gerçek ve doğrulanabilir. Bir bileşiğin kaynağı yoksa, bu, aramadığımız değil, bulamadığımız anlamına gelir.",
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Kısa süre önce GHK-Cu'yu kütüphanemizde 'Klinik Kanıt' kademesinden 'Mekanistik / Teorik' kademesine indirdik. Neden? Çünkü bağımsız bir insan RCT'si aradık ve bulamadık. Mekanizma hücre kültürü ve hayvan modellerinde iyi tanımlı ama bu, klinik kanıtla aynı şey değil.",
      "Kaynak eklerken PMID ve DOI numaralarını gerçek veritabanlarından çekiyoruz. Bir bileşik için doğrulanabilir bir kaynak yoksa, sayfasında kaynak bölümü hiç görünmez. Uydurma bir referans eklenmez.",
      "Bu bazı okuyucular için garip görünebilir: neden Retatrutide'nin sayfasında PMID ve DOI var da BPC-157'de yok? Cevap basit: biri randomize kontrollü bir insan çalışmasıyla test edildi, diğeri henüz edilmedi. İkisi de değerli olabilir; ama ikisi aynı cümleyle anlatılamaz.",
      "Peki neyi arıyoruz? Sırayla şunlar: insanda yapılmış, karşılaştırma grubu olan, sonlanım noktası önceden tanımlanmış, hakemli bir dergide yayımlanmış ve PMID veya DOI ile doğrulanabilir bir çalışma. Bunların hepsi bulunduğunda kaynak eklenir. Biri bile eksikse, o bileşik için kaynak bölümü hiç görünmez.",
      "Aramanın dışında bıraktığımız şeyler de var ve bunlar bilinçli. Ürün satan sitelerin kendi sayfaları kaynak sayılmaz. Yayımlanmamış konferans özetleri tek başına yeterli sayılmaz. Bir şirketin basın açıklaması, hakemli makale yerine geçmez; sayı verse bile yöntemi göstermez. Bunlar bir bileşiğin işe yaramadığını göstermez, yalnızca elimizde gösterebileceğimiz bir kanıt olmadığını gösterir.",
      "Bunun görünür bir maliyeti var: kataloğumuzda sattığımız bazı ürünlerin bileşik sayfasında hiç kaynak bölümü yoktur. Satış açısından bakıldığında bu bir eksik gibi durur. Alternatif, o boşluğu zayıf bir referansla doldurmaktı ve bu yolu seçmedik. Bir kaynağın varlığı güven verir; yanlış yerleştirilmiş bir kaynak, verdiği güveni hak etmez.",
      "Kademeler tek yönlü de değil. GHK-Cu örneğinde olduğu gibi, bir bileşik yeni bir arama sonucunda aşağı inebilir. Aynı şekilde, yeni ve sağlam bir çalışma yayımlanırsa yukarı çıkabilir. Kademeler bir markanın duruşunu değil, o gün elde bulunan kanıtı yansıtır.",
      "Bu sürecin tamamı metodoloji sayfasında anlatılıyor. Amaç güven telkin etmek değil, güvenin nereden geldiğini göstermek; okuyanın aynı sorguyu kendi başına yapabilmesi.",
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
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "LDL-kolesterol, aslında kandaki LDL parçacıklarının içindeki kolesterol miktarını ölçer, parçacık sayısını değil. Bazı bireylerde LDL-kolesterol normal görünürken parçacık sayısı yüksek olabilir; bu duruma bazen 'gizli risk' deniyor.",
      "ApoB, her aterojenik parçacığın yüzeyinde tam olarak bir kopya bulunan bir protein olduğu için, parçacık sayısını doğrudan verir. Bu yüzden kardiyovasküler risk değerlendirmesinde LDL-kolesterole göre daha isabetli kabul ediliyor.",
      "Farkın nereden çıktığını bir benzetmeyle görmek kolay. LDL parçacıklarını kolesterol taşıyan kamyonlar gibi düşünün. LDL-kolesterol ölçümü, yoldaki toplam yükü söyler. ApoB ise kaç kamyon olduğunu söyler. Aynı toplam yük, az sayıda dolu kamyonla da taşınabilir, çok sayıda yarı boş kamyonla da. Damar duvarına giren ve orada birikenin parçacığın kendisi olduğu düşünüldüğü için, sayı yükten daha bilgilendirici hale geliyor.",
      "Bu ayrışmanın en sık görüldüğü durum, insülin direnci ve yüksek trigliserit tablosu. Bu profilde parçacıklar küçülür ve sayıları artar; LDL-kolesterol değeri normal görünürken ApoB yüksek çıkabilir. Standart bir lipit paneline bakan biri bu durumda risk görmez.",
      "Pratikte ApoB'nin iki avantajı daha var. Açlık gerektirmez, çünkü ölçtüğü şey parçacık üzerindeki proteindir ve öğünle belirgin biçimde dalgalanmaz. İkincisi, hesaplanan değil doğrudan ölçülen bir değerdir; LDL-kolesterol ise birçok laboratuvarda hâlâ bir formülle hesaplanır ve trigliserit yüksekken bu formül sapar.",
      "Bu neden bu sitede anlatılıyor? Çünkü metabolik moleküllerin etkisi tartıdaki sayıyla sınırlı değil ve kilo kaybının kardiyometabolik belirteçlere yansıması ayrı bir konu. Hangi tetkikin neyi ölçtüğünü bilmek, sonuçları okurken işe yarıyor. Bu sayfa bir tetkik önerisi ya da yorumu değildir; tetkiklerin nasıl istendiği ve sonucun ne anlama geldiği hekiminize ait bir karardır.",
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
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "HIV ilişkili lipodistrofi endikasyonunda FDA onaylı olan tesamorelin, büyüme hormonu ekseni içindeki en sağlam insan verisine sahip moleküllerden biri.",
      "Yakın zamanda yayınlanan bir meta-analiz, beş randomize kontrollü çalışmayı bir araya getirerek viseral yağ dokusu, karaciğer yağ oranı ve yağsız vücut kütlesi üzerindeki etkileri özetliyor.",
      "Sonuçlar tutarlı: viseral yağ dokusunda ve karaciğer yağ oranında anlamlı azalma, yağsız kütlede artış, üstelik glikoz metabolizmasını bozmadan.",
      "Meta-analizin neden ayrı bir ağırlığı olduğunu açmak gerekiyor. Tekil bir çalışma, o çalışmanın katılımcı grubuna, süresine ve ölçüm yöntemine bağlıdır; şans eseri olumlu ya da olumsuz çıkabilir. Meta-analiz, aynı soruyu soran birden fazla randomize çalışmayı birleştirerek etkinin tutarlı olup olmadığını gösterir. Farklı çalışmalar aynı yöne işaret ediyorsa, bulgunun rastlantı olma ihtimali düşer.",
      "Viseral yağın neden ayrı bir hedef olduğu da önemli. Cilt altı yağdan farklı olarak organların arasında biriken viseral yağ, metabolik ve kardiyovasküler risk göstergeleriyle daha güçlü ilişkilendirilir. Bu yüzden vücut kompozisyonu çalışmalarında toplam kilo kaybı yerine viseral yağ alanı ayrı bir sonlanım noktası olarak ölçülür.",
      "Sonuçların kapsamı konusunda net olmak gerekiyor. Tesamorelinin onaylı endikasyonu HIV ilişkili lipodistrofidir ve meta-analize giren çalışmalar bu popülasyonda yapılmıştır. Belirli bir hasta grubunda gösterilen bir etkiyi, genel popülasyona ya da estetik amaçlı kullanıma doğrudan taşımak kanıtın izin verdiği bir çıkarım değildir. Bu, en sık yapılan genelleme hatalarından biri.",
      "Buna rağmen tesamorelin, büyüme hormonu ekseninde çalışan moleküller arasında en sağlam insan verisine sahip olanlardan biri olmayı sürdürüyor ve kütüphanede klinik kanıt kademesinde bulunmasının nedeni bu. Sonuç bazlı kanıt matrisini bileşik sayfasında görebilirsiniz.",
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
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Büyüme hormonu ekseniyle çalışan iki farklı yaklaşım var: GHRH analogları ve ghrelin reseptör agonistleri. Sermorelin birincisine, Ipamorelin ikincisine örnek.",
      "Sermorelin, GHRH'nin aktif fragmanı olarak hipofizin kendi salınım ritmini korur. Ipamorelin ise ghrelin reseptörü üzerinden çalışır ve seçiciliğiyle öne çıkar. Kortizol ve prolaktini belirgin etkilemeden büyüme hormonu salınımını uyardığı öne sürülür.",
      "Bu iki yol tamamlayıcı olduğu için, pratikte bir GHRH analoğu ile bir ghrelin agonistinin birlikte kullanımı sık görülür (ör. CJC-1295 + Ipamorelin). Amaç, iki farklı sinyali aynı anda vererek daha fizyolojik bir salınım paterni oluşturmak.",
      "Bu yaklaşımın dışarıdan büyüme hormonu vermekten farkı da burada. Salgılatıcılar hipofizin kendi üretimini uyarır, yani vücudun geri bildirim mekanizmaları devrede kalır; somatostatin yükseldiğinde salınım frenlenir. Dışarıdan verilen hormonda böyle bir fren yoktur. Salgılatıcıların daha fizyolojik olduğu iddiası bu farka dayanır. Ancak aynı özellik bir tavan da koyar: hipofizin üretebileceğinden fazlasını üretmesi sağlanamaz.",
      "Seçicilik meselesi de sık geçen ama yanlış anlaşılan bir başlık. Ghrelin reseptörü üzerinden çalışan bazı bileşiklerin büyüme hormonu salınımının yanında kortizol ve prolaktini de etkilediği bildirilmiştir. Ipamorelin'in öne çıkma gerekçesi, bu iki hormonu belirgin biçimde etkilemeden çalıştığının öne sürülmesidir. Öne sürülmesi ile geniş insan verisiyle gösterilmiş olması arasındaki fark, bu cümlenin tamamını belirliyor.",
      "İki mekanizmanın birlikte kullanımının yaygınlaşmasının nedeni de teorik: bir GHRH analoğu salınım için hazırlık sinyali verirken, bir ghrelin agonisti tetikleyici sinyali sağlar. Buradaki mantık makul, ama kombinasyonun kendisi ayrı bir iddiadır ve iki molekülün ayrı ayrı verisi, birlikte kullanımlarının verisi yerine geçmez.",
      "Her ikisi de kütüphanede mekanistik kademede: mekanizma iyi tanımlı, uzun dönemli ve geniş kontrollü insan verisi sınırlı. Bu ayrım, beklentiyi doğru kurmak için net tutuluyor.",
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
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Bir bileşiği 'preklinik' olarak etiketlediğimizde, kanıtın büyük ölçüde hücre kültürü ve hayvan çalışmalarına dayandığını, kontrollü insan verisinin ya hiç olmadığını ya da neredeyse hiç olmadığını kastediyoruz.",
      "Bu, molekülün 'işe yaramadığı' anlamına gelmez. Thymosin Beta-4'ün hayvan modellerinde doku onarımı üzerindeki etkileri gerçek ve tekrarlanabilir. Ama hayvan modelinden insana geçiş, biyolojinin en zorlu adımlarından biridir. Birçok umut verici molekül bu geçişte beklentiyi karşılayamaz.",
      "Bu yüzden preklinik bileşikleri, klinik kanıtlı olanlarla aynı cümlede sunmayız. İkisi de değerli olabilir; ama biri 'insanda gösterildi', diğeri 'henüz gösterilmedi' der. Bu farkı bulanıklaştırmak, sektörün en yaygın yanıltmasıdır.",
      "Bu geçişin neden bu kadar zor olduğunu anlamak için hayvan modellerinin nasıl kurulduğuna bakmak gerekiyor. Deneyler genellikle genetik olarak birbirine çok benzeyen, aynı yaşta, aynı ortamda ve aynı beslenmeyle tutulan hayvanlarda yapılır. Bu, gürültüyü azaltıp etkiyi görünür kılar; laboratuvar için doğru bir tercihtir. İnsan popülasyonunda ise yaş, genetik, eşlik eden hastalıklar ve kullanılan diğer ilaçlar devreye girer. Laboratuvarda net görünen bir etki, bu değişkenliğin içinde kaybolabilir.",
      "Doz ölçeği de doğrudan aktarılamaz. Hayvan çalışmalarında kullanılan miktarlar, kiloya oranlandığında bile insanda doğrudan karşılık bulmaz; metabolizma hızı ve ilacın vücutta kalma süresi türler arasında belirgin biçimde farklıdır. Bir sıçan çalışmasındaki sayıyı kilo oranıyla çarpıp insan miktarı hesaplamak, internette sık görülen ama dayanaksız bir işlemdir.",
      "Uygulama yolu üçüncü bir kırılma noktası. Bir molekülün karın içine enjeksiyonla verildiği bir çalışmanın sonuçları, aynı molekülün ağızdan ya da deri altından verildiği bir kullanımın sonuçlarını göstermez. Emilim, ilk geçiş metabolizması ve hedef dokuya ulaşan miktar değişir.",
      "Bütün bunlar preklinik verinin değersiz olduğu anlamına gelmiyor. Tam tersine, klinik araştırmaya giden yol buradan geçer ve bugün kullanılan her ilaç bu aşamadan geçmiştir. Söylediği tek şey şu: preklinik, yolculuğun başlangıcıdır, sonucu değil.",
      "Kütüphanedeki her etiketin arkasındaki mantık metodoloji sayfasında ayrıntılandırılmıştır.",
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
    readMinutes: 6,
    date: "2026-09-13",
    body: [
      "Uyku çoğu zaman tek bir sayıyla konuşulur: kaç saat. Oysa toparlanma açısından asıl belirleyici olan, o saatlerin nasıl dağıldığı: derin (yavaş dalga) uyku ve REM oranları.",
      "Derin uyku, fiziksel toparlanma ve hormonal düzenlenmeyle; REM ise bilişsel konsolidasyon ve duygusal işlemlemeyle ilişkilendirilir. İkisinin de baskılandığı bir gece, süre olarak 'yeterli' görünse bile fonksiyonel olarak yetersiz olabilir.",
      "Uykunun yapısını biraz açmak gerekiyor. Gece boyunca yaklaşık doksan dakikalık döngüler tekrarlanır ve bu döngülerin içeriği sabit değildir. Derin uyku gecenin ilk yarısında yoğunlaşır; REM ise sabaha doğru uzar. Bunun pratik bir sonucu var: geç yatıp normal saatte kalkan biri ağırlıklı olarak derin uykudan, erken yatıp erken kalkan biri ise ağırlıklı olarak REM'den kaybeder. İkisi aynı eksik değildir.",
      "Derin uyku fiziksel toparlanma ve hormonal düzenlenmeyle ilişkilendirilir; büyüme hormonu salınımının en belirgin atımları bu evrede gerçekleşir. REM ise bilişsel konsolidasyon ve duygusal işlemlemeyle ilişkilendirilir. İkisinin de baskılandığı bir gece, süre olarak yeterli görünse bile fonksiyonel olarak yetersiz olabilir.",
      "Uyku yapısını bozan etkenlerin çoğu da bilinir ve molekülle ilgisi yoktur. Alkol uykuya dalmayı hızlandırır ama gecenin ikinci yarısında REM'i baskılar ve uykuyu böler. Kafeinin vücuttaki yarı ömrü birkaç saattir, yani öğleden sonra içilen bir kahve gece hâlâ etkisini sürdürebilir. Düzensiz yatış saati, iç saatin referansını kaybettirir. Bir bileşik aramadan önce bu üç başlığa bakmak, çoğu durumda daha büyük fark yaratır.",
      "Uykuyla ilişkilendirilen bileşiklere gelince, kütüphanede DSIP preklinik kademesinde duruyor: mekanizma ilgi çekici, insan verisi sınırlı ve tutarsız. Bu alanda ölçüm de zordur, çünkü uyku kalitesine dair öznel değerlendirme ile ölçülen uyku yapısı çoğu zaman birbirini tutmaz.",
      "Toparlanmayı bir sayıya değil bir yapıya bakarak değerlendirmek, bu konudaki en kullanışlı alışkanlık.",
    ],
    relatedLinks: [
      { href: "/peptidler/dsip", label: "DSIP bileşik sayfası" },
    ],
  },
]

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug)
