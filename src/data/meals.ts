import type { Meal, MealId } from '../types'

export const MEAL_IDS: MealId[] = ['dorucak', 'rucak', 'uzina', 'vecera']

export const MEALS: Record<MealId, Meal> = {
  dorucak: {
    id: 'dorucak',
    name: 'Doručak',
    time: '08:00',
    kcal: 720,
    protein: 40,
    items: [
      { amount: '5', name: 'kuvanih jaja', note: '7 do 8 min' },
      { amount: '2 kriške', name: 'integralnog hleba', note: '~60 g' },
      { amount: '1 ceo', name: 'avokado', note: '~200 g, so, biber, limun' },
      { amount: '1', name: 'crna kafa', note: 'bez šećera' },
    ],
  },
  rucak: {
    id: 'rucak',
    name: 'Ručak',
    time: '13:30',
    kcal: 760,
    protein: 69,
    items: [
      { amount: '200 g', name: 'pilećih grudi', note: 'grill' },
      { amount: '90 g', name: 'pirinča', note: 'suvo, ≈270 g kuvano' },
      { amount: '200 g', name: 'povrća', note: 'brokoli, tikvice, spanać' },
      { amount: '10 g', name: 'maslinovog ulja' },
    ],
  },
  uzina: {
    id: 'uzina',
    name: 'Užina',
    time: '17:30',
    kcal: 365,
    protein: 30,
    items: [
      { amount: '50 g', name: 'ovsenih pahuljica' },
      { amount: '30 g', name: 'whey proteina' },
      { amount: '100 g', name: 'voća' },
      { amount: '', name: 'cimet' },
    ],
  },
  vecera: {
    id: 'vecera',
    name: 'Večera',
    time: '20:30',
    kcal: 280,
    protein: 26,
    items: [
      { amount: '1 kom', name: 'Rio Mare tunjevina 80 g', note: 'ocediti' },
      { amount: '150 g', name: 'paradajza' },
      { amount: '40 g', name: 'feta sira' },
      { amount: '', name: 'origano' },
    ],
  },
}

export const MEAL_LIST: Meal[] = MEAL_IDS.map((id) => MEALS[id])

export const MEALS_TOTAL_KCAL = MEAL_LIST.reduce((s, m) => s + m.kcal, 0)
export const MEALS_TOTAL_PROTEIN = MEAL_LIST.reduce((s, m) => s + m.protein, 0)

export const RULES: string[] = [
  'Voda 3 do 3,5 L dnevno.',
  'So 6 g, stabilno, bez skokova.',
  'Bez alkohola i bez tečnih kalorija.',
  'San 7,5 do 8 h, isti sat svaki dan.',
  'Kad vaga stane, ne diraj kalorije, prođe samo.',
  '2200 kcal na dane treninga snage, 2000 na ostale.',
]
