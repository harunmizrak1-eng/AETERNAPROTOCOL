export type EvidenceTier = "proven" | "theoretical" | "preclinical"

export interface EvidenceMatrixRow {
  outcome: string
  tier: EvidenceTier
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
   * verifiably reports that outcome — never inferred beyond the source. */
  evidenceMatrix?: EvidenceMatrixRow[]
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
    evidenceMatrix: [{ outcome: "Vücut Ağırlığı", tier: "proven" }],
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
      "Faz 2 sonrası geliştirmesi durduruldu — kanıt seviyesi düşük",
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
