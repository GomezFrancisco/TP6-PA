import React, { useState } from 'react';
import '../styles/Movies.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;