export interface CategoryCard {
  title: string
  subtitle: string
  peptides: string[]
}

export const categoryCards: CategoryCard[] = [
  {
    title: "Yağ Kaybı & Metabolizma",
    subtitle:
      "Metabolik direnç, iştah kontrolü ve yağ yakımı üzerine kişiye özel protokol. Diyet ve egzersizin yetersiz kaldığı noktada devreye girer.",
    peptides: [
      "Retatrutide",
      "Semaglutide",
      "Tirzepatide",
      "AOD-9604",
      "Fragment 176-191",
    ],
  },
  {
    title: "Doku Onarımı & İyileşme",
    subtitle:
      "Sakatlık sonrası tendon, eklem ve kas dokusunun desteklenmesi. Uzun süren iyileşme süreçlerinde kullanılan kanıta dayalı peptid protokolleri.",
    peptides: [
      "BPC-157",
      "TB-500",
      "BPC-157 + TB-500 Mix",
      "GHK-Cu",
      "Thymosin Alpha-1",
    ],
  },
  {
    title: "Anti-Aging & Cilt",
    subtitle:
      "Hücresel yenilenme, kolajen sentezi ve cilt kalitesi üzerine çalışan protokoller. Görünümü içeriden etkileyen yaklaşım.",
    peptides: ["GHK-Cu", "Epithalon", "Selank", "Semax", "PT-141"],
  },
  {
    title: "Performans & Enerji",
    subtitle:
      "Antrenman adaptasyonu, toparlanma süresi ve günlük enerji kapasitesi için hazırlanan protokoller. Sporcular ve aktif bireyler için.",
    peptides: ["CJC-1295", "Ipamorelin", "GHRP-2", "Hexarelin", "Tesamorelin"],
  },
  {
    title: "Longevity & Hücresel Sağlık",
    subtitle:
      "Sağlıklı yaşlanma ve hücre fonksiyonlarının desteklenmesi. Uzun vadeli biyolojik sürdürülebilirlik odaklı yaklaşım.",
    peptides: ["Epithalon", "Thymalin", "Humanin", "SS-31", "MOTS-c"],
  },
  {
    title: "Kognitif & Nörolojik",
    subtitle:
      "Odak, hafıza ve zihinsel netlik üzerine çalışan nöropeptid protokolleri. Yüksek performans gerektiren bireyler için.",
    peptides: ["Semax", "Selank", "Dihexa", "P-21", "Cerebrolysin"],
  },
]
