"use client"

import { useAssessment } from "@/components/assessment"

export function PeptideCta({
  goal,
  label = "Bu Bileşik İçin Değerlendirmeyi Başlat",
}: {
  goal?: string
  label?: string
}) {
  const { open } = useAssessment()

  return (
    <button
      type="button"
      onClick={() => open(goal ? { goal } : undefined)}
      className="rounded-md border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors duration-200 hover:bg-gold hover:text-primary-foreground"
    >
      {label}
    </button>
  )
}
