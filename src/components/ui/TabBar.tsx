import { Apple, CalendarDays, Dumbbell, TrendingUp } from 'lucide-react'
import type { TabId } from '../../types'

const TABS: { id: TabId; label: string; Icon: typeof Apple }[] = [
  { id: 'danas', label: 'Danas', Icon: CalendarDays },
  { id: 'ishrana', label: 'Ishrana', Icon: Apple },
  { id: 'trening', label: 'Trening', Icon: Dumbbell },
  { id: 'napredak', label: 'Napredak', Icon: TrendingUp },
]

type Props = {
  active: TabId
  onChange: (tab: TabId) => void
}

export function TabBar({ active, onChange }: Props) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-3 py-1.5">
        {TABS.map(({ id, label, Icon }) => {
          const on = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-label={label}
              aria-current={on ? 'page' : undefined}
              className="flex min-h-[52px] flex-1 items-center justify-center"
            >
              <span
                className={`flex min-h-[44px] items-center gap-1.5 rounded-full px-3 transition-colors ${
                  on ? 'bg-ink text-white' : 'text-ink3'
                }`}
              >
                <Icon size={18} strokeWidth={on ? 2.4 : 2} />
                <span
                  className={`text-[12px] font-bold tracking-tight ${on ? 'inline' : 'hidden'}`}
                >
                  {label}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
