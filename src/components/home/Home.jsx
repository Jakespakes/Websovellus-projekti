import { useState, useEffect } from 'react'
import axios from 'axios'
import Moviecard from './moviecard/Moviecard.jsx'
import "./Home.css"

export default function Home({ searchQuery }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedMovies, setSearchedMovies] = useState([]);

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
      setSearchedMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/api/movies/search?q=${searchQuery}`);

      setSearchedMovies(response.data);
    } catch(err) {
      console.error(err);
      setError("Movie search failed");
    } finally {
      setLoading(false);
    }
  }

  if(loading) return <main><h1>Downloading movies...</h1></main>

  return (
    <div>
      <div className="searched-movies-list">
        <Moviecard 
          data={ searchedMovies }
        />
      </div>

      <div className='movieList'>
        <h1>Popular Movies</h1>
        <div>
          <Moviecard
            data={ data }
            searchTerm={ searchQuery }
          />
        </div>
      </div>
    </div>
  )
}