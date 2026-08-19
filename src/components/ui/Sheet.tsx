import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: ReactNode
}

export function Sheet({ open, onClose, title, subtitle, children }: Props) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Zatvori"
        onClick={onClose}
        className="anim-scrim absolute inset-0 bg-ink/25"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="anim-sheet absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-sheet bg-card shadow-sheet"
      >
        <div className="flex justify-center pt-2.5">
          <div className="h-1 w-10 rounded-full bg-line" />
        </div>

        {(title || subtitle) && (
          <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-3">
            <div className="min-w-0">
              {title && <div className="h2 truncate text-[20px] leading-tight">{title}</div>}
              {subtitle && <div className="label mt-1.5">{subtitle}</div>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zatvori"
              className="-mr-1.5 -mt-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink2 active:bg-bg"
            >
              <X size={20} strokeWidth={2.2} />
            </button>
          </div>
        )}

        <div
          className="no-scrollbar overflow-y-auto px-5"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
