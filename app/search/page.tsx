"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ContentGrid } from "@/components/content-grid"
import type { Content } from "@/types"
import { Search as SearchIcon, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = React.useState(query)
  const [results, setResults] = React.useState<Content[]>([])
  const [trending, setTrending] = React.useState<Content[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/movies/search")
      .then((response) => response.json())
      .then((data) => setTrending(Array.isArray(data) ? data.slice(0, 12) : []))
      .catch(() => setTrending([]))
  }, [])

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    const timeout = window.setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/movies/search?q=${encodeURIComponent(searchQuery.trim())}`)
        const data = await response.json()
        setResults(Array.isArray(data) ? data : [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [searchQuery])

  const visibleItems = searchQuery.trim() ? results : trending

  return (
    <div className="min-h-screen px-4 pb-24 pt-[84px] md:px-8">
      <div className="mx-auto max-w-[1500px]">
        <Link href="/" aria-label="Back" className="mb-12 flex h-10 w-10 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white md:absolute md:left-8 md:top-8">
          <ArrowLeft className="h-7 w-7" />
        </Link>

        <div className="mx-auto mb-14 max-w-[620px] pt-1 md:pt-8">
          <div className="relative">
            <SearchIcon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
            <input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows & people..."
              className="h-[58px] w-full rounded-full border border-white/10 bg-black/40 px-12 text-base text-white shadow-[0_12px_40px_rgba(0,0,0,.25)] outline-none backdrop-blur-xl transition-all placeholder:text-white/35 focus:border-primary/60 focus:bg-black/55"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} aria-label="Clear search" className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/45 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center text-sm text-white/45">Searching…</div>
        ) : visibleItems.length > 0 ? (
          <section>
            <h1 className="mb-7 text-center text-lg font-bold text-white/90 md:text-xl">
              {searchQuery.trim() ? `${results.length} results for “${searchQuery.trim()}”` : "Trending Today"}
            </h1>
            <ContentGrid items={visibleItems} />
          </section>
        ) : searchQuery.trim() ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <SearchIcon className="h-7 w-7 text-white/35" />
            </div>
            <h2 className="text-lg font-bold">No results found</h2>
            <p className="mt-2 text-sm text-white/45">Try another title or keyword.</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-white/45">Loading search…</div>}>
      <SearchContent />
    </Suspense>
  )
}
