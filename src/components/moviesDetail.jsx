import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { DetailMovies } from '../services/api';
import './moviesDetail.css'

const MoviesDetail = () => {
  const { id } = useParams();  // Obtener el ID de la película desde la URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await DetailMovies(id);  // Llamar a la API para obtener los detalles
        setMovie(movieDetails);
      } catch (err) {
        console.error('Error al obtener los detalles de la película');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;

  return (
    movie && (
      <div className="container">
        {/* Botón de retorno a la lista de películas */}
        <button
          onClick={() => navigate('/')}  // Navegar a la ruta principal
          className="btn btn-secondary mt-4"
        >
          Regresar a las películas
        </button>
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="img-fluid"
        />
        <p>{movie.overview}</p>
        <p>Fecha de lanzamiento: {movie.release_date}</p>
        <p>Calificación: {movie.vote_average}</p>

        {/* Enlace a la página de trailers */}
        <Link to={`/movie/${id}/trailers`} className="btn btn-primary mt-2">
          Ver trailers
        </Link>
      </div>
    )
  );
};

export default MoviesDetail;
