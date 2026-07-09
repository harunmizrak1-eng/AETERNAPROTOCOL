/**
 * The brand's one signature motion element (see AGENTS.md; UNIQUE SIGNATURE):
 * a near-invisible, slow-pulsing line evoking continuous biomarker monitoring.
 * Pure CSS animation, no JS, respects prefers-reduced-motion.
 */
export function HeroSignature() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      className="signature-pulse pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
    >
      <path
        d="M-40,230 C80,205 130,270 220,190 C310,110 370,250 460,205 C550,160 610,265 700,195 C790,125 855,235 945,205 C1035,175 1095,245 1185,195 C1275,145 1335,225 1480,205"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
