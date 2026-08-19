import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { safeStorage } from './storage'
import { INITIAL_INBODY } from '../data/goals'
import { KCAL_BASE } from '../data/theme'
import { MEAL_IDS } from '../data/meals'
import type {
  BodyEntry,
  DateKey,
  DayId,
  DayLog,
  ExerciseId,
  InBodyEntry,
  MealId,
  ProgramId,
  SessionEntry,
  SetEntry,
  Settings,
} from '../types'

export type DayFlag = 'cardio' | 'steps' | 'kcal'

export type Persisted = {
  days: Record<DateKey, DayLog>
  sessions: Record<string, SessionEntry[]>
  drafts: Record<string, SetEntry[]>
  body: BodyEntry[]
  inbody: InBodyEntry[]
  videos: Partial<Record<ExerciseId, string>>
  settings: Settings
}

export type Actions = {
  toggleMeal: (date: DateKey, meal: MealId) => void
  toggleFlag: (date: DateKey, flag: DayFlag) => void
  setStrength: (date: DateKey, day: DayId | null) => void
  setDraft: (date: DateKey, day: DayId, ex: ExerciseId, sets: SetEntry[]) => void
  saveWorkout: (date: DateKey, day: DayId) => number
  clearDrafts: (date: DateKey, day: DayId) => void
  addBody: (entry: BodyEntry) => void
  removeBody: (date: DateKey) => void
  addInBody: (entry: InBodyEntry) => void
  removeInBody: (date: DateKey) => void
  setVideo: (ex: ExerciseId, id: string) => void
  clearVideo: (ex: ExerciseId) => void
  setProgram: (p: ProgramId) => void
  setKcalTarget: (n: number) => void
  replaceAll: (data: Persisted) => void
}

export type Store = Persisted & Actions

export function emptyDay(): DayLog {
  const meals = {} as Record<MealId, boolean>
  for (const id of MEAL_IDS) meals[id] = false
  return { meals, cardio: false, steps: false, kcal: false, strength: null }
}

export function draftKey(date: DateKey, day: DayId, ex: ExerciseId): string {
  return `${date}:${day}:${ex}`
}

export function sessionKey(day: DayId, ex: ExerciseId): string {
  return `${day}:${ex}`
}

const initial: Persisted = {
  days: {},
  sessions: {},
  drafts: {},
  body: [],
  inbody: INITIAL_INBODY,
  videos: {},
  settings: { program: 'ul', kcalTarget: KCAL_BASE },
}

function sortByDate<T extends { date: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
}

function upsert<T extends { date: string }>(list: T[], entry: T): T[] {
  const rest = list.filter((e) => e.date !== entry.date)
  return sortByDate([...rest, entry])
}

