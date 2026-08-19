import { useCallback, useEffect, useRef, useState } from 'react'

function signalEnd(): void {
  try {
    if ('vibrate' in navigator) navigator.vibrate([120, 80, 120])
  } catch {
    /* uređaj ne podržava vibraciju */
  }
  try {
    type Ctor = typeof AudioContext
    const w = window as unknown as { AudioContext?: Ctor; webkitAudioContext?: Ctor }
    const Ctx = w.AudioContext ?? w.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.5)
    osc.onended = () => void ctx.close()
  } catch {
    /* audio nije dozvoljen bez interakcije */
  }
}

export type RestTimer = {
  remaining: number
  running: boolean
  duration: number
  start: (seconds: number) => void
  stop: () => void
  add: (seconds: number) => void
}

export function useRestTimer(defaultSeconds: number): RestTimer {
  const [endAt, setEndAt] = useState<number | null>(null)
  const [duration, setDuration] = useState(defaultSeconds)
  const [remaining, setRemaining] = useState(0)
  const fired = useRef(false)

  useEffect(() => {
    setDuration(defaultSeconds)
  }, [defaultSeconds])

  useEffect(() => {
    if (endAt === null) {
      setRemaining(0)
      return
    }
    const tick = (): void => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0 && !fired.current) {
        fired.current = true
        signalEnd()
        setEndAt(null)
      }
    }
    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [endAt])

  const start = useCallback((seconds: number) => {
    fired.current = false
    setDuration(seconds)
    setEndAt(Date.now() + seconds * 1000)
  }, [])

  const stop = useCallback(() => {
    fired.current = true
    setEndAt(null)
  }, [])

  const add = useCallback((seconds: number) => {
    setEndAt((prev) => (prev === null ? Date.now() + seconds * 1000 : prev + seconds * 1000))
    fired.current = false
  }, [])

  return { remaining, running: endAt !== null, duration, start, stop, add }
}
