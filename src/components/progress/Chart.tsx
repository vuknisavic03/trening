import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { COLORS, CHART_HEIGHT } from '../../data/theme'
import { shortDate } from '../../lib/dates'

export type SeriesDef = {
  key: string
  name: string
  color: string
  axis?: 'left' | 'right'
}

type Props = {
  data: Record<string, number | string | null>[]
  series: SeriesDef[]
  empty?: string
}

const axisStyle = {
  fontSize: 9,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  letterSpacing: '0.08em',
  fill: COLORS.ink3,
}

export function Chart({ data, series, empty = 'Nema podataka' }: Props) {
  if (data.length === 0) {
    return (
      <div
        className="label flex items-center justify-center"
        style={{ height: CHART_HEIGHT }}
      >
        {empty}
      </div>
    )
  }

  const usesRight = series.some((s) => s.axis === 'right')

  return (
    <div style={{ height: CHART_HEIGHT }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: usesRight ? 2 : 8, bottom: 0, left: -18 }}>
          <CartesianGrid stroke={COLORS.line} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(v: string) => shortDate(v)}
            tick={axisStyle}
            tickLine={false}
            axisLine={{ stroke: COLORS.line }}
            minTickGap={18}
          />
          <YAxis
            yAxisId="left"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            width={44}
            domain={['auto', 'auto']}
          />
          {usesRight && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              width={30}
              domain={['auto', 'auto']}
            />
          )}
          <Tooltip
            labelFormatter={(v: string) => shortDate(v)}
            contentStyle={{
              borderRadius: 12,
              border: `1px solid ${COLORS.line}`,
              boxShadow: 'none',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          />
          {series.map((s) => (
            <Line
              key={s.key}
              yAxisId={s.axis ?? 'left'}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2}
              dot={{ r: 2.5, fill: s.color, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              connectNulls
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
