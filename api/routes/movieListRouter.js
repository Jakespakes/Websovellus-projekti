import express from 'express';
import { 
    createPersonalMovieList,
    getAllUserMovieLists, 
    getMovieList, 
    getMoviesFromMovieList, 
    addMovieToList,
    updateList,
    deleteList,
    deleteMovieFromList } from '../controllers/MovieListController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/', requireAuth, createPersonalMovieList);
router.get('/', requireAuth, getAllUserMovieLists);
router.post('/:id/movies', requireAuth, addMovieToList);
router.get('/:id', requireAuth, getMovieList);
router.get('/:id/movies', requireAuth, getMoviesFromMovieList);
router.patch('/:id', requireAuth, updateList);
router.delete('/:id', requireAuth, deleteList);
router.delete('/:id/movies/:movieId', requireAuth, deleteMovieFromList);

export default router;