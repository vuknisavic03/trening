export type MealId = 'dorucak' | 'rucak' | 'uzina' | 'vecera'

export type ProgramId = 'bw' | 'ul'

export type DayId = 'u1' | 'la' | 'u2' | 'lb' | 'bw'

export type ExerciseId =
  | 'db-bench'
  | 'one-arm-row'
  | 'smith-incline'
  | 'cable-lat-raise'
  | 'db-curl'
  | 'oh-triceps'
  | 'leg-press'
  | 'rdl'
  | 'ham-curl'
  | 'leg-ext'
  | 'adductor'
  | 'calf-raise'
  | 'one-arm-chest-press'
  | 'lat-pulldown'
  | 't-bar-row'
  | 'carter-ext'
  | 'preacher-curl'
  | 'pullup'
  | 'pushup'
  | 'dip'
  | 'squat'
  | 'crunch'

export type InputMode = 'reps' | 'weight-reps'

export type Exercise = {
  id: ExerciseId
  name: string
  group: string
  tempo: string
  steps: string[]
  mistakes: string[]
  query: string
}

export type FoodItem = {
  amount: string
  name: string
  note?: string
}

export type Meal = {
  id: MealId
  name: string
  time: string
  kcal: number
  protein: number
  items: FoodItem[]
}

export type ProgramConfig = {
  id: ProgramId
  name: string
  short: string
  desc: string
  sets: number
  reps: number | null
  repsLabel: string
  restSec: number
  inputMode: InputMode
  days: DayId[]
}

export type DayConfig = {
  id: DayId
  label: string
  short: string
  program: ProgramId
  /** 1 = ponedeljak ... 7 = nedelja; null ako nije vezan za dan */
  weekday: number | null
  exercises: ExerciseId[]
}

export type SetEntry = { w: number; r: number }

export type SessionEntry = {
  date: string
  sets: SetEntry[]
}

export type DayLog = {
  meals: Record<MealId, boolean>
  cardio: boolean
  steps: boolean
  kcal: boolean
  strength: DayId | null
}

export type BodyEntry = {
  date: string
  kg?: number
  waist?: number
}

export type InBodyEntry = {
  date: string
  kg: number
  bf: number
  smm: number
  trunkFat: number
  vfa: number
  whr: number
}

export type Settings = {
  program: ProgramId
  kcalTarget: number
}

export type TabId = 'danas' | 'ishrana' | 'trening' | 'napredak'

/** Ključ sesije: `${DayId}:${ExerciseId}` */
export type SessionKey = string

/** Ključ dana: "2026-08-19" */
export type DateKey = string
