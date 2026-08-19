import { Check } from 'lucide-react'
import { Sheet } from '../ui/Sheet'
import { Button } from '../ui/Button'
import { DAYS, DAY_IDS, programOf } from '../../data/programs'
import type { DayId } from '../../types'

type Props = {
  open: boolean
  current: DayId | null
  onClose: () => void
  onPick: (day: DayId) => void
  onClear: () => void
}

export function StrengthPicker({ open, current, onClose, onPick, onClear }: Props) {
  return (
    <Sheet open={open} onClose={onClose} title="Koji trening" subtitle="Označi šta si danas radio">
      <div className="flex flex-col gap-2 pb-3">
        {DAY_IDS.map((id) => {
          const day = DAYS[id]
          const on = current === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onPick(id)}
              className={`flex min-h-[58px] items-center gap-3 rounded-xl border px-4 text-left ${
                on ? 'border-accent bg-accentBg' : 'border-line bg-card active:bg-bg'
              }`}
            >
              <span
                className={`mono flex h-9 w-11 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold ${
                  on ? 'bg-accent text-white' : 'bg-bg text-ink2'
                }`}
              >
                {day.short}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold tracking-tight">{day.label}</span>
                <span className="label mt-0.5 block">{programOf(id).name}</span>
              </span>
              {on && <Check size={18} strokeWidth={3} className="shrink-0 text-accent" />}
            </button>
          )
        })}

        {current && (
          <Button variant="danger" full onClick={onClear} className="mt-1">
            Skini oznaku
          </Button>
        )}
      </div>
    </Sheet>
  )
}
