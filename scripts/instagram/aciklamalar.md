# Instagram gönderi açıklamaları

Slaytlar `scripts/instagram/out/<set>/` klasöründe, sırayla yüklenecek.

**Kural:** Bu metinlerde doz, kullanım şekli, süre veya "şunu alın"
yönlendirmesi yok. Etkinlik ifadeleri kanıt düzeyini yansıtan fiillerle
veriliyor. Sitedeki çizgiyle aynı, çünkü Instagram'da farklı konuşup
sitede farklı konuşmak güveni bitirir.

---

## 1. BPC-157 (`out/bpc157/`)

BPC-157, peptid tarafında en çok sorulan bileşiklerden biri.

Mide salgısında doğal olarak bulunan bir proteinden türetilmiş, 15
aminoasitlik küçük bir peptid. Araştırmalar ağırlıklı olarak tendon, bağ
ve kas dokusunun onarımı üzerine yoğunlaşıyor.

Şunu net söyleyelim: mekanizması iyi tanımlı ama geniş ölçekli insan
çalışması henüz yapılmadı. Bunu saklamıyoruz. Sitemizde her bileşiğin
kanıt kademesi açıkça yazıyor, satıyor olmamız o kademeyi değiştirmiyor.

Aldığınız ürünün orijinal olduğundan emin olmak istiyorsanız: kutudaki
gümüş bandı kazıyın, çıkan kodu validation.zphc.com adresine girin.
Cevabı satıcıdan değil, doğrudan üreticiden alırsınız.

Katalog ve bileşik kütüphanesi profildeki bağlantıda.

.
.
#zphc #bpc157 #peptid #peptidturkiye #toparlanma #dokuonarımı
#zphcturkiye #büyümehormonu

---

## 2. Orijinallik doğrulama (`out/dogrulama/`)

"Elimdeki ZPHC gerçek mi?" Forumlarda en çok sorulan soru bu ve haklı bir
soru, çünkü bilinen markaların taklidi de yapılıyor.

İyi haber: ZPHC ürünlerinde bunu satıcıya güvenmeden kontrol edebilirsiniz.

Her kutuda gümüş bir bant var. Kazıdığınızda altından o ürüne özel bir kod
çıkıyor. Kodu validation.zphc.com adresine girdiğinizde sorgu üreticinin
kendi sunucusunda yapılıyor. Yani cevabı biz vermiyoruz, ZPHC veriyor.

Üç sonuç alabilirsiniz. Kod tanınır ve ilk kez sorgulanmışsa ürün
orijinaldir. Kod hiç tanınmıyorsa ZPHC üretimi değildir. Tanınıyor ama
"daha önce sorgulanmış" diyorsa dikkatli olun: ya sizden önce biri kontrol
etmiştir, ya da kod kopyalanıp taklit ürüne basılmıştır.

Kodu kazımadan önce de bakın: bant zaten kazınmışsa bu kötü bir işaret,
kodu sizden önce biri görmüş demektir.

Adım adım anlatım sitede.

.
.
#zphc #orijinallik #sahteürün #peptid #peptidturkiye #zphcturkiye
#validationzphc

---

## Yayın önerisi

Haftada iki gönderi yeterli. Bir ürün anlatımı, bir bilgi/doğrulama
gönderisi şeklinde dönüşümlü gidin.

Yeni set eklemek için `scripts/instagram/slides.mjs` içindeki `sets`
nesnesine yeni bir kayıt yazıp `node scripts/instagram/slides.mjs <ad>`
çalıştırmak yeterli.

**Yapmayın:** Yorumlara fiyat yazmayın, doz sormalarına doz cevabı
vermeyin (WhatsApp'a yönlendirin), rakip kötülemeyin. Instagram bu
kategoride hesap kapatabiliyor; ürünü "araştırma materyali" çerçevesinin
dışında anlatmak riski artırır.

---

## Çalıştırma notu

Üretici Playwright kullanıyor ve bu paket projenin bağımlılıklarında yok
(siteyi çalıştırmak için gerekmiyor, boşuna yüklemiyoruz). Slayt üretmeden
önce bir kez kurun:

```
npm i -D playwright
node scripts/instagram/slides.mjs
```
