import { COLORS, RING } from '../../data/theme'
import { nfInt } from '../../lib/dates'

type Props = {
  value: number
  target: number
  label: string
  /** Koliko preko cilja je još u redu, pre nego što prsten pocrveni. */
  tolerance?: number
}

export function Ring({ value, target, label, tolerance = RING.tolerance }: Props) {
  const size = RING.size
  const stroke = RING.stroke
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const ratio = target > 0 ? Math.min(1, Math.max(0, value / target)) : 0
  const over = target > 0 && value > target * (1 + tolerance)

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={COLORS.line}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={over ? COLORS.warn : COLORS.accent}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          style={{ transition: 'stroke-dashoffset 0.35s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="num text-[34px] leading-none">{nfInt(value)}</div>
        <div className="label mt-1.5">
          od {nfInt(target)} {label}
        </div>
      </div>
    </div>
  )
}
