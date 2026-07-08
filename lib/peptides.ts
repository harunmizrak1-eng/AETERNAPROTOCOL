export type EvidenceTier = "proven" | "theoretical" | "preclinical"

export interface Peptide {
  name: string
  category: string
  short: string
  tier: EvidenceTier
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
    name: "Retatrutide",
    category: "Metabolik",
    tier: "proven",
    short:
      "GLP-1, GIP ve glukagon reseptörlerine aynı anda etki eden üçlü agonist. Faz 3 çalışmalarında en yüksek kilo kaybı sonuçlarını veren metabolik molekül.",
  },
  {
    name: "Cagrilintide",
    category: "Metabolik",
    tier: "proven",
    short:
      "Amilin reseptör agonisti. Semaglutide ile kombine edildiğinde (CagriSema) tokluk sinyalini güçlendirerek güçlü kilo kaybı sağlar.",
  },
  {
    name: "Semaglutide",
    category: "Metabolik",
    tier: "proven",
    short:
      "GLP-1 reseptör agonisti. İştahı baskılar, kan şekerini düzenler. Kilo yönetiminde en yaygın klinik veriye sahip moleküllerden.",
  },
  {
    name: "Tirzepatide",
    category: "Metabolik",
    tier: "proven",
    short:
      "GLP-1 ve GIP çift agonisti. Semaglutide'den daha güçlü kilo kaybı sonuçlarıyla öne çıkan ikili reseptör molekülü.",
  },
  {
    name: "GHK-Cu",
    category: "Estetik / Onarım",
    tier: "proven",
    short:
      "Bakır tripeptid. Kollajen sentezini artırır, cilt yenilenmesini ve yara iyileşmesini destekler. RCT'lerle desteklenmiş kırışıklık ve elastikiyet etkileri.",
  },
  {
    name: "SS-31 (Elamipretide)",
    category: "Longevity",
    tier: "proven",
    short:
      "Mitokondriyal membran koruyucu tetrapeptid. FDA'nın onayladığı ilk mitokondri ilacı — mitokondriyal işlev bozukluklarında klinik olarak test edildi.",
  },
  {
    name: "BPC-157",
    category: "Doku Onarımı",
    tier: "theoretical",
    short:
      "Gastrik mukozadan izole pentadekapeptid. Anjiyogenez ve doku onarımını desteklediği düşünülüyor. Mekanizması güçlü, geniş insan çalışması yok.",
  },
  {
    name: "CJC-1295 + Ipamorelin",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "GHRH ve ghrelin yollarını birlikte uyararak doğal büyüme hormonu salınımını tetikleyen kombinasyon. Mekanizma iyi tanımlı.",
  },
  {
    name: "NAD+ / NMN",
    category: "Longevity",
    tier: "theoretical",
    short:
      "Hücresel enerji metabolizmasının kofaktörü. NAD+ öncülleri yaşla düşen bu havuzu besler. İnsan verisi umut verici ama sonuçlar karışık.",
  },
  {
    name: "Semax",
    category: "Kognitif",
    tier: "theoretical",
    short:
      "ACTH türevi nootropik. BDNF ve dopaminerjik modülasyon yoluyla odak ve zihinsel netlik desteklediği öne sürülüyor. Rusya'da klinik kullanımda.",
  },
  {
    name: "Selank",
    category: "Kognitif",
    tier: "theoretical",
    short:
      "Tuftsin analogu anksiyolitik. Sedasyon ve bağımlılık olmadan sakinleştirici etki tanımlanıyor. Kontrollü klinik veri sınırlı.",
  },
  {
    name: "TB-500",
    category: "Doku Onarımı",
    tier: "preclinical",
    short:
      "Thymosin Beta-4 fragmanı. Doku rejenerasyonunu desteklediği düşünülüyor. İnsan verisi neredeyse yok, kanıt büyük ölçüde hayvan çalışmalarına dayalı.",
  },
  {
    name: "MOTS-c",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Mitokondriyal DNA kaynaklı peptid. AMPK yolağını aktive ederek egzersiz etkisini taklit ettiği öne sürülüyor. İnsan RCT verisi yok.",
  },
  {
    name: "Epithalon",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Pineal bez kaynaklı tetrapeptid. Telomeraz aktivasyonu ve sirkadiyen ritim etkileri araştırılıyor. Bağımsız modern RCT bulunmuyor.",
  },
  {
    name: "AICAR",
    category: "Performans",
    tier: "preclinical",
    short:
      "AMPK aktivatörü, egzersiz taklit edici. Hayvan çalışmalarında dayanıklılık artışı gösterdi. İnsan performans verisi yok, deneysel seviyede.",
  },
]

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
