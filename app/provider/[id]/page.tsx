import { getProviderContent } from "@/lib/tmdb"
import { ContentGrid } from "@/components/content-grid"
import { ContentSection } from "@/components/content-section"

export default async function ProviderPage({ params, searchParams }: { params: { id: string }; searchParams?: { name?: string } }) {
  const providerName = searchParams?.name || "Provider"
  const [movies, series] = await Promise.all([
    getProviderContent(params.id, "movie"),
    getProviderContent(params.id, "tv"),
  ])
  const featured = movies[0] || series[0]

  return (
    <div className="min-h-screen pb-20">
      {featured && (
        <section className="relative flex h-[48svh] min-h-[380px] items-end overflow-hidden">
          <img src={featured.backdropUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          <div className="relative z-10 w-full px-5 pb-10 sm:px-8 md:px-12 lg:px-16">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-primary">Available on</p>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">{providerName}</h1>
          </div>
        </section>
      )}
      {!featured && <div className="w-full px-5 pt-36 sm:px-8 md:px-12 lg:px-16"><h1 className="text-5xl font-black">{providerName}</h1></div>}
      <div className="mt-2 space-y-2">
        <ContentSection title="Movies" items={movies.slice(0, 20)} href="/movies" />
        <ContentSection title="TV Series" items={series.slice(0, 20)} href="/series" />
      </div>
    </div>
  )
}
