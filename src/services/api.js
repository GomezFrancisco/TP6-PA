const apiKey = '44cbe0c664c076c42b0ea76c9f17653c';

export const fetchPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error en la solicitud a TMDB');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error al obtener datos de TMDB:', error);
    throw error;   }
};

export const DetailMovies = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la solicitud a TMDB');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error al obtener datos de TMDB:', error);
      throw error;   }
  };

  export const SearchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la solicitud a TMDB');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error al obtener datos de TMDB:', error);
      throw error;   }
  };

  export const Trailers = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la solicitud a TMDB');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error al obtener datos de TMDB:', error);
      throw error;   }
  };