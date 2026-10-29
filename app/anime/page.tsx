import { ContentGrid } from "@/components/content-grid"
import { PageHeader } from "@/components/page-header"
import { getPopularAnime } from "@/lib/tmdb"
import { Filter, SlidersHorizontal } from "lucide-react"

export default async function AnimePage() {
  const anime = await getPopularAnime()
  const featured = anime[0]

  return (
    <div className="min-h-screen pb-20">
      {featured && (
        <section className="relative flex h-[52svh] min-h-[420px] items-end overflow-hidden">
          <img src={featured.backdropUrl} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent" />
          <div className="relative z-10 w-full px-5 pb-10 sm:px-8 md:px-12 lg:px-16">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-primary">OrangeBoys Anime</p>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">Anime</h1>
            <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">Discover popular anime series from Japan.</p>
          </div>
        </section>
      )}

      <div className="w-full px-5 pt-10 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <a href="/category/anime/popular" className="rounded-full border border-primary bg-primary px-5 py-2 text-sm font-bold text-white">Popular</a>
            <a href="/category/anime/trending" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white hover:border-primary/50">Trending</a>
            <a href="/category/anime/top_rated" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white hover:border-primary/50">Top Rated</a>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white"><Filter className="h-4 w-4" /> Genres</button>
            <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white"><SlidersHorizontal className="h-4 w-4" /> Sort</button>
          </div>
        </div>
        <ContentGrid items={anime} />
      </div>
    </div>
  )
}
