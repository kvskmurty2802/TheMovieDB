import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../Styles/PlayerPage.css';

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function PlayerPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchMovie();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!movie) {
    return <p className="loading">Loading movie details...</p>;
  }

  const trailer = movie.videos.results.find((vid) =>
    vid.type.includes("Trailer")
  );

  const categories =
    movie.genres && movie.genres.length > 0
      ? movie.genres.map((genre) => genre.name).join(", ")
      : "N/A";

  return (
    <div className="player-page">
      <div className="video-container">
        {trailer ? (
          <iframe
            className="video-player"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={movie.title}
            allowFullScreen
          />
        ) : (
          <p className="no-trailer">No trailer available</p>
        )}
      </div>
      <div className="details-container">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>
          <b>Release Date:</b> {movie.release_date}
        </p>
        <p>
          <b>Rating:</b> {movie.vote_average}
        </p>
        <p>
          <b>Category:</b> {categories}
        </p>
      </div>
    </div>
  );
}

export default PlayerPage;
