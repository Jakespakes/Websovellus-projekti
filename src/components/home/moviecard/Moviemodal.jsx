import "./Moviemodal.css"


export default function Moviemodal({movie, onClose}) {
    console.log("Modal rendered", movie)
    const director = movie.result.credits.crew.find(
        (member) => member.job === "Director"
    )
    const actors = movie.result.credits.cast.slice(0,5)
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
                            {movie.result.result.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${movie.result.result.poster_path}`} />
                            ) : (
                            <p>Kuvaa ei ole saatavilla.</p>
                                )}
                            <div>
                                <p> Julkaistu: {movie.result.result.release_date}</p>
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
                                {movie.result.result.genres.map((genre) =>(
                                    <span key={genre.id}>{genre.name}</span>
                                ))}
                            </div>
                            <div>
                                <p>{movie.result.result.overview}</p>
                            </div>
                            {/*TODO: Make a list of actors and of the cast that the user can scroll through with arrows! */}
                            {/* Flexboxes would also be nice!*/}
                            {/* Additionally, CSS styling for this, since at the moment this is atrocious. But it's the first vers of this feature. */}
                </div>
            </div>
    )
}