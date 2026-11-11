import "./Moviecard.css";
import axios from "axios";
import { useState } from 'react';

export default function Moviecard({ data }) {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = async (id) => {
        console.log(id)
        try {
            const response = await axios.get(`/api/movies/${id}/credits`)
            setSelectedMovie(response.data);
            console.log(response.data);
        } catch(err) {
            console.log("Could not fetch movie details")
        }
    }

    return (
        <section className="moviecard">
            {data.map((movie) => (
                <div key={movie.id}>
                    {movie.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                    ):(
                        <p className="no-poster">No poster availible</p>
                    )}
                    <div className="movie-details">
                        <h2 className="movie-title"
                            onClick={() => handleMovieClick(movie.id)}
                        >{movie.title}</h2>
                        <div className="movie-genres">
                            <p>Horror</p>
                            <p>Comedy</p>
                            <p>Cartoon</p>
                        </div>
                        <p className="movie-overview">{movie.overview}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}