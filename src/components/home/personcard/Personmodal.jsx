import React from 'react'
import "./Personmodal.css"


export default function Personmodal({onClose, personID}) {
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

                <h2>Nimi</h2>
                <p>Kuva</p>
                <p> Elokuvat jossa näytellyt.</p>
            </div>
        </div>
    )
}
