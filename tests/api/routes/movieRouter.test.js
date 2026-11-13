import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

// Stub the model so this route test does not need a running database.
vi.mock('../../../api/services/tmdbService.js', () => ({
    getPopularMovies: vi.fn(), searchMovies: vi.fn(), getMovieGenres: vi.fn()
}))

import { getPopularMovies, searchMovies, getMovieGenres } from '../../../api/services/tmdbService';
import movieRouter from '../../../api/routes/movieRouter';

const app = express();
app.use('/api/movies', movieRouter);

describe('GET /api/movies/popular', () => {
    it('Returns a valid JSON response from TMDB popular endpoint', async () => {
        const movies = [{ id: 1, title: "odyssey" }];
        // Simulate the model returning rows from TMDB
        getPopularMovies.mockResolvedValue(movies);

        // Send an HTTP request through Express, the real router, and the controller
        const response = await request(app)
            .get('/api/movies/popular')
            .expect(200)
            .expect('Content-Type', /json/);

        // Confirm the endoipnt returns exactly the rows provided by the model
        expect(response.body).toEqual(movies);
    })
})

describe('GET /api/movies/search/movie', () => {    
    it('Returns a valid JSON response from TMDB search endpoint and uses the query that is put in as input', async () => {
        const searchedMovies = [{ id: 62, title: "Godfather" }];
        searchMovies.mockResolvedValue(searchedMovies);

        const query = "Godfather"

        const response = await request(app) 
            .get(`/api/movies/search/movie?q=${query}`)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toEqual(searchedMovies);
    })
})

describe('GET /api/movies/genres', () => {
    it('Returns a valid JSON response from TMDB genres endpoint', async () => {
        const genres = [{ id: 202, name: "Action" }];
        getMovieGenres.mockResolvedValue(genres);

        const response = await request(app)
            .get('/api/movies/genres')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toEqual(genres);
    })
})