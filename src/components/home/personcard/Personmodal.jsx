import "./Personmodal.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Personmodal({ onClose, person }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}>

                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2>{person.name}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} />
                <p> Tunnettu teoksista.</p>

            <Row className="g-3">
                {person.known_for.map((movie) => (
                    <Col lg={3} key={movie.id}>
                        <Card>
                        <Card.Title>{movie?.title || movie.name} </Card.Title>
                        <Card.Img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        </Card>
                    </Col>))}
            </Row>

            </div>
        </div>
    )
}
