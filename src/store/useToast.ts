import { create } from 'zustand'
import { TOAST_MS } from '../data/theme'

type ToastState = {
  message: string | null
  seq: number
  show: (message: string) => void
  hide: () => void
}

let timer: ReturnType<typeof setTimeout> | null = null

export const useToast = create<ToastState>((set, get) => ({
  message: null,
  seq: 0,
  show: (message) => {
    if (timer) clearTimeout(timer)
    set({ message, seq: get().seq + 1 })
    timer = setTimeout(() => set({ message: null }), TOAST_MS)
  },
  hide: () => {
    if (timer) clearTimeout(timer)
    set({ message: null })
  },
}))

export const toast = (message: string): void => useToast.getState().show(message)
