import type { MovieListResponse, MovieDetails } from './types';

const BASE_URL = 'http://localhost:8000';

export const fetchMovies = async (
  search?: string,
  limit: number = 10,
  offset: number = 0
): Promise<MovieListResponse> => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const response = await fetch(`${BASE_URL}/movies/?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await fetch(`${BASE_URL}/movies/${movieId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};