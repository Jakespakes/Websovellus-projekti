import { pool } from './db.js';

export async function findReviewById(id) {
    const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    return result.rows[0];
}

export async function createReviewQuery(userId, movieId, rating, comment) {
    const result = await pool.query('INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING id, rating, comment, created_at',
        [userId, movieId, rating, comment]);
    return result.rows[0];
}

export async function deleteReviewQuery(id) {
    const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING id, user_id, movie_id, rating, comment', [id]);
    return result.rows[0];
}

export async function updateReviewQuery(rating, comment, id, userId) {
    const result = await pool.query('UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4',
        [rating, comment, id, userId]);
    return result.rows[0];
}