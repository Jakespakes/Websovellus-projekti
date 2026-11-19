import express from 'express';
import { 
    createGroup,
    getUserGroups,
    getOwnedGroups,
    updateGroup,
    deleteGroup,
    createJoinRequest,
    getJoinRequests,
    updateJoinRequest 
} from '../controllers/GroupController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Reitit ryhmätoimintoihin, vaatii autentikoinnin
router.post('/', requireAuth, createGroup);
router.get('/my-groups', requireAuth, getUserGroups);
router.get('/owned-groups', requireAuth, getOwnedGroups);
router.patch('/:id', requireAuth, updateGroup);
router.delete('/:id', requireAuth, deleteGroup);
router.post('/:id/join-request', requireAuth, createJoinRequest);
router.get('/:id/join-requests', requireAuth, getJoinRequests);
router.patch('/:id/join-requests/:requestId', requireAuth, updateJoinRequest);

export default router;