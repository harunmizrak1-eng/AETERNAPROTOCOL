"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import Link from "next/link"
import { Dialog } from "@base-ui/react/dialog"
import { categoryCards } from "@/lib/categories"
import { whatsappLink } from "@/lib/contact"

type Tier = "I" | "II" | "III"

interface AssessmentPreset {
  goal?: string
  tier?: Tier
}

interface AssessmentContextValue {
  open: (preset?: AssessmentPreset) => void
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null)

export function useAssessment() {
  const ctx = useContext(AssessmentContext)
  if (!ctx) {
    throw new Error("useAssessment must be used within an AssessmentProvider")
  }
  return ctx
}

const GOALS = categoryCards.map((c) => c.title)

const EXPERIENCE_OPTIONS = [
  "Hayır, ilk kez düşünüyorum",
  "Evet, kendi başıma denedim",
  "Evet, profesyonel destekle takip ettim",
]

const SUPPORT_OPTIONS: { tier: Tier; label: string }[] = [
  { tier: "I", label: "Tek seferlik yön belirleme" },
  { tier: "II", label: "Aşamalı, birebir yönlendirilen protokol" },
  { tier: "III", label: "Uzun vadeli, sürekli optimize edilen ortaklık" },
]

const BIOMARKER_OPTIONS = [
  "Evet, güncel değerlerim var",
  "Var, ama eski",
  "Henüz yok",
]

const HORIZON_OPTIONS = [
  "Kısa vade: belirli bir hedefe odaklı",
  "Orta vade: birkaç aylık yapılandırılmış süreç",
  "Uzun vade: sürdürülebilir bir sistem",
]

const EVIDENCE_OPTIONS = [
  "Yalnızca klinik kanıtı güçlü bileşikler",
  "Mekanizması sağlam, gelişmekte olan bileşiklere de açığım",
  "Kararı bir uzmanla birlikte vermek isterim",
]

const TIER_NAMES: Record<Tier, string> = {
  I: "Değerlendirme",
  II: "Kişisel Protokol",
  III: "Sürekli Optimizasyon",
}

/** Each focus area maps to a representative journal reading, used to give
 * the result a concrete next step rather than a dead end. */
const GOAL_READING: Record<string, { href: string; label: string }> = {
  "Yağ Kaybı & Metabolizma": {
    href: "/journal/yag-kaybi-protokol-mantigi",
    label: "Yağ kaybı protokolünün mantığı",
  },
  "Doku Onarımı & İyileşme": {
    href: "/journal/doku-onarimi-bpc157-tb500",
    label: "Doku onarımında iki peptidin birlikte çalışması",
  },
  "Anti-Aging & Cilt": {
    href: "/journal/cilt-icin-icten-yaklasim",
    label: "Cilt için içten yaklaşım",
  },
  "Performans & Enerji": {
    href: "/journal/performans-toparlanma-penceresi",
    label: "Toparlanma, performansın görünmeyen yarısı",
  },
  "Longevity & Hücresel Sağlık": {
    href: "/journal/hucresel-saglik-uzun-vade",
    label: "Hücresel sağlık, uzun vadeli bir proje",
  },
  "Kognitif & Nörolojik": {
    href: "/journal/kognitif-protokoller-semax-selank",
    label: "Kognitif protokollerde Rusya kaynaklı iki molekül",
  },
}

interface Answers {
  goal?: string
  experience?: string
  support?: string
  biomarker?: string
  horizon?: string
  evidence?: string
}

const QUESTION_COUNT = 6

