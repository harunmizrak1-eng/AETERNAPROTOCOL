# Instagram gönderi açıklamaları

Slaytlar `scripts/instagram/out/<set>/` klasöründe, numara sırasıyla
yüklenecek.

**Kural:** Bu metinlerde doz, kullanım şekli, süre veya "şunu alın"
yönlendirmesi yok. Ne işe yaradığı anlatılıyor, ne yapılacağı
söylenmiyor. Sitedeki çizgiyle aynı, çünkü Instagram'da başka türlü
konuşup sitede başka türlü konuşmak güveni bitirir.

---

## 1. BPC-157 (`out/bpc157/`, 12 slayt)

Kırılan bir kemik altı haftada iyileşir. Ama aynı kişinin tendon
yırtığı aylarca geçmez. Sebebi damar.

Kemiğin içi damarla doludur, kanla gelen onarım hücreleri yaralı yere
hemen ulaşır. Tendonda ve bağda ise damar çok azdır. Hücreler oraya zor
gider, iyileşme de bu yüzden uzar.

BPC-157 araştırmaları işte burayı hedefliyor.

Midenin salgıladığı sıvıda doğal olarak bulunan bir proteinin küçük bir
parçasıdır, 15 aminoasitten oluşur. İlk kez 1990'larda Zagreb
Üniversitesi'ndeki bir ekip ayırıp inceledi. Peptidlerin çoğu mide
asidine dayanamaz ve parçalanır, bu parçalanmaz.

En çok Aşil tendonu kesikleri, diz iç yan bağı yırtıkları, ezilmiş
kaslar ve mide bağırsak yaraları üzerinde denendi. Kesilen tendonun kaç
günde onarıldığına, bağın kopmadan ne kadar yük taşıdığına ve ezilen
kasın ne kadar düzeldiğine baktılar. Hiçbir şey verilmeyen gruplara göre
daha iyi sonuçlar bildirdiler.

Nasıl işe yaradığına gelince, en çok kabul gören açıklama şu: BPC-157
yaralı bölgede yeni kılcal damarlar oluşmasını tetikliyor, buna
anjiyogenez deniyor. Damarı zaten az olan tendon için tam da eksik olan
şey bu. Ama damar tek başına yetmiyor. Tendonu onaran fibroblast
hücrelerinin de yara yerine gidip oraya tutunması gerekiyor, laboratuvar
çalışmalarında BPC-157'nin bu iki işi de hızlandırdığı görüldü.

BPC-157 ile TB-500 sık sık birlikte anılır ama işleyişleri farklıdır.
BPC-157 damar yapımını öne çıkarır, TB-500 ise hücrelerin hareket
etmesini kolaylaştırır. Yani birbirinin yerine geçen değil, ayrı iki
bileşiktir.

Şunu da yazalım: çalışmaların neredeyse hepsi fare ve sıçanlarda
yapıldı. İnsanlar üzerinde geniş çaplı bir araştırma yok. BPC-157 bu
yüzden ilaç sayılmıyor, araştırma ürünü olarak satılıyor.

Aldığınız ürünün sahte olup olmadığını bize sormadan anlayabilirsiniz.
Kutunun üstündeki gümüş bandı kazıyın, altından çıkan kodu
validation.zphc.com adresine yazın.

Katalog profildeki bağlantıda.

.
.
#zphc #bpc157 #peptid #peptidturkiye #sakatlık #tendon #toparlanma
#zphcturkiye #büyümehormonu

---

## 2. Orijinallik doğrulama (`out/dogrulama/`, 6 slayt)

"Elimdeki ZPHC gerçek mi?" Forumlarda en çok bu soruluyor. Haklı bir
soru, çünkü bilinen markaların taklidi de yapılıyor.

İyi tarafı, bunu anlamak için satıcıya güvenmeniz gerekmiyor.

Her kutuda gümüş renkli bir bant vardır. Kazıdığınızda altından o ürüne
ait bir kod çıkar. Kodu validation.zphc.com adresine yazdığınızda sorgu
bizim sitemizde değil, ZPHC'nin kendi sisteminde yapılır. Yani cevabı
biz vermiyoruz.

Karşınıza üç sonuç çıkabilir. Kod tanınır ve ilk kez soruluyorsa ürün
gerçektir. Hiç tanınmıyorsa ürün ZPHC değildir. Tanınıyor ama daha önce
sorulmuş diyorsa dikkat edin: ya sizden önce biri bakmıştır, ya da kod
kopyalanıp taklit ürünün üstüne basılmıştır.

Kazımadan önce bandın haline de bakın. Bant sizden önce kazınmışsa bu
kötüye işarettir, kodu başkası görmüş demektir.

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
| `evidence` | Kanıt seviyesi, amber renkli |
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
