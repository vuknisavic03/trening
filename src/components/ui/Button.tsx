import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'quiet' | 'danger'

type Props = {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  full?: boolean
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

const STYLES: Record<Variant, string> = {
  primary: 'bg-ink text-white active:opacity-85',
  ghost: 'border border-line bg-card text-ink active:bg-bg',
  quiet: 'bg-accentBg text-accent active:opacity-80',
  danger: 'border border-line bg-card text-warn active:bg-bg',
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  full = false,
  disabled = false,
  className = '',
  type = 'button',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-4 text-[14px] font-bold tracking-tight transition-opacity disabled:opacity-40 ${
        STYLES[variant]
      } ${full ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
