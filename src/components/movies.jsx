import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, SearchMovies } from '../services/api';
import { Link } from 'react-router-dom';
import SearchBar from './searchMovie';
import './moviesCSS.css';

const Peliculas = () => {
  const [movies, setMovies] = useState([]); // Lista de películas
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [moviesPerPage] = useState(9); // Películas por página

  // Nueva función para manejar la búsqueda
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

  // Obtener las películas
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

  // Lógica para obtener las películas que corresponden a la página actual
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Total de páginas
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Función para cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1 className="text-center my-4">Catálogo de</h1>
      <SearchBar onSearch={handleSearch} /> {/* Componente de búsqueda */}

      <div className="row mt-4">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="col-md-4 col-sm-6 col-xs-12 mb-4">
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card h-100">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                ) : (
                  <div className="card-img-placeholder">No Image Available</div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Paginación con botones de "Anterior" y "Siguiente" */}
      <div className="pagination d-flex justify-content-center mt-4">
        <button
          onClick={prevPage}
          className="btn btn-secondary mx-2"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="mx-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="btn btn-secondary mx-2"
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Peliculas;
