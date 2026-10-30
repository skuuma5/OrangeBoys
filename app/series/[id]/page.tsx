import { getTVDetails, getTVSeason, mapTMDBContent } from "@/lib/tmdb"
import { VideoPlayer } from "@/components/video-player"
import { ContentSection } from "@/components/content-section"
import { Play, Share2, Star, Calendar, Tv, ChevronDown, ArrowLeft, VolumeX, Grid2X2 } from "lucide-react"
import { MyListButton } from "@/components/my-list-button"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { getTVPlayerSources } from "@/lib/player-sources"

export default async function SeriesDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { season?: string; episode?: string }
}) {
  const data = await getTVDetails(params.id)
  const series = mapTMDBContent(data, "series")
  const seasons = (data.seasons || []).filter((season: any) => season.season_number > 0)
  const activeSeason = Math.max(1, Number(searchParams?.season) || 1)
  const seasonData = await getTVSeason(params.id, activeSeason)
  const episodes = seasonData.episodes || []
  const activeEpisode = Math.max(1, Number(searchParams?.episode) || 1)
  const cast = (data.credits?.cast || []).slice(0, 10)
  const similarSeries = (data.similar?.results || []).slice(0, 12).map((item: any) => mapTMDBContent(item, "series"))
  const videos = (data.videos?.results || []).filter((video: any) => video.site === "YouTube" && ["Trailer", "Teaser"].includes(video.type)).slice(0, 6)
  const playerSources = getTVPlayerSources(params.id, activeSeason, activeEpisode)
  const playerUrl = playerSources[0].url

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-[72vh] min-h-[620px] w-full overflow-hidden">
        <img src={series.backdropUrl} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25" />

        <Link href="/series" className="absolute left-5 top-24 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-primary md:left-8 md:top-28" aria-label="Back to series">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-5 pb-10 sm:px-8 md:px-12 lg:px-16 md:pb-14">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              {series.genres[0] && <p className="font-medium text-gray-200">{series.genres[0]}</p>}
              <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">{series.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-200">
                <span>{data.first_air_date?.slice(0, 4)}{data.last_air_date && data.first_air_date?.slice(0,4) !== data.last_air_date.slice(0,4) ? `-${data.last_air_date.slice(0,4)}` : ""}</span>
                <span className="text-gray-500">•</span><span className="rounded border border-white/30 px-2 py-0.5 text-xs">TV-MA</span>
                <span className="text-gray-500">•</span><span className="flex items-center gap-1 text-yellow-400"><Star className="h-4 w-4 fill-current" />{series.rating}</span>
                <span className="text-gray-500">•</span><span>{data.number_of_seasons || 0} Seasons</span>
                <span className="text-gray-500">•</span><span>{data.number_of_episodes || 0} Episodes</span>
              </div>
              {data.created_by?.length ? <p className="text-sm text-gray-400">Creator: <span className="text-white">{data.created_by.map((person: any) => person.name).join(", ")}</span></p> : null}
              <p className="max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">{series.description || "No synopsis is available for this series."}</p>
              <div className="flex items-center gap-3 pt-1">
                <a href="#episodes" className="flex h-12 items-center gap-2 rounded-full bg-white px-7 text-base font-bold text-black transition hover:bg-primary hover:text-white"><Play className="h-5 w-5 fill-current" /> Play</a>
                <MyListButton tmdbId={params.id} type="series" title={series.title} description={series.description} releaseDate={series.releaseDate} rating={Number(series.rating)} backdropUrl={series.backdropUrl} posterUrl={series.posterUrl} />
                <ShareButton title={series.title} />
              </div>
            </div>

            <div className="hidden w-full max-w-[320px] justify-self-end rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md lg:block xl:w-[320px]">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Status</dt><dd>{data.status || "Unknown"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Language</dt><dd>{data.original_language?.toUpperCase() || "EN"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">First Air Date</dt><dd>{data.first_air_date || "—"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Last Aired</dt><dd>{data.last_air_date || "—"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Seasons</dt><dd>{data.number_of_seasons || 0}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Episodes</dt><dd>{data.number_of_episodes || 0}</dd></div>
              </dl>
              {data.networks?.length ? <div className="mt-4 text-right text-xl font-black text-white/80">{data.networks[0].name.toUpperCase()}</div> : null}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16">
        <section id="episodes" className="scroll-mt-28 py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">Episodes</h2>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300"><Star className="h-4 w-4" /> Ratings</button>
              <button className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300"><Calendar className="h-4 w-4" /> Oldest</button>
              <button className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300"><Grid2X2 className="h-4 w-4" /> Season</button>
              <form method="get" className="flex items-center gap-2">
                <input type="hidden" name="episode" value="1" />
                <div className="relative">
                  <select
                    name="season"
                    defaultValue={activeSeason}
                    className="appearance-none rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 pr-9 text-sm font-bold text-white outline-none"
                  >
                    {seasons.map((season: any) => <option key={season.id} value={season.season_number}>Season {season.season_number}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button type="submit" className="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white">Open</button>
              </form>
            </div>
          </div>

          <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-5">
            {episodes.map((episode: any) => (
              <a key={episode.id} href={`?season=${activeSeason}&episode=${episode.episode_number}#player`} className="group w-[260px] shrink-0 sm:w-[310px]">
                <div className={`relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border transition ${activeEpisode === episode.episode_number ? "border-primary" : "border-transparent group-hover:border-white/30"}`}>
                  <img src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : series.backdropUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute left-3 top-3 rounded bg-black/65 px-2 py-1 text-xs font-bold">E{episode.episode_number}</span>
                  {episode.runtime ? <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-bold">{episode.runtime}m</span> : null}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"><Play className="h-5 w-5 fill-current" /></span></div>
                </div>
                <h3 className="mt-3 line-clamp-1 text-sm font-bold group-hover:text-primary">{episode.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{episode.overview || "Episode details are unavailable."}</p>
              </a>
            ))}
          </div>
        </section>

        {cast.length > 0 && (
          <section className="py-6">
            <h2 className="mb-6 text-2xl font-bold">Cast</h2>
            <div className="hide-scrollbar flex gap-7 overflow-x-auto pb-4">
              {cast.map((person: any) => (
                <div key={person.id} className="w-[112px] shrink-0 text-center sm:w-[128px]">
                  <div className="mx-auto h-[112px] w-[112px] overflow-hidden rounded-full bg-zinc-900 sm:h-[128px] sm:w-[128px]">
                    {person.profile_path ? <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-4xl font-bold text-gray-500">{person.name?.charAt(0) || "?"}</div>}
                  </div>
                  <p className="mt-3 truncate text-sm font-semibold text-white">{person.name}</p>
                  <p className="mt-1 truncate text-xs text-gray-500">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section className="py-6"><h2 className="mb-6 text-2xl font-bold">Trailers</h2><div className="hide-scrollbar flex gap-4 overflow-x-auto pb-6">{videos.map((video: any) => <a key={video.id} href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noreferrer" className="group relative aspect-video w-[280px] shrink-0 overflow-hidden rounded-xl sm:w-[330px]"><img src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={video.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" /><div className="absolute bottom-4 left-4"><p className="text-sm font-bold">{video.name}</p><p className="text-xs text-gray-300">{video.type}</p></div></a>)}</div></section>
        )}

        <section id="player" className="scroll-mt-28 py-10">
          <h2 className="mb-6 text-2xl font-bold">Watch {series.title}</h2>
          <VideoPlayer title={`${series.title} - S${activeSeason}:E${activeEpisode}`} embedUrl={playerUrl} sources={playerSources} history={{ tmdbId: params.id, type: "series", title: series.title, description: series.description, releaseDate: series.releaseDate, rating: Number(series.rating), backdropUrl: series.backdropUrl, posterUrl: series.posterUrl, season: activeSeason, episode: activeEpisode }} />
        </section>
      </div>

      <ContentSection title="Similar Series" items={similarSeries} />
    </div>
  )
}
