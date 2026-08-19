import { useEffect, useState } from 'react'
import { todayKey } from '../lib/dates'
import type { DateKey } from '../types'

/** Datum dana, osvežava se kad se aplikacija vrati u prvi plan i u ponoć. */
export function useTodayKey(): DateKey {
  const [key, setKey] = useState<DateKey>(() => todayKey())

  useEffect(() => {
    const sync = (): void => setKey(todayKey())
    const id = window.setInterval(sync, 60000)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  return key
}
