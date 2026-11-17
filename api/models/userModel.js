import { pool } from './db.js'

export async function findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

export async function findUserByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}

export async function findUserById(id) {
    const result = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

export async function findUserWithPasswordById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

export async function createUserRecord(username, email, hashedPassword) {
    const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING  id, username, email, role, created_at',
        [username, email, hashedPassword]);
    return result.rows[0];
}

export async function updateUser(id, username, email){
    const result = await pool.query(
        'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email, role', 
        [username, email, id]);
    return result.rows[0];
}

export async function updatePassword(userId, hashedPassword) {
    const result = await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2',
    [hashedPassword, userId]
    ); 
}