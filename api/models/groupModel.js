import { pool } from './db.js'

export async function createGroupWithMembers(name, description, ownerId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const groupResult = await client.query(
            'INSERT INTO groups (name, description, owner_id) VALUES ($1, $2, $3) RETURNING id, name, description, owner_id',
            [name, description, ownerId]
        );

        const group = groupResult.rows[0];

        await client.query('INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3)', [group.id, ownerId, 'admin']);

        await client.query('COMMIT');

        return group;
    } catch (error) {
        await client.query('ROLLBACK');

        if (error.code === '23505') { // PostgreSQL unique violation
            const duplicateError = new Error('Nimi on jo käytössä');
            duplicateError.status = 409; // Conflict
            throw duplicateError;
        }
        throw error;
    } finally {
        client.release();
    }
}

export async function getGroupByGroupId(groupId) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM groups WHERE id = $1', [groupId]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

export async function getGroupsByUserId(userId) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT g.id, g.name, g.description, g.owner_id, gm.role, g.created_at FROM groups g JOIN group_members gm ON g.id = gm.group_id WHERE gm.user_id = $1 ORDER BY g.name ASC',
            [userId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

export async function getOwnedGroupsByUserId(userId) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM groups WHERE owner_id = $1 ORDER BY name ASC',
            [userId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

export async function updateOwnedGroup(groupId, ownerId, name, description) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'UPDATE groups SET name = $1, description = $2 WHERE id = $3 AND owner_id = $4 RETURNING *',
            [name, description, groupId, ownerId]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
}

export async function deleteGroup(groupId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM groups WHERE id = $1', [groupId]);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}