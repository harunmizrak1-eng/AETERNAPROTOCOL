# Klonlamayı zorlaştırma ve kanıt bırakma

Bu belge zphctr.com'un kopyalanmasına karşı alınan önlemleri ve panelden
elle yapılması gerekenleri toplar.

## Önce dürüst çerçeve

Herkese açık bir web sayfasının HTML'i tarayıcıya gönderilir; gönderilen
şey kopyalanabilir. Hiçbir önlem kararlı birini tamamen durdurmaz. Yapılan
iş, kopyalamayı bir tıklık olmaktan çıkarıp emek isteyen bir işe
dönüştürmek ve kopyalandığında bunu ispatlayacak izleri bırakmaktır.

zphchumaxtr.com örneğinde kopyalayan, sayfaları tek seferde indirip
oldukları gibi yayımlamıştı; bu yüzden klon 31 Ağustos'ta donmuş durumda
ve o günden sonraki hiçbir içeriğimiz onda yok. Bu tip düşük çabalı
kopyalama, aşağıdaki önlemlerin engellediği şeydir.

## 1. Cloudflare (asıl engelleme katmanı, panelden yapılır)

Alan adı zaten Cloudflare üzerinden geçiyor. Ücretsiz planda kullanılabilen
ayarlar, etki sırasına göre:

### 1.1 Bot Fight Mode

`Security → Bots → Bot Fight Mode` → açık.

Otomatik trafiği tanıyıp zorlar. Doğrulanmış arama motoru robotları
(Googlebot, Bingbot) bu kuralın dışındadır, sıralamayı etkilemez.

### 1.2 Yapay zekâ kazıyıcılarını engelle

`Security → Bots → Block AI Scrapers and Crawlers` → açık.

Tek düğme. Sitedeki `robots.txt` bunların çoğuna zaten "girme" diyor ama
robots.txt bir kilit değil rica; bu düğme gerçekten engeller.

### 1.3 WAF kuralı: site indirme araçları

`Security → WAF → Custom rules → Create rule`
Ad: `Site indirme araclari`, İşlem: `Block`

