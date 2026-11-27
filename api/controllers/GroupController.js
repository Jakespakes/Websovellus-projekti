import {
    createNewGroup, 
    getUserGroupsByUserId, 
    getUsersOwnedGroups, 
    editGroup, 
    deleteOwnedGroup,
    sendJoinRequest,
    getGroupJoinRequests,
    handleJoinRequest,
    getGroupMembers,
    removeGroupMember,
    changeMemberRole,
    getGroupById
} from '../services/groupService.js'

export async function createGroup(req, res, next) {
    try {
        const { name, description } = req.body;
        const group = await createNewGroup(name, description, req.user.id);
        res.status(201).json({ message: 'Ryhmä luonti onnistui', group });
    } catch (error) {

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        next(error);
    }
}

export async function getUserGroups(req, res, next) {
    try {
        const groups = await getUserGroupsByUserId(req.user.id);
        res.json(groups);
    } catch (error) {
        next(error);
    }
}

export async function getOwnedGroups(req, res, next) {
    try {
        const groups = await getUsersOwnedGroups(req.user.id);
        res.json(groups);
    } catch (error) {
        next(error);
    }
}

export async function updateGroup(req, res, next) {
    try {
        const group = await editGroup(req.params.id, req.user.id, req.body.name, req.body.description);
        res.json({ message: 'Ryhmä päivitetty onnistuneesti', group });
    } catch (error) {
        next(error);
    }
}

export async function deleteGroup(req, res, next) {
    try {
        await deleteOwnedGroup(req.params.id, req.user.id);
        res.json({ message: 'Ryhmän poisto onnistui' });
    } catch (error) {
        next(error);
    }
}

export async function createJoinRequest(req, res, next) {
    try {
        const request = await sendJoinRequest(req.params.id, req.user.id);
        res.status(201).json({message: 'Liittymispyyntö lähetetty'});
    } catch (error) {
        next(error);
    }
}

export async function getJoinRequests(req, res, next) {
    try {
        const requests = await getGroupJoinRequests(req.params.id, req.user.id);
        res.json(requests);
    } catch (error) {
        next(error);
    }
}

export async function updateJoinRequest(req, res, next) {
    try {
        const request = await handleJoinRequest(req.params.id, req.params.requestId, req.user.id, req.body.status);
        res.status(201).json({message: 'Liittymispyyntö käsitelty', request});
    } catch (error) {
        next(error);
    }
}

export async function getMembers(req, res, next){
    try {
        const members = await getGroupMembers(req.params.id);
        res.json(members);
    } catch (error) {
        next(error);
    }
}

export async function deleteMember(req, res, next){
    try {
        await removeGroupMember(req.params.id, req.params.userId, req.user.id);
        res.status(200).json({message: 'Jäsen poistettu'});
    } catch (error) {
        next(error);
    }
}

export async function updateMemberRole(req, res, next){
    try {
        const member = await changeMemberRole(req.params.id, req.params.userId, req.body.role, req.user.id);
        res.json({message: 'Rooli päivitetty', member});
    } catch (error) {
        next(error);
    }
}

export async function getGroup(req, res, next) {
    try {
        const group = await getGroupById(req.params.id);
        res.json(group);
    } catch (error) {
        next(error);
    }
}