import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Peliculas from './components/movies';
import MoviesDetail from './components/moviesDetail';
import Trailers from './components/moviesTrailer';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (

    
    <Router>
      <Routes>
        <Route path="/" element={<Peliculas searchTerm={searchTerm} />} /> {/* Pasar el término de búsqueda */}
        <Route path="/movie/:id" element={<MoviesDetail />} />
        <Route path="/movie/:id/trailers" element={<Trailers />} />
      </Routes>
    </Router>
  );
}

export default App;