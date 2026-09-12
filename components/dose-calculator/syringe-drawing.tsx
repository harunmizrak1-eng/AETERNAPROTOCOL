import { useRef, useState } from "react"

/* Çizim SVG kullanıcı birimiyle ölçülür; viewBox 620x104. Telefonda çizim
 * küçüldüğü için skala rakamları okunmaz hale geliyor, kesin değerler bu
 * yüzden her zaman çizimin dışındaki sayı şeridinde de yazıyor.
 *
 * Gerçekte piston tamamen çekildiğinde kol bir gövde boyu dışarı çıkar; o
 * kadar yer ayırmak gövdeyi yarıya düşürüp skalayı okunmaz yapıyordu. Kol
 * hareketi PLUNGER_TRAVEL ile kısaltıldı. Ölçüm gövdeden okunduğu için bu
 * kısaltma sonucu etkilemiyor. */
const VB_W = 620
const VB_H = 104
const BARREL_X = 92
const BARREL_W = 340
const BARREL_Y = 30
const BARREL_H = 52
const PLUNGER_TRAVEL = 0.48

/* Açık zemin paleti. Site tek temalı (açık) olduğu için koyu varyant yok;
 * mürekkep tonları --foreground (#0d1b2a) üzerinden alfa ile türetildi. */
const INK = (a: number) => `rgba(13,27,42,${a})`
const BRAND = "#0072bc"

export interface Tick {
  at: number
  major: boolean
  label?: number
}

/** İnsülin şırıngasının ölçekli çizimi: çelik iğne ve eğik uç, konik göbek,
 * saydam gövde, kauçuk tıkaç, piston kolu ve başparmak desteği. Sıvı ile
 * tıkaç doza göre hareket eder, çekilecek yer gövdenin üstünde işaretlenir.
 * onScrub verildiğinde gövde sürüklenebilir olur. */
