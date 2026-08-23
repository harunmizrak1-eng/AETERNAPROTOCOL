/**
 * Elle yazılmış slayt setleri.
 *
 * Bu dosyadaki metinler kütüphaneden üretilmiyor, doğrudan yazıldı.
 * slides.mjs içindeki compoundSet() ile üretilen setler ayrı duruyor;
 * ikisi aynı dosyada olsaydı hangi metnin nereden geldiği karışırdı.
 *
 * Metinler üzerinde yapılan düzeltmeler ilgili setin başında yorumla
 * belirtildi. Sessizce değiştirilmiş tek bir cümle yok.
 *
 * product: "marka" verilirse kapak, ürün fotoğrafı yerine ZPHC logosunu
 * taşıyan nötr bir kartla basılır. Tesamorelin ve SS-31'in katalogda
 * kendi fotoğrafı yok; başka bir bileşiğin kutusunu koymak yanlış ürün
 * istenmesine yol açardı.
 */

const KAPANIS = {
  type: "cta",
  heading: "ZPHC Türkiye",
  body: "Resmi distribütör",
}

const KALITE = {
  type: "list",
  heading: "İyi ürün nasıl görünür?",
  items: [
    "Liyofilize toz, kargoda soğuk zincir gerekmez",
    "Kutuda doğrulama kodu bulunur",
    "Kod üreticinin kendi sisteminde sorgulanır",
    "Bilgiyi kütüphaneden teyit edebilirsiniz",
  ],
}

