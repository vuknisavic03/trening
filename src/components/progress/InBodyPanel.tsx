import { useMemo, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Sheet } from '../ui/Sheet'
import { NumField, toNum } from '../ui/NumField'
import { INBODY_FIELDS, type InBodyFieldKey } from '../../data/goals'
import { dotDate, nf, signed, shortDate } from '../../lib/dates'
import { useStore } from '../../store/useStore'
import { toast } from '../../store/useToast'
import type { DateKey, InBodyEntry } from '../../types'

type Props = { today: DateKey }

type Form = Record<InBodyFieldKey, string>

const EMPTY: Form = { kg: '', bf: '', smm: '', trunkFat: '', vfa: '', whr: '' }

export function InBodyPanel({ today }: Props) {
  const inbody = useStore((s) => s.inbody)
  const addInBody = useStore((s) => s.addInBody)
  const removeInBody = useStore((s) => s.removeInBody)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Form>(EMPTY)
  const [selected, setSelected] = useState<DateKey | null>(null)

  const sorted = useMemo(
    () => [...inbody].sort((a, b) => (a.date < b.date ? -1 : 1)),
    [inbody],
  )

  const index = (() => {
    if (selected) {
      const i = sorted.findIndex((e) => e.date === selected)
      if (i >= 0) return i
    }
    return sorted.length - 1
  })()

  const current: InBodyEntry | null = index >= 0 ? sorted[index] : null
  const previous: InBodyEntry | null = index > 0 ? sorted[index - 1] : null

  const save = (): void => {
    const kg = toNum(form.kg)
    const bf = toNum(form.bf)
    if (kg <= 0 || bf <= 0) {
      toast('Težina i procenat masti su obavezni')
      return
    }
    addInBody({
      date: today,
      kg,
      bf,
      smm: toNum(form.smm),
      trunkFat: toNum(form.trunkFat),
      vfa: toNum(form.vfa),
      whr: toNum(form.whr),
    })
    setForm(EMPTY)
    setSelected(today)
    setOpen(false)
    toast('InBody merenje sačuvano')
  }

  return (
    <Card className="p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="label-lg">InBody</span>
        <span className="label">{sorted.length === 1 ? '1 merenje' : `${sorted.length} merenja`}</span>
      </div>

      {sorted.length > 1 && (
        <div className="no-scrollbar -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4">
          {sorted.map((e, i) => {
            const on = i === index
            return (
              <button
                key={e.date}
                type="button"
                onClick={() => setSelected(e.date)}
                className={`mono min-h-[36px] shrink-0 whitespace-nowrap rounded-full border px-3 text-[11px] font-bold ${
                  on ? 'border-ink bg-ink text-white' : 'border-line bg-card text-ink2'
                }`}
              >
                {shortDate(e.date)}
              </button>
            )
          })}
        </div>
      )}

      {current ? (
        <>
          <div className="mono mt-3 text-[11px] text-ink3">
            {dotDate(current.date)}
            {previous ? ` · razlika u odnosu na ${dotDate(previous.date)}` : ' · prvo merenje'}
          </div>

          <table className="mt-2 w-full border-collapse">
            <tbody>
              {INBODY_FIELDS.map((f) => {
                const value = current[f.key]
                const prev = previous ? previous[f.key] : null
                const delta = prev === null ? null : value - prev
                const good =
                  delta === null || Math.abs(delta) < 0.001
                    ? null
                    : f.better === 'down'
                      ? delta < 0
                      : delta > 0
                return (
                  <tr key={f.key} className="border-b border-line last:border-b-0">
                    <td className="label py-2.5 pr-2 align-middle">{f.label}</td>
                    <td className="num py-2.5 text-right text-[15px] align-middle">
                      {nf(value, f.step < 0.1 ? 2 : 1)}
                      <span className="label ml-1">{f.unit}</span>
                    </td>
                    <td className="w-[74px] py-2.5 pl-2 text-right align-middle">
                      {delta === null ? (
                        <span className="label">nema</span>
                      ) : (
                        <span
                          className={`mono text-[12px] font-bold ${
                            good === null ? 'text-ink3' : good ? 'text-accent' : 'text-warn'
                          }`}
                        >
                          {signed(delta, f.step < 0.1 ? 2 : 1)}
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div className="label mt-4">Nema merenja</div>
      )}

      <div className="mt-4 flex gap-2">
        <Button full onClick={() => setOpen(true)}>
          <Plus size={16} strokeWidth={2.6} />
          Novo merenje
        </Button>
        {current && sorted.length > 1 && (
          <Button
            variant="danger"
            onClick={() => {
              removeInBody(current.date)
              setSelected(null)
              toast('Merenje obrisano')
            }}
          >
            <Trash2 size={15} strokeWidth={2.4} />
          </Button>
        )}
      </div>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Novo InBody merenje"
        subtitle={dotDate(today)}
      >
        <div className="flex flex-col gap-3 pb-2">
          {INBODY_FIELDS.map((f) => (
            <label key={f.key} className="flex items-center gap-3">
              <span className="label w-[104px] shrink-0">{f.label}</span>
              <NumField
                ariaLabel={f.label}
                value={form[f.key]}
                decimal
                suffix={f.unit || undefined}
                onChange={(v) => setForm((s) => ({ ...s, [f.key]: v }))}
                className="flex-1"
              />
            </label>
          ))}
          <Button full onClick={save} className="mt-1">
            Sačuvaj merenje
          </Button>
        </div>
      </Sheet>
    </Card>
  )
}
