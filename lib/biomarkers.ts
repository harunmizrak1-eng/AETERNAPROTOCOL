export interface Biomarker {
  slug: string
  name: string
  shortName: string
  category: string
  what: string
  why: string
  note: string
  relatedPeptideSlugs: string[]
  relatedCaseStudySlug?: string
}

export const biomarkers: Biomarker[] = [
  {
    slug: "apob",
    name: "ApoB (Apolipoprotein B)",
    shortName: "ApoB",
    category: "Metabolik",
    what: "Kanda dolaşan her aterojenik lipoprotein parçacığının (LDL dahil) yüzeyinde bulunan bir protein; bu parçacıkların toplam sayısını ölçer.",
    why: "Standart LDL-kolesterol ölçümünün aksine parçacık sayısını doğrudan verdiği için, kardiyovasküler risk açısından daha isabetli bir gösterge olarak kabul edilir.",
    note: "Referans aralıkları laboratuvara ve bireysel risk profiline göre değişir; yorumlama bir hekim tarafından yapılmalıdır.",
    relatedPeptideSlugs: ["retatrutide", "semaglutide", "tirzepatide", "cagrilintide"],
    relatedCaseStudySlug: "metabolik-reset",
  },
  {
    slug: "hba1c",
    name: "HbA1c (Glikozile Hemoglobin)",
    shortName: "HbA1c",
    category: "Metabolik",
    what: "Kırmızı kan hücrelerindeki hemoglobinin şekerle bağlanma oranı; son 2-3 aylık ortalama kan şekeri düzeyini yansıtır.",
    why: "Uzun vadeli glisemik kontrolün en yaygın kullanılan, tek seferlik ölçümlerden etkilenmeyen göstergesidir.",
    note: "Kesin değerlendirme ve tanı için bir hekime danışılmalıdır.",
    relatedPeptideSlugs: ["retatrutide", "semaglutide", "tirzepatide"],
    relatedCaseStudySlug: "metabolik-reset",
  },
  {
    slug: "hs-crp",
    name: "hs-CRP (Yüksek Duyarlıklı C-Reaktif Protein)",
    shortName: "hs-CRP",
    category: "İnflamasyon",
    what: "Karaciğerde üretilen, sistemik düşük dereceli inflamasyonu duyarlı şekilde yansıtan bir protein.",
    why: "Doku onarımı ve metabolik protokollerde inflamasyon yükünün zaman içindeki seyrini takip etmek için kullanılır.",
    note: "Akut bir enfeksiyon veya yaralanma sonrası geçici olarak yükselebilir; tekil bir ölçüm yeterli değildir.",
    relatedPeptideSlugs: ["bpc-157", "tb-500", "retatrutide"],
    relatedCaseStudySlug: "recovery-stack",
  },
  {
    slug: "homa-ir",
    name: "HOMA-IR (İnsülin Direnci İndeksi)",
    shortName: "HOMA-IR",
    category: "Metabolik",
    what: "Açlık glukozu ve açlık insülini değerlerinden hesaplanan, insülin direncinin dolaylı bir göstergesi.",
    why: "Kilo değişiminden önce hareket edebilen, metabolik protokollerin erken etkisini görmek için kullanılan bir belirteç.",
    note: "Hesaplama yöntemi laboratuvara göre değişebilir; tek başına tanı koydurucu değildir.",
    relatedPeptideSlugs: ["retatrutide", "semaglutide", "tirzepatide", "cagrilintide"],
  },
  {
    slug: "hrv",
    name: "HRV (Kalp Hızı Değişkenliği)",
    shortName: "HRV",
    category: "Toparlanma",
    what: "Ardışık kalp atımları arasındaki zaman aralığının değişkenliği; otonom sinir sistemi dengesinin bir göstergesi.",
    why: "Toparlanma kapasitesi, stres yükü ve genel otonom denge hakkında günlük, ölçülebilir bir sinyal sağlar.",
    note: "Ölçüm cihazına, uyku kalitesine ve o günkü koşullara göre dalgalanır; eğilim tekil ölçümden daha anlamlıdır.",
    relatedPeptideSlugs: ["semax", "selank"],
    relatedCaseStudySlug: "kognitif-optimizasyon",
  },
  {
    slug: "igf-1",
    name: "IGF-1 (İnsülin Benzeri Büyüme Faktörü 1)",
    shortName: "IGF-1",
    category: "Büyüme / GH",
    what: "Büyüme hormonunun karaciğerdeki etkisiyle üretilen, büyüme hormonu aktivitesinin dolaylı göstergesi.",
    why: "Büyüme hormonu eksenini hedefleyen protokollerde (CJC-1295 + Ipamorelin, Tesamorelin, GHRP-2) etkinliğin izlenmesinde kullanılır.",
    note: "Yaş ve cinsiyete göre referans aralığı değişir; yorumlama bir hekim tarafından yapılmalıdır.",
    relatedPeptideSlugs: ["cjc-1295-ipamorelin", "tesamorelin", "ghrp-2"],
  },
  {
    slug: "ck",
    name: "CK (Kreatin Kinaz)",
    shortName: "CK",
    category: "Doku Onarımı",
    what: "Kas dokusunda bulunan bir enzim; kan düzeyinin yükselmesi kas hücresi hasarını işaret eder.",
    why: "Doku onarımı protokollerinde kas yıkımının ve toparlanmanın nesnel bir ölçütü olarak kullanılır.",
    note: "Yoğun egzersiz sonrası geçici olarak yükselir; tek başına bir tanı ölçütü değildir.",
    relatedPeptideSlugs: ["bpc-157", "tb-500"],
    relatedCaseStudySlug: "recovery-stack",
  },
  {
    slug: "vas-agri",
    name: "VAS (Görsel Analog Ağrı Skalası)",
    shortName: "VAS",
    category: "Doku Onarımı",
    what: "0'dan 10'a kadar bir çizgi üzerinde, öznel ağrı şiddetinin standartlaştırılmış şekilde işaretlenmesi.",
    why: "Doku onarımı protokollerinde subjektif iyileşmeyi zaman içinde karşılaştırılabilir şekilde takip etmenin klinik standardıdır.",
    note: "Öznel bir ölçümdür; günlük dalgalanmalar normaldir.",
    relatedPeptideSlugs: ["bpc-157", "tb-500"],
    relatedCaseStudySlug: "recovery-stack",
  },
  {
    slug: "vucut-yag-orani",
    name: "Vücut Yağ Oranı",
    shortName: "Vücut Yağ %",
    category: "Metabolik",
    what: "Toplam vücut ağırlığının yağ dokusundan oluşan yüzdesi.",
    why: "Kiloya kıyasla metabolik sağlığı daha doğru yansıtır; kas kütlesi kaybı olmadan yağ kaybını ayırt etmeyi sağlar.",
    note: "Ölçüm yöntemine (DEXA, biyoelektrik empedans vb.) göre değerler farklılık gösterebilir.",
    relatedPeptideSlugs: ["retatrutide", "semaglutide", "tirzepatide"],
    relatedCaseStudySlug: "metabolik-reset",
  },
  {
    slug: "bdnf",
    name: "BDNF (Beyin Kaynaklı Nörotrofik Faktör)",
    shortName: "BDNF",
    category: "Kognitif",
    what: "Nöron büyümesini, hayatta kalmasını ve sinaptik plastisiteyi destekleyen bir protein.",
    why: "Kognitif protokollerde nöroplastisite ve öğrenme kapasitesiyle ilişkilendirilen bir belirteç olarak izlenir.",
    note: "Ölçüm birimi (ng/mL) laboratuvara göre değişebilir; tekil bir ölçüm klinik karar için yeterli değildir.",
    relatedPeptideSlugs: ["semax", "selank"],
    relatedCaseStudySlug: "kognitif-optimizasyon",
  },
]

export const getBiomarker = (slug: string) =>
  biomarkers.find((b) => b.slug === slug)
