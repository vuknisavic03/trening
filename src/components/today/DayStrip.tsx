import { Check, Dumbbell, Flame, Footprints, HeartPulse } from 'lucide-react'
import { CARDIO_MIN, STEPS_TARGET } from '../../data/theme'
import { DAYS } from '../../data/programs'
import { nfInt } from '../../lib/dates'
import type { DayLog } from '../../types'

type Props = {
  log: DayLog
  kcalTarget: number
  onToggleCardio: () => void
  onToggleKcal: () => void
  onToggleSteps: () => void
  onPickStrength: () => void
}

type RowProps = {
  Icon: typeof Check
  title: string
  meta: string
  done: boolean
  onClick: () => void
}

function Row({ Icon, title, meta, done, onClick }: RowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={done}
      className="flex min-h-[56px] w-full items-center gap-3 border-b border-line px-4 last:border-b-0 active:bg-bg"
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          done ? 'bg-accent text-white' : 'bg-bg text-ink3'
        }`}
      >
        {done ? <Check size={16} strokeWidth={3} /> : <Icon size={16} strokeWidth={2.2} />}
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span
          className={`block truncate text-[15px] font-bold tracking-tight ${
            done ? 'text-accent' : 'text-ink'
          }`}
        >
          {title}
        </span>
      </span>

      <span
        className={`label shrink-0 rounded-full px-2.5 py-1 ${
          done ? 'bg-accentBg text-accent' : 'bg-bg text-ink3'
        }`}
      >
        {meta}
      </span>
    </button>
  )
}

export function DayStrip({
  log,
  kcalTarget,
  onToggleCardio,
  onToggleKcal,
  onToggleSteps,
  onPickStrength,
}: Props) {
  const strengthDone = log.strength !== null

  return (
    <div className="overflow-hidden rounded-card border border-line bg-card shadow-card">
      <Row
        Icon={HeartPulse}
        title="Kardio"
        meta={`${CARDIO_MIN} min`}
        done={log.cardio}
        onClick={onToggleCardio}
      />
      <Row
        Icon={Dumbbell}
        title="Trening snage"
        meta={strengthDone && log.strength ? DAYS[log.strength].short : 'izaberi'}
        done={strengthDone}
        onClick={onPickStrength}
      />
      <Row
        Icon={Flame}
        title="Kalorije u cilju"
        meta={`${nfInt(kcalTarget)} kcal`}
        done={log.kcal}
        onClick={onToggleKcal}
      />
      <Row
        Icon={Footprints}
        title="Koraci"
        meta={nfInt(STEPS_TARGET)}
        done={log.steps}
        onClick={onToggleSteps}
      />
    </div>
  )
}
