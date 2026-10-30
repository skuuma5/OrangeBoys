import { getMovieDetails, mapTMDBContent } from "@/lib/tmdb"
import { VideoPlayer } from "@/components/video-player"
import { ContentSection } from "@/components/content-section"
import { Play, Share2, Star, Calendar, Clock, Globe, ArrowLeft, Eye, VolumeX } from "lucide-react"
import { MyListButton } from "@/components/my-list-button"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const data = await getMovieDetails(params.id)
  const movie = mapTMDBContent(data, "movie")
  const similarMovies = (data.similar?.results || []).slice(0, 12).map((item: any) => mapTMDBContent(item, "movie"))
  const cast = (data.credits?.cast || []).slice(0, 10)
  const videos = (data.videos?.results || []).filter((video: any) => video.site === "YouTube" && ["Trailer", "Teaser"].includes(video.type)).slice(0, 6)
  const playerUrl = `https://vidsrc.xyz/embed/movie?tmdb=${params.id}&autoplay=1`
  const playerFallbackUrls = [
    `https://vidsrc.to/embed/movie/${params.id}?autoplay=1`,
    `https://www.2embed.cc/embed/movie/${params.id}`,
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cinematic hero inspired by the Cinejoy detail layout */}
      <section className="relative h-[72vh] min-h-[620px] w-full overflow-hidden">
        <img src={movie.backdropUrl} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

        <Link href="/movies" className="absolute left-5 top-24 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-primary md:left-8 md:top-28">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-5 pb-10 sm:px-8 md:px-12 lg:px-16 md:pb-14">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {movie.genres[0] && <span className="font-medium text-gray-200">{movie.genres[0]}</span>}
                {movie.releaseDate && <><span className="text-gray-500">•</span><span className="text-gray-300">{movie.releaseDate}</span></>}
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-200">
                <span>{movie.releaseDate}</span>
                <span className="text-gray-500">•</span>
                <span>{data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : movie.duration || "Movie"}</span>
                <span className="rounded border border-white/30 px-2 py-0.5 text-xs">{data.adult ? "18+" : "R"}</span>
                {data.vote_average ? <><span className="text-gray-500">•</span><span className="flex items-center gap-1 text-yellow-400"><Star className="h-4 w-4 fill-current" />{movie.rating}</span></> : null}
              </div>

              <p className="max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
                {movie.description || "No synopsis is available for this title."}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <a href="#player" className="flex h-12 items-center gap-2 rounded-full bg-white px-7 text-base font-bold text-black transition hover:bg-primary hover:text-white">
                  <Play className="h-5 w-5 fill-current" /> Play
                </a>
                <MyListButton tmdbId={params.id} type="movie" title={movie.title} description={movie.description} releaseDate={movie.releaseDate} rating={Number(movie.rating)} backdropUrl={movie.backdropUrl} posterUrl={movie.posterUrl} />
                <ShareButton title={movie.title} />
              </div>
            </div>

            <div className="hidden w-full max-w-[320px] justify-self-end rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md lg:block xl:w-[320px]">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Runtime</dt><dd>{data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "Unknown"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Language</dt><dd>{data.original_language?.toUpperCase() || "EN"}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Release Date</dt><dd>{data.release_date || movie.releaseDate}</dd></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-gray-500">Revenue</dt><dd>{data.revenue ? `$${data.revenue.toLocaleString()}` : "—"}</dd></div>
              </dl>
              {data.production_companies?.length ? <div className="mt-4 flex items-center gap-2 text-xs text-gray-400"><span className="text-white">STUDIO</span>{data.production_companies[0].name}</div> : null}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16">
        {cast.length > 0 && (
          <section className="py-10">
            <h2 className="mb-6 text-2xl font-bold">Cast</h2>
            <div className="hide-scrollbar flex gap-7 overflow-x-auto pb-4">
              {cast.map((person: any) => (
                <div key={person.id} className="w-[112px] shrink-0 text-center sm:w-[128px]">
                  <div className="mx-auto h-[112px] w-[112px] overflow-hidden rounded-full bg-zinc-900 sm:h-[128px] sm:w-[128px]">
                    {person.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl font-bold text-gray-500">{person.name?.charAt(0) || "?"}</div>
                    )}
                  </div>
                  <p className="mt-3 truncate text-sm font-semibold text-white">{person.name}</p>
                  <p className="mt-1 truncate text-xs text-gray-500">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section className="py-4">
            <h2 className="mb-6 text-2xl font-bold">Trailers</h2>
            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-6">
              {videos.map((video: any) => (
                <a key={video.id} href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noreferrer" className="group relative aspect-video w-[280px] shrink-0 overflow-hidden rounded-xl bg-zinc-900 sm:w-[330px]">
                  <img src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={video.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"><Play className="h-5 w-5 fill-current" /></div>
                    <p className="text-sm font-bold">{video.name}</p>
                    <p className="text-xs text-gray-300">{video.type}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section id="player" className="scroll-mt-28 py-10">
          <h2 className="mb-6 text-2xl font-bold">Watch {movie.title}</h2>
          <VideoPlayer title={movie.title} embedUrl={playerUrl} fallbackEmbedUrls={playerFallbackUrls} history={{ tmdbId: params.id, type: "movie", title: movie.title, description: movie.description, releaseDate: movie.releaseDate, rating: Number(movie.rating), backdropUrl: movie.backdropUrl, posterUrl: movie.posterUrl }} />
        </section>
      </div>

      <ContentSection title="Similar Movies" items={similarMovies} />
    </div>
  )
}
