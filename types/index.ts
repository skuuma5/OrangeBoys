export type ContentType = 'movie' | 'series' | 'anime';

export interface Content {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  type: ContentType;
  releaseDate: string;
  rating: number;
  duration?: string;
  genres: string[];
  backdropUrl: string;
  posterUrl: string;
  trailerUrl?: string;
  status?: string;
  seasons?: number;
  episodes?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  watchlist: string[];
}