function hasContent(sets: SetEntry[]): boolean {
  return sets.some((s) => s.r > 0 || s.w > 0)
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initial,

      toggleMeal: (date, meal) =>
        set((s) => {
          const day = s.days[date] ?? emptyDay()
          return {
            days: {
              ...s.days,
              [date]: { ...day, meals: { ...day.meals, [meal]: !day.meals[meal] } },
            },
          }
        }),

      toggleFlag: (date, flag) =>
        set((s) => {
          const day = s.days[date] ?? emptyDay()
          return { days: { ...s.days, [date]: { ...day, [flag]: !day[flag] } } }
        }),

      setStrength: (date, dayId) =>
        set((s) => {
          const day = s.days[date] ?? emptyDay()
          return { days: { ...s.days, [date]: { ...day, strength: dayId } } }
        }),

      setDraft: (date, day, ex, sets) =>
        set((s) => ({ drafts: { ...s.drafts, [draftKey(date, day, ex)]: sets } })),

      clearDrafts: (date, day) =>
        set((s) => {
          const prefix = `${date}:${day}:`
          const next: Record<string, SetEntry[]> = {}
          for (const [k, v] of Object.entries(s.drafts)) {
            if (!k.startsWith(prefix)) next[k] = v
          }
          return { drafts: next }
        }),

      saveWorkout: (date, day) => {
        const s = get()
        const prefix = `${date}:${day}:`
        const sessions = { ...s.sessions }
        const keptDrafts: Record<string, SetEntry[]> = {}
        let saved = 0

        for (const [k, sets] of Object.entries(s.drafts)) {
          if (!k.startsWith(prefix)) {
            keptDrafts[k] = sets
            continue
          }
          const ex = k.slice(prefix.length) as ExerciseId
          const clean = sets.filter((x) => x.r > 0 || x.w > 0)
          if (!hasContent(clean)) continue
          const key = sessionKey(day, ex)
          const list = sessions[key] ?? []
          sessions[key] = sortByDate([
            ...list.filter((e) => e.date !== date),
            { date, sets: clean },
          ])
          saved += 1
        }

        if (saved > 0) {
          const dayLog = s.days[date] ?? emptyDay()
          set({
            sessions,
            drafts: keptDrafts,
            days: { ...s.days, [date]: { ...dayLog, strength: day } },
          })
        }
        return saved
      },

      addBody: (entry) => set((s) => ({ body: upsert(s.body, entry) })),
      removeBody: (date) => set((s) => ({ body: s.body.filter((e) => e.date !== date) })),

      addInBody: (entry) => set((s) => ({ inbody: upsert(s.inbody, entry) })),
      removeInBody: (date) => set((s) => ({ inbody: s.inbody.filter((e) => e.date !== date) })),

      setVideo: (ex, id) => set((s) => ({ videos: { ...s.videos, [ex]: id } })),
      clearVideo: (ex) =>
        set((s) => {
          const videos = { ...s.videos }
          delete videos[ex]
          return { videos }
        }),

      setProgram: (program) => set((s) => ({ settings: { ...s.settings, program } })),
      setKcalTarget: (kcalTarget) => set((s) => ({ settings: { ...s.settings, kcalTarget } })),

      replaceAll: (data) =>
        set({
          days: data.days ?? {},
          sessions: data.sessions ?? {},
          drafts: data.drafts ?? {},
          body: sortByDate(data.body ?? []),
          inbody: sortByDate(data.inbody ?? []),
          videos: data.videos ?? {},
          settings: { ...initial.settings, ...(data.settings ?? {}) },
        }),
    }),
    {
      name: 'rezim-v1',
      version: 1,
      storage: {
        getItem: (name) => {
          const raw = safeStorage.getItem(name)
          if (typeof raw !== 'string') return null
          try {
            return JSON.parse(raw) as { state: Persisted; version: number }
          } catch {
            return null
          }
        },
        setItem: (name, value) => {
          safeStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          safeStorage.removeItem(name)
        },
      },
      migrate: (state, version) => {
        const s = (state ?? {}) as Partial<Persisted>
        if (version < 1) {
          return {
            ...initial,
            ...s,
            drafts: s.drafts ?? {},
            settings: { ...initial.settings, ...(s.settings ?? {}) },
          } as Persisted
        }
        return s as Persisted
      },
      partialize: (s): Persisted => ({
        days: s.days,
        sessions: s.sessions,
        drafts: s.drafts,
        body: s.body,
        inbody: s.inbody,
        videos: s.videos,
        settings: s.settings,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Persisted>
        return {
          ...current,
          ...p,
          settings: { ...current.settings, ...(p.settings ?? {}) },
        }
      },
    },
  ),
)

export function exportPayload(s: Persisted): string {
  const payload = {
    app: 'rezim',
    version: 1,
    exportedAt: new Date().toISOString(),
    state: {
      days: s.days,
      sessions: s.sessions,
      drafts: s.drafts,
      body: s.body,
      inbody: s.inbody,
      videos: s.videos,
      settings: s.settings,
    },
  }
  return JSON.stringify(payload, null, 2)
}

export function parseImport(text: string): Persisted | null {
  try {
    const parsed = JSON.parse(text) as Record<string, unknown>
    const raw = (parsed.state ?? parsed) as Partial<Persisted>
    if (typeof raw !== 'object' || raw === null) return null
    if (!('days' in raw) && !('sessions' in raw) && !('inbody' in raw)) return null
    return {
      days: raw.days ?? {},
      sessions: raw.sessions ?? {},
      drafts: raw.drafts ?? {},
      body: raw.body ?? [],
      inbody: raw.inbody ?? [],
      videos: raw.videos ?? {},
      settings: { ...initial.settings, ...(raw.settings ?? {}) },
    }
  } catch {
    return null
  }
}
