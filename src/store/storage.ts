import type { StateStorage } from 'zustand/middleware'

/**
 * localStorage sa fallback-om na memoriju. Ako je storage nedostupan
 * (privatni režim, puna kvota, blokiran pristup) aplikacija nastavlja da radi,
 * samo se podaci ne čuvaju do sledećeg otvaranja.
 */

const memory = new Map<string, string>()

let available: boolean | null = null

function canUseLocalStorage(): boolean {
  if (available !== null) return available
  try {
    const probe = '__rezim_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    available = true
  } catch {
    available = false
  }
  return available
}

export const storageIsPersistent = (): boolean => canUseLocalStorage()

export const safeStorage: StateStorage = {
  getItem: (name) => {
    if (canUseLocalStorage()) {
      try {
        return window.localStorage.getItem(name)
      } catch {
        available = false
      }
    }
    return memory.get(name) ?? null
  },
  setItem: (name, value) => {
    if (canUseLocalStorage()) {
      try {
        window.localStorage.setItem(name, value)
        return
      } catch {
        available = false
      }
    }
    memory.set(name, value)
  },
  removeItem: (name) => {
    if (canUseLocalStorage()) {
      try {
        window.localStorage.removeItem(name)
      } catch {
        available = false
      }
    }
    memory.delete(name)
  },
}
