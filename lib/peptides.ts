export type EvidenceTier = "proven" | "theoretical" | "preclinical"

export interface EvidenceMatrixRow {
  outcome: string
  tier: EvidenceTier
}

export interface DoseStep {
  label: string
  /** Display string, unit included (e.g. "0.5mg", "200mcg") - never
   * normalized across compounds, only compared to this same compound's
   * own steps for the chart bar width. */
  amount: string
  /** Numeric value in the compound's own base unit, used only to size
   * the bar relative to this compound's other steps. */
  amountValue: number
  frequency: string
  route: string
}

export interface PeptideInteraction {
  /** Free text, or a slug of another peptide in this library (rendered
   * as an internal link when it matches). */
  compound: string
  note: string
}

export interface TimelinePoint {
  period: string
  result: string
}

export interface QualityIndicators {
  good: string[]
  bad: string[]
}

export interface SecondaryDosing {
  /** Heading for this alternate route, e.g. "Enjektabl Form". */
  routeLabel: string
  note?: string
  steps: DoseStep[]
}

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
  /** Per-outcome evidence, populated only where a specific trial/review
   * verifiably reports that outcome; never inferred beyond the source. */
  evidenceMatrix?: EvidenceMatrixRow[]
  /** Dose-escalation ladder, sourced from literature/community protocols.
   * Not a clinical recommendation - see the tier-aware disclaimer
   * rendered alongside the chart on the detail page. */
  dosing?: DoseStep[]
  /** Free-text note shown above the dosing chart (route/vehicle context
   * that doesn't fit the step table, e.g. reconstitution constraints). */
  dosingNote?: string
  /** A second, meaningfully different administration route (e.g. topical
   * vs injectable) with its own step table - rendered as a separate chart
   * rather than merged into `dosing`, since units/scale usually differ. */
  secondaryDosing?: SecondaryDosing
  warnings?: string[]
  sideEffects?: string[]
  interactions?: PeptideInteraction[]
  /** Self-reported user timeline from community/literature sources - not
   * a guarantee, framed as such on the detail page. */
  expectedTimeline?: TimelinePoint[]
  /** Sourcing/formulation quality signals for a physical product a buyer
   * would inspect (color, texture, packaging) - only meaningful for
   * injectable/topical compounds actually purchased as a substance. */
  qualityIndicators?: QualityIndicators
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

/** Evidence Score dot indicator: strong / moderate / early. */
export const tierDots: Record<EvidenceTier, string> = {
  proven: "●●●",
  theoretical: "●●○",
  preclinical: "●○○",
}

/** Mandatory framing shown alongside any dosing chart - never let a
 * clean chart imply clinical authority the tier doesn't have. */
