import express from 'express';
import { 
    createGroup,
    getUserGroups,
    getOwnedGroups,
    updateGroup,
    deleteGroup,
    createJoinRequest,
    getJoinRequests,
    updateJoinRequest,
    getMembers,
    deleteMember,
    updateMemberRole,
    getGroup,
    transferOwner
} from '../controllers/GroupController.js';
import { createGroupMovieList, getGroupMovieLists } from '../controllers/MovieListController.js';
import { createMessage, getMessages, updateMessage, deleteMessage } from '../controllers/MessageController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Reitit ryhmätoimintoihin, vaatii autentikoinnin

// Ryhmän luonti, päivitys, poisto ja haku
router.post('/', requireAuth, createGroup);
router.get('/my-groups', requireAuth, getUserGroups);
router.get('/owned-groups', requireAuth, getOwnedGroups);
router.patch('/:id', requireAuth, updateGroup);
router.delete('/:id', requireAuth, deleteGroup);
router.get('/:id', requireAuth, getGroup);

// Liittymispyynnöt ryhmiin
router.post('/:id/join-request', requireAuth, createJoinRequest);
router.get('/:id/join-requests', requireAuth, getJoinRequests);
router.patch('/:id/join-requests/:requestId', requireAuth, updateJoinRequest);

// Ryhmän jäsenten hallinta ja omistajuuden siirto tarvittaessa
router.get('/:id/members', requireAuth, getMembers);
router.delete('/:id/members/:userId', requireAuth, deleteMember);
router.patch('/:id/members/:userId', requireAuth, updateMemberRole);

// router.patch(/:id/owner) Mahdollinen route omistajuuden eli hallintaoikeuden siirtoon
router.patch('/:id/owner', requireAuth, transferOwner);

// Ryhmän elokuvalistat
router.post('/:id/lists',requireAuth, createGroupMovieList);
router.get('/:id/lists', requireAuth,getGroupMovieLists);

// Ryhmäviestit
router.post('/:id/messages', requireAuth, createMessage);
router.get('/:id/messages', requireAuth, getMessages);
router.patch('/:id/messages/:messageId', requireAuth, updateMessage);
router.delete('/:id/messages/:messageId', requireAuth, deleteMessage);

export default router;