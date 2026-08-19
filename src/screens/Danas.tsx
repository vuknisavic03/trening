import { useMemo, useState } from 'react'
import { ArrowRight, Flame } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Ring } from '../components/ui/Ring'
import { Button } from '../components/ui/Button'
import { DayStrip } from '../components/today/DayStrip'
import { StrengthPicker } from '../components/today/StrengthPicker'
import { useStore } from '../store/useStore'
import { toast } from '../store/useToast'
import {
  dayOrEmpty,
  intakeKcal,
  intakeProtein,
  mealsEaten,
  streak,
} from '../store/selectors'
import { DAYS, scheduledDay } from '../data/programs'
import { MEALS_TOTAL_PROTEIN, MEAL_IDS } from '../data/meals'
import { CARDIO_MIN, WATER_TARGET } from '../data/theme'
import { fromKey, isoWeekday, longDate, nfInt, weekdayName } from '../lib/dates'
import type { DateKey, DayId } from '../types'

type Props = {
  today: DateKey
  onGoTraining: (day: DayId) => void
  onGoNutrition: () => void
}

export function Danas({ today, onGoTraining, onGoNutrition }: Props) {
  const days = useStore((s) => s.days)
  const kcalTarget = useStore((s) => s.settings.kcalTarget)
  const toggleFlag = useStore((s) => s.toggleFlag)
  const setStrength = useStore((s) => s.setStrength)

  const [picker, setPicker] = useState(false)

  const log = dayOrEmpty(days, today)
  const date = fromKey(today)
  const weekday = isoWeekday(date)
  const planned = scheduledDay(weekday)

  const kcal = intakeKcal(log)
  const protein = intakeProtein(log)
  const eaten = mealsEaten(log)
  const left = kcalTarget - kcal
  const run = useMemo(() => streak(days, today), [days, today])

  return (
    <div className="flex flex-col gap-3">
      <header className="px-1 pb-1">
        <div className="label-lg">{weekdayName(date)}</div>
        <h1 className="h1 mt-1 text-[27px] leading-none">{longDate(date)}</h1>
      </header>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Ring value={kcal} target={kcalTarget} label="kcal" />
          <dl className="min-w-0 flex-1 space-y-3">
            <Stat label="Protein" value={`${protein} / ${MEALS_TOTAL_PROTEIN} g`} />
            <Stat
              label={left >= 0 ? 'Preostalo' : 'Prekoračeno'}
              value={`${nfInt(Math.abs(left))} kcal`}
              warn={left < 0}
            />
            <Stat label="Obroci" value={`${eaten} / ${MEAL_IDS.length}`} />
            <Stat label="Voda" value={WATER_TARGET} />
          </dl>
        </div>
      </Card>

      <DayStrip
        log={log}
        kcalTarget={kcalTarget}
        onToggleCardio={() => {
          toggleFlag(today, 'cardio')
          toast(log.cardio ? 'Kardio skinut' : `Kardio ${CARDIO_MIN} min označen`)
        }}
        onToggleKcal={() => {
          toggleFlag(today, 'kcal')
          toast(log.kcal ? 'Kalorije skinute' : 'Kalorije u cilju')
        }}
        onToggleSteps={() => {
          toggleFlag(today, 'steps')
          toast(log.steps ? 'Koraci skinuti' : 'Koraci označeni')
        }}
        onPickStrength={() => setPicker(true)}
      />

      <Card className="p-4">
        <div className="label-lg">Danas na redu</div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="h2 text-[20px] leading-tight">
              {planned ? DAYS[planned].label : 'Samo kardio'}
            </div>
            <div className="label mt-1.5">
              {planned
                ? `${DAYS[planned].exercises.length} vežbi · ${CARDIO_MIN} min kardio`
                : `${CARDIO_MIN} min kardio · bez tegova`}
            </div>
          </div>
          {planned ? (
            <Button onClick={() => onGoTraining(planned)}>
              Otvori
              <ArrowRight size={16} strokeWidth={2.6} />
            </Button>
          ) : (
            <Button variant="ghost" onClick={onGoNutrition}>
              Ishrana
              <Flame size={16} strokeWidth={2.4} />
            </Button>
          )}
        </div>
      </Card>

      <Card className="flex items-center justify-between gap-3 p-4">
        <div>
          <div className="label-lg">Serija</div>
          <div className="label mt-1.5">uzastopni dani sa najmanje jednom oznakom</div>
        </div>
        <div className="num text-[32px] leading-none">{run}</div>
      </Card>

      <StrengthPicker
        open={picker}
        current={log.strength}
        onClose={() => setPicker(false)}
        onPick={(day) => {
          setStrength(today, day)
          setPicker(false)
          toast(`${DAYS[day].label} označen`)
        }}
        onClear={() => {
          setStrength(today, null)
          setPicker(false)
          toast('Trening skinut')
        }}
      />
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
  warn = false,
}: {
  label: string
  value: string
  sub?: string
  warn?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <dt className="label truncate">{label}</dt>
      <dd className="shrink-0 text-right">
        <span className={`num text-[16px] ${warn ? 'text-warn' : 'text-ink'}`}>{value}</span>
        {sub && <span className="label ml-1.5">{sub}</span>}
      </dd>
    </div>
  )
}
