import { getPopularMovies, searchMovies, searchPerson, getMovieGenres, getMovieCredits } from '../services/tmdbService.js'

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

export const fetchSearchPerson = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const result = await searchPerson(query);
    res.status(200).json(result);
  } catch(error) {
    next(error);
  }
}

export const fetchMovieGenres = async (req, res, next) => {
  try {
    const result = await getMovieGenres()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const fetchMovieCredits = async (req, res, next) => {
  try {
    const id = req.params.id

    const result = await getMovieCredits(id)
    res.status(200).json({
      result
    })
  } catch (error) {
    next(error)
  }
}