import { lazy, Suspense } from 'react'
import { CHART_HEIGHT } from '../../data/theme'
import type { SeriesDef } from './Chart'

const Inner = lazy(() => import('./Chart').then((m) => ({ default: m.Chart })))

type Props = {
  data: Record<string, number | string | null>[]
  series: SeriesDef[]
  empty?: string
}

/** Recharts je težak, pa se učitava samo kad se prvi grafikon prikaže. */
export function LazyChart(props: Props) {
  return (
    <Suspense fallback={<div style={{ height: CHART_HEIGHT }} />}>
      <Inner {...props} />
    </Suspense>
  )
}
