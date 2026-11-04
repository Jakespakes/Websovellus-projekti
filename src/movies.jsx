import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Movies() {
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
      const response = await axios.get('/movies') //Sends a GET request to the Backend Server. I
      setData(response.data)
      console.log('Response:', response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
  }, []) //Upon first loading the page, activates the fetchData function as seen above.

  return (
    <div>
      <h1>Movies</h1>

      <div>
        {data.map((movie) => (
          <div key={movie.id}>

            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
            ) : (
              <p>No poster available</p>
            )}

            <div>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}