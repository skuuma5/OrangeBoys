const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams(params);
  if (!TMDB_API_TOKEN && TMDB_API_KEY) {
    queryParams.set("api_key", TMDB_API_KEY);
  }

  const headers: Record<string, string> = {};
  if (TMDB_API_TOKEN) {
    headers.Authorization = `Bearer ${TMDB_API_TOKEN}`;
  }

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`, {
    headers,
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTrendingMovies() {
  const data = await fetchTMDB("/trending/movie/day");
  return data.results.map((item: any) => mapTMDBContent(item, "movie"));
}

export async function getTrendingTV() {
  const data = await fetchTMDB("/trending/tv/day");
  return data.results.map((item: any) => mapTMDBContent(item, "series"));
}

export async function getMovieDetails(id: string) {
  return fetchTMDB(`/movie/${id}`, { append_to_response: "videos,credits,similar,watch/providers" });
}

export async function getMovieRecommendations(id: string) {
  const data = await fetchTMDB(`/movie/${id}/recommendations`, { language: "en-US", page: "1" });
  return (data.results || []).map((item: any) => mapTMDBContent(item, "movie"));
}

export async function getTVRecommendations(id: string) {
  const data = await fetchTMDB(`/tv/${id}/recommendations`, { language: "en-US", page: "1" });
  return (data.results || []).map((item: any) => mapTMDBContent(item, "series"));
}

export async function getTVDetails(id: string) {
  return fetchTMDB(`/tv/${id}`, { append_to_response: "videos,credits,similar,watch/providers" });
}

export async function getTVSeason(id: string, season: number) {
  return fetchTMDB(`/tv/${id}/season/${season}`);
}

export async function searchContent(query: string) {
  return fetchTMDB("/search/multi", { query });
}

export function getTMDBImageUrl(path: string | null, size: "poster" | "backdrop" | "original" = "poster") {
  if (!path) return "https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=2070&auto=format&fit=crop";

  const sizes = {
    poster: "w500",
    backdrop: "w1280",
    original: "original",
  };

  return `https://image.tmdb.org/t/p/${sizes[size]}${path}`;
}

const genreNames: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance",
  878: "Sci-Fi", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
  10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality",
  10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics",
};

export function mapTMDBContent(item: any, type: "movie" | "series" | "anime" = "movie") {
  const date = item.release_date || item.first_air_date || "";
  const genres = Array.isArray(item.genres)
    ? item.genres.map((genre: any) => genre.name).filter(Boolean)
    : (item.genre_ids || []).map((id: number) => genreNames[id]).filter(Boolean);

  return {
    id: String(item.id),
    title: item.title || item.name || "Untitled",
    originalTitle: item.original_title || item.original_name,
    description: item.overview || "",
    type,
    releaseDate: date ? date.slice(0, 4) : "",
    rating: Number(Number(item.vote_average || 0).toFixed(1)),
    duration: item.runtime ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m` : undefined,
    genres,
    backdropUrl: getTMDBImageUrl(item.backdrop_path, "backdrop"),
    posterUrl: getTMDBImageUrl(item.poster_path, "poster"),
    status: item.status,
    seasons: item.number_of_seasons,
    episodes: item.number_of_episodes,
  };
}

export async function getPopularMovies() {
  const data = await fetchTMDB("/movie/popular", { language: "en-US", page: "1" });
  return data.results.map((item: any) => mapTMDBContent(item, "movie"));
}

export async function getPopularTV() {
  const data = await fetchTMDB("/tv/popular", { language: "en-US", page: "1" });
  return data.results.map((item: any) => mapTMDBContent(item, "series"));
}

export async function getPopularAnime() {
  const data = await fetchTMDB("/discover/tv", {
    language: "en-US",
    sort_by: "popularity.desc",
    with_genres: "16",
    with_origin_country: "JP",
    page: "1",
  });
  return data.results.map((item: any) => mapTMDBContent(item, "anime"));
}

export async function getCatalogContent(
  mediaType: "movie" | "tv" | "anime",
  options: { genre?: string; sort?: string } = {},
) {
  const isAnime = mediaType === "anime";
  const endpoint = `/discover/${isAnime ? "tv" : mediaType}`;
  const sortMap: Record<string, string> = {
    popular: "popularity.desc",
    rating: "vote_average.desc",
    newest: isAnime ? "first_air_date.desc" : "primary_release_date.desc",
  };
  const params: Record<string, string> = {
    language: "en-US",
    sort_by: sortMap[options.sort || "popular"] || sortMap.popular,
    page: "1",
  };

  if (options.genre) {
    params.with_genres = options.genre;
  }

  if (isAnime) {
    params.with_genres = options.genre || "16";
    params.with_origin_country = "JP";
    params["vote_count.gte"] = "50";
  }

  if (options.sort === "rating") {
    params["vote_count.gte"] = "100";
  }

  const data = await fetchTMDB(endpoint, params);
  const type = isAnime ? "anime" : mediaType === "tv" ? "series" : "movie";
  return (data.results || []).map((item: any) => mapTMDBContent(item, type));
}

export async function getDiscoverContent(
  mediaType: "movie" | "tv" | "anime",
  category: "popular" | "trending" | "top_rated" = "popular",
) {
  const isAnime = mediaType === "anime";
  const endpoint = category === "trending"
    ? `/trending/${isAnime ? "tv" : mediaType}/week`
    : isAnime
      ? "/discover/tv"
      : `/${mediaType}/${category}`;
  const params: Record<string, string> = isAnime
    ? {
        language: "en-US",
        sort_by: category === "top_rated" ? "vote_average.desc" : "popularity.desc",
        with_genres: "16",
        with_origin_country: "JP",
        "vote_count.gte": "50",
        page: "1",
      }
    : { language: "en-US", page: "1" };
  const data = await fetchTMDB(endpoint, params);
  const type = mediaType === "anime" ? "anime" : mediaType === "tv" ? "series" : "movie";
  return (data.results || []).map((item: any) => mapTMDBContent(item, type));
}

export async function getProviderContent(providerId: string, mediaType: "movie" | "tv" = "movie") {
  const data = await fetchTMDB(`/discover/${mediaType}`, {
    language: "en-US",
    sort_by: "popularity.desc",
    with_watch_providers: providerId,
    watch_region: "US",
    page: "1",
  });
  const type = mediaType === "tv" ? "series" : "movie";
  return (data.results || []).map((item: any) => mapTMDBContent(item, type));
}