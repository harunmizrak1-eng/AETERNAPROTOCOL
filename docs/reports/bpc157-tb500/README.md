# PEP-2026-01 — BPC-157 ve TB-500 Kanıt Durumu Raporu

Çıktı: [`../BPC-157_TB-500_Kanit_Durumu_Raporu.pdf`](../BPC-157_TB-500_Kanit_Durumu_Raporu.pdf)
(A4, 22 sayfa, 48 referans, veri kesim tarihi 15 Eylül 2026)

## Ne içerir

Doku onarımı peptitlerinin akademik kanıt tabanının, düzenleyici durumunun ve
çevrimiçi kullanıcı topluluklarında bildirilen deneyimlerin karşılaştırmalı
derlemesi. Bölümler: moleküler kimlik, BPC-157 preklinik/klinik dosyası,
timosin β4 ve TB-500 ayrımı, güvenlik, FDA/WADA durumu, topluluk bildirimleri,
kanıt–iddia matrisi.

## Kaynak disiplini

- Akademik kayıtlar **PubMed** üzerinden alınmış; her biri PMID ve DOI ile verilmiştir.
- Klinik çalışmalar **ClinicalTrials.gov API v2** ile doğrudan sorgulanmış;
  NCT numarası, faz, katılımcı sayısı ve sonuç bölümü kayıttan okunmuştur.
- Birincil olmayan kaynaklar (basın, hukuk analizi, sektör derlemesi) kaynakçada
  ayrıca etiketlenmiştir.
- Doz değeri türetilmemiştir. Bölüm 07'de geçen sayısal aralık, kaynağında
  bulunduğu biçimde aktarılmış bir **beyandır**; öneri değildir.

## Yeniden üretme

```bash
python3 build-fonts.py                       # fonts.css üretir (bir kez)
node render.mjs report.html ../BPC-157_TB-500_Kanit_Durumu_Raporu.pdf
```

`render.mjs`, depoda hazır bulunan Chromium'u (`/opt/pw-browsers/...`) CDP
üzerinden sürer ve `Page.printToPDF` ile sayfa numaralı başlık/altbilgi basar.
Chromium yolu farklıysa betiğin başındaki `CHROME` sabitini güncelleyin.

## Bilinen kütüphane düzeltmeleri

Rapor hazırlanırken `lib/peptides.ts` içinde iki hatalı veri saptandı
(raporun Bölüm 2.3'ünde de not edilmiştir); **bu commit'te düzeltilmemiştir**:

| Kayıt | Mevcut değer | Literatürdeki doğru değer |
| --- | --- | --- |
| `bpc-157` → `molecular.sequence` | `GKPPPGKPADDAGLV` | `GEPPPGKPADDAGLV` |
| `tb-500` → `molecular.weight` / `chain` | `4.963,44 Da` / 43 aminoasit | ≈ `889 Da` / 7 aminoasit (Ac-LKKTETQ) |

İkincisi tam uzunluklu timosin β4'e ait değerlerdir; TB-500 olarak satılan
materyal analitik olarak Tβ4'ün 17–23 fragmanıdır (PMID 22962027,
[doi:10.1002/dta.1402](https://doi.org/10.1002/dta.1402)).
