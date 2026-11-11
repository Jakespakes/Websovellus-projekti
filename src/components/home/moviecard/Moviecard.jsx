import "./Moviecard.css";
import axios from "axios";
import { useState } from 'react';
import Moviemodal from "./MovieModal";

export default function Moviecard({ data, genres }) {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const genreNamesById = Object.fromEntries(
        genres.map(({ id, name }) => [id, name])
    );

    const handleMovieClick = async (id) => {
        console.log(id)
        try {
            const response = await axios.get(`/api/movies/${id}/credits`)
            setSelectedMovie(response.data);
            console.log(response.data);
        } catch (err) {
            console.log("Could not fetch movie details")
        }
    }

    return (
        <>
            <section className="moviecard">
                {data.map((movie) => (
                    <div key={movie.id}>
                        {movie.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        ) : (
                            <p className="no-poster">No poster availible</p>
                        )}
                        <div className="movie-details">
                            <h2 className="movie-title"
                                onClick={() => handleMovieClick(movie.id)}
                            >{movie.title}</h2>
                            <div className="movie-genres">
                                {movie.genre_ids
                                    .map((id) => <p key={id}>{genreNamesById[id]}</p>)
                                }
                            </div>
                            <p className="movie-overview">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </section>
            
            {selectedMovie && (
                <Moviemodal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)} />
            )}
        </>
    );
}