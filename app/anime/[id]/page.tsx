import { getTVDetails, getTVSeason, mapTMDBContent } from "@/lib/tmdb"
import { VideoPlayer } from "@/components/video-player"
import { ContentSection } from "@/components/content-section"
import { Play, Plus, Star, Heart, MessageSquare } from "lucide-react"

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
  const playerUrl = `https://vidsrc.sh/embed/tv/${params.id}/${activeSeason}/${activeEpisode}?autoplay=1`

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Immersive Anime Header */}
      <div className="relative h-[75vh] w-full">
        <img
          src={anime.backdropUrl}
          alt={anime.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />

        <div className="container absolute bottom-0 left-0 right-0 px-4 pb-16 md:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(255,106,0,0.5)]">Anime</span>
              <span className="text-gray-300 font-bold">TV Series</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300 font-bold">{data.number_of_episodes || data.seasons?.length || "—"} Episodes</span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter md:text-8xl text-white">
              {anime.title}
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex text-orange-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-5 w-5 ${s === 5 ? "text-gray-600" : "fill-current"}`} />
                  ))}
                </div>
                <span className="text-lg font-bold">{anime.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-sm font-medium text-gray-300">{anime.genres.slice(0, 3).join(", ")}</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#player" className="flex items-center gap-2 rounded-2xl bg-primary px-10 py-5 text-xl font-black text-white transition-all hover:scale-105 hover:brightness-110 orange-glow">
                <Play className="h-7 w-7 fill-white" />
                WATCH NOW
              </a>
              <button className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/10">
                <Plus className="h-7 w-7" />
              </button>
              <button className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/10">
                <Heart className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
              <VideoPlayer title={`${anime.title} - S${activeSeason}:E${activeEpisode}`} embedUrl={playerUrl} />
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