İfade (Expression Editor'a yapıştırın):

```
(lower(http.user_agent) contains "httrack")
or (lower(http.user_agent) contains "webcopy")
or (lower(http.user_agent) contains "cyotek")
or (lower(http.user_agent) contains "sitesucker")
or (lower(http.user_agent) contains "teleport")
or (lower(http.user_agent) contains "offline explorer")
or (lower(http.user_agent) contains "webzip")
or (lower(http.user_agent) contains "webreaper")
or (lower(http.user_agent) contains "webstripper")
or (lower(http.user_agent) contains "blackwidow")
or (lower(http.user_agent) contains "grab-a-site")
or (lower(http.user_agent) contains "wget")
or (http.user_agent eq "")
```

Aynı liste sitede de var (`proxy.ts`), ama orada istek zaten sunucuya
ulaşmış oluyor. Cloudflare'de engellemek isteği kapıda keser.

### 1.4 WAF kuralı: sunucu merkezi trafiği

`Security → WAF → Custom rules` → İşlem: `Managed Challenge`

Kural oluşturucuda alan olarak `AS Num` seçip aşağıdaki numaraları girin
(büyük bulut sağlayıcıları: AWS, Google Cloud, Azure, DigitalOcean,
Hetzner, OVH, Linode):

```
16509, 14618, 15169, 396982, 8075, 14061, 24940, 16276, 63949, 20473
```

Ek koşul: `AND` `Verified Bot` `equals` `Off`.

Gerçek müşteri telefondan veya evden girer, veri merkezinden değil.
Kazıyıcıların çoğu bir sunucuda çalışır. Bu kural onları bir doğrulama
ekranına düşürür, gerçek ziyaretçiyi etkilemez.

### 1.5 Hız sınırı

`Security → WAF → Rate limiting rules` (ücretsiz planda bir kural hakkı)

- Eşleşme: `URI Path` `does not contain` `/_next/`
- Sayaç: aynı IP'den **10 saniyede 40 istek**
- İşlem: `Managed Challenge`, süre 10 dakika

Normal bir ziyaretçi bu hıza çıkmaz. Siteyi baştan sona indiren bir araç
ilk saniyede çıkar.

### 1.6 Hotlink koruması

`Scrape Shield → Hotlink Protection` → açık.

Kopyalayan, ürün görsellerini bizim sunucumuzdan çekerek kendi sitesinde
gösteremez. Görselleri kendi sunucusuna indirmek zorunda kalır, bu da
kopyalamayı yavaşlatır ve maliyetini artırır.

### 1.7 Bekleyen ayar

`Network → HTTP/3 (QUIC)` → kapalı. Bu güvenlikle ilgili değil; bazı
Türkiye operatörlerinde `ERR_QUIC_PROTOCOL_ERROR` hatasına yol açıyor.

## 2. Sitenin içinde (kodda yapıldı, ek iş yok)

| Önlem | Dosya | Ne yapıyor |
| --- | --- | --- |
| Köken uyarısı | `components/origin-guard.tsx` | Sayfa zphctr.com dışında açıldığında kırmızı "yetkisiz kopya" şeridi gösterir ve resmî adrese bağlantı verir. Satır içi yazıldı: JS paketi kopyalanmasa bile çalışır. |
| İndirme aracı engeli | `proxy.ts` | Bilinen site indirme programlarına 403 döner. |
| Toplu toplayıcı robotlar | `app/robots.ts` | Eğitim amaçlı kazıyıcılara kapalı; ziyaretçi gönderen yapay zekâ arama robotları açık bırakıldı. |
| Görünmez köken izi | `app/layout.tsx` | Her sayfanın başlığında `x-content-origin` ve `x-content-owner` etiketleri. Sayfada görünmez, kopyalayan aracın kopyaladığı kaynakta durur. |
| Köken kaydı | `/.well-known/zphctr-origin` | Sitenin kendi yayın kaydı. |
| Kopya alan adı engeli | `proxy.ts` | Referer başlığı bilinen bir kopya alan adını gösteriyorsa istek 403 döner. Kopya site bizim sunucumuzdan görsel veya sayfa çekemez. Yeni kopya bulununca alan adı `CLONE_HOSTS` listesine eklenir. |
| Tarih damgası | `lib/content-dates.ts` | Sayfalardaki `dateModified` ile site haritasındaki `lastModified` tek kaynaktan okur, ayrışmaz. |

Köken uyarısı, altı saniyelik bir geri sayımdan sonra ziyaretçiyi resmî
siteye yönlendirir. Sessiz değil: ne olduğu yazıyor ve "Bu sayfada kal"
düğmesiyle iptal edilebiliyor. Geri sayımı kaldırıp yalnızca uyarıya
dönmek ya da süreyi değiştirmek `components/origin-guard.tsx` içindeki
`REDIRECT_SECONDS` ile yapılır.

## 3. Kopyayı işe yaramaz kılan şey

Teknik engelden daha etkilisi, kopyalanan şeyin eskimesi:

- **Etkileşimli araçlar kopyalanamaz.** Doz hesaplayıcı çalışması için JS
  paketi ister; statik kazımada o paket gelmez, araç ölü bir ekran olur.
- **Sık değişen içerik.** Klon donmuş durumda. Her yeni sayfa, her
  güncellenen katalog aradaki farkı açar.
- **Katalogdan türeyen içerik.** Ürün SSS'leri ve flakon boyları canlı
  veriden üretiliyor; kopyalanan sürüm ilk katalog değişiminde yanlış
  bilgi göstermeye başlar.

## 4. Yeni bir kopya nasıl fark edilir

1. **Google araması**: sitedeki özgün bir cümleyi tırnak içinde aratın ve
   sonuna `-site:zphctr.com` ekleyin. Çıkan her sonuç bir kopya adayıdır.
2. **Görünmez iz**: şüphelenilen sitede sayfa kaynağını açıp
   `x-content-origin` arayın. Duruyorsa kopya kesindir.
3. **Google Alerts**: aynı özgün cümle için uyarı kurun, yeni kopya
   çıktığında haber gelir.
4. **Cloudflare Analytics**: tek bir IP'den ani ve yoğun sayfa isteği,
   kopyalama girişiminin canlı işaretidir.

## 5. Kopya bulunduğunda

`legal/zphchumaxtr/` klasöründeki hazır metinler kullanılır:

- `KANIT.md` — eşleşme oranları ve teknik kanıt
- `SIKAYET-METINLERI.md` — Hostinger, Google ve Cloudflare şikâyet metinleri
- `TARAYICI-PROMPT.md` — formları dolduracak tarayıcı yönergesi

Sıra: önce barındırıcıya DMCA, sonra Google kaldırma talebi, sonra alan
adı sağlayıcısına bildirim.

## 6. Sık önerilen ama bu kurulumda işe yaramayanlar

- **.htaccess veya nginx.conf ile hotlink engeli**: site Vercel üzerinde
  çalışıyor, Apache ya da Nginx yapılandırma dosyası yok. Aynı iş
  `proxy.ts` içindeki Referer denetimiyle yapıldı.
- **Açılış kartı adresini değiştirmek (`?v=2`)**: `/opengraph-image`
  adresindeki karma değeri sorgu dizesidir ve Next onu yok sayar. Eski
  bağlantı 404 vermez, aynı görseli döndürür. Denendi ve doğrulandı.
- **Açılış kartını kopyaya kapatmak**: sosyal medya önizleme robotları
  Referer göndermez, bu yüzden hiçbir hotlink kuralı onları
  ayıramaz. Zaten kapatmak istemeyiz: kart beyaz zeminde büyük mavi
  harflerle **zphctr.com** yazıyor. Kopyanın linki WhatsApp'ta
  paylaşıldığında bizim adımızı gösteriyor, yani onların paylaşımı bize
  reklam oluyor. Kırmak bu avantajı yok eder.
- **Ziyaretçiyi sunucu tarafında yönlendirmek**: kopya sitenin
  ziyaretçileri bizim sunucumuza hiç uğramaz, `proxy.ts` onları hiç
  görmez. Yönlendirmenin tek yolu kopyalanan HTML'in içinde giden satır
  içi script'tir; o da yapıldı.

## 7. Uğraşmaya değmeyenler

- **Sağ tık engelleme, metin seçimini kapatma**: kopyalayanı durdurmaz,
  gerçek ziyaretçiyi rahatsız eder ve erişilebilirliği bozar.
- **Görselleri filigranla kaplamak**: ürün fotoğrafları üreticinin stok
  görselleri, bizim eserimiz değil. Filigran hem hukuken dayanaksız hem
  satışı düşürür.
- **İçeriği JS ile gizlemek**: Google'ın da göremediği içerik sıralamaz.
  Kaybı kazancından büyük.
