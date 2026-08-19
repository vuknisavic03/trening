import { useState } from 'react'
import { ChevronLeft, ChevronRight, Youtube } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { ExerciseSheet } from '../components/library/ExerciseSheet'
import { DAYS, DAY_IDS, programOf } from '../data/programs'
import { EXERCISES } from '../data/exercises'
import { useStore } from '../store/useStore'
import type { ExerciseId } from '../types'

type Props = { onBack: () => void }

export function Vezbe({ onBack }: Props) {
  const videos = useStore((s) => s.videos)
  const [open, setOpen] = useState<ExerciseId | null>(null)

  return (
    <div className="flex flex-col gap-3">
      <header className="flex items-center gap-2 px-1 pb-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="Nazad"
          className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink2 active:bg-card"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
        </button>
        <div>
          <div className="label-lg">Biblioteka</div>
          <h1 className="h1 mt-1 text-[27px] leading-none">Vežbe</h1>
        </div>
      </header>

      {DAY_IDS.map((dayId) => {
        const day = DAYS[dayId]
        return (
          <Card key={dayId} className="overflow-hidden p-0">
            <div className="flex items-baseline justify-between gap-3 px-4 pb-3 pt-4">
              <span className="label-lg">{day.label}</span>
              <span className="label">{programOf(dayId).short}</span>
            </div>

            <div className="border-t border-line">
              {day.exercises.map((id) => {
                const ex = EXERCISES[id]
                return (
                  <button
                    key={`${dayId}-${id}`}
                    type="button"
                    onClick={() => setOpen(id)}
                    className="flex min-h-[58px] w-full items-center gap-3 border-b border-line px-4 text-left last:border-b-0 active:bg-bg"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-bold tracking-tight">
                        {ex.name}
                      </span>
                      <span className="label mt-0.5 block truncate">{ex.group}</span>
                    </span>
                    {videos[id] && (
                      <Youtube size={16} strokeWidth={2.2} className="shrink-0 text-accent" />
                    )}
                    <ChevronRight size={18} strokeWidth={2.2} className="shrink-0 text-ink3" />
                  </button>
                )
              })}
            </div>
          </Card>
        )
      })}

      <ExerciseSheet exercise={open} onClose={() => setOpen(null)} />
    </div>
  )
}
