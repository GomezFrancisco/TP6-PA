import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DetailMovies } from '../services/api';
import '../styles/Movies.css'

const MoviesDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await DetailMovies(id);
        setMovie(movieDetails);
      } catch (err) {
        console.error('Error al obtener los detalles de la película');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <p className="loading-message">Cargando detalles...</p>;

  return (
    movie && (
      <div className="container">
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Regresar a las películas
        </button>

        <h1 className="movie-title">{movie.title}</h1>

        <div className="movie-poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>

        <div className="movie-description">
          <p>{movie.overview}</p>
        </div>

        <div className="movie-details">
          <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
          <p><strong>Calificación:</strong> {movie.vote_average}</p>
        </div>

        <div className="movie-actions">
          <Link to={`/movie/${id}/trailers`} className="btn btn-primary">
            Ver trailers
          </Link>
        </div>
      </div>
    )
  );
};

export default MoviesDetail;