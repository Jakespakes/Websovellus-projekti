import { useState, useEffect } from 'react'
import axios from 'axios'
import Moviecard from './moviecard/Moviecard.jsx'
import Personcard from './personcard/Personcard.jsx'
import "./Home.css"

export default function Home({ searchQuery }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedAnything, setSearchedAnything] = useState([]);
  const [genres, setGenres] = useState([]);

  // useEffect for fetching genres through api
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/api/movies/genres');
        setGenres(response.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchGenres();
  }, [])

  // async / useEffect for fetching popular movielist throuh api
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/movies/popular');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const searchAnything = async () => {
    if (searchQuery.trim().length < 3) {
      setSearchedAnything([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/api/movies/search?q=${searchQuery}`);
      setSearchedAnything(response.data);
    } catch(err) {
      console.error(err);
      setError("Searching failed");
    } finally {
      setLoading(false);
    }
  }

  // useEffect to get searchquery and updating the searched movie array
  // Timeout is for searching automatically without having the user to press enter
  // after input is typed the async function searches through api with the input
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchAnything()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [searchQuery])

  const movies = searchedAnything.filter(item => item.media_type === "movie");
  const people = searchedAnything.filter(item => item.media_type === "person");
  /* const series = searchedAnything.filter(item => item.media_type === "tv"); */

  if (loading) return <main><h1>Ladataan tietoja...</h1></main>

  return (
    <div>
      {error ? <p className="message error" role="alert">{error}</p> : null}
      
      <div className="searched-person-list">
        <Personcard
          data={people}
        />
      </div>
      
      <div className="searched-movies-list">
        <Moviecard
          data={movies}
          genres={genres}
        />
      </div>

      <div className='movieList'>
        <h1>Popular Movies</h1>
        <div>
          <Moviecard
            data={data}
            genres={genres}
          />
        </div>
      </div>
    </div>
  )
}
