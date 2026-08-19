import { format, getISODay, parseISO } from 'date-fns'
import { srLatn } from 'date-fns/locale/sr-Latn'
import type { DateKey } from '../types'

export const LOCALE = srLatn

export function keyOf(d: Date): DateKey {
  return format(d, 'yyyy-MM-dd')
}

export function todayKey(): DateKey {
  return keyOf(new Date())
}

export function isoWeekday(d: Date): number {
  return getISODay(d)
}

export function fromKey(k: DateKey): Date {
  return parseISO(k)
}

export function longDate(d: Date): string {
  return format(d, 'd. MMMM yyyy.', { locale: LOCALE })
}

export function weekdayName(d: Date): string {
  return format(d, 'EEEE', { locale: LOCALE })
}

export function shortDate(k: DateKey): string {
  return format(fromKey(k), 'd. MMM', { locale: LOCALE })
}

export function dotDate(k: DateKey): string {
  return format(fromKey(k), 'dd.MM.yyyy.')
}

export function monthTitle(d: Date): string {
  return format(d, 'LLLL yyyy.', { locale: LOCALE })
}

export function daysBetween(a: DateKey, b: DateKey): number {
  const ms = fromKey(b).getTime() - fromKey(a).getTime()
  return Math.round(ms / 86400000)
}

export function addDaysKey(k: DateKey, n: number): DateKey {
  const d = fromKey(k)
  d.setDate(d.getDate() + n)
  return keyOf(d)
}

export function nf(value: number, digits = 1): string {
  return value.toLocaleString('sr-Latn-RS', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function nfInt(value: number): string {
  return Math.round(value).toLocaleString('sr-Latn-RS')
}

export function signed(value: number, digits = 1): string {
  const s = nf(Math.abs(value), digits)
  if (Math.abs(value) < Math.pow(10, -digits) / 2) return '0'
  return (value > 0 ? '+' : '−') + s
}
