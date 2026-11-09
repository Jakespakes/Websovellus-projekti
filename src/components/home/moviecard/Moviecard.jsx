import "./Moviecard.css";

export default function Moviecard({ data }) {
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