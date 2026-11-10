import "./Moviecard.css";

export default function Moviecard({ data, genres }) {
    const genreNamesById = Object.fromEntries(
        genres.map(({ id, name }) => [id, name])
    );

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
                        <h2 className="movie-title">{movie.title}</h2>
                        <div className="movie-genres">
                            {movie.genre_ids
                                .map((id) => <p key={id}>{ genreNamesById[id] }</p>)
                            }
                        </div>
                        <p className="movie-overview">{movie.overview}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}