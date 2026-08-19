type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  suffix?: string
  decimal?: boolean
  ariaLabel: string
  className?: string
}

export function NumField({
  value,
  onChange,
  placeholder,
  suffix,
  decimal = false,
  ariaLabel,
  className = '',
}: Props) {
  return (
    <label
      className={`flex min-h-[46px] items-center gap-1.5 rounded-xl border border-line bg-bg px-3 focus-within:border-accent ${className}`}
    >
      <input
        type="text"
        inputMode={decimal ? 'decimal' : 'numeric'}
        pattern={decimal ? '[0-9]*[.,]?[0-9]*' : '[0-9]*'}
        enterKeyHint="done"
        autoComplete="off"
        aria-label={ariaLabel}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(sanitize(e.target.value, decimal))}
        className="num w-full min-w-0 bg-transparent text-[17px] outline-none"
      />
      {suffix && <span className="label shrink-0">{suffix}</span>}
    </label>
  )
}

export function sanitize(raw: string, decimal: boolean): string {
  const cleaned = decimal ? raw.replace(/[^0-9.,]/g, '').replace(/,/g, '.') : raw.replace(/[^0-9]/g, '')
  if (!decimal) return cleaned.slice(0, 5)
  const parts = cleaned.split('.')
  if (parts.length <= 1) return cleaned.slice(0, 6)
  return `${parts[0]}.${parts.slice(1).join('')}`.slice(0, 7)
}

export function toNum(raw: string): number {
  const n = Number.parseFloat(raw.replace(',', '.'))
  return Number.isFinite(n) ? n : 0
}
