import { ContentGrid } from "@/components/content-grid"
import { CatalogFilters } from "@/components/catalog-filters"
import { getCatalogContent } from "@/lib/tmdb"

export default async function SeriesPage({ searchParams }: { searchParams: { genre?: string; sort?: string } }) {
  const series = await getCatalogContent("tv", { genre: searchParams.genre, sort: searchParams.sort })
  const featured = series[0]

  return (
    <div className="min-h-screen pb-20">
      {featured && (
        <section className="relative flex h-[52svh] min-h-[420px] items-end overflow-hidden">
          <img src={featured.backdropUrl} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent" />
          <div className="relative z-10 w-full px-5 pb-10 sm:px-8 md:px-12 lg:px-16">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-primary">OrangeBoys Shows</p>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">TV Series</h1>
            <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">Binge-worthy series, new episodes, and timeless favorites.</p>
          </div>
        </section>
      )}

      <div className="w-full px-5 pt-10 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <a href="/category/tv/popular" className="rounded-full border border-primary bg-primary px-5 py-2 text-sm font-bold text-white">Popular</a>
            <a href="/category/tv/trending" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white hover:border-primary/50">Trending</a>
            <a href="/category/tv/top_rated" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white hover:border-primary/50">Top Rated</a>
          </div>
          <div className="flex items-center gap-2">
            <CatalogFilters mediaType="tv" />
          </div>
        </div>
        <ContentGrid items={series} />
      </div>
    </div>
  )
}
