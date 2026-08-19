import { Check } from 'lucide-react'
import type { Meal } from '../../types'

type Props = {
  meal: Meal
  eaten: boolean
  onToggle: () => void
}

export function MealCard({ meal, eaten, onToggle }: Props) {
  return (
    <section
      className={`overflow-hidden rounded-card border shadow-card ${
        eaten ? 'border-accent/30 bg-accentBg' : 'border-line bg-card'
      }`}
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div className="min-w-0">
          <div className="label-lg">{meal.time}</div>
          <h2
            className={`h2 mt-1 text-[19px] leading-tight ${
              eaten ? 'text-accent line-through decoration-accent/40' : ''
            }`}
          >
            {meal.name}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <div className="num text-[18px] leading-none">{meal.kcal}</div>
          <div className="label mt-1">kcal</div>
          <div className="num mt-2 text-[14px] leading-none text-ink2">{meal.protein} g</div>
          <div className="label mt-1">protein</div>
        </div>
      </div>

      <ul className={`mt-3 space-y-2 px-4 ${eaten ? 'opacity-60' : ''}`}>
        {meal.items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[14px] leading-snug">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink3" />
            <span className={eaten ? 'line-through decoration-ink3' : ''}>
              {item.amount && <strong className="font-extrabold tracking-tight">{item.amount} </strong>}
              <span>{item.name}</span>
              {item.note && <span className="text-ink2"> · {item.note}</span>}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={eaten}
        className={`mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 border-t text-[14px] font-bold tracking-tight ${
          eaten
            ? 'border-accent/20 text-accent active:bg-accent/10'
            : 'border-line text-ink2 active:bg-bg'
        }`}
      >
        {eaten ? (
          <>
            <Check size={16} strokeWidth={3} />
            Pojedeno
          </>
        ) : (
          'Označi kao pojedeno'
        )}
      </button>
    </section>
  )
}
