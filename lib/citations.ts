// Real citations retrieved from PubMed (via the PubMed MCP tool) for this
// site's "proven" tier compounds. Every PMID/DOI/NCT number here is real and
// verifiable. Do not add an entry without retrieving it first, and never
// invent one for a compound this doesn't cover (theoretical/preclinical
// entries intentionally have no citation section).

export interface Citation {
  label: string
  authors: string
  journal: string
  year: number
  pmid: string
  doi: string
  nct?: string
  note: string
}

export const citations: Record<string, Citation> = {
  retatrutide: {
    label: "Birincil Çalışma",
    authors: "Jastreboff ve ark.",
    journal: "New England Journal of Medicine",
    year: 2023,
    pmid: "37366315",
    doi: "10.1056/NEJMoa2301972",
    nct: "NCT04881760",
    note: "Faz 2, randomize, plasebo kontrollü. Obezitede vücut ağırlığı birincil sonlanım noktası.",
  },
  semaglutide: {
    label: "Birincil Çalışma",
    authors: "Lincoff ve ark. (SELECT)",
    journal: "New England Journal of Medicine",
    year: 2023,
    pmid: "37952131",
    doi: "10.1056/NEJMoa2307563",
    nct: "NCT03574597",
    note: "Faz 3, randomize, plasebo kontrollü. Kardiyovasküler olay riski birincil sonlanım noktası.",
  },
  tirzepatide: {
    label: "Birincil Çalışma",
    authors: "Jastreboff ve ark. (SURMOUNT-1)",
    journal: "New England Journal of Medicine",
    year: 2022,
    pmid: "35658024",
    doi: "10.1056/NEJMoa2206038",
    nct: "NCT04184622",
    note: "Faz 3, randomize, plasebo kontrollü. Obezitede vücut ağırlığı birincil sonlanım noktası.",
  },
  cagrilintide: {
    label: "Birincil Çalışma",
    authors: "Garvey ve ark. (REDEFINE 1)",
    journal: "New England Journal of Medicine",
    year: 2025,
    pmid: "40544433",
    doi: "10.1056/NEJMoa2502081",
    nct: "NCT05567796",
    note: "Faz 3a, randomize, plasebo ve aktif kontrollü. Semaglutid ile kombinasyon (CagriSema) değerlendirildi.",
  },
  "ss-31-elamipretide": {
    label: "Mekanizma & Klinik Geliştirme İncelemesi",
    authors: "Szeto, H. H.",
    journal: "British Journal of Pharmacology",
    year: 2014,
    pmid: "24117165",
    doi: "10.1111/bph.12461",
    note: "Mekanizma ve klinik geliştirme programının derleme makalesi, tekil bir RCT değil.",
  },
  "pt-141": {
    label: "Birincil Çalışma",
    authors: "Kingsberg ve ark. (RECONNECT)",
    journal: "Obstetrics & Gynecology",
    year: 2019,
    pmid: "31599840",
    doi: "10.1097/AOG.0000000000003500",
    nct: "NCT02333071",
    note: "İki Faz 3, randomize, çift kör, plasebo kontrollü çalışma. Kadınlarda hipoaktif cinsel istek bozukluğu.",
  },
  tesamorelin: {
    label: "Meta-Analiz",
    authors: "Badran ve ark.",
    journal: "Obesity Research & Clinical Practice",
    year: 2026,
    pmid: "41545261",
    doi: "10.1016/j.orcp.2026.01.002",
    note: "5 randomize kontrollü çalışmanın meta-analizi. HIV ilişkili lipodistrofide vücut kompozisyonu.",
  },
}
