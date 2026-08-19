import { useMemo } from 'react'
import { GoalsPanel } from '../components/progress/GoalsPanel'
import { BodyPanel } from '../components/progress/BodyPanel'
import { ExercisePanel } from '../components/progress/ExercisePanel'
import { InBodyPanel } from '../components/progress/InBodyPanel'
import { MonthCalendar } from '../components/progress/MonthCalendar'
import { DataPanel } from '../components/progress/DataPanel'
import { projection } from '../store/selectors'
import { useStore } from '../store/useStore'
import type { DateKey } from '../types'

type Props = { today: DateKey }

export function Napredak({ today }: Props) {
  const inbody = useStore((s) => s.inbody)
  const p = useMemo(() => projection(inbody, today), [inbody, today])

  return (
    <div className="flex flex-col gap-3">
      <header className="px-1 pb-1">
        <div className="label-lg">Do decembra</div>
        <h1 className="h1 mt-1 text-[27px] leading-none">Napredak</h1>
      </header>

      <GoalsPanel p={p} />
      <BodyPanel today={today} />
      <InBodyPanel today={today} />
      <ExercisePanel />
      <MonthCalendar today={today} />
      <DataPanel />
    </div>
  )
}
