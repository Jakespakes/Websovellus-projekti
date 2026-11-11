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
                            <h2>movie title here</h2>
                            <p>movie details</p>

                </div>
            </div>
    )
}