import { useState, useEffect } from 'react'
import axios from 'axios'
import "./MovieList.css"

export default function MovieList({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    // Mostly cannibalized code from app.jsx, and removed alot of features such as loading and error messages for brevity's sake.
    // Main idea is that the Frontend sends a request to the backend, which then sends a request to TMDB, getting movie info as a JSON thats then sent here, parsed into an array-
    // And presented onto the screen. 
    try {
      const response = await axios.get('/api/movies') 
      setData(response.data)
      } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(loading) return <main><h1>Downloading movies...</h1></main>

  const normalizedSearch = searchTerm.trim().toLowerCase()

  return (
    <div className='movieList'>
      <h1>Movies</h1>
    
      <div>
        {data.filter((movie) => 
          [movie.title, movie.release_date]
          .some((value) => value?.toLowerCase().includes(normalizedSearch)))
          .map((movie) => (
            <div key={movie.id}>

              {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
              ) : (
                <p>No poster available</p>
              )}

              <div>
                <h2 className='movieTitle'>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

