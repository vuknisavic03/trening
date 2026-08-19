import { useRef } from 'react'
import { Download, Upload } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { exportPayload, parseImport, useStore } from '../../store/useStore'
import { storageIsPersistent } from '../../store/storage'
import { toast } from '../../store/useToast'
import { todayKey } from '../../lib/dates'

export function DataPanel() {
  const state = useStore()
  const replaceAll = useStore((s) => s.replaceAll)
  const fileRef = useRef<HTMLInputElement>(null)

  const download = (): void => {
    const json = exportPayload({
      days: state.days,
      sessions: state.sessions,
      drafts: state.drafts,
      body: state.body,
      inbody: state.inbody,
      videos: state.videos,
      settings: state.settings,
    })
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rezim-${todayKey()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast('Podaci izvezeni')
  }

  const onFile = async (file: File): Promise<void> => {
    const text = await file.text()
    const parsed = parseImport(text)
    if (!parsed) {
      toast('Fajl nije prepoznat')
      return
    }
    replaceAll(parsed)
    toast('Podaci uvezeni')
  }

  return (
    <Card className="p-4">
      <div className="label-lg">Podaci</div>
      <div className="label mt-1.5">
        {storageIsPersistent()
          ? 'čuva se na ovom telefonu'
          : 'storage nedostupan, podaci žive samo do zatvaranja'}
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="ghost" full onClick={download}>
          <Download size={15} strokeWidth={2.4} />
          Izvoz
        </Button>
        <Button variant="ghost" full onClick={() => fileRef.current?.click()}>
          <Upload size={15} strokeWidth={2.4} />
          Uvoz
        </Button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          e.target.value = ''
          if (file) void onFile(file)
        }}
      />
    </Card>
  )
}
