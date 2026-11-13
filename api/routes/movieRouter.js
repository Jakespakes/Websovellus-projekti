import { Router } from 'express'
import { fetchPopularMovies, fetchSearchMovies, fetchMovieGenres, fetchMovieCredits, fetchSearchPerson } from '../controllers/MovieController.js'

const router = Router()

router.get('/popular', fetchPopularMovies)
router.get('/search/movie', fetchSearchMovies)
router.get('/search/person', fetchSearchPerson)
router.get('/genres', fetchMovieGenres)
router.get('/:id/credits', fetchMovieCredits)

export default router