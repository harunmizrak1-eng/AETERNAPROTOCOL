"use client"

import { useAssessment } from "@/components/assessment"

export function PeptideCta({ goal }: { goal?: string }) {
  const { open } = useAssessment()

  return (
    <button
      type="button"
      onClick={() => open(goal ? { goal } : undefined)}
      className="rounded-sm border border-gold/60 px-8 py-3.5 text-[0.65rem] uppercase tracking-eyebrow font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
    >
      Bu Bileşik İçin Değerlendirme Başlat
    </button>
  )
}
