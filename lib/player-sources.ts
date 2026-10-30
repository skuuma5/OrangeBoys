export interface PlayerSource {
  name: string
  url: string
}

export function getMoviePlayerSources(tmdbId: string): PlayerSource[] {
  return [
    { name: "VidSrc", url: `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}&autoplay=1` },
    { name: "VidSrc.to", url: `https://vidsrc.to/embed/movie/${tmdbId}?autoplay=1` },
    { name: "VidSrc.me", url: `https://vidsrc.me/embed/movie?tmdb=${tmdbId}&autoplay=1` },
    { name: "2Embed", url: `https://www.2embed.cc/embed/movie/${tmdbId}` },
    { name: "Embed.SU", url: `https://embed.su/embed/movie/${tmdbId}` },
    { name: "AutoEmbed", url: `https://autoembed.cc/embed/movie/${tmdbId}` },
    { name: "MoviesAPI", url: `https://moviesapi.club/movie/${tmdbId}` },
  ]
}

export function getTVPlayerSources(tmdbId: string, season: number, episode: number): PlayerSource[] {
  return [
    { name: "VidSrc", url: `https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}&autoplay=1` },
    { name: "VidSrc.to", url: `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}?autoplay=1` },
    { name: "VidSrc.me", url: `https://vidsrc.me/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}&autoplay=1` },
    { name: "2Embed", url: `https://www.2embed.cc/embed/tv/${tmdbId}/${season}/${episode}` },
    { name: "Embed.SU", url: `https://embed.su/embed/tv/${tmdbId}/${season}/${episode}` },
    { name: "AutoEmbed", url: `https://autoembed.cc/embed/tv/${tmdbId}/${season}/${episode}` },
    { name: "MoviesAPI", url: `https://moviesapi.club/tv/${tmdbId}-${season}-${episode}` },
  ]
}
