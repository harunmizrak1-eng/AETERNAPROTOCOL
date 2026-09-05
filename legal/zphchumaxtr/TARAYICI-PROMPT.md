# Claude tarayıcı eklentisine verilecek prompt

Aşağıdaki bloğun tamamını kopyalayıp eklentiye yapıştır. Kendi kendine
yetiyor, başka bilgi vermene gerek yok.

---

```
GÖREV: Sitemin birebir kopyasını yayımlayan bir siteyi Google aramasından
kaldırtacağız ve barındırıcısına şikayet edeceğiz. İki form dolduracaksın.
Ben yanındayım, gerektiğinde soracaksın.

## DURUM

Benim sitem:   https://zphctr.com   (ZPHC Türkiye, peptid ve büyüme hormonu)
Kopya site:    https://zphchumaxtr.com

Kopya site benim sitemin tamamını almış. Ölçüldü:

  Peptid kütüphanesi   117 cümlenin 116'sı birebir aynı   (%99)
  Metodoloji            38 cümlenin  37'si aynı           (%97)
  Hakkımızda            24 cümlenin  23'ü aynı            (%96)
  Sıkça sorulanlar      56 cümlenin  54'ü aynı            (%96)
  Doğrulama             27 cümlenin  25'i aynı            (%93)
  Toplam               262 cümlenin 255'i aynı            (%97)

Kopyayı 31 Ağustos 2026'da almışlar ve o gün donmuş, bir daha
güncellenmemiş. Alan adlarını 26 Ağustos 2026'da tescil ettirmişler.
Benim metinlerim 8 Temmuz - 21 Ağustos 2026 arasında yazıldı, yani
onların alan adı var olmadan önce.

Kopya site Hostinger'da barınıyor (sunucusu kendi cevabında
"platform: hostinger" ve "panel: hpanel" başlıklarını gönderiyor),
önünde Cloudflare var, alan adını Nics Telekomunikasyon A.S. tescil etmiş.

## EN ÖNEMLİ DELİL (önce bunu kendin doğrula)

Kopya sitenin kendi kaynak kodunda hâlâ benim alan adım yazıyor.
zphchumaxtr.com adresini aç, sayfa kaynağını görüntüle, "zphctr.com"
araması yap. Şunları göreceksin:

  <meta property="og:url" content="https://zphctr.com">

  {"@context":"https://schema.org","@type":"MedicalBusiness",
   "name":"ZPHC Türkiye","url":"https://zphctr.com","areaServed":"TR"}

Kopyalarken bu alanları silmeyi unutmuşlar. Kendi sitesini yazan hiç
kimse kendi sayfasına başkasının alan adını yazmaz. Önizleme görselini
de hâlâ benim sunucumdan çekiyorlar:
https://zphctr.com/opengraph-image?8d62ad3f63d398ec

Google'ın arama sonucunda onların sayfası için gösterdiği açıklama
metni de benim meta açıklamamdır; kendi açıklama etiketleri yoktur.

Bunu gözünle görüp bana doğrulandığını söyle, sonra forma geç. Eğer
göremezsen DUR ve bana haber ver, çünkü o zaman sayfayı düzeltmişler
demektir ve şikayet metnini değiştirmemiz gerekir.

## GÖREV 1 — GOOGLE'DAN KALDIRMA (öncelikli)

Adres: https://support.google.com/legal/troubleshooter/1114905
Yol:   Google Arama → Telif hakkı → Telif hakkıyla korunan içeriğim
       izinsiz kullanılıyor

Formda soracağı alanlar ve yazılacaklar:

TELİF HAKKI SAHİBİ OLDUĞUM ESERİN ADRESİ:
https://zphctr.com/

İHLAL EDEN ADRESLER — HEPSİNİ AYRI AYRI EKLE. Formda "başka URL ekle"
düğmesi var, on iki adresin hepsini gir. Sadece ana sayfayı yazarsan
diğer sayfalar aramada kalmaya devam eder:

https://zphchumaxtr.com/
https://zphchumaxtr.com/peptidler.html
https://zphchumaxtr.com/metodoloji.html
https://zphchumaxtr.com/sss.html
https://zphchumaxtr.com/hakkimizda.html
https://zphchumaxtr.com/dogrulama.html
https://zphchumaxtr.com/urunler.html
https://zphchumaxtr.com/journal.html
https://zphchumaxtr.com/kargo.html
https://zphchumaxtr.com/iade.html
https://zphchumaxtr.com/kosullar.html
https://zphchumaxtr.com/gizlilik.html

ESERİN TANIMI:
zphctr.com sitesinin metinleri. Peptid kütüphanesi sayfaları, ürün
tanıtım metinleri, metodoloji, hakkımızda, sıkça sorulanlar ve
doğrulama sayfaları ile alt bilgideki yasal uyarı metni tarafımca
yazıldı ve 8 Temmuz - 21 Ağustos 2026 tarihleri arasında yayımlandı.

İHLALİN TANIMI (formun en önemli alanı, aynen yapıştır):

zphchumaxtr.com, zphctr.com sitesinin birebir kopyasıdır. Sayfa sayfa
ölçtüm:

  Peptid kütüphanesi   117 cümlenin 116'sı aynı  (%99)
  Metodoloji            38 cümlenin  37'si aynı  (%97)
  Hakkımızda            24 cümlenin  23'ü aynı   (%96)
  Sıkça sorulanlar      56 cümlenin  54'ü aynı   (%96)
  Doğrulama             27 cümlenin  25'i aynı   (%93)
  Toplam               262 cümlenin 255'i aynı   (%97)

EN KOLAY DOĞRULANABİLİR DELİL: Karşı tarafın sayfa kaynağında hâlâ
benim alan adım yazıyor. zphchumaxtr.com adresini açıp sayfa kaynağını
görüntüleyin ve "zphctr.com" araması yapın:

  <meta property="og:url" content="https://zphctr.com">

  {"@context":"https://schema.org","@type":"MedicalBusiness",
   "name":"ZPHC Türkiye","url":"https://zphctr.com","areaServed":"TR"}

Kendi sitesini yazan hiç kimse kendi sayfasına başkasının alan adını
yazmaz. Sayfayı kopyalarken bu alanları silmeyi unutmuşlar. Önizleme
görselini de hâlâ benim sunucumdan çekiyorlar:
https://zphctr.com/opengraph-image?8d62ad3f63d398ec

Arama sonucunda onların sayfası için gösterdiğiniz açıklama metni de
benim meta açıklamamdır; kendi açıklama etiketleri yoktur.

İkinci delil, hesaplanan bir sayı: Sayfamdaki "Sattığımız 48 bileşiğin
her biri için..." cümlesindeki 48 sayısı kaynak kodda yazılı değildir.
Sitemin veri dosyasındaki kayıt sayısından, site derlenirken
hesaplanır. Karşı tarafın sayfasında da aynı sayı, 48 yazmaktadır. Bu
değer yalnızca benim sitemin yayımlanmış çıktısında bulunur, bağımsız
yazılmış bir metinde bulunamaz.

Kopyalanan metinlerin bende yazıldığı tarihler 8 Temmuz - 21 Ağustos
2026 arasındadır. zphchumaxtr.com alan adı 26 Ağustos 2026'da tescil
edilmiştir (Verisign RDAP kaydı). Kopyalanan her cümle, o alan adı var
olmadan önce yayımlanmıştı.

Karşı taraf sayfayı 31 Ağustos 2026'da kopyalayıp dondurmuş ve o
günden beri güncellememiştir; sunucusunun gönderdiği last-modified
başlığı bunu göstermektedir.

## GÖREV 2 — HOSTINGER'A ŞİKAYET (Google'dan sonra)

Hostinger siteyi gerçekten kapatabilecek taraf. Kötüye kullanım
bildirim formunu bul (hostinger.com üzerinde, Türkçe sayfada "kötüye
kullanım bildirimi" diye geçiyor). Form bulunamazsa abuse@hostinger.com
adresine e-posta olarak gönder.

Konu: DMCA Notice of Copyright Infringement - zphchumaxtr.com

Gövde (İngilizce, aynen):

To: Hostinger Abuse Team

I am submitting a notice of copyright infringement under the DMCA
concerning content hosted on your service.

1. INFRINGING MATERIAL
https://zphchumaxtr.com/ and all pages listed in section 3.
Hosted on Hostinger, confirmed by the "platform: hostinger" and
"panel: hpanel" HTTP response headers served by that domain.

2. ORIGINAL WORK
https://zphctr.com/ — owned and written by me.

3. WHAT WAS COPIED
The infringing site is a complete verbatim copy of mine. Measured page
by page:

  Compound library   116 of 117 sentences identical  (99%)
  Methodology         37 of  38 sentences identical  (97%)
  About us            23 of  24 sentences identical  (96%)
  FAQ                 54 of  56 sentences identical  (96%)
  Verification        25 of  27 sentences identical  (93%)
  Total              255 of 262 sentences identical  (97%)

Infringing URLs:
  https://zphchumaxtr.com/
  https://zphchumaxtr.com/peptidler.html
  https://zphchumaxtr.com/metodoloji.html
  https://zphchumaxtr.com/sss.html
  https://zphchumaxtr.com/hakkimizda.html
  https://zphchumaxtr.com/dogrulama.html
  https://zphchumaxtr.com/urunler.html
  https://zphchumaxtr.com/journal.html
  https://zphchumaxtr.com/kargo.html
  https://zphchumaxtr.com/iade.html
  https://zphchumaxtr.com/kosullar.html
  https://zphchumaxtr.com/gizlilik.html

4. THE INFRINGING SITE STILL NAMES MY DOMAIN IN ITS OWN SOURCE
Open https://zphchumaxtr.com/, view source, search for "zphctr.com":

  <meta property="og:url" content="https://zphctr.com">

  {"@context":"https://schema.org","@type":"MedicalBusiness",
   "name":"ZPHC Türkiye","url":"https://zphctr.com","areaServed":"TR"}

They failed to strip these fields when copying my pages. The site also
still loads its preview image from my server:
https://zphctr.com/opengraph-image?8d62ad3f63d398ec

5. FURTHER PROOF FROM A COMPUTED NUMBER
One sentence on my site reads "Sattığımız 48 bileşiğin her biri
için..." The number 48 is not written in my source; it is generated at
build time from the number of records in a data file in my repository.
The infringing page shows the same number. That value exists only in
the rendered output of my site.

6. DATES
My text was written between 8 July and 21 August 2026, recorded in my
version control history (commit hashes available on request). The
domain zphchumaxtr.com was registered on 26 August 2026 per the
Verisign RDAP record. Every copied sentence predates that registration.
Their copy was taken on 31 August 2026 and has not been updated since,
per the last-modified header your servers return.

7. STATEMENTS
I have a good faith belief that the use of the material described above
is not authorized by the copyright owner, its agent, or the law.

The information in this notification is accurate, and under penalty of
perjury, I am the owner, or authorized to act on behalf of the owner,
of an exclusive right that is allegedly infringed.

8. CONTACT
Name:    [BANA SOR]
Address: [BANA SOR]
Phone:   [BANA SOR]
Email:   [BANA SOR]

Signature: /[AD SOYAD]/
Date:      [BUGÜNÜN TARİHİ]

## UYMAN GEREKEN KURALLAR

1. Ad, adres, telefon, e-posta alanlarını ASLA kendin doldurma ve
   tahmin etme. Bana sor, ben yazacağım.

2. Her iki formda da "yalan beyanda bulunursam sorumluluğu kabul
   ediyorum" anlamına gelen bir onay kutusu ve imza alanı var.
   İkisini de sen işaretleme. Forma geldiğinde dur, bana göster,
   onayı ben vereceğim. Bu yeminli bir beyan, benim imzam olmalı.

3. GÖNDER düğmesine kendi başına basma. Her formu doldurduktan sonra
   dur, bana ekranı göster, "gönder" dememi bekle.

4. Yukarıdaki metinlerdeki hiçbir sayıyı, tarihi veya cümleyi
   değiştirme, ekleme yapma, süsleme. Hepsi tek tek doğrulandı.
   Formda yer kısıtı varsa kısaltma yapma, bana sor hangi bölümü
   çıkaracağımı ben söyleyeyim.

5. Formda burada karşılığı olmayan bir alan çıkarsa boş bırak ve bana
   sor. Uydurma.

6. Karşı sitenin sayfalarını sadece oku. Onların formlarına hiçbir şey
   yazma, WhatsApp numaralarına dokunma, hiçbir yere kayıt olma.

## SONUNDA BANA VER

- Google başvurusunun takip numarası veya onay ekranının görüntüsü
- Hostinger başvurusunun referans numarası
- Her iki formda tam olarak ne yazdığın
```

---

## Bunları eklentiye vermeden önce hazırla

Elinin altında bulunsun, soracak:

- Ad soyad (telif sahibi olarak beyan edeceğin isim)
- Açık adres
- Telefon
- E-posta

Google formunda bu bilgiler karşı tarafa iletilebiliyor ve
lumendatabase.org sitesinde yayımlanabiliyor. İş adresi kullanmak ev
adresi yazmaktan daha rahat olur.
