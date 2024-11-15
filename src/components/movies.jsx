import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, SearchMovies } from '../services/api';
import { Link } from 'react-router-dom';
import SearchBar from './searchMovie';
import '../styles/Movies.css'

const Peliculas = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(9);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const searchResults = await SearchMovies(query);
      setMovies(searchResults.results || []);
    } catch (err) {
      setError('No se pudieron obtener los resultados de búsqueda');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies.results || []);
      } catch (err) {
        setError('No se pudieron obtener las películas populares');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p className="loading-message">Cargando películas...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h1 className="page-title">Catálogo de Películas</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`} className="movie-link">
              <div className="movie-poster">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className="movie-image"
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <div className="movie-info">
                <h5 className="movie-title">{movie.title}</h5>
                <p className="movie-overview">
                  {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} className="btn btn-secondary" disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={nextPage} className="btn btn-secondary" disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Peliculas;