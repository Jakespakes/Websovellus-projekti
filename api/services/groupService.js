import {
    createGroupWithMembers, 
    getGroupsByUserId, 
    getOwnedGroupsByUserId, 
    deleteGroup, 
    getGroupByGroupId, 
    updateOwnedGroup, 
    createJoinRequest, 
    getJoinRequestsByGroupId, 
    getJoinRequestsById, 
    processJoinRequest,
    getGroupMembersByGroupId,
    removeMember,
    updateMemberRole
} from '../models/groupModel.js'

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

export async function sendJoinRequest(groupId, userId){

    const userGroups = await getGroupsByUserId(userId);
    const isMember = userGroups.find(group => group.id === Number(groupId));

    if (isMember){
        const error = new Error('Olet jo ryhmän jäsen');
        error.status = 409;
        throw error;
    }

    return await createJoinRequest(groupId, userId);
}

export async function getGroupJoinRequests(groupId, ownerId){
    const ownedGroups = await getOwnedGroupsByUserId(ownerId);
    const ownsGroup = ownedGroups.some(group => group.id === Number(groupId));

    if (!ownsGroup) {
        const error = new Error('Ainoastaan ryhmän omistaja voi nähdä liittymispyynnöt');
        error.status = 403;
        throw error;
    }

    return await getJoinRequestsByGroupId(groupId);
}

export async function handleJoinRequest(groupId, requestId, ownerId, status){
    if (!['approved', 'rejected'].includes(status)){
        const error = new Error('Liittymispyynnön täytyy olla hyväksytty tai hylätty');
        error.status = 400;
        throw error;
    }

    const ownedGroups = await getOwnedGroupsByUserId(ownerId);
    const ownsGroup = ownedGroups.some(group => group.id === Number(groupId));

    if (!ownsGroup){
        const error = new Error('Ainoastaan ryhmän omistaja voi käsitellä liittymispyyntöjä')
        error.status = 403;
        throw error;
    }

    const request = await getJoinRequestsById(requestId);

    if (!request) {
        const error = new Error('Liittymispyyntöä ei löytynyt');
        error.status = 404;
        throw error;
    }

    return await processJoinRequest(requestId, status);
}

export async function getGroupMembers(groupId){
    return await getGroupMembersByGroupId(groupId);
}

export async function removeGroupMember(groupId, userIdToRemove, ownerId){
    const ownedGroups = await getOwnedGroupsByUserId(ownerId);
    const group = ownedGroups.find(group => group.id === Number(groupId));

    // Tarkistetaan oikeus poistaa jäseniä
    if (!group) {
        const error = new Error('Vain ryhmän omistaja voi poistaa jäseniä');
        error.status = 403;
        throw error;
    }

    // Estetään omistajan poisto ryhmästä
    if (Number(userIdToRemove) === group.owner_id){
        const error = new Error('Ryhmän omistajaa ei voi poistaa ryhmästä');
        error.status = 409;
        throw error;
    }

    const member = await removeMember(groupId, userIdToRemove);

    return member;
}

export async function changeMemberRole(groupId, userId, role, ownerId){

    if (!['member', 'admin'].includes(role)){
        const error = new Error('Virheellinen rooli');
        error.status = 400;
        throw error;
    }
    
    const ownedGroups = await getOwnedGroupsByUserId(ownerId);
    const group = ownedGroups.find(group => group.id === Number(groupId));

    // Tarkistetaan oikeus muuttaa rooleja
    if (!group) {
        const error = new Error('Vain ryhmän omistaja voi muuttaa rooleja');
        error.status = 403;
        throw error;
    }

    // Omistajan roolia ei voi muuttaa
    if (Number(userId) === group.owner_id){
        const error = new Error('Ryhmän omistajan roolia ei voi muuttaa');
        error.status = 409;
        throw error;
    }

    return await updateMemberRole(groupId, userId, role);
}

export async function getGroupById(groupId) {
    if (!groupId) {
        const error = new Error('Ryhmän tunnus on pakollinen');
        error.status = 400;
        throw error;
    }

    const group = await getGroupByGroupId(groupId);

    if (!group) {
        const error = new Error('Ryhmää ei löytynyt');
        error.status = 404;
        throw error;
    }

    return group;
}