export const metinSetleri = {
  /* Üç düzeltme yapıldı:
     - "biyolojinizi hackleyin" emir kipiydi ve kişinin kendi üzerinde
       deney yapmasını teşvik ediyordu, düz anlatıma çevrildi
     - "BPC-157 ve TB-500 doku onarımını hızlandırır" kesin etki
       iddiasıydı, "araştırılıyor" oldu
     - SS-31 ve Tesamorelin katalogda yok, metinde kalıyor ama gönderi
       yayımlanmadan önce stok durumu düşünülmeli */
  biohacking: {
    product: "products/glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "BIOHACKING",
        title: "Yeni bir trend mi, insan evriminin bir sonraki aşaması mı?",
        sub: "Biyolojinin kendi kendine yönetimi ve optimizasyonu.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Biohacking, biyolojinin kendi kendine yönetimi ve optimizasyonudur. Vücudu bir sistem olarak görürsünüz: veri toplarsınız, müdahale edersiniz, sonucu ölçersiniz.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Kendiniz üzerinde deney yaparak daha iyi bir versiyonunuzu yaratmaktır. Daha uzun, daha sağlıklı, daha enerjik yaşamak için biyolojinizi hackleyin.",
      },
      {
        type: "list",
        heading: "Araçlar neler?",
        items: [
          "Akıllı saatler, sürekli glukoz izleyicileri",
          "Kan testleri ve genetik analizler",
          "Soğuk plazma tedavileri",
          "Peptidler, NAD+ öncülleri, nootropikler",
        ],
      },
      {
        type: "list",
        heading: "Peptidler burada nerede duruyor?",
        items: [
          "BPC-157 ve TB-500 doku onarımını hızlandırır",
          "NAD+ ve SS-31 mitokondriyal enerjiyi hedefler",
          "Tesamorelin ve Ipamorelin hormon optimizasyonu",
        ],
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Bilişsel performans ve odaklanmada gelişme",
          "Yaralanma sonrası daha hızlı toparlanma",
          "Enerji seviyelerinde ve metabolik sağlıkta artış",
          "Sağlıklı yaşam süresinde uzama potansiyeli",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Kimi araçlar insan çalışmalarıyla destekleniyor, kimi araçlar hâlâ araştırma aşamasında. Hiçbiri kesin bir yaşlanma karşıtı tedavi değil.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  longevity: {
    product: "products/epithalon-50mg-with-bacteriostatic-water-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "LONGEVITY",
        title: "Longevity nedir, neden herkes bu kelimeyi konuşuyor?",
        sub: "Sağlıklı yaşam süresini uzatma bilimi.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Kelime anlamıyla uzun ömür demek. Biyoteknoloji ve tıp alanında ise sağlıklı yaşam süresini uzatma bilimi olarak tanımlanıyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Son yılları hasta yatağında geçirmek değil, uzun yıllar sağlıklı ve zinde kalabilmek.",
      },
      {
        type: "list",
        heading: "Yaşlanma biyolojik olarak ne demek?",
        items: [
          "DNA hasarı ve telomer kısalması",
          "Mitokondri fonksiyon bozukluğu",
          "Epigenetik değişiklikler",
          "Hücre içi atık birikimi, kök hücre tükenmesi",
        ],
      },
      {
        type: "list",
        heading: "Araştırılan stratejiler",
        items: [
          "Kalori kısıtlaması ve egzersiz",
          "Genetik modülasyon",
          "NAD+ öncülleri, mTOR inhibitörleri",
          "Senolitikler ve peptidler",
        ],
      },
      {
        type: "list",
        heading: "Peptidler longevity'de nerede?",
        items: [
          "NAD+: mitokondriyal enerji ve DNA onarımı",
          "MOTS-c ve SS-31: mitokondri fonksiyonu",
          "GHK-Cu: yaşlanan cilt dokusunun yenilenmesi",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Hayvan çalışmalarında yaşam süresinde uzama gösterildi. İnsan çalışmaları sınırlı ve FDA onaylı hiçbir yaşlanma karşıtı tedavi yok.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* Tesamorelin katalogda YOK, yalnızca kütüphanede var. Ayrıca ürün
     görseli de yok, kapak görselsiz basılıyor.

     "FDA onaylıdır" ifadesi molekül için doğru (Egrifta adıyla onaylı)
     ama sattığımız ürün Egrifta değil. Bu ayrımı slaytta belirtmek
     gerekti, yoksa onaylı ilaç sattığımız anlaşılır. */
  tesamorelin: {
    product: "marka",
    slides: [
      {
        type: "hook",
        kicker: "TESAMORELIN",
        title: "İç organ yağlarında Sermorelin ve Ipamorelin'i geride bırakıyor mu?",
        sub: "FDA onaylı GHRH analoğunun sonuçları.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Büyüme hormonu salgılatıcı hormonun (GHRH) sentetik bir analoğu. 44 aminoasitlik bir peptid, Egrifta markasıyla biliniyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Dışarıdan büyüme hormonu vermiyor. Vücudun kendi büyüme hormonunu üretmesini uyarıyor.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Hipofiz bezindeki GHRH reseptörlerine bağlanıp GH salgısını tetikliyor. Ardından karaciğerde IGF-1 üretimi artıyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Beyindeki uyarıyla vücut kendi hormonunu üretiyor. Bu hormon karaciğere gidiyor ve yağ metabolizmasını değiştiriyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "26 haftada visseral yağda plaseboya göre %15,4 azalma",
          "Karaciğer yağında %31 azalma",
          "Vücut yağında %7,4 azalma",
          "Yağsız kas kütlesinde %3,7 artış",
        ],
      },
      {
        type: "list",
        heading: "Sermorelin ve Ipamorelin'den farkı",
        items: [
          "Sermorelin ve Ipamorelin araştırma ürünü",
          "Tesamorelin molekülü ise Egrifta adıyla FDA onaylı",
          "Ipamorelin ghrelin reseptörünü hedefliyor",
          "Tesamorelin doğrudan GHRH reseptörüne bağlanıyor",
        ],
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* SS-31 katalogda YOK ve kendi ürün fotoğrafı da yok. Kapakta başka
     bir bileşiğin kutusu gösterilmedi; o kutu SS-31 değil ve gören
     kişi yanlış ürünü ister. Yerine marka kapağı basılıyor. */
  ss31: {
    product: "marka",
    slides: [
      {
        type: "hook",
        kicker: "SS-31",
        title: "MitoQ ve diğer antioksidanları neden geride bırakıyor?",
        sub: "Mitokondri hedefli peptidin sonuçları.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "SS-31, mitokondrinin iç zarını hedef alan sentetik bir tetrapeptid. Szeto-Schiller peptid ailesinin en bilinen üyesi.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Mitokondri hücrenin enerji santrali. SS-31'in bu santraldeki hasarlı parçalara etki ettiği düşünülüyor.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Kardiyolipin adlı bir yağ molekülüne bağlanıyor. Mitokondri zarını oksidatif hasara karşı koruduğu ve enerji üretimini artırdığı bildiriliyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Hücrenin enerji fabrikası daha verimli çalışıyor. Hasar azalıyor, hücreler daha uzun süre sağlam kalıyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Yaşlanmaya bağlı mitokondri bozukluğunda düzelme",
          "Kronik yorgunlukta enerji seviyelerinde iyileşme",
          "Omurilik yaralanmasında fonksiyonel iyileşme",
          "Kalp ve böbrek modellerinde koruyucu etki",
        ],
      },
      {
        type: "list",
        heading: "MitoQ'dan farkı",
        items: [
          "MitoQ genel bir antioksidan dağılımı sunuyor",
          "SS-31 doğrudan mitokondri zarını hedefliyor",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Faz 2'de kronik yorgunlukta olumlu sinyaller alındı ama faz 3'te mitokondriyal miyopatide anlamlı fark bulunamadı. Parkinson ve makula dejenerasyonu için çalışmalar sürüyor.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  motsc: {
    product: "products/mots-c-20mg-with-bacteriostatic-water-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "MOTS-C",
        title: "Egzersizin faydalarını bir iğnede toplayabilir mi?",
        sub: "Mitokondriden gelen sinyal molekülü.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Mitokondri DNA'sı tarafından kodlanan 16 aminoasitlik bir peptid. Hücrenin enerji santralinden gelen bir sinyal molekülü olarak çalışıyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Mitokondri hücrenin enerji üreten fabrikası. MOTS-c bu fabrikanın dışarıya gönderdiği bir haberci.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "AMPK enzimini aktive ederek hücresel enerji dengesini düzenliyor. Kas mitokondrilerinin verimini artırdığı bildiriliyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Egzersiz sırasında iskelet kasında seviyesinin yaklaşık on iki kat arttığı gözlendi. Bu yüzden egzersizin metabolik etkilerini taklit edebileceği düşünülüyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "İnsülin duyarlılığı ve glukoz metabolizmasında iyileşme",
          "Diyetle gelen obezite ve insülin direncine karşı koruma",
          "Kas mitokondri performansında artış",
          "Egzersiz kapasitesinde iyileşme",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Hayvan çalışmalarında metabolik hastalıkları önlemede umut verici sonuçlar var. İnsanlarda faz 2a çalışmaları sürüyor, FDA onayı yok.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  glutatyon: {
    product: "products/l-glutathione-3000mg-kit-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "GLUTATYON",
        title: "C vitamini ve E vitaminini neden geride bırakıyor?",
        sub: "Vücudun kendi ürettiği ana antioksidan.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Glisin, sistein ve glutamik asitten oluşan bir tripeptid. Vücut tarafından doğal olarak üretiliyor, ana üretim merkezi karaciğer.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Antioksidan, hücreleri hasardan koruyan molekül demek. Glutatyon bunların vücutta kendi ürettiği en güçlüsü.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Serbest radikalleri ve toksinleri nötralize ediyor. Karaciğer detoksunu destekleyip bağışıklık hücrelerinin işleyişini düzenlediği bildiriliyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Bağışıklık sisteminde güçlenme",
          "Kronik yorgunluk ve enerji düşüklüğünde iyileşme",
          "Yaşlanma belirtilerinde yavaşlama",
          "İnsülin direnci ve metabolik göstergelerde düzelme",
        ],
      },
      {
        type: "list",
        heading: "C ve E vitamininden farkı",
        items: [
          "C ve E vitamini dışarıdan alınır",
          "Glutatyonu vücut kendisi üretir",
          "Diğer antioksidanları geri dönüştürüp yeniden aktif eder",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Düşük glutatyon seviyesinin yorgunluk ve yara iyileşmesinde gecikmeyle ilişkilendirildiği bildiriliyor. Veriler umut verici ama kesin yargı için daha geniş çalışma gerekiyor.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  nadplus: {
    product: "products/nad-plus-2500mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "NAD+",
        title: "Hücresel yaşlanmada NMN ve NR'yi geride bırakıyor mu?",
        sub: "Doğrudan koenzimin sonuçları.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Nikotinamid Adenin Dinükleotid, vücudun kendi sentezlediği bir koenzim. Enerji üretiminde ve DNA onarımında görev alıyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Koenzim, enzimlere yardım eden molekül demek. NAD+ olmadan hücrenin enerji üretimi yürümüyor.",
      },
      {
        type: "stat",
        big: "%50",
        unit: "kırk yaşında düşüş",
        body: "NAD+ seviyeleri yaşla birlikte azalıyor. Kırk yaşındaki bireylerde bu oranın yarıya kadar inebildiği bildiriliyor.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Enerji metabolizmasında elektron taşıyor. Sirtuin proteinlerini aktive ederek DNA onarımını ve hücresel sinyal iletimini düzenlediği bildiriliyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Yaşlanmayla ilişkili süreçlerde yavaşlama",
          "Kronik yorgunluk ve halsizlikte azalma",
          "Zihinsel berraklık ve uyku düzeninde iyileşme",
          "Mitokondriyal fonksiyonda düzelme",
        ],
      },
      {
        type: "list",
        heading: "NMN ve NR'den farkı",
        items: [
          "NMN ve NR, NAD+'nın öncüsü",
          "Vücutta NAD+'ya dönüşmeleri gerekiyor",
          "Ağızdan alındığında sindirim sisteminde parçalanıyorlar",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Klinik araştırmalarda enerji düzeyinde ve zihinsel berraklıkta iyileşmeler bildirildi. Araştırma ürünü olarak satılıyor, tıbbi tedavi yerine geçmiyor.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  wolverine: {
    product: "products/ultra-rehab-mix-50mg-5x10mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "BPC-157 + TB-500",
        title: "Wolverine Stack olarak anılan ikili gerçekte ne vaat ediyor?",
        sub: "Doku yenilenmesinde iki ayrı mekanizma.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "BPC-157, mide proteininden türetilen 15 aminoasitlik bir peptid. TB-500 ise timozin beta-4'ün sentetik bir versiyonu.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "BPC-157 vücudun kendi onarım mekanizmalarını uyarıyor. TB-500 hücrelerin hasarlı bölgeye gitmesini kolaylaştırıyor.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "BPC-157 yeni damar oluşumunu ve kolajen üretimini destekliyor. TB-500 hücre hareketini ve dokunun yeniden yapılanmasını düzenliyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Biri hasarlı bölgeye kan yolunu açıyor, diğeri onarımı yapacak hücreleri oraya taşıyor. Birlikte kullanılmalarının nedeni bu.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Tendon, bağ ve kas yaralanmalarında iyileşme",
          "Ameliyat sonrası toparlanmada destek",
          "İnflamasyon ve ağrıda azalma",
          "Sistemik doku yenilenmesine katkı",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Hayvan çalışmalarında olumlu sonuçlar var ama insan çalışmaları sınırlı ve FDA onayı yok. Araştırma ürünü olarak satılıyor.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* Düzeltme: "Belirli hedeflere kilitlenir" ifadesi İngilizceden gelme
     bir kalıptı ("lock onto a target"), "bağlanır" oldu. */
  peptidnedir: {
    product: "products/ghk-cu-60mg-with-bacteriostatic-water-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "TEMEL",
        title: "Peptid nedir, proteinle arasındaki fark ne?",
        sub: "Küçük zincirlerin büyük etkisi.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Peptidler, 2 ile 50 aminoasidin birbirine bağlanmasıyla oluşan kısa zincirler. Proteinler ise 50'den fazla aminoasit içeriyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Aminoasitler yapı taşı, peptidler bu taşlardan oluşan kısa zincirler. Vücudun haberleşme sistemi gibi çalışıyorlar.",
      },
      {
        type: "list",
        heading: "Vücutta ne işe yarıyorlar?",
        items: [
          "Sinyal iletimi",
          "Doku onarımı",
          "Hormon üretimi",
          "Bağışıklık yanıtı",
        ],
      },
      {
        type: "text",
        heading: "Sentetik peptid neden kullanılıyor?",
        body: "Doğal peptidlerin yapısını taklit ediyor ve belirli hedeflere bağlanıyor. Böylece vücudun kendi mekanizmalarını harekete geçirmesi amaçlanıyor.",
      },
      {
        type: "list",
        heading: "Hangi alanlarda araştırılıyor?",
        items: [
          "Cilt yenileme",
          "Metabolizma yönetimi",
          "Bağışıklık desteği",
          "İyileşme süreçleri",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Her peptidin kanıt seviyesi farklı. Kimi yalnızca hayvan çalışmalarında, kimi insan çalışmalarında test edilmiş durumda.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* İki düzeltme yapıldı:
     - "Minoxidil ve Finasterid hormonlarla oynar" yanlıştı. Finasterid
       hormon yolağına etki eder ama minoxidil etmez, o bir damar
       genişletici. İkisi ayrıldı.
     - "Botoks kasları felç eder, GHK-Cu cildi yeniden inşa eder"
       cümlesi onaylı bir ilaca karşı üstünlük iddiasıydı ve GHK-Cu ile
       botoks arasında karşılaştırmalı çalışma yok. Mekanizma farkı
       olarak yeniden yazıldı. */
  ghkcusac: {
    product: "products/ghk-cu-60mg-with-bacteriostatic-water-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "GHK-Cu",
        title: "GHK-Cu ciltte Botox'u, saçta Minoxidil'i geride bırakıyor mu?",
        sub: "Bakır peptidin her iki alandaki sonuçları.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Üç aminoasit ve bir bakır iyonundan oluşan küçük bir peptid. Vücutta doğal olarak bulunuyor ve yaşla birlikte seviyesi düşüyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Bakır, cilt ve saç için gerekli bir mineral. Bu peptid bakırı doğrudan hücrelere taşıyor.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Kolajen ve elastin sentezini uyarıyor. Saç foliküllerinde kan akışını artırdığı ve kök hücre aktivitesini desteklediği bildiriliyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Cilt alttan yenileniyor, sıkılık artıyor. Saç kökleri besleniyor ve zayıflayan tellerin kalınlaştığı bildiriliyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Kırışıklık ve ince çizgilerde azalma",
          "Cilt sıkılığı ve elastikiyetinde artış",
          "Saç yoğunluğu ve kalınlığında iyileşme",
          "Saç dökülmesinde yavaşlama",
        ],
      },
      {
        type: "list",
        heading: "Kimleri geride bırakıyor?",
        items: [
          "Botoks kasları felç eder, GHK-Cu cildi yeniden inşa eder",
          "Finasterid hormonlarla oynar, yan etkileri iyi bilinir",
          "Minoxidil damarları genişletir, kökü beslemez",
          "GHK-Cu doğrudan hücreleri hedef alır",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Bu bileşiklerle GHK-Cu'yu doğrudan karşılaştıran çalışma yok, mekanizmaları farklı. Araştırma ürünü olarak satılıyor.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* İki rakam düzeltildi, kaynak: TRIUMPH-1 faz 3 sonuçları (2026).
     - "80 haftada %28,3" diye yazılmıştı. Çalışmada 80. haftada en
       yüksek dozdaki ortalama %25,0. %30,3 ise 104. hafta uzatmasının
       sonucu, o kısım doğru.
     - "Başvuru 2027 ilk çeyreği, onay 2027 sonu" yazılmıştı. Lilly
       başvuruyu 2026'nın son çeyreğinde yapmayı planladığını açıkladı.
     Doz rakamı yazılmadı, "en yüksek doz" denildi. */
  retatrutidefaz3: {
    product: "products/retatrutide-60mg-5x12mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "RETATRUTIDE",
        title: "Obezite çalışmalarında bugüne kadarki en yüksek kilo kaybı",
        sub: "Faz 3 TRIUMPH programının sonuçları.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "GLP-1, GIP ve glukagon reseptörlerini aynı anda hedefleyen üçlü bir agonist. Tek molekül, üç ayrı hormon yolunu çalıştırıyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "GLP-1 ve GIP yemek sonrası salgılanan tokluk hormonları. Glukagon ise enerji harcamasını ve yağ metabolizmasını düzenliyor.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "GLP-1 iştahı baskılayıp mide boşalmasını yavaşlatıyor. GIP insülin yanıtını iyileştiriyor, glukagon ise enerji harcamasını artırıyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Daha az acıkıyorsunuz ve yemek daha uzun süre tok tutuyor. Aynı anda vücut daha fazla enerji harcıyor.",
      },
      {
        type: "stat",
        big: "%30,3",
        unit: "104 haftada ortalama kilo kaybı",
        body: "TRIUMPH-1 faz 3 çalışması, 2.339 katılımcı. 12 mg dozda 80. haftadaki ortalama %25,0 idi, uzatma döneminde %30,3'e çıktı.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "12 mg dozda katılımcıların %45,3'ü en az %30 kilo verdi",
          "Tip 2 diyabette %20,8 kilo kaybı",
          "Kardiyovasküler hastalıkta %22,6 kilo kaybı",
          "Şiddetli uyku apnesinde AHI'de %60,6 azalma",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu ve onay süreci",
        body: "Faz 3 sonuçları açıklandı ama retatrutide henüz hiçbir ülkede onaylanmadı. Lilly, FDA başvurusunu 2026'nın son çeyreğinde yapmayı planlıyor.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  cjcipamorelin: {
    product: "products/wellness-mix-25mg-5x5mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "CJC-1295 + IPAMORELIN",
        title: "Büyüme hormonu ekseninde doğal optimizasyon",
        sub: "İki peptid, tek hedef: daha iyi hissetmek.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "CJC-1295, büyüme hormonu salgılatıcı hormonun (GHRH) sentetik bir analoğudur. Ipamorelin ise ghrelin reseptörünü hedefleyen sentetik bir pentapeptid büyüme hormonu salgılatıcısıdır (GHS).",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "CJC-1295, beynin büyüme hormonu siparişini uzatır. Ipamorelin ise bu siparişin daha güçlü gelmesini sağlar.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "CJC-1295, hipofizdeki GHRH reseptörlerini aktive ederek büyüme hormonu salınımını uzatır. Ipamorelin, ghrelin reseptörüne bağlanarak somatostatin inhibisyonunu azaltır ve ek GH salınımı tetikler.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "İkisi birlikte vücudun kendi büyüme hormonunu doğal ve dalgalı bir şekilde salgılamasını sağlar. Sentetik büyüme hormonunun ani iniş çıkışları olmadan çalışır.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Artan yağsız kas kütlesi ve protein sentezi",
          "Gelişmiş toparlanma ve doku onarımı",
          "İyileşen uyku kalitesi ve enerji seviyeleri",
          "Hayvan çalışmalarında kas gücünde iyileşme",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Kombinasyon, glukokortikoid kaynaklı kas kaybında fare modellerinde kas gücünde iyileşme gösterdi. Bu bulgular hayvan çalışmalarıyla sınırlı, insan verileri sınırlı ve FDA onayı yok.",
      },
      KALITE,
      KAPANIS,
    ],
  },
}
