import { useEffect, useState } from 'react'
import { Card } from '../ui/Card'
import { LazyChart } from './LazyChart'
import { COLORS } from '../../data/theme'
import { DAYS, DAY_IDS } from '../../data/programs'
import { EXERCISES } from '../../data/exercises'
import { exerciseSeries } from '../../store/selectors'
import { useStore } from '../../store/useStore'
import type { DayId, ExerciseId } from '../../types'

export function ExercisePanel() {
  const sessions = useStore((s) => s.sessions)
  const [day, setDay] = useState<DayId>('u1')
  const [ex, setEx] = useState<ExerciseId>(DAYS.u1.exercises[0] as ExerciseId)

  useEffect(() => {
    if (!DAYS[day].exercises.includes(ex)) setEx(DAYS[day].exercises[0] as ExerciseId)
  }, [day, ex])

  const mode = day === 'bw' ? 'reps' : 'e1rm'
  const data = exerciseSeries(sessions, day, ex, mode)

  return (
    <Card className="p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="label-lg">Po vežbi</span>
        <span className="label">{mode === 'e1rm' ? 'procenjeni 1RM, Epley' : 'zbir ponavljanja'}</span>
      </div>

      <div className="no-scrollbar -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4">
        {DAY_IDS.map((id) => (
          <Chip key={id} on={id === day} onClick={() => setDay(id)}>
            {DAYS[id].short}
          </Chip>
        ))}
      </div>

      <div className="no-scrollbar -mx-4 mt-2 flex gap-1.5 overflow-x-auto px-4">
        {DAYS[day].exercises.map((id) => (
          <Chip key={id} on={id === ex} onClick={() => setEx(id)}>
            {EXERCISES[id].name}
          </Chip>
        ))}
      </div>

      <div className="mt-4">
        <LazyChart
          data={data}
          empty="Nema sačuvanih serija"
          series={[
            {
              key: 'value',
              name: mode === 'e1rm' ? '1RM (kg)' : 'Ponavljanja',
              color: COLORS.accent,
            },
          ]}
        />
      </div>
    </Card>
  )
}

function Chip({
  children,
  on,
  onClick,
}: {
  children: React.ReactNode
  on: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-full border px-3 text-[12px] font-bold tracking-tight ${
        on ? 'border-ink bg-ink text-white' : 'border-line bg-card text-ink2'
      }`}
    >
      {children}
    </button>
  )
}
