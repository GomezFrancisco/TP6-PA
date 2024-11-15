import React, { useState } from 'react';
import './searchMovie.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Llama a la función de búsqueda que pasamos desde el componente padre
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={handleInputChange}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
