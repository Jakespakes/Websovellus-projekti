import {getPopularMovies, searchMovies, getMovieGenres} from '../services/tmdbService.js'

export const fetchPopularMovies = async (req, res, next) => {
  try {
    const result = await getPopularMovies()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const fetchSearchMovies = async (req, res, next) => {
    try {
        const query = req.query.q;

        if (!query) {
      return res.json([]);
    }

    const result = await searchMovies(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const fetchMovieGenres = async (req, res, next) => {
  try {
    const result = await getMovieGenres()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
