# zphchumaxtr.com — kanıt dosyası

Hazırlanma tarihi: 5 Eylül 2026
Kopya alınan sayfa: https://zphchumaxtr.com/ (ana sayfa)
Ham kopya: `klon-anasayfa-2026-09-05.html` (193.192 bayt)
Metin hali: `klon-metin-2026-09-05.txt`

Bu dosyadaki her satır, iki sayfanın gerçekten indirilip karşılaştırılmasıyla
elde edildi. Tahmin yok.

## 1. Karşı tarafın teknik bilgileri

| Alan | Değer |
|---|---|
| Alan adı tescil tarihi | 26 Ağustos 2026, 12:17 UTC |
| Tescil eden şirket | Nics Telekomunikasyon A.S. (Türkiye) |
| Barındırma | Hostinger (`platform: hostinger`, `panel: hpanel` başlıkları) |
| Önyüz | Cloudflare |
| Sayfanın son değişme tarihi | 31 Ağustos 2026 |
| WhatsApp numarası | +90 531 435 6791 |

Hostinger'ın kendi HTTP başlığını açıkça göndermesi önemli. Şikayetin asıl
muhatabı Hostinger, Cloudflare değil.

## 2. Birebir aynı olan cümleler

Ana sayfadaki 29 cümlenin 12'si bizim sayfamızla harf harf aynı. Değişiklik
yapılmamış, yeniden yazılmamış, kelime bile eklenmemiş.

1. Sayfa başlığı: `ZPHC Türkiye · Resmi Peptid ve İnsan Büyüme Hormonu Distribütörü`
   Ortadaki nokta işareti dahil aynı.
2. `Sahte satıcılara dikkat. Siparişinizi sadece bizim WhatsApp hattımızdan verin.`
3. `Aldığınız her kutunun kodunu validation.zphc.com adresinden doğrulayın.`
4. `ZPHC Türkiye resmi distribütörüyüz. Ürünler doğrudan depomuzdan çıkıyor.`
5. `Zhengzhou Pharmaceutical'ın peptid ve büyüme hormonu ürünlerini Türkiye'ye
   biz getiriyoruz. Siparişiniz doğrudan bizim depomuzdan çıkıyor. Arada başka
   bir satıcı yok.`
6. `Her kutuda gümüş bir bant var. Kazıyınca altından o ürüne özel bir kod
   çıkıyor. Kodu validation.zphc.com adresine girdiğinizde cevabı doğrudan
   üreticiden alıyorsunuz. Yani bize güvenmek zorunda değilsiniz, kendiniz
   bakıyorsunuz.`
7. `Sattığımız 48 bileşiğin her biri için ne işe yaradığını, kanıt seviyesini ve
   varsa yayımlanmış çalışmaları yazdık. Üreticinin kendi iddialarını da ayrı
   bir başlıkta veriyoruz, karıştırmıyoruz.`
8. Alt bilgideki uzun yasal metnin tamamı: `Bu sitedeki ürünler laboratuvar ve
   araştırma materyali olarak sunulur; insan kullanımı için tasarlanmamıştır.
   İçerik yalnızca bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez.
   Hiçbir ifade hastalık teşhis, tedavi veya önleme iddiası taşımaz. Sağlık
   kararlarınız için hekiminize danışın. Paylaştığınız veriler gizli tutulur;
   işleme koşulları için Gizlilik & KVKK metnini inceleyin.`
9. Alt bilgi imzası: `Zhengzhou Pharmaceutical · Resmi Distribütör`

## 3. En güçlü delil: 48 sayısı

`components/why-zphc.tsx` dosyasının 18. satırı şöyle yazılmış:

```
line: `Sattığımız ${peptides.length} bileşiğin her biri için ne işe yaradığını...`
```

Buradaki `48` yazılı bir sayı değil. `lib/peptides.ts` dosyasındaki bileşik
listesinin uzunluğundan site derlenirken hesaplanıyor. Klon sayfada da `48`
yazıyor.

Bunun tek açıklaması, bizim yayımlanmış sayfamızın çıktısının olduğu gibi
alınmasıdır. Aynı cümleyi bağımsız yazan biri o sayıyı bilemez.

## 4. Menü ve alt bilgi yapısı

Üst menü aynı sırada: Ürünler, Kütüphane, Doğrulama, Journal, Metodoloji.
"Kütüphane" ve "Metodoloji" bu sektörde standart başlıklar değil, bize ait
adlandırmalar.

Alt bilgi de aynı sırada: Keşfet / Ürünler, Kütüphane, Journal, Hakkımızda,
İletişim, Doğrulama, Kargo & Teslimat, İade & Değişim, WhatsApp / Yasal /
Metodoloji, Sıkça sorulanlar, Kullanım Koşulları, Gizlilik & KVKK.

## 5. Ürün adları

Katalogdaki 43 ürünün adları bizim yazdığımız biçimde alınmış:

- `Reta ZPHC 60 mg (5 flakon × 12 mg)`
- `GHK-Cu 60mg Kit ZPHC (Liyofilize Peptid + Bakteriyostatik Su)`
- `Ultra Rehab Mix ZPHC 50 mg (BPC-157 5 mg + TB-500 5 mg) 5 flakon × 10 mg`
- `Wellness Mix ZPHC 25 mg (Ipamorelin 2.5 mg + CJC-1295 2.5 mg) 5 flakon × 5 mg`
- `ZPTROP 144 IU Kit ZPHC (2×72 IU Çift Hazneli Kartuş)`

Parantez kullanımı, çarpı işareti (`×`, normal x değil), miligram yazımı,
karışım adlarının içeriğini parantezde açma biçimi. Hepsi aynı.

Klon sayfada da `Tümü (43)` yazıyor. Bizim katalogda o tarihte 43 ürün vardı.

## 6. Bizim metinlerin tarihleri

Git deposundaki kayıtlar (`harunmizrak1-eng/AETERNAPROTOCOL`):

| Metin | İlk yazıldığı commit | Tarih |
|---|---|---|
| Alt bilgi yasal metni | `c02d36031be2ce5b1ab6bcbd5363f8b996ae77ba` | 16 Ağustos 2026 |
| "Neden ZPHC Türkiye" bölümü | `a596a22471171bfe8653ea7bbcf2793e86b8ba5c` | 16 Ağustos 2026 |
| Kırmızı uyarı şeridi | `d7e2b6af70d6d94a629b7a123c35a5f404edaad6` | 21 Ağustos 2026 |
| "Kazıyınca altından" paragrafı | `c6203ad82363b255353b0c9d18c7080fe579b5fc` | 21 Ağustos 2026 |
| Üst menü ve site iskeleti | `46320887e8030053dc393a24a361a4794874a44b` | 8 Temmuz 2026 |

En yeni metin 21 Ağustos'ta yazıldı. Karşı taraf alan adını 26 Ağustos'ta
aldı. Yani kopyalanan her cümle, o alan adı var olmadan önce bizde yazılıydı.

## 7. Şikayette yazılmaması gerekenler

Önceki taslakta iki riskli nokta vardı, çıkarıldı:

- Klon sayfada ürün fiyatı yok. "Fiyatlarımızı da kopyaladılar" denemez.
- Klon sayfada müşteri yorumu yok. O iddia da kurulamaz.

Yeminli beyan içeren bir başvuruda görülmemiş şey yazmak, başvurunun tamamını
geçersiz kılar. Bu dosyadaki her madde indirilmiş sayfada gerçekten var.
