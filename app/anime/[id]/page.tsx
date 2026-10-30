import { getTVDetails, getTVSeason, mapTMDBContent } from "@/lib/tmdb"
import { VideoPlayer } from "@/components/video-player"
import { ContentSection } from "@/components/content-section"
import { Play, Share2, Star, ArrowLeft, VolumeX, MessageSquare } from "lucide-react"
import { MyListButton } from "@/components/my-list-button"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"

export default async function AnimeDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { season?: string; episode?: string }
}) {
  const data = await getTVDetails(params.id)
  const anime = mapTMDBContent(data, "anime")
  const activeSeason = Math.max(1, Number(searchParams?.season) || 1)
  const seasonData = await getTVSeason(params.id, activeSeason)
  const episodes = seasonData.episodes || []
  const activeEpisode = Math.max(1, Number(searchParams?.episode) || 1)
  const playerUrl = `https://vidsrc.xyz/embed/tv?tmdb=${params.id}&season=${activeSeason}&episode=${activeEpisode}&autoplay=1`
  const playerFallbackUrls = [
    `https://vidsrc.to/embed/tv/${params.id}/${activeSeason}/${activeEpisode}?autoplay=1`,
    `https://www.2embed.cc/embed/tv/${params.id}/${activeSeason}/${activeEpisode}`,
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-[72vh] min-h-[620px] w-full overflow-hidden">
        <img src={anime.backdropUrl} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25" />

        <Link href="/anime" className="absolute left-5 top-24 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-primary md:left-8 md:top-28" aria-label="Back to anime">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-5 pb-10 sm:px-8 md:px-12 lg:px-16 md:pb-14">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              {anime.genres[0] && <p className="font-medium text-gray-200">{anime.genres[0]}</p>}
              <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">{anime.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-200">
                <span>{anime.releaseDate}</span>
                <span className="text-gray-500">•</span>
                <span className="rounded border border-white/30 px-2 py-0.5 text-xs">TV-14</span>
                <span className="text-gray-500">•</span>
                <span className="flex items-center gap-1 text-yellow-400"><Star className="h-4 w-4 fill-current" />{anime.rating}</span>
                <span className="text-gray-500">•</span>
                <span>{data.number_of_seasons || 0} Seasons</span>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">{anime.description || "No synopsis is available for this anime."}</p>
              <div className="flex items-center gap-3 pt-1">
                <a href="#player" className="flex h-12 items-center gap-2 rounded-full bg-white px-7 text-base font-bold text-black transition hover:bg-primary hover:text-white">
                  <Play className="h-5 w-5 fill-current" /> Play
                </a>
                <MyListButton tmdbId={params.id} type="anime" title={anime.title} description={anime.description} releaseDate={anime.releaseDate} rating={Number(anime.rating)} backdropUrl={anime.backdropUrl} posterUrl={anime.posterUrl} />
                <ShareButton title={anime.title} />
              </div>
            </div>

            <div className="hidden w-full max-w-[320px] justify-self-end rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md lg:block xl:w-[320px]">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Status</dt><dd>{data.status || "Unknown"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Language</dt><dd>{data.original_language?.toUpperCase() || "JA"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">First Air Date</dt><dd>{data.first_air_date || "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Seasons</dt><dd>{data.number_of_seasons || 0}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            {/* Synopsis */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                <span className="h-8 w-2 bg-primary rounded-full" />
                Storyline
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed font-medium">
                {anime.description || "No synopsis is available for this title."}
              </p>
            </section>

            {/* Episode List */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                  <span className="h-8 w-2 bg-primary rounded-full" />
                  Episodes
                </h2>
                <div className="flex flex-wrap justify-end gap-2">
                  {(data.seasons || []).filter((season: any) => season.season_number > 0).map((season: any) => (
                    <a key={season.id} href={`?season=${season.season_number}&episode=1#player`} className={`px-4 py-2 rounded-xl text-sm font-bold border ${activeSeason === season.season_number ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-white hover:border-primary/50"}`}>
                      Season {season.season_number}
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {episodes.map((episode: any) => (
                  <a key={episode.id} href={`?season=${activeSeason}&episode=${episode.episode_number}#player`} className={`group relative flex flex-col gap-3 rounded-2xl ${activeEpisode === episode.episode_number ? "ring-2 ring-primary" : ""}`}>
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 transition-all group-hover:border-primary/50">
                      <img src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : anime.backdropUrl} alt="" className="h-full w-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="h-6 w-6 fill-white text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-white uppercase">Episode {episode.episode_number}</span>
                      </div>
                    </div>
                    <div className="px-1 pb-2">
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Episode {episode.episode_number}: {episode.name}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2">{episode.overview || "Episode details are unavailable."}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Player */}
            <section id="player" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                <span className="h-8 w-2 bg-primary rounded-full" />
                Video Player
              </h2>
              <VideoPlayer title={`${anime.title} - S${activeSeason}:E${activeEpisode}`} embedUrl={playerUrl} fallbackEmbedUrls={playerFallbackUrls} />
            </section>
          </div>

          <div className="space-y-10">
            {/* Anime Info Sidebar */}
            <div className="rounded-3xl bg-zinc-900/40 border border-white/5 p-8 space-y-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black">Information</h3>

              <div className="space-y-6">
                <InfoItem label="Type" value="TV Series" />
                <InfoItem label="Status" value={data.status || "Unknown"} />
                <InfoItem label="Premiered" value={data.first_air_date || anime.releaseDate || "Unknown"} />
                <InfoItem label="Network" value={data.networks?.[0]?.name || "Unknown"} />
                <InfoItem label="Country" value={data.origin_country?.join(", ") || "Unknown"} />
                <InfoItem label="Rating" value={`${anime.rating} / 10`} />
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((tag: string) => (
                    <span key={tag} className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold transition-all">
                <MessageSquare className="h-5 w-5" />
                Community Discussion
              </button>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-primary/20 to-orange-900/20 border border-primary/20 p-8 text-center space-y-4">
              <h3 className="text-xl font-black">Support the Original</h3>
              <p className="text-sm text-gray-400">Buy the official manga and merchandise to support the creators.</p>
              <button className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                GO TO STORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  )
}
