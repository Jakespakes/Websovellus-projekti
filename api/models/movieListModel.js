import { pool } from './db.js'

export async function createMovieList(userId, groupId, createdBy, name, description, isPublic) {
    const result = await pool.query("INSERT INTO movie_lists (user_id, group_id, created_by, name, description, is_public) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [userId, groupId, createdBy, name, description, isPublic]);
    return result.rows[0];
}

export async function getMovieListByListId(listId) {
    const result = await pool.query("SELECT * FROM movie_lists WHERE id = $1",
    [listId]);
    return result.rows[0];
}

export async function getMovieListsByUserId(userId) {
    const result = await pool.query("SELECT * FROM movie_lists WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]);
    return result.rows;
}

export async function getMovieListsByGroupId(groupId) {
    const result = await pool.query("SELECT * FROM movie_lists WHERE group_id = $1 ORDER BY created_at DESC",
    [groupId]);
    return result.rows;
}

export async function getMovieListItems(listId) {
    const result = await pool.query("SELECT mli.id, mli.movie_id, mli.added_at, mli.added_by, u.username FROM movie_list_items mli JOIN users u ON u.id = mli.added_by WHERE mli.list_id = $1 ORDER BY mli.added_at DESC",
    [listId]);
    return result.rows;
}


export async function addMovieToList(listId, movieId, addedBy) {
    const result = await pool.query("INSERT INTO movie_list_items (list_id, movie_id, added_by) VALUES ($1, $2, $3) RETURNING *",
    [listId, movieId, addedBy]);
    return result.rows[0];
}

export async function deleteMovieFromList(listId, movieId) {
    const result = await pool.query("DELETE FROM movie_list_items WHERE list_id = $1 AND movie_id = $2 RETURNING *",
    [listId, movieId]);
    return result.rows[0];
}

export async function updateMovieList(listId, name, description,isPublic) {

    const result = await pool.query("UPDATE movie_lists SET name = $1, description = $2, is_public = $3 WHERE id = $4 RETURNING *",
    [name, description, isPublic, listId]);
    return result.rows[0];
}

export async function deleteMovieList(listId) {

    const result = await pool.query("DELETE FROM movie_lists WHERE id = $1 RETURNING *",
    [listId]);
    return result.rows[0];
}

