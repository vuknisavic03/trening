type Option<T extends string> = { value: T; label: string }

type Props<T extends string> = {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function Segmented<T extends string>({ options, value, onChange, className = '' }: Props<T>) {
  return (
    <div
      role="tablist"
      className={`flex gap-1 rounded-full border border-line bg-card p-1 ${className}`}
    >
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className={`min-h-[40px] flex-1 rounded-full px-3 text-[13px] font-bold tracking-tight transition-colors ${
              on ? 'bg-ink text-white' : 'text-ink2'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
