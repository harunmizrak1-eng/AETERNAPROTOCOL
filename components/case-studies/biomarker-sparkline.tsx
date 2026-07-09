/** Decorative directional glyph next to a biomarker's change value; the
 * actual numbers already live in the adjacent table cells as text, so this
 * never carries information on its own (color is never the only signal). */
export function BiomarkerSparkline({ direction }: { direction: "up" | "down" }) {
  const y1 = direction === "up" ? 18 : 6
  const y2 = direction === "up" ? 6 : 18

  return (
    <svg
      viewBox="0 0 48 24"
      width="48"
      height="24"
      aria-hidden="true"
      className="shrink-0"
    >
      <line
        x1="4"
        y1={y1}
        x2="40"
        y2={y2}
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy={y2} r="3.5" fill="var(--gold)" />
    </svg>
  )
}
