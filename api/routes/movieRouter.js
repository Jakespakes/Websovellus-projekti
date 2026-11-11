import { Router } from 'express'
import {fetchPopularMovies, fetchSearchMovies, fetchMovieGenres, fetchMovieCredits} from '../controllers/MovieController.js'

const router = Router()

router.get('/popular', fetchPopularMovies)
router.get('/search', fetchSearchMovies)
router.get('/genres', fetchMovieGenres)
router.get('/:id/credits', fetchMovieCredits)

export default router