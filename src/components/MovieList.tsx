import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useDebouncedCallback } from 'use-debounce';
import { fetchMovies } from '../api';
import type { Movie } from '../types';

export default function MovieList() {
  
  // Initialize from sessionStorage on mount
  const [searchInput, setSearchInput] = useState(() => sessionStorage.getItem('lastSearch') || '');
  const [page, setPage] = useState(() => parseInt(sessionStorage.getItem('lastPage') || '0'));
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
  
  const debouncedSetSearch = useDebouncedCallback(
    () => {
      setDebouncedSearch(searchInput);
      handlePageChange(0);
      if (searchInput) {
        sessionStorage.setItem('lastSearch', searchInput);
      }
    },
    500,
  );
  
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', debouncedSearch, page],
    queryFn: () => fetchMovies(debouncedSearch || undefined, limit, page * limit),
    enabled: debouncedSearch.length > 0,
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const handleSearchInputChange = (search: string) => {
    setSearchInput(search);
    debouncedSetSearch();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem('lastPage', newPage.toString());
  };

  return (
    <div className="container">
      <div className={searchInput ? "header" : "hero"}>
        <h1 className="title">PETFLIX</h1>
        <div className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {searchInput && (
        <>
          {isLoading && <div className="loading">Loading...</div>}
          {error && <div className="error">Error loading movies</div>}
          
          {data && !isLoading && data.movies.length === 0 && (
            <div className="no-results">
              No movies found for "{debouncedSearch}". Try a different search term.
            </div>
          )}
          
          {data && !isLoading && data.movies.length > 0 && (
            <>
              <div className="movies-container">
                {totalPages > 1 && page > 0 && (
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    className="nav-arrow nav-arrow-left"
                  >
                    ‹
                  </button>
                )}
                
                <div className="movies-grid">
                  {data.movies.map((movie: Movie) => (
                    <Link
                      key={movie.id}
                      to="/movie/$movieId"
                      params={{ movieId: movie.id.toString() }}
                      className="movie-card"
                    >
                      <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
                        alt={movie.title}
                        className="movie-poster"
                      />
                      <div className="movie-info">
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-year">{movie.release_date?.substring(0, 4)}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && page < totalPages - 1 && (
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className="nav-arrow nav-arrow-right"
                  >
                    ›
                  </button>
                )}
              </div>

              {totalPages > 1 && (
                <div className="page-indicator">
                  Page {page + 1} of {totalPages}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}