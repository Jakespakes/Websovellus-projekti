import "./Moviemodal.css"


export default function Moviemodal({movie, onClose}) {
    console.log("Modal rendered", movie)
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
                            <p>Smaller poster, actors, directors, crew, runtime...</p>
                            {/*TODO: Make a list of actors and of the cast that the user can scroll through with arrows! */}
                            {/* Flexboxes would also be nice!*/}
                </div>
            </div>
    )
}