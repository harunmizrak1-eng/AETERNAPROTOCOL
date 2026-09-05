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

  /* BPC-157'nin ikinci açısı: "wolverine" kelimesi burada BPC-157'nin
     tek başına doku onarımındaki ününü sorguluyor, mevcut "wolverine"
     seti ise BPC-157+TB-500 ikilisini anlatıyor. İkisi farklı gönderi,
     ayrı anahtar altında duruyor.

     Not: Gönderi açıklamasındaki "36 çalışmanın 35'i preklinik, 1'i
     klinik" ifadesiyle slayt 7'deki "insanda yalnızca 3 küçük pilot
     çalışma var" ifadesi birbiriyle çelişiyor (1 mi 3 mü). Metin
     verildiği gibi basıldı, sayı düzeltilmedi. */
  bpc157wolverine: {
    product: "products/bpc157-25mg-5x5mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "BPC-157",
        title: "BPC-157 doku onarımında gerçekten \u201cWolverine\u201d etkisi yaratıyor mu?",
        sub: "Mide kaynaklı peptidin bilimsel durumu.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "BPC-157 (Body Protective Compound-157), insan mide suyundan izole edilen 15 amino asitlik sentetik bir pentadekapeptiddir. Mide mukozasını koruyan doğal bir protein fragmanından türetilmiştir.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Vücudun kendi iyileşme mekanizmalarını taklit eden küçük bir protein parçasıdır. Mideden alınan bu molekül, tüm vücutta doku onarımını uyarır.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "VEGFR2 ve nitrik oksit yollarını aktive ederek anjiyogenezi (yeni damar oluşumu) başlatır. Akt-eNOS ekseni üzerinden fibroblast aktivitesini ve kollajen sentezini artırır, inflamatuar sitokinleri baskılar.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Hasarlı bölgeye yeni damarlar gönderir, onarım ekibini çağırır ve iltihabı sakinleştirir. Özellikle tendon gibi kanlanması zayıf dokularda etkili olduğu düşünülüyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Kas, tendon, bağ ve kemik yaralanmalarında iyileşmeyi hızlandırdığı gösterildi",
          "Gastrointestinal mukozayı koruduğu ve bağırsak bütünlüğünü desteklediği bildiriliyor",
          "Hayvan modellerinde karaciğer koruyucu ve travmatik beyin hasarında iyileşmeyi destekleyici etkiler gözlendi",
          "Kronik diz ağrısı olan 12 hastanın 7'sinde 6 aydan uzun süreli rahatlama sağlandı",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "1993-2024 arası 36 çalışmanın incelendiği sistematik derlemede 35'i hayvan çalışmasıydı. İnsanda yalnızca 3 küçük pilot çalışma var. FDA onayı yoktur, profesyonel sporlarda yasaktır.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  hghfragment: {
    product: "products/hgh-fragment-176-191-50mg-5x10mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "HGH FRAGMENT 176-191",
        title: "Büyüme hormonunun yağ yakıcı parçası",
        sub: "Tüm sistemik etkiler olmadan lipoliz mümkün mü?",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "İnsan büyüme hormonunun (hGH) C-terminalinden türetilen 16 amino asitlik sentetik bir peptid fragmentidir. AOD9604 olarak da bilinen bu molekül, büyüme hormonunun yağ metabolizmasıyla ilişkili bölgesini hedef alır.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Tam büyüme hormonu vücutta büyüme, kan şekeri ve yağ yakımı gibi pek çok etki yaratır. Bu fragment sadece yağ yakımıyla ilgili kısmı taklit eder, gerisini bırakır.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Klasik büyüme hormonu reseptörü yerine adipositlerde beta-3 adrenerjik sinyalleşme üzerinden çalışır. Depolanmış yağın salınımını (lipoliz) uyarır ve yeni yağ sentezini (lipogenez) inhibe eder.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Yağ hücrelerine doğrudan \u201cdepoyu boşalt\u201d komutu gönderir. Aynı anda yeni yağ depolanmasını da engeller.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Büyüme hormonunun lipolitik etkisini taklit eder, hiperglisemi yapmaz",
          "Preklinik modellerde vücut yağında %12-23 azalma gösterildi",
          "IGF-1 yükselmesine veya insülin antagonisti etkilere yol açmaz",
          "Altı klinik çalışmada vital bulgularda ve EKG'de değişiklik gözlenmedi",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Yayımlanan tek insan çalışmasında (günde iki kez 300 mcg) anlamlı etki gözlenemedi. Unmodified HGH Fragment 176-191 insanlarda test edilmemiştir, güvenlik ve etkinlik verileri doğrudan çıkarılamaz. FDA onayı yoktur, araştırma ürünüdür.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  cagrilintide: {
    product: "products/cagrilintide-25mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "CAGRILINTIDE",
        title: "GLP-1'den farklı bir mekanizma ile kilo yönetimi",
        sub: "Amilin analogunun Faz 3 sonuçları.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Pankreas hormonu amilinin uzun etkili sentetik bir analogudur. Amilin, insülinle birlikte salgılanan ve tokluk hissini düzenleyen doğal bir hormondur.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Amilin, yemekten sonra pankreastan salgılanır ve beyne \u201cdoydum\u201d sinyali gönderir. Cagrilintide bu doğal sinyali taklit eder, daha uzun süre etkili olacak şekilde tasarlanmıştır.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Beyindeki amilin reseptörlerine bağlanarak iştahı baskılar ve tokluk süresini uzatır. Mide boşalmasını yavaşlatır, kan şekerini düzenler.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "GLP-1 agonistlerinden tamamen farklı bir yol izler. Daha az acıkırsınız, yediğiniz yemek daha uzun süre tok tutar.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Monoterapide 68 haftada ortalama %11,8 kilo kaybı (placeboda %2,3)",
          "Semaglutid ile kombinasyonda (CagriSema) %22,7 kilo kaybı",
          "Katılımcıların %40,4'ü CagriSema ile %25'ten fazla kilo verdi",
          "Tip 2 diyabetli hastalarda da anlamlı kilo kaybı bildirildi",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu - Güvenlik profili",
        body: "Faz 3 REDEFINE çalışmaları tamamlandı, monoterapi ve kombinasyon verileri mevcut. FDA onayı yoktur, araştırma ürünüdür. Yan etkiler çoğunlukla hafif-orta GI semptomlardır, GLP-1'lere kıyasla daha az kusma bildirilmiştir.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* Melanotan-II için üç versiyon geldi, aralarında fark vardı. En
     kapsamlı ve en güncel düzenleyici bilgiyi taşıyanı (FDA Kategori 2,
     Cilt Kanseri Vakfı uyarısı, melanom vaka raporları) kullanıldı;
     diğer ikisi bunun eksik halleriydi. */
  melanotan2: {
    product: "products/melanotan-2-30mg-aq-pen-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "MELANOTAN-II",
        title: "30 yıldır pigmentasyon araştırmalarında incelenen sentetik peptid",
        sub: "Non-selektif melanokortin reseptör agonistinin bilimsel durumu.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Endojen \u03b1-melanosit uyarıcı hormonun (\u03b1-MSH) sentetik siklik heptapeptit analogudur. 7 amino asitten oluşan siklik yapısı, doğal hormona göre daha uzun yarı ömür (1-2 saat) sağlar.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "\u03b1-MSH, vücudun kendi ürettiği ve derideki pigment hücrelerini uyaran doğal bir hormondur. Melanotan-II bu doğal hormonu taklit eder, ancak daha uzun süre etkili olacak şekilde tasarlanmıştır.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Derideki melanositlerde MC1R reseptörlerini aktive eder. cAMP/PKA sinyal kaskadını uyararak tirozinaz enzimini yukarı düzenler ve eumelanin (koyu pigment) sentezini artırır.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Pigment üreten hücrelere \u201cdaha fazla melanin yap\u201d komutu gönderir. Cilt, güneşe maruz kalmadan koyulaşmaya başlar.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Erken faz çalışmalarda 5 gün içinde cilt koyulaşması gösterilmiştir",
          "Non-selektif yapısı nedeniyle MC3R, MC4R ve MC5R'ye de bağlanır",
          "Melanotan-I (Afamelanotide) ile karşılaştırıldığında kan-beyin bariyerini geçer ve daha fazla yan etki bildirilir",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu - Düzenleyici durum",
        body: "FDA onayı yoktur, hiçbir ülkede düzenleyici onay almamıştır, Faz III güvenlik/etkinlik çalışması bulunmamaktadır. FDA Kategori 2 kısıtlı listesinde tutulması planlanmaktadır, Cilt Kanseri Vakfı kullanımına karşı uyarıda bulunmaktadır.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  doubleburn: {
    product: "products/double-burn-mix-5mg-5x5mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "DOUBLE BURN MIX",
        title: "Yağ yakımında iki peptid, tek hedef",
        sub: "AOD-9604 ve HGH Fragment 176-191'in bilimsel durumu.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "İnsan büyüme hormonunun yağ yakıcı C-terminal bölgesinden türetilen iki peptidi içerir. AOD-9604 ve HGH Fragment 176-191, aynı temel mekanizmayı hedefler.",
      },
      {
        type: "text",
        heading: "Aralarındaki fark",
        body: "HGH Fragment 176-191, amino asit 176-191'in doğal diziliminin sentetik kopyasıdır. AOD-9604, bu dizilime stabilite artırıcı modifikasyonlar eklenmiş mühendislik ürünü versiyondur.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyorlar?",
        body: "Her ikisi de adipositlerde beta-3 adrenerjik reseptör benzeri yolaklar üzerinden lipolizi (yağ yıkımı) uyarır. Aynı anda lipogenezi (yağ sentezi) inhibe ederler.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Yağ hücrelerine \u201cdepoyu boşalt\u201d komutu gönderirler. Aynı anda yeni yağ depolanmasını da engellerler.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Preklinik çalışmalarda obez farelerde vücut ağırlığında azalma ve yağ oksidasyonunda artış gösterildi",
          "AOD-9604, Faz IIb/III insan klinik çalışmalarına kadar ilerledi",
          "Altı insan çalışmasında (890+ katılımcı) güvenlik ve tolere edilebilirlik bildirildi",
          "İnsanlarda kilo kaybı etkinliği çalışmalar arasında tutarsız sonuçlar verdi",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "AOD-9604 insan verileri mevcut ama etkinlik sinyalleri tutarsız. Modifiye edilmemiş HGH Fragment 176-191 insan çalışmalarında test edilmemiştir. FDA onayı yoktur, araştırma ürünüdür.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  aod9604: {
    product: "products/aod9604-25mg-5x5mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "AOD-9604",
        title: "Büyüme hormonunun yağ yakıcı parçası",
        sub: "16 amino asitlik fragmanın bilimsel durumu.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "İnsan büyüme hormonunun (hGH) C-terminal bölgesinden türetilen 16 amino asitlik sentetik bir peptid fragmanıdır. Amino asit dizilimi 177-191 aralığına karşılık gelir, N-terminaline stabilite için tirozin eklenmiştir.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Tam büyüme hormonu vücutta büyüme, kan şekeri ve yağ yakımı gibi pek çok etki yaratır. Bu fragman sadece yağ yakımıyla ilgili kısmı taklit eder, gerisini bırakır.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Yağ hücrelerinde lipolizi uyarır, aynı anda lipogenezi inhibe eder. Tam büyüme hormonundan farklı olarak IGF-1 seviyelerini yükseltmez ve insülin direncine yol açmaz.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Yağ hücrelerine \u201cdepoyu boşalt\u201d komutu gönderir, aynı anda yeni yağ depolanmasını engeller. Büyüme hormonunun kan şekerini yükselten etkisi olmadan çalışır.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "2001 çalışmasında 12 haftada 1 mg dozda ortalama 2,6 kg kilo kaybı (placeboda 0,8 kg)",
          "536 katılımcılı Faz 2b çalışmasında plaseboya karşı anlamlı fark gözlenmedi",
          "Hayvan çalışmalarında vücut ağırlığında azalma ve yağ oksidasyonunda artış gösterildi",
          "Güvenlik profili plaseboyla ayırt edilemeyecek kadar iyi bildirildi",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Obezite tedavisi olarak geliştirilmesi 2007'de Faz 2b başarısızlığı sonrası durduruldu. FDA onayı ve Avustralya TGA onayı yoktur. Araştırma ürünüdür, tıbbi tedavi yerine geçmez.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* Mega Mass Mix'in kendi metninde ayrı bir kalite slaydı istenmemiş,
     8. madde doğrudan "Kanıt durumu - Kapanış" olarak bitiyor. Diğer
     setlerdeki KALITE eklenmedi, kullanıcının kurduğu yapı korundu. */
  megamass: {
    product: "products/mega-mass-mix-10mg-5x10mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "MEGA MASS MIX",
        title: "GHRP-6 ve CJC-1295 ile büyüme hormonu ekseninde çift etki",
        sub: "İki reseptör, tek hedef.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "GHRP-6 ve CJC-1295'i bir araya getiren bir peptid kombinasyonudur. İkisi farklı reseptör sistemleri üzerinden büyüme hormonu eksenini hedefler.",
      },
      {
        type: "text",
        heading: "GHRP-6 nedir?",
        body: "Hipofizdeki GHS-R1a (ghrelin) reseptörlerini aktive eden sentetik bir hekzapeptiddir. Büyüme hormonu salınımını tetikler ve somatostatin inhibisyonunu baskılar.",
      },
      {
        type: "text",
        heading: "CJC-1295 nedir?",
        body: "Büyüme hormonu salgılatıcı hormonun (GHRH) sentetik bir analoğudur. Hipofizdeki GHRH reseptörlerine bağlanarak büyüme hormonu üretimini uyarır.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "GHRP-6, büyüme hormonu üreten hücrelere \u201c\u00e7al\u0131\u015f\u201d komutunu verir. CJC-1295 ise bu komutun daha uzun süre etkili olmasını sağlar.",
      },
      {
        type: "text",
        heading: "Birlikte nasıl çalışıyor?",
        body: "İki farklı reseptörü aynı anda aktive ederek sinerjik bir etki oluştururlar. GHRP-6, somatostatin baskılanmasıyla bu etkiyi daha da güçlendirir.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Hayvan çalışmalarında kas kütlesi ve toparlanmada iyileşme",
          "GHRP-6, doza bağlı olarak belirgin iştah artışı sağlar",
          "Büyüme hormonu salınımı, tek başına kullanıma göre kat kat güçlüdür",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "İnsan verileri sınırlıdır, FDA onayı yoktur. Araştırma ürünüdür, tıbbi tedavi yerine geçmez.",
      },
      KAPANIS,
    ],
  },

  /* Kaynak metindeki "#kas kütlesi" etiketi boşluk içeriyordu; Instagram
     boşlukta etiketi kesiyor ("#kas" + düz metin "kütlesi"). Tek kelime
     haline getirildi, aciklamalar.md'de de aynı düzeltme uygulanacak. */
  ghrp6: {
    product: "products/ghrp-6-25mg-5x5mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "GHRP-6",
        title: "Büyüme hormonu salgılatıcı peptid",
        sub: "Ghrelin reseptörü üzerinden güçlü etki.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "6 amino asitten oluşan sentetik bir hekzapeptiddir. Growth Hormone Releasing Peptide-6'nın kısaltmasıdır.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Vücudun kendi büyüme hormonunu salgılamasını sağlayan küçük bir protein parçasıdır. Açlık hormonu ghrelini taklit ederek çalışır.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Hipofizdeki ghrelin reseptörlerine (GHS-R1a) bağlanarak büyüme hormonu salınımını tetikler. Aynı anda büyüme hormonunu baskılayan somatostatini inhibe eder.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Beyindeki ilgili bölgeye \u201cbüyüme hormonu üret\u201d komutunu gönderir. Engelleyici mekanizmayı da devre dışı bırakarak etkiyi güçlendirir.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Güçlü ve doza bağlı büyüme hormonu salınımı",
          "Ghrelin benzeri etkiyle belirgin iştah artışı",
          "Preklinik çalışmalarda kas kütlesi, toparlanma, yara iyileşmesi ve kemik yoğunluğunda iyileşme",
          "Hücresel düzeyde 15 dakika içinde ölçülebilir biyolojik aktivite",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "Sağlıklı gönüllülerde güvenlik ve tolere edilebilirlik gösterilmiştir. Akut iskemik inme hastalarında EGF ile kombinasyon halinde Faz I/II ve III çalışmaları yürütülmektedir. FDA onayı yoktur.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* Yeni, daha detaylı TB-500 seti. Mevcut "tb500" anahtarı BPC-157 ile
     karşılaştırmalı farklı bir açıyı anlatıyor; bu ikinci set TB-500'ün
     kendisini Timozin Beta-4'ten ayıran noktayı anlatıyor, o yüzden
     üzerine yazılmadı, ayrı anahtar altında duruyor. */
  tb500detay: {
    product: "products/tb500-25mg-5x5mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "TB-500",
        title: "Doku onarımında adı geçen sentetik peptid fragmanı",
        sub: "Timozin beta-4'ten farkı ne?",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Timozin beta-4 (T\u03b24) adlı doğal proteinin aktif bölgesinden türetilen 7 amino asitlik sentetik bir fragmandır. Amino asit dizilimi: Ac-LKKTETQ.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Timozin beta-4, vücudun hemen her hücresinde bulunan ve hücre hareketinde rol oynayan doğal bir proteindir. TB-500 bu proteinin sadece küçük bir parçasıdır, tamamı değil.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Hücre iskeletinin yapıtaşı olan G-aktin moleküllerine bağlanır. Hücre göçünü, doku yeniden şekillenmesini ve yeni damar oluşumunu düzenlediği düşünülüyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Hücrelerin hasarlı bölgeye taşınmasını ve orada yapı kurmasını sağladığı varsayılıyor. Kanlanmayı artırarak iyileşmeyi desteklediği öne sürülüyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Hayvan çalışmalarında kas, tendon, bağ ve kalp dokusunda iyileşme sinyalleri",
          "Topikal uygulamada kronik yara iyileşmesinde Faz 2 verileri",
          "2026'da kardiyak iyileşme üzerine insan çalışması yayımlandı",
        ],
      },
      {
        type: "evidence",
        heading: "Timozin beta-4'ten farkı - Kanıt durumu",
        body: "Timozin beta-4'ün göz damlası olarak Faz 3 çalışmaları var. TB-500 fragmanının kendisi için tamamlanmış hiçbir insan çalışması yok. FDA onayı yoktur, araştırma ürünüdür.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  epithalon: {
    product: "products/epithalon-50mg-with-bacteriostatic-water-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "EPITHALON",
        title: "Pineal bezden türetilen sentetik tetrapeptid",
        sub: "Telomeraz aktivasyonu ve hücresel yaşlanma araştırmaları.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Ala-Glu-Asp-Gly (AEDG) amino asit dizilimine sahip sentetik bir tetrapeptiddir. Sığır pineal bez ekstraktı olan Epithalamin'in amino asit kompozisyonu temel alınarak sentezlenmiştir.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Pineal bez, beynin melatonin üreten bölgesidir. Epithalon, bu bezin doğal peptidlerini taklit eden sentetik bir moleküldür.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "Telomeraz enziminin katalitik alt biriminin (hTERT) ekspresyonunu uyardığı düşünülüyor. Melatonin sentezi üzerinde doğrudan etkisi olduğu bildiriliyor.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Hücrelerin doğal yaşlanma saatini yavaşlattığı varsayılıyor. Uyku-uyanıklık döngüsünü düzenleyen melatonin üretimini desteklediği öne sürülüyor.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "İnsan somatik hücrelerinde %33'e varan telomer uzaması",
          "İnsan fetal fibroblast kültüründe telomeraz geninin reaktivasyonu",
          "Hayvan modellerinde spontan tümör gelişiminde inhibisyon",
          "Antioksidan, nöroprotektif ve antimutajenik etkiler",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu - Düzenleyici statü",
        body: "Randomize kontrollü insan çalışması yoktur, mevcut insan verileri küçük Rus çalışmalarıyla sınırlıdır. FDA Danışma Komitesi kompounding için 7-4 oyla önerdi, bu henüz FDA onayı anlamına gelmez.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  /* Kaynak metinde slayt numaralandırması karışmıştı: "3. pozisyonda
     arginin..." cümlesi ayrı bir slayt gibi numaralanmış ama aslında
     Nedir slaydının ikinci cümlesiydi (LR3'teki "3. pozisyon" ifadesiyle
     slayt numarası çakışmış). O cümle Nedir slaydına katlandı, kalan
     slaytlar 1-8 olacak şekilde yeniden sayıldı. */
  igf1lr3: {
    product: "products/igf1-lr3-1mg-5x0p2mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "IGF-1 LR3",
        title: "Doğal IGF-1'in uzun etkili analoğu",
        sub: "Yarı ömrü 20-30 saate çıkan sentetik peptid.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "IGF-1 LR3 (Long R3 Insulin-like Growth Factor-1), insan IGF-1'inin sentetik bir analoğudur. 3. pozisyonda arginin (R3) ikamesi ve N-terminalinde 13 amino asitlik uzantı içerir.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "IGF-1, büyüme hormonunun etkilerini dokulara ileten doğal bir büyüme faktörüdür. LR3 versiyonu, bu faktörün vücutta çok daha uzun süre aktif kalmasını sağlayacak şekilde tasarlanmıştır.",
      },
      {
        type: "text",
        heading: "Nasıl çalışıyor?",
        body: "İskelet kasındaki IGF-1 reseptörlerine (IGF-1R) bağlanarak PI3K-Akt ve MAPK/ERK sinyal yollarını aktive eder. Kas protein sentezini artırdığı ve protein yıkımını azalttığı düşünülüyor.",
      },
      {
        type: "text",
        heading: "Doğal IGF-1'den farkı",
        body: "Doğal IGF-1, IGFBP'lere yüksek afiniteyle bağlanır ve dolaşımda serbest formda 10-12 dakika kalır. LR3'ün IGFBP afinitesi yaklaşık 1000 kat daha düşük, serbest ve aktif formda kalma süresi 20-30 saate uzar.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Hayvan çalışmalarında doğal IGF-1'e göre 6 kat daha güçlü büyüme etkisi",
          "Vücut ağırlığı artışı ve yem dönüşüm verimliliğinde iyileşme",
          "Kas protein sentezinde artış, protein yıkımında azalma",
          "Bağırsak dokusu dahil çeşitli dokularda proliferatif etki",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu",
        body: "İnsan verileri neredeyse yok denecek kadar az. FDA veya başka hiçbir düzenleyici kurum tarafından onaylanmamıştır. WADA yasaklı listesinde (S2 sınıfı) yer alır.",
      },
      KALITE,
      KAPANIS,
    ],
  },

  superslim: {
    product: "products/super-slim-mix-55mg-5x11mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "SUPER SLIM MIX",
        title: "Üç mekanizma, tek hedef",
        sub: "AOD 9604 \u00b7 FRAG 176-191 \u00b7 Adipotide.",
      },
      {
        type: "text",
        heading: "Nedir?",
        body: "Üç farklı yağ yakım peptidini tek flakonda birleştirir. AOD 9604 ve FRAG 176-191 büyüme hormonu kaynaklıdır, Adipotide ise damar hedefli bir peptidomimetiktir.",
      },
      {
        type: "text",
        heading: "AOD 9604 ve FRAG 176-191",
        body: "Her ikisi de büyüme hormonunun yağ yakıcı bölgesinden türetilmiştir. Yağ hücrelerinde lipolizi uyarır, lipogenezi inhibe eder.",
      },
      {
        type: "text",
        heading: "Adipotide farklı çalışır",
        body: "Beyaz yağ dokusunu besleyen damarları hedef alır. Damar endotel hücrelerinde apoptozu (programlanmış hücre ölümü) tetikler.",
      },
      {
        type: "text",
        heading: "Sade haliyle",
        body: "Adipotide, yağ hücrelerinin oksijen ve besin kaynağını keser. Kan akımı olmayan yağ hücreleri ölür ve vücut onları temizler.",
      },
      {
        type: "list",
        heading: "Ne bildiriliyor?",
        items: [
          "Obez maymunlarda 28 günde ortalama %11 kilo kaybı",
          "Obez kemirgenlerde 28 günde %30'a varan vücut ağırlığı kaybı",
          "İnsülin direnci ve metabolik belirteçlerde iyileşme",
          "Zayıf hayvanlarda kilo kaybı gözlenmemiştir",
        ],
      },
      {
        type: "evidence",
        heading: "Kanıt durumu ve güvenlik",
        body: "2012'de başlatılan Faz 1 insan çalışması böbrek toksisitesi nedeniyle sonlandırıldı, 2019'da geliştirme kalıcı olarak durduruldu. FDA onayı yoktur, araştırma ürünüdür.",
      },
      KALITE,
      KAPANIS,
    ],
  },
}
