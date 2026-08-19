import type { InBodyEntry } from '../types'

export const START = {
  date: '2026-08-19',
  kg: 83.3,
  bf: 21.9,
  smm: 36.9,
} as const

export const GOAL = {
  kgFrom: 73,
  kgTo: 74,
  bfFrom: 12,
  bfTo: 13,
  smmMin: 36.9,
  /** kg masti nedeljno */
  paceKgPerWeek: 0.65,
  targetDateLabel: 'početak decembra 2026',
  targetDate: '2026-12-01',
} as const

/** Prvo InBody merenje, ulazi u store kao početno stanje. */
export const INITIAL_INBODY: InBodyEntry[] = [
  {
    date: '2026-08-19',
    kg: 83.3,
    bf: 21.9,
    smm: 36.9,
    trunkFat: 9.8,
    vfa: 80.6,
    whr: 0.92,
  },
]

export const INBODY_FIELDS = [
  { key: 'kg', label: 'Težina', unit: 'kg', step: 0.1, better: 'down' },
  { key: 'bf', label: 'Mast', unit: '%', step: 0.1, better: 'down' },
  { key: 'smm', label: 'Skeletni mišić', unit: 'kg', step: 0.1, better: 'up' },
  { key: 'trunkFat', label: 'Mast u trupu', unit: 'kg', step: 0.1, better: 'down' },
  { key: 'vfa', label: 'Visceralna mast', unit: 'cm²', step: 0.1, better: 'down' },
  { key: 'whr', label: 'Struk / kuk', unit: '', step: 0.01, better: 'down' },
] as const

export type InBodyFieldKey = (typeof INBODY_FIELDS)[number]['key']
