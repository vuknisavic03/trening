import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  eachDayOfInterval,
  endOfMonth,
  getISODay,
  isSameMonth,
  startOfMonth,
} from 'date-fns'
import { Card } from '../ui/Card'
import { Sheet } from '../ui/Sheet'
import { CALENDAR_STEPS, COLORS } from '../../data/theme'
import { DAYS } from '../../data/programs'
import { EXERCISES } from '../../data/exercises'
import { MEALS, MEAL_IDS } from '../../data/meals'
import { dotDate, fromKey, keyOf, monthTitle } from '../../lib/dates'
import { formatSets, markedItems, mealsEaten } from '../../store/selectors'
import { useStore } from '../../store/useStore'
import type { DateKey, DayId, ExerciseId, SetEntry } from '../../types'

const WEEK_LETTERS = ['P', 'U', 'S', 'Č', 'P', 'S', 'N']

type Props = { today: DateKey }

type SavedRow = { day: DayId; ex: ExerciseId; sets: SetEntry[] }

export function MonthCalendar({ today }: Props) {
  const days = useStore((s) => s.days)
  const sessions = useStore((s) => s.sessions)
  const [offset, setOffset] = useState(0)
  const [picked, setPicked] = useState<DateKey | null>(null)

  const month = useMemo(() => {
    const d = fromKey(today)
    d.setDate(1)
    d.setMonth(d.getMonth() + offset)
    return d
  }, [today, offset])

  const cells = useMemo(() => {
    const first = startOfMonth(month)
    const last = endOfMonth(month)
    const lead = getISODay(first) - 1
    const list = eachDayOfInterval({ start: first, end: last })
    return [...Array.from({ length: lead }, () => null), ...list]
  }, [month])

  const saved: SavedRow[] = useMemo(() => {
    if (!picked) return []
    const rows: SavedRow[] = []
    for (const [key, list] of Object.entries(sessions)) {
      const [day, ex] = key.split(':') as [DayId, ExerciseId]
      for (const entry of list) {
        if (entry.date === picked) rows.push({ day, ex, sets: entry.sets })
      }
    }
    return rows
  }, [picked, sessions])

  const log = picked ? days[picked] : undefined

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="label-lg capitalize">{monthTitle(month)}</span>
        <div className="-mr-2 flex">
          <button
            type="button"
            onClick={() => setOffset((o) => o - 1)}
            aria-label="Prethodni mesec"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink2 active:bg-bg"
          >
            <ChevronLeft size={19} strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={() => setOffset((o) => Math.min(0, o + 1))}
            disabled={offset >= 0}
            aria-label="Sledeći mesec"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink2 disabled:opacity-30 active:bg-bg"
          >
            <ChevronRight size={19} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {WEEK_LETTERS.map((l, i) => (
          <div key={i} className="label pb-1 text-center">
            {l}
          </div>
        ))}

        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />
          const key = keyOf(d)
          const dayLog = days[key]
          const marks = dayLog ? markedItems(dayLog) : 0
          const meals = dayLog ? mealsEaten(dayLog) : 0
          const strength = dayLog?.strength ?? null
          const isToday = key === today
          const dim = !isSameMonth(d, month)

          const step = CALENDAR_STEPS[Math.min(4, marks)]

          return (
            <button
              key={key}
              type="button"
              onClick={() => setPicked(key)}
              style={{
                backgroundColor: step.bg,
                color: marks === 0 && meals > 0 ? COLORS.ink2 : step.text,
              }}
              className={`relative flex aspect-square items-center justify-center rounded-[10px] ${
                dim ? 'opacity-40' : ''
              } ${isToday ? 'ring-2 ring-ink ring-offset-1 ring-offset-card' : ''}`}
            >
              <span className="num text-[13px] leading-none">{d.getDate()}</span>
              {strength && (
                <span
                  className="absolute bottom-1 h-1 w-1 rounded-full"
                  style={{ backgroundColor: marks >= 3 ? '#FFFFFF' : COLORS.accent }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line pt-3">
        {CALENDAR_STEPS.map((s, i) => (
          <Legend key={i} bg={s.bg} label={i === 0 ? 'ništa' : i === 4 ? '4 oznake' : String(i)} />
        ))}
      </div>

      <Sheet
        open={picked !== null}
        onClose={() => setPicked(null)}
        title={picked ? dotDate(picked) : ''}
        subtitle="Šta je tog dana zabeleženo"
      >
        <div className="flex flex-col gap-4 pb-2">
          <div>
            <div className="label-lg">Traka dana</div>
            <ul className="mt-2 space-y-1.5">
              <Item label="Kardio" ok={Boolean(log?.cardio)} />
              <Item
                label="Trening snage"
                ok={Boolean(log?.strength)}
                value={log?.strength ? DAYS[log.strength].label : undefined}
              />
              <Item label="Kalorije u cilju" ok={Boolean(log?.kcal)} />
              <Item label="Koraci" ok={Boolean(log?.steps)} />
            </ul>
          </div>

          <div>
            <div className="label-lg">Obroci</div>
            <ul className="mt-2 space-y-1.5">
              {MEAL_IDS.map((id) => (
                <Item key={id} label={MEALS[id].name} ok={Boolean(log?.meals[id])} />
              ))}
            </ul>
          </div>

          <div>
            <div className="label-lg">Serije</div>
            {saved.length === 0 ? (
              <div className="label mt-2">nema sačuvanog treninga</div>
            ) : (
              <ul className="mt-2 space-y-2">
                {saved.map((row, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 truncate text-[13px] font-bold tracking-tight">
                      {EXERCISES[row.ex].name}
                    </span>
                    <span className="mono shrink-0 text-[11px] text-ink2">
                      {formatSets(row.sets, row.day !== 'bw')}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Sheet>
    </Card>
  )
}

function Legend({ bg, label }: { bg: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded-[4px] border border-line" style={{ backgroundColor: bg }} />
      <span className="label">{label}</span>
    </span>
  )
}

function Item({ label, ok, value }: { label: string; ok: boolean; value?: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3 text-[13px]">
      <span className="font-bold tracking-tight">{label}</span>
      <span className={`mono text-[11px] ${ok ? 'text-accent' : 'text-ink3'}`}>
        {ok ? (value ?? 'da') : 'ne'}
      </span>
    </li>
  )
}
