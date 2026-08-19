import { Card } from '../components/ui/Card'
import { MealCard } from '../components/nutrition/MealCard'
import { useStore } from '../store/useStore'
import { toast } from '../store/useToast'
import { dayOrEmpty, intakeKcal, intakeProtein } from '../store/selectors'
import {
  MEALS_TOTAL_KCAL,
  MEALS_TOTAL_PROTEIN,
  MEAL_LIST,
  RULES,
} from '../data/meals'
import { nfInt } from '../lib/dates'
import type { DateKey } from '../types'

type Props = { today: DateKey }

export function Ishrana({ today }: Props) {
  const days = useStore((s) => s.days)
  const toggleMeal = useStore((s) => s.toggleMeal)

  const log = dayOrEmpty(days, today)
  const kcal = intakeKcal(log)
  const protein = intakeProtein(log)

  return (
    <div className="flex flex-col gap-3">
      <header className="px-1 pb-1">
        <div className="label-lg">Plan dana</div>
        <h1 className="h1 mt-1 text-[27px] leading-none">Ishrana</h1>
      </header>

      <Card className="flex items-stretch divide-x divide-line p-0">
        <Total label="Uneto" value={nfInt(kcal)} unit="kcal" of={nfInt(MEALS_TOTAL_KCAL)} />
        <Total label="Protein" value={String(protein)} unit="g" of={String(MEALS_TOTAL_PROTEIN)} />
      </Card>

      {MEAL_LIST.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          eaten={log.meals[meal.id]}
          onToggle={() => {
            toggleMeal(today, meal.id)
            toast(log.meals[meal.id] ? `${meal.name} skinut` : `${meal.name} pojeden`)
          }}
        />
      ))}

      <Card className="p-4">
        <div className="label-lg">Pravila</div>
        <ul className="mt-3 space-y-2.5">
          {RULES.map((rule, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-snug">
              <span className="mono mt-[1px] shrink-0 text-[11px] text-ink3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function Total({
  label,
  value,
  unit,
  of,
}: {
  label: string
  value: string
  unit: string
  of: string
}) {
  return (
    <div className="flex-1 px-4 py-4">
      <div className="label">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="num text-[26px] leading-none">{value}</span>
        <span className="label">{unit}</span>
      </div>
      <div className="label mt-1.5">od {of}</div>
    </div>
  )
}
