import {
    createMovieList,
    getMovieListByListId,
    getMovieListsByUserId,
    getMovieListsByMemberUserId,
    getMovieListsByGroupId,
    getMovieListItems,
    addMovieToList,
    deleteMovieFromList,
    updateMovieList,
    deleteMovieList
 } from "../models/movieListModel.js";
import { getGroupMember } from "../models/groupModel.js";

export async function userCanViewList(list, userId) {

    if (list.is_public) {
        return true;
    }

    if (list.user_id && list.user_id === userId) {
        return true;
    }

    if (list.group_id) {
        const member = await getGroupMember(list.group_id, userId);
        return !!member;
    }

    return false;
}

export async function getListByListId(listId, userId) {
    const list = await getMovieListByListId(listId);

    if (!list) {
        const error = new Error('Listaa ei löytynyt');
        error.status = 404;
        throw error;
    }

    const allowed = await userCanViewList(list, userId);

    if (!allowed) {
        const error = new Error('Ei käyttöoikeutta listan tarkasteluun');
        error.status = 403;
        throw error;
    }

    return list;
}

export async function getUserLists(userId) {
    const personalLists = await getMovieListsByUserId(userId);
    const groupLists = await getMovieListsByMemberUserId(userId);

    return {personalLists,groupLists};
}



export async function getGroupLists(groupId,userId) {

    const member = await getGroupMember(groupId, userId);
    const lists = await getMovieListsByGroupId(groupId);
    return lists.filter(list => list.is_public || member);
}

export async function getListMovies(listId, userId) {

    const list = await getMovieListByListId(listId);

    if (!list) {
        const error = new Error('Listaa ei löytynyt');
        error.status = 404;
        throw error;
    }

    const allowed = await userCanViewList(list, userId);

    if (!allowed) {
        const error = new Error('Ei käyttöoikeutta listan tarkasteluun');
        error.status = 403;
        throw error;
    }

    return await getMovieListItems(listId);
}

export async function userCanEditList(list, userId) {
    
    if (list.user_id && list.user_id === userId) {
        return true;
    }

    if (list.group_id) {
        const member = await getGroupMember(list.group_id, userId);
        return !!member;
    }

    return false;
}

export async function createPersonalList(userId, name, description, isPublic) {

    return await createMovieList(userId, null, userId, name, description, isPublic);
}

export async function createGroupList(groupId, userId, name, description, isPublic) {

    const member = await getGroupMember(groupId, userId);

    if (!member) {
        const error = new Error('Et kuulu ryhmään');
        error.status = 403;
        throw error;
    }

    return await createMovieList(null, groupId, userId, name, description, isPublic);
}

export async function addMovie(listId, movieId, userId) {
    
    const list = await getMovieListByListId(listId);

    if (!list) {
        const error = new Error('Listaa ei löytynyt');
        error.status = 404;
        throw error;
    }

    const allowed = await userCanEditList(list, userId);

    if (!allowed) {
        const error = new Error('Ei käyttöoikeutta');
        error.status = 403;
        throw error;
    }

    return await addMovieToList(listId, movieId, userId);
}

export async function editMovieList(listId, userId, name, description, isPublic) {

    const list = await getMovieListByListId(listId);

    if (!list) {
        const error = new Error('Listaa ei löytynyt');
        error.status = 404;
        throw error;
    }

    const allowed = await userCanEditList(list, userId);

    if (!allowed) {
        const error = new Error('Ei käyttöoikeutta');
        error.status = 403;
        throw error;
    }

    return await updateMovieList(listId, name, description, isPublic);
}

export async function removeMovieList(listId, userId) {

    const list = await getMovieListByListId(listId);

    if (!list) {
        const error = new Error('Listaa ei löytynyt');
        error.status = 404;
        throw error;
    }

    const allowed = await userCanEditList(list, userId);

    if (!allowed) {
        const error = new Error('Ei käyttöoikeutta');
        error.status = 403;
        throw error;
    }

    return await deleteMovieList(listId);
}

export async function removeMovieFromList(listId, movieId, userId) {

    const list = await getMovieListByListId(listId);

    if (!list) {
        const error = new Error('Listaa ei löytynyt');
        error.status = 404;
        throw error;
    }

    const allowed = await userCanEditList(list, userId);

    if (!allowed) {
        const error = new Error('Ei käyttöoikeutta');
        error.status = 403;
        throw error;
    }

    return await deleteMovieFromList(listId,movieId);
}