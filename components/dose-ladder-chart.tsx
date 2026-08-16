import type { DoseStep } from "@/lib/peptides"

/** Horizontal dose-escalation ladder. Bars are scaled only against this
 * compound's own maximum step - never compared across compounds, since
 * units and potency differ. Editorial/monochrome with a single gold
 * accent on the current-step marker, consistent with the rest of the
 * site's data visualization language. */
export function DoseLadderChart({ steps }: { steps: DoseStep[] }) {
  const max = Math.max(...steps.map((s) => s.amountValue), 1)

  return (
    <div
      role="img"
      aria-label={`Dozaj basamakları: ${steps
        .map((s) => `${s.label} ${s.amount}`)
        .join(", ")}`}
      className="flex flex-col gap-4"
    >
      {steps.map((step) => {
        const width = Math.max((step.amountValue / max) * 100, 4)
        return (
          <div
            key={step.label}
            className="grid grid-cols-[minmax(88px,auto)_1fr_auto] items-center gap-4 sm:grid-cols-[120px_1fr_auto]"
          >
            <span className="text-xs tracking-normal text-muted-foreground font-medium">
              {step.label}
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-full overflow-hidden rounded-none bg-hairline"
            >
              <span
                className="block h-full bg-gold/70"
                style={{ width: `${width}%` }}
              />
            </span>
            <span className="whitespace-nowrap text-right font-mono text-xs text-foreground/85">
              {step.amount}
            </span>
          </div>
        )
      })}
    </div>
  )
}
