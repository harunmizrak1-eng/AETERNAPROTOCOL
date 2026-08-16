# Katalog üreteci

`lib/products.ts` elle düzenlenmez. Kaynak zphcstore.com'un WooCommerce
Store API'sidir; dosya bu script ile üretilir.

## Katalogu yenileme

```bash
# 1. Kategori ve ürün verisini çek (kapsam: peptid + HGH)
curl -s "https://zphcstore.com/wp-json/wc/store/v1/products/categories?per_page=100" -o cats.json
for id in 523 15 561 557 558 522; do
  curl -s "https://zphcstore.com/wp-json/wc/store/v1/products?category=$id&per_page=100" -o "prod_$id.json"
done

# 2. lib/products.ts'i üret (JSON dosyalarının olduğu dizinden çalıştır)
python3 /yol/scripts/gen-products.py
```

Kategori kimlikleri: 523 Peptides · 15 HGH · 561 Anti-Aging/Longevity ·
557 Reta · 558 Semaglutide · 522 HCG.

## Çeviri

`translations.json` kaynak metni Türkçesine eşler. Anahtarlar normalize
edilir (NFKC, tire ve boşluk varyantları sadeleşir), böylece kaynaktaki
farklı tire/boşluk kullanımları tek girdiyle karşılanır.

Katalogda yeni bir metin çıkarsa üreteç onu çevirmez — kaynağı olduğu gibi
bırakır ve `missing-translations.json` dosyasına yazıp sayısını raporlar.
Çevrilmemiş metin sessizce siteye sızmaz; listeyi `translations.json`'a
işleyip üreteci yeniden çalıştırın.

## İki kural

**Doz değeri türetilmez.** mg, IU, flakon sayısı, saklama sıcaklığı —
hepsi kaynaktan olduğu gibi taşınır. Ürün sayfasındaki yanlış bir doz
doğrudan güvenlik sorunudur.

**Etkinlik iddiası teknik veriden ayrılır.** `SPEC_LABELS` listesindeki
etiketler teknik veri (`kind: "spec"`) sayılır ve Ürün Bilgisi tablosunda
görünür. Geri kalan her şey üretici beyanıdır (`kind: "claim"`) ve sayfada
"Üretici Beyanı" bloğunda, doğrulanmamış olduğu belirtilerek gösterilir.
Listede olmayan etiket varsayılan olarak beyan sayılır — bilinmeyen bir
ifadeyi teknik veri gibi sunmaktansa beyan olarak işaretlemek güvenli
taraftır.
