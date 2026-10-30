import { Hero } from "@/components/hero"
import { ContentSection } from "@/components/content-section"
import { ProviderSection } from "@/components/provider-section"
import { ContinueWatching } from "@/components/continue-watching"
import { BecauseYouWatched } from "@/components/because-you-watched"
import { getTrendingMovies, getTrendingTV, getPopularAnime } from "@/lib/tmdb"

export default async function Home() {
  const [trendingMovies, trendingSeries, trendingAnime] = await Promise.all([
    getTrendingMovies(),
    getTrendingTV(),
    getPopularAnime(),
  ])
  const featuredContent = trendingMovies[0]

  return (
    <div className="flex flex-col gap-0">
      <Hero content={featuredContent} items={trendingMovies.slice(0, 7)} />

      <div className="relative -mt-16 space-y-4 pb-20 lg:-mt-20 lg:space-y-6">
        <ContinueWatching />
        <BecauseYouWatched />
        <ProviderSection />

        <ContentSection
          title="Trending Movies"
          items={trendingMovies}
          href="/movies"
        />

        <ContentSection
          title="Popular TV Series"
          items={trendingSeries}
          href="/series"
        />

        <ContentSection
          title="Trending Anime"
          items={trendingAnime}
          href="/anime"
        />

        <ContentSection
          title="Recently Added"
          items={[...trendingMovies].reverse()}
          href="/movies"
        />
      </div>
    </div>
  )
}
