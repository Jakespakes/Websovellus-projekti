import { Router } from 'express'
import {fetchPopularMovies, fetchSearchMovies, fetchMovieGenres} from '../controllers/MovieController.js'

const router = Router()

router.get('/popular', fetchPopularMovies)
router.get('/search', fetchSearchMovies)
router.get('/genres', fetchMovieGenres)

export default router