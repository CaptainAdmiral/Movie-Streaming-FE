export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  popularity?: number;
  overview?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: ProductionCompany[];
  release_date: string;
  revenue: number;
  runtime?: number;
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResponse {
  movies: Movie[];
  total: number;
  limit?: number;
  offset?: number;
}