function OptionList({
  options,
  value,
  onChange,
}: {
  options: string[]
  value?: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {options.map((option) => {
        const selected = value === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={selected}
            className={`rounded-sm border px-6 py-4 text-left text-sm leading-relaxed transition-colors duration-300 ${
              selected
                ? "border-gold bg-gold/10 text-foreground"
                : "border-hairline text-foreground/80 hover:border-gold/40"
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

function AssessmentDialog({
  isOpen,
  preset,
  onClose,
}: {
  isOpen: boolean
  preset: AssessmentPreset | null
  onClose: () => void
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  function reset(nextPreset: AssessmentPreset | null) {
    setStep(0)
    setAnswers({
      goal: nextPreset?.goal,
      support: SUPPORT_OPTIONS.find((s) => s.tier === nextPreset?.tier)?.label,
    })
  }

  function handleOpenChange(next: boolean) {
    if (!next) onClose()
  }

  const recommendedTier: Tier =
    preset?.tier ??
    SUPPORT_OPTIONS.find((s) => s.label === answers.support)?.tier ??
    "II"

  const notes: string[] = []
  if (answers.biomarker === BIOMARKER_OPTIONS[2]) {
    notes.push("İlk adım güncel biyobelirteç okuması olacak.")
  }
  if (answers.experience === EXPERIENCE_OPTIONS[0]) {
    notes.push("Bu alanda ilk kez ilerlediğiniz için başlangıçta daha yakın yönlendirme öneriyoruz.")
  }
  if (answers.horizon === HORIZON_OPTIONS[2]) {
    notes.push("Uzun vadeli ufkunuz, sürekli optimize edilen bir yaklaşımla uyumlu.")
  }
  if (answers.evidence === EVIDENCE_OPTIONS[0]) {
    notes.push("Yalnızca klinik kanıtı güçlü bileşiklerle ilerlemeyi tercih ediyorsunuz. Protokol bu kısıtla kurulur.")
  } else if (answers.evidence === EVIDENCE_OPTIONS[1]) {
    notes.push("Gelişmekte olan bileşiklere açıksınız; her birinin kanıt seviyesi süreç boyunca şeffaf şekilde paylaşılır.")
  }
  if (notes.length === 0) {
    notes.push("Seçimleriniz mevcut yaklaşımınızla uyumlu görünüyor.")
  }

  const reading = answers.goal ? GOAL_READING[answers.goal] : undefined

  const waMessage = [
    "Merhaba, ön değerlendirmeyi tamamladım.",
    answers.goal ? `Odak alanı: ${answers.goal}` : null,
    answers.horizon ? `Zaman ufku: ${answers.horizon}` : null,
    answers.evidence ? `Kanıt yaklaşımı: ${answers.evidence}` : null,
    `Önerilen seviye: ${TIER_NAMES[recommendedTier]} (Seviye ${recommendedTier})`,
    "Görüşme talep ediyorum.",
  ]
    .filter(Boolean)
    .join("\n")

  const waLink = whatsappLink(waMessage)

  const steps = [
    {
      label: "Öncelikli odak alanınız nedir?",
      value: answers.goal,
      options: GOALS,
      onChange: (v: string) => setAnswers((a) => ({ ...a, goal: v })),
    },
    {
      label: "Bu alanda daha önce yapılandırılmış bir protokol uyguladınız mı?",
      value: answers.experience,
      options: EXPERIENCE_OPTIONS,
      onChange: (v: string) => setAnswers((a) => ({ ...a, experience: v })),
    },
    {
      label: "Süreç boyunca ne düzeyde destek istersiniz?",
      value: answers.support,
      options: SUPPORT_OPTIONS.map((s) => s.label),
      onChange: (v: string) => setAnswers((a) => ({ ...a, support: v })),
    },
    {
      label: "Güncel biyobelirteç veya kan değeriniz mevcut mu?",
      value: answers.biomarker,
      options: BIOMARKER_OPTIONS,
      onChange: (v: string) => setAnswers((a) => ({ ...a, biomarker: v })),
    },
    {
      label: "Hangi zaman ufkunu düşünüyorsunuz?",
      value: answers.horizon,
      options: HORIZON_OPTIONS,
      onChange: (v: string) => setAnswers((a) => ({ ...a, horizon: v })),
    },
    {
      label: "Kanıt konusundaki yaklaşımınız hangisine yakın?",
      value: answers.evidence,
      options: EVIDENCE_OPTIONS,
      onChange: (v: string) => setAnswers((a) => ({ ...a, evidence: v })),
    },
  ]

  const current = steps[step]
  const isResult = step === QUESTION_COUNT

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={(open) => {
        if (open) reset(preset)
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[71] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-hairline bg-surface p-8 outline-none data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 sm:p-10">
          {!isResult && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-normal text-gold font-medium">
                  Ön Değerlendirme
                </p>
                <p className="text-xs tracking-normal text-muted-foreground font-medium">
                  {step + 1} / {QUESTION_COUNT}
                </p>
              </div>

              <Dialog.Title className="mt-8 text-balance text-2xl leading-snug tracking-wide text-foreground sm:text-3xl">
                {current.label}
              </Dialog.Title>

              <OptionList
                options={current.options}
                value={current.value}
                onChange={current.onChange}
              />

              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={`text-xs font-semibold text-muted-foreground transition-opacity hover:opacity-70 ${
                    step === 0 ? "invisible" : ""
                  }`}
                >
                  ← Geri
                </button>
                <button
                  type="button"
                  disabled={!current.value}
                  onClick={() =>
                    setStep((s) => Math.min(QUESTION_COUNT, s + 1))
                  }
                  className="border border-gold/60 px-8 py-3 text-xs font-semibold font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold rounded-sm"
                >
                  {step === QUESTION_COUNT - 1 ? "Sonucu Gör" : "İleri"}
                </button>
              </div>
            </>
          )}

          {isResult && (
            <>
              <p className="text-xs tracking-normal text-gold font-medium">
                Kişisel Analiziniz
              </p>
              <Dialog.Title className="mt-6 text-balance text-2xl leading-snug tracking-wide text-foreground sm:text-3xl">
                Önerilen başlangıç noktanız
              </Dialog.Title>

              <div className="mt-8 flex items-baseline gap-4 border border-gold/40 bg-gold/5 px-6 py-5 rounded-sm">
                <span className="text-3xl text-gold">
                  {recommendedTier}
                </span>
                <span className="text-xl text-foreground">
                  {TIER_NAMES[recommendedTier]}
                </span>
              </div>

              <ul className="mt-8 flex flex-col gap-2">
                {notes.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 flex-shrink-0 bg-gold/60"
                    />
                    {n}
                  </li>
                ))}
              </ul>

              {reading && (
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  Bu arada okumak isteyebilirsiniz:{" "}
                  <Link
                    href={reading.href}
                    onClick={onClose}
                    className="text-gold underline-offset-4 hover:underline"
                  >
                    {reading.label}
                  </Link>
                </p>
              )}

              <Dialog.Description className="mt-8 text-[0.7rem] leading-relaxed text-muted-foreground">
                Bu ön değerlendirme bilgilendirme amaçlıdır; tıbbi teşhis ya da
                kesin protokol ataması değildir. Nihai plan, danışmanlık
                görüşmesinde birlikte netleştirilir.
              </Dialog.Description>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full rounded-sm border border-gold/60 px-8 py-4 text-center text-xs tracking-normal font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground sm:w-auto"
                >
                  Başvuruyu Gönder
                </a>
                <Dialog.Close className="text-xs tracking-normal text-muted-foreground transition-opacity hover:opacity-70 font-medium">
                  Kapat
                </Dialog.Close>
              </div>
            </>
          )}

          <Dialog.Close
            aria-label="Kapat"
            className="absolute right-6 top-6 text-muted-foreground transition-colors hover:text-foreground"
          >
            ✕
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preset, setPreset] = useState<AssessmentPreset | null>(null)

  const value = useMemo<AssessmentContextValue>(
    () => ({
      open: (nextPreset) => {
        setPreset(nextPreset ?? null)
        setIsOpen(true)
      },
    }),
    [],
  )

  return (
    <AssessmentContext.Provider value={value}>
      {children}
      <AssessmentDialog
        isOpen={isOpen}
        preset={preset}
        onClose={() => setIsOpen(false)}
      />
    </AssessmentContext.Provider>
  )
}
