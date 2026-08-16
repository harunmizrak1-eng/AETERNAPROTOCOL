# ZPHC Türkiye — Distribütör Kataloğu

ZPHC (Zhengzhou Pharmaceutical) peptid ve insan büyüme hormonu hattının
Türkiye ürün kataloğu.

- **Next.js 15** (App Router) · **TypeScript** (strict) · **Tailwind CSS v4**
- Türkçe içerik, 75 ürün, 8 kategori
- Tamamen statik: 83 sayfa build sırasında prerender edilir

## Kurulum

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # üretim derlemesi
npm run typecheck  # tsc --noEmit
```

## Sayfalar

| Yol | İçerik |
| --- | --- |
| `/` | Ana sayfa, kategori girişleri, öne çıkan ürünler |
| `/urunler` | Kategori kategori tam katalog |
| `/urunler/[slug]` | Ürün detayı, bileşik bilgisi ve literatür |
| `/dogrulama` | Scratch kod / seri no orijinallik sorgulama adımları |
| `/bayilik` | Bayilik ve yetkili alıcı başvuru formu |
| `/iletisim` | İletişim |

## Veri kaynağı ve güvenlik kuralı

`lib/products.ts` **üretilmiş bir dosyadır**. Veriler zphcstore.com ürün
sayfalarının JSON-LD yapısal verisinden ve resmi ürün açıklamalarından
alınmıştır.

Teknik alanlar için tek bir kural geçerlidir: **hiçbir değer hesaplanmaz,
birim dönüştürülmez, yuvarlanmaz veya tahmin edilmez.** Bir flakonun kaç mg
taşıdığı yalnızca resmi kaynakta yazdığı gibi aktarılır.

Doğrulama iki bağımsız kaynak üzerinden yapılır — ürün başlığı ve resmi ürün
açıklaması ayrı ayrı ayrıştırılır, sonra karşılaştırılır:

- İkisi aynı değeri veriyorsa alan doldurulur.
- İkisi **çelişiyorsa o alan hiç doldurulmaz** ve ürün sayfası o satırı
  render etmez. Eksik doz güvenlidir, yanlış doz değildir.

Bu kural halihazırda bir üretici veri hatası yakalamıştır:
`ZPtrop HGH ZPHC — 160 IU` ürününde başlık "16 flakon × 10 IU", resmi
açıklama ise "10 flakon × 16 IU" diyor. Hangisinin doğru olduğu
belirlenemediği için ürün sayfasında yalnızca üzerinde uzlaşılan toplam
(160 IU) gösterilir; flakon başına miktar ve flakon adedi gösterilmez.

Etkin madde içermeyen cihazlar (enjeksiyon kalemi) `isDevice` ile
işaretlenir ve hiçbir doz alanı taşımaz.

### Fiyat

Fiyat alanı şemada bilinçli olarak yoktur. Sipariş site üzerinde
tamamlanmaz; her ürün sayfasındaki WhatsApp butonu ürün adını taşıyan ön
dolgulu bir bilgi-talebi mesajı açar.

## Bileşik ansiklopedisi bağlantısı

Rakip bayilerde olmayan fark: ürün sayfası pazarlama metniyle yetinmez,
bileşiğin mekanizmasını ve **PubMed doğrulamalı literatür referanslarını**
(PMID / DOI / NCT) da gösterir.

- `lib/peptides.ts` — 47 bileşik: mekanizma, kanıt seviyesi, dozaj, yan
  etkiler, etkileşimler, moleküler veri
- `lib/citations.ts` — PubMed'den alınmış gerçek referanslar

Bağlantı `Product.peptideSlug` alanı üzerinden kurulur. Karma ürünlerde
(`Ultra Rehab Mix`, `Wellness Mix` gibi) her bileşen `componentSlugs` ile
ayrı ayrı bağlanır. Ansiklopedide karşılığı olmayan bileşikler (Melanotan-2,
LL-37, HGH Fragment 176-191) yalnızca resmi ürün verisiyle gösterilir.

## Yapılandırma

Tüm iletişim kanalları `lib/site.ts` içindedir; WhatsApp numarası tek bir
yerden gelir ve hiçbir bileşenin içine gömülü değildir.

`verifyUrl` bilinçli olarak `null` bırakılmıştır: zphcstore.com üzerinde
resmi scratch kod sorgulama adresine ait bir bağlantı yayımlanmıyor ve
tahmini bir adres kullanıcıyı sahte bir doğrulama sayfasına yönlendirme
riski taşır. Resmi adres öğrenildiğinde bu alana yazılması yeterlidir;
`/dogrulama` sayfası bağlantıyı otomatik olarak göstermeye başlar.

## Görseller

Ürün görselleri `public/urunler/<slug>/` altına indirilmiştir (228 görsel).
Site hiçbir üçüncü taraf host'a istek yapmaz.
