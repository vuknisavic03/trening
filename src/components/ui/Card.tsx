import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
}

export function Card({ children, className = '', as = 'div' }: Props) {
  const Tag = as
  return (
    <Tag className={`rounded-card border border-line bg-card shadow-card ${className}`}>
      {children}
    </Tag>
  )
}

export function CardTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-4 pt-4">
      <span className="label-lg">{children}</span>
      {right}
    </div>
  )
}

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`label-lg px-1 ${className}`}>{children}</div>
}
