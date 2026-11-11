const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_APIKEY}`
      }

export const getPopularMovies = async () => {
    const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular', 
        { headers });

    if (!response.ok) {
        const error = new Error(`Movie API returned ${response.status}`);
        error.status = 502;
        throw error;
    }

    const result = await response.json()
    return result.results;
}

export const searchMovies = async (query) => {

    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${query}`, 
        {headers});
    
    if (!response.ok) {
        const error = new Error(`Movie API returned ${response.status}`);
        error.status = 502;
        throw error;
    }

    const result = await response.json()
    return result.results;
 }

export const getMovieGenres = async () => {

    const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?language=en', 
        {headers})
    if (!response.ok) {
        const error = new Error(`Movie API returned ${response.status}`)
        error.status = 502
        throw error
    }

    const result = await response.json()
    return result.genres
}

export const getMovieCredits = async (id) => {
    
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        {headers})
    const responseCredits = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {headers})
    if (!response.ok) {
        const error = new Error(`Movie API returned ${response.status}`)
        error.status = 502
        throw error
    }

    const result = await response.json()
    const credits = await responseCredits.json()
    return {
        result,
        credits: {
            cast: credits.cast,
            crew: credits.crew
        }
    }
}