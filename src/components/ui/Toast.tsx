import { useToast } from '../../store/useToast'

export function Toast() {
  const message = useToast((s) => s.message)
  const seq = useToast((s) => s.seq)

  if (!message) return null

  return (
    <div
      key={seq}
      role="status"
      aria-live="polite"
      className="anim-toast pointer-events-none fixed inset-x-0 z-40 flex justify-center px-6"
      style={{ bottom: 'calc(env(safe-area-inset-bottom) + var(--tab-h) + 14px)' }}
    >
      <div className="max-w-full truncate rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold tracking-tight text-white shadow-sheet">
        {message}
      </div>
    </div>
  )
}
