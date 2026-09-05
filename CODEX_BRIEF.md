# ZPHC Türkiye (zphctr.com) — proje özeti

Bu belge Codex'e (veya başka bir ajana) verilmek üzere yazıldı. Amaç,
projeye hiç bakmamış birinin kısa sürede context kazanmasını sağlamak.

## Repo

- GitHub: `harunmizrak1-eng/AETERNAPROTOCOL`
- Çalışılan branch: `claude/zphcstore-turkey-version-bbejty`
- Canlı deploy branch: `claude/aterna-brand-constitution-m18to3` (buraya
  `git merge --ff-only` ile aktarılıyor)
- Stack: Next.js 16 (App Router, Turbopack), TypeScript strict,
  Tailwind CSS v4, React 19

## Ne satıyoruz

ZPHC (Zhengzhou Pharmaceutical) markasının Türkiye'deki resmi
distribütörüyüz. Peptid ve büyüme hormonu (HGH) satıyoruz, steroid
satmıyoruz. Ürünler liyofilize (dondurularak kurutulmuş) toz halinde
geliyor; bu yüzden kargoda soğuk zincir GEREKMİYOR. Yurtiçi Kargo
anlaşmalı, ertesi gün teslim, kargo ücretsiz. Havale/EFT/kredi kartıyla
ön ödeme, elden teslim yok.

Alıcı kitle Türkiye'deki forumlardan geliyor, en çok sorulan iki şey:
"elimdeki ürün orijinal mi" ve "kaç günde gelir". Fiyat siteye ve
sosyal medyaya YAZILMIYOR — talimat bu, sorulmayacak da.

## Site yapısı

- `app/` — sayfalar: ana sayfa, `urunler` (katalog), `peptidler`
  (bileşik kütüphanesi sayfaları), `dogrulama` (orijinallik doğrulama),
  `kargo`, `iade`, `kosullar`, `hakkimizda`, `sss`, `journal` (blog),
  `metodoloji`, `gizlilik`
- `lib/products.ts` — 43 satılan ürünün kataloğu (slug, fiyat alanı
  boş/"Fiyat sorun", stok durumu, görsel yolu, kategori)
- `lib/peptides.ts` — asıl bilgi kütüphanesi. 48 bileşiğin: kısa tanım
  (`short`), mekanizma (`mechanism`), bildirilen sonuçlar
  (`primaryOutcomes`), kanıt kademesi (`tier`: proven/theoretical/
  preclinical), klinik durum (`clinicalStatus`), beklenen seyir
  (`expectedTimeline`), kalite işaretleri (`qualityIndicators.good`),
  moleküler veri (aminoasit sayısı, dizilim, yarı ömür), doz tabloları
  (`dosing`), uyarılar (`warnings`), yan etkiler (`sideEffects`).
  **Bu dosya sitedeki tek doğruluk kaynağı.** Katalogda olmayan
  bileşikler de burada var (ör. Tesamorelin, SS-31).
- `components/nav.tsx` — statik (fixed DEĞİL) header, kırmızı kayan
  uyarı şeridi, "Resmi Distribütör" rozeti, arama
- `components/product-strip.tsx` — otomatik dönen "Çok satanlar"
  karuseli, `lib/strips.ts`'den besleniyor

## Kurallar (defalarca ihlal edilip düzeltildi, sıkı uygulanmalı)

1. **Doz, kullanım şekli, kür süresi hiçbir yerde paylaşılan içerikte
   (site dışı: Instagram vb.) yazılmaz.** Sitede doz tabloları var ama
   Instagram'da doz paylaşmak hesabı kapattırıyor.
2. **Fiyat hiçbir yerde yazılmaz.**
3. **Kanıt kademesi olduğu gibi yazılır.** "Kanıtlanmış", "garanti"
   yasak. Fiiller: araştırılıyor, bildirildi, gösterildi, düşünülüyor.
4. **Uydurma yorum/müşteri/sayı yok.** `lib/reviews.ts` bilerek boş
   bırakıldı, gerçek yorum gelmeden doldurulmayacak.
