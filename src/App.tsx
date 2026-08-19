import { useCallback, useState } from 'react'
import { TabBar } from './components/ui/TabBar'
import { Toast } from './components/ui/Toast'
import { Danas } from './screens/Danas'
import { Ishrana } from './screens/Ishrana'
import { Trening } from './screens/Trening'
import { Vezbe } from './screens/Vezbe'
import { Napredak } from './screens/Napredak'
import { useTodayKey } from './hooks/useTodayKey'
import type { DayId, TabId } from './types'

export default function App() {
  const today = useTodayKey()
  const [tab, setTab] = useState<TabId>('danas')
  const [library, setLibrary] = useState(false)
  const [pickDay, setPickDay] = useState<DayId | null>(null)

  const goTraining = useCallback((day: DayId) => {
    setPickDay(day)
    setLibrary(false)
    setTab('trening')
  }, [])

  const onTab = useCallback((next: TabId) => {
    setLibrary(false)
    setTab(next)
  }, [])

  return (
    <div className="mx-auto min-h-screen max-w-lg">
      <main className="pb-safe-tab pt-safe px-4">
        {library ? (
          <Vezbe onBack={() => setLibrary(false)} />
        ) : tab === 'danas' ? (
          <Danas today={today} onGoTraining={goTraining} onGoNutrition={() => setTab('ishrana')} />
        ) : tab === 'ishrana' ? (
          <Ishrana today={today} />
        ) : tab === 'trening' ? (
          <Trening
            today={today}
            requestedDay={pickDay}
            onDayConsumed={() => setPickDay(null)}
            onOpenLibrary={() => setLibrary(true)}
          />
        ) : (
          <Napredak today={today} />
        )}
      </main>

      <Toast />
      <TabBar active={tab} onChange={onTab} />
    </div>
  )
}
