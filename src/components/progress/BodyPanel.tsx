import { useState } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { NumField, toNum } from '../ui/NumField'
import { LazyChart } from './LazyChart'
import { COLORS } from '../../data/theme'
import { useStore } from '../../store/useStore'
import { toast } from '../../store/useToast'
import type { DateKey } from '../../types'

type Props = { today: DateKey }

export function BodyPanel({ today }: Props) {
  const body = useStore((s) => s.body)
  const addBody = useStore((s) => s.addBody)
  const [kg, setKg] = useState('')
  const [waist, setWaist] = useState('')

  const data = body.map((e) => ({
    date: e.date,
    kg: e.kg ?? null,
    waist: e.waist ?? null,
  }))

  const save = (): void => {
    const kgNum = toNum(kg)
    const waistNum = toNum(waist)
    if (kgNum <= 0 && waistNum <= 0) {
      toast('Unesi težinu ili struk')
      return
    }
    const prev = body.find((e) => e.date === today)
    addBody({
      date: today,
      kg: kgNum > 0 ? kgNum : prev?.kg,
      waist: waistNum > 0 ? waistNum : prev?.waist,
    })
    setKg('')
    setWaist('')
    toast('Merenje sačuvano')
  }

  return (
    <Card className="p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="label-lg">Težina i struk</span>
        <span className="label">struk na pupku</span>
      </div>

      <div className="mt-3 flex gap-2">
        <NumField
          ariaLabel="Težina u kilogramima"
          value={kg}
          onChange={setKg}
          decimal
          suffix="kg"
          placeholder="83,3"
          className="flex-1"
        />
        <NumField
          ariaLabel="Struk u centimetrima"
          value={waist}
          onChange={setWaist}
          decimal
          suffix="cm"
          placeholder="92"
          className="flex-1"
        />
        <Button onClick={save}>Unesi</Button>
      </div>

      <div className="mt-4">
        <LazyChart
          data={data}
          empty="Nema merenja"
          series={[
            { key: 'kg', name: 'Težina (kg)', color: COLORS.accent },
            { key: 'waist', name: 'Struk (cm)', color: COLORS.ink3, axis: 'right' },
          ]}
        />
      </div>
    </Card>
  )
}
