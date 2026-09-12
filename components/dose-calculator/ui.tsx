import type { ReactNode } from "react"

/** Hazır seçim düğmesi. Yazı yazmadan tek dokunuşla değer girmek için. */
export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-lg border px-1 text-sm font-semibold tabular-nums transition-colors ${
        active
          ? "border-gold bg-gold text-primary-foreground"
          : "border-hairline bg-background text-foreground hover:border-gold hover:text-gold"
      }`}
    >
      {children}
    </button>
  )
}

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <section className="min-w-0">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </h3>
      <div className="mt-2.5">{children}</div>
    </section>
  )
}

/** Alanın sağ içinde duran birim etiketi (mg, mL, IU). */
export function UnitInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  unit,
  id,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  ariaLabel: string
  unit: string
  id?: string
}) {
  return (
    <div className="relative flex min-w-0">
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="min-h-12 w-full min-w-0 rounded-lg border border-hairline bg-background pl-3.5 pr-14 text-sm tabular-nums text-foreground outline-none transition-colors focus:border-gold"
      />
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
        {unit}
      </span>
    </div>
  )
}
