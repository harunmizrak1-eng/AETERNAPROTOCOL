import type { ReactNode } from "react"
import type { Peptide } from "@/lib/peptides"

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
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <section className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </h3>
        {hint && (
          <span className="shrink-0 text-[11px] text-muted-foreground">{hint}</span>
        )}
      </div>
      <div className="mt-2.5">{children}</div>
    </section>
  )
}

/** Alanın sağ içinde duran birim etiketi (mg, mL). */
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

/** Bileşik seçimi. Açılır liste yerine kart ızgarası: seçenekler tek bakışta
 * görünür, dokunma hedefi büyük ve seçili olan ekranda kalır. Listedeki her
 * bileşik şu an kataloğumuzda satılıyor. */
export function PeptidePicker({
  options,
  value,
  onSelect,
}: {
  options: Peptide[]
  value: string
  onSelect: (slug: string) => void
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((peptide) => {
          const active = peptide.slug === value
          return (
            <button
              key={peptide.slug}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(peptide.slug)}
              className={`group relative min-h-[60px] rounded-xl border px-3 py-2.5 text-left transition-all duration-150 ${
                active
                  ? "border-gold bg-gold/[0.07] ring-1 ring-gold"
                  : "border-hairline bg-background hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_8px_20px_-10px_rgba(13,27,42,0.35)]"
              }`}
            >
              {/* Adlar kısaltılmaz: "NAD+ / NMN" telefonda üç noktaya düşüyor
                  ve hangi bileşik olduğu okunmuyordu. İki satıra sarar. */}
              <span
                className={`block pr-4 text-sm font-bold leading-tight transition-colors ${
                  active ? "text-gold" : "text-foreground group-hover:text-gold"
                }`}
              >
                {peptide.name}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                {peptide.category}
              </span>
              <span
                aria-hidden="true"
                className={`absolute right-2.5 top-2.5 text-xs font-bold text-gold transition-opacity ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                ✓
              </span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onSelect("")}
        className={`mt-2 min-h-10 w-full rounded-lg border border-dashed px-3 text-xs font-semibold transition-colors ${
          value === ""
            ? "border-gold/60 text-gold"
            : "border-hairline text-muted-foreground hover:border-gold hover:text-gold"
        }`}
      >
        Listede yok, miktarı kendim gireceğim
      </button>
    </div>
  )
}
