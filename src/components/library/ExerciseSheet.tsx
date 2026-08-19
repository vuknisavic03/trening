import { useEffect, useState } from 'react'
import { AlertTriangle, ExternalLink, Trash2, Youtube } from 'lucide-react'
import { Sheet } from '../ui/Sheet'
import { Button } from '../ui/Button'
import { EXERCISES, searchUrl } from '../../data/exercises'
import { embedUrl, parseYouTubeId } from '../../lib/youtube'
import { useStore } from '../../store/useStore'
import { toast } from '../../store/useToast'
import type { ExerciseId } from '../../types'

type Props = {
  exercise: ExerciseId | null
  onClose: () => void
}

export function ExerciseSheet({ exercise, onClose }: Props) {
  const videos = useStore((s) => s.videos)
  const setVideo = useStore((s) => s.setVideo)
  const clearVideo = useStore((s) => s.clearVideo)
  const [link, setLink] = useState('')

  useEffect(() => {
    setLink('')
  }, [exercise])

  if (!exercise) return null

  const ex = EXERCISES[exercise]
  const videoId = videos[exercise]

  const save = (): void => {
    const id = parseYouTubeId(link)
    if (!id) {
      toast('Link nije prepoznat')
      return
    }
    setVideo(exercise, id)
    setLink('')
    toast('Video sačuvan')
  }

  return (
    <Sheet open onClose={onClose} title={ex.name} subtitle={ex.group}>
      <div className="flex flex-col gap-5 pb-2">
        {videoId ? (
          <div className="overflow-hidden rounded-xl border border-line bg-ink">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                key={videoId}
                src={embedUrl(videoId)}
                title={ex.name}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-bg p-4">
            <div className="flex items-center gap-2 text-ink2">
              <Youtube size={18} strokeWidth={2.2} />
              <span className="label-lg">Nema sačuvanog videa</span>
            </div>
            <Button
              variant="ghost"
              full
              className="mt-3"
              onClick={() => window.open(searchUrl(exercise), '_blank', 'noopener')}
            >
              Traži na YouTube-u
              <ExternalLink size={15} strokeWidth={2.4} />
            </Button>
            <div className="mono mt-2 text-[11px] text-ink3">{ex.query}</div>

            <div className="mt-3 flex gap-2">
              <input
                type="url"
                inputMode="url"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Nalepi link ili ID"
                aria-label="YouTube link"
                className="min-h-[46px] flex-1 rounded-xl border border-line bg-card px-3 text-[14px] outline-none focus:border-accent"
              />
              <Button onClick={save} disabled={link.trim().length === 0}>
                Sačuvaj
              </Button>
            </div>
          </div>
        )}

        <div>
          <div className="label-lg">Tempo</div>
          <p className="mt-1.5 text-[14px] leading-snug">{ex.tempo}</p>
        </div>

        <div>
          <div className="label-lg">Izvođenje</div>
          <ol className="mt-2 space-y-2.5">
            {ex.steps.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-snug">
                <span className="mono mt-[1px] shrink-0 text-[11px] text-ink3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="label-lg">Česte greške</div>
          <ul className="mt-2 space-y-2.5">
            {ex.mistakes.map((m, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-snug">
                <AlertTriangle
                  size={15}
                  strokeWidth={2.4}
                  className="mt-[3px] shrink-0 text-warn"
                />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {videoId && (
          <Button
            variant="danger"
            full
            onClick={() => {
              clearVideo(exercise)
              toast('Video obrisan')
            }}
          >
            <Trash2 size={15} strokeWidth={2.4} />
            Obriši sačuvani video
          </Button>
        )}
      </div>
    </Sheet>
  )
}
