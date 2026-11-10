import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import testRouter from './routes/testRouter.js'

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendDist = path.join(__dirname, '..', 'dist')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tests', testRouter)

// Health check endpoint for database connectivity
app.get('/api/health', async (req, res) => {
  try {
    const { pool } = await import('./models/db.js')
    await pool.query('SELECT 1')
    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/movies/popular', async (req, res, next) => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_APIKEY}`
      }
    })

    if (!response.ok) {
      const error = new Error(`Movie API returned ${response.status}`)
      error.status = 502
      throw error
    }

    const result = await response.json()
    res.status(200).json(result.results)
  } catch (error) {
    next(error)
  }
})

app.get('/api/movies/search', async (req, res) => {
  const q = req.query.q
  console.log(q)
  
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${q}`, {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_APIKEY}`
    }})

    const result = await response.json()
    res.status(200).json(result.results)  
  } catch(error) {
    console.error(error)

    res.status(500).json({
      message: "Search failed"
    })
  }
})

app.get('/api/movies/genres', async (req, res, next) => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_APIKEY}`
    }})
    
    if (!response.ok) {
      const error = new Error(`Movie API returned ${response.status}`)
      error.status = 502
      throw error
    }

    const result = await response.json()
    res.status(200).json(result.results)
  } catch(error) {
    next(error)

    res.status(500).json({
      message: "Cant fetch genres"
    })
  }
})

app.use('/api', (req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use(express.static(frontendDist))

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

app.use(errorHandler)

export default app