export const tierDosingDisclaimer: Record<EvidenceTier, string> = {
  proven:
    "Onaylı endikasyon veya geniş klinik kullanım verisine dayanır. Bireysel dozaj yine de bir klinisyenle belirlenmelidir.",
  theoretical:
    "Bu basamaklar klinik onaylı bir reçete değildir; literatür ve araştırma protokollerinden derlenmiş referans değerleridir.",
  preclinical:
    "İnsan klinik verisi yoktur. Aşağıdaki değerler yalnızca araştırma/topluluk kaynaklı referanslardır, tıbbi tavsiye değildir.",
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
    evidenceMatrix: [{ outcome: "Vücut Ağırlığı", tier: "proven" }],
    dosingNote:
      "Haftalık subkutan enjeksiyon; karın, uyluk veya üst kol bölgesine, enjeksiyon yeri rotasyonuyla uygulanır.",
    dosing: [
      { label: "Başlangıç (1-4. hafta)", amount: "0.5mg", amountValue: 0.5, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Düşük İdame (4-8. hafta)", amount: "1mg", amountValue: 1, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Yükseltme (8-12. hafta)", amount: "2mg", amountValue: 2, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Orta Düzey (12-16. hafta)", amount: "4mg", amountValue: 4, frequency: "Haftada bir", route: "Subkutan" },
      { label: "İleri Düzey (16-20. hafta)", amount: "8mg", amountValue: 8, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Maksimum Etki (20+. hafta)", amount: "12mg", amountValue: 12, frequency: "Haftada bir", route: "Subkutan" },
    ],
    warnings: [
      "Kişisel veya ailede medüller tiroid kanseri öyküsü",
      "MEN2 sendromu",
      "Ciddi böbrek yetmezliği",
      "Yeterli beslenmeyi engelleyen şiddetli ve süreğen bulantı/kusma",
      "Pankreatit belirtileri: sırta yayılan şiddetli karın ağrısı",
      "Şiddetli hipoglisemi belirtileri: konfüzyon, baş dönmesi, terleme",
      "Aşırı kilo kaybı (haftada sürekli >1,4 kg veya toplam vücut ağırlığının >%25'i)",
      "Safra kesesi sorunları: sağ üst karında şiddetli ağrı",
    ],
    sideEffects: [
      "Gastrointestinal etkiler (bulantı, kusma, ishal) — genellikle hafif-orta düzeyde",
      "Kalp atış hızında artış — özellikle ilk 24 haftada yaygın",
      "İştah baskılanması",
      "Hafif dehidrasyon",
    ],
    interactions: [
      {
        compound: "Tirzepatide",
        note: "Başka çift/üçlü agonistlerle birleştirilmemelidir — şiddetli hipoglisemi ve aşırı gastrointestinal etki riski.",
      },
      {
        compound: "Semaglutide",
        note: "Birleştirilmemelidir — örtüşen GLP-1 agonist mekanizmaları şiddetli hipoglisemi riskini artırır.",
      },
      {
        compound: "BPC-157",
        note: "Güvenli kombinasyon; BPC-157 retatrutid kullanımı sırasında gastrointestinal koruyucu fayda sağlayabilir.",
      },
      {
        compound: "İnsülin",
        note: "İnsülin ihtiyacını belirgin şekilde azaltabilir. Kan şekeri izlenmeli ve doz buna göre ayarlanmalıdır.",
      },
      {
        compound: "Metformin",
        note: "Klinik çalışmalarda güvenli kombinasyon olarak test edildi; farklı mekanizmalar glukoz kontrolünde tamamlayıcı çalışır.",
      },
      {
        compound: "SGLT2 İnhibitörleri",
        note: "Klinik çalışmalarda güvenlik sorunu bildirilmeden birlikte kullanıldı.",
      },
      {
        compound: "Oral Kontraseptifler",
        note: "Gecikmiş mide boşalması nedeniyle retatrutidden 1 saat önce alınmalıdır.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "Üçlü hormon aktivasyonuna vücut uyum sağlarken başlangıç iştah baskılanması ve hafif gastrointestinal etkiler" },
      { period: "2-4. Hafta", result: "Belirgin yeme isteği azalması ve porsiyon küçülmesi; erken kilo kaybı (%2-5)" },
      { period: "4-8. Hafta", result: "Belirgin iştah kontrolü ve düzenli kilo kaybı (%5-10); kan şekeri kontrolünde iyileşme" },
      { period: "8-16. Hafta", result: "Önemli kilo azalması (%10-18) ve artan enerji harcaması" },
      { period: "16-24. Hafta", result: "Majör kilo kaybı eşiği (%15-22), kardiyovasküler fayda ve karaciğer yağında azalma" },
      { period: "24-48. Hafta", result: "Maksimum klinik etkinlik (%20-24,2) ile kapsamlı metabolik iyileşmeler" },
    ],
    qualityIndicators: {
      good: [
        "Eczacılık kalitesinde, homojen dokulu beyaz toz",
        "Doğru soğuk zincir korunumu (2-8°C buzdolabı)",
        "Berrak, renksiz, parçacıksız sulandırılmış çözelti",
      ],
      bad: [
        "Hızlı tolerans veya etkinlik kaybı, bozulmuş/sahte ürüne işaret edebilir",
        "Olağandışı yan etki profili kontaminasyona işaret edebilir",
      ],
    },
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
    evidenceMatrix: [
      { outcome: "Vücut Ağırlığı (semaglutid ile kombinasyonda)", tier: "proven" },
    ],
    dosingNote:
      "Karın, uyluk veya üst kol bölgesine haftalık subkutan enjeksiyon; ticari kullanıma sunulduğunda önceden dolu kalem şeklinde olacak.",
    dosing: [
      { label: "Doz Yükseltme (başlangıç)", amount: "0.25mg", amountValue: 0.25, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Doz Yükseltme (ara basamak)", amount: "1mg", amountValue: 1, frequency: "Haftada bir", route: "Subkutan" },
      { label: "İdame / Kilo Kaybı Hedefi", amount: "2.4mg", amountValue: 2.4, frequency: "Haftada bir", route: "Subkutan" },
    ],
    warnings: [
      "Gebelik veya emzirme döneminde önerilmez",
      "Henüz ticari olarak onaylı değil",
      "Hidrasyonu engelleyen şiddetli ve süreğen bulantı/kusma",
      "Pankreatit belirtileri (sırta yayılan şiddetli karın ağrısı)",
      "Şiddetli alerjik reaksiyon veya anafilaksi",
    ],
    sideEffects: [
      "İlk haftalarda gastrointestinal etkiler (bulantı, kusma, ishal)",
      "Vakaların %46-73'ünde anti-kagrilintid antikoru gelişimi (etkinliği etkilemiyor)",
      "REDEFINE 1 çalışmasında hastaların yalnızca %57,3'ü maksimum 2,4mg dozuna ulaştı",
    ],
    interactions: [
      {
        compound: "Semaglutide",
        note: "CagriSema kombinasyonu, tamamlayıcı GLP-1 ve amilin yolları üzerinden güçlendirilmiş kilo kaybı sağlar.",
      },
      {
        compound: "Tirzepatide",
        note: "Bilinen doğrudan etkileşim yok; farklı mekanizmalar eşzamanlı kullanıma izin verir.",
      },
      {
        compound: "Retatrutide",
        note: "Birikimli gastrointestinal etkiler uzman gözetimi olmadan belirgin risk oluşturur.",
      },
      {
        compound: "Metformin",
        note: "Faz 2/3 çalışmalarında farmakokinetik etkileşim olmadan iyi tolere edildi.",
      },
      {
        compound: "SGLT2 İnhibitörleri",
        note: "Klinik çalışmalar tamamlayıcı mekanizmalarla güvenli eşzamanlı kullanım gösterdi.",
      },
      {
        compound: "Pramlintid",
        note: "Her ikisi de amilin reseptörünü aktive eder; kombinasyon ek fayda sağlamaz ve gastrointestinal riskleri artırır.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "Gastrointestinal uyum; doz yükseltme sırasında hafif bulantı" },
      { period: "4-8. Hafta", result: "Erken kilo azalması (%2-5); belirgin iştah baskılanması" },
      { period: "12-26. Hafta", result: "Belirgin kilo kaybı hızlanması (%10-15); iyileşmiş tokluk sinyali" },
      { period: "26+. Hafta", result: "Zirve etkinlik (%15-23 kilo kaybı); devam eden tedaviyle sürdürülen idame" },
    ],
    qualityIndicators: {
      good: [
        "Ticari onay sonrası önceden dolu kalem tasarımı",
        "%98'i aşan eczacılık kalitesinde saflık",
        "-20°C'de dondurularak saklama kararlılığı",
      ],
      bad: [
        "Uygunsuz pH'ta fibril oluşumu; çözelti berrak kalmalıdır",
        "Agregasyon veya çökme bozulmaya işaret eder",
      ],
    },
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
    evidenceMatrix: [
      { outcome: "Kardiyovasküler Olaylar (MACE)", tier: "proven" },
    ],
    dosingNote:
      "Önceden dolu kalem veya flakon; haftada bir subkutan enjeksiyon. Uyluk, karın (göbekten 5cm+ uzakta) veya üst kol bölgesine uygulanır.",
    dosing: [
      { label: "Başlangıç (1-4. hafta)", amount: "0.25mg", amountValue: 0.25, frequency: "Haftada bir, 4 hafta ardından artırılır", route: "Subkutan" },
      { label: "Diyabet Yönetimi", amount: "0.5-1mg", amountValue: 1, frequency: "Haftada bir", route: "Subkutan" },
      { label: "İdame (Kilo Kaybı, 16 hafta titrasyon sonrası)", amount: "2.4mg", amountValue: 2.4, frequency: "Haftada bir", route: "Subkutan" },
    ],
    warnings: [
      "Kişisel veya ailede medüller tiroid kanseri öyküsü",
      "Şiddetli ve süreğen karın ağrısı (olası pankreatit)",
      "Sürekli kusma ile sıvı alımının engellenmesi",
      "Tiroid tümörü belirtileri (boyunda şişlik, ses kısıklığı, yutma güçlüğü)",
      "Şiddetli alerjik reaksiyon (döküntü, kaşıntı, nefes darlığı)",
      "Görme değişiklikleri (olası diyabetik retinopati ilerlemesi)",
      "İnsülin/sülfonilüre ile birlikte şiddetli hipoglisemi",
      "Böbrek sorunları (idrar azalması, ödem)",
    ],
    sideEffects: [
      "Bulantı",
      "İshal",
      "Kusma",
      "Kabızlık",
      "Karın ağrısı",
    ],
    interactions: [
      {
        compound: "İnsülin",
        note: "Birlikte kullanıldığında hipoglisemi riskini artırabilir; kan şekeri izlemi gerektirir.",
      },
      {
        compound: "Tirzepatide",
        note: "Her ikisi de inkretin taklitçisidir; örtüşen mekanizmalar birlikte kullanımda yan etkileri artırır.",
      },
      {
        compound: "Cagrilintide",
        note: "Klinik çalışmalarda CagriSema olarak birleştirilmiş, güçlendirilmiş kilo kaybı etkinliği için.",
      },
      {
        compound: "BPC-157",
        note: "Kontrendikasyon yok; gastrointestinal yan etkilerin azaltılmasına yardımcı olabilir.",
      },
      {
        compound: "Sülfonilüreler",
        note: "Artmış hipoglisemi riski; sülfonilüre dozunun azaltılması gerekebilir.",
      },
      {
        compound: "Oral İlaçlar",
        note: "Gecikmiş mide boşalması, oral ilaçların emilimini etkileyebilir; zamanlama ayarlanmalıdır.",
      },
    ],
    expectedTimeline: [
      { period: "1-4. Hafta", result: "İlk dozda hafif iştah azalması, olası bulantı" },
      { period: "2-3. Ay", result: "Belirgin kilo kaybı (tipik %5-10), iyileşmiş tokluk hissi" },
      { period: "4-6. Ay", result: "Devam eden kilo kaybı (yaygın %10-15), stabil glukoz düzeyleri" },
      { period: "6+. Ay", result: "Olası kilo kaybı platosu, idameye odaklanma" },
      { period: "Diyabet", result: "Kan şekerinde 1-2 hafta içinde iyileşme" },
    ],
    qualityIndicators: {
      good: [
        "FDA onaylı markalı ürünler (Ozempic, Wegovy, Rybelsus)",
        "Doğrulanmış ve süresi geçmemiş soğuk zincir",
        "Kalem/flakonda berrak, renksiz veya hafif sarımsı çözelti",
      ],
      bad: [
        "Bulanık veya renk değişimi göstermiş çözelti",
        "Görünür parçacık veya çökelti",
        "Eczane dışı veya doğrulanmamış çevrimiçi satıcılar",
      ],
    },
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
    evidenceMatrix: [
      { outcome: "Vücut Ağırlığı", tier: "proven" },
      { outcome: "Kardiyometabolik Göstergeler", tier: "proven" },
    ],
    dosingNote:
      "Haftada bir subkutan enjeksiyon, günün herhangi bir saatinde, aç veya tok karnına uygulanabilir. Uyluk, karın (göbekten 5cm+ uzakta) veya üst kol.",
    dosing: [
      { label: "Başlangıç (ilk 4 hafta)", amount: "2.5mg", amountValue: 2.5, frequency: "Haftada bir", route: "Subkutan" },
      { label: "İlerleme", amount: "5mg", amountValue: 5, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Optimizasyon", amount: "7.5-10mg", amountValue: 10, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Maksimum Kilo Kaybı", amount: "12.5-15mg", amountValue: 15, frequency: "Haftada bir", route: "Subkutan" },
    ],
    warnings: [
      "Kişisel veya ailede medüller tiroid kanseri öyküsü / MEN2 sendromu",
      "Gebelik veya emzirme dönemi",
      "Pankreatit öyküsü veya şiddetli/süreğen karın ağrısı",
      "Tiroid tümörü belirtileri (boyunda şişlik, ses kısıklığı, yutma güçlüğü)",
      "Şiddetli hipoglisemi belirtileri (konfüzyon, terleme, çarpıntı)",
      "Böbrek sorunları (idrar azalması, ödem)",
      "Safra kesesi sorunları (sağ üst karında şiddetli ağrı)",
    ],
    sideEffects: [
      "Bulantı (hafif-orta, ilk 2-4 hafta)",
      "İştah azalması",
      "Uyum sürecinde olası yorgunluk",
      "İshal veya kabızlık",
    ],
    interactions: [
      {
        compound: "Semaglutide",
        note: "Her ikisi de GLP-1 agonistidir — birleştirmek hipoglisemi ve şiddetli gastrointestinal yan etki riskini artırır.",
      },
      {
        compound: "İnsülin",
        note: "Artan insülin duyarlılığı nedeniyle belirgin doz azaltımı gerektirebilir.",
      },
      {
        compound: "CJC-1295",
        note: "Büyüme hormonu desteği, kilo kaybı sırasında kas kütlesinin korunmasına yardımcı olabilir.",
      },
      {
        compound: "BPC-157",
        note: "Bilinen olumsuz etkileşim yok; bağırsak sağlığını destekleyip gastrointestinal etkileri azaltabilir.",
      },
      {
        compound: "Liraglutide",
        note: "Başka bir GLP-1 agonisti — ikili tedavi birikimli etkiler nedeniyle kontrendikedir.",
      },
      {
        compound: "5-Amino-1MQ",
        note: "NNMT inhibisyonu, metabolik optimizasyon için GLP-1 etkilerini tamamlayabilir.",
      },
    ],
    expectedTimeline: [
      { period: "1-3. Gün", result: "İştah azalması başlar" },
      { period: "1-2. Hafta", result: "Kan şekeri kontrolünde iyileşme; hafif bulantı yaygın" },
      { period: "2-4. Hafta", result: "İlk kilo kaybı; gastrointestinal etkiler genellikle düzelir" },
      { period: "Devam Eden", result: "Aktif dönemde haftada 0.5-1.4 kg kilo kaybı" },
      { period: "16-24. Hafta", result: "Zirve kilo kaybı etkileri gözlenir" },
    ],
    qualityIndicators: {
      good: [
        "Topaklanmamış, beyaz-krem renkli liyofilize toz",
        "Berrak, renksiz sulandırılmış çözelti",
        "Sağlam flakon mührü, görünür doz etiketi ve parti numarası",
        "2-8°C'de, ışıktan korunarak doğru saklama",
      ],
      bad: [
        "Toz topaklanması, renk değişimi veya sarı/kahverengi görünüm",
        "Sulandırma sonrası süregelen bulanıklık",
        "Olağandışı kristalleşme deseni",
      ],
    },
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    category: "Estetik / Onarım",
    tier: "theoretical",
    short:
      "Bakır iyonu taşıyan tripeptid. Kolajen ve elastaz aktivitesi üzerindeki etkileri hücre ve hayvan modellerinde iyi tanımlı; bağımsız insan RCT verisi sınırlı.",
    mechanism:
      "Bakır iyonu taşıyan tripeptid; kolajen ve elastin sentezini uyardığı, antioksidan ve anti-inflamatuar yollarla doku yenilenmesini desteklediği hücre kültürü ve hayvan modellerinde gösterilmiştir.",
    primaryOutcomes: [
      "Hücre kültüründe elastaz inhibisyonu ve kolajen sentezinde artış",
      "Hayvan modellerinde yara iyileşme hızında artış",
      "Bağımsız, büyük ölçekli insan RCT verisi sınırlı",
    ],
    clinicalStatus:
      "Mekanizma hücre/hayvan modellerinde iyi tanımlı, insan RCT verisi sınırlı",
    relatedArticleSlug: "kaynak-politikamiz-neden-onemli",
    dosingNote:
      "En yaygın topikal (krem/serum) kullanılır; enjektabl formu ayrı bir risk-yarar profiline sahiptir ve gebelikte önerilmez.",
    dosing: [
      { label: "Genel Cilt Sağlığı (serum)", amount: "%0.5", amountValue: 0.5, frequency: "Günde 1 kez", route: "Topikal (yüz/boyun)" },
      { label: "Anti-Aging (krem)", amount: "%0.5-1", amountValue: 1, frequency: "Günde 1-2 kez", route: "Topikal" },
      { label: "Saç Büyümesi (çözelti)", amount: "%1-2", amountValue: 2, frequency: "Günde 1 kez", route: "Saç derisi masajı" },
      { label: "Yara İyileşmesi (jel)", amount: "%1-2", amountValue: 2, frequency: "Günde 2-3 kez", route: "Direkt uygulama" },
      { label: "Yoğun Onarım (hedefli alan)", amount: "%2", amountValue: 2, frequency: "Günde 1 kez", route: "Topikal" },
    ],
    secondaryDosing: {
      routeLabel: "Enjektabl Form",
      note: "Farklı bir risk-yarar profiline sahiptir; gebelikte önerilmez, ayrı saklama koşulları gerektirir (2-8°C).",
      steps: [
        { label: "Standart Protokol", amount: "1-3mg", amountValue: 3, frequency: "Günde 1 kez, 8-16 haftalık siklus", route: "Subkutan" },
      ],
    },
    warnings: [
      "Bilinen bakır hassasiyeti veya Wilson hastalığı",
      "Uygulama bölgesinde aktif cilt enfeksiyonu",
      "Gebelik veya emzirme dönemi (enjektabl form)",
      "Şiddetli cilt tahrişi, yanma veya süregelen kızarıklık",
      "Alerjik reaksiyon belirtileri (döküntü, şişlik, nefes darlığı)",
      "Olağandışı cilt renk değişimi veya lekelenme",
      "Süregelen metalik tat (enjektabl form)",
      "4-6 hafta sonra cilt durumunun kötüleşmesi",
    ],
    sideEffects: [
      "Başlangıçta hafif cilt tahrişi (genellikle geçici)",
      "Artmış güneş hassasiyeti",
    ],
    interactions: [
      {
        compound: "BPC-157",
        note: "Tamamlayıcı doku iyileşme ve yenilenme yolları.",
      },
      {
        compound: "TB-500",
        note: "Birlikte kullanıldığında geliştirilmiş yara iyileşmesi ve doku onarımı.",
      },
      {
        compound: "Melanotan II",
        note: "Her ikisi de melanin üretimini etkiler; kombinasyonda dikkatli olunmalı.",
      },
      {
        compound: "Bakır Takviyeleri",
        note: "Bakır toksisitesi riski; oral bakır takviyeleriyle birleştirilmemelidir.",
      },
      {
        compound: "CJC-1295",
        note: "Bilinen etkileşim yok.",
      },
      {
        compound: "Demir Şelatlayıcılar",
        note: "Bakır emilimini ve aktivitesini etkileyebilir.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "Gelişmiş cilt dokusu ve hidrasyon" },
      { period: "3-4. Hafta", result: "İnce çizgilerde azalma, artan pürüzsüzlük" },
      { period: "6-8. Hafta", result: "Gelişmiş cilt sıkılığı ve elastikiyet" },
      { period: "8-12. Hafta", result: "Cilt tonunda ve netliğinde görünür iyileşme" },
      { period: "Saç Büyümesi", result: "İlk sonuçlar için 6-12 hafta" },
    ],
    qualityIndicators: {
      good: [
        "Bakır içeriğinden gelen açık mavi ton",
        "Pürüzsüz doku, tanecik yok",
        "Ayrışma veya kristalleşme olmayan stabil formülasyon",
        "UV korumalı profesyonel ambalaj",
      ],
      bad: [
        "Yeşil veya koyu renk değişimi (oksidasyon/kontaminasyon göstergesi)",
        "Tanecikli doku (zayıf formülasyon)",
        "Bileşenlerin ayrışması veya çökmesi",
      ],
    },
  },
  {
    slug: "ss-31-elamipretide",
    name: "SS-31 (Elamipretide)",
    category: "Longevity",
    tier: "proven",
    short:
      "Mitokondriyal membran koruyucu tetrapeptid. FDA'nın onayladığı ilk mitokondri ilacı. Mitokondriyal işlev bozukluklarında klinik olarak test edildi.",
    mechanism:
      "Mitokondri iç membranında kardiyolipin ile etkileşerek elektron transport zincirinin verimliliğini korur; oksidatif stresi azaltır.",
    primaryOutcomes: [
      "Mitokondriyal fonksiyon belirteçlerinde iyileşme",
      "Hedef popülasyonlarda egzersiz kapasitesinde artış",
    ],
    clinicalStatus:
      "Belirli endikasyonlarda onaylı, diğer kullanım alanlarında klinik çalışmalar sürüyor",
    dosingNote:
      "Işığa duyarlıdır, ışıktan korunmalıdır. Subkutan veya intravenöz uygulanır; klinik protokoller ile araştırma/performans amaçlı dozlar arasında büyük fark vardır.",
    dosing: [
      { label: "Genel Mitokondriyal Destek", amount: "5-10mg", amountValue: 10, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Atletik Performans", amount: "10-20mg", amountValue: 20, frequency: "Günde 1 kez, antrenman öncesi", route: "Subkutan" },
      { label: "Klinik Protokol", amount: "40mg", amountValue: 40, frequency: "Günde 1 kez", route: "Subkutan veya IV" },
    ],
    warnings: [
      "Bilinen peptid aşırı duyarlılığı",
      "Gebelik veya emzirme dönemi (sınırlı veri)",
      "Şiddetli enjeksiyon bölgesi reaksiyonları",
      "Alerjik reaksiyon belirtileri (döküntü, nefes darlığı)",
      "Kardiyovasküler semptomlar",
    ],
    sideEffects: [
      "Klinik çalışmalarda mükemmel güvenlik profili",
      "Terapötik dozlarda anlamlı yan etki bildirilmedi",
      "Hafif enjeksiyon bölgesi reaksiyonları mümkün",
    ],
    interactions: [
      {
        compound: "MOTS-c",
        note: "Her ikisi de mitokondriyal peptiddir, tamamlayıcı mekanizmalarla çalışır.",
      },
      {
        compound: "Humanin",
        note: "Hücresel fonksiyonu korumak için birlikte çalışabilir.",
      },
      {
        compound: "BPC-157",
        note: "BPC-157 doku onarımına odaklanırken SS-31 hücresel enerji üretimini hedefler.",
      },
      {
        compound: "Thymosin Beta-4",
        note: "Her ikisi de farklı yollarla kardiyoprotektiftir.",
      },
      {
        compound: "NAD+",
        note: "Her ikisi de mitokondriyal fonksiyonu farklı mekanizmalarla destekler.",
      },
      {
        compound: "GHK-Cu",
        note: "Farklı mekanizmalar; çatışma yok.",
      },
    ],
    expectedTimeline: [
      { period: "1-3. Gün", result: "Hafif enerji iyileşmesi, azalan yorgunluk" },
      { period: "1-2. Hafta", result: "Daha iyi egzersiz dayanıklılığı, hızlanan toparlanma" },
      { period: "2-4. Hafta", result: "Gelişmiş dayanıklılık, zihinsel netlik, daha iyi uyku" },
      { period: "4-8. Hafta", result: "Belirgin egzersiz kapasitesi iyileşmesi" },
      { period: "8-12. Hafta", result: "Sürdürülen enerji, olası biyobelirteç değişimleri" },
    ],
    qualityIndicators: {
      good: [
        "Eczacılık kalitesinde (>%98 saflık)",
        "Sulandırma sonrası berrak, renksiz çözelti",
        "Analiz Sertifikası (CoA) mevcut",
        "Doğru soğuk zincir korunumu",
      ],
      bad: [
        "Sarı veya kahverengi renk değişimi bozulmaya işaret eder",
        "Bulanık çözelti veya görünür parçacıklar",
        "Uygunsuz saklama koşulları",
      ],
    },
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
    dosingNote:
      "Genellikle yaralanma bölgesine yakın subkutan enjeksiyon şeklinde uygulanır; lokalize doku onarımı için tercih edilir.",
    dosing: [
      { label: "İdame", amount: "250mcg", amountValue: 250, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Genel İyileşme", amount: "250-500mcg", amountValue: 500, frequency: "Günde 1-2 kez", route: "Subkutan/IM" },
      { label: "Ciddi Yaralanma", amount: "500-1000mcg", amountValue: 1000, frequency: "Günde 2 kez", route: "Yaralanma bölgesine yakın SubQ" },
    ],
    secondaryDosing: {
      routeLabel: "Oral Form",
      note: "Sistemik/tüm vücut faydaları için; aç karnına alınması önerilir. Yerel enjeksiyon kadar hedefe yönelik değildir.",
      steps: [
        { label: "Genel İyileşme", amount: "250-500mcg", amountValue: 500, frequency: "Günde 1-2 kez, aç karnına", route: "Oral" },
      ],
    },
    warnings: [
      "Aktif kanser (anjiyojenik etkiler nedeniyle)",
      "Gebelik veya emzirme dönemi",
      "Kan sulandırıcı kullanımı (anjiyogenez nedeniyle doktora danışılmalı)",
      "Yarışan sporcular için WADA tarafından yasaklı",
      "Süregelen enjeksiyon bölgesi reaksiyonu veya enfeksiyon belirtileri",
    ],
    sideEffects: [
      "Hafif enjeksiyon bölgesi kızarıklığı",
      "Enjeksiyon bölgesi tahrişi",
      "Olası hafif sindirim rahatsızlığı (oral kullanımda)",
    ],
    interactions: [
      {
        compound: "TB-500",
        note: "Tamamlayıcı iyileşme mekanizmaları; sıklıkla 'Wolverine Stack' olarak birlikte kullanılır.",
      },
      {
        compound: "Ipamorelin",
        note: "BPC-157, GH reseptör ekspresyonunu artırarak büyüme hormonu faydalarını güçlendirir.",
      },
      {
        compound: "CJC-1295",
        note: "BPC-157, GH reseptörlerini yukarı regüle ederek doku onarımı etkinliğini artırır.",
      },
      {
        compound: "Melanotan II",
        note: "Bilinen etkileşim yok; farklı mekanizmalar ve reseptör hedefleri.",
      },
      {
        compound: "AOD-9604",
        note: "Güvenli kombinasyon; farklı yollar. Rejeneratif protokollerde sıklıkla birlikte kullanılır.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "Enjeksiyon bölgesinde inflamasyon ve ağrıda azalma" },
      { period: "2-4. Hafta", result: "İyileşme hızında ve doku onarımında gelişme" },
      { period: "4-8. Hafta", result: "Maksimum lokalize iyileşme faydası" },
    ],
    qualityIndicators: {
      good: [
        "Beyaz, kabarık liyofilize toz (flakon dibini dolduran 'kek' formu)",
        "Sulandırma sonrası parçacıksız, kristal berraklıkta çözelti",
        "Flakonda sağlam vakum mührü",
      ],
      bad: [
        "Çökmüş, erimiş veya flakon duvarına yapışmış toz (ısı hasarı)",
        "Sulandırma sonrası bulanık çözelti, parçacık veya çökelti",
        "Tozda renk değişimi",
      ],
    },
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
    dosingNote:
      "IV infüzyon en yüksek biyoyararlanımı sağlar ve tıbbi gözetim gerektirir; IM/subkutan alternatif bir yoldur.",
    dosing: [
      { label: "İntranazal", amount: "25-50mg", amountValue: 50, frequency: "Günde 1-2 kez", route: "İntranazal" },
      { label: "IM/SubQ", amount: "100-500mg", amountValue: 500, frequency: "Haftada 2-3 kez", route: "Kas içi / Subkutan" },
      { label: "IV İnfüzyon", amount: "250-1000mg", amountValue: 1000, frequency: "Haftada 1-2 kez", route: "İntravenöz" },
    ],
    warnings: [
      "IV uygulama tıbbi gözetim gerektirir",
      "Tedavi sırasında alkolden kaçınılmalı",
      "Tutarlı bir doz takvimi sürdürülmeli",
      "Şiddetli enjeksiyon bölgesi reaksiyonu veya enfeksiyon belirtileri",
      "Süregelen bulantı veya gastrointestinal rahatsızlık",
    ],
    sideEffects: [
      "IV infüzyon sırasında hafif kızarma",
      "Geçici bulantı",
    ],
    interactions: [
      {
        compound: "BPC-157",
        note: "Güçlendirilmiş hücresel onarım ve enerji üretimi.",
      },
      {
        compound: "CJC-1295",
        note: "Geliştirilmiş toparlanma ve anti-aging etkileri.",
      },
      {
        compound: "Tirzepatide",
        note: "GLP-1 agonistleriyle güçlendirilmiş metabolik yolları destekler.",
      },
      {
        compound: "Ipamorelin",
        note: "Büyüme hormonu yolları, gelişmiş enerji metabolizmasından faydalanır.",
      },
      {
        compound: "Alkol",
        note: "Alkol, NAD+ düzeylerini ve etkinliğini belirgin şekilde azaltır.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "İlk enerji iyileşmeleri ve zihinsel netlik" },
      { period: "3-4. Hafta", result: "Gelişmiş fiziksel performans ve toparlanma" },
      { period: "5-8. Hafta", result: "Sürdürülen enerji düzeyleri ve iyileşmiş uyku kalitesi" },
      { period: "9-12. Hafta", result: "Optimize edilmiş metabolik fonksiyon ve bilişsel faydalar" },
    ],
    qualityIndicators: {
      good: [
        "Berrak, renksiz enjektabl çözelti",
        "2-8°C'de doğru soğuk zincir",
        "Steril enjeksiyon tekniği",
        "Üçüncü taraf saflık testi",
      ],
      bad: [
        "Bulanık veya renk değişimi kontaminasyona işaret eder",
        "Oda sıcaklığında saklama NAD+'ı hızla bozar",
        "Sulandırılmış çözeltiler en fazla 28 gün içinde kullanılmalı",
      ],
    },
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
    dosingNote:
      "İntranazal uygulama, beyne doğrudan olfaktör taşımayla en etkili yoldur. Etki başlangıcı 15-30 dakika, doruk 1-2 saat.",
    dosing: [
      { label: "Bilişsel Destek", amount: "300-600mcg", amountValue: 600, frequency: "Günde 1-2 kez", route: "İntranazal" },
      { label: "Yoğun Bilişsel Destek", amount: "600-900mcg", amountValue: 900, frequency: "Günde 2-3 kez", route: "İntranazal" },
    ],
    warnings: [
      "Gebelik veya emzirme dönemi",
      "Bilinen peptid alerjileri",
      "Tıbbi gözetim olmadan 4 haftadan uzun sürekli kullanım önerilmez",
      "Şiddetli burun tahrişi, kanama veya süregelen tıkanıklık",
      "Olağandışı anksiyete, ajitasyon veya uyku bozukluğu",
    ],
    sideEffects: [
      "Hafif burun rahatsızlığı (nazal yol)",
      "Uygulama sırasında olası burun hissi",
    ],
    interactions: [
      {
        compound: "Selank",
        note: "Tamamlayıcı anksiyolitik etkiler; popüler bir kombinasyon.",
      },
      {
        compound: "BPC-157",
        note: "Her ikisi de farklı mekanizmalarla nöroplastisiteyi destekler.",
      },
      {
        compound: "Uyarıcılar",
        note: "Uyarıcı etkileri güçlendirebilir — dikkatle izlenmeli, uyarıcı dozu azaltılmalı.",
      },
      {
        compound: "MAO İnhibitörleri",
        note: "Teorik monoamin sistemi riski; dikkatli kullanılmalı.",
      },
      {
        compound: "NA-Semax-Amidat",
        note: "Aynı peptidin varyantlarıdır — eşzamanlı kullanılmamalı, ikisinden biri seçilmelidir.",
      },
    ],
    expectedTimeline: [
      { period: "1-3. Gün", result: "İlk bilişsel netlik ve odaklanma artışı, olası hafif burun hissi" },
      { period: "1. Hafta", result: "Zorlu görevlerde artan dikkat" },
      { period: "2-3. Hafta", result: "Gelişmiş bellek pekiştirme, stabil ruh hali" },
      { period: "4. Hafta", result: "Zirve bilişsel fayda, artan stres direnci" },
      { period: "Kullanım Sonrası", result: "3-7 gün içinde kademeli başlangıç düzeyine dönüş; bazı faydalar kalıcı olabilir" },
    ],
    qualityIndicators: {
      good: [
        "Berrak, renksiz nazal çözelti",
        "Doğru konsantrasyon etiketi (%0.1 veya %1)",
        "Buz paketleriyle soğuk zincir sevkiyatı",
        "Steril kapatılmış ambalaj",
      ],
      bad: [
        "Kristalleşme veya çökelme",
        "Bulanık veya renkli çözeltiler",
        "Görünür parçacıklar",
      ],
    },
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
    dosingNote:
      "Subkutan enjeksiyon birincil ve en iyi belgelenmiş yoldur, güvenilir emilim sağlar.",
    dosing: [
      { label: "Hafif Anksiyete", amount: "250mcg", amountValue: 250, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Orta Anksiyete/Bilişsel", amount: "250mcg", amountValue: 500, frequency: "Günde 2 kez (sabah-akşam)", route: "Subkutan" },
      { label: "Yoğun Anksiyete Desteği", amount: "500mcg", amountValue: 500, frequency: "Günde 1 kez (bölünmüş doz)", route: "Subkutan" },
    ],
    warnings: [
      "Bilinen peptid alerjileri",
      "Gebelik veya emzirme dönemi",
      "Birden fazla psikiyatrik ilaç kullanımında hekime danışılmalı",
      "Şiddetli alerjik reaksiyon (döküntü, nefes darlığı, şişlik)",
      "Süregelen enjeksiyon bölgesi reaksiyonu veya enfeksiyon belirtileri",
    ],
    sideEffects: [
      "Minimal yan etki — güvenlik profili iyi",
      "Sedasyon veya bilişsel bozulma yok",
      "Tolerans, bağımlılık veya kesilme belirtisi bildirilmedi",
    ],
    interactions: [
      {
        compound: "Semax",
        note: "Birlikte kullanıldığında güçlendirilmiş bilişsel ve anksiyolitik etkiler.",
      },
      {
        compound: "BPC-157",
        note: "Tamamlayıcı stres yanıtı mekanizmaları.",
      },
      {
        compound: "Benzodiazepinler",
        note: "Benzer GABAerjik etkiler; tıbbi gözetim önerilir.",
      },
      {
        compound: "Alkol",
        note: "Her ikisi de GABA sistemini etkiler; aşırı sedasyon riski.",
      },
      {
        compound: "Noopept",
        note: "Her ikisi de farklı yollarla BDNF'yi artırır.",
      },
      {
        compound: "Modafinil",
        note: "Dengeli anksiyete azaltımı ve uyanıklık.",
      },
      {
        compound: "SSRI Antidepresanlar",
        note: "Güçlendirilmiş ruh hali düzenlemesi için birleştirilebilir; yakından izlenmelidir.",
      },
    ],
    expectedTimeline: [
      { period: "30-60 Dakika", result: "Hafif anksiyete azalması başlar" },
      { period: "1-3. Gün", result: "Gelişmiş zihinsel netlik ve odaklanma" },
      { period: "1. Hafta", result: "Artan stres direnci ve duygusal stabilite" },
      { period: "1-2. Hafta", result: "Zirve bilişsel güçlendirme etkileri" },
      { period: "Kesim Sonrası", result: "Faydalar birkaç gün daha sürebilir" },
    ],
    qualityIndicators: {
      good: [
        "Topaklanmamış, beyaz-krem renkli liyofilize toz",
        "Berrak, renksiz sulandırılmış çözelti",
        "Net parti bilgisi, saflık testi, son kullanma tarihleri",
      ],
      bad: [
        "Sararma, topaklanma veya nem maruziyeti",
        "Sulandırma sonrası süregelen bulanıklık",
      ],
    },
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
    dosingNote:
      "Subkutan veya kas içi enjeksiyon; aç karnına uygulama gerekmez. Yaralanma bölgesine yakın enjekte edilebilir.",
    dosing: [
      { label: "İdame", amount: "2mg", amountValue: 2, frequency: "Haftada 1-2 kez", route: "Subkutan" },
      { label: "Genel Doku Onarımı", amount: "2-3mg", amountValue: 3, frequency: "Haftada 2 kez", route: "Subkutan/Kas içi" },
      { label: "Ciddi Yaralanma Toparlanması", amount: "4-5mg", amountValue: 5, frequency: "Haftada 3 kez", route: "Yaralanma bölgesine yakın SubQ" },
    ],
    warnings: [
      "Aktif kanser tedavisi (anjiyojenik etkiler nedeniyle)",
      "Gebelik veya emzirme dönemi",
      "İmmünosüpresif ilaç kullanımı (hekime danışılmalı)",
      "Yarışan sporcular için WADA tarafından yasaklı",
      "Süregelen veya kötüleşen enjeksiyon bölgesi enfeksiyonu",
    ],
    sideEffects: [
      "Genellikle minimal yan etki",
      "Olası hafif enjeksiyon bölgesi reaksiyonu",
      "Bazı kullanıcılarda geçici yorgunluk",
    ],
    interactions: [
      {
        compound: "BPC-157",
        note: "Birlikte kullanıldığında güçlendirilmiş doku onarımı ile tamamlayıcı iyileşme mekanizmaları (Wolverine Stack).",
      },
      {
        compound: "Ipamorelin",
        note: "Dokunun büyüme hormonu etkilerine duyarlılığını artırabilir.",
      },
      {
        compound: "CJC-1295",
        note: "GH salgılatıcı etkiyle birleşen doku onarımı, kapsamlı toparlanma sağlar.",
      },
      {
        compound: "IGF-1",
        note: "Tamamlayıcı büyüme yolları üzerinden geliştirilmiş kas ve doku yenilenmesi.",
      },
      {
        compound: "GHRP-6",
        note: "Bilinen olumsuz etkileşim yok; potansiyel geliştirilmiş toparlanma.",
      },
      {
        compound: "Melanotan II",
        note: "Farklı reseptör aileleri, yol örtüşmesi yok.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "Azalan inflamasyon ve gelişmiş doku hissi" },
      { period: "2-4. Hafta", result: "Hızlanan iyileşme oranı ve gelişmiş doku kalitesi" },
      { period: "4-8. Hafta", result: "Maksimum doku onarımı ve rejeneratif fayda" },
      { period: "6-12. Hafta", result: "Doku gücü ve fonksiyonunda sürekli iyileşme" },
    ],
    qualityIndicators: {
      good: [
        "Beyaz liyofilize toz — ince, eşit dağılmış, hafif kabarık doku",
        "Sulandırma sonrası parçacıksız, berrak renksiz çözelti",
        "Sağlam vakumlu mühür ve güvenli lastik tıpa",
      ],
      bad: [
        "Renkli/kristalize toz bozulmaya işaret eder",
        "Süregelen bulanıklık, yüzen parçacıklar veya çökelti",
        "Hasarlı flakon mührü veya kontaminasyon belirtisi",
      ],
    },
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
    dosingNote:
      "Birincil yol subkutan enjeksiyondur. Optimal uygulama egzersiz öncesi sabah saatleridir; AMPK aktivasyonu 30 dakika içinde başlar.",
    dosing: [
      { label: "Muhafazakar Başlangıç", amount: "5mg", amountValue: 5, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Metabolik Sağlık", amount: "5-10mg", amountValue: 10, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Anti-Aging Protokolü", amount: "15mg", amountValue: 15, frequency: "Haftada 3 kez", route: "Subkutan" },
    ],
    warnings: [
      "Gebelik veya emzirme dönemi",
      "WADA tarafından yasaklı madde (sportif yarışmalarda)",
      "Sınırlı uzun dönem insan güvenlik verisi",
      "Şiddetli alerjik reaksiyon veya anafilaksi",
      "Tekrarlayan hipoglisemi (<50 mg/dL)",
    ],
    sideEffects: [
      "Hayvan çalışmalarında genellikle iyi tolere edildi, minimal yan etki",
      "Hafif enjeksiyon bölgesi reaksiyonu (kızarıklık, şişlik)",
    ],
    interactions: [
      {
        compound: "Metformin",
        note: "Her ikisi de AMPK'yı aktive eder; birikimli hipoglisemik etkiler için izlenmeli.",
      },
      {
        compound: "SS-31 (Elamipretide)",
        note: "Farklı yollar üzerinden tamamlayıcı mitokondriyal destek.",
      },
      {
        compound: "Berberin",
        note: "Her ikisi de AMPK aktivatörüdür; birikimli etkiler için izlenmelidir.",
      },
      {
        compound: "Resveratrol",
        note: "Tamamlayıcı SIRT1/AMPK aktivasyon yolları.",
      },
      {
        compound: "Diyabet İlaçları",
        note: "Hipoglisemiyi önlemek için doz ayarlaması gerekebilir.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "AMPK yolağı aktivasyonu; ilk glukoz toleransı iyileşmeleri" },
      { period: "2-4. Hafta", result: "Gelişmiş egzersiz kapasitesi; iyileşmiş insülin duyarlılığı" },
      { period: "4-8. Hafta", result: "Sürdürülen metabolik faydalar; olası vücut kompozisyonu değişimleri" },
      { period: "8-12. Hafta", result: "Maksimum mitokondriyal fonksiyon artışı; metabolik esneklik" },
    ],
    qualityIndicators: {
      good: [
        "Beyaz-krem renginde homojen toz",
        "Sulandırma sonrası parçacıksız, berrak renksiz çözelti",
        "RP-HPLC ile >%95 saflıkla dizi doğrulaması",
      ],
      bad: [
        "Renk değişimi göstermiş toz veya çözelti",
        "Sulandırma sonrası bulanık çözelti",
        "Analiz sertifikasının bulunmaması",
      ],
    },
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
    dosingNote:
      "Kısa döngüler (10-20 gün) halinde, aralarda 4-6 aylık ara verilerek subkutan uygulanır; sürekli kullanım protokolü yoktur.",
    dosing: [
      { label: "Muhafazakar Başlangıç", amount: "100mcg", amountValue: 100, frequency: "Günde 1 kez, 10-20 gün", route: "Subkutan" },
      { label: "Standart", amount: "200-500mcg", amountValue: 500, frequency: "Günde 1 kez, 10-20 gün", route: "Subkutan" },
    ],
    warnings: [
      "Aktif malignite (telomeraz aktivasyonu endişesi)",
      "Kronik sinüzit (nazal yol)",
      "Gebelik veya emzirme dönemi",
      "Yeni oluşan veya değişen benler (cilt izlenmeli)",
      "Kanser tanısı alınması halinde derhal kesilmeli",
    ],
    sideEffects: [
      "Genellikle iyi tolere edilir, minimal yan etki",
      "Hafif enjeksiyon bölgesi reaksiyonu",
      "Canlı rüyalar (melatonin ilişkili)",
    ],
    interactions: [
      {
        compound: "Thymalin",
        note: "Güçlendirilmiş immünomodülasyon — Rus protokollerinde sıklıkla birlikte kullanılır.",
      },
      {
        compound: "Semax",
        note: "Farklı nörokognitif odak, bilinen olumsuz etkileşim yok.",
      },
      {
        compound: "Kanser Tedavileri",
        note: "Telomeraz aktivasyonu teorik olarak maligniteyi etkileyebilir; aktif kanserde kaçınılmalıdır.",
      },
      {
        compound: "Melatonin",
        note: "Her ikisi de pineal yolaklar üzerinden çalışır; sirkadiyen ritim etkilerini güçlendirebilir.",
      },
      {
        compound: "NAD+ Öncülleri",
        note: "Farklı anti-aging yolları; tamamlayıcı mekanizmalar.",
      },
      {
        compound: "Cortexin",
        note: "Her ikisi de nöroprotektiftir; birikimli etkiler açısından izlenmelidir.",
      },
    ],
    expectedTimeline: [
      { period: "1-3. Gün", result: "Olası hafif enerji iyileşmesi" },
      { period: "3-7. Gün", result: "Daha iyi uyku kalitesi, canlı rüyalar (melatonin etkisi)" },
      { period: "2. Hafta", result: "Artan sabah enerjisi, ruh hali stabilitesi" },
      { period: "3-4. Hafta", result: "Cilt kalitesinde iyileşme, gelişmiş yara iyileşmesi" },
      { period: "2-3. Ay", result: "Laboratuvar belirteçlerinde telomer değişimleri gözlenebilir (hayvan verisi)" },
    ],
    qualityIndicators: {
      good: [
        "Beyaz-krem renkli liyofilize toz",
        "Sulandırıldığında berrak, renksiz çözelti",
        "Analiz sertifikası mevcut (>%98 saflık)",
      ],
      bad: [
        "Sarı veya renk değişimi göstermiş toz (bozulma)",
        "Karıştırma sonrası bulanık çözelti (kontaminasyon)",
        "Yaygın doz yanlış bilgisi: birçok kaynak çeviri hatasına dayanarak 5-10mg önerir, oysa orijinal araştırma mikrogram düzeyinde etkinlik göstermiştir — tedarikçi bilgilerini dikkatle doğrulayın",
      ],
    },
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
    dosingNote:
      "Günde bir kez subkutan enjeksiyon; toleransı değerlendirmek için kademeli doz artışı yaygındır.",
    dosing: [
      { label: "Kademeli Giriş (başlangıç)", amount: "1mg", amountValue: 1, frequency: "Günde 1 kez, 4 hafta titrasyon", route: "Subkutan" },
      { label: "Standart Protokol", amount: "1-3mg", amountValue: 3, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "İleri Protokol", amount: "3-5mg", amountValue: 5, frequency: "Günde 1 kez, 8-12 hafta", route: "Subkutan" },
    ],
    warnings: [
      "Diyabet (hipoglisemi riski)",
      "Kardiyak rahatsızlıklar",
      "Gebelik veya emzirme dönemi",
      "Yarışan sporcular için WADA tarafından yasaklı",
      "Laktik asidoz belirtileri (kas ağrısı, güçsüzlük, nefes darlığı)",
    ],
    sideEffects: [
      "Enjeksiyon bölgesi reaksiyonları",
      "Uyum sürecinde hafif yorgunluk",
      "Olası hipoglisemi",
    ],
    interactions: [
      {
        compound: "Metformin",
        note: "Her ikisi de farklı mekanizmalarla AMPK'yı aktive eder; glukoz metabolizması üzerinde birikimli etki olabilir.",
      },
      {
        compound: "GW501516",
        note: "Farklı yollar (AMPK vs PPARδ) metabolik etkileri tamamlayabilir; popüler bir araştırma kombinasyonu.",
      },
      {
        compound: "SR9009",
        note: "Rev-ErbA agonisti; tamamlayıcı metabolik etkiler.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "Enerji düzeylerinde hafif değişimler; vücut AMPK aktivasyonuna uyum sağlıyor" },
      { period: "3-4. Hafta", result: "Dayanıklılık kapasitesinde ve metabolik belirteçlerde olası iyileşme" },
      { period: "5-8. Hafta", result: "Birikimli metabolik adaptasyonlar; artan yağ oksidasyonu" },
      { period: "8-12. Hafta", result: "Mitokondriyal yoğunluk ve metabolik verimlilik üzerinde tam etki" },
    ],
    qualityIndicators: {
      good: [
        "Beyaz-krem renkli liyofilize toz",
        "Sulandırma sonrası berrak çözelti",
        "Saflık testi ile analiz sertifikası",
      ],
      bad: [
        "Renk değişimi göstermiş veya topaklanmış toz",
        "Sulandırma sonrası bulanık çözelti",
        "Görünür partikül madde",
      ],
    },
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    category: "Metabolik",
    tier: "preclinical",
    short:
      "Büyüme hormonunun yağ yakıcı bölgesinden türetilmiş fragman (Fragment 176-191). Obezite endikasyonunda Faz 2 çalışmalarında plasebodan üstünlük gösterememiştir.",
    mechanism:
      "Büyüme hormonunun lipoliz ile ilişkili C-terminal bölgesinden türetilmiş; kan şekerini etkilemeden yağ yakımını artırdığı öne sürülüyor.",
    primaryOutcomes: [
      "Faz 2 insan çalışmalarında plasebo karşısında anlamlı üstünlük gösterilemedi",
      "Geliştirme programı obezite endikasyonu için durduruldu",
    ],
    clinicalStatus:
      "Faz 2 sonrası geliştirmesi durduruldu, kanıt seviyesi düşük",
    dosingNote:
      "Sabah aç karnına subkutan uygulama; enjeksiyondan sonra 30 dakika yemek beklenmesi önerilir.",
    dosing: [
      { label: "Muhafazakar Başlangıç", amount: "200mcg", amountValue: 200, frequency: "Günde 1 kez (sabah, aç)", route: "Subkutan" },
      { label: "Standart Yağ Kaybı", amount: "250-300mcg", amountValue: 300, frequency: "Günde 1 kez (sabah, aç)", route: "Subkutan" },
      { label: "Güçlendirilmiş Protokol", amount: "400-500mcg", amountValue: 500, frequency: "Günde 1 kez (sabah, aç)", route: "Subkutan" },
    ],
    warnings: [
      "Gebelik veya emzirme dönemi",
      "WADA tarafından yasaklı — test edilen sporcular kaçınmalı",
      "Şiddetli enjeksiyon bölgesi reaksiyonu veya enfeksiyon belirtisi",
      "Olağandışı şişlik veya süregelen kızarıklık",
    ],
    sideEffects: [
      "Klinik çalışmalarda genellikle iyi tolere edildi",
      "Hafif enjeksiyon bölgesi reaksiyonu mümkün",
      "Kan şekeri veya insülin üzerinde bildirilen etki yok",
    ],
    interactions: [
      {
        compound: "Semaglutide",
        note: "Farklı yollar üzerinden tamamlayıcı kilo kaybı mekanizmaları.",
      },
      {
        compound: "CJC-1295",
        note: "AOD-9604, GH eksenini etkilemez; birlikte kullanılabilir.",
      },
      {
        compound: "Hyaluronik Asit",
        note: "Eklem sağlığı için birleştirildiğinde güçlendirilmiş kıkırdak onarımı.",
      },
      {
        compound: "Ipamorelin",
        note: "Farklı mekanizmalar; bilinen etkileşim yok.",
      },
      {
        compound: "İnsülin",
        note: "AOD-9604, tam hGH'nin aksine glukoz metabolizmasını etkilemez.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "Minimal fark edilir etki; bileşik birikiyor" },
      { period: "3-4. Hafta", result: "Vücut kompozisyonunda hafif değişimler başlayabilir" },
      { period: "5-8. Hafta", result: "Özellikle diyet ve egzersizle daha belirgin yağ kaybı" },
      { period: "8-12. Hafta", result: "Sürekli yağ azalması ve iyileşmiş vücut kompozisyonu" },
    ],
    qualityIndicators: {
      good: [
        "Homojen görünümlü beyaz liyofilize toz",
        "Sulandırma sonrası parçacıksız kristal berraklıkta çözelti",
        "HPLC ile >%98 saflık gösteren analiz sertifikası",
      ],
      bad: [
        "Renk değişimi göstermiş veya topaklanmış toz (sarı bozulmayı gösterir)",
        "Sulandırma sonrası bulanık çözelti",
        "Çökmüş veya nem hasarı görmüş görünüm",
      ],
    },
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    category: "Doku Onarımı",
    tier: "theoretical",
    short:
      "Timüs kaynaklı immün modülatör peptid. Bazı ülkelerde hepatit ve bağışıklık desteği amacıyla onaylı; ABD'de FDA onayı yok.",
    mechanism:
      "T hücre olgunlaşmasını ve immün yanıtı düzenlediği düşünülen timik peptid; doğal bağışıklık ve adaptif bağışıklık arayüzünde rol oynar.",
    primaryOutcomes: [
      "Bazı ülkelerde hepatit B/C ve immün destek endikasyonlarında onaylı kullanım",
      "ABD ve AB'de geniş RCT verisi sınırlı",
    ],
    clinicalStatus: "Bazı ülkelerde onaylı (Zadaxin), FDA onayı yok",
    dosingNote:
      "Subkutan enjeksiyon, %90-95 biyoyararlanıma sahip birincil yol. Standart doz haftada iki kez 1.6mg'dır.",
    dosing: [
      { label: "Standart Bağışıklık Desteği", amount: "1.6mg", amountValue: 1.6, frequency: "Haftada 2 kez", route: "Subkutan" },
      { label: "İdame / Koruyucu", amount: "1.6mg", amountValue: 1.6, frequency: "Haftada 2 kez", route: "Subkutan" },
    ],
    warnings: [
      "Organ nakli alıcıları (greft reddi riski)",
      "Gebelik ve emzirme dönemi",
      "Nakil alıcılarında greft reddi belirtileri",
      "Süregelen enjeksiyon bölgesi reaksiyonu veya enfeksiyon belirtileri",
      "Olağandışı bağışıklık sistemi aşırı aktivitesi",
    ],
    sideEffects: [
      "Hafif enjeksiyon bölgesi reaksiyonu (%10'dan az görülme sıklığı)",
      "Genellikle olağanüstü iyi bir güvenlik profiliyle tolere edilir",
    ],
    interactions: [
      {
        compound: "İmmünosüpresif Ajanlar",
        note: "Nakil hastalarında ölümcül greft reddi riski — kontrendikedir.",
      },
      {
        compound: "Kortikosteroidler",
        note: "Farmakodinamik antagonizma olası.",
      },
      {
        compound: "Aşılar",
        note: "Aşı immünojenisitesini artırır.",
      },
      {
        compound: "Kemoterapi",
        note: "Kemik iliği hasarına karşı koruyucu.",
      },
    ],
    expectedTimeline: [
      { period: "1-2. Hafta", result: "İlk bağışıklık sistemi aktivasyonu" },
      { period: "2-6. Hafta", result: "Gelişmiş bağışıklık fonksiyonu, azalan enfeksiyon riski" },
      { period: "6-12. Hafta", result: "Maksimum immünomodülatör fayda" },
      { period: "12+. Hafta", result: "Devam eden kullanımla sürdürülen bağışıklık desteği" },
    ],
    qualityIndicators: {
      good: [
        "Beyaz, kabarık liyofilize toz (flakon dibini dolduran)",
        "Sulandırma sonrası kristal berraklıkta çözelti (parçacık/bulanıklık yok)",
        "Parti numaraları ve son kullanma tarihiyle profesyonel etiketleme",
      ],
      bad: [
        "Renk değişimi göstermiş (sarı/kahverengi) veya çökmüş görünüm",
        "Sulandırma sonrası süregelen bulanıklık veya parçacık",
        "Profesyonel olmayan kaynak veya belirsiz etiketleme",
      ],
    },
  },
  {
    slug: "pt-141",
    name: "PT-141",
    category: "Estetik / Onarım",
    tier: "proven",
    short:
      "Bremelanotide. Melanokortin reseptör agonisti; kadınlarda hipoaktif cinsel istek bozukluğu için FDA onaylı (Vyleesi).",
    mechanism:
      "Merkezi melanokortin 4 reseptörü (MC4R) üzerinden etki eden, cinsel isteği düzenleyen nöral yolakları uyarır. Vasküler değil merkezi sinir sistemi kaynaklı bir mekanizmadır.",
    primaryOutcomes: [
      "Kadınlarda hipoaktif cinsel istek bozukluğunda FDA onaylı endikasyon",
      "Erkeklerde kullanım klinik dışı, sınırlı kontrollü veri",
    ],
    clinicalStatus: "FDA onaylı (Vyleesi, kadın endikasyonu)",
    evidenceMatrix: [
      { outcome: "Cinsel İstek (FSFI-desire)", tier: "proven" },
      { outcome: "İlişkili Sıkıntı (FSDS-DAO)", tier: "proven" },
    ],
    dosingNote:
      "Beklenen cinsel aktiviteden 45-60 dakika önce subkutan uygulanır; FDA onaylı yol budur.",
    dosing: [
      { label: "Düşük Test Dozu", amount: "0.5mg", amountValue: 0.5, frequency: "İhtiyaç halinde", route: "Subkutan" },
      { label: "Kadın HSDD (FDA onaylı)", amount: "1.75mg", amountValue: 1.75, frequency: "İhtiyaç halinde, 24 saatte maks. 1 doz", route: "Subkutan" },
      { label: "Erkek Erektil Disfonksiyon", amount: "1-2mg", amountValue: 2, frequency: "İhtiyaç halinde, 45-60 dk önce", route: "Subkutan" },
    ],
    warnings: [
      "Kontrolsüz hipertansiyon",
      "Kardiyovasküler hastalık",
      "Nitrat ilaçlarının kullanımı",
      "Gebelik veya emzirme dönemi",
      "Belirgin kan basıncı düşüşü veya baş dönmesi",
      "Göğüs ağrısı veya düzensiz kalp atışı",
      "4 saati aşan uzamış ereksiyon",
    ],
    sideEffects: [
      "Bulantı (%40)",
      "Yüz kızarması (%20)",
      "Baş ağrısı (%11)",
      "Enjeksiyon bölgesi reaksiyonları",
    ],
    interactions: [
      {
        compound: "Sildenafil/Tadalafil",
        note: "PT-141 merkezi, PDE5 inhibitörleri periferik etki gösterir — birikimli tansiyon etkisi izlenmeli.",
      },
      {
        compound: "Nitratlar",
        note: "Şiddetli hipotansiyon riski — kalp hastalığı ilaçlarıyla kontrendikedir.",
      },
      {
        compound: "Alkol",
        note: "Her ikisi de tansiyonu düşürür ve yüz kızarmasına neden olur — aşırı hipotansiyondan kaçınmak için tüketim sınırlanmalı.",
      },
    ],
  },
  {
    slug: "ghrp-2",
    name: "GHRP-2",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "Ghrelin reseptör agonisti büyüme hormonu salgılatıcı peptid. Mekanizma iyi tanımlı, uzun dönem insan verisi sınırlı.",
    mechanism:
      "Ghrelin reseptörü üzerinden hipofizden büyüme hormonu salınımını uyarır; iştah artışına da yol açabilir.",
    primaryOutcomes: [
      "Büyüme hormonu ve IGF-1 düzeylerinde artış",
      "Uzun dönem güvenlik ve etkinlik verisi sınırlı",
    ],
    clinicalStatus: "Mekanizma iyi tanımlı, kontrollü insan çalışması sınırlı",
    dosingNote:
      "Aç karnına subkutan enjeksiyon, optimal GH salınımı için önerilir. Yükseltilmiş GH düzeyini korumak için günde birden fazla doz yaygındır.",
    dosing: [
      { label: "GH Optimizasyonu", amount: "100-150mcg", amountValue: 150, frequency: "Günde 2-3 kez", route: "Subkutan" },
      { label: "Güçlendirilmiş Sonuçlar", amount: "200-300mcg", amountValue: 300, frequency: "Günde 2-3 kez", route: "Subkutan" },
    ],
    warnings: [
      "Aktif kanser veya kanser öyküsü",
      "Gebelik veya emzirme dönemi",
      "Hipofiz bozuklukları",
      "Diyabetik retinopati",
      "Yarışan sporcular için WADA tarafından yasaklı",
      "Şiddetli veya süregelen baş ağrısı",
    ],
    sideEffects: [
      "İştah artışı (GHRP-6'ya göre daha az)",
      "Hafif su tutulumu",
      "Ekstremitelerde karıncalanma veya uyuşma",
      "Enjeksiyon sonrası yorgunluk veya halsizlik",
    ],
    interactions: [
      {
        compound: "CJC-1295",
        note: "Güçlü sinerji; GHRH + GHRP kombinasyonu GH salınımını belirgin şekilde artırır.",
      },
      {
        compound: "Ipamorelin",
        note: "Her ikisi de GHRP'dir; genellikle birlikte değil dönüşümlü kullanılır.",
      },
    ],
  },
  {
    slug: "hexarelin",
    name: "Hexarelin",
    category: "Büyüme / GH",
    tier: "preclinical",
    short:
      "Güçlü bir ghrelin reseptör agonisti. Hayvan çalışmalarında kardiyoprotektif etkiler gösterdi; insan verisi sınırlı.",
    mechanism:
      "Ghrelin reseptörü üzerinden güçlü büyüme hormonu salınımı tetikler; hayvan modellerinde doğrudan kardiyak dokuda koruyucu etki gösterdiği bildirilmiştir.",
    primaryOutcomes: [
      "Hayvan modellerinde kardiyoprotektif etki bildirimleri",
      "İnsan RCT verisi sınırlı",
    ],
    clinicalStatus: "Preklinik ağırlıklı, insan verisi sınırlı",
    dosingNote:
      "Subkutan veya kas içi enjeksiyon, aç karnına uygulanır. Proteolitik enzimlere karşı dirençlidir ve hızlı emilir.",
    dosing: [
      { label: "GH Optimizasyonu", amount: "100mcg", amountValue: 100, frequency: "Günde 2-3 kez", route: "Subkutan/Kas içi" },
      { label: "Güçlendirilmiş Sonuçlar", amount: "200mcg", amountValue: 200, frequency: "Günde 2-3 kez", route: "Subkutan/Kas içi" },
      { label: "Kardiyoprotektif Protokol", amount: "100-200mcg", amountValue: 200, frequency: "Günde 1-2 kez", route: "Subkutan" },
    ],
    warnings: [
      "Aktif kanser veya kanser öyküsü",
      "Gebelik veya emzirme dönemi",
      "Hipofiz bozuklukları",
      "Yarışan sporcular için WADA tarafından yasaklı",
      "Şiddetli veya süregelen baş ağrısı",
    ],
    sideEffects: [
      "İştah artışı (GHRP-6'ya göre daha az)",
      "Su tutulumu",
      "Karıncalanma veya uyuşma",
      "Enjeksiyon sonrası yorgunluk",
    ],
    interactions: [
      {
        compound: "CJC-1295",
        note: "Güçlü sinerji; kombinasyon, tekil etkilerin toplamından daha büyük bir GH yanıtı üretir.",
      },
      {
        compound: "GHRP-2",
        note: "Benzer mekanizma; genellikle birlikte değil dönüşümlü kullanılır.",
      },
    ],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    category: "Büyüme / GH",
    tier: "proven",
    short:
      "GHRH analoğu. HIV ile ilişkili lipodistrofide viseral yağ azaltımı için FDA onaylı (Egrifta).",
    mechanism:
      "Büyüme hormonu salgılatıcı hormon (GHRH) analoğu; hipofizden doğal büyüme hormonu salınımını fizyolojik yolla artırır.",
    primaryOutcomes: [
      "HIV ilişkili lipodistrofide viseral yağ azalması (FDA onaylı endikasyon)",
      "IGF-1 düzeylerinde artış",
    ],
    clinicalStatus: "FDA onaylı (Egrifta, lipodistrofi endikasyonu)",
    evidenceMatrix: [
      { outcome: "Visseral Yağ Dokusu", tier: "proven" },
      { outcome: "Karaciğer Yağ Oranı", tier: "proven" },
      { outcome: "Yağsız Vücut Kütlesi", tier: "proven" },
    ],
    relatedArticleSlug: "tesamorelin-viseral-yag-meta-analiz",
    dosingNote:
      "Karın bölgesine (göbekten ±5cm uzakta) subkutan enjeksiyon. GH sirkadiyen ritmine uyum için akşam uygulaması tercih edilir.",
    dosing: [
      { label: "HIV Lipodistrofi (FDA onaylı)", amount: "1.4mg", amountValue: 1.4, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Viseral Yağ Azaltımı", amount: "2mg", amountValue: 2, frequency: "Günde 1 kez", route: "Subkutan" },
    ],
    warnings: [
      "Aktif malignite",
      "Hipofiz bozuklukları",
      "Gebelik",
      "Diyabet gelişimi veya şiddetli glukoz intoleransı (HbA1c ≥%6.5)",
      "Aşırı IGF-1 yükselmesi ile birlikte akromegali belirtileri",
    ],
    sideEffects: [
      "Enjeksiyon bölgesi reaksiyonları (%17)",
      "Eklem ağrısı (%13)",
      "Su tutulumu",
    ],
    interactions: [
      {
        compound: "Ipamorelin",
        note: "Sinerjistik GH uyarımı; IGF-1 düzeyleri izlenmelidir.",
      },
      {
        compound: "İnsülin",
        note: "Diyabet riskinde 3,3 kat artış; kan şekeri yakından izlenmelidir.",
      },
      {
        compound: "Büyüme Hormonu",
        note: "Gereksiz tekrar; akromegali benzeri etki riski.",
      },
    ],
  },
  {
    slug: "thymalin",
    name: "Thymalin",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Rusya kaynaklı timik bioregülatör peptid karışımı. Epithalon ile aynı araştırma geleneğinden; bağımsız modern RCT bulunmuyor.",
    mechanism:
      "Timüs dokusundan izole edilmiş peptid karışımı; immün fonksiyon ve hücresel yaşlanma belirteçleri üzerinde düzenleyici etki öne sürülüyor.",
    primaryOutcomes: [
      "Eski Rusya kaynaklı çalışmalarda immün fonksiyonda iyileşme bildirimleri",
      "Bağımsız modern RCT bulunmuyor",
    ],
    clinicalStatus: "Preklinik aşama, bağımsız doğrulama sınırlı",
    dosingNote:
      "Kısa 5-10 günlük döngüler halinde kas içi veya subkutan uygulanır; sıklıkla Epithalon veya Vilon gibi diğer biyoregülatörlerle birlikte kullanılır.",
    dosing: [
      { label: "Standart Döngü", amount: "10mg", amountValue: 10, frequency: "Günde 1 kez, 5-10 gün", route: "Kas içi / Subkutan" },
      { label: "İdame", amount: "10mg", amountValue: 10, frequency: "Yılda 1-2 döngü", route: "Kas içi / Subkutan" },
    ],
    warnings: [
      "Otoimmün hastalıklar (dikkatli kullanılmalı)",
      "Organ nakli alıcıları (immünosüpresyon gerektirir)",
      "Gebelik veya emzirme dönemi",
      "Bilinen aşırı duyarlılık",
    ],
    sideEffects: [
      "Hafif enjeksiyon bölgesi reaksiyonu",
      "Pratik olarak yan etki bildirilmemiştir",
    ],
    interactions: [
      {
        compound: "Epithalon",
        note: "Birlikte kullanımda, yalnızca Thymalin'e kıyasla (2,0 kat) 4,1 kat mortalite azalması bildirildi (hayvan çalışması).",
      },
      {
        compound: "Vilon",
        note: "Güçlendirilmiş sistemik toparlanma ve bağışıklık desteği için sıklıkla birlikte kullanılır.",
      },
      {
        compound: "Thymosin Alpha-1",
        note: "Benzer timik köken; farklı mekanizmalar birbirini tamamlayabilir.",
      },
    ],
  },
  {
    slug: "humanin",
    name: "Humanin",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Mitokondriyal DNA kaynaklı sinyal peptidi. Akademik longevity araştırmalarında ilgi görüyor; insan RCT verisi yok.",
    mechanism:
      "Mitokondriyal DNA'dan kodlanan, hücre koruyucu (sitoprotektif) sinyal yolaklarını aktive ettiği düşünülen bir mikropeptid.",
    primaryOutcomes: [
      "Hücre kültürü ve hayvan modellerinde koruyucu etki bildirimleri",
      "İnsan RCT verisi yok",
    ],
    clinicalStatus: "Preklinik aşama, akademik araştırma düzeyinde",
    dosingNote:
      "Faydaları yavaş ve hücreseldir; haftalar-aylar içinde hissedilir. Daha güçlü analog HNG, doğal humaninden 1000 kat daha potenttir.",
    dosing: [
      { label: "Longevity / Anti-Aging", amount: "1-3mg", amountValue: 3, frequency: "Haftada 2 kez", route: "Subkutan" },
      { label: "Nöroproteksiyon", amount: "1-5mg", amountValue: 5, frequency: "Haftada 2-3 kez", route: "Subkutan" },
    ],
    warnings: [
      "Aktif kanser (anti-apoptotik etkilerle teorik endişe)",
      "Gebelik veya emzirme dönemi",
      "Peptid bileşenlerine aşırı duyarlılık",
    ],
    sideEffects: [
      "Enjeksiyon bölgesi reaksiyonları",
      "Başlangıçta hafif yorgunluk",
      "Baş ağrısı (nadir)",
    ],
    interactions: [
      {
        compound: "MOTS-c",
        note: "Her ikisi de mitokondri kaynaklıdır, tamamlayıcı longevity ve metabolik faydalar sunar.",
      },
      {
        compound: "SS-31 (Elamipretide)",
        note: "Her ikisi de mitokondriyal fonksiyonu hedefler; hücresel sağlık için birikimli fayda olabilir.",
      },
    ],
  },
  {
    slug: "dihexa",
    name: "Dihexa",
    category: "Kognitif",
    tier: "preclinical",
    short:
      "HGF/c-Met yolağını hedefleyen deneysel nootropik. Hayvan modellerinde sinaptik etkiler bildirildi; insan verisi yok.",
    mechanism:
      "Hepatosit büyüme faktörü (HGF) yolağını güçlendirdiği ve sinaptik bağlantı yoğunluğunu artırdığı öne sürülen deneysel bir bileşik.",
    primaryOutcomes: [
      "Hayvan modellerinde bildirilen etki büyüklükleri bağımsız olarak geniş çapta doğrulanmadı",
      "İnsan verisi yok",
    ],
    clinicalStatus: "Erken preklinik aşama, insan verisi bulunmuyor",
    dosingNote:
      "Oral kapsül/tablet formu en yaygın olanıdır, sabah aç veya tok karnına alınabilir. Yeniden sulandırma gerekmez.",
    dosing: [
      { label: "Düşük Doz İdame", amount: "5mg", amountValue: 5, frequency: "Günde 1 kez (sabah)", route: "Oral" },
      { label: "Standart Bilişsel Destek", amount: "8-10mg", amountValue: 10, frequency: "Günde 1 kez (sabah)", route: "Oral" },
      { label: "Yoğun Öğrenme Protokolü", amount: "10-15mg", amountValue: 15, frequency: "Günde 1 kez (sabah)", route: "Oral" },
    ],
    warnings: [
      "FDA onaylı değil — yalnızca araştırma bileşiği",
      "c-Met aktivasyonu üzerinden teorik kanser riski",
      "Kanser öyküsü (c-Met yolağı nedeniyle kaçınılmalı)",
      "Gebelik veya emzirme dönemi",
      "Uzun dönem insan güvenlik verisi yok",
      "Artan anksiyete veya panik atak",
    ],
    sideEffects: [
      "Baş ağrısı (en sık bildirilen yan etki)",
      "Anksiyete veya aşırı uyarılma",
      "Günün geç saatinde dozlandığında uyku bozulması",
      "Zihinsel netlikte artış",
    ],
    interactions: [
      {
        compound: "Semax",
        note: "Güçlendirilmiş bilişsel fayda; aşırı uyarılma açısından izlenmeli.",
      },
      {
        compound: "Cerebrolysin",
        note: "Her ikisi de güçlü nöroaktiftir; aşırı uyarılmaya neden olabilir.",
      },
      {
        compound: "BPC-157",
        note: "Farklı mekanizmalar; bilinen olumsuz etkileşim yok.",
      },
    ],
  },
  {
    slug: "cerebrolysin",
    name: "Cerebrolysin",
    category: "Kognitif",
    tier: "theoretical",
    short:
      "Domuz beyninden elde edilen nöropeptid karışımı. Bazı ülkelerde inme ve demans desteğinde kullanılıyor; sonuçlar çalışmalar arasında tutarsız.",
    mechanism:
      "Nörotrofik faktörlere benzer etkiyle nöroplastisiteyi desteklediği düşünülen, çoklu peptid fraksiyonundan oluşan bir karışım.",
    primaryOutcomes: [
      "Bazı RCT'lerde bilişsel skorlarda iyileşme",
      "Çalışmalar arasında sonuçlar tutarsız, ABD/AB onayı yok",
    ],
    clinicalStatus:
      "Bazı ülkelerde klinik kullanımda, sonuçlar karışık",
    dosingNote:
      "IV/IM uygulama, endikasyona göre büyük farklılık gösterir (akut inme, travmatik beyin hasarı, Alzheimer desteği farklı doz/süre gerektirir); bu nedenle tek bir doz merdiveni yerine mutlaka tıbbi gözetim altında endikasyona özgü protokol uygulanır.",
    warnings: [
      "Epilepsi",
      "Ciddi böbrek yetmezliği",
      "Domuz kaynaklı ürünlere şiddetli alerjik reaksiyon öyküsü",
      "Şiddetli alerjik reaksiyon (anafilaksi, ciddi döküntü)",
      "Yeni başlayan nöbet aktivitesi",
    ],
    sideEffects: [
      "Genellikle iyi tolere edilir",
      "Tedavinin erken döneminde olası hafif baş dönmesi veya ajitasyon",
    ],
    interactions: [
      {
        compound: "SSRI'lar",
        note: "Potansiyel birikimli nörotropik etkiler; güçlenmiş antidepresan etkisi açısından izlenmeli.",
      },
      {
        compound: "Amino Asit Solüsyonları",
        note: "Reçete bilgisine göre kontrendikedir; aynı infüzyonda karıştırılmamalıdır.",
      },
    ],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "Seçici ghrelin reseptör agonisti. Kortizol ve prolaktini belirgin etkilemeden büyüme hormonu salınımını uyardığı öne sürülen, iyi tanımlı bir peptid.",
    mechanism:
      "Ghrelin reseptörü üzerinden hipofizden büyüme hormonu salınımını seçici olarak uyarır; CJC-1295 gibi GHRH analoglarıyla sıklıkla birlikte kullanılır.",
    primaryOutcomes: [
      "Büyüme hormonu ve IGF-1 düzeylerinde artış",
      "Seçiciliği nedeniyle daha sınırlı yan etki profili öne sürülüyor",
      "Uzun dönem kontrollü insan verisi sınırlı",
    ],
    clinicalStatus: "Mekanizma iyi tanımlı, geniş kontrollü insan çalışması sınırlı",
    relatedArticleSlug: "gh-salgilaticilar-ipamorelin-sermorelin",
    dosingNote:
      "Aç karnına, uyku öncesi enjeksiyon uyku faydaları için optimaldir.",
    dosing: [
      { label: "Genel Sağlık & Longevity", amount: "200mcg", amountValue: 200, frequency: "Günde 1 kez, yatmadan önce", route: "Subkutan" },
      { label: "Vücut Kompozisyonu", amount: "250-300mcg", amountValue: 300, frequency: "Günde 2 kez (sabah, antrenman öncesi)", route: "Subkutan" },
    ],
    warnings: [
      "Gebelik veya emzirme dönemi",
      "Aktif kanser veya kanser öyküsü",
      "Ciddi böbrek veya karaciğer hastalığı",
      "Reseptör desensitizasyonu belirtileri (3-4 ay sonra azalan yanıt)",
      "Olağandışı eklem ağrısı veya şişlik",
    ],
    sideEffects: [
      "Enjeksiyondan 20-30 dakika sonra hafif açlık hissi artışı",
      "Yatmadan önce alındığında hafif uyku hali",
      "Hafif su tutulumu",
    ],
    interactions: [
      {
        compound: "CJC-1295",
        note: "GH salınımını optimal hormon döngüleri için uzatır. Popüler kombinasyon.",
      },
      {
        compound: "BPC-157",
        note: "GH reseptör yukarı regülasyonunu ve etkinliğini artırır.",
      },
      {
        compound: "Sermorelin",
        note: "Her ikisi de GH'yi uyarır; reseptör aşırı doygunluğundan kaçınmak için birini seçin.",
      },
    ],
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "GHRH'nin ilk 29 aminoasitinden oluşan analog. Geçmişte tanısal amaçla onaylı kullanımı olmuş; doğal büyüme hormonu salınımını fizyolojik yolla uyarır.",
    mechanism:
      "GHRH analoğu; hipofizin kendi büyüme hormonu salınımını fizyolojik geri bildirim döngüsünü koruyarak uyarır.",
    primaryOutcomes: [
      "Büyüme hormonu ve IGF-1 düzeylerinde artış",
      "Geçmişte pediatrik tanısal kullanımı onaylanmış, ilgili ürün piyasadan çekilmiştir",
    ],
    clinicalStatus: "Mekanizma iyi tanımlı, güncel geniş etkinlik verisi sınırlı",
    relatedArticleSlug: "gh-salgilaticilar-ipamorelin-sermorelin",
    dosingNote:
      "Yatmadan önce subkutan enjeksiyon, doğal gece GH atımlarıyla uyum sağlar. Enjeksiyondan en az 2 saat önce yemekten kaçınılması önerilir (karbonhidratlar GH yanıtını körelttiği için).",
    dosing: [
      { label: "Vücut Kompozisyonu", amount: "200mcg", amountValue: 200, frequency: "Haftada 5 gün", route: "Subkutan" },
      { label: "Anti-Aging / Longevity", amount: "200-300mcg", amountValue: 300, frequency: "Yatmadan önce, günde 1 kez", route: "Subkutan" },
      { label: "Atletik Performans", amount: "300-500mcg", amountValue: 500, frequency: "Yatmadan önce, günde 1 kez", route: "Subkutan" },
    ],
    warnings: [
      "Aktif malignite",
      "Hipofiz tümörleri",
      "Gebelik",
      "Hipofiz tümörü büyümesi belirtileri (baş ağrısı, görme değişiklikleri)",
      "Şiddetli enjeksiyon bölgesi reaksiyonu veya genel alerjik yanıt",
      "Kontrolsüz diyabet veya belirgin glukoz intoleransı",
    ],
    sideEffects: [
      "Enjeksiyon bölgesi reaksiyonları (hastaların %16,7'sinde — genellikle hafif)",
      "Burun tahrişi (intranazal yolda)",
    ],
    interactions: [
      {
        compound: "Ipamorelin",
        note: "3-5 kat GH salınım artışı sağlayan mükemmel kombinasyon.",
      },
      {
        compound: "CJC-1295",
        note: "Çok etkili kombinasyon — CJC-1295 sürdürülebilir 6-8 günlük salınım sağlarken sermorelin ani pulsatil etki sunar.",
      },
      {
        compound: "İnsülin",
        note: "GH insülin etkisine antagonisttir; kombinasyon yakından izlenmelidir.",
      },
    ],
  },
  {
    slug: "thymosin-beta-4",
    name: "Thymosin Beta-4",
    category: "Doku Onarımı",
    tier: "preclinical",
    short:
      "Hücre iskeleti düzenleyici bir protein. TB-500'ün türetildiği ana molekül; doku rejenerasyonundaki rolü büyük ölçüde hayvan modellerinde araştırılıyor.",
    mechanism:
      "Aktin bağlayarak hücre göçünü ve doku onarımını desteklediği düşünülen, doğal olarak bulunan bir peptid. TB-500, bunun sentetik bir fragmanıdır.",
    primaryOutcomes: [
      "Hayvan modellerinde kardiyak ve dermal doku onarımı bildirimleri",
      "İnsan RCT verisi yok",
    ],
    clinicalStatus: "Preklinik aşama",
    relatedArticleSlug: "preklinik-ne-anlama-gelir",
    dosingNote:
      "Dozaj hedefe göre büyük farklılık gösterir (akut yara iyileşmesi, kardiyak koruma, nörolojik toparlanma farklı doz/yol gerektirir); tek bir doz merdiveni yerine hedefe özgü protokol uygulanır, tamamı insan RCT verisinden değil hayvan modellerinden türetilmiştir.",
    warnings: [
      "Aktif kemoterapi tedavisi",
      "Peptidlere karşı şiddetli sistemik alerji",
      "Şiddetli enjeksiyon bölgesi reaksiyonu veya süregelen inflamasyon",
      "Sistemik alerjik reaksiyon belirtileri (döküntü, nefes darlığı)",
    ],
    sideEffects: [
      "Hafif enjeksiyon bölgesi reaksiyonları",
      "Enjeksiyon bölgesinde lokal inflamasyon",
    ],
    interactions: [
      {
        compound: "TB-500",
        note: "TB-500, Thymosin Beta-4'ün biyoaktif fragmanıdır. Birlikte kullanım tam uzunluklu peptid faydalarını yoğunlaştırılmış biyoaktif etkiyle birleştirir.",
      },
      {
        compound: "Antikoagülanlar",
        note: "Anjiyogenezi teşvik eder, bu da kanama riskini etkileyebilir; koagülasyon parametreleri izlenmelidir.",
      },
      {
        compound: "Kemoterapi",
        note: "Kanser hastalarında anjiyogenezi teşvik etme konusunda teorik endişe; aktif kemoterapi sırasında kaçınılmalıdır.",
      },
    ],
  },
  {
    slug: "dsip",
    name: "DSIP",
    category: "Kognitif",
    tier: "preclinical",
    short:
      "Delta uyku indükleyici peptid. Uyku mimarisi ve stres yanıtı üzerindeki etkileri onlarca yıldır araştırılıyor ama insan verisi hâlâ sınırlı ve tutarsız.",
    mechanism:
      "Merkezi sinir sisteminde uyku düzenlenmesi ve nöroendokrin modülasyonla ilişkilendirilen bir nöropeptid; kesin mekanizması tam aydınlatılmamıştır.",
    primaryOutcomes: [
      "Eski çalışmalarda uyku ve stres belirteçleri üzerinde etki bildirimleri",
      "Modern kontrollü insan verisi sınırlı ve tutarsız",
    ],
    clinicalStatus: "Preklinik / erken araştırma aşaması",
    dosingNote:
      "Standart yol subkutan enjeksiyondur; yatmadan 30-60 dakika önce alınması önerilir.",
    dosing: [
      { label: "Uyku Desteği", amount: "100-200mcg", amountValue: 200, frequency: "Her gece", route: "Subkutan" },
      { label: "Stres Yönetimi", amount: "150mcg", amountValue: 150, frequency: "Akşam", route: "Subkutan" },
      { label: "Kronik Ağrı Desteği", amount: "250-300mcg", amountValue: 300, frequency: "Günde 1 kez", route: "Subkutan veya IV" },
    ],
    warnings: [
      "Etkiler bilinene kadar araç kullanmaktan kaçının",
      "Gebelik veya emzirme dönemi",
      "Aşırı gündüz sedasyonu",
      "Paradoksal uykusuzluk veya ajitasyon",
      "Süregelen baş ağrıları",
    ],
    sideEffects: [
      "Genellikle iyi tolere edilir, minimal yan etki",
      "Başlangıçta hafif uyuşukluk veya baş dönmesi (bazı kullanıcılarda)",
      "Hassas bireylerde ara sıra baş ağrısı",
      "Çalışmalarda tolerans veya bağımlılık bildirilmedi",
    ],
    interactions: [
      {
        compound: "Selank",
        note: "Tamamlayıcı anksiyolitik etkiler.",
      },
      {
        compound: "Semax",
        note: "Farklı mekanizmalar; 24 saatlik işlevi optimize edebilir.",
      },
      {
        compound: "Epithalon",
        note: "Her ikisi de sirkadiyen düzenlemeyi ve uyku kalitesini destekler.",
      },
    ],
  },
  {
    slug: "5-amino-1mq",
    name: "5-Amino-1MQ",
    category: "Metabolik",
    tier: "preclinical",
    short:
      "NNMT enzim inhibitörü küçük molekül. Yağ hücresi metabolizması üzerindeki etkileri hayvan modellerinde araştırılıyor; insan verisi bulunmuyor.",
    mechanism:
      "Nikotinamid N-metiltransferaz (NNMT) enzimini inhibe ederek yağ hücresi enerji metabolizmasını etkilediği öne sürülen deneysel bir bileşik.",
    primaryOutcomes: [
      "Hayvan modellerinde yağ kütlesi ve metabolik belirteçlerde değişim bildirimleri",
      "İnsan verisi yok",
    ],
    clinicalStatus: "Erken preklinik aşama, insan verisi bulunmuyor",
    dosingNote:
      "Oral alınır, emilimi artırmak ve gastrointestinal etkileri azaltmak için yemekle birlikte alınması önerilir. Tutarlı günlük NAD+ düzeyleri için düzenli saatte dozlama önerilir.",
    dosing: [
      { label: "Muhafazakar Başlangıç", amount: "25mg", amountValue: 25, frequency: "Günde 1 kez (yemekle)", route: "Oral" },
      { label: "Standart Başlangıç", amount: "50mg", amountValue: 50, frequency: "Günde 1 kez (yemekle)", route: "Oral" },
      { label: "Tipik İdame", amount: "75mg", amountValue: 75, frequency: "Günde 1 kez (yemekle)", route: "Oral" },
      { label: "Maksimum Doz", amount: "100mg", amountValue: 100, frequency: "Günde 1 kez (yemekle)", route: "Oral" },
    ],
    warnings: [
      "Gebelik veya emzirme dönemi",
      "Önceden var olan metabolik rahatsızlıklar (hekime danışılmalı)",
      "Şiddetli gastrointestinal rahatsızlık veya süregelen bulantı",
      "Olağandışı yorgunluk veya güçsüzlük (beklenen etkinin tersi)",
      "Süregelen baş ağrısı veya baş dönmesi",
      "Uyku bozuklukları veya uykusuzluk",
    ],
    sideEffects: [
      "Genellikle minimal yan etki",
      "Ara sıra hafif gastrointestinal uyum",
      "Günün geç saatinde dozlandığında olası uyku rahatsızlığı",
    ],
    interactions: [
      {
        compound: "NAD+ / NMN",
        note: "NAD+ öncüllerini yıkımdan koruyarak üretimi destekleyerek sinerjistik çalışabilir.",
      },
      {
        compound: "Metformin",
        note: "Her ikisi de metabolik yolları etkiler; kombinasyon etkiyi güçlendirebilir ancak dikkatli izleme gerektirir.",
      },
      {
        compound: "BPC-157",
        note: "Bilinen etkileşim yok; farklı mekanizmalar tamamlayıcı fayda sağlayabilir.",
      },
    ],
  },
  {
    slug: "hgh",
    name: "İnsan Büyüme Hormonu (HGH)",
    category: "Büyüme / GH",
    tier: "proven",
    short:
      "Sentetik somatropin. Çocuk ve yetişkinlerde büyüme hormonu eksikliğinde onaylı tedavi; longevity amaçlı off-label kullanımı farklı ve daha zayıf bir kanıt düzeyine dayanır.",
    mechanism:
      "GH reseptörlerine bağlanarak JAK2-STAT5 sinyal yolunu tetikler; doğrudan lipoliz ve protein sentezini, IGF-1 aracılığıyla dolaylı büyüme etkilerini uyarır.",
    primaryOutcomes: [
      "Büyüme hormonu eksikliğinde büyüme ve metabolik düzelme (onaylı endikasyon)",
      "Yağsız vücut kütlesinde artış",
      "Anti-aging amaçlı off-label kullanım için kontrollü insan verisi sınırlı",
    ],
    clinicalStatus: "FDA onaylı (GH eksikliği); longevity kullanımı onay dışı",
    evidenceMatrix: [
      { outcome: "Büyüme Hormonu Eksikliği Tedavisi", tier: "proven" },
    ],
    dosingNote:
      "Subkutan enjeksiyon tek etkili yoldur. Sabah aç karnına enjeksiyon yağ yakımını en üst düzeye çıkarır; akşam enjeksiyonu doğal gece GH atımını taklit eder.",
    dosing: [
      { label: "Tıbbi GH Eksikliği (idame)", amount: "0.4-0.8mg", amountValue: 0.8, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Anti-Aging / Wellness", amount: "0.33-0.67mg", amountValue: 0.67, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Vücut Kompozisyonu", amount: "0.67-1.33mg", amountValue: 1.33, frequency: "Günde 1-2 kez", route: "Subkutan" },
      { label: "Performans (Yüksek Risk)", amount: "1.33-2.67mg", amountValue: 2.67, frequency: "Günde 2 kez, bölünmüş", route: "Subkutan" },
    ],
    warnings: [
      "Aktif kanser (tümör büyümesini hızlandırabilir)",
      "Akut kritik hastalık (yoğun bakım hastalarında artmış mortalite)",
      "Gebelik/emzirme dönemi",
      "Ciddi veya kötüleşen karpal tünel semptomları",
      "Diyabet belirtileri (artan susama, sık idrara çıkma, bulanık görme)",
      "Ciddi ödem (yüz, el veya ayak şişmesi)",
      "Yeni oluşan kitle veya hızla büyüyen ben",
    ],
    sideEffects: [
      "Su tutulumu ve sıvı birikimi",
      "Eklem ağrısı ve sertliği",
      "Karpal tünel sendromu (genellikle doz azaltmayla düzelir)",
      "Baş ağrısı",
      "Ellerde uyuşma/karıncalanma",
    ],
    interactions: [
      {
        compound: "İnsülin",
        note: "HGH insülin duyarlılığını azaltır; diyabetiklerde artan insülin dozu gerekebilir.",
      },
      {
        compound: "IGF-1 LR3",
        note: "Sinerjistik ancak dikkat: artan hipoglisemi ve yan etki riskiyle güçlenmiş etkiler.",
      },
      {
        compound: "Tiroid Hormonları (T3/T4)",
        note: "T4'ten T3'e dönüşümü artırır; hastaların %36-47'sinde gizli hipotiroidizmi ortaya çıkarır.",
      },
      {
        compound: "Semaglutide/Tirzepatide",
        note: "GLP-1 agonistleri, HGH tedavisi sırasında insülin direncinin yönetilmesine yardımcı olur.",
      },
    ],
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "IGF-1'in uzun etkili, bağlayıcı proteinlerce daha az tutulan bir analoğu. Kas hipertrofisi ve doku onarımını hedefleyen bir araştırma bileşiği; kontrollü insan verisi yok.",
    mechanism:
      "IGF-1 reseptörünü tam agonist olarak aktive eder, PI3K/Akt/mTOR ve MAPK/ERK yollarını uyarır; yapısal değişiklik, bağlayıcı proteinlerce tutulmasını azaltarak dolaşımdaki serbest düzeyi uzatır.",
    primaryOutcomes: [
      "Hücre ve hayvan modellerinde kas hipertrofisi bildirimleri",
      "Tendon/bağ iyileşmesinde mekanistik ilgi",
      "Kontrollü insan klinik çalışması yok",
    ],
    clinicalStatus: "Preklinik ağırlıklı, insan verisi yok",
    dosingNote:
      "İnsan kullanımı için hiçbir zaman onaylanmamıştır — yalnızca araştırma kimyasalıdır. Kaynak protokoller, enjeksiyon sonrası hipoglisemiyi önlemek için hızlı karbonhidrat alımını zorunlu tutar; yatmadan önce asla enjekte edilmemesi belirtilir.",
    dosing: [
      { label: "Başlangıç Protokolü", amount: "20-30mcg", amountValue: 30, frequency: "Günde 1 kez, antrenman sonrası", route: "Subkutan/Kas içi" },
      { label: "Orta Düzey", amount: "40-60mcg", amountValue: 60, frequency: "Günde 1 kez", route: "Subkutan/Kas içi" },
      { label: "İleri Düzey", amount: "80-100mcg", amountValue: 100, frequency: "Günde 1 kez veya sabah/akşam bölünmüş", route: "Subkutan/Kas içi" },
    ],
    warnings: [
      "İnsan kullanımı için ONAYLANMAMIŞTIR — yalnızca araştırma kimyasalı",
      "Kanser öyküsü veya tanı almamış büyümeler",
      "Organ hipertrofisine (kalp, bağırsak) neden olabilir",
      "WADA tarafından yasaklı — pozitif dopingi testine yol açar",
      "Karbonhidrat alımına rağmen şiddetli veya tekrarlayan hipoglisemi",
      "Olağandışı büyüme, kitle veya hızlı ben değişimi",
    ],
    sideEffects: [
      "Hipoglisemi (30 saate kadar sürebilir) — KRİTİK",
      "Su tutulumu",
      "Eklem sertliği",
      "Kas ağrısı",
      "Antrenman sırasında artan pompa hissi",
    ],
    interactions: [
      {
        compound: "İnsan Büyüme Hormonu (HGH)",
        note: "Aşırı IGF-1 düzeyi oluşturur; kombinasyondan kaçınılmalıdır.",
      },
      {
        compound: "İnsülin",
        note: "Sinerjistik hipoglisemik etkiler hayatı tehdit edebilir.",
      },
      {
        compound: "BPC-157",
        note: "Tamamlayıcı iyileşme mekanizmaları.",
      },
    ],
  },
  {
    slug: "ghrp-6",
    name: "GHRP-6",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "Ghrelin reseptörünü (GHS-R1a) aktive ederek büyüme hormonu salınımını uyaran bir sekretagog. Belirgin iştah artışı en tutarlı bildirilen etkisidir.",
    mechanism:
      "GHS-R1a reseptörüne bağlanarak hipotalamus-hipofiz ekseninden pulsatil GH salınımını tetikler; aynı reseptör üzerinden ghrelin salınımını da artırarak iştahı belirgin şekilde yükseltir.",
    primaryOutcomes: [
      "Doğal GH salınımında artış",
      "IGF-1 düzeylerinde yükselme",
      "Belirgin iştah artışı (yan etki olarak da izlenir)",
    ],
    clinicalStatus: "Sınırlı insan verisi, çoğunlukla mekanistik",
    dosingNote:
      "Aç karnına subkutan uygulanmalıdır — yükselmiş kan şekeri veya insülin GH salınımını belirgin şekilde köreltir.",
    dosing: [
      { label: "GH Optimizasyonu", amount: "100mcg", amountValue: 100, frequency: "Günde 2-3 kez", route: "Subkutan" },
      { label: "Güçlendirilmiş Sonuçlar", amount: "200-300mcg", amountValue: 300, frequency: "Günde 2-3 kez", route: "Subkutan" },
    ],
    warnings: [
      "Aktif kanser veya kanser öyküsü",
      "Gebelik veya emzirme dönemi",
      "Hipofiz bozuklukları",
      "Diyabet (dikkatli kullanılmalı)",
      "Yarışan sporcular için WADA tarafından yasaklı",
      "Hipoglisemi belirtileri",
    ],
    sideEffects: [
      "Yoğun açlık/artmış iştah (en belirgin yan etki)",
      "Su tutulumu",
      "Ekstremitelerde karıncalanma veya uyuşma",
      "Enjeksiyon sonrası yorgunluk veya halsizlik",
    ],
    interactions: [
      {
        compound: "CJC-1295 (DAC)",
        note: "GHRH + GHRP kombinasyonu, tekilinden belirgin şekilde daha güçlü sinerjistik GH salınımı üretir.",
      },
      {
        compound: "GHRP-2",
        note: "Benzer mekanizma; GHRP-2 daha potent ve daha az iştah uyarımına sahiptir.",
      },
      {
        compound: "İnsülin",
        note: "Eşzamanlı uygulama GH yanıtını artırabilir, ancak karbonhidrat tüketimi GH salınımını köreltir.",
      },
    ],
  },
  {
    slug: "cjc-1295-dac",
    name: "CJC-1295 (DAC)",
    category: "Büyüme / GH",
    tier: "theoretical",
    short:
      "CJC-1295'in albümine bağlanan, 6-8 gün yarı ömürlü uzun etkili formu. Sürekli GHRH reseptör uyarımı sağlar, doz sıklığı avantajı sunar.",
    mechanism:
      "DAC bileşeni dolaşımdaki albümine bağlanarak yarı ömrü belirgin şekilde uzatır; GHRH reseptöründe kesintisiz uyarım sağlayarak sürdürülebilir GH/IGF-1 yükselmesi oluşturur.",
    primaryOutcomes: [
      "Uzun süreli, sürekli GH yükselmesi",
      "IGF-1 optimizasyonu",
      "Kısa etkili formlara kıyasla daha seyrek doz gerekliliği",
    ],
    clinicalStatus: "Sınırlı insan verisi, mekanistik ağırlıklı",
    dosingNote:
      "DAC varyantı için subkutan enjeksiyon tercih edilen yoldur; uzun yarı ömrü nedeniyle haftada bir doz yeterlidir.",
    dosing: [
      { label: "Muhafazakar Anti-Aging", amount: "1mg", amountValue: 1, frequency: "Haftada bir", route: "Subkutan" },
      { label: "Standart Protokol", amount: "2mg", amountValue: 2, frequency: "Haftada bir", route: "Subkutan" },
    ],
    warnings: [
      "Diyabet öyküsü",
      "Kanser öyküsü",
      "Uyku apnesi yatkınlığı",
      "Şiddetli eklem ağrısı veya karpal tünel sendromu",
      "Günlük yaşamı etkileyen aşırı su tutulumu",
      "Akromegali belirtileri (çene büyümesi, el/ayak genişlemesi)",
    ],
    sideEffects: [
      "Su tutulumu",
      "Eklem ağrısı",
      "Karpal tünel semptomları",
    ],
    interactions: [
      {
        compound: "Ipamorelin",
        note: "Sürekli GH yükselmesi, pulsatil protokollerin sinerjistik faydalarını azaltabilir.",
      },
      {
        compound: "Tesamorelin",
        note: "Her ikisi de GHRH analoğudur; ek fayda sağlamaz, reseptör rekabeti olası.",
      },
      {
        compound: "HGH",
        note: "Amacı boşa çıkarır ve doğal üretimi baskılayabilir.",
      },
    ],
  },
  {
    slug: "kpv",
    name: "KPV",
    category: "Doku Onarımı",
    tier: "theoretical",
    short:
      "Alfa-MSH'ın anti-inflamatuar tripeptid fragmanı. Steroidlerin bağışıklık baskılama etkisi olmadan iltihabı azalttığı düşünülüyor.",
    mechanism:
      "Hücre içine girerek nükleer düzeyde NF-κB sinyalini baskılar; TNF-α ve IL-6 gibi pro-inflamatuar sitokinleri immünosupresyon oluşturmadan azalttığı öne sürülüyor.",
    primaryOutcomes: [
      "Hayvan modellerinde sistemik inflamasyonda azalma",
      "Bağırsak bariyer onarımı üzerinde mekanistik ilgi",
      "Kontrollü insan çalışması sınırlı",
    ],
    clinicalStatus: "Preklinik ağırlıklı, insan verisi sınırlı",
    dosingNote:
      "Subkutan enjeksiyon sistemik anti-inflamatuar etki sağlar; bağırsak ile ilgili sorunlarda karın bölgesi tercih edilir.",
    dosing: [
      { label: "Genel Anti-İnflamatuar", amount: "200-300mcg", amountValue: 300, frequency: "Günde 1 kez", route: "Subkutan" },
      { label: "Aktif İnflamasyon", amount: "250mcg", amountValue: 500, frequency: "Günde 2 kez", route: "Subkutan" },
      { label: "Otoimmün Destek", amount: "500mcg", amountValue: 500, frequency: "Günde 1 kez", route: "Subkutan" },
    ],
    warnings: [
      "Bilinen peptid alerjileri",
      "Aktif şiddetli enfeksiyonlar (teorik)",
      "Gebelik veya emzirme dönemi (sınırlı veri)",
      "Enfeksiyon belirtileri (ateş, titreme) — çok nadir",
      "Paradoksal inflamasyon artışı",
    ],
    sideEffects: [
      "Minimal veya hiç yan etki bildirilmedi",
      "Steroidler gibi immünosupresyona neden olmaz",
      "Melanin üretimi/bronzlaşma etkisi yok",
    ],
    interactions: [
      {
        compound: "BPC-157",
        note: "Tamamlayıcı mekanizmalarla güçlendirilmiş bağırsak iyileşmesi ve anti-inflamatuar etki.",
      },
      {
        compound: "Thymosin Alpha-1",
        note: "Her ikisi de farklı yollarla bağışıklık işlevini destekler.",
      },
      {
        compound: "GHK-Cu",
        note: "Cilt sağlığı ve yenilenme için sinerjistik.",
      },
    ],
  },
  {
    slug: "ara-290",
    name: "ARA-290 (Cibinetide)",
    category: "Doku Onarımı",
    tier: "theoretical",
    short:
      "Eritropoietin türevi, eritropoietik etkisi olmayan doku-koruyucu bir peptid. Sinir onarımı odaklı Faz 2 insan çalışmalarında test edildi.",
    mechanism:
      "EPOR/β-ortak reseptör kompleksi üzerinden 'innate repair receptor' (IRR) yolunu aktive eder; kırmızı kan hücresi üretimini artırmadan doku koruyucu sinyal iletir.",
    primaryOutcomes: [
      "Faz 2 çalışmalarda diyabetik nöropatide semptom azalması bildirimleri",
      "Periferik sinir rejenerasyonunda mekanistik ilgi",
      "FDA onayı yok, geliştirme sürecinde",
    ],
    clinicalStatus: "Faz 2 insan çalışmaları tamamlandı, onaylı değil",
    dosingNote:
      "Klinik çalışmalarda kullanılan doz endikasyona göre değişir (nöropati tedavisi günde 4mg, doku koruması 1-8mg aralığında, akut müdahale IV yoldan); tek bir doz merdiveni yerine endikasyona özgü protokol uygulanır.",
    warnings: [
      "Son 6 ay içinde anti-TNF tedavisi",
      "Son 2 ay içinde EPO kullanımı",
      "Gebelik",
      "Vücut kitle indeksi > 34 kg/m²",
      "Şiddetli enjeksiyon bölgesi reaksiyonu",
      "Beklenmeyen kan sayımı değişiklikleri",
    ],
    sideEffects: [
      "Klinik çalışmalarda ciddi ilaç ilişkili advers olay bildirilmeden mükemmel güvenlik profili",
    ],
    interactions: [
      {
        compound: "BPC-157",
        note: "Tamamlayıcı doku onarım yolları yara iyileşmesini güçlendirebilir.",
      },
      {
        compound: "EPO",
        note: "Klinik çalışmalar, reseptör girişimi nedeniyle son 2 ay içinde EPO kullanımını hariç tutar.",
      },
      {
        compound: "Anti-TNF Biyolojikleri",
        note: "İmmün etkileşimlerden kaçınmak için Ara-290 öncesi 6 aylık arınma süresi gerekir.",
      },
    ],
  },
  {
    slug: "cyclic-glycine-proline",
    name: "Cyclic Glycine-Proline (CGP)",
    category: "Kognitif",
    tier: "theoretical",
    short:
      "IGF-1'in doğal, kan-beyin bariyerini geçebilen metaboliti. Biyoyararlanır IGF-1 düzeyini dengeleyerek nöroprotektif etki gösterdiği düşünülüyor.",
    mechanism:
      "IGFBP-3'e IGF-1 ile rekabet ederek dolaşımdaki serbest IGF-1 düzeyini normalize eder; AMPA ve GABA-A reseptörlerinde pozitif allosterik modülasyon yaptığı ve BDNF düzeyini artırdığı öne sürülüyor.",
    primaryOutcomes: [
      "Hayvan modellerinde bilişsel performansta iyileşme bildirimleri",
      "Nöroprotektif etki üzerinde mekanistik ilgi",
      "Kontrollü büyük ölçekli insan verisi yok",
    ],
    clinicalStatus: "Erken insan verisi, çoğunlukla preklinik",
    dosingNote:
      "Oral kapsül, kan-beyin bariyerini geçme kapasitesiyle iyi biyoyararlanım sağlar. Mikrogram düzeyinde dozlanır (miligram değil).",
    dosing: [
      { label: "Genel Bilişsel Destek", amount: "20-40mcg", amountValue: 40, frequency: "Günde 1 kez", route: "Oral" },
      { label: "Nöroproteksiyon/Anti-Aging", amount: "40-50mcg", amountValue: 50, frequency: "Günde 1 kez", route: "Oral" },
      { label: "Metabolik/Kardiyovasküler Destek", amount: "40-100mcg", amountValue: 100, frequency: "Günde 1 kez", route: "Oral" },
    ],
    warnings: [
      "IGF-1 veya büyüme hormonu ilacı kullanıyorsanız hekime danışılmalı",
      "Sınırlı uzun dönem insan verisi",
      "Gebelikte incelenmemiştir",
      "Alerjik reaksiyonlar (döküntü, nefes darlığı, şişlik)",
      "Beklenmeyen kan şekeri değişiklikleri",
    ],
    interactions: [
      {
        compound: "BPC-157",
        note: "Farklı yollar; BPC-157 doku onarımını destekler, cGP ise IGF-1'i modüle eder.",
      },
      {
        compound: "Semax",
        note: "Her ikisi de farklı yollarla nöroproteksiyon ve nootropik etki sunar.",
      },
      {
        compound: "Selank",
        note: "Tamamlayıcı bilişsel etkiler; Selank anksiyeteyi ele alırken cGP IGF-1'i optimize eder.",
      },
    ],
  },
  {
    slug: "b7-33",
    name: "B7-33",
    category: "Doku Onarımı",
    tier: "preclinical",
    short:
      "Relaksin-2'nin seçici RXFP1 agonisti bir analoğu. Kardiyak ve renal fibrozu hedefleyen, tamamen preklinik aşamada bir araştırma peptidi.",
    mechanism:
      "RXFP1 reseptörünü seçici olarak aktive ederek fibroblast aktivasyonunu ve kolajen birikimini azalttığı, matriks metalloproteinaz aktivitesini artırarak doku yeniden yapılanmasını desteklediği gösterilmiştir.",
    primaryOutcomes: [
      "Hayvan modellerinde kardiyak fibrozda azalma",
      "Vazodilatasyon üzerinde etki",
      "İnsan verisi yok",
    ],
    clinicalStatus: "Tamamen preklinik, insan verisi yok",
    dosingNote:
      "İnsan güvenlik verisi bulunmamaktadır — tüm protokoller preklinik/hayvan araştırmalarından tahmin edilmiştir.",
    dosing: [
      { label: "Anti-Fibrotik / Kardiyovasküler Destek", amount: "100-250mcg", amountValue: 250, frequency: "Günde 1 kez", route: "Subkutan" },
    ],
    warnings: [
      "Önceden var olan hipotansiyon veya vazodilatasyonla kötüleşen durumlar",
      "Gebelik veya emzirme dönemi (güvenlik verisi yok)",
      "Güçlü antihipertansif ajanların tıbbi gözetim olmadan eşzamanlı kullanımı",
      "İnsan güvenlik verisi bulunmuyor — tüm protokoller preklinik araştırmadan tahmin edilmiştir",
      "Süregelen veya semptomatik hipotansiyon (baş dönmesi, sersemlik, bayılma)",
    ],
    sideEffects: [
      "Enjeksiyon bölgesi reaksiyonları (kızarıklık, hafif tahriş)",
      "Vazodilatör etkiler nedeniyle olası geçici hipotansiyon",
    ],
    interactions: [
      {
        compound: "Telmisartan",
        note: "Kardiyak koruma için olası sinerjistik etki; her ikisi de kardiyak yeniden yapılanma ve fibrozla ilgili tamamlayıcı yolları hedefler.",
      },
    ],
  },
  {
    slug: "methylene-blue",
    name: "Methylene Blue",
    category: "Kognitif",
    tier: "proven",
    short:
      "Mitokondriyal elektron taşıma zincirinde alternatif yol sağlayan redoks ajanı. Methemoglobinemi tedavisinde onaylı; düşük dozda bilişsel etkileri araştırılıyor.",
    mechanism:
      "Kompleks I ve III'ü baypas ederek NADH'den elektronu doğrudan sitokrom c'ye aktarır, ATP sentezini sürdürür ve reaktif oksijen türü üretimini azaltır; ayrıca MAO-A inhibisyonu yoluyla nörotransmitter düzeylerini etkiler.",
    primaryOutcomes: [
      "Methemoglobinemi tedavisi (onaylı endikasyon)",
      "Düşük dozda mitokondriyal/bilişsel destek üzerinde araştırma",
      "Doz-yanıt eğrisi hormetik: yüksek doz ters etkili",
    ],
    clinicalStatus: "FDA onaylı (methemoglobinemi); bilişsel kullanım onay dışı",
    evidenceMatrix: [
      { outcome: "Methemoglobinemi Tedavisi", tier: "proven" },
    ],
    dosingNote:
      "Oral yol, düşük doz nootropik/longevity kullanımı için standarttır (%72 civarı biyoyararlanım). Yalnızca eczacılık kalitesinde (USP) formlar kullanılmalıdır — endüstriyel/laboratuvar kalitesi ağır metal kontaminasyonu içerebilir.",
    dosing: [
      { label: "Düşük Doz Nootropik", amount: "0.5-1 mg/kg", amountValue: 1, frequency: "Günde 1 kez (sabah)", route: "Oral (USP kalite)" },
      { label: "Orta Düzey Bilişsel Destek", amount: "1-2 mg/kg", amountValue: 2, frequency: "Günde 1 kez (sabah)", route: "Oral (USP kalite)" },
    ],
    warnings: [
      "SSRI, SNRI veya MAO inhibitörü ile eşzamanlı kullanım (serotonin sendromu riski — KRİTİK)",
      "Glukoz-6-fosfat dehidrogenaz (G6PD) eksikliği (şiddetli hemolitik anemi riski)",
      "Böbrek yetmezliği (esas olarak böbrekten atılır)",
      "Methylene blue veya fenotiazin bileşiklerine bilinen aşırı duyarlılık",
      "Gebelik ve emzirme dönemi (yetersiz güvenlik verisi)",
      "Serotonin sendromu belirtileri: ajitasyon, konfüzyon, hızlı kalp atışı, yüksek ateş, kas sertliği veya nöbet",
    ],
    sideEffects: [
      "İdrarda mavi/mavi-yeşil renk değişimi (beklenen ve zararsız)",
      "Sıvı formülasyonlarla dilde mavi-yeşil lekelenme",
      "Özellikle yüksek dozlarda hafif bulantı veya mide rahatsızlığı",
      "Başlangıçta hafif baş ağrısı",
    ],
    interactions: [
      {
        compound: "SSRI'lar",
        note: "KRİTİK ETKİLEŞİM: Methylene blue güçlü bir MAO-A inhibitörüdür. SSRI'larla (fluoksetin, sertralin, paroksetin) birleştirilmesi hayatı tehdit edebilecek serotonin sendromuna yol açabilir. FDA bu kombinasyona karşı resmi uyarı yayınlamıştır — eşzamanlı kullanılmamalıdır.",
      },
      {
        compound: "MAO İnhibitörleri",
        note: "Diğer MAO inhibitörleriyle birleştirilmesi, birikimli MAO inhibisyonu yaratır ve serotonin sendromu ile hipertansif kriz riskini belirgin şekilde artırır.",
      },
      {
        compound: "CoQ10 / Ubikinol",
        note: "Her ikisi de mitokondriyal elektron taşıma zincirini tamamlayıcı mekanizmalarla destekler; birikimli mitokondriyal fayda sağlayabilir.",
      },
    ],
  },
  {
    slug: "glutathione",
    name: "Glutatyon",
    category: "Longevity",
    tier: "theoretical",
    short:
      "Vücudun ana hücre içi antioksidanı. Detoksifikasyon, bağışıklık düzenlemesi ve hücresel redoks dengesinde merkezi rol oynar.",
    mechanism:
      "Sistein tiyol grubu üzerinden reaktif oksijen türlerini doğrudan nötralize eder, C ve E vitaminlerini rejenere eder, toksinlerle konjuge olarak atılımını sağlar.",
    primaryOutcomes: [
      "Oksidatif stres belirteçlerinde azalma",
      "Karaciğer detoksifikasyon desteği üzerinde ilgi",
      "Longevity endikasyonu için bağımsız büyük ölçekli RCT verisi sınırlı",
    ],
    clinicalStatus: "Geniş kullanım geçmişi, longevity endikasyonu için kanıt sınırlı",
    dosingNote:
      "Enjektabl form, GI parçalanmayı atlayarak en etkili yoldur; subkutan enjeksiyon genellikle haftada 2-3 kez uygulanır.",
    dosing: [
      { label: "Genel Wellness", amount: "100-200mg", amountValue: 200, frequency: "Haftada 2-3 kez", route: "Subkutan" },
      { label: "Yoğun Terapi", amount: "200-600mg", amountValue: 600, frequency: "Haftada 2-3 kez", route: "Subkutan veya IV" },
    ],
    warnings: [
      "Bilinen glutatyon alerjisi",
      "Gebelik veya emzirme dönemi (yetersiz güvenlik verisi)",
      "Astım (bazılarında bronkospazmı tetikleyebilir)",
      "Alerjik reaksiyon belirtileri (döküntü, nefes darlığı)",
      "Şiddetli karın ağrısı",
    ],
    sideEffects: [
      "Enjeksiyon bölgesi reaksiyonları",
      "Hafif bulantı (genellikle yüksek dozlarda)",
      "Karın krampı",
    ],
    interactions: [
      {
        compound: "NAD+ / NMN",
        note: "Her ikisi de hücresel enerji ve antioksidan sistemleri destekler; longevity protokollerinde sıklıkla birleştirilir.",
      },
      {
        compound: "SS-31 (Elamipretide)",
        note: "Her ikisi de mitokondriyi korur; farklı mekanizmalar birbirini tamamlar.",
      },
    ],
  },
  {
    slug: "foxo4-dri",
    name: "FOXO4-DRI",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Senesan (yaşlanmış) hücreleri seçici olarak temizlemeyi hedefleyen deneysel bir senolitik peptid. Fare çalışmalarında doku gençleşmesi gösterildi; insan verisi yok.",
    mechanism:
      "FOXO4'ün p53 ile bağlanmasını rekabetçi şekilde engeller; bu, senesan hücrelerde p53'ün çekirdek dışına çıkmasına ve programlı hücre ölümüne yol açarken, FOXO4 sağlıklı dokuda düşük eksprese olduğu için işlevsel hücreler büyük ölçüde etkilenmiyor.",
    primaryOutcomes: [
      "Fare modellerinde senesan hücre temizliği",
      "Doku fonksiyonunda gençleşme (fare verisi)",
      "İnsan klinik verisi yok",
    ],
    clinicalStatus: "Tamamen preklinik, yalnızca hayvan çalışmaları",
    dosingNote:
      "Hiçbir insan dozaj protokolü doğrulanmamıştır. Aşağıdaki değer, 2017 fare çalışmasının (5mg/kg, İP, gün aşırı 3 doz) 60kg bir insana matematiksel ölçeklenmesidir — klinik bir doz önerisi değildir.",
    dosing: [
      { label: "Fare Çalışması Ölçeklemesi (60kg insan için)", amount: "~25mg", amountValue: 25, frequency: "3 doz, gün aşırı", route: "İntraperitoneal (orijinal çalışma)" },
    ],
    warnings: [
      "İnsan kullanımı için henüz onaylanmamıştır",
      "Gebelik veya emzirme dönemi",
      "Bağışıklığı baskılanmış bireylerde güvenlik bilinmiyor",
      "Aktif kanser (teorik — onkologla görüşülmeli)",
      "Alerjik reaksiyonlar",
    ],
    sideEffects: [
      "Sınırlı insan verisi mevcut",
      "Hayvan çalışmalarında genellikle iyi tolere edildi",
    ],
    interactions: [
      {
        compound: "Humanin",
        note: "Farklı mekanizmalar; Humanin sağlıklı hücreleri korurken FOXO4-DRI senesan olanları temizler.",
      },
    ],
  },
  {
    slug: "cortagen",
    name: "Cortagen",
    category: "Longevity",
    tier: "theoretical",
    short:
      "Rus jerontoloji literatüründen (Khavinson ekibi) beyin dokusuna özgü kısa peptid biyoregülatör. Bulgular esas olarak tek bir araştırma grubundan gelmektedir.",
    mechanism:
      "Hücre çekirdeğine girerek gen ekspresyonunu epigenetik düzeyde modüle ettiği; sinir sisteminde inflamatuar yanıtı ve oksidatif-antioksidan dengeyi etkilediği öne sürülüyor.",
    primaryOutcomes: [
      "İskemik beyin hasarı sonrası toparlanma üzerinde araştırma",
      "Nöroinflamasyon üzerinde mekanistik ilgi",
      "Batı literatüründe bağımsız doğrulama sınırlı",
    ],
    clinicalStatus: "Esas olarak tek araştırma grubunun yayınları, bağımsız doğrulama sınırlı",
    dosingNote:
      "Oral kapsül formunda mevcuttur; tipik protokol yılda 2-3 kez tekrarlanan 10-20 günlük döngülerden oluşur.",
    dosing: [
      { label: "Standart Protokol", amount: "10-20mg", amountValue: 20, frequency: "Günde 1 kez, 10-20 gün", route: "Oral" },
      { label: "İdame", amount: "10mg", amountValue: 10, frequency: "Yılda 2-3 döngü", route: "Oral" },
    ],
    warnings: [
      "Aktif nörolojik aciller (tıbbi yardım alınmalı)",
      "Bilinen aşırı duyarlılık",
      "Gebelik veya emzirme dönemi",
      "Olağandışı nörolojik semptomlar",
    ],
    sideEffects: [
      "Genellikle iyi tolere edilir",
      "Minimal yan etki bildirilmiştir",
    ],
    interactions: [
      {
        compound: "Epithalon",
        note: "Kapsamlı anti-aging Khavinson protokollerinde sıklıkla birlikte kullanılır.",
      },
      {
        compound: "Thymalin",
        note: "Farklı organ hedefleri; kapsamlı biyoregülatör protokollerinde kullanılabilir.",
      },
      {
        compound: "Cardiogen",
        note: "Khavinson biyoregülatör ailesinin bir parçası; farklı dokuyu hedefler.",
      },
    ],
  },
  {
    slug: "cardiogen",
    name: "Cardiogen",
    category: "Longevity",
    tier: "theoretical",
    short:
      "Kalp dokusuna özgü kısa peptid biyoregülatör (Khavinson ekibi). Kardiyak doku onarımı ve gen ekspresyonu üzerindeki etkileri esas olarak tek bir araştırma grubunca bildirilmiştir.",
    mechanism:
      "Hücre çekirdeğine girip DNA bölgeleri, histonlar ve nükleozomlarla etkileşerek DNA dizisini değiştirmeden gen aktivasyonunu düzenlediği öne sürülüyor; bu yolla kardiyak doku onarımını desteklediği iddia ediliyor.",
    primaryOutcomes: [
      "Kardiyak doku onarımı üzerinde araştırma",
      "Miyokard fonksiyonu üzerinde mekanistik ilgi",
      "Batı literatüründe bağımsız doğrulama sınırlı",
    ],
    clinicalStatus: "Esas olarak tek araştırma grubunun yayınları, bağımsız doğrulama sınırlı",
    dosingNote:
      "Oral kapsül formunda mevcuttur; tipik protokol yılda 2-3 kez tekrarlanan 10-20 günlük döngülerden oluşur.",
    dosing: [
      { label: "Standart Protokol", amount: "10-20mg", amountValue: 20, frequency: "Günde 1 kez, 10-20 gün", route: "Oral" },
      { label: "İdame", amount: "10mg", amountValue: 10, frequency: "Yılda 2-3 döngü", route: "Oral" },
    ],
    warnings: [
      "Aktif kardiyak aciller (tıbbi yardım alınmalı)",
      "Bilinen aşırı duyarlılık",
      "Gebelik veya emzirme dönemi",
      "Olağandışı kardiyak semptomlar",
    ],
    sideEffects: [
      "Genellikle iyi tolere edilir",
      "Minimal yan etki bildirilmiştir",
    ],
    interactions: [
      {
        compound: "Epithalon",
        note: "Kapsamlı anti-aging Khavinson protokollerinde sıklıkla birlikte kullanılır.",
      },
      {
        compound: "Thymalin",
        note: "Farklı organ hedefleri; kapsamlı biyoregülatör protokollerinde kullanılabilir.",
      },
    ],
  },
  {
    slug: "livagen",
    name: "Livagen",
    category: "Longevity",
    tier: "theoretical",
    short:
      "Karaciğer dokusuna özgü kısa peptid biyoregülatör (Khavinson ekibi). Hepatoprotektif etkileri esas olarak tek bir araştırma grubunca bildirilmiştir.",
    mechanism:
      "Kromatin yapısını gevşeterek belirli genlerin ekspresyonunu artırdığı; karaciğer dokusunda bağışıklık ve antioksidan durumunu normalize ederek hepatoprotektif etki gösterdiği öne sürülüyor.",
    primaryOutcomes: [
      "Karaciğer fibrozunda araştırma konusu",
      "Yaşa bağlı karaciğer fonksiyon kaybında ilgi",
      "Batı literatüründe bağımsız doğrulama sınırlı",
    ],
    clinicalStatus: "Esas olarak tek araştırma grubunun yayınları, bağımsız doğrulama sınırlı",
    dosingNote:
      "Oral kapsül formunda mevcuttur; tipik protokol yılda 2-3 kez tekrarlanan 10-20 günlük döngülerden oluşur.",
    dosing: [
      { label: "Standart Protokol", amount: "10-20mg", amountValue: 20, frequency: "Günde 1 kez, 10-20 gün", route: "Oral" },
      { label: "İdame", amount: "10mg", amountValue: 10, frequency: "Yılda 2-3 döngü", route: "Oral" },
    ],
    warnings: [
      "Aktif karaciğer acilleri (tıbbi yardım alınmalı)",
      "Bilinen aşırı duyarlılık",
      "Gebelik veya emzirme dönemi",
      "Olağandışı karaciğer semptomları",
    ],
    sideEffects: [
      "Genellikle iyi tolere edilir",
      "Minimal yan etki bildirilmiştir",
    ],
    interactions: [
      {
        compound: "Epithalon",
        note: "Yapısal olarak benzer; kapsamlı anti-aging protokollerinde sıklıkla birlikte kullanılır.",
      },
      {
        compound: "Glutathione",
        note: "Her ikisi de karaciğer fonksiyonunu ve antioksidan durumunu destekler.",
      },
      {
        compound: "Vilon",
        note: "Farklı organ hedefleri; biyoregülatör protokollerinde birleştirilebilir.",
      },
    ],
  },
  {
    slug: "vilon",
    name: "Vilon",
    category: "Longevity",
    tier: "preclinical",
    short:
      "Timüs dokusuna özgü kısa peptid biyoregülatör (Khavinson ekibi). Yaşlanan bağışıklık sisteminin gençleştirilmesi üzerine araştırma konusu, tamamen preklinik.",
    mechanism:
      "Bağışıklık hücrelerinde kromatin yapısını ve gen ekspresyonunu etkileyerek timosit çoğalmasını ve T-yardımcı hücre aktivasyonunu artırdığı gösterilmiştir.",
    primaryOutcomes: [
      "Timüs dokusunda hücre çoğalma indeksinde artış (hayvan verisi)",
      "Yaşa bağlı bağışıklık zayıflamasında araştırma konusu",
      "İnsan klinik verisi yok",
    ],
    clinicalStatus: "Tamamen preklinik, insan verisi yok",
    dosingNote:
      "En kısa Khavinson peptidi (yalnızca 2 aminoasit) olarak oral yolla kolayca emilir; tipik protokol yılda 2-3 kez tekrarlanan 10-20 günlük döngülerden oluşur.",
    dosing: [
      { label: "Standart Protokol", amount: "10-20mg", amountValue: 20, frequency: "Günde 1 kez, 10-20 gün", route: "Oral" },
      { label: "İdame", amount: "10mg", amountValue: 10, frequency: "Yılda 2-3 döngü", route: "Oral" },
    ],
    warnings: [
      "Aktif otoimmün alevlenmeler (hekime danışılmalı)",
      "Bilinen aşırı duyarlılık",
      "Gebelik veya emzirme dönemi",
      "Olağandışı bağışıklık semptomları",
    ],
    sideEffects: [
      "Genellikle iyi tolere edilir",
      "Minimal yan etki bildirilmiştir",
    ],
    interactions: [
      {
        compound: "Thymalin",
        note: "Her ikisi de timüs/bağışıklık sistemini hedefler; tamamlayıcı mekanizmalar.",
      },
      {
        compound: "Epithalon",
        note: "Kapsamlı anti-aging Khavinson protokollerinde sıklıkla birlikte kullanılır.",
      },
    ],
  },
  {
    slug: "bam-15",
    name: "BAM-15",
    category: "Metabolik",
    tier: "preclinical",
    short:
      "Mitokondriyal iç zarda proton geçirgenliğini artıran bir 'uncoupler'. DNP'nin aksine hücre zarını bozmadığı için daha güvenli bir profille araştırılıyor.",
    mechanism:
      "Proton gradyanını dağıtarak elektron taşımayı ATP sentezinden ayırır; mitokondriyi daha fazla substrat (özellikle yağ) yakmaya zorlar. AMPK ve PGC-1α aktivasyonuyla mitokondriyal biyogenezi desteklediği gösterilmiştir.",
    primaryOutcomes: [
      "Hayvan modellerinde yağ oksidasyonunda artış",
      "İnsülin direncinde iyileşme (preklinik veri)",
      "İnsan klinik verisi yok",
    ],
    clinicalStatus: "Tamamen preklinik, insan verisi yok",
    dosingNote:
      "Oral olarak biyoyararlanımlıdır; insan dozlama protokolleri hâlâ araştırma aşamasında oluşturulmaktadır, aşağıdaki değerler tahmini araştırma referanslarıdır.",
    dosing: [
      { label: "Metabolik Destek", amount: "25-50mg", amountValue: 50, frequency: "Günde 1-2 kez", route: "Oral" },
    ],
    warnings: [
      "Hipertiroidi veya tiroid bozuklukları",
      "Kalp rahatsızlıkları",
      "Gebelik veya emzirme dönemi",
      "Diğer mitokondriyal uncoupler'ların (DNP, FCCP) kullanımı",
      "Ateş veya aktif enfeksiyon",
      "Belirgin hipertermi/aşırı ısınma",
    ],
    sideEffects: [
      "Araştırmalarda genellikle iyi tolere edildi",
      "Vücut sıcaklığında olası hafif artış (DNP'den daha az)",
    ],
    interactions: [
      {
        compound: "Semaglutide/GLP-1 Agonistleri",
        note: "2024 araştırmaları, GLP-1 etkinliğini sınırlayan metabolik adaptasyonu dengeleyerek kombinasyonun daha güçlü metabolik fayda sağladığını gösteriyor.",
      },
      {
        compound: "DNP/FCCP",
        note: "Diğer mitokondriyal uncoupler'larla birleştirilmemelidir — tehlikeli birikimli etkiler mümkündür.",
      },
      {
        compound: "MOTS-c",
        note: "Her ikisi de mitokondriyal fonksiyonu etkiler ancak farklı mekanizmalarla.",
      },
    ],
  },
  {
    slug: "adipotide",
    name: "Adipotide",
    category: "Metabolik",
    tier: "theoretical",
    short:
      "Beyaz yağ dokusu endotelini hedefleyen, apoptoz tetikleyen bir peptid-konjugat. Faz 1 insan çalışmasında etkili bulundu ancak geri dönüşümlü böbrek toksisitesi nedeniyle geliştirilmesi durduruldu.",
    mechanism:
      "Bağlayıcı kısım beyaz yağ endotelindeki prohibitin/anneksin A2'yi hedefler; bağlı pro-apoptotik kısım hücre içine girince mitokondriyal zarı bozarak lokalize endotel apoptozu ve yağ hücresi kaybı tetikler.",
    primaryOutcomes: [
      "Faz 1 çalışmada yağ kütlesinde azalma",
      "Geri dönüşümlü böbrek toksisitesi nedeniyle çalışma durduruldu",
      "Klinik geliştirme aktif değil",
    ],
    clinicalStatus: "Faz 1 sonrası güvenlik nedeniyle durduruldu",
    dosingNote:
      "Klinik geliştirme durdurulmuştur. Yayınlanan veriler öncelikle primat çalışmalarından (0.10-0.75 mg/kg aralığında doz-bulma) gelir; doğrulanmış bir insan dozaj protokolü yoktur.",
    warnings: [
      "Gebelik/laktasyon (araştırılmamış)",
      "Dehidrasyon",
      "Nefrotoksik ilaçların eşzamanlı kullanımı",
      "Süregelen kreatinin yükselmesi veya oligüri",
      "İlerleyici elektrolit anormallikleri",
      "Şiddetli enjeksiyon bölgesi reaksiyonu veya sistemik semptomlar",
    ],
    sideEffects: [
      "Hafif kreatinin yükselmesi",
      "Elektrolit değişimleri",
      "Doza bağlı proksimal tübül değişiklikleri (primatlarda geri dönüşümlü)",
    ],
    interactions: [
      {
        compound: "Semaglutide",
        note: "Olası birikimli dehidrasyon/GI etkileri; böbrek fonksiyonu izlenmelidir.",
      },
      {
        compound: "Tirzepatide",
        note: "Örtüşen kilo kaybı etkileri; böbrek fonksiyonu, hacim durumu ve elektrolitler izlenmelidir.",
      },
      {
        compound: "Nefrotoksik İlaçlar",
        note: "Adipotide doza bağlı proksimal tübül hasarı gösterir; ek böbrek yükünden kaçınılmalıdır.",
      },
    ],
  },
  {
    slug: "dnsp-11",
    name: "DNSP-11",
    category: "Kognitif",
    tier: "preclinical",
    short:
      "GDNF ailesinden farklı bir mekanizmayla dopaminerjik nöronları koruyan deneysel bir peptid fragmanı. Motivasyon ve ruh hali ile ilişkili tamamen preklinik bir araştırma konusu.",
    mechanism:
      "Klasik GFRalpha1/RET reseptör kompleksini kullanmadan dopaminerjik nöron sağkalımını desteklediği; tirozin hidroksilaz ekspresyonunu artırarak dopamin sentezini ve mitokondriyal fonksiyonu desteklediği gösterilmiştir.",
    primaryOutcomes: [
      "Hayvan modellerinde dopaminerjik nöron korunması",
      "Motivasyon/dürtü üzerinde araştırma konusu",
      "İnsan klinik verisi yok",
    ],
    clinicalStatus: "Tamamen preklinik, yalnızca hayvan/hücre çalışmaları",
    dosingNote:
      "İntranazal uygulama, koku yolu üzerinden potansiyel doğrudan CNS iletimine olanak tanır; çok sınırlı insan güvenlik verisi vardır.",
    dosing: [
      { label: "Genel Nöroproteksiyon", amount: "100-200mcg", amountValue: 200, frequency: "Günde 1 kez", route: "İntranazal" },
    ],
    warnings: [
      "Gebelik veya emzirme dönemi",
      "Bilinen peptid alerjileri",
      "Çok sınırlı insan güvenlik verisi; kendi sorumluluğunuzda kullanılır",
      "Dopaminerjik ilaçlarla birleştirmeden önce hekime danışılmalı",
      "Şiddetli veya süregelen burun tahrişi veya kanaması",
      "Olağandışı nörolojik semptomlar (tremor, istem dışı hareketler)",
    ],
    sideEffects: [
      "Burun tahrişi veya hafif yanma hissi (intranazal yol)",
      "Enjeksiyon bölgesi reaksiyonları (subkutan yolda)",
    ],
    interactions: [
      {
        compound: "Semax",
        note: "Tamamlayıcı nörotrofik yollar; Semax BDNF yukarı regülasyonu üzerinden, DNSP-11 GDNF ilişkili dopaminerjik nöroproteksiyon üzerinden etki eder.",
      },
    ],
  },
]

export const getPeptide = (slug: string) =>
  peptides.find((p) => p.slug === slug)

/** Best-effort mapping from a peptide's library category to the closest
 * assessment goal option; left unmapped where there's no clean match. */
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
