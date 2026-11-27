import React from 'react'
import "./Personmodal.css"


export default function Personmodal({onClose, person}) {
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

                <h2>{person.name}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}/>
                <p> Tunnettu teoksista.</p>
                {person.known_for.map((movie) => (
                <div key={movie.id}> 
                <p>{movie?.title || movie.name} </p>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>

                </div>))}
            </div>
        </div>
    )
}
