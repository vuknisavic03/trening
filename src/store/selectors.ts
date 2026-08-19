import { MEALS, MEAL_IDS } from '../data/meals'
import { GOAL, START } from '../data/goals'
import { HISTORY_DAYS, STREAK_MIN_ITEMS } from '../data/theme'
import { addDaysKey, daysBetween } from '../lib/dates'
import type {
  DateKey,
  DayId,
  DayLog,
  ExerciseId,
  InBodyEntry,
  SessionEntry,
  SetEntry,
} from '../types'
import { emptyDay, sessionKey } from './useStore'

export function dayOrEmpty(days: Record<DateKey, DayLog>, date: DateKey): DayLog {
  return days[date] ?? emptyDay()
}

export function mealsEaten(log: DayLog): number {
  return MEAL_IDS.filter((id) => log.meals[id]).length
}

export function intakeKcal(log: DayLog): number {
  return MEAL_IDS.reduce((sum, id) => (log.meals[id] ? sum + MEALS[id].kcal : sum), 0)
}

export function intakeProtein(log: DayLog): number {
  return MEAL_IDS.reduce((sum, id) => (log.meals[id] ? sum + MEALS[id].protein : sum), 0)
}

/** Broj označenih stavki na traci dana. */
export function markedItems(log: DayLog): number {
  let n = 0
  if (log.cardio) n += 1
  if (log.strength) n += 1
  if (log.kcal) n += 1
  if (log.steps) n += 1
  return n
}

export function hasAnything(log: DayLog): boolean {
  return markedItems(log) > 0 || mealsEaten(log) > 0
}

export function streak(days: Record<DateKey, DayLog>, today: DateKey): number {
  let count = 0
  let cursor = today
  for (let i = 0; i < HISTORY_DAYS; i += 1) {
    const log = days[cursor]
    const ok = log ? markedItems(log) >= STREAK_MIN_ITEMS : false
    if (!ok) {
      // Današnji dan još može da se popuni, pa ne prekida seriju ako je prazan.
      if (i === 0) {
        cursor = addDaysKey(cursor, -1)
        continue
      }
      break
    }
    count += 1
    cursor = addDaysKey(cursor, -1)
  }
  return count
}

export function historyFor(
  sessions: Record<string, SessionEntry[]>,
  day: DayId,
  ex: ExerciseId,
): SessionEntry[] {
  return sessions[sessionKey(day, ex)] ?? []
}

/** Poslednji upisani trening za tu vežbu na tom danu, pre datog datuma. */
export function lastSession(
  sessions: Record<string, SessionEntry[]>,
  day: DayId,
  ex: ExerciseId,
  before: DateKey,
): SessionEntry | null {
  const list = historyFor(sessions, day, ex).filter((e) => e.date < before)
  return list.length ? list[list.length - 1] : null
}

export function formatSets(sets: SetEntry[], withWeight: boolean): string {
  return sets
    .map((s) => (withWeight ? `${trimNum(s.w)} kg × ${s.r}` : `${s.r}`))
    .join(' · ')
}

export function trimNum(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n).replace('.', ',')
}

/** Epley: procenjeni maksimum za jedno ponavljanje. */
export function epley(w: number, r: number): number {
  if (w <= 0 || r <= 0) return 0
  return w * (1 + r / 30)
}

export function bestE1rm(entry: SessionEntry): number {
  return entry.sets.reduce((best, s) => Math.max(best, epley(s.w, s.r)), 0)
}

export function totalReps(entry: SessionEntry): number {
  return entry.sets.reduce((sum, s) => sum + s.r, 0)
}

export type ProgressPoint = { date: DateKey; value: number }

export function exerciseSeries(
  sessions: Record<string, SessionEntry[]>,
  day: DayId,
  ex: ExerciseId,
  mode: 'e1rm' | 'reps',
): ProgressPoint[] {
  return historyFor(sessions, day, ex).map((e) => ({
    date: e.date,
    value: mode === 'e1rm' ? Math.round(bestE1rm(e) * 10) / 10 : totalReps(e),
  }))
}

export type Projection = {
  latest: InBodyEntry | null
  lostKg: number
  lostFatKg: number
  remainingKg: number
  weeks: number
  actualPacePerWeek: number
  projectedDate: DateKey | null
  onPlanDate: DateKey
}

function fatKg(e: { kg: number; bf: number }): number {
  return (e.kg * e.bf) / 100
}

export function projection(inbody: InBodyEntry[], today: DateKey): Projection {
  const sorted = [...inbody].sort((a, b) => (a.date < b.date ? -1 : 1))
  const first = sorted[0] ?? { ...START, trunkFat: 0, vfa: 0, whr: 0 }
  const latest = sorted.length ? sorted[sorted.length - 1] : null

  const goalMidKg = (GOAL.kgFrom + GOAL.kgTo) / 2
  const startFat = fatKg(first)

  const lostKg = latest ? first.kg - latest.kg : 0
  const lostFatKg = latest ? startFat - fatKg(latest) : 0
  const remainingKg = latest ? Math.max(0, latest.kg - goalMidKg) : first.kg - goalMidKg

  const spanDays = latest ? daysBetween(first.date, latest.date) : 0
  const weeks = spanDays / 7
  const actualPacePerWeek = weeks > 0 ? lostKg / weeks : 0

  const planWeeks = remainingKg / GOAL.paceKgPerWeek
  const onPlanDate = addDaysKey(today, Math.round(planWeeks * 7))

  let projectedDate: DateKey | null = null
  if (actualPacePerWeek > 0.05 && remainingKg > 0) {
    projectedDate = addDaysKey(today, Math.round((remainingKg / actualPacePerWeek) * 7))
  } else if (remainingKg <= 0) {
    projectedDate = today
  }

  return {
    latest,
    lostKg,
    lostFatKg,
    remainingKg,
    weeks,
    actualPacePerWeek,
    projectedDate,
    onPlanDate,
  }
}
