const MOTN_BASE_URL = "https://api.movieofthenight.com/v4"

export async function motnFetch(path: string, params: Record<string, string> = {}) {
  const key = process.env.MOTN_API_KEY
  if (!key) throw new Error("MOTN API key is not configured")

  const url = new URL(`${MOTN_BASE_URL}${path}`)
  Object.entries(params).forEach(([name, value]) => url.searchParams.set(name, value))

  const response = await fetch(url, {
    headers: { "X-API-Key": key },
    next: { revalidate: 3600 },
  })
  if (!response.ok) throw new Error(`Movie API error: ${response.status}`)
  return response.json()
}

export interface MotnShow {
  id: string
  title: string
  overview?: string
  releaseYear?: number
  firstAirYear?: number
  rating?: number
  showType?: "movie" | "series"
  genres?: Array<{ id: string; name: string }>
  imageSet?: {
    verticalPoster?: Record<string, string>
    horizontalPoster?: Record<string, string>
    verticalBackdrop?: Record<string, string>
    horizontalBackdrop?: Record<string, string>
  }
}

export function getMotnImage(show: MotnShow, kind: "poster" | "backdrop" = "poster") {
  const set = show.imageSet
  if (!set) return undefined
  const images = kind === "poster"
    ? set.verticalPoster || set.verticalBackdrop || set.horizontalPoster
    : set.horizontalBackdrop || set.horizontalPoster || set.verticalBackdrop
  return images?.w720 || images?.w600 || images?.w500 || images?.w360 || images?.w240
}
