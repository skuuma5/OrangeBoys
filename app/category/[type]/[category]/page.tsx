import { getDiscoverContent } from "@/lib/tmdb"
import { ContentGrid } from "@/components/content-grid"

export default async function CategoryPage({ params }: { params: { type: "movie" | "tv" | "anime"; category: "popular" | "trending" | "top_rated" } }) {
  const type = params.type === "anime" ? "anime" : params.type === "tv" ? "tv" : "movie"
  const items = await getDiscoverContent(type, params.category)
  const featured = items[0]
  const titleMap = { popular: "Popular", trending: "Trending", top_rated: "Top Rated" }
  const label = `${titleMap[params.category]} ${params.type === "tv" ? "Series" : params.type === "anime" ? "Anime" : "Movies"}`

  return (
    <div className="min-h-screen pb-20">
      {featured && (
        <section className="relative flex h-[48svh] min-h-[380px] items-end overflow-hidden">
          <img src={featured.backdropUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
          <div className="relative z-10 w-full px-5 pb-10 sm:px-8 md:px-12 lg:px-16">
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">{label}</h1>
          </div>
        </section>
      )}
      <div className="w-full px-5 pt-10 sm:px-8 md:px-12 lg:px-16">
        {!featured && <h1 className="mb-10 text-4xl font-black md:text-6xl">{label}</h1>}
        <ContentGrid items={items} />
      </div>
    </div>
  )
}
