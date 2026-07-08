export interface ScoreOption {
  label: string
  value: number
}

export interface ScoreDimension {
  id: string
  question: string
  options: ScoreOption[]
}

export const scoreDimensions: ScoreDimension[] = [
  {
    id: "sleep",
    question: "Uyku süreniz ve düzeniniz nasıl?",
    options: [
      { label: "5 saatin altında, düzensiz", value: 20 },
      { label: "5–7 saat, orta kalite", value: 55 },
      { label: "7–9 saat, düzenli", value: 90 },
    ],
  },
  {
    id: "training",
    question: "Haftalık antrenman sıklığınız nedir?",
    options: [
      { label: "Hiç yapmıyorum", value: 10 },
      { label: "Haftada 1–2 kez", value: 40 },
      { label: "Haftada 3–4 kez", value: 70 },
      { label: "Haftada 5 veya daha fazla", value: 95 },
    ],
  },
  {
    id: "nutrition",
    question: "Beslenme düzeninizi nasıl tanımlarsınız?",
    options: [
      { label: "Düzensiz, ağırlıklı işlenmiş gıda", value: 20 },
      { label: "Orta, karışık", value: 55 },
      { label: "Büyük ölçüde bütün gıda", value: 85 },
    ],
  },
  {
    id: "stress",
    question: "Genel stres düzeyinizi nasıl değerlendirirsiniz?",
    options: [
      { label: "Yüksek, sürekli", value: 20 },
      { label: "Orta, dalgalı", value: 55 },
      { label: "Düşük, yönetilebilir", value: 85 },
    ],
  },
  {
    id: "habits",
    question: "Sigara veya alkol kullanımınız nasıl?",
    options: [
      { label: "Düzenli sigara ve/veya yüksek alkol", value: 10 },
      { label: "Ara sıra", value: 50 },
      { label: "Kullanmıyorum", value: 95 },
    ],
  },
  {
    id: "biomarkers",
    question: "Biyobelirteç veya check-up takibiniz ne zamandı?",
    options: [
      { label: "Hiç yaptırmadım", value: 20 },
      { label: "Birkaç yıl önce", value: 55 },
      { label: "Son 12 ay içinde", value: 90 },
    ],
  },
]

export function computeScore(answers: Record<string, number>) {
  const values = scoreDimensions
    .map((d) => answers[d.id])
    .filter((v): v is number => typeof v === "number")

  if (values.length === 0) return 0

  const sum = values.reduce((acc, v) => acc + v, 0)
  return Math.round(sum / values.length)
}
