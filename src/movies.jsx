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
      const response = await axios.get('http://localhost:3000/movies') //Sends a GET request to the Backend Server. It has to be in THIS format, '/movies' doesn't work and I don't know why.
      setData(response.data)// As an addendum to the above, TMDB is empty as for now! I COULD try and work the API Fetch to be independent from App.js but that would take too much time as of now, maybe next week or later!
      console.log('Response:', response.data) //Devtool to see what the Backend is sending me.
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
  }, []) //Upon first loading the page, activates the fetchData function as seen above.


  // Incredibly basic, we should take a look later to see what our customer needs as info, and what would be the 'proper' GET command to pull this info from. 
  // BUT! The most MOST important thing is that the logic is there to begin with! 
  // As now that I have the proper stuff down to begin with its way easier to modify it to work with different endpoints and to show different data than to work from nothing! (hopefully.)
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