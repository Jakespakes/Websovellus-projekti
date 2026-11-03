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


const apiKey = process.env.TMDB_API;

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

// Mikon koodaamaa roskaa! Pelätkää!!
app.get('/movies', async(req, res) => {

  console.log('Endpoint saavutettu.')
  try{

  const url = 'https://api.themoviedb.org/3/movie/top_rated';
  console.log('Lähetään API kutsu.')
  console.log('API Key ladattu.', !!apiKey)

  const response = await fetch(url, {

    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  })
  console.log('TMDB vastaus:', response.status)

  const data = await response.json()

  console.log(' Vastaus saatu.')

  res.status(200).json(data.results)
} catch(error){
  console.error('TMDB Kutsu epäonnistui', error)

  res.status(500).json({
    message: 'Ei toimi jostaki syyst.'
  })
}
})
// Mikon koodama roska loppuu... Pelätkää vähemmän!

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
