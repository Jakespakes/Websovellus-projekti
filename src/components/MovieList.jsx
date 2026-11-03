import { useState, useEffect } from 'react'
import axios from 'axios'
import "./MovieList.css"




export default function MovieList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get('/api/tests')
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

  return (
    <>
      <h1>Elokuva kortit</h1>
      <div className="card">
        {loading && <p>Loading...</p>}
        
        {data && (
          <div className="movieList">
            <h3>Elokuva 1:</h3>
            
              { data.map((item) => (
                <div key={item.id} className="movieCard">
                  {`ID: ${item.id} - ${item.description}`}
                </div>
              ))}
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


