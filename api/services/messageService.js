import { createMessage, getMessagesByGroupId, getMessageById, updateMessage, deleteMessage } from '../models/messageModel.js'
import { getGroupByGroupId, getGroupMember } from '../models/groupModel.js'

export async function sendMessage(groupId, userId, content){
    const member = await getGroupMember(groupId, userId);

    if (!member){
        const error = new Error('Et kuulu tähän ryhmään');
        error.status = 403;
        throw error;
    }

    return await createMessage(groupId, userId, content);
}

export async function getGroupMessages(groupId, userId){
    const member = await getGroupMember(groupId, userId);

    if (!member){
        const error = new Error('Et kuulu tähän ryhmään');
        error.status = 403;
        throw error;
    }

    return await getMessagesByGroupId(groupId);
}

export async function editMessage(messageId, userId, content){
    const message = await getMessageById(messageId);

    if (!message){
        const error = new Error('Viestiä ei löytynyt');
        error.status = 404;
        throw error;
    }

    if (message.user_id !== userId){
        const error = new Error('Voit muokata vain omia viestejäsi');
        error.status = 403;
        throw error;
    }

    return await updateMessage(messageId, content);
}

export async function removeMessage(messageId, userId) {
    const message = await getMessageById(messageId);

    if (!message){
        const error = new Error('Viestiä ei löytynyt');
        error.status = 404;
        throw error;
    }

    // Tarkistetaan, onko käyttäjän oma viesti
    if (message.user_id === userId){
        return await deleteMessage(messageId);
    }

    // Tarkistetaan, onko käyttäjä ryhmän omistaja, jolloin rajaton oikeus
    const group = await getGroupByGroupId(message.group_id);

    if (group && group.owner_id === userId) {
        return await deleteMessage(messageId);
    }

    // Admin-tarkistus (moderaattoreille)
    const member = await getGroupMember(message.group_id, userId);

    if (member && member.role === 'admin') {
        return await deleteMessage(messageId);
    }

    // Virhe, jos mikään yllä olevista ehdoista ei täyty
    const error = new Error('Voit poistaa vain omia viestejäsi');
    error.status = 403;
    throw error;
}


