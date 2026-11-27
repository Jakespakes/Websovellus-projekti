import "./Moviemodal.css"
import Moviereview from "./Moviereview"
import Movielist from "./Movielist.jsx"


export default function Moviemodal({ movie, onClose }) {
    const director = movie.result.credits.crew.find(
        (member) => member.job === "Director"
    )
    const actors = movie.result.credits.cast.slice(0, 5)

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2>{movie.result.result.title}</h2>
                {movie.result.result.poster_path
                    ? (<img src={`https://image.tmdb.org/t/p/w500${movie.result.result.poster_path}`} />)
                    : (<p>Kuvaa ei ole saatavilla.</p>)}
                <div>
                    <p> Julkaistu: {
                        new Intl.DateTimeFormat("fi-FI").format(new Date(movie.result.result.release_date))}
                    </p>
                </div>
                <div>
                    <h3>Ohjaaja: {director?.name || "Ei löytynyt"}</h3>
                </div>
                <div>
                    <h3>Päänäyttelijät:</h3>
                    {actors.map((actor) => (
                        <div key={actor.cast_id}>
                            <p>{actor.name} näyttelee: {actor.character}</p>
                        </div>
                    ))}
                </div>
                <div>
                    {movie.result.result.genres.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                    ))}
                </div>
                <div>
                    <p>{movie.result.result.overview}</p>
                </div>
                <div className="moviemodal-bottom">
                    <Moviereview 
                        movie_id={movie.result.result.id} 
                        onSubmit={(reviewData) => {console.log(reviewData)}} 
                    />

                    <Movielist 
                        movieId={movie.result.result.id}    
                    />
                </div>
            </div>
        </div>
    )
}