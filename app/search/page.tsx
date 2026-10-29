"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ContentGrid } from "@/components/content-grid"
import { PageHeader } from "@/components/page-header"
import type { Content } from "@/types"
import { Search as SearchIcon, X } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = React.useState(query)
  const [results, setResults] = React.useState<Content[]>([])
  const [loading, setLoading] = React.useState(false)

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
    }, 350)

    return () => window.clearTimeout(timeout)
  }, [searchQuery])

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 md:px-8">
      <div className="mb-12">
        <PageHeader
          title="Search"
          description={searchQuery ? `Showing results for "${searchQuery}"` : "Search for your favorite movies, series, and anime."}
        />

        <div className="relative max-w-2xl mt-8">
          <SearchIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, genre, or actor..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-lg text-white outline-none focus:border-primary/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Searching movies and shows…</div>
      ) : results.length > 0 ? (
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{results.length} results found</span>
          </div>
          <ContentGrid items={results} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center">
            <SearchIcon className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-white">No results found</h3>
          <p className="text-gray-400 max-w-md">
            We couldn't find anything matching "{searchQuery}". Try different keywords or browse our categories.
          </p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 pt-32 pb-20 md:px-8"><div className="text-gray-400">Loading search…</div></div>}>
      <SearchContent />
    </Suspense>
  )
}
