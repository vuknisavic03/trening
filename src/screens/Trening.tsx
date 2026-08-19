import { useEffect, useState } from 'react'
import { BookOpen, Save } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Segmented } from '../components/ui/Segmented'
import { RestTimerBar } from '../components/training/RestTimerBar'
import { ExerciseBlock } from '../components/training/ExerciseBlock'
import { ExerciseSheet } from '../components/library/ExerciseSheet'
import { DAYS, PROGRAMS, WEEKDAY_NAMES } from '../data/programs'
import { draftKey, useStore } from '../store/useStore'
import { toast } from '../store/useToast'
import { historyFor, lastSession } from '../store/selectors'
import { useRestTimer } from '../hooks/useRestTimer'
import type { DateKey, DayId, ExerciseId, ProgramId } from '../types'

type Props = {
  today: DateKey
  requestedDay: DayId | null
  onDayConsumed: () => void
  onOpenLibrary: () => void
}

export function Trening({ today, requestedDay, onDayConsumed, onOpenLibrary }: Props) {
  const program = useStore((s) => s.settings.program)
  const setProgram = useStore((s) => s.setProgram)
  const sessions = useStore((s) => s.sessions)
  const drafts = useStore((s) => s.drafts)
  const videos = useStore((s) => s.videos)
  const setDraft = useStore((s) => s.setDraft)
  const saveWorkout = useStore((s) => s.saveWorkout)

  const [day, setDay] = useState<DayId>(() => PROGRAMS[program].days[0] as DayId)
  const [sheet, setSheet] = useState<ExerciseId | null>(null)

  useEffect(() => {
    if (requestedDay) {
      setProgram(DAYS[requestedDay].program)
      setDay(requestedDay)
      onDayConsumed()
    }
  }, [requestedDay, onDayConsumed, setProgram])

  useEffect(() => {
    const days = PROGRAMS[program].days
    if (!days.includes(day)) setDay(days[0] as DayId)
  }, [program, day])

  const cfg = PROGRAMS[program]
  const timer = useRestTimer(cfg.restSec)
  const dayCfg = DAYS[day]

  const save = (): void => {
    const n = saveWorkout(today, day)
    toast(n > 0 ? `Sačuvano, ${n} ${n === 1 ? 'vežba' : 'vežbe'}` : 'Nema šta da se sačuva')
  }

  return (
    <div className="flex flex-col gap-3">
      <header className="flex items-end justify-between gap-3 px-1 pb-1">
        <div>
          <div className="label-lg">{cfg.name}</div>
          <h1 className="h1 mt-1 text-[27px] leading-none">Trening</h1>
        </div>
        <button
          type="button"
          onClick={onOpenLibrary}
          className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-line bg-card px-3.5 text-[13px] font-bold tracking-tight text-ink2 active:bg-bg"
        >
          <BookOpen size={15} strokeWidth={2.3} />
          Vežbe
        </button>
      </header>

      <Segmented<ProgramId>
        value={program}
        onChange={setProgram}
        options={[
          { value: 'ul', label: 'Upper / Lower' },
          { value: 'bw', label: 'Sopstvena težina' },
        ]}
      />

      {cfg.days.length > 1 && (
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {cfg.days.map((id) => {
            const d = DAYS[id]
            const on = id === day
            return (
              <button
                key={id}
                type="button"
                onClick={() => setDay(id)}
                className={`flex min-h-[52px] shrink-0 flex-col items-start justify-center rounded-xl border px-3.5 ${
                  on ? 'border-ink bg-ink text-white' : 'border-line bg-card text-ink2'
                }`}
              >
                <span className="text-[14px] font-bold tracking-tight">{d.label}</span>
                <span
                  className={`mono mt-0.5 text-[9px] uppercase tracking-[0.14em] ${
                    on ? 'text-white/60' : 'text-ink3'
                  }`}
                >
                  {d.weekday ? WEEKDAY_NAMES[d.weekday] : '4x nedeljno'}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <RestTimerBar timer={timer} seconds={cfg.restSec} />

      <Card className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <div className="h2 text-[18px] leading-tight">{dayCfg.label}</div>
          <div className="label mt-1.5">{cfg.desc}</div>
        </div>
        <div className="shrink-0 text-right">
          <div className="num text-[20px] leading-none">{cfg.sets}</div>
          <div className="label mt-1">serije</div>
        </div>
      </Card>

      {dayCfg.exercises.map((ex, i) => {
        const savedToday = historyFor(sessions, day, ex).find((e) => e.date === today) ?? null
        return (
        <ExerciseBlock
          key={`${today}:${day}:${ex}`}
          index={i}
          exercise={ex}
          sets={cfg.sets}
          inputMode={cfg.inputMode}
          repsLabel={cfg.repsLabel}
          last={lastSession(sessions, day, ex, today)}
          draft={drafts[draftKey(today, day, ex)] ?? savedToday?.sets ?? []}
          saved={savedToday !== null}
          hasVideo={Boolean(videos[ex])}
          onChange={(sets) => setDraft(today, day, ex, sets)}
          onVideo={() => setSheet(ex)}
          onRest={() => timer.start(cfg.restSec)}
        />
        )
      })}

      <Button full onClick={save} className="mt-1">
        <Save size={16} strokeWidth={2.4} />
        Sačuvaj trening
      </Button>

      <ExerciseSheet exercise={sheet} onClose={() => setSheet(null)} />
    </div>
  )
}
