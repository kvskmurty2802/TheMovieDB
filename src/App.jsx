import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const DISCOVER_API_URL = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${import.meta.env.VITE_APP_API_KEY}`;
const SEARCH_API_URL = `${BASE_URL}search/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getMovies(DISCOVER_API_URL);
  }, []);

  function getMovies(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery) {
      getMovies(SEARCH_API_URL + searchQuery);
    }
  }

  return (
    <>
      <header>
        <nav>
          <a href="https://github.com/kvskmurty2802/" target="_blank" rel="noopener noreferrer"><b>TheMovieDB</b> by kvskmurty2802</a>
        </nav>
        <form id="form" onSubmit={handleSearch}>
          <input
            className='Search'
            placeholder="Search"
            type="text"
            id="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </header>
      <main className='main'>
        {movies.map(movie => (
          <div className='movie' key={movie.id}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
            />
            <div className='movie-info'>
              <h1>{movie.title}</h1>
              <span>Rating: {movie.vote_average}</span>
            </div>
            <div className='overview'>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </main>
      <footer>
        &copy; 2024 | <a href="https://github.com/kvskmurty2802/" target="_blank">GitHub</a> | 
        <a href="https://www.linkedin.com/in/krishna-murty-342437237/" target="_blank">LinkedIn</a> | 
        <a href="https://portfolio-page-nu-two.vercel.app/" target="_blank">Portfolio</a>
      </footer>
    </>
  );
}

export default App;
