import { useState, useEffect } from 'react'
import axios from 'axios'
import "./Home.css"

export default function Home({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get('/api/movies/popular') 
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchMovies()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [searchQuery])

  const searchMovies = async () => {
    if (searchQuery.trim().length < 3) {
      /* setData([]); */
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/api/movies/search?q=${searchQuery}`);

      console.log(response.data);
    } catch(err) {
      console.error(err);
      setError("Movie search failed");
    } finally {
      setLoading(false);
    }
  }

  if(loading) return <main><h1>Downloading movies...</h1></main>

  const normalizedSearch = searchTerm.trim().toLowerCase()

  return (
    <div className='movieList'>
      <h1>Movies</h1>
        <input 
          placeholder="Search for a movie outside of this list"
          type="text"
          value={ searchQuery }
          onChange={(e) => setSearchQuery(e.target.value)}
        />
    
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

