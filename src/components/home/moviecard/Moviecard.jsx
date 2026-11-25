import "./Moviecard.css";
import axios from "axios";
import { useState } from 'react';
import Moviemodal from "./Moviemodal.jsx";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function Moviecard({ data, genres }) {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const genreNamesById = Object.fromEntries(
        genres.map(({ id, name }) => [id, name])
    );

    const handleMovieClick = async (id) => {
        console.log(id)
        try {
            const response = await axios.get(`/api/movies/${id}/credits`)
            setSelectedMovie(response.data);
            console.log(response.data);
        } catch (err) {
            console.log("Could not fetch movie details")
        }
    }

    return (
        <>
            <section className="moviecard">
                {data.map((movie) => (
                    <Card key={movie.id} className="movie-card">

                        <Row className="g-0">

                            <Col xs={12} lg={5}>
                                {movie.poster_path ? (
                                    <Card.Img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        onClick={() => handleMovieClick(movie.id)}
                                        title={`${movie.title} juliste`}
                                    />
                                ) : (
                                    <p className="no-poster">
                                        No poster available
                                    </p>
                                )}
                            </Col>

                            <Col xs={12} lg={8}>
                                <Card.Body>

                                    <Card.Title
                                        className="movie-title"
                                        onClick={() => handleMovieClick(movie.id)}
                                    >
                                        {movie.title}
                                    </Card.Title>

                                    <div className="movie-genres">
                                        {movie.genre_ids.map((id) => (
                                            <Badge bg="secondary" key={id}>
                                                {genreNamesById[id]}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Card.Text className="movie-overview">
                                        {movie.overview}
                                    </Card.Text>

                                </Card.Body>
                            </Col>

                        </Row>

                    </Card>
                ))}
            </section>

            {selectedMovie && (
                <Moviemodal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)} />
            )}
        </>
    );
}