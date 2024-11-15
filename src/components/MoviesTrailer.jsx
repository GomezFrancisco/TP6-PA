import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trailers } from '../services/api';
import './movieTrailer.css'

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

  if (loading) return <p>Cargando trailers...</p>;
  if (error) return <p>{error}</p>;

  const indexOfLastTrailer = currentPage * trailersPerPage;
  const indexOfFirstTrailer = indexOfLastTrailer - trailersPerPage;
  const currentTrailers = trailers.slice(indexOfFirstTrailer, indexOfLastTrailer);

  // Función para cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < Math.ceil(trailers.length / trailersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate('/')}
        className="btn btn-secondary mt-4"
      >
        Regresar a las películas
      </button>

      <button
        onClick={() => navigate(`/movie/${id}`)}
        className="btn btn-secondary mt-4"
      >
        Regresar al detalle
      </button>
      <h2>Trailers</h2>
      {trailers.length === 0 ? (
        <p>No hay trailers disponibles para esta película.</p>
      ) : (
        <div>
          <div className="row">
            {currentTrailers.map((trailer) => (
              <div key={trailer.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      title={trailer.name}
                      className="embed-responsive-item"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{trailer.name}</h5>
                    <p className="card-text">{trailer.type}</p>
                  </div>
                </div>
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
            <button
              onClick={nextPage}
              className="btn btn-secondary mx-2"
              disabled={currentPage === Math.ceil(trailers.length / trailersPerPage)}
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
