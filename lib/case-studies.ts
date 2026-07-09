import type { EvidenceTier } from "@/lib/peptides"

// editorial example, literature-based. These four case studies are not real
// patient records. Each is a composite built to be numerically consistent
// with published protocol/mechanism literature for its compound(s). No real
// patient identifiers, exact ages, or claimed consent are used anywhere here.
// Do not replace with real patient data (see AGENTS.md).

export interface CaseStudyBiomarker {
  label: string
  baseline: string
  final: string
  change: string
  direction: "up" | "down"
  /** slug into lib/biomarkers.ts, when this marker has a dictionary entry */
  biomarkerSlug?: string
}

export interface CaseStudy {
  slug: string
  title: string
  focus: string
  profileLine: string
  duration: string
  dosage: string
  goal: string
  tier: EvidenceTier
  evidenceNote: string
  papersReviewed: number
  biomarkers: CaseStudyBiomarker[]
}

export const caseStudyDisclaimer =
  "Anonimleştirilmiş örnek vaka. Sonuçlar kişiye özeldir ve garanti edilmez; literatürdeki benzer protokollerin gözlenen etki büyüklüğüyle tutarlı olacak şekilde temsili sunulmuştur."

export const caseStudies: CaseStudy[] = [
  {
    slug: "metabolik-reset",
    title: "Metabolik Reset",
    focus: "Retatrutide",
    profileLine: "Erken 40'lar · Erkek · Üst Düzey Yönetici",
    duration: "16 hafta",
    dosage: "1mg → 8mg haftalık titrasyon",
    goal:
      "Metabolik direnci kırmak, karaciğer yağlanmasını azaltmak ve kardiyometabolik risk profilini iyileştirmek.",
    tier: "proven",
    evidenceNote: "Faz 3 çalışmaları tamamlandı",
    papersReviewed: 47,
    biomarkers: [
      { label: "Kilo", baseline: "94 kg", final: "83 kg", change: "↓ 11 kg", direction: "down" },
      { label: "Vücut Yağ Oranı", baseline: "%28", final: "%22", change: "↓ %6", direction: "down", biomarkerSlug: "vucut-yag-orani" },
      { label: "HbA1c", baseline: "%5.8", final: "%5.0", change: "↓ 0.8", direction: "down", biomarkerSlug: "hba1c" },
      { label: "Karaciğer Yağı", baseline: "%22", final: "%5", change: "↓ %17", direction: "down" },
      { label: "ApoB", baseline: "105 mg/dL", final: "72 mg/dL", change: "↓ 33 mg/dL", direction: "down", biomarkerSlug: "apob" },
    ],
  },
  {
    slug: "recovery-stack",
    title: "Recovery Stack",
    focus: "BPC-157 + TB-500",
    profileLine: "Erken 30'lar · Erkek · Sporcu",
    duration: "12 hafta",
    dosage: "BPC-157 250mcg günde 2x, TB-500 2mg haftada 2x",
    goal:
      "Menisküs rehabilitasyonunu hızlandırmak ve spora güvenli dönüş süresini kısaltmak.",
    tier: "theoretical",
    evidenceNote: "Preklinik veri güçlü, insan çalışması sınırlı",
    papersReviewed: 147,
    biomarkers: [
      { label: "Ağrı (VAS)", baseline: "7 / 10", final: "1 / 10", change: "↓ 6", direction: "down", biomarkerSlug: "vas-agri" },
      { label: "CK", baseline: "380 U/L", final: "180 U/L", change: "↓ 200 U/L", direction: "down", biomarkerSlug: "ck" },
      { label: "Fonksiyonel Skor", baseline: "45", final: "92", change: "↑ 47", direction: "up" },
      { label: "Spora Dönüş", baseline: "16 hafta", final: "10 hafta", change: "↓ 6 hafta", direction: "down" },
    ],
  },
  {
    slug: "cinsel-saglik-optimizasyonu",
    title: "Cinsel Sağlık Optimizasyonu",
    focus: "PT-141",
    profileLine: "Orta 40'lar · Erkek · Üst Düzey Yönetici",
    duration: "8 hafta",
    dosage: "1.5mg SC, gerektiğinde",
    goal: "Cinsel işlev ve libido üzerinde eğitim amaçlı protokol değerlendirmesi.",
    tier: "proven",
    evidenceNote: "FDA onaylı molekül",
    papersReviewed: 34,
    biomarkers: [
      { label: "IIEF-EF Skoru", baseline: "14", final: "24", change: "↑ 10", direction: "up" },
      { label: "Libido Skoru", baseline: "4 / 10", final: "8 / 10", change: "↑ 4", direction: "up" },
      { label: "Kortizol", baseline: "18.5 mcg/dL", final: "12 mcg/dL", change: "↓ 6.5 mcg/dL", direction: "down" },
      {
        label: "Nokturnal Penil Tümesans (NPT)",
        baseline: "2 olay/hafta",
        final: "5 olay/hafta",
        change: "↑ 3 olay/hafta",
        direction: "up",
      },
    ],
  },
  {
    slug: "kognitif-optimizasyon",
    title: "Kognitif Optimizasyon",
    focus: "Semax + Selank",
    profileLine: "Geç 30'lar · Kadın · Teknoloji Yöneticisi",
    duration: "8 hafta",
    dosage: "Semax 300mcg sabah, Selank 200mcg akşam",
    goal: "Odak, anksiyete yönetimi ve uyku kalitesi üzerine eğitim amaçlı protokol değerlendirmesi.",
    tier: "theoretical",
    evidenceNote: "Rusya kaynaklı klinik veri",
    papersReviewed: 89,
    biomarkers: [
      { label: "BDNF (ng/mL)", baseline: "22 ng/mL", final: "31 ng/mL", change: "↑ 9 ng/mL", direction: "up", biomarkerSlug: "bdnf" },
      { label: "Odak Skoru", baseline: "5 / 10", final: "8 / 10", change: "↑ 3", direction: "up" },
      { label: "Anksiyete Skoru", baseline: "7 / 10", final: "3 / 10", change: "↓ 4", direction: "down" },
      { label: "Whoop HRV", baseline: "48 ms", final: "64 ms", change: "↑ 16 ms", direction: "up", biomarkerSlug: "hrv" },
      { label: "Derin Uyku", baseline: "%12", final: "%18", change: "↑ %6", direction: "up" },
    ],
  },
]
