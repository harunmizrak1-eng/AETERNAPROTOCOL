export type EvidenceTier = "proven" | "theoretical" | "preclinical"

export interface Peptide {
  slug: string
  name: string
  category: string
  short: string
  tier: EvidenceTier
  mechanism: string
  primaryOutcomes: string[]
  clinicalStatus: string
  relatedArticleSlug?: string
}

export const tierLabel: Record<EvidenceTier, string> = {
  proven: "Klinik Kanıt",
  theoretical: "Mekanistik / Teorik",
  preclinical: "Preklinik",
}

export const tierColorVar: Record<EvidenceTier, string> = {
  proven: "text-tier-proven",
  theoretical: "text-tier-theoretical",
  preclinical: "text-tier-preclinical",
}

export const tierBorderVar: Record<EvidenceTier, string> = {
  proven: "border-tier-proven/40",
  theoretical: "border-tier-theoretical/40",
  preclinical: "border-tier-preclinical/40",
}

/** Evidence Score — dot indicator: strong / moderate / early. */
export const tierDots: Record<EvidenceTier, string> = {
  proven: "●●●",
  theoretical: "●●○",
  preclinical: "●○○",
}

export const peptides: Peptide[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    category: "Metabolik",
    tier: "proven",
    short:
      "GLP-1, GIP ve glukagon reseptörlerine aynı anda etki eden üçlü agonist. Faz 3 çalışmalarında en yüksek kilo kaybı sonuçlarını veren metabolik molekül.",
    mechanism:
      "GLP-1, GIP ve glukagon reseptörlerine eş zamanlı agonist etki; iştah baskılanması, enerji harcamasında artış ve karaciğer yağlanmasında azalmayı aynı anda hedefler.",
    primaryOutcomes: [
      "Vücut ağırlığında klinik olarak anlamlı azalma",
      "HbA1c ve açlık kan şekerinde iyileşme",
      "Karaciğer yağ oranında azalma",
    ],
    clinicalStatus: "Faz 3 çalışmaları tamamlandı",
    relatedArticleSlug: "retatrutide-nedir",
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    category: "Metabolik",
    tier: "proven",
    short:
      "Amilin reseptör agonisti. Semaglutide ile kombine edildiğinde (CagriSema) tokluk sinyalini güçlendirerek güçlü kilo kaybı sağlar.",
    mechanism:
      "Amilin reseptör agonisti; tokluk sinyalini güçlendirerek gastrik boşalmayı yavaşlatır. Semaglutide ile kombinasyonda (CagriSema) tamamlayıcı bir yol üzerinden çalışır.",
    primaryOutcomes: [
      "İştah kontrolünde artış",
      "Semaglutide ile kombinasyonda güçlenmiş kilo kaybı",
    ],
    clinicalStatus: "Faz 3 çalışmaları sürüyor",
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    category: "Metabolik",
    tier: "proven",
    short:
      "GLP-1 reseptör agonisti. İştahı baskılar, kan şekerini düzenler. Kilo yönetiminde en yaygın klinik veriye sahip moleküllerden.",
    mechanism:
      "GLP-1 reseptör agonisti; iştahı baskılar, gastrik boşalmayı yavaşlatır, pankreas beta hücrelerinden insülin salınımını düzenler.",
    primaryOutcomes: [
      "Kilo kaybı",
      "Glisemik kontrolde iyileşme",
      "Yüksek kardiyovasküler risk taşıyan popülasyonda risk azalması",
    ],
    clinicalStatus: "Onaylı, geniş klinik kullanım",
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    category: "Metabolik",
    tier: "proven",
    short:
      "GLP-1 ve GIP çift agonisti. Semaglutide'den daha güçlü kilo kaybı sonuçlarıyla öne çıkan ikili reseptör molekülü.",
    mechanism:
      "GLP-1 ve GIP reseptörlerine çift agonist etki; iki yolun birlikte uyarılması tek reseptör agonistlerine göre daha güçlü metabolik etki sağlar.",
    primaryOutcomes: [
      "Semaglutide'e kıyasla daha yüksek kilo kaybı oranları",
      "İnsülin duyarlılığında iyileşme",
    ],
    clinicalStatus: "Onaylı, geniş klinik kullanım",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    category: "Estetik / Onarım",
    tier: "proven",
    short:
      "Bakır tripeptid. Kollajen sentezini artırır, cilt yenilenmesini ve yara iyileşmesini destekler. RCT'lerle desteklenmiş kırışıklık ve elastikiyet etkileri.",
    mechanism:
      "Bakır iyonu taşıyan tripeptid; kolajen ve elastin sentezini uyarır, antioksidan ve anti-inflamatuar yollarla doku yenilenmesini destekler.",
    primaryOutcomes: [
      "Cilt elastikiyetinde artış",
      "İnce çizgilerde azalma",
      "Yara iyileşme hızında artış",
    ],
    clinicalStatus:
      "RCT'lerle desteklenmiş, topikal ve enjekte edilebilir formlarda kullanımda",
  },
  {
    slug: "ss-31-elamipretide",
    name: "SS-31 (Elamipretide)",
    category: "Longevity",
    tier: "proven",
    short:
      "Mitokondriyal membran koruyucu tetrapeptid. FDA'nın onayladığı ilk mitokondri ilacı — mitokondriyal işlev bozukluklarında klinik olarak test edildi.",
    mechanism:
      "Mitokondri iç membranında kardiyolipin ile etkileşerek elektron transport zincirinin verimliliğini korur; oksidatif stresi azaltır.",
    primaryOutcomes: [
      "Mitokondriyal fonksiyon belirteçlerinde iyileşme",
      "Hedef popülasyonlarda egzersiz kapasitesinde artış",
    ],
    clinicalStatus:
      "Belirli endikasyonlarda onaylı, diğer kullanım alanlarında klinik çalışmalar sürüyor",
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    category: "Doku Onarımı",
    tier: "theoretical",
    short:
      "Gastrik mukozadan izole pentadekapeptid. Anjiyogenez ve doku onarımını desteklediği düşünülüyor. Mekanizması güçlü, geniş insan çalışması yok.",
    mechanism:
      "Anjiyogenezi (yeni damar oluşumu) ve büyüme faktörü sinyalini desteklediği düşünülüyor; tendon-kemik iyileşmesinde rol oynadığı öne sürülüyor.",
    primaryOutcomes: [
      "Hayvan modellerinde tendon/ligament iyileşme hızında artış",
      "İnsan verisi büyük ölçüde anekdotal düzeyde",
    ],
    clinicalStatus: "Mekanizma güçlü, kontrollü insan çalışması yok",
  },
  {
    slug: "cjc-1295-ipamorelin",
    name: "CJC-1295 + Ipamorelin",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "GHRH ve ghrelin yollarını birlikte uyararak doğal büyüme hormonu salınımını tetikleyen kombinasyon. Mekanizma iyi tanımlı.",
    mechanism:
      "CJC-1295 (GHRH analoğu) ve Ipamorelin (ghrelin reseptör agonisti) birlikte, hipofizden büyüme hormonu salınımını fizyolojik atım paterniyle uyarır.",
    primaryOutcomes: [
      "Büyüme hormonu ve IGF-1 düzeylerinde artış",
      "Toparlanma ve vücut kompozisyonunda öznel iyileşme bildirimleri",
    ],
    clinicalStatus: "Mekanizma iyi tanımlı, uzun dönem RCT verisi sınırlı",
  },
  {
    slug: "nad-nmn",
    name: "NAD+ / NMN",
    category: "Longevity",
    tier: "theoretical",
    short:
      "Hücresel enerji metabolizmasının kofaktörü. NAD+ öncülleri yaşla düşen bu havuzu besler. İnsan verisi umut verici ama sonuçlar karışık.",
    mechanism:
      "NAD+ öncüsü; sirtuin ve PARP enzimlerinin kofaktörü olarak hücresel enerji metabolizması ve DNA onarım yollarını destekler.",
    primaryOutcomes: [
      "Kan NAD+ düzeylerinde artış",
      "İnsan çalışmalarında fonksiyonel sonuçlar karışık",
    ],
    clinicalStatus: "İnsan verisi artıyor, sonuçlar tutarsız",
  },
  {
    slug: "semax",
    name: "Semax",
    category: "Kognitif",
    tier: "theoretical",
    short:
      "ACTH türevi nootropik. BDNF ve dopaminerjik modülasyon yoluyla odak ve zihinsel netlik desteklediği öne sürülüyor. Rusya'da klinik kullanımda.",
    mechanism:
      "ACTH(4-10) türevi; BDNF ekspresyonunu ve dopaminerjik/serotonerjik sinyali modüle ettiği düşünülüyor.",
    primaryOutcomes: [
      "Rusya'daki klinik kullanımda bilişsel toparlanma bildirimleri",
      "Batı literatüründe kontrollü çalışma sınırlı",
    ],
    clinicalStatus: "Rusya'da klinik kullanımda, FDA/EMA onayı yok",
    relatedArticleSlug: "kognitif-protokoller-semax-selank",
  },
  {
    slug: "selank",
    name: "Selank",
    category: "Kognitif",
    tier: "theoretical",
    short:
      "Tuftsin analogu anksiyolitik. Sedasyon ve bağımlılık olmadan sakinleştirici etki tanımlanıyor. Kontrollü klinik veri sınırlı.",
    mechanism:
      "Tuftsin analoğu; anksiyolitik etkiyi sedasyon yapmadan, immün ve nöropeptid sinyalini modüle ederek sağladığı öne sürülüyor.",
    primaryOutcomes: [
      "Anksiyete skorlarında azalma bildirimleri",
      "Sınırlı veride bağımlılık potansiyeli gözlenmedi",
    ],
    clinicalStatus: "Rusya'da klinik kullanımda, kontrollü batı verisi sınırlı",
    relatedArticleSlug: "kognitif-protokoller-semax-selank",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    category: "Doku Onarımı",
    tier: "preclinical",
    short:
      "Thymosin Beta-4 fragmanı. Doku rejenerasyonunu desteklediği düşünülüyor. İnsan verisi neredeyse yok, kanıt büyük ölçüde hayvan çalışmalarına dayalı.",
    mechanism:
      "Thymosin Beta-4'ün aktif fragmanı; aktin bağlanması yoluyla hücre göçünü ve doku rejenerasyonunu desteklediği düşünülüyor.",
    primaryOutcomes: [
      "Hayvan modellerinde doku iyileşme hızında artış",
      "İnsan RCT verisi yok",
    ],
    clinicalStatus: "Preklinik aşama",
    relatedArticleSlug: "doku-onarimi-bpc157-tb500",
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Mitokondriyal DNA kaynaklı peptid. AMPK yolağını aktive ederek egzersiz etkisini taklit ettiği öne sürülüyor. İnsan RCT verisi yok.",
    mechanism:
      "Mitokondriyal DNA kaynaklı mikropeptid; AMPK yolağını aktive ederek egzersizin metabolik etkilerini taklit ettiği öne sürülüyor.",
    primaryOutcomes: [
      "Hayvan modellerinde insülin duyarlılığında artış",
      "İnsan RCT verisi yok",
    ],
    clinicalStatus: "Preklinik aşama",
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Pineal bez kaynaklı tetrapeptid. Telomeraz aktivasyonu ve sirkadiyen ritim etkileri araştırılıyor. Bağımsız modern RCT bulunmuyor.",
    mechanism:
      "Pineal bez kaynaklı tetrapeptid; telomeraz aktivasyonu ve sirkadiyen ritim düzenlenmesi üzerinden etki ettiği öne sürülüyor.",
    primaryOutcomes: [
      "Eski hayvan çalışmalarında ömür uzaması bildirimleri",
      "Bağımsız modern RCT bulunmuyor",
    ],
    clinicalStatus: "Preklinik aşama, bağımsız doğrulama sınırlı",
  },
  {
    slug: "aicar",
    name: "AICAR",
    category: "Performans",
    tier: "preclinical",
    short:
      "AMPK aktivatörü, egzersiz taklit edici. Hayvan çalışmalarında dayanıklılık artışı gösterdi. İnsan performans verisi yok, deneysel seviyede.",
    mechanism:
      "AMPK aktivatörü; egzersiz taklitçisi olarak mitokondriyal biyogenezi ve yağ oksidasyonunu uyardığı düşünülüyor.",
    primaryOutcomes: [
      "Hayvan modellerinde dayanıklılık artışı",
      "İnsan performans verisi yok",
    ],
    clinicalStatus: "Preklinik aşama, sporda yasaklı madde statüsünde",
  },
]

export const getPeptide = (slug: string) =>
  peptides.find((p) => p.slug === slug)

/** Best-effort mapping from a peptide's library category to the closest
 * assessment goal option — left unmapped where there's no clean match. */
export const categoryGoalMap: Partial<Record<string, string>> = {
  Metabolik: "Yağ Kaybı & Metabolizma",
  "Doku Onarımı": "Doku Onarımı & İyileşme",
  Longevity: "Longevity & Hücresel Sağlık",
  Kognitif: "Kognitif & Nörolojik",
  Performans: "Performans & Enerji",
  "Estetik / Onarım": "Anti-Aging & Cilt",
}

export const categories = [
  "Tümü",
  "Metabolik",
  "Doku Onarımı",
  "Longevity",
  "Büyüme / GH",
  "Estetik / Onarım",
  "Kognitif",
  "Performans",
]
