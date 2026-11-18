import {createGroupWithMembers, getGroupsByUserId, getOwnedGroupsByUserId, deleteGroup, getGroupByGroupId, updateOwnedGroup} from '../models/groupModel.js'

export async function createNewGroup(name, description, ownerId) {

    // Otetaan ylimääräiset välilyönnit pois ryhmän nimestä ja kuvauksesta
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    // Tarkistetaan, että ryhmän nimi on kelvollinen (esim. ei tyhjä ja vähintään 3 merkkiä pitkä)
    if (!trimmedName) {
        throw new Error('Group name is required');
    }
    if (trimmedName.length < 3) {
        throw new Error('Group name must be at least 3 characters long');
    }

    return await createGroupWithMembers(trimmedName, trimmedDescription || null, ownerId);
}

export async function getUserGroupsByUserId(userId) {
    if (!userId) {
        throw new Error('Käyttäjän tunnus (id) on pakollinen');
    }
    return await getGroupsByUserId(userId);
}

export async function getUsersOwnedGroups(userId) {
    if (!userId) {
        throw new Error('Käyttäjän tunnus (id) on pakollinen');
    }
    return await getOwnedGroupsByUserId(userId);
}

export async function editGroup(groupId, ownerId, name, description) {
    if (!name?.trim()) {
        const error = new Error('Ryhmän nimi on pakollinen');
        error.status = 400;
        throw error;
    }
    const group = await updateOwnedGroup(groupId, ownerId, name, description);
    
    if (!group) {
        const error = new Error('Ryhmää ei löydy tai käyttäjä ei ole ryhmän omistaja');
        error.status = 404;
        throw error;
    }
    return group;
}

export async function deleteOwnedGroup(groupId, userId) {
    if (!groupId) {
        throw new Error('Ryhmän tunnus (id) on pakollinen');
    }
    if (!userId) {
        throw new Error('Käyttäjän tunnus (id) on pakollinen');
    }
    const group = await getGroupByGroupId(groupId);
    if (!group) {
        const error = new Error('Ryhmää ei löydy');
        error.status = 404; // Not Found
        throw error;
    }
    if (group.owner_id !== userId) {
        const error = new Error('Et voi poistaa ryhmää, jota et omista');
        error.status = 403; // Forbidden
        throw error;
    }
    return await deleteGroup(groupId);
}