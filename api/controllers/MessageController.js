import { sendMessage, getGroupMessages, editMessage, removeMessage } from "../services/messageService.js";

export async function createMessage(req, res, next){
    
    try {
        const userMessage = await sendMessage(req.params.id, req.user.id, req.body.content);
        res.status(201).json({message: 'Viesti lähetetty', data: userMessage});
    } catch (error){
        next(error);
    }
}

export async function getMessages(req, res, next){

    try {
        const messages = await getGroupMessages(req.params.id, req.user.id);
        res.json(messages);
    } catch (error){
        next(error);
    }
}

export async function updateMessage(req, res, next){

    try {
        const userMessage = await editMessage(req.params.messageId, req.user.id, req.body.content);
        res.status(200).json({message: 'Viesti päivitetty', data: userMessage});
    } catch (error){
        next(error);
    }
}

export async function deleteMessage(req, res, next){

    try {
        await removeMessage(req.params.messageId, req.user.id);
        res.status(200).json({message: 'Viesti poistettu'});
    } catch (error){
        next(error);
    }
}