export function SyringeDrawing({
  fillPct,
  ticks,
  badge,
  maxUnits,
  snapStep,
  onScrub,
}: {
  fillPct: number
  ticks: Tick[]
  badge: string | null
  maxUnits: number
  snapStep: number
  onScrub?: (units: number) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  /* Sürükleme bayrağı hem ref hem durum olarak tutulur. Ref senkron
   * güncellendiği için pointerdown ile aynı tik içinde gelen pointermove
   * olayları kaçmaz; durum yalnızca imleç ve geçiş süresi için gerekli. */
  const draggingRef = useRef(false)
  const [dragging, setDragging] = useState(false)

  const barrelRight = BARREL_X + BARREL_W
  const stopperX = BARREL_X + fillPct * BARREL_W
  const thumbX = barrelRight + 12 + fillPct * BARREL_W * PLUNGER_TRAVEL
  const midY = BARREL_Y + BARREL_H / 2
  const badgeW = badge ? Math.max(64, badge.length * 6.2 + 18) : 0
  const badgeX = Math.min(
    VB_W - badgeW / 2 - 2,
    Math.max(badgeW / 2 + 2, stopperX),
  )
  /* Sürükleme sırasında geçiş kapatılır: her pointermove olayında yeniden
   * başlayan animasyon parmağın gerisinde kalıyordu. */
  const ease = dragging ? "0ms" : "650ms cubic-bezier(0.22, 0.61, 0.36, 1)"

  function emit(clientX: number) {
    if (!onScrub) return
    const svg = svgRef.current
    if (!svg) return
    const r = svg.getBoundingClientRect()
    if (r.width === 0) return
    const x = ((clientX - r.left) / r.width) * VB_W
    const frac = Math.max(0, Math.min(1, (x - BARREL_X) / BARREL_W))
    onScrub(Math.round((frac * maxUnits) / snapStep) * snapStep)
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full"
      role="img"
      aria-label={badge ? `Şırıngada ${badge} işaretli` : "Boş insülin şırıngası"}
    >
      <defs>
        <linearGradient id="dc-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8d2dd" />
          <stop offset="45%" stopColor="#8b9aab" />
          <stop offset="100%" stopColor="#5b6a7c" />
        </linearGradient>
        <linearGradient id="dc-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4aa6e0" />
          <stop offset="55%" stopColor={BRAND} />
          <stop offset="100%" stopColor="#005a96" />
        </linearGradient>
        <linearGradient id="dc-stopper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b7a8c" />
          <stop offset="50%" stopColor="#36434f" />
          <stop offset="100%" stopColor="#222d38" />
        </linearGradient>
        <clipPath id="dc-barrel-clip">
          <rect x={BARREL_X} y={BARREL_Y} width={BARREL_W} height={BARREL_H} rx="3" />
        </clipPath>
      </defs>

      {/* İğne: eğik uç ve çelik gövde */}
      <path d="M4 45.4 L16 43.6 L16 48.4 L4 48.4 Z" fill="url(#dc-steel)" />
      <rect x="14" y="44.2" width="58" height="4" fill="url(#dc-steel)" />
      {/* Göbek: iğneden gövdeye açılan koni */}
      <path
        d="M70 39 L88 33 L88 59 L70 53 Z"
        fill={INK(0.14)}
        stroke={INK(0.26)}
        strokeWidth="0.8"
      />
      <rect x="86" y="34" width="8" height="24" rx="1.5" fill={INK(0.2)} />

      {/* Gövde */}
      <rect
        x={BARREL_X}
        y={BARREL_Y}
        width={BARREL_W}
        height={BARREL_H}
        rx="3"
        fill={INK(0.03)}
        stroke={INK(0.28)}
        strokeWidth="1"
      />

      <g clipPath="url(#dc-barrel-clip)">
        {/* Sıvı */}
        <rect
          x={BARREL_X}
          y={BARREL_Y}
          height={BARREL_H}
          fill="url(#dc-liquid)"
          style={{ width: fillPct * BARREL_W, transition: `width ${ease}` }}
        />
        {/* Cam parlaması */}
        <rect
          x={BARREL_X}
          y={BARREL_Y + 4}
          width={BARREL_W}
          height="7"
          fill="rgba(255,255,255,0.4)"
        />
        {/* Skala çizgileri */}
        {ticks.map((t) => (
          <line
            key={t.at}
            x1={BARREL_X + t.at * BARREL_W}
            x2={BARREL_X + t.at * BARREL_W}
            y1={BARREL_Y}
            y2={BARREL_Y + (t.major ? 11 : 6)}
            stroke={t.major ? INK(0.5) : INK(0.24)}
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Arka tutamak kanatları */}
      <rect
        x={barrelRight}
        y={BARREL_Y - 9}
        width="7"
        height={BARREL_H + 18}
        rx="2"
        fill={INK(0.22)}
      />

      {/* Piston kolu ve başparmak desteği */}
      <g style={{ transition: `transform ${ease}` }}>
        <rect
          x={stopperX}
          y={midY - 4}
          width={Math.max(0, thumbX - stopperX)}
          height="8"
          fill={INK(0.16)}
          style={{ transition: `x ${ease}, width ${ease}` }}
        />
        <rect
          x={stopperX}
          y={midY - 0.7}
          width={Math.max(0, thumbX - stopperX)}
          height="1.4"
          fill={INK(0.24)}
          style={{ transition: `x ${ease}, width ${ease}` }}
        />
        <rect
          x={thumbX}
          y={BARREL_Y - 12}
          width="7"
          height={BARREL_H + 24}
          rx="2.5"
          fill={INK(0.28)}
          style={{ transition: `x ${ease}` }}
        />
      </g>

      {/* Kauçuk tıkaç. Konik ucu iğne tarafına bakar ve ucun bittiği nokta
          doz çizgisiyle aynı yerdedir: sıvı tam orada biter, okunacak değer
          de orasıdır. */}
      <g clipPath="url(#dc-barrel-clip)">
        <path
          d={`M${stopperX} ${midY} L${stopperX + 5} ${BARREL_Y + 1} L${stopperX + 15} ${BARREL_Y + 1} L${stopperX + 15} ${BARREL_Y + BARREL_H - 1} L${stopperX + 5} ${BARREL_Y + BARREL_H - 1} Z`}
          fill="url(#dc-stopper)"
          stroke={INK(0.3)}
          strokeWidth="0.8"
          style={{ transition: `d ${ease}` }}
        />
      </g>

      {/* Skala rakamları */}
      {ticks
        .filter((t) => t.label !== undefined)
        .map((t) => (
          <text
            key={`n${t.at}`}
            x={BARREL_X + t.at * BARREL_W}
            y={BARREL_Y + BARREL_H + 14}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="500"
            fill={INK(0.55)}
          >
            {t.label}
          </text>
        ))}

      {/* Sürükleme katmanı. Görünmez, gövdeyi kaplar ve en üstte durur.
          touchAction none olmasa sürüklerken sayfa kayıyor. */}
      {onScrub && (
        <rect
          x={BARREL_X}
          y={BARREL_Y - 14}
          width={BARREL_W}
          height={BARREL_H + 28}
          fill="transparent"
          style={{ touchAction: "none", cursor: dragging ? "grabbing" : "grab" }}
          onPointerDown={(e) => {
            /* Değer önce yazılır: setPointerCapture bazı durumlarda
             * InvalidPointerId atıyor ve sonrası hiç çalışmıyordu. */
            emit(e.clientX)
            draggingRef.current = true
            setDragging(true)
            try {
              e.currentTarget.setPointerCapture(e.pointerId)
            } catch {
              /* Yakalama olmadan da çalışır, yalnızca parmak gövdenin
               * dışına çıkarsa olay akışı kesilir. */
            }
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) emit(e.clientX)
          }}
          onPointerUp={(e) => {
            draggingRef.current = false
            setDragging(false)
            try {
              e.currentTarget.releasePointerCapture(e.pointerId)
            } catch {
              /* Yakalanmamışsa bırakılacak bir şey de yok. */
            }
          }}
          onPointerCancel={() => {
            draggingRef.current = false
            setDragging(false)
          }}
        />
      )}

      {/* Çekilecek yerin işareti */}
      {badge && (
        <g style={{ transition: `transform ${ease}` }}>
          <line
            x1={stopperX}
            x2={stopperX}
            y1="18"
            y2={BARREL_Y}
            stroke={BRAND}
            strokeWidth="1.2"
            style={{ transition: `x1 ${ease}, x2 ${ease}` }}
          />
          <rect
            x={badgeX - badgeW / 2}
            y="2"
            width={badgeW}
            height="17"
            rx="8.5"
            fill={BRAND}
            style={{ transition: `x ${ease}` }}
          />
          <text
            x={badgeX}
            y="14.2"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#ffffff"
            style={{ transition: `x ${ease}` }}
          >
            {badge}
          </text>
        </g>
      )}
    </svg>
  )
}
