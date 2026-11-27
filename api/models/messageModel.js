import { pool } from './db.js'

export async function createMessage(groupId, userId, content){
    const result = await pool.query("INSERT INTO messages (group_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
    [groupId, userId, content]);
    return result.rows[0];
}

export async function getMessagesByGroupId(groupId){
    const result = await pool.query("SELECT m.id, m.content, m.created_at, m.updated_at, u.id AS user_id, u.username FROM messages m JOIN users u ON u.id = m.user_id WHERE m.group_id = $1 ORDER BY m.created_at ASC",
    [groupId]);
    return result.rows;
}

export async function getMessageById(messageId){
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [messageId]);
    return result.rows[0];
}

export async function updateMessage(messageId, content){
    const result = await pool.query("UPDATE messages SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [content, messageId]);
    return result.rows[0];
}

export async function deleteMessage(messageId){
    const result = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *", [messageId]);
    return result.rows[0];
}

