import { Card } from '../ui/Card'
import { GOAL, START } from '../../data/goals'
import { dotDate, nf } from '../../lib/dates'
import type { Projection } from '../../store/selectors'

type Props = { p: Projection }

export function GoalsPanel({ p }: Props) {
  return (
    <Card className="p-4">
      <div className="label-lg">Cilj</div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        <Item label="Polazno" value={`${nf(START.kg)} kg`} sub={`${nf(START.bf)} % masti`} />
        <Item
          label="Cilj"
          value={`${GOAL.kgFrom} do ${GOAL.kgTo} kg`}
          sub={`${GOAL.bfFrom} do ${GOAL.bfTo} % masti`}
        />
        <Item label="Skinuto" value={`${nf(p.lostKg)} kg`} sub={`mast ${nf(p.lostFatKg)} kg`} />
        <Item label="Ostalo" value={`${nf(p.remainingKg)} kg`} sub={`mišić min ${nf(GOAL.smmMin)} kg`} />
      </div>

      <div className="mt-4 space-y-2 border-t border-line pt-3">
        <Row label="Planirani tempo" value={`${nf(GOAL.paceKgPerWeek, 2)} kg / nedelja`} />
        <Row
          label="Stvarni tempo"
          value={
            p.weeks > 0.5 ? `${nf(p.actualPacePerWeek, 2)} kg / nedelja` : 'treba još jedno merenje'
          }
        />
        <Row label="Ciljni datum" value={GOAL.targetDateLabel} />
        <Row
          label="Projekcija, stvarni tempo"
          value={p.projectedDate ? dotDate(p.projectedDate) : 'nedovoljno podataka'}
          strong
        />
      </div>
    </Card>
  )
}

function Item({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="num mt-1 text-[17px] leading-none">{value}</div>
      <div className="label mt-1.5">{sub}</div>
    </div>
  )
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="label truncate">{label}</span>
      <span
        className={`shrink-0 text-right text-[13px] tracking-tight ${
          strong ? 'num text-accent' : 'font-bold text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
