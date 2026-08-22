# Instagram gönderi açıklamaları

Slaytlar `scripts/instagram/out/<set>/` klasöründe, numara sırasıyla
yüklenecek.

**Kural:** Bu metinlerde doz, kullanım şekli, süre veya "şunu alın"
yönlendirmesi yok. Ne işe yaradığı anlatılıyor, ne yapılacağı
söylenmiyor. Sitedeki çizgiyle aynı, çünkü Instagram'da başka türlü
konuşup sitede başka türlü konuşmak güveni bitirir.

---

## 1. BPC-157 (`out/bpc157/`, 12 slayt)

Kırık bir kemik altı haftada kaynar. Aynı kişide tendon yaralanması
aylarca sürebilir. Fark dokunun kanlanmasında: kemik yoğun bir damar
ağıyla beslenirken tendon ve bağ dokusunda damarlanma azdır, onarım
hücreleri bölgeye yeterince ulaşamaz.

BPC-157 araştırmaları tam da buraya bakıyor.

Bileşiğin açılımı Body Protection Compound. Mide suyunda doğal olarak
bulunan bir proteinin 15 aminoasitlik parçası, 1990'larda Zagreb
Üniversitesi'nde tanımlandı. Peptidlerin çoğu mide asidinde parçalanır,
bunun ayırt edici özelliği o ortamda bozulmadan kalması.

Araştırmalar en çok Aşil tendonu kesisi, diz iç yan bağı hasarı, kas
ezilmesi ve mide bağırsak mukozası üzerinde yapıldı. Ölçülen şeyler
somut: onarım süresi, bağın kopmadan taşıdığı yük, ezilen kasın
toparlanma derecesi.

Mekanizma tarafında öne çıkan açıklama anjiyogenez, yani yaralı bölgede
yeni kılcal damar oluşumu. BPC-157'nin damar endotel büyüme faktörü
(VEGF) reseptör yolağını harekete geçirdiği bildirildi. İkinci basamak
hücre göçü: tendonu yeniden ören fibroblastların yara yerine ulaşması ve
yüzeye tutunması. Hücre kültürü çalışmalarında bu iki adımda da artış
gözlendi.

Kanıt tarafını olduğu gibi yazalım. Bu sonuçların neredeyse tamamı
kemirgen çalışmalarından geliyor, insanda yapılmış geniş ölçekli çalışma
bulunmuyor. Mekanizma tutarlı görünüyor ama kanıt henüz o seviyede
değil. Onaylı bir ilaç değil, araştırma materyali.

Sporculara ayrı bir not: BPC-157 WADA'nın yasaklı maddeler listesinde.

Elinizdeki ürünün orijinal olup olmadığını bize sormadan kontrol
edebilirsiniz. Kutudaki gümüş bandı kazıyın, altından çıkan kodu
validation.zphc.com adresine girin.

Katalog profildeki bağlantıda.

.
.
#zphc #bpc157 #peptid #peptidturkiye #sakatlık #tendon #toparlanma
#zphcturkiye #büyümehormonu

---

## 2. Orijinallik doğrulama (`out/dogrulama/`, 6 slayt)

"Elimdeki ZPHC gerçek mi?" Forumlarda en çok sorulan soru bu ve haklı
bir soru, çünkü bilinen markaların taklidi de yapılıyor.

ZPHC ürünlerinde bunu satıcıya güvenmek zorunda kalmadan kendiniz
kontrol edebilirsiniz.

Her kutuda gümüş bir bant bulunur. Kazıdığınızda altından o ürüne özel
bir doğrulama kodu çıkar. Kodu validation.zphc.com adresine
girdiğinizde sorgu bizim sitemizde değil, ZPHC'nin kendi sunucusunda
yapılır. Sonucu biz vermiyoruz.

Üç sonuç çıkabilir. Kod tanınır ve ilk kez sorgulanıyorsa ürün
orijinaldir. Hiç tanınmıyorsa ZPHC üretimi değildir. Tanınıyor ama daha
önce sorgulanmış görünüyorsa dikkatli olun: ya sizden önce biri kontrol
etmiştir, ya da kod kopyalanıp taklit ürüne basılmıştır.

Kazımadan önce bandın durumuna da bakın. Bant zaten kazınmışsa bu kötü
bir işarettir, kodu sizden önce biri görmüş demektir.

Adım adım anlatımı sitede bulabilirsiniz.

.
.
#zphc #orijinallik #sahteürün #peptid #peptidturkiye #zphcturkiye
#validationzphc

---

## Yayın önerisi

Haftada iki gönderi yeterli. Biri ürün anlatımı, biri bilgi veya
doğrulama gönderisi olacak şekilde dönüşümlü gidin.

Yeni set eklemek için `scripts/instagram/slides.mjs` içindeki `sets`
nesnesine yeni bir kayıt yazıp `node scripts/instagram/slides.mjs <ad>`
çalıştırın.

Kullanabileceğiniz slayt tipleri:

| Tip | Ne işe yarar |
| --- | --- |
| `hook` | Kapak. Başlık, alt başlık ve ürün görseli |
| `text` | Başlık ve paragraf |
| `stat` | Tek büyük sayı. Karuselin ritmini kırmak için |
| `list` | Maddeli liste, en fazla 4 madde |
| `evidence` | Kanıt uyarısı, amber renkli |
| `warn` | Uyarı, amber renkli |
| `verify` | Orijinallik doğrulama |
| `cta` | Mavi kapanış |

**Yapmayın:** Yorumlara fiyat yazmayın, doz soranlara doz cevabı
vermeyin (WhatsApp'a yönlendirin), rakip kötülemeyin. Instagram bu
kategoride hesap kapatabiliyor, ürünü "araştırma materyali"
çerçevesinin dışında anlatmak riski artırıyor.

---

## Çalıştırma notu

Üretici Playwright kullanıyor, bu paket projenin bağımlılıklarında yok
(siteyi çalıştırmak için gerekmiyor, boşuna yüklemiyoruz). Slayt
üretmeden önce bir kez kurun:

```
npm i -D playwright
node scripts/instagram/slides.mjs
```
