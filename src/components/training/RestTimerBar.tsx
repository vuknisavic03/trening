import { Pause, Play, Plus } from 'lucide-react'
import type { RestTimer } from '../../hooks/useRestTimer'

type Props = {
  timer: RestTimer
  seconds: number
}

function mmss(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function RestTimerBar({ timer, seconds }: Props) {
  const { running, remaining, duration, start, stop, add } = timer
  const ratio = running && duration > 0 ? remaining / duration : 0

  return (
    <div className="sticky top-0 z-20 -mx-4 px-4 pb-2 pt-1">
      <div className="overflow-hidden rounded-card border border-line bg-card shadow-card">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <div className="min-w-0 flex-1">
            <div className="label">Odmor</div>
            <div className="num mt-0.5 text-[22px] leading-none">
              {running ? mmss(remaining) : mmss(seconds)}
            </div>
          </div>

          {running && (
            <button
              type="button"
              onClick={() => add(30)}
              aria-label="Dodaj 30 sekundi"
              className="flex h-11 min-w-[52px] items-center justify-center gap-0.5 rounded-full bg-bg text-ink2"
            >
              <Plus size={14} strokeWidth={3} />
              <span className="mono text-[11px] font-bold">30</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => (running ? stop() : start(seconds))}
            aria-label={running ? 'Zaustavi odmor' : 'Pokreni odmor'}
            className={`flex h-11 w-11 items-center justify-center rounded-full ${
              running ? 'bg-bg text-ink' : 'bg-ink text-white'
            }`}
          >
            {running ? <Pause size={17} strokeWidth={2.6} /> : <Play size={17} strokeWidth={2.6} />}
          </button>
        </div>

        <div className="h-[3px] w-full bg-line">
          <div
            className="h-full bg-accent"
            style={{ width: `${ratio * 100}%`, transition: 'width 0.25s linear' }}
          />
        </div>
      </div>
    </div>
  )
}
