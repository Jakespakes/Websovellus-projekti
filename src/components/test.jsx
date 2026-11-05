import { useState, useEffect } from 'react'
import axios from 'axios'

export function Movielist() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        
        try {
        const response = await axios.get('/api/movies')
        setMovies(response.data)
        } catch (err) {
        setError(err.message)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <h1>Docker Sample</h1>
            <div className="card">
                {loading && <p>Loading...</p>}
                
                {movies && (
                <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
                    <h3>Popular Movies:</h3>
                    <ul style={{ textAlign: 'left', margin: '10px 0' }}>
                    {movies.map((movie) => (
                        <li key={movie.id} style={{ marginBottom: '10px' }}>
                        <h4>{movie.title}</h4>
                        {movie.overview && <p>{movie.overview}</p>}
                        </li>
                    ))}
                    </ul>
                </div>
                )}
                
                {error && (
                <div style={{ marginTop: '20px', padding: '10px', background: '#ffebee', color: 'red' }}>
                    <h3>Error:</h3>
                    <p>{error}</p>
                </div>
                )}
            </div>
        </>
    )
}