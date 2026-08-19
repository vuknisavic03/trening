import { useState } from 'react'
import { Timer, Youtube } from 'lucide-react'
import { NumField, sanitize, toNum } from '../ui/NumField'
import { EXERCISES } from '../../data/exercises'
import { formatSets, trimNum } from '../../store/selectors'
import type { ExerciseId, InputMode, SessionEntry, SetEntry } from '../../types'

type Draft = { w: string; r: string }

type Props = {
  index: number
  exercise: ExerciseId
  sets: number
  inputMode: InputMode
  repsLabel: string
  last: SessionEntry | null
  draft: SetEntry[]
  saved: boolean
  onChange: (sets: SetEntry[]) => void
  onVideo: () => void
  onRest: () => void
  hasVideo: boolean
}

function initial(draft: SetEntry[], sets: number): Draft[] {
  return Array.from({ length: sets }, (_, i) => {
    const d = draft[i]
    return {
      w: d && d.w > 0 ? trimNum(d.w) : '',
      r: d && d.r > 0 ? String(d.r) : '',
    }
  })
}

export function ExerciseBlock({
  index,
  exercise,
  sets,
  inputMode,
  repsLabel,
  last,
  draft,
  saved,
  onChange,
  onVideo,
  onRest,
  hasVideo,
}: Props) {
  const ex = EXERCISES[exercise]
  const withWeight = inputMode === 'weight-reps'
  const [rows, setRows] = useState<Draft[]>(() => initial(draft, sets))

  const update = (i: number, patch: Partial<Draft>): void => {
    const next = rows.map((row, j) => (j === i ? { ...row, ...patch } : row))
    setRows(next)
    onChange(next.map((row) => ({ w: toNum(row.w), r: toNum(row.r) })))
  }

  return (
    <section className="overflow-hidden rounded-card border border-line bg-card shadow-card">
      <div className="flex items-start gap-3 px-4 pt-4">
        <span className="mono mt-1 shrink-0 text-[11px] font-bold text-ink3">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="h2 text-[17px] leading-tight">{ex.name}</h3>
          <div className="label mt-1">{ex.group}</div>
        </div>
        <button
          type="button"
          onClick={onVideo}
          aria-label={`Video za ${ex.name}`}
          className={`-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            hasVideo ? 'text-accent' : 'text-ink3'
          } active:bg-bg`}
        >
          <Youtube size={19} strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3 px-4">
        <div className="min-w-0">
          <div className="label">Poslednji put</div>
          <div className="mono mt-1 truncate text-[12px] text-ink">
            {last ? formatSets(last.sets, withWeight) : 'nema unosa'}
          </div>
        </div>
        {saved && (
          <span className="label shrink-0 rounded-full bg-accentBg px-2 py-1 text-accent">
            sačuvano
          </span>
        )}
      </div>

      <div className="mt-3 divide-y divide-line border-t border-line">
        {rows.map((row, i) => {
          const prev = last?.sets[i]
          return (
            <div key={i} className="flex items-center gap-2 px-4 py-2.5">
              <span className="mono w-7 shrink-0 text-[11px] font-bold text-ink2">S{i + 1}</span>

              {withWeight && (
                <NumField
                  ariaLabel={`${ex.name}, serija ${i + 1}, kilogrami`}
                  value={row.w}
                  decimal
                  suffix="kg"
                  placeholder={prev ? trimNum(prev.w) : ''}
                  onChange={(v) => update(i, { w: sanitize(v, true) })}
                  className="flex-1"
                />
              )}

              <NumField
                ariaLabel={`${ex.name}, serija ${i + 1}, ponavljanja`}
                value={row.r}
                suffix="pon"
                placeholder={prev ? String(prev.r) : repsLabel === 'do otkaza' ? '' : repsLabel.split(' ')[0]}
                onChange={(v) => update(i, { r: sanitize(v, false) })}
                className={withWeight ? 'w-[96px] shrink-0' : 'flex-1'}
              />

              <button
                type="button"
                onClick={onRest}
                aria-label="Pokreni odmor"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink3 active:bg-bg"
              >
                <Timer size={17} strokeWidth={2.3} />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
