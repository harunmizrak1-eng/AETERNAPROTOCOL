# ZPHC TÜRKİYE — PROJE ANAYASASI

> Bu doküman, önceki ÆTERNA marka anayasasının yerine geçer. Proje bir
> longevity danışmanlığı sitesinden ZPHC (Zhengzhou Pharmaceutical) Türkiye
> distribütör kataloğuna dönüştürülmüştür. Bu dosyadaki kurallar, kod
> tabanına dokunan her insan ve her yapay zekâ ajanı için bağlayıcıdır.

---

## PROJE NEDİR

ZPHC'nin **peptid ve insan büyüme hormonu** hattının Türkiye distribütör
kataloğu. Ürün bilgisi, orijinallik doğrulaması, bayilik başvurusu ve
literatür referanslı bir bileşik kütüphanesi sunar.

**Klinik değildir. Danışmanlık değildir. Eczane değildir.**

---

## KAPSAM SINIRI — DEĞİŞTİRİLEMEZ

Katalog **yalnızca peptid ve HGH hattını** içerir.

ZPHC'nin steroid hattı — testosteron esterleri, trenbolon, nandrolon,
stanozolol, oksimetolon, metandienon, klenbuterol, oral steroidler, steroid
karışımları — **bu projenin dışındadır ve eklenmez.**

Bunlar Türkiye'de kontrole tabi maddelerdir; TİTCK ruhsatı bulunmayan bu
ürünler için Türkçe bir perakende vitrini kurmak, işletmeciyi doğrudan
hukuki riske sokar. Kapsamı genişletme talebi gelirse: talebi uygulamadan
önce bu bölümü gerekçe göstererek itiraz et.

---

## ÜÇ TEMEL KURAL

### 1. Doz değeri türetilmez

mg, IU, flakon sayısı, konsantrasyon, saklama sıcaklığı — hepsi kaynaktan
olduğu gibi taşınır. Hiçbiri tahmin edilmez, hesaplanmaz, "muhtemelen
böyledir" diye doldurulmaz.

Bir ürün sayfasındaki yanlış doz değeri doğrudan hasta güvenliği sorunudur.
Verisi olmayan alan boş bırakılır; sayfa boş alanı hiç render etmez.

### 2. Üretici beyanı, doğrulanmış veriden ayrı gösterilir

Üreticinin pazarlama metni ile sitenin kendi kanıt sınıflandırması
çelişebilir — ve çelişiyor. Örnek: ZPHC'nin BPC-157 açıklaması "hızlı doku
onarımı" der; kütüphanedeki kaydımız aynı bileşiği **Teorik** kademede
tutar, çünkü insan çalışması yoktur.

Çözüm ikisini de göstermek, ama karıştırmamaktır:

- **Ürün Bilgisi** → doğrulanabilir teknik veri (`kind: "spec"`)
- **Üretici Beyanı** → etkinlik, doz, yan etki iddiaları (`kind: "claim"`),
  ayrı blokta, doğrulanmamış olduğu açıkça belirtilerek

Sınıflandırılamayan etiket varsayılan olarak **beyan** sayılır. Bilinmeyen
bir ifadeyi teknik veri gibi sunmaktansa beyan olarak işaretlemek güvenli
taraftır.

### 3. Kanıt sınıflandırması ticaretten etkilenmez

Sattığımız bir bileşiğin kanıt kademesi, satış hacmi yüzünden yükseltilmez.
Preklinik bir bileşik, ne kadar çok satarsa satsın preklinik kalır. Çıkar
çatışması `/metodoloji` sayfasında açıkça beyan edilmiştir; oradan
kaldırılmaz.

Referanslar gerçektir. PMID, DOI ve NCT numaraları alınmadan önce
doğrulanır. Doğrulanabilir kaynağı olmayan bileşiğe referans uydurulmaz —
daha alt bir kanıt kademesinde tutulur.

---

## VERİ AKIŞI

`lib/products.ts` **elle düzenlenmez.** zphcstore.com WooCommerce Store
API'sinden `scripts/gen-products.py` ile üretilir. Katalog güncellemesi =
veriyi yeniden çek + script'i çalıştır. Ayrıntı: `scripts/README.md`.

Çeviriler `scripts/translations.json`'da tutulur; sözlükte karşılığı olmayan
metin sessizce siteye sızmaz, üreteç tarafından raporlanır.

Ürün kayıtları `peptideSlug` ile `lib/peptides.ts`'teki bileşik kaydına
bağlanır. Ürün sayfası mekanizmayı, kanıt seviyesini ve literatür
referanslarını oradan çeker. **Bu, projenin ayırt edici özelliğidir** —
rakip bayilerde pazarlama metni vardır, burada PubMed referansı vardır.
Ticari veri ile bilimsel veri ayrı dosyalarda kalır.

---

## GÖRSEL KİMLİK

ZPHC kurumsal mavi/beyaz. Renkler `app/globals.css` içinde token olarak
tanımlıdır; bileşenlerde sabit renk yazılmaz.

- Birincil: `#0072bc` · Koyu: `#014673` · Derin: `#00314c`
- Zemin beyaz, metin `#0d1b2a`
- Logo: `public/brand/zphc-logo.png`

`--gold` değişkeni **adıyla** korunmuştur; kod tabanında ~200 yerde vurgu
rengi olarak kullanılır ve adını değiştirmek geniş, riskli bir diff üretir.
Değeri artık ZPHC mavisidir. Yeni kodda da `text-gold` / `bg-gold` kullan.

Tipografi editoryal kalır: başlıklarda serif, gövdede sans. Bu, sıradan bir
e-ticaret şablonundan ayrışmayı sağlar; korunur.

Kaçınılacaklar: agresif pazarlama, sahte kıtlık, geri sayım, çıkış pop-up'ı,
gamification. Bir ilaç üreticisinin distribütörü sakin ve kurumsal durur.

---

## SİPARİŞ AKIŞI

Site üzerinde tamamlanan bir sipariş akışı **yoktur**. Sepet, ödeme,
checkout eklenmez.

Fiyat alanı şemada vardır ama boştur; yerini WhatsApp bilgi-talebi butonu
tutar. Ön dolgulu mesaj her zaman ürün adını taşır. Numara tek kaynaktan
gelir: `lib/contact.ts`.

Buton metni **soru** kipindedir ("Fiyat Sor", "WhatsApp'tan Sor") — asla
satın alma emri kipinde değil.

---

## YASAL ÇERÇEVE

Kaynak, ürünleri laboratuvar/araştırma materyali olarak sunar ("for research
use only; not intended for human use"). Bu çerçeve Türkçe sitede birebir
korunur — yumuşatılmaz, kaldırılmaz, atlanmaz.

Ürün sayfalarında ve footer'da bulunan bilgilendirme notu kaldırılmaz.
Hiçbir metin hastalık teşhis, tedavi veya önleme iddiası taşımaz.

---

## DEĞİŞİKLİK ÖLÇÜTÜ

Her değişiklik şunlardan en az birini artırmalıdır: **netlik, güven,
doğrulanabilirlik.** Yalnızca "daha modern" görünmek için yapılan değişiklik
yapılmaz.
