import type { DayConfig, DayId, ProgramConfig, ProgramId } from '../types'

export const PROGRAMS: Record<ProgramId, ProgramConfig> = {
  ul: {
    id: 'ul',
    name: 'Upper / Lower',
    short: 'Tegovi',
    desc: '2 serije po vežbi, 6 ponavljanja, maksimalna težina, odmor 3 minuta.',
    sets: 2,
    reps: 6,
    repsLabel: '6 ponavljanja',
    restSec: 180,
    inputMode: 'weight-reps',
    days: ['u1', 'la', 'u2', 'lb'],
  },
  bw: {
    id: 'bw',
    name: 'Sopstvena težina',
    short: 'Sopstvena težina',
    desc: 'Trening A, 4 puta nedeljno, 4 serije do otkaza, odmor 90 s.',
    sets: 4,
    reps: null,
    repsLabel: 'do otkaza',
    restSec: 90,
    inputMode: 'reps',
    days: ['bw'],
  },
}

const LOWER: DayConfig['exercises'] = [
  'leg-press',
  'rdl',
  'ham-curl',
  'leg-ext',
  'adductor',
  'calf-raise',
]

export const DAYS: Record<DayId, DayConfig> = {
  u1: {
    id: 'u1',
    label: 'Upper 1',
    short: 'U1',
    program: 'ul',
    weekday: 1,
    exercises: [
      'db-bench',
      'one-arm-row',
      'smith-incline',
      'cable-lat-raise',
      'db-curl',
      'oh-triceps',
    ],
  },
  la: {
    id: 'la',
    label: 'Lower A',
    short: 'LA',
    program: 'ul',
    weekday: 2,
    exercises: LOWER,
  },
  u2: {
    id: 'u2',
    label: 'Upper 2',
    short: 'U2',
    program: 'ul',
    weekday: 4,
    exercises: [
      'one-arm-chest-press',
      'lat-pulldown',
      't-bar-row',
      'carter-ext',
      'preacher-curl',
    ],
  },
  lb: {
    id: 'lb',
    label: 'Lower B',
    short: 'LB',
    program: 'ul',
    weekday: 5,
    exercises: LOWER,
  },
  bw: {
    id: 'bw',
    label: 'Trening A',
    short: 'BW',
    program: 'bw',
    weekday: null,
    exercises: ['pullup', 'pushup', 'dip', 'squat', 'crunch'],
  },
}

export const DAY_IDS: DayId[] = ['u1', 'la', 'u2', 'lb', 'bw']

export const STRENGTH_DAY_IDS: DayId[] = ['u1', 'la', 'u2', 'lb', 'bw']

/** 1 = ponedeljak ... 7 = nedelja */
export const WEEK_SCHEDULE: Record<number, DayId | null> = {
  1: 'u1',
  2: 'la',
  3: null,
  4: 'u2',
  5: 'lb',
  6: null,
  7: null,
}

export const WEEKDAY_NAMES: Record<number, string> = {
  1: 'ponedeljak',
  2: 'utorak',
  3: 'sreda',
  4: 'četvrtak',
  5: 'petak',
  6: 'subota',
  7: 'nedelja',
}

export function scheduledDay(weekday: number): DayId | null {
  return WEEK_SCHEDULE[weekday] ?? null
}

export function programOf(day: DayId): ProgramConfig {
  return PROGRAMS[DAYS[day].program]
}

export function sessionKey(day: DayId, exercise: string): string {
  return `${day}:${exercise}`
}
