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

export async function createJoinRequest(groupId, userId){
    const result = await pool.query("INSERT INTO join_requests (group_id, user_id, status) VALUES ($1, $2, 'pending') RETURNING *",
    [groupId, userId]);
    return result.rows[0];
}

export async function getJoinRequestsByGroupId(groupId) {
    const result = await pool.query(
    "SELECT jr.id, jr.status, jr.created_at, u.id AS user_id, u.username, u.email FROM join_requests jr JOIN users u ON u.id = jr.user_id WHERE jr.group_id = $1 AND jr.status = 'pending' ORDER BY jr.created_at ASC",
    [groupId]);
    return result.rows;
}

export async function getJoinRequestsById(requestId){
    const result = await pool.query('SELECT * FROM join_requests WHERE id = $1', [requestId]);
    return result.rows[0];
}

export async function processJoinRequest (requestId, status){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const requestResult = await client.query('UPDATE join_requests SET status = $1 WHERE id = $2 RETURNING *', [status, requestId]);
        const request = requestResult.rows[0];

        if (status === 'approved'){
            await client.query("INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, 'member')", [request.group_id, request.user_id]);
        }

        await client.query('COMMIT');

        return request;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function getGroupMember(groupId, userId) {
    const result = await pool.query("SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2",
    [groupId, userId]);
    return result.rows[0];
}

export async function getGroupMembersByGroupId(groupId){
    const result = await pool.query("SELECT u.id, u.username, u.email, gm.role, gm.joined_at FROM group_members gm JOIN users u ON u.id = gm.user_id WHERE gm.group_id = $1 ORDER BY CASE WHEN gm.role = 'admin' THEN 1 ELSE 2 END, u.username", 
    [groupId]);
    return result.rows;
}

export async function removeMember(groupId, userId){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const requestResult = await client.query("DELETE FROM group_members WHERE group_id = $1 AND user_id = $2 RETURNING *", [groupId, userId]);
        const request = requestResult.rows[0];

        await client.query('COMMIT');

        return request;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function updateMemberRole(groupId, userId, role){
        const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const requestResult = await client.query("UPDATE group_members SET role = $1 WHERE group_id = $2 AND user_id = $3 RETURNING *", [role, groupId, userId]);
        const request = requestResult.rows[0];

        await client.query('COMMIT');

        return request;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function transferOwnership(groupId, currentOwnerId, newOwnerId) {
    const client = await pool.connect();

    try {

        await client.query('BEGIN');

        await client.query("UPDATE groups SET owner_id = $1 WHERE id = $2 AND owner_id = $3",
        [newOwnerId, groupId, currentOwnerId]);

        await client.query("UPDATE group_members SET role = 'admin' WHERE group_id = $1 AND user_id = $2",
        [groupId, newOwnerId]);

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}