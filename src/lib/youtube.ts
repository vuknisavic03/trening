const ID = /^[A-Za-z0-9_-]{11}$/

/**
 * Prihvata: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID,
 * youtube.com/embed/ID, youtube.com/live/ID i goli ID od 11 znakova.
 * Vraća null ako nema validnog ID-a.
 */
export function parseYouTubeId(raw: string): string | null {
  const input = raw.trim()
  if (!input) return null
  if (ID.test(input)) return input

  const patterns: RegExp[] = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /\/shorts\/([A-Za-z0-9_-]{11})/,
    /\/embed\/([A-Za-z0-9_-]{11})/,
    /\/live\/([A-Za-z0-9_-]{11})/,
    /\/v\/([A-Za-z0-9_-]{11})/,
  ]

  for (const p of patterns) {
    const m = input.match(p)
    if (m && m[1]) return m[1]
  }
  return null
}

export function embedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
}
