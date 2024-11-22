import React, { useEffect, useState } from "react";
import '../App.css'
const BASE_URL = "https://api.themoviedb.org/3/";
const DISCOVER_API_URL = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${
  import.meta.env.VITE_APP_API_KEY
}`;
const SEARCH_API_URL = `${BASE_URL}search/movie?api_key=${
  import.meta.env.VITE_APP_API_KEY
}&query=`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getMovies(DISCOVER_API_URL);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      getMovies(DISCOVER_API_URL);
    } else {
      const timer = setTimeout(() => {
        getMovies(SEARCH_API_URL + searchQuery);
      }, 500);
      return () => clearTimeout(timer); 
    }
  }, [searchQuery]);

  function getMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  return (
    <>
      <header>
        <nav>
          <a
            href="https://github.com/kvskmurty2802/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>TheMovieDB</b> by kvskmurty2802
          </a>
        </nav>
        <input
          className="Search"
          placeholder="Search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>
      <main className="main">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className="movie"
              key={movie.id}
              onClick={() => (window.location.href = `/player/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <h1>{movie.title}</h1>
                <span>Rating: {movie.vote_average}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </main>
    </>
  );
}

export default Home;
