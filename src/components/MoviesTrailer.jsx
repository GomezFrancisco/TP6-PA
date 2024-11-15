import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trailers } from '../services/api';
import '../styles/Movies.css'

const MovieTrailers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const trailersPerPage = 3;

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const data = await Trailers(id);
        if (data.results && data.results.length > 0) {
          setTrailers(data.results);
        } else {
          setError('No se encontraron trailers para esta película');
        }
      } catch (err) {
        setError('Error al obtener los trailers');
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [id]);

  if (loading) return <p className="loading-message">Cargando trailers...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const indexOfLastTrailer = currentPage * trailersPerPage;
  const indexOfFirstTrailer = indexOfLastTrailer - trailersPerPage;
  const currentTrailers = trailers.slice(indexOfFirstTrailer, indexOfLastTrailer);

  const totalPages = Math.ceil(trailers.length / trailersPerPage);

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

  return (
    <div className="container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Regresar a las películas
        </button>
        <button onClick={() => navigate(`/movie/${id}`)} className="btn btn-secondary">
          Regresar al detalle
        </button>
      </div>

      <h2 className="page-title">Trailers</h2>

      {trailers.length === 0 ? (
        <p className="no-trailers-message">No hay trailers disponibles para esta película.</p>
      ) : (
        <div>
          <div className="trailer-grid">
            {currentTrailers.map((trailer) => (
              <div key={trailer.id} className="trailer-item">
                <div className="trailer-video">
                  <iframe
                    title={trailer.name}
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="trailer-info">
                  <h5 className="trailer-title">{trailer.name}</h5>
                  <p className="trailer-type">{trailer.type}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={prevPage}
              className="btn btn-secondary"
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            
            {/* Mensaje de rango de páginas */}
            <p>{`Página ${currentPage} de ${totalPages}`}</p>
            
            <button
              onClick={nextPage}
              className="btn btn-secondary"
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTrailers;
