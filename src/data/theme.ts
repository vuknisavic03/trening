/** Sve konstante dizajna i ponašanja na jednom mestu. */

export const COLORS = {
  bg: '#F5F6F5',
  card: '#FFFFFF',
  ink: '#0E1211',
  ink2: '#6B7671',
  ink3: '#A2ABA6',
  line: '#E4E8E5',
  accent: '#127A4B',
  accentBg: '#E9F4EE',
  warn: '#B8492F',
} as const

export const RING = {
  size: 148,
  stroke: 11,
  /** 5 posto preko cilja je još u redu, prsten ostaje zelen. */
  tolerance: 0.05,
} as const

export const TOAST_MS = 1700
export const SHEET_MS = 260

/** Koliko dana unazad kalendar i serija gledaju. */
export const HISTORY_DAYS = 400

/** Broj označenih stavki dana potreban da dan uđe u seriju. */
export const STREAK_MIN_ITEMS = 1

export const CARDIO_MIN = 25
export const STEPS_TARGET = 10000
export const WATER_TARGET = '3 do 3,5 L'

export const KCAL_TRAINING = 2200
export const KCAL_REST = 2000
export const KCAL_BASE = 2100

export const CHART_HEIGHT = 190

/** Boje kalendara po broju označenih stavki, indeks 0 do 4. */
export const CALENDAR_STEPS: { bg: string; text: string }[] = [
  { bg: '#EFF1EF', text: '#A2ABA6' },
  { bg: '#E9F4EE', text: '#0E1211' },
  { bg: '#C4E2D2', text: '#0E1211' },
  { bg: '#6EB392', text: '#FFFFFF' },
  { bg: '#127A4B', text: '#FFFFFF' },
]
