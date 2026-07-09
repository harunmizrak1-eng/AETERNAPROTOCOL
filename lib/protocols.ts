import type { EvidenceTier } from "@/lib/peptides"

export interface Protocol {
  slug: string
  name: string
  tagline: string
  goal: string
  summary: string
  /** Overall evidence posture of the protocol's core compounds. */
  tier: EvidenceTier
  tierNote: string
  peptideSlugs: string[]
  caseStudySlug?: string
  relatedArticleSlugs: string[]
}

export const protocols: Protocol[] = [
  {
    slug: "metabolik-reset",
    name: "Metabolik Reset",
    tagline: "Yağ kaybı & metabolik direnç",
    goal: "Yağ Kaybı & Metabolizma",
    summary:
      "Metabolik direnci kırmak, iştah kontrolünü yeniden kurmak ve kardiyometabolik risk profilini iyileştirmek için yapılandırılmış giriş protokolü. Çekirdeği, insan çalışmalarıyla desteklenen inkretin bazlı moleküllerdir.",
    tier: "proven",
    tierNote:
      "Çekirdek moleküllerin tamamı randomize kontrollü insan çalışmalarıyla desteklenir.",
    peptideSlugs: ["retatrutide", "semaglutide", "tirzepatide"],
    caseStudySlug: "metabolik-reset",
    relatedArticleSlugs: [
      "yag-kaybi-protokol-mantigi",
      "apob-ldl-den-neden-daha-iyi",
      "retatrutide-nedir",
    ],
  },
  {
    slug: "recovery-stack",
    name: "Recovery Stack",
    tagline: "Doku onarımı & toparlanma",
    goal: "Doku Onarımı & İyileşme",
    summary:
      "Tendon, eklem ve kas dokusunun toparlanmasını desteklemek, spora güvenli dönüş süresini kısaltmak için sporcular ve aktif bireyler odaklı kombinasyon. Mekanizma iyi tanımlı; insan verisi hâlâ olgunlaşıyor.",
    tier: "theoretical",
    tierNote:
      "Preklinik veri güçlü, mekanizma iyi tanımlı; geniş ölçekli kontrollü insan çalışması sınırlı.",
    peptideSlugs: ["bpc-157", "tb-500"],
    caseStudySlug: "recovery-stack",
    relatedArticleSlugs: [
      "doku-onarimi-bpc157-tb500",
      "performans-toparlanma-penceresi",
    ],
  },
  {
    slug: "longevity-foundation",
    name: "Longevity Foundation",
    tagline: "Hücresel sağlık & sağlıklı yaşlanma",
    goal: "Longevity & Hücresel Sağlık",
    summary:
      "Mitokondriyal fonksiyon ve hücresel enerji metabolizması üzerine kurulu, uzun vadeli bir temel protokol. Kanıt seviyesi molekülden moleküle değişir; bu ayrım hiçbir zaman bulanıklaştırılmaz.",
    tier: "theoretical",
    tierNote:
      "Moleküller arasında kanıt seviyesi değişkendir; SS-31 klinik test edilmişken, bazı bileşikler preklinik aşamadadır.",
    peptideSlugs: ["ss-31-elamipretide", "nad-nmn", "mots-c", "epithalon"],
    relatedArticleSlugs: [
      "hucresel-saglik-uzun-vade",
      "healthspan-vs-lifespan",
    ],
  },
]

export const getProtocol = (slug: string) =>
  protocols.find((p) => p.slug === slug)
