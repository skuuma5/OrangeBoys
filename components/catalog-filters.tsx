"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, Filter, SlidersHorizontal } from "lucide-react"

interface CatalogFiltersProps {
  mediaType: "movie" | "tv" | "anime"
}

const movieGenres = [
  ["28", "Action"],
  ["12", "Adventure"],
  ["35", "Comedy"],
  ["80", "Crime"],
  ["18", "Drama"],
  ["14", "Fantasy"],
  ["27", "Horror"],
  ["9648", "Mystery"],
  ["10749", "Romance"],
  ["878", "Science Fiction"],
  ["53", "Thriller"],
]

const tvGenres = [
  ["10759", "Action & Adventure"],
  ["16", "Animation"],
  ["35", "Comedy"],
  ["80", "Crime"],
  ["18", "Drama"],
  ["10751", "Family"],
  ["10762", "Kids"],
  ["9648", "Mystery"],
  ["10765", "Sci-Fi & Fantasy"],
  ["10768", "War & Politics"],
]

export function CatalogFilters({ mediaType }: CatalogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const genreOptions = mediaType === "tv" || mediaType === "anime" ? tvGenres : movieGenres
  const selectedGenre = searchParams.get("genre") || ""
  const selectedSort = searchParams.get("sort") || "popular"

  const updateParam = (name: "genre" | "sort", value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === "popular" && name === "sort") {
      params.delete(name)
    } else {
      params.set(name, value)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-2">
      <label className="relative flex items-center">
        <span className="sr-only">Genre</span>
        <Filter className="pointer-events-none absolute left-4 z-10 h-4 w-4 text-white" />
        <select
          value={selectedGenre}
          onChange={(event) => updateParam("genre", event.target.value)}
          className="h-[38px] appearance-none rounded-full border border-white/10 bg-white/5 pl-10 pr-9 text-sm font-bold text-white outline-none transition-colors hover:border-primary/50 focus:border-primary"
          aria-label="Filter by genre"
        >
          <option value="" className="bg-zinc-950">Genres</option>
          {(mediaType === "anime"
            ? [["16", "Animation"], ...tvGenres.filter(([id]) => id !== "16")]
            : genreOptions).map(([id, name]) => (
            <option key={id} value={id} className="bg-zinc-950">{name}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-white/60" />
      </label>

      <label className="relative flex items-center">
        <span className="sr-only">Sort</span>
        <SlidersHorizontal className="pointer-events-none absolute left-4 z-10 h-4 w-4 text-white" />
        <select
          value={selectedSort}
          onChange={(event) => updateParam("sort", event.target.value)}
          className="h-[38px] appearance-none rounded-full border border-white/10 bg-white/5 pl-10 pr-9 text-sm font-bold text-white outline-none transition-colors hover:border-primary/50 focus:border-primary"
          aria-label="Sort content"
        >
          <option value="popular" className="bg-zinc-950">Popular</option>
          <option value="rating" className="bg-zinc-950">Top Rated</option>
          <option value="newest" className="bg-zinc-950">Newest</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-white/60" />
      </label>
    </div>
  )
}
