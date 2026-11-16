import {createNewGroup, getUserGroupsByUserId, getUsersOwnedGroups, deleteOwnedGroup} from '../services/groupService.js'

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

export async function deleteGroup(req, res, next) {
    try {
        await deleteOwnedGroup(req.params.id, req.user.id);
        res.json({ message: 'Ryhmän poisto onnistui' });
    } catch (error) {
        next(error);
    }
}