5. **Tıbbi tavsiye verilmez, rakip kötülenmez.**
6. **Türkçe kalitesi kritik önem taşıyor** — kullanıcı defalarca "yapay
   zeka gibi" diye geri gönderdi. En sık hatalar: İngilizceden birebir
   çevrilmiş kalıplar ("kanıt henüz o seviyede değil", "ilacın üç
   kolu var" — "kol" Türkçede yok, hormon/mekanizma denir), yanlış özne
   ("kırık kaynar" değil kaynayan kemiktir), emir kipi ("kodu sorun"
   yerine "kod nereye yazılır"), uzun tire kullanımı (yasak). Tüm bu
   kurallar `scripts/instagram/PROMPT.md` içinde örnekli tablo halinde
   yazılı — yeni metin yazmadan önce oku.
7. **Fatura vurgusu:** "Resmi distribütör" güven unsuru olarak öne
   çıkarılır ama abartılı pazarlama dili kullanılmaz.

## Instagram içerik üretim sistemi (şu anki aktif iş)

`scripts/instagram/` klasöründe Playwright ile 1080×1080 karusel
görseli üreten bir sistem var:

- `slides.mjs` — render motoru + `compoundSet()` adında kütüphaneden
  (`lib/peptides.ts`) otomatik set kuran bir fonksiyon. Bu otomatik
  setler `kutuphaneSetleri` altında duruyor ama **basılmıyor**
  (`export const sets = metinSetleri` satırına bak).
- `sets-metin.mjs` — **asıl basılan içerik**, elle yazılmış 12 set:
  bpc157, tb500, retatrutide, ghkcu (retatrutidefaz3, ghkcusac gibi
  varyantları var), biohacking, longevity, tesamorelin, ss31, motsc,
  glutatyon, nadplus, wolverine, cjcipamorelin, peptidnedir.
- Tasarım: üstte ZPHC mavisi (#0072bc) blok, altında beyaz içerik
  alanı, yazı tipi Manrope (`scripts/instagram/fonts/` içinde gömülü,
  internet gerektirmiyor).
- Slayt tipleri: `hook` (kapak), `text`, `stat` (büyük sayı),
  `timeline` (beklenen seyir), `list`, `evidence` (kanıt, amber renk),
  `verify` (doğrulama), `cta` (kapanış).
- `product: "marka"` verilirse kapak görselsiz, ZPHC logolu nötr kart
  basılır — katalogda fotoğrafı olmayan bileşikler için (yanlış ürünün
  kutusunu koymamak amacıyla).
- Çalıştırma: `npm i -D playwright` (proje bağımlılığında yok, bilerek
  eklenmedi), sonra `node scripts/instagram/slides.mjs [set-adı]`.
  Çıktı: `scripts/instagram/out/<set>/01.png...`
- `aciklamalar.md` — her setin Instagram gönderi açıklaması + etiketler
- `PROMPT.md` — başka bir yapay zekaya (veya Codex'e) doğrudan
  kopyalanabilecek, Türkçe yazım kurallarını ve içerik kısıtlarını
  içeren hazır talimat bloğu

### Bekleyen iş

Kullanıcı 12 yeni set metni verdi (kendi yazdığı, aynen basılacak):
BPC-157 (Wolverine açısı), HGH Fragment 176-191, Cagrilintide,
Melanotan-II (üç farklı versiyon gönderildi, en son/en detaylısı
kullanılacak — düzenleyici durum ve FDA kategorisi bilgisi içeren
versiyon), Double Burn Mix, AOD-9604, Mega Mass Mix, GHRP-6, TB-500
(detaylı versiyon, timozin beta-4 farkını vurgulayan), Epithalon,
IGF-1 LR3, Super Slim Mix. Her biri 8 slayt + gönderi açıklaması olarak
geldi, `sets-metin.mjs` formatına uygun şekilde eklenip
`node scripts/instagram/slides.mjs` ile basılması gerekiyor. Ürün
görselleri `public/products/` altında slug'a göre aranmalı; olmayanlar
için `product: "marka"` kullanılmalı.

## Git iş akışı

```
# feature branch üzerinde çalış, typecheck + build sonrası:
git add -A && git commit -m "..." 
git push -u origin claude/zphcstore-turkey-version-bbejty
# canlıya almak için:
git checkout claude/aterna-brand-constitution-m18to3
git merge --ff-only claude/zphcstore-turkey-version-bbejty
git push
```

Commit mesajları "ne" değil "neden" anlatır, kısa ve net. Emoji yok.
