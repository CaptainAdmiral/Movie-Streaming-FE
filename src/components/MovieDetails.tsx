import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { fetchMovieDetails } from '../api';

export default function MovieDetails() {
  const { movieId } = useParams({ from: '/movie/$movieId' });
  const navigate = useNavigate();
  
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(parseInt(movieId)),
  });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading movie details</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const handleGoBack = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="container">
      <button onClick={handleGoBack} className="back-link">← Back to Movies</button>
      
      <div className="movie-details">
        <div className="movie-poster-large">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
            alt={movie.title}
            className="poster-image"
          />
        </div>
        
        <div className="movie-info-detailed">
          <h1 className="movie-title-large">{movie.title}</h1>
          
          <div className="movie-meta">
            <span className="release-date">{movie.release_date}</span>
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}/10</span>
            {movie.runtime && <span className="runtime">{movie.runtime} min</span>}
          </div>
          
          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          
          <div className="overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          
          {movie.tagline && (
            <div className="tagline">
              <em>"{movie.tagline}"</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}