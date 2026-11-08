import "./Moviecard.css";

export default function Moviecard({ data }) {
    return (
        <section className="moviecard">
            <h2>Moviecard</h2>
            {data.map((movie) => (
                <div key={movie.id} classname="movie-card">
                    {movie.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} classname="movie-poster"/>
                    ):(
                        <p classname="no-poster">No poster availible</p>
                    )}
                    <div>
                        <h2 classname="movie-title">{movie.title}</h2>
                        <p classname="movie-overview">{movie.overview